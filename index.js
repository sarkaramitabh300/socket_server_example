
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.route("/").get((req, res) => {
  res.json("welcome to socket server")
});
io.on('connection', function (socket) {
  console.log(socket.id+' just connected!')

  // Echo back messages from the client
  socket.on('message', function (message) {
    console.log('Got message from client: ' + socket.id +" : "+ message)
    socket.emit('message', message)
  })

  socket.on("sendMsg",(msg)=>{
    console.log("msg",msg,{...msg,type:"otherMsg"});
    socket.emit("sendMsgServer",{...msg,type:"otherMsg"})
  })
})
httpServer.listen(3000);