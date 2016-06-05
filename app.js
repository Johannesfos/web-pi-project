/**
 * Created by johannesfoslund on 26.05.2016.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Gpio = require('onoff').Gpio;



//variables
var ledlight = [false, false, false, false];
var users = 0;

//GPIO setup
var led1 = new Gpio(14, 'out');
var led2 = new Gpio(15, 'out');
var led3 = new Gpio(18, 'out');


led1.writeSync(setlight(ledlight[0]));
led2.writeSync(setlight(ledlight[1]));
led3.writeSync(setlight(ledlight[2]));

function setlight(lightstate){
var y = (lightstate == true ? 1 : 0);
return y;
};


//set path for app
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));





<!-- Render home page -->
app.get('/', function(req, res){
    res.render('pages/index');
});

<!-- Render about page -->
app.get('/about', function (req, res) {
    res.render('pages/about');
});

<!-- Render light page -->
app.get('/light', function(req, res){
    res.render('pages/lights');
});

<!-- Render map page -->
app.get('/map', function (req,res){
   res.render('pages/map');
});

app.get('/chat', function(req, res){
  res.render('pages/chat');
});



<!-- user connection to lightapp -->
var lightapp = io.of('/lightapp').on('connection', function(lightapp){

users = users + 1;
console.log('User connected to lightapp, there are ' + users + ' connected!');

<!-- Lys stue betjenes -->
lightapp.on('LightSwitch1', function () {

    ledlight[0] = !ledlight[0];
    console.log('Lys1: ' + ledlight[0]);
    lightapp.emit('Lightstate', ledlight);
    lightapp.broadcast.emit('Lightstate', ledlight);
    lightapp.emit('user', users);
    lightapp.broadcast.emit('user', users);
    led1.writeSync(setlight(ledlight[0]));

});

<!-- Lys bad betjenes -->
lightapp.on('LightSwitch2', function () {
    ledlight[1] = !ledlight[1];
    console.log('Lys2: ' + ledlight[1]);
    lightapp.emit('Lightstate', ledlight);
    lightapp.broadcast.emit('Lightstate', ledlight);
    lightapp.emit('user', users);
    lightapp.broadcast.emit('user', users);
    led2.writeSync(setlight(ledlight[1]));



});

<!-- Lys kjokken betjenes -->
lightapp.on('LightSwitch3', function () {
    ledlight[2] = !ledlight[2];
    console.log('Lys3: ' + ledlight[2]);
    lightapp.emit('Lightstate', ledlight);
    lightapp.broadcast.emit('Lightstate', ledlight);
    led3.writeSync(setlight(ledlight[2]));


});

<!-- alle lys paa betjenes -->
lightapp.on('LightSwitch4', function () {
  if ((ledlight[0]) && (ledlight[1]) && (ledlight[2]) && (ledlight[3])){
      ledlight = [false, false, false, false];
      led1.writeSync(setlight(ledlight[0]));
      led2.writeSync(setlight(ledlight[1]));
      led3.writeSync(setlight(ledlight[2]));

  } else {
      ledlight = [true, true, true, true];
      led1.writeSync(setlight(ledlight[0]));
      led2.writeSync(setlight(ledlight[1]));
      led3.writeSync(setlight(ledlight[2]));



  }
    console.log('Lys4: ' + ledlight[3]);
    lightapp.emit('Lightstate', ledlight);
    lightapp.broadcast.emit('Lightstate', ledlight);


});


lightapp.on('disconnect', function(){
  users = users - 1;
  console.log('User disconnected lightapp, there are ' + users + ' connected!');
  lightapp.emit('user', users);
  lightapp.broadcast.emit('user', users);
});

lightapp.on('ready', function (){
  lightapp.emit('Lightstate', ledlight);
  lightapp.broadcast.emit('Lightstate', ledlight);
  lightapp.emit('user', users);
  lightapp.broadcast.emit('user', users);
});

});



<!-- on connection to the chat app -->
var chatapp = io.of('/chatapp').on('connection', function(chatapp){
  var connected = 0
  connected += 1;
  console.log('User connected to chat application ' + connected + ' connected')
  chatapp.emit('connected');
  chatapp.broadcast.emit('connected');

  chatapp.on('chat message', function(msg){
      console.log('message: ' + msg);
      chatapp.emit('chat message', msg);
      chatapp.broadcast.emit('chat message', msg)

  });


  chatapp.on('disconnect', function (){
    connected -= 1;
    console.log('User disconnected for chat application ' + connected + ' connected');
    chatapp.emit('disconnected');
    chatapp.broadcast.emit('disconnected');

  });





});








server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
