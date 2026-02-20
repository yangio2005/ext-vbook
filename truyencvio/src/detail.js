function execute(url) {
    var BASE_URL = "https://truyencv.io";
    var response = fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });

    if (response.ok) {
        var doc = response.html();
        var h1El = doc.select("h1").first();
        var name = h1El ? h1El.text().trim() : "Chưa cập nhật";

        var imgEl = doc.select(".story-header img, .manga-info img, .story-poster, .story-cover-wrap img").first();
        var cover = imgEl ? imgEl.attr("src") : "";

        var authorEl = doc.select("a[href*='/author/'], a[href*='/tac-gia/'], .manga-info-details a").first();
        var author = authorEl ? authorEl.text().trim() : "Ẩn danh";

        var description = doc.select("#manga-description, .story-description, .description-content, .entry-content").html();

        var genres = [];
        doc.select(".genre-link, .tag-pill, a[href*='/the-loai/']").forEach(e => {
            var text = e.text().trim();
            if (text) {
                var input = e.attr("href");
                if (input && input.indexOf("http") === -1) {
                    input = BASE_URL + input;
                }
                genres.push({
                    title: text,
                    input: input,
                    script: "gen.js"
                });
            }
        });

        var htmlStr = doc.html();
        var status = doc.select("#manga-status").text().trim();
        if (!status) {
            status = "Đang ra";
            if (htmlStr.indexOf("Trọn bộ") !== -1 || htmlStr.indexOf("Hoàn thành") !== -1 || htmlStr.indexOf("FULL") !== -1 || htmlStr.indexOf("Hoàn Thành") !== -1) {
                status = "Hoàn thành";
            }
        }

        var chapterCount = "";
        var infoBlock = doc.select(".uk-margin-small-top.uk-text-secondary").first();
        if (infoBlock) {
            var infoText = infoBlock.text();
            var chapMatch = infoText.match(/(\d+)\s+Chương/);
            if (chapMatch) chapterCount = chapMatch[1];
        }

        var viewCount = "";
        var viewEl = doc.select(".init-plugin-suite-view-count-number").first();
        if (viewEl) {
            viewCount = viewEl.text().trim();
        }

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: "Tác giả: " + author + "<br>Trạng thái: " + status + (chapterCount ? "<br>Số chương: " + chapterCount : "") + (viewCount ? "<br>Lượt xem: " + viewCount : ""),
            genres: genres,
            ongoing: status.indexOf("Hoàn thành") === -1 && status.indexOf("Trọn bộ") === -1,
            host: BASE_URL
        });
    }
    return null;
}
