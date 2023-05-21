const express=  require("express");
const chats=require("./data/data");
const app=express();
const cors=require('cors')
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes= require('./routes/userRoutes')
dotenv.config();
app.use(cors()); 
connectDB();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("API is RUNNIng");
});

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

app.get("/api/chat/:id", (req,res)=>{
    const singleChat=chats.find((c)=> c._id === req.params.id);
    res.send(singleChat);
})


app.use('/api/user',userRoutes);
const PORT= process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));