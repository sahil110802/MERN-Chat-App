import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from './config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';
const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}=ChatState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const toast=useToast();

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
      return () => {
        fetchMessage();
      }
    }, [selectedChat])
    



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
          setNewMessage("");
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
    }

  return (
    <div>{
      selectedChat?(<div>
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