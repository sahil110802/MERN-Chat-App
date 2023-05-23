import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  const toast=useToast();
  const history=useHistory();
  const handleClick=()=>setShow(!show);





  const submitHandler=async()=>{
    setPicLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    console.log(email,password);
    try {
        const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("http://localhost:5000/api/user/login",{email,password},config);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
  }catch(error){
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  }



  return (
    <VStack spacing="5px">
    <FormControl isRequired>
    <FormLabel>Email</FormLabel>
    <Input
    value={email}
    placeholder='Enter your email'
    onChange={(e)=>setEmail(e.target.value)}
    />
    </FormControl>


    <FormControl isRequired>
    <FormLabel>Passsword</FormLabel>
    <InputGroup>
    <Input
    value={password}
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
    isLoading={picLoading}
    width={'100%'}
    style={{marginTop:15}}
    onClick={submitHandler}
    >Login
    </Button>
    <Button 
    colorScheme='red'
    width={'100%'}
    style={{marginTop:15}}
    onClick={()=>{setEmail("im@gmail.com"); setPassword("12345");}}
    >Get Guest Credential
    </Button>
    </VStack>
  )
}

export default Login;