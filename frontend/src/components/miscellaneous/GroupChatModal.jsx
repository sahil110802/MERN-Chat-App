import { Box, Button, FormControl, Input, Modal,ModalBody,ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';
import UserBadgeItem from '../userAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState();
    const [searchresult, setSearchresult] = useState("");
    const [loading, setLoading] = useState(false);
    const toast=useToast();
    const {user,chats,setChats}=ChatState();
    const handleSearch=async(query)=>{
      setSearch(query)
    if (!query) {
      return;
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



    const handleDelete=(delUser)=>{
      setSelectedUsers(selectedUsers.filter((sel)=>sel._id!==delUser._id))
    }

    const handleSubmit=async()=>{
      if(!groupChatName || !selectedUsers){
        toast({
  title: 'Please fill all the Fields.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
}); return;
      }

      try {
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`
          },
        };
        const {data}=await axios.post(`http://localhost:5000/api/chat/group`,{
          name:groupChatName,
          users:JSON.stringify(selectedUsers.map((u)=>u._id)),
        },config
        );
        setChats([data,...chats]);
        onClose();
        toast({
  title: 'Group chat created successfully',
  position: 'bottom',
  status: 'success',
  duration: 3000,
  isClosable: true,
})
      } catch (error) {
        toast({
  title: 'Error Occurred',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
})
      }
    }
    const handleGroup=(usertoadd)=>{
      if(selectedUsers.includes(usertoadd)){
        toast({
  title: 'user already added.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
}); return;
      }
      setSelectedUsers([...selectedUsers,usertoadd])
    }



  return (
    <div>
    <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex"
          justifyContent="center"
          fontSize="35px"
          fontFamily="work sans"
          >Create GroupChat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column">
          <FormControl>
          <Input placeholder='group name' mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
          </FormControl>
          <FormControl>
          <Input placeholder='Add Users' mb={1} onChange={(e)=>handleSearch(e.target.value)}/>
          </FormControl>
          <Box w="100%" display="flex" flexWrap="wrap" >
          {selectedUsers.map((u)=>(
            <UserBadgeItem key={user._id} user={u} 
            handleFunction={()=>handleDelete(u)}
          />))}
          </Box>
          {loading?<div>loading</div>:(
            searchresult && searchresult.slice(0,4).map((user)=><UserListItem key={user._id} user={user} 
            handleFunction={()=>handleGroup(user)}/>)
          )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create GroupChat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default GroupChatModal