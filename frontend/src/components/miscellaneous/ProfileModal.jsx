import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>{
        children?(<span onClick={onOpen}>{children}</span>):(
            <IconButton
            d={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}/>
        )
    }


      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader display={"flex"} justifyContent={"center"}
          fontFamily="Work-sans"
          fontSize="40px"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
          <Image borderRadius="full" boxSize="200px" src={user.pic} alt={user.name}/>
          <Text m={"20px"} fontSize={"30px"} fontFamily={"Work-sans"}>Email:{user.email}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModal