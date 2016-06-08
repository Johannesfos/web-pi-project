
var lightapp = io('/lightapp');


<!-- check that site are ready -->
$(function() {
    console.log( "ready!" );
    lightapp.emit('ready');


<!--users using application -->
    lightapp.on('user', function(users){
      $('.users').text('There are ' + users + ' users connected to this application.');
    });

<!-- Check lightstate -->
    lightapp.on('Lightstate', function(ledlight){


      ledlight.slice(0,3).forEach( function(state, i, arr) {
        if(state) {
          $('.Lys'+i).text('PÅ');
          $('.myswitch').toggleClass("myswitchOn");
        }
        else {
          $('.Lys'+i).text('AV');
          $('.myswitch').toggleClass("myswitchOn");
        }
      });

      var testeetteleranna = ledlight.slice(0,-1).every(function(state){
        return state;
      });

      <!-- alle -->
        if (testeetteleranna){
             $('.Lys3').text("PÅ");
             $('.myswitch').toggleClass("myswitchOn");
        }else {
             $('.Lys3').text("AV");
             $('.myswitch').toggleClass("myswitchOn");
        }

  });

<!--LightSwitches-->
    $('.myswitch').click(function() {
      var LightSwitchid = $(this).attr('data-LightSwitchid');
      $(this).toggleClass("myswitchOn");
        lightapp.emit(LightSwitchid);
    });
});
