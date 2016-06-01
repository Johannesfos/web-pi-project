/**
 * Created by johannesfoslund on 26.05.2016.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


//variables
var ledlight = [false, false, false, false];
var users = 9;






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



<!-- user connection -->
io.on('connection', function(socket){

users = users + 1;
console.log('User connected to lightapp, there are ' + users + ' connected!');

<!-- Lys stue betjenes -->
socket.on('LightSwitch1', function () {
    ledlight[0] = !ledlight[0];
    console.log('Lys1: ' + ledlight[0]);
    socket.emit('Lightstate', ledlight);
    socket.emit('user', users);
});

<!-- Lys bad betjenes -->
socket.on('LightSwitch2', function () {
    ledlight[1] = !ledlight[1];
    console.log('Lys2: ' + ledlight[1]);
    socket.emit('Lightstate', ledlight);
});

<!-- Lys kjokken betjenes -->
socket.on('LightSwitch3', function () {
    ledlight[2] = !ledlight[2];
    console.log('Lys3: ' + ledlight[2]);
    socket.emit('Lightstate', ledlight);
});

<!-- alle lys paa betjenes -->
socket.on('LightSwitch4', function () {
  if ((ledlight[0] == true) && (ledlight[1] == true) && (ledlight[2] == true) && (ledlight[3] == true)){
      ledlight = [false, false, false, false];
  } else {
      ledlight = [true, true, true, true];
  }
    console.log('Lys4: ' + ledlight[3]);
    socket.emit('Lightstate', ledlight);
});


socket.on('disconnect', function(){
  users = users - 1;
  console.log('User disconnected lightapp, there are ' + users + ' connected!');
  socket.emit('user', users);
});

socket.on('ready', function (){
  socket.emit('Lightstate', ledlight);
  socket.emit('user', users);
});

});






server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
