load('config.js');

function execute() {
    return Response.success(
        [
            { "title": "Hiện đại", "input": BASE_URL + "/danh-sach?cat=hien-dai", "script": "gen.js" },
            { "title": "Cổ đại", "input": BASE_URL + "/danh-sach?cat=co-dai", "script": "gen.js" },
            { "title": "Tiên hiệp", "input": BASE_URL + "/danh-sach?cat=tien-hiep", "script": "gen.js" },
            { "title": "Huyền huyễn", "input": BASE_URL + "/danh-sach?cat=huyen-huyen", "script": "gen.js" },
            { "title": "Đô thị", "input": BASE_URL + "/danh-sach?cat=do-thi", "script": "gen.js" },
            { "title": "Khoa huyễn", "input": BASE_URL + "/danh-sach?cat=khoa-huyen", "script": "gen.js" },
            { "title": "Huyền nghi", "input": BASE_URL + "/danh-sach?cat=huyen-nghi", "script": "gen.js" },
            { "title": "Linh dị", "input": BASE_URL + "/danh-sach?cat=linh-di", "script": "gen.js" },
            { "title": "Võng du", "input": BASE_URL + "/danh-sach?cat=vong-du", "script": "gen.js" },
            { "title": "Đồng nhân", "input": BASE_URL + "/danh-sach?cat=dong-nhan", "script": "gen.js" },
            { "title": "Cạnh kỹ", "input": BASE_URL + "/danh-sach?cat=canh-ky", "script": "gen.js" },
            { "title": "Khác", "input": BASE_URL + "/danh-sach?cat=khac", "script": "gen.js" }
        ]
    );
}