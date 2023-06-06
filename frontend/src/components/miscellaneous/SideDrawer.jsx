import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingchat, setLoadingchat] = useState();
  const {user}=ChatState();
  const history=useHistory();
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push('/');
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
    <Button variant="ghost">
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