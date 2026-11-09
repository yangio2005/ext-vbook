load('config.js');
function execute(url) {
    var id = storyIdFromUrl(normalizeUrl(url));
    if (!id) return Response.error("URL không hợp lệ");
    var doc = getDocument("stories/" + id);
    if (!doc) return Response.error("Không tìm thấy truyện");
    var f = doc.fields;

    var genres = [];
    var list = f.genres || [];
    for (var i = 0; i < list.length; i++) {
        genres.push({ title: String(list[i]), input: String(list[i]), script: "search.js" });
    }

    return Response.success({
        name: f.name || id,
        author: f.author || "",
        cover: f.cover || "",
        description: f.description || "",
        detail: "Chương: " + (f.chapterCount || 0),
        url: storyLink(id),
        type: "novel",
        format: "novel",
        ongoing: f.status !== "completed",
        genres: genres
    });
}
