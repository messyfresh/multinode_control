var app = require('http').createServer();
var io = require('socket.io').listen(app);
var b = require('bonescript');

app.listen(8080);

io.set('log level', 2); // 1 - warn, 2 - info, 3 - debug

var ledBlue = "P8_13";
var tempPin = "P9_39";

b.pinMode(ledBlue, b.OUTPUT);
b.digitalWrite(ledBlue, b.LOW);

function tempCurrent(){
 var rawVolts = b.analogRead(tempPin);
 //console.log(rawVolts);
 var milliVolts = (rawVolts * 1800);
 //console.log(milliVolts);
 var tempC = ((milliVolts - 500)/10);
 console.log(tempC);
 var tempF = ((tempC * 9 / 5) + 32);
 console.log("It is " + tempF + " Degrees Farenheit");
}
//setInterval(tempCurrent, 1000);
tempCurrent();
io.sockets.on('connection', function (socket) {
    socket.on('ledBlue', function(data) {
     if (data == 'on') {
      b.digitalWrite(ledBlue,1);
        //console.log("Blue is On");
        
     }  else if (data == 'off') {
      b.digitalWrite(ledBlue,0);
        //console.log("Blue is Off");
     }
     });
    });