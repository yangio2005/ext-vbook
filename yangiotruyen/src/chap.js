load('config.js');
function execute(url) {
    var id = storyIdFromUrl(normalizeUrl(url));
    var chapId = chapterIdFromUrl(normalizeUrl(url));
    if (!id || !chapId) return Response.error("URL chương không hợp lệ");

    var doc = getDocument("stories/" + id + "/chapters/" + chapId);
    if (!doc) return Response.error("Không tìm thấy chương");
    var f = doc.fields;

    var content = String(f.content || "");
    if (content.indexOf("<") === -1) {
        content = content.replace(/\n/g, "<br>");
    }

    return Response.success(content, String(f.title || ""));
}
