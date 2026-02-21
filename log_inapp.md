- Giải nén
- Chạy node server.js
- Máy tính và điện thoại xài cùng 1 mạng.
- Ở máy tính cmd->ipconfig, xem ip của máy
- xài code này để log tới server local, trước khi xài thì thay ip bằng ip của máy chạy server

```

let LOG_SERVER_URL = "http://192.168.1.23:3000"
let IS_DEBUG = true;

// Log to local server function
function logToServer(message) {
    try {
        if(IS_DEBUG == false)
            return;

        // Send log to server (fire and forget)
        fetch(`${LOG_SERVER_URL}/log`, {
            method: "POST",
            body: message
        });
    } catch (error) {
    }
}
```

LƯU Ý:
- khi debug xong thì tắt cờ IS_DEBUG=false để máy ko request tới server local nữa tốn tài nguyên làm chậm quá trình xử lý của truyện