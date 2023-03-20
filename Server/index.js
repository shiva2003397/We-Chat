const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

app.get("/", function (req, res) {
    res.send("Hello!");
})

app.use(cors());

const server = http.createServer(app);

server.listen(port, function () {
    console.log('server is running on ' + port);
})


//SOCKET 

const users = [];

const io = socketIO(server);

//When socket will get connected it will executes the callback
io.on("connection", function (socket) {
    console.log("New connection!");

    //socket.on to receive the data from the client side.
    socket.on('joined', function ({ user , Room }) {
        users[socket.id] = user;
        
        console.log(user + " has joined!");

        socket.join(Room);

        //Sending a welcome message to the new joined member.
        // socket.emit('welcome', { user: "Admin", message: `Welcome to the chat , ${users[socket.id]} ` })

        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat , ${users[socket.id]} ` })

        //Jisne chat join ki hai uske alawaa sabhi ko message jayega!
        //Yet cheej socket.broadcast.emit ki help se ho rahi hai
        socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${users[socket.id]} has joined` });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]}  has left` });
        console.log(`user left`);
    })

    socket.on('message' , function ({message , id}) {
        io.emit('sendMessage',{user:users[id],message,id});
    })
})



//io - This is the full connection!
//Socket - For one single connection!