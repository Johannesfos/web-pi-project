//GPIO
var ledlight = [false, false, false, false];
var users = 0;

var lysstyring = function(socket){


  users = users + 1;
  console.log('User connected to lightapp, there are ' + users + ' connected!');

  <!-- Lys stue betjenes -->
  socket.on('LightSwitch1', function () {
      ledlight[0] = !ledlight[0];
      console.log('Lys1: ' + ledlight[0]);
      socket.broadcast.emit('Lightstate', ledlight);
      socket.broadcast.emit('user', users);
  });

  <!-- Lys bad betjenes -->
  socket.on('LightSwitch2', function () {
      ledlight[1] = !ledlight[1];
      console.log('Lys2: ' + ledlight[1]);
      socket.broadcast.emit('Lightstate', ledlight);
  });

  <!-- Lys kjokken betjenes -->
  socket.on('LightSwitch3', function () {
      ledlight[2] = !ledlight[2];
      console.log('Lys3: ' + ledlight[2]);
      socket.broadcast.emit('Lightstate', ledlight);
  });

  <!-- alle lys paa betjenes -->
  socket.on('LightSwitch4', function () {
    if ((ledlight[0] == true) && (ledlight[1] == true) && (ledlight[2] == true) && (ledlight[3] == true)){
        ledlight = [false, false, false, false];
    } else {
        ledlight = [true, true, true, true];
    }
      console.log('Lys4: ' + ledlight[3]);
      socket.broadcast.emit('Lightstate', ledlight);
  });


  socket.on('disconnect', function(){
    users = users - 1;
    console.log('User disconnected lightapp, there are ' + users + ' connected!');
    socket.broadcast.emit('user', users);
  });

  socket.on('ready', function (){
    socket.broadcast.emit('Lightstate', ledlight);
    socket.broadcast.emit('user', users);
  });



};

module.exports = lysstyring;
