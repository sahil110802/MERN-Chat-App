import { Box } from "@chakra-ui/react"
import { ChatState } from "../Context/ChatProvider"

const ChatBox = () => {
  const {selectedChat}=ChatState();
  return (
    <Box display={{base:selectedChat?"flex":"none",md:"flex"}}
    flexDir="column"
    alignItems="center"
    w={{base:"100%",md:"68%"}}
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    >Single Chat</Box>
  )
}

export default ChatBox