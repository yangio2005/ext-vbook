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

            // Loại bỏ các dòng spam ngắt trang của tác giả / cvt
            // Ví dụ: ====, ____, >>>>, ....., ------, ~~~~~~, ****
            html = html.replace(
                /<p[^>]*>\s*[=_>\.<\-~*]{3,}\s*<\/p>/gi,
                ''
            );

            // Loại bỏ các dòng chứa PS, P/S, Note, chú thích của cvt/tg
            // Ví dụ: ps:/, p/s:, (ps:, note:, [cvt:, [tg:
            html = html.replace(
                /<p[^>]*>[^<]*(?:ps\s*[:/]|p\/s\s*[:/]|note\s*[:/]|\[cvt|\[tg|cvt\s*:|tác giả\s*:|【cvt|【tg)[^<]*<\/p>/gi,
                ''
            );

            // Loại bỏ các đoạn span/text thuần chỉ chứa ký tự lặp
            html = html.replace(/([=_>\.\-~*▬─]{3,})/g, '');

            return Response.success(html);
        }
    }
    return null;
}