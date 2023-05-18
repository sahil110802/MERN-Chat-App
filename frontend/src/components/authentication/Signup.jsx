import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack} from "@chakra-ui/react"
const Signup = () => {
  const [show, setShow] = useState(false);
  const [showc, setShowc] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confpassword, setConfpassword] = useState();
  const [pic, setPic] = useState();

  const handleClick=()=>setShow(!show);
  const handleClickc=()=>setShowc(!showc);
  const postDetails=()=>{};
  const submitHandler=()=>{};

  return (
    <VStack spacing="5px">
    <FormControl isRequired>
    <FormLabel>Name</FormLabel>
    <Input
    placeholder='Enter your name'
    onChange={(e)=>setName(e.target.value)}
    />
    </FormControl>



    <FormControl isRequired>
    <FormLabel>Email</FormLabel>
    <Input
    placeholder='Enter your email'
    onChange={(e)=>setEmail(e.target.value)}
    />
    </FormControl>


    <FormControl isRequired>
    <FormLabel>Passsword</FormLabel>
    <InputGroup>
    <Input
    type={show?"text":"password"}
    placeholder='Enter your password'
    onChange={(e)=>setPassword(e.target.value)}
    />
    <InputRightElement width={"4.5rem"}>
    <Button h="2rem" size="sm" onClick={handleClick} >
    {show?"hide":"show"}
    </Button>
    </InputRightElement>
    </InputGroup>
    
    </FormControl>


    <FormControl isRequired>
    <FormLabel>Confirm Password</FormLabel>
    <InputGroup>
    <Input
    type={showc?"text":"password"}
    placeholder='confirm password'
    onChange={(e)=>setConfpassword(e.target.value)}
    />
    <InputRightElement width={"4.5rem"}>
    <Button h="2rem" size="sm" onClick={handleClickc} >
    {showc?"hide":"show"}
    </Button>
    </InputRightElement>
    </InputGroup>
    </FormControl>


    <FormControl id='pic'>
    <FormLabel>Upload your pic</FormLabel>
    <Input
    type='file'
    p={1.5}
    accept='image/*'
    onChange={(e)=>postDetails(e.target.files[0])}
    />
    </FormControl>

    <Button 
    colorScheme='blue'
    width={'100%'}
    style={{marginTop:15}}
    onClick={submitHandler}
    >SignUp
    </Button>
    </VStack>
  )
}

export default Signup