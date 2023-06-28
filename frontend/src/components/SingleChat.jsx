import React, { useEffect, useState, useTimeout } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from './config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import Lottie from 'lottie-react'
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
import { connection } from 'mongoose';
import animationData from '../animation/typing.json'
const ENDPOINT="http://localhost:5000";
var socket,selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat,notification, setNotification}=ChatState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setsocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setisTyping ] = useState(false);
    const toast=useToast();

    const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


    const fetchMessage=async()=>{
      if(!selectedChat)return ;

      try {
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
          }
        };
        setLoading(true);
        const {data}=await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,config);
        console.log(message);
        setMessage(data);
        setLoading(false);
        socket.emit("join chat",selectedChat._id);
      } catch (error) {
        toast({
  title: 'Error Occurred',
  discription:'Failed to load data',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
});
      }
    }
    
    
    useEffect(() => {
      socket=io(ENDPOINT);
      socket.emit("setup",user);
      socket.on("connnected",()=>{setsocketConnected(true)})
      socket.on("typing",()=>setisTyping(true));
      socket.on("stop typing",()=>setisTyping(false));

      
    }, [])

    useEffect(() => {
      return () => {
        fetchMessage();
        selectedChatCompare=selectedChat;
      }
    }, [selectedChat])

console.log(notification,"---------------");
    useEffect(() => {
      socket.on("message recieved", (newMessageRecieved)=>{
        if((!selectedChatCompare)||(selectedChatCompare._id!==newMessageRecieved.chat._id)){
          if(!notification.includes(newMessageRecieved)){
            setNotification([newMessageRecieved,...notification]);
            setFetchAgain(!fetchAgain);
          }
        }
        else{
          setMessage([...message,newMessageRecieved]);
        }
      })
    })
    
    



    const sendMessage=async(event)=>{
      if(event.key==="Enter" && newMessage){
        try {
          const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
          };
          const {data}=await axios.post("http://localhost:5000/api/message",{
            content:newMessage,
            chatId:selectedChat._id,
          },config)
          // console.log(data);
          socket.emit("new message",data);
          setMessage([...message,data]);
        } catch (error) {
          toast({
  title: 'Error Occurred',
  discription:'Failed to load data',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
});
        }
      }
    }


    
    



    const typingHandler=(e)=>{
      setNewMessage(e.target.value);

      // typing.........
      if(!socketConnected)return;
      if(!typing){
        setTyping(true);
        socket.emit("typing",selectedChat._id);
      }
      let lastTypingTime=new Date().getTime();
      var timerLength=3000;
      useTimeout(()=>{
        var timeNow=new Date().getTime();
        var diff=timeNow-lastTypingTime;
        if(diff>timerLength && typing){
          socket.emit("stop typing",selectedChat._id);
          setTyping(false);
        }
      },timerLength);
    }

  return (
    <div>{
      selectedChat?(<div className='mar'>
        <Text bg={"peachpuff"} display="flex" justifyContent={{base:"space-between"}}
        fontSize={{base:"28px", md:"30px"}}
        pb={3} px={2}
        alignItems={"center"} 
        fontFamily={"work sans"}
        w={"100%"}
        h={"100%"} 
        >
        <IconButton display={{base:"flex", md:"none"}}
        icon={<ArrowBackIcon/>}
        onClick={()=>setSelectedChat("")}
        />
        
        {!selectedChat.isGroupChat?(<div>
          {getSender(user,selectedChat.users)}
          <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
          </div>):(<div>{selectedChat.chatName.toUpperCase()}
          <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessage={fetchMessage}/>
          </div>)}


          
          </Text>
          <Box display={"flex"} 
          flexDir={"column"} 
          bg={"blue"} 
          justifyContent={"flex-end"} 
          w={"100%"} h={"100%"} 
          overflowY={"hidden"}>{loading?(<Spinner size="xl" w={20} h={20} alignSelf={"center"} margin={"auto"}/>):(
          <div className='messages'>{
            <ScrollableChat message={message}/>
          }</div>)}

          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
          {isTyping?<div><Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  /></div>:<div></div>}
          <Input placeholder='Enter a message...'
          variant={"filled"}
          bg={"#E0E0E0"}
          onChange={typingHandler}
          value={newMessage}
          />
          </FormControl>
          </Box>
        
      </div>):(
        <Box display="flex" justifyContent="center"  alignItems="center" h="100%">
        <Text fontSize={"3xl"} pb={3} >Click on User to start chatting.</Text> 
        </Box>
      )
    }
    </div>
  )
}

export default SingleChat