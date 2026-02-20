var BASE_URL = 'https://www.tiemtruyenchu.com';
try {
    if (typeof CONFIG_URL !== 'undefined' && CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
    // Bỏ qua lỗi
}