import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useState } from "react";



const Chatpage = () => {
  const {user}=ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display="flex" justifyContent="space-between" p="10px" w="100%" h="100vh">
      {user && <MyChats fetchAgain={fetchAgain}/>}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}
export default Chatpage
