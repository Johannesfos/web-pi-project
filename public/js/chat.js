var chatapp = io('/chatapp');








var bruker = 0;
$('form').submit(function(){
  chatapp.emit('chat message', $('#m').val());
  $('#m').val('');
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  return false;
});
chatapp.on('chat message', function(msg){
  $('#messages').append($('<li>').text('client: ' + msg));
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

chatapp.on('connected', function(){
bruker += 1;
$('#messages').append($('<li>').text('new user connected. ' + bruker + ' connected'));
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});


chatapp.on('disconnected', function(){
bruker -= 1;
$('#messages').append($('<li>').text('User left. ' + bruker + ' connected'));
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});
