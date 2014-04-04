var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(1337, 'server.local');
console.log('Server running at http://server.local:1337/');
