import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/miscellaneous/SideDrawer";



const Chatpage = () => {
  const {user}=ChatState();
  
  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display="flex" justifyContent="space-between" p="10px" w="100%" h="100vh">
      {user && <MyChats/>}
      {user && <ChatBox/>}
      </Box>
    </div>
  )
}
export default Chatpage
