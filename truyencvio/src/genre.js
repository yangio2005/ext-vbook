function execute() {
    var BASE_URL = "https://truyencv.io";
    var response = fetch(BASE_URL + "/bo-loc-nang-cao/", {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });

    if (response.ok) {
        var doc = response.html();
        var genres = [];

        // Parse dựa trên cấu trúc checkbox trong id="genre-dropdown" của bolocnangcao.html
        doc.select(".genre-checkbox").forEach(e => {
            var title = e.attr("data-genre-name");
            var slug = e.attr("value");

            if (title && slug) {
                genres.push({
                    title: title,
                    input: BASE_URL + "/the-loai/" + slug + "/",
                    script: "gen.js"
                });
            }
        });

        // Nếu không tìm thấy bằng class trên (đề phòng đổi tên), thử selector rộng hơn
        if (genres.length === 0) {
            doc.select("input[name='genre[]']").forEach(e => {
                var label = e.parent().text().trim().replace(/\s*\(\d+\)$/, ""); // Xóa (số lượng truyện)
                var slug = e.attr("value");
                if (label && slug) {
                    genres.push({
                        title: label,
                        input: BASE_URL + "/the-loai/" + slug + "/",
                        script: "gen.js"
                    });
                }
            });
        }

        if (genres.length > 0) {
            return Response.success(genres);
        }
    }
    return Response.error("Không thể tải danh sách thể loại");
}
