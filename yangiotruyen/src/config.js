let BASE_URL = "https://truyentoicungai.web.app";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

let PROJECT = "ant05-efa02";
try {
    if (PROJECT_ID) {
        PROJECT = PROJECT_ID;
    }
} catch (error) {
}

let KEY = "AIzaSyBpasZ72EgIovTCVHokMpTYiXWdQolB1qc";
try {
    if (API_KEY) {
        KEY = API_KEY;
    }
} catch (error) {
}

var FS_BASE = "https://firestore.googleapis.com/v1/projects/" + PROJECT + "/databases/(default)/documents";

if (typeof console !== "undefined" && console.log) {
    console.log("[yangio] project=" + PROJECT + " keySet=" + (KEY ? "yes" : "no") + " base=" + BASE_URL);
}

function normalizeUrl(url) {
    var id = storyIdFromUrl(url);
    if (id) {
        var chap = chapterIdFromUrl(url);
        return chap ? BASE_URL + "/story/" + id + "/chapter/" + chap : BASE_URL + "/story/" + id;
    }
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function storyIdFromUrl(url) {
    var m = url.match(/\/story\/([^/?#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
}

function chapterIdFromUrl(url) {
    var m = url.match(/\/chapter\/([^/?#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
}

function fsUrl(path, queries) {
    var url = FS_BASE + "/" + encodeURIComponentPath(path) + "?key=" + encodeURIComponent(KEY);
    if (queries) {
        for (var key in queries) {
            url += "&" + key + "=" + encodeURIComponent(queries[key]);
        }
    }
    return url;
}

function encodeURIComponentPath(path) {
    // encode each id segment but keep '/' separators; ids never contain slashes here
    var parts = path.split("/");
    var out = [];
    for (var i = 0; i < parts.length; i++) {
        out.push(encodeURIComponent(parts[i]));
    }
    return out.join("/");
}

function decodeValue(v) {
    if (v === null || v === undefined) return "";
    if (v.stringValue !== undefined) return v.stringValue;
    if (v.booleanValue !== undefined) return v.booleanValue;
    if (v.integerValue !== undefined) return parseInt(v.integerValue, 10);
    if (v.doubleValue !== undefined) return v.doubleValue;
    if (v.timestampValue !== undefined) return v.timestampValue;
    if (v.arrayValue !== undefined) return decodeArray(v.arrayValue);
    if (v.mapValue !== undefined) return decodeMap(v.mapValue);
    return "";
}

function decodeArray(a) {
    var out = [];
    var values = a.values || [];
    for (var i = 0; i < values.length; i++) {
        out.push(decodeValue(values[i]));
    }
    return out;
}

function decodeMap(m) {
    var out = {};
    var fields = m.fields || {};
    for (var key in fields) {
        out[key] = decodeValue(fields[key]);
    }
    return out;
}

function parseDoc(json) {
    var doc = { fields: {}, id: "" };
    if (!json || !json.name) return doc;
    var parts = json.name.split("/");
    doc.id = decodeURIComponent(parts[parts.length - 1]);
    var fields = json.fields || {};
    for (var key in fields) {
        doc.fields[key] = decodeValue(fields[key]);
    }
    return doc;
}

function getDocument(path) {
    var response = fetch(fsUrl(path), { timeout: 30000 });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Firestore HTTP " + response.status);
    return parseDoc(response.json());
}

function listCollection(path, pageSize, pageToken, orderBy) {
    var queries = { pageSize: String(pageSize || 100) };
    if (pageToken) queries.pageToken = pageToken;
    if (orderBy) queries.orderBy = orderBy;
    var response = fetch(fsUrl(path, queries), { timeout: 30000 });
    if (response.status === 404) return { docs: [], nextPageToken: "" };
    if (!response.ok) throw new Error("Firestore HTTP " + response.status);
    var json = response.json();
    var docs = [];
    var list = json.documents || [];
    for (var i = 0; i < list.length; i++) {
        docs.push(parseDoc(list[i]));
    }
    return { docs: docs, nextPageToken: json.nextPageToken || "" };
}

function storyFields(doc) {
    var f = doc.fields;
    return {
        name: f.name || doc.id,
        link: storyLink(doc.id),
        cover: f.cover || "",
        description: f.description || "",
        tag: f.status === "completed" ? "Hoàn thành" : ""
    };
}

function sortByUpdatedDesc(docs) {
    docs.sort(function (a, b) {
        var ua = String(a.fields.updatedAt || "");
        var ub = String(b.fields.updatedAt || "");
        if (ua > ub) return -1;
        if (ua < ub) return 1;
        return 0;
    });
    return docs;
}


function storyLink(id) {
    return BASE_URL + "/story/" + encodeURIComponent(id);
}

function chapterLink(storyId, chapId) {
    return storyLink(storyId) + "/chapter/" + encodeURIComponent(chapId);
}

function storyItem(doc) {
    var f = doc.fields;
    var count = f.chapterCount || 0;
    return {
        name: f.name || doc.id,
        link: storyLink(doc.id),
        cover: f.cover || "",
        description: f.description || "",
        tag: (f.status === "completed" ? "Hoàn thành" : "Chương " + count)
    };
}
