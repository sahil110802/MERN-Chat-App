const express=  require("express");
const chats=require("./data/data");
const app=express();
const cors=require('cors')
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes= require('./routes/userRoutes')
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
dotenv.config();
app.use(cors()); 
connectDB();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("API is RUNNIng");
});

// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// })

app.get("/api/chat/:id", (req,res)=>{
    const singleChat=chats.find((c)=> c._id === req.params.id);
    res.send(singleChat);
})


app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


const PORT= process.env.PORT || 5000;
const server=app.listen(PORT, console.log(`Server started on port ${PORT}`));


const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:5173",
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join=(room);
        console.log("User joined room: "+room);
    })

    socket.on("new message",(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;
        if(!chat.users)return console.log("chat.users not defined")

        chat.users.forEach((user) => {
            if(user._id===newMessageRecieved.sender._id)return;

            socket.in(user._id).emit("message recieved",newMessageRecieved);
        });
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));



    socket.off("setup",()=>{
        console.log("User disconnected")
        socket.leave(userData._id)
    })
})