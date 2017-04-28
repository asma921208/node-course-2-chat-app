var socket = io();

socket.on('connect', function () {
    console.log("User Connected client");

    // socket.emit('createEmail',{
    //     to: 'jen@example.com',
    //     text: 'Hey. This is Andrew'
    // });

  

});

socket.on('disconnect', function () {
    console.log('Unable To Connect Client');
});

// socket.on('newEmail', function(email){
//     console.log('New Email', email);
// });

socket.on('newMessage', function(message){
    console.log('New Message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages'). append(li);
});

// socket.emit('createMessage',{
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got It', data);
// });

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (){

    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geo Location Not Supported By Your Browser .!');
    }

    navigator.geolocation.getCurrentPosition(function (position){
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
    }, function () {

        alert('Unable to fetch Location');

    });
});