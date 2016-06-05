module.exports = {

lightapp:  function(){

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

},

chatapp: function(){

<!-- on connection to the chat app -->
var chatapp = io.of('/chatapp').on('connection', function(chatapp){
  var connected = 0
  connected += 1;
  console.log('User connected to chat application ' + connected + 'connected')
  chatapp.emit('connected');
  chatapp.broadcast.emit('connected');

  chatapp.on('chat message', function(msg){
      console.log('message: ' + msg);
      chatapp.emit('chat message', msg);
      chatapp.broadcast.emit('chat message', msg)

  });


  chatapp.on('disconnect', function (){
    connected -= 1;
    console.log('User disconnected for chat application ' + connected + 'connected');
    chatapp.emit('disconnected');
    chatapp.broadcast.emit('disconnected');

  });





});

};


};
