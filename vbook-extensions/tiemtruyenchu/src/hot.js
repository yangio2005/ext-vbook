load('config.js');

function execute(url, page) {
    if (!page) page = '1';

    let response = fetch(url, {
        queries: {
            page: page,
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novelList = [];

        let next = doc.select(".pagination li.active + li:not(.disabled) button").attr("onclick");
        if (next) {
            let match = next.match(/page',\s*(\d+)/);
            if (match) next = match[1];
            else next = null;
        }

        doc.select(".story-item").forEach(e => {
            let titleElement = e.select(".story-title");
            let name = titleElement.text();
            name = name.replace(/^(Convert|Dịch|Sáng tác)\s+/, "").trim();

            novelList.push({
                name: name,
                link: titleElement.attr("href"),
                description: e.select(".story-desc").text().trim(),
                cover: e.select(".story-poster").attr("src"),
                host: BASE_URL,
            });
        });
        return Response.success(novelList, next);
    }
    return null;
}