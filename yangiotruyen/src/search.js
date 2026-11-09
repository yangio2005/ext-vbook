load('config.js');
function execute(query, page) {
    query = query || "";
    page = page || "1";

    var docs = [];
    var token = "";
    do {
        var result = listCollection("stories", 300, token);
        docs = docs.concat(result.docs);
        token = result.nextPageToken;
    } while (token && docs.length < 500);
    docs = sortByUpdatedDesc(docs);

    var items = [];
    for (var i = 0; i < docs.length; i++) {
        var f = docs[i].fields;
        if (query) {
            if (String(f.name || "").toLowerCase().indexOf(query.toLowerCase()) === -1) continue;
        }
        items.push(storyFields(docs[i]));
    }

    var start = (parseInt(page, 10) - 1) * 20;
    var slice = items.slice(start, start + 20);
    var next = items.length > start + 20 ? String(parseInt(page, 10) + 1) : "";
    return Response.success(slice, next);
}
