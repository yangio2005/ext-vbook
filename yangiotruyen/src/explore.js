load('config.js');
function execute() {
    var result = listCollection("stories", 20, "", "updatedAt");
    var docs = sortByUpdatedDesc(result.docs);

    var items = [];
    for (var i = 0; i < docs.length; i++) {
        items.push(storyItem(docs[i]));
    }

    return Response.success([
        {
            id: "latest",
            title: "Mới cập nhật",
            subtitle: "Truyện vừa được agent đăng chương mới",
            type: "grid",
            items: items,
            more: { type: "list", name: "Tất cả", script: "search.js", input: "" }
        }
    ]);
}
