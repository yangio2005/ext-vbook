# Local Log Server

A simple Node.js server that listens to any incoming HTTP request and logs all details to the console.

## Features

- Logs all HTTP methods (GET, POST, PUT, DELETE, etc.)
- Displays request headers, query parameters, and body
- Shows timestamp, client IP, and user agent
- CORS enabled for cross-origin requests
- Pretty-prints JSON request bodies
- Graceful shutdown handling

## Usage

### Start the server:
```bash
npm start
```

or

```bash
node server.js
```

The server will start on `http://localhost:3000`

### Test the server:

**GET request:**
```bash
curl http://localhost:3000/test?param1=value1&param2=value2
```

**POST request with JSON:**
```bash
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, World!", "type": "test"}'
```

**Custom headers:**
```bash
curl -X GET http://localhost:3000/custom \
  -H "Authorization: Bearer token123" \
  -H "Custom-Header: custom-value"
```

## Output Example

When a request is received, the console will display:
```
================================================================================
[2024-01-15T10:30:45.123Z] New Request Received
Method: POST
URL: /api/test?debug=true
Client IP: ::1
User-Agent: curl/7.68.0

Headers:
  host: localhost:3000
  content-type: application/json
  content-length: 45

Query Parameters:
  debug: true

Request Body:
{
  "message": "Hello, World!",
  "type": "test"
}
================================================================================
```

## Stop the server

Press `Ctrl+C` to gracefully shutdown the server.