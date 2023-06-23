import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../userAvatar/UserBadgeItem'

const UpdateGroupChatModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const {selectedChat,setSelectedChat,user}=ChatState();
    const toast=useToast();

    const handleDelete=()=>{};
    const handleRemove=()=>{};

    const handleRename=()=>{};

  return (
    <div>
    <IconButton icon={<ViewIcon/>} onClick={onOpen} display={{base:"flex"}}>Open Modal</IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
            {selectedChat.users.map((u)=>(
                <UserBadgeItem key={user._id} user={u} 
            handleFunction={()=>handleDelete(u)}
          />
            ))}
            </Box>
            <FormControl display={"flex"} >
            <Input placeholder='Chat Name'
            mb={3}
            value={groupChatName}
            onChange={(e)=>setGroupChatName(e.target.value)}
            />
            <Button variant={"solid"} colorScheme='teal' 
            ml={1} 
            isLoading={renameLoading}
            onClick={handleRename}>Update
            </Button>
            </FormControl>
            <FormControl display={"flex"} >
            <Input placeholder='Add users to group'
            mb={3}
        
            />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateGroupChatModal