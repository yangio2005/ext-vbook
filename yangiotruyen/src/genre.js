load('config.js');
function execute() {
    var doc = getDocument("meta/genres");
    if (!doc) return Response.success([]);
    var list = decodeArray({ values: genreValues(doc) });
    var tabs = [];
    for (var i = 0; i < list.length; i++) {
        tabs.push({ title: list[i].name, input: list[i].name, script: "search.js" });
    }
    return Response.success(tabs);
}

function genreValues(doc) {
    var genres = doc.fields.genres;
    if (!genres || !(genres instanceof Array)) return [];
    var out = [];
    for (var i = 0; i < genres.length; i++) {
        var g = genres[i];
        if (g && g.name) out.push({ name: String(g.name), count: Number(g.count || 0) });
    }
    return out;
}
