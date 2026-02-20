function send(data) {
	try {
		ws.send(data);
	} catch (e) {
        void(0);
	}
}

function log(msg) {
    // Chuẩn bị nội dung hiển thị
    let displayMsg = (msg === undefined ? 'undefined' : msg.toString());
    
    // Escape để tránh lỗi HTML injection (an toàn hơn innerHTML)
    displayMsg = displayMsg
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    // Tạo dòng log mới với màu
    const line = document.createElement('div');
    line.className = 'log-line';
    line.style.color = '#e0ffe0';
    line.textContent = displayMsg;  // dùng textContent thay innerHTML để an toàn

    // Thêm vào log container
    const logDiv = document.getElementById("log");
    if (logDiv) {
        logDiv.appendChild(line);
        logDiv.scrollTop = logDiv.scrollHeight;  // auto scroll xuống dưới
    }

    // Gửi qua WebSocket nếu ws tồn tại và sẵn sàng
    try {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(displayMsg);
        }
    } catch (e) {
        // Im lặng nếu ws lỗi (như cũ), hoặc có thể log lỗi ra console nếu muốn debug
        // console.error("WebSocket send error:", e);
    }
}