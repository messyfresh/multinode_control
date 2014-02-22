var app = require('http').createServer(handler); 
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8080);

io.set('log level', 3); // 1 - warn, 2 - info, 3 - debug

function handler (req, res) {
  if (req.url == "/favicon.ico"){ // handle requests for favicon.ico
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  console.log('favicon requested');
  return;
  }
  fs.readFile('ledControl.html', // load html file
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

