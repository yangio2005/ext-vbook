function execute() {
    var BASE_URL = "https://truyencv.io";
    return Response.success([
        { title: "Truyện Mới", input: BASE_URL + "/truyen/", script: "gen.js" },
        { title: "Truyện Full", input: BASE_URL + "/truyen-da-hoan-thanh/", script: "gen.js" },
        { title: "Tiên Hiệp", input: BASE_URL + "/the-loai/tien-hiep/", script: "gen.js" },
        { title: "Huyền Huyễn", input: BASE_URL + "/the-loai/huyen-huyen/", script: "gen.js" },
        { title: "Đô Thị", input: BASE_URL + "/the-loai/do-thi/", script: "gen.js" },
        { title: "Ngôn Tình", input: BASE_URL + "/the-loai/ngon-tinh/", script: "gen.js" }
    ]);
}
