import React from 'react'
import {Avatar, Tooltip} from '@chakra-ui/react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './config/chatLogics'
import { ChatState } from '../Context/ChatProvider'
const ScrollableChat = ({message}) => {
    const {user}=ChatState();
  return (
    <ScrollableFeed>
    {message && message.map((m,i)=>(<div style={{display:"flex"}} key={m._id}>
    {isSameSender(message,m,i,user._id) || isLastMessage(message,i,user._id)&&
    (<Tooltip 
    label={m.sender.name} placement='bottom-start' hasArrow
    ><Avatar mt="7px" mr={1} cursor="pointer"  name={m.sender.name} src={m.sender.pic}/></Tooltip>)}
    <span style={{backgroundColor:`${m.sender._id===user._id ? "yellow":"orange"}`,
  borderRadius:"20px",padding:"5px 15px", maxWidth:"75%", marginLeft:isSameSenderMargin(message,m,i,user._id),marginTop:isSameUser(message,m,i)?3:10,}}>{m.content}</span>
    </div>))}
    </ScrollableFeed>
  )
}

export default ScrollableChat