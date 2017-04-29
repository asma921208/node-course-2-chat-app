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

socket.on('newLocationMessage', function (message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
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

    var messageTextBox= jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (){
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (){
    if(!navigator.geolocation){
        return alert('Geo Location Not Supported By Your Browser .!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location ...');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');;
        alert('Unable to fetch Location');

    });
});