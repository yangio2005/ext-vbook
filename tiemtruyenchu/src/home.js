load('config.js');
function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: BASE_URL + "/danh-sach?sort=updated", script: "gen.js" },
        { title: "Truyện mới", input: BASE_URL + "/danh-sach?sort=new", script: "gen.js" },
        { title: "Hoàn thành", input: BASE_URL + "/danh-sach?status=full", script: "gen.js" },
        { title: "Sáng tác", input: BASE_URL + "/danh-sach?type=sang-tac", script: "gen.js" },
    ]);
}
