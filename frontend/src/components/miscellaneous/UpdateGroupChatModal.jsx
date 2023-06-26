import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../userAvatar/UserBadgeItem'
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessage}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const {selectedChat,setSelectedChat,user}=ChatState();
    const toast=useToast();

    
    const handleRemove=async(user1)=>{
        if (user._id!==selectedChat.groupAdmin._id && user1._id!==user._id) {
            toast({
  title: 'Only Admin can remove someone.',
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
        },};

        const {data}=await axios.put('http://localhost:5000/api/chat/groupremove',{
            chatId:selectedChat._id,
            userId:user1._id,
        },config)
        user._id===user1._id?setSelectedChat():setSelectedChat(data);
        setFetchAgain(!fetchAgain)
        fetchMessage();
        setLoading(false)
        } catch (error) {
            toast({
  title: 'Error Occurred',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
   }); 
        setLoading(false)

        }
    };

    const handleRename=async()=>{
        if(!groupChatName)return;
        try {
            setRenameLoading(true);
            const config={
            headers:{
                Authorization:`Bearer ${user.token}`,
        },};
        const {data}=await axios.put('http://localhost:5000/api/chat/rename',{
            chatId:selectedChat._id,
            chatName:groupChatName,
        },config)
        setSelectedChat(data)
      setFetchAgain(!fetchAgain)
        setRenameLoading(false)

        } catch (error) {
            toast({
  title: 'Error Occurred',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
   });
   setRenameLoading(false)

        }

        
    };





    const handleAddUser=async(user1)=>{
        if (selectedChat.users.find((u)=>u._id===user1._id)) {
            toast({
  title: 'User already in a group.',
  position: 'bottom',
  status: 'warning',
  duration: 3000,
  isClosable: true,
}); return;
        }


        if (selectedChat.groupAdmin._id!==user._id) {
            toast({
  title: 'Only admins can add user.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
})
        }

        try {
            setLoading(true);
            const config={
            headers:{
                Authorization:`Bearer ${user.token}`,
        },};

        const {data}=await axios.put('http://localhost:5000/api/chat/groupadd',{
            chatId:selectedChat._id,
            userId:user1._id,
        },config)
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setLoading(false)
        } catch (error) {
            toast({
  title: 'Failed to load users.',
  position: 'top-left',
  status: 'warning',
  duration: 3000,
  isClosable: true,
})
        }
    };


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
      setSearchResult(data)
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
    <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateGroupChatModal