const io = require("socket.io")(3000,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


var  users = {}
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',users[socket.id], message);
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    })
})