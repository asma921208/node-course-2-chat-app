const path = require('path');
const http = require('http');
const express =  require ('express');
const socketIO = require('socket.io');

const{generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    // socket.emit('newEmail', {
    //     from: 'Mike@example.com',
    //     text: 'Hey. Watsapp',
    //     createdAt :123
    // });

    
socket.emit('newMessage', generateMessage('Admin', 'Welcome to The Chat App'));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined') );

    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail', newEmail);
    // });

     socket.on('createMessage', (message,callback)=>{
        console.log('Create Message', message);
        io.emit('newMessage', generateMessage(message.from , message.text));
        callback();
});

   socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
   });

    socket.on ('disconnect' , ()=>{
        console.log('Unable To Connect Server');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on Port ${port}`);
});