load('config.js');
function execute(url) {
    var id = storyIdFromUrl(normalizeUrl(url));
    if (!id) return Response.error("URL không hợp lệ");

    var chapters = [];
    var token = "";
    do {
        var result = listCollection("stories/" + id + "/chapters", 300, token, "__name__");
        for (var i = 0; i < result.docs.length; i++) {
            var doc = result.docs[i];
            var f = doc.fields;
            chapters.push({
                name: f.title || "Chương " + (f.number || doc.id),
                url: chapterLink(id, doc.id),
                description: "",
                lock: false,
                pay: false
            });
        }
        token = result.nextPageToken;
    } while (token);

    return Response.success(chapters);
}
