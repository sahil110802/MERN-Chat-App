import { Box } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';
import {MyChats,ChatBox} from '../components/MyChats';
import Sidebar from '../components/miscellaneous/Sidebar';

const Chatpage = () => {
  const {user}=ChatState();
  return (
    <div style={{width:"100%"}}>
    {user && Sidebar}
    <Box>
    {user && MyChats}
    {user && ChatBox}
    </Box>
    </div>
  )
}
export default Chatpage
