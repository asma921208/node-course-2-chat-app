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
});