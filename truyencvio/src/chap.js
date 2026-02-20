function execute(url) {
    var response = fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });

    if (response.ok) {
        var doc = response.html();
        // #chapter-content is the most accurate for the new theme
        var content = doc.select("#chapter-content").first();
        if (!content) {
            content = doc.select(".chapter-body, .chapter-content, .entry-content, article").first();
        }

        if (content) {
            // Clean up unwanted elements
            content.select("script, style, .ads, .social-share, .uk-pagination, .uk-navbar, header, footer, .author-info, .iue-vip-badge, .uk-breadcrumb").remove();

            return Response.success(content.html());
        }
    }
    return null;
}

