load('config.js');

function execute(url) {
    var response = fetch(url, {
        headers: {
            "user-agent": UserAgent.chrome()
        }
    });

    if (response.ok) {
        var doc = response.html();
        var data = [];
        var els = doc.select(".comment-item");

        for (var i = 0; i < els.size(); i++) {
            var e = els.get(i);
            var name = e.select(".comment-name").text().trim();
            var content = e.select(".comment-body p").text().trim();
            var time = e.select(".pc-time").text().trim();
            var avatar = e.select(".comment-avatar").attr("src");

            if (avatar && avatar.indexOf("http") === -1) {
                avatar = BASE_URL + avatar;
            }

            if (name && content) {
                data.push({
                    name: name,
                    content: content,
                    description: time,
                    avatar: avatar // Một số app hỗ chọn avatar cho comment
                });
            }
        }

        return Response.success(data);
    }
    return null;
}
