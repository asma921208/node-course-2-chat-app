const path = require('path');
const http = require('http');
const express =  require ('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.emit('newEmail', {
        from: 'Mike@example.com',
        text: 'Hey. Watsapp',
        createdAt :123
    });



    socket.on('createEmail',(newEmail)=>{
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message)=>{
        console.log('Create Message', message);
        io.emit('newMessage',{
            from: message.from,
            test: message.text,
            createdAt: new Date(). getTime()
        });
    });

    socket.on ('disconnect' , ()=>{
        console.log('Unable To Connect Server');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on Port ${port}`);
});