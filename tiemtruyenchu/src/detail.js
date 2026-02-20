load('config.js');

function execute(url) {
    // Thêm User-Agent giống tangthuvien để vượt rào cản ảnh
    var response = fetch(url, {
        headers: {
            "user-agent": UserAgent.chrome()
        }
    });

    if (response.ok) {
        var doc = response.html();
        var genres = [];
        doc.select(".tag-pill").forEach(function (e) {
            var text = e.text().trim();
            var href = e.attr("href");
            if (href && (href.indexOf("cat=") !== -1 || href.indexOf("tag=") !== -1)) {
                genres.push({
                    title: text,
                    input: href,
                    script: "gen.js"
                });
            }
        });

        var titleEl = doc.select(".story-header h2").first();
        var name = titleEl ? (titleEl.select(".badge").remove(), titleEl.text().trim()) : doc.select("h1").text().trim();

        // Lấy và chuẩn hóa URL ảnh bìa
        var cover = doc.select(".story-poster").attr("src");
        if (cover && cover.indexOf("http") === -1) {
            cover = BASE_URL + cover;
        }

        var author = "Ẩn danh";
        var authorEl = doc.select("a[href*='/tac-gia/']").first();
        if (authorEl) author = authorEl.text().trim();

        var description = doc.select(".tab-content .content-text").html();
        if (!description) description = doc.select(".tab-content").first().html();

        var status = doc.html().indexOf("Hoàn thành") !== -1 ? "Hoàn thành" : "Đang ra";
        var stats = doc.select(".stat-item");
        var detail = "Tác giả: " + author + "<br>";
        detail += "Trạng thái: " + status + "<br>";
        if (stats.size() >= 3) {
            detail += "Lượt xem: " + stats.get(0).select(".stat-val").text() + " | ";
            detail += "Theo dõi: " + stats.get(1).select(".stat-val").text() + " | ";
            detail += "Đề cử: " + stats.get(2).select(".stat-val").text();
        }

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: detail,
            genres: genres,
            comment: {
                input: url,
                script: "comment.js"
            },
            ongoing: status === "Đang ra",
            host: BASE_URL
        });
    }
    return null;
}