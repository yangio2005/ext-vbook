const http = require('http');
const url = require('url');

const PORT = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const requestUrl = req.url;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const clientIP = req.connection.remoteAddress || req.socket.remoteAddress || 'Unknown';

    let body = '';

    // Collect request body data
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Log the request details to console
        // console.log('\n' + '='.repeat(80));
        // console.log(`[${timestamp}] New Request Received`);
        // console.log(`Method: ${method}`);
        // console.log(`URL: ${requestUrl}`);
        // console.log(`Client IP: ${clientIP}`);
        // console.log(`User-Agent: ${userAgent}`);

        // Log headers
        // console.log('\nHeaders:');
        // Object.entries(req.headers).forEach(([key, value]) => {
        //     console.log(`  ${key}: ${value}`);
        // });

        // Log query parameters if any
        // const parsedUrl = url.parse(requestUrl, true);
        // if (Object.keys(parsedUrl.query).length > 0) {
        //     console.log('\nQuery Parameters:');
        //     Object.entries(parsedUrl.query).forEach(([key, value]) => {
        //         console.log(`  ${key}: ${value}`);
        //     });
        // }

        // Log request body if present
        if (body.length > 0) {
            try {
                // Try to parse as JSON for better formatting
                const jsonBody = JSON.parse(body);
                console.log(JSON.stringify(jsonBody, null, 2));
            } catch (e) {
                // If not JSON, log as plain text
                console.log(`[${timestamp}] : ` + body);
            }
        }

        // console.log('='.repeat(80));

        // Send response
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });

        const response = {
            status: 'success',
            message: 'Request logged successfully',
            timestamp: timestamp,
            method: method,
            url: requestUrl
        };

        res.end(JSON.stringify(response, null, 2));
    });
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Local Log Server started successfully!`);
    console.log(`📡 PC: http://localhost:${PORT}`);
    console.log(`� Điện thoại (cùng mạng): http://192.168.1.165:${PORT}`);
    console.log(`📝 Logs hiện ra ở đây. Ctrl+C để dừng.\n`);
    console.log('Waiting for requests...\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});