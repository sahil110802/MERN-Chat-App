import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { ChatState} from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {getSender} from "./config/chatLogics"
import GroupChatModal from "./miscellaneous/GroupChatModal";
const MyChats = ({fetchAgain}) => {
  const [logged, setLogged] = useState();
  const {selectedChat,setSelectedChat,user,chats,setChats}=ChatState();
  const toast=useToast();
  const fetchChats=async()=>{
    try {
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        },};

        const {data}=await axios.get('http://localhost:5000/api/chat',config);
        // console.log(data);
        setChats(data);
        
      
    } catch (error) {
      toast({
  title: 'Error Occurred',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
});
    }
  }

  useEffect(()=>{
    setLogged(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[fetchAgain]);
  return (
    <Box display={{base:selectedChat?"none":"flex",md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%",md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
    <Box pb={3}
    px={3}
    fontSize={{base:"28px",md:"30px"}}
    fontFamily={"work sans"}
    display="flex"
    w="100%"
    justifyContent="space-between"
    alignItems="center"
    >My Chats
    <GroupChatModal>
    <Button display="flex"
    fontSize={{base:"17px",md:"10px",lg:"17px"}}
    rightIcon={<AddIcon/>}>Create Group Chat
    </Button>
    </GroupChatModal>
    </Box>
    <Box display="flex"
    flexDir="column"
    p={3}
    bg="#F8F8F8"
    w="100%"
    h="100%"
    borderRadius="lg"
    overflow="hidden" 
    >{chats?(
      <Stack overflowY="scroll">
      {chats.map((chat)=>(
        <Box
        onClick={()=>setSelectedChat(chat)}
        cursor="pointer"
        bg={selectedChat===chat?"lightgreen":"grey"}
        color={selectedChat===chat?"white":"black"}
        key={chat._id}
        p={3}
        borderRadius="lg"
        >
        <Text>{chat.isGroupChat?chat.chatName:getSender(logged,chat.users)}
        </Text>
        </Box>
      ))}
      </Stack>
    )
      :(<ChatLoading/>)}
    </Box>
    </Box>
  )
}

export default MyChats