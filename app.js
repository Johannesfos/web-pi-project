/**
 * Created by johannesfoslund on 26.05.2016.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chat = io.of('/chat');
var lights = io.of('/lights');
var lightss = require('./lysstyring');





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
lights.on('connection', lightss);







server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
