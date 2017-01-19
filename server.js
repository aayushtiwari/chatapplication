var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users=[];
connections=[];
server.listen(8888);
console.log('server is running');
app.get('/',function(req,res){
res.sendFile(__dirname +'/index.html');
});
io.sockets.on('connection',function(socket){
connections.push(socket);
console.log('connected :%s sockets connected',connections.length);
    socket.on('disconnect',function(data){
        users.splice(users.indexOf(socket.username),1);
        updateusernames();
        connections.splice(connections.indexOf(socket),1); 
console.log('disconnected:%s sockets connected',connections.length);
        
    });
socket.on('send message',function(data)
         {
   io.sockets.emit('new message',{msg:data, user:socket.username}); 
    
});
    socket.on('new user', function(data,callback){
       callback(true);
        socket.username=data;
        users.push(socket.username);
        updateusernames();
        
    });
    function updateusernames(){
        io.sockets.emit('get users',users);
        
    };
});
