load('config.js');

function execute(url, page) {
    if (!page) page = '1';

    // Thử gọi AJAX lấy JSON trước
    let response = fetch(url, {
        queries: {
            page: page,
            ajax: '1'
        }
    });

    if (response.ok) {
        try {
            // Dùng .json() trực tiếp thay vì .string()
            let resJson = response.json();
            if (resJson && resJson.success && Array.isArray(resJson.stories)) {
                let novelList = [];
                resJson.stories.forEach(story => {
                    if (story && story.title) {
                        novelList.push({
                            name: story.title.replace(/^(Convert|Dịch|Sáng tác)\s+/, "").trim(),
                            link: '/truyen/' + story.id,
                            description: (story.author || '') + ' | ' + (story.category || '') + ' | ' + (story.total_chapters || 0) + ' chương',
                            cover: story.poster,
                            host: BASE_URL
                        });
                    }
                });

                let next = null;
                if (resJson.currentPage < resJson.totalPages) {
                    next = (parseInt(resJson.currentPage) + 1).toString();
                }
                return Response.success(novelList, next);
            }
        } catch (e) {
            // Fallback nếu không phải JSON
        }
    }

    // Fallback: Parse bằng HTML nếu AJAX không trả về JSON hợp lệ
    response = fetch(url, {
        queries: {
            page: page
        }
    });
    if (response.ok) {
        let doc = response.html();
        let novelList = [];

        let nextBtn = doc.select(".pagination li.active + li:not(.disabled) button").first();
        let next = null;
        if (nextBtn) {
            let onclick = nextBtn.attr("onclick");
            let match = onclick.match(/page',\s*(\d+)/);
            if (match) next = match[1];
        }

        doc.select(".story-item").forEach(e => {
            let titleElement = e.select(".story-title").first();
            if (titleElement) {
                let name = titleElement.text().replace(/^(Convert|Dịch|Sáng tác)\s+/, "").trim();
                novelList.push({
                    name: name,
                    link: titleElement.attr("href"),
                    description: (e.select(".story-meta").text() || e.select(".story-desc").text() || "").trim(),
                    cover: e.select(".story-poster").attr("src"),
                    host: BASE_URL,
                });
            }
        });

        if (novelList.length > 0) {
            return Response.success(novelList, next);
        }
    }

    return null;
}