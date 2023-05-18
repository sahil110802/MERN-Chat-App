import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  
  const handleClick=()=>setShow(!show);
  const submitHandler=()=>{};




  return (
    <VStack spacing="5px">
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

    <Button 
    colorScheme='blue'
    width={'100%'}
    style={{marginTop:15}}
    onClick={submitHandler}
    >Login
    </Button>
    </VStack>
  )
}

export default Login