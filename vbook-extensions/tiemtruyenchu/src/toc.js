load('config.js');

function execute(url) {
    // Clone logic WikiDich: Đảm bảo BASE_URL chuẩn
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var response = Http.get(url);
    if (response) {
        var doc = response.html();
        var data = [];
        var seen = {};

        // Nhắm vào đúng modal chứa mục lục để lấy danh sách chuẩn
        var els = doc.select("#muclucModal a.list-group-item");

        // Nếu không có modal thì lấy tất cả link chương (fallback)
        if (els.size() === 0) {
            els = doc.select("a[href*='/chuong/']");
        }

        for (var i = 0; i < els.size(); i++) {
            var e = els.get(i);
            var name = e.text().trim();
            var href = e.attr("href");
            var cls = e.attr("class") || "";

            if (href && href.indexOf("/chuong/") !== -1 && !seen[href]) {
                // Loại bỏ các nút điều hướng
                if (cls.indexOf("btn") === -1 && !name.match(/(Chương trước|Chương sau|Đọc truyện|Mới nhất|Mới xem)/i)) {
                    data.push({
                        name: name,
                        url: href,
                        host: BASE_URL
                    });
                    seen[href] = true;
                }
            }
        }

        // DỌN DẸP: Nếu chương đầu tiên lớn hơn chương thứ hai (vd: chương 478 đứng trước chương 1)
        if (data.length > 1) {
            var n0 = 0, n1 = 0;
            var m0 = data[0].name.match(/\d+/);
            var m1 = data[1].name.match(/\d+/);

            if (m0 && m1) {
                n0 = parseInt(m0[0], 10);
                n1 = parseInt(m1[0], 10);
                if (n0 > n1 && n0 > 5) {
                    data.shift(); // Dùng shift() vì WikiDich cũng dùng mảng chuẩn
                }
            }
        }

        return Response.success(data);
    }
    return null;
}