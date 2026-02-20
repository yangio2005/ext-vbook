function execute(key, page) {
    var BASE_URL = "https://truyencv.io";
    if (!page) page = '1';
    var url = BASE_URL + "/page/" + page + "/";

    var response = fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        queries: {
            "s": key
        }
    });

    if (response.ok) {
        var doc = response.html();
        var list = [];

        doc.select(".uk-card, .slider-carousel-card, .manga-item, .uk-panel, .latest-updated-list > div, .story-item").forEach(e => {
            var titleEl = e.select(".uk-card-title a, h2 a, h3 a, a.uk-link-heading").first();
            if (!titleEl) titleEl = e.select("h2, h3").first(); // fallback to header itself

            if (titleEl) {
                var name = titleEl.text().trim();
                var link = titleEl.attr("href");
                if (!link) {
                    var a = e.select("a").first();
                    if (a) link = a.attr("href");
                }

                var cover = "";
                var img = e.select("img").first();
                if (img) {
                    cover = img.attr("src") || img.attr("data-src") || img.attr("data-lazy-src");
                }

                if (name && link && link.indexOf("/truyen/") !== -1 && link.indexOf("/the-loai/") === -1) {
                    if (link.indexOf("http") === -1) link = BASE_URL + link;
                    list.push({
                        name: name,
                        link: link,
                        cover: cover,
                        description: e.select(".uk-text-meta, .author, .manga-genres").text().trim(),
                        host: BASE_URL
                    });
                }
            }
        });

        // Remove duplicates
        var seen = {};
        list = list.filter(function (item) {
            return seen.hasOwnProperty(item.link) ? false : (seen[item.link] = true);
        });

        var next = doc.select(".uk-pagination .uk-active + li a").text();

        return Response.success(list, next);
    }
    return null;
}

