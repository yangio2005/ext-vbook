function execute(url) {
    var BASE_URL = "https://truyencv.io";
    var response = fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });

    if (response.ok) {
        var doc = response.html();
        var list = [];
        var novelUrl = url;
        if (novelUrl.indexOf("?") !== -1) novelUrl = novelUrl.split("?")[0];
        if (novelUrl.lastIndexOf("/") !== novelUrl.length - 1) novelUrl += "/";

        // 1. Extract mangaId
        var mangaId = "";
        var htmlStr = doc.html();

        // Pattern 1: window.post_id (most reliable in recent themes)
        var postIdMatch = htmlStr.match(/window\.post_id\s*=\s*(\d+)/) || htmlStr.match(/var\s+post_id\s*=\s*(\d+)/);
        if (postIdMatch) {
            mangaId = postIdMatch[1];
        }

        // Pattern 2: data-id in chapter-toggle
        if (!mangaId) {
            var toggle = doc.select("#chapter-toggle").first();
            if (toggle) mangaId = toggle.attr("data-id");
        }

        // Pattern 3: general data-id or manga-id in scripts
        if (!mangaId) {
            var mIdMatch = htmlStr.match(/manga_id["']?:\s*(\d+)/) || htmlStr.match(/mangaId["']?:\s*(\d+)/);
            if (mIdMatch) mangaId = mIdMatch[1];
        }

        // 2. Fetch using REST API with loop for pagination
        if (mangaId) {
            var page = 1;
            var totalPages = 1;
            do {
                // Use per_page=20 to match the observed working requests in chuong.md
                var apiUrl = BASE_URL + "/wp-json/initmanga/v1/chapters?manga_id=" + mangaId + "&paged=" + page + "&per_page=100&order=asc";
                var apiResponse = fetch(apiUrl, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                    }
                });

                if (apiResponse.ok) {
                    var json = apiResponse.json();
                    // CRITICAL FIX: The key is "items" in the new theme API
                    var chapters = json.items || json.chapters || [];
                    if (chapters && chapters.length > 0) {
                        totalPages = json.total_pages || 1;
                        chapters.forEach(chap => {
                            var name = chap.title || "";
                            var num = chap.number;
                            // Format name: Chương X: Tên
                            if (num && name.toLowerCase().indexOf("chương") === -1) {
                                name = "Chương " + num + ": " + name;
                            } else if (!name) {
                                name = "Chương " + num;
                            }

                            list.push({
                                name: name.trim(),
                                url: novelUrl + (chap.slug || ("chuong-" + num)) + "/",
                                host: BASE_URL
                            });
                        });
                        page++;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            } while (page <= totalPages && page <= 100); // Increased limit
        }

        // 3. Fallback to scraping if API failed or returned 0 chapters
        if (list.length === 0) {
            var els = doc.select(".chapter-list a, .chuong-list a, .list-chapters a, .uk-accordion-content a, a[href*='/chuong-']");
            els.forEach(e => {
                var name = e.text().trim();
                var href = e.attr("href");
                if (href && (href.indexOf("/chuong-") !== -1 || href.indexOf("/chuong/") !== -1)) {
                    if (name.toLowerCase().indexOf("chương") !== -1 || name.match(/\d+/)) {
                        if (href.indexOf("http") === -1) href = BASE_URL + href;
                        list.push({
                            name: name,
                            url: href,
                            host: BASE_URL
                        });
                    }
                }
            });

            // Remove duplicates
            var seen = {};
            list = list.filter(function (item) {
                return seen.hasOwnProperty(item.url) ? false : (seen[item.url] = true);
            });

            // Reverse if newest is on top
            if (list.length > 1) {
                var firstCap = list[0].name.match(/\d+/);
                var lastCap = list[list.length - 1].name.match(/\d+/);
                if (firstCap && lastCap && parseInt(firstCap[0]) > parseInt(lastCap[0])) {
                    list.reverse();
                }
            }
        } else {
            // Sort list by chapter number just in case API returns them out of order (like newest first)
            list.sort(function (a, b) {
                var aNum = a.name.match(/\d+/);
                var bNum = b.name.match(/\d+/);
                if (aNum && bNum) return parseInt(aNum[0]) - parseInt(bNum[0]);
                return 0;
            });

            // Remove duplicates after sorting
            var seenApi = {};
            list = list.filter(function (item) {
                return seenApi.hasOwnProperty(item.url) ? false : (seenApi[item.url] = true);
            });
        }

        return Response.success(list);
    }
    return null;
}
