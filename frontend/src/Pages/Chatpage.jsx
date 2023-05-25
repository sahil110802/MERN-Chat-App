import  { useEffect, useState } from 'react'
import axios from 'axios'


const Chatpage = () => {
  const [Chats,setChats]=useState([]);

  const fetchChat= async()=>{

    const {data}= await axios.get('http://localhost:5000/api/chat');
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    fetchChat();
  }, []);
  
  
  return (
    <div>
      {Chats.map((chat)=>(<div key={chat._id}>{chat.chatName}</div>))}
    </div>
  )
}
export default Chatpage
