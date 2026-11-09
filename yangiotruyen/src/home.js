load('config.js');
function execute() {
    return Response.success([
        { title: "Mới nhất", input: "", script: "latest.js" },
        { title: "Thể loại", input: "", script: "genre.js" },
        { title: "Tìm kiếm", input: "", script: "search.js" }
    ]);
}
