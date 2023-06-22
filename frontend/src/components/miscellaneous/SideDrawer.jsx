import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Toast, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState} from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios'
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingchat, setLoadingchat] = useState();

  const {user,setSelectedChat,chats,setChats}=ChatState();

  const toast=useToast();

  const history=useHistory();

  const {isOpen,onOpen,onClose}=useDisclosure();

  const accessChat=async(userId)=>{
    try {
      setLoadingchat(true)
      const config={
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },};

        const {data}=await axios.post('http://localhost:5000/api/chat',{userId},config);

        if(!chats.find((c)=>c._id===data._id))setChats([data, ...chats])
        setSelectedChat(data);
        setLoadingchat(false);
        onClose();
        
      
    } catch (error) {
      toast({
  title: 'Error fetching the chats.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
});
    }
  }

  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push('/');
  }

  const handleSearch=async()=>{
    if (!search) {
      toast({
  title: 'Please enter some user.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
});return;
    }

    try {
      setLoading(true);
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        }
      }
      const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config)
      console.log(data)
      setLoading(false)
      setSearchresult(data)
    } catch (error) {
      toast({
  title: 'Failed to load users.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
})
    }
  }
  return (
    <div>
    <Box 
    d="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    >
    <div>
    <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
    <Button variant="ghost" onClick={onOpen}>
    <i className="fa-solid fa-magnifying-glass"></i>
    <Text d={{base:"none",md:"flex"}}>Search User</Text>
    </Button>
    </Tooltip>
    
    <Menu>
    <MenuButton p={1}>
    <BellIcon/>
    </MenuButton>
    </Menu>

    <Menu>
    <MenuButton as={Button}
    rightIcon={<ChevronDownIcon/>}
    ><Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
    </MenuButton>
    <MenuList>
    <ProfileModal user={user}>
    <MenuItem>My Profile</MenuItem>
    </ProfileModal>
    <MenuDivider/>
    <MenuItem onClick={logoutHandler}>Log Out</MenuItem>

    </MenuList>
    </Menu> 
    </div>
    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
    <DrawerContent>
    <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
    <DrawerBody >
    <Box display="flex" pb={2}>
    <Input 
    mr={2} 
    placeholder="Search by name or email"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    >
    </Input>
    <Button onClick={handleSearch}>Go</Button>
    </Box>
    {
      loading?<ChatLoading/>:(
        searchresult?.map(user=>(
          <UserListItem
          key={user._id}
          user={user}
          handleFunction={()=>accessChat(user._id)}
          />
        ))
      )
    }
    {loadingchat && <Spinner ml="auto" display="flex"/>}
    </DrawerBody>
    </DrawerContent>
    </Drawer>
    <div>
    <Menu>
  <MenuButton as={Button} >
    Actions
  </MenuButton>
  
</Menu>
    </div>
    </div>
  )
}

export default SideDrawer