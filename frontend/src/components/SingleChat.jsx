import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from './config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}=ChatState();
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
          <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
          </div>)}

          <Box display={"flex"} 
          flexDir={"column"} 
          bg={"blue"} 
          justifyContent={"flex-end"} 
          w={"100%"} h={"100%"} 
          overflowY={"hidden"}>sahil</Box>
        </Text>
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