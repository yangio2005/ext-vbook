load("config.js");

function execute(url, page) {
    if (!page) page = "1";

    var response = fetch(url, {
        headers: {
            "user-agent": UserAgent.chrome()
        },
        queries: {
            page: page,
            ajax: "1"
        }
    });

    if (response.ok) {
        var resJson = response.json();
        if (resJson && resJson.success && resJson.stories) {
            var novelList = [];
            var stories = resJson.stories;
            for (var i = 0; i < stories.length; i++) {
                var story = stories[i];
                novelList.push({
                    name: story.title.replace(/^(Convert|Dịch|Sáng tác)\s+/, "").trim(),
                    link: BASE_URL + "/truyen/" + story.id, // Đảm bảo link đầy đủ
                    description: (story.author || "") + " | " + (story.category || ""),
                    cover: story.poster ? (story.poster.startsWith("http") ? story.poster : BASE_URL + story.poster) : null,
                    host: BASE_URL
                });
            }

            var next = null;
            if (resJson.currentPage < resJson.totalPages) {
                next = (parseInt(resJson.currentPage) + 1).toString();
            }
            return Response.success(novelList, next);
        }
    }

    return null;
}