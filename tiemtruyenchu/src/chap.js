load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        // Thử các selector phổ biến của Tiệm Truyện Chữ
        // Thường là #chapter-content, .chapter-content hoặc div.content
        let content = doc.select("#chapter-content, .chapter-content, article, .content-inner").first();

        if (content) {
            // Loại bỏ các phần tử thừa như nút điều hướng, quảng cáo bên trong nội dung
            content.select("script, style, .ads, .social-share, .btn, .breadcrumb, .chapter-nav").remove();

            let html = content.html();

            // Cleanup nội dung
            html = html.replace(/&nbsp;/g, ' ')
                .replace(/<i[^>]*>.*?<\/i>/g, '') // Xóa các icon rác
                .replace(/<p[^>]*>\s*<\/p>/g, ''); // Xóa các dòng trống thừa

            return Response.success(html);
        }
    }
    return null;
}