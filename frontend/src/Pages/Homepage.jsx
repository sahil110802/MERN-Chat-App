import  { useEffect } from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
const Homepage = () => {

  const history=useHistory();
  
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if (user) {
      history.push('/chats');
    }
  },[history]);

  return (
    <Container maxW='xl' centerContent>
    <Box 
    d="flex"
    justifyContent="center"
    p={3}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    >
    <Text fontSize="4xl" fontFamily="Work sans" color="black" align={'center'}>MERN-Chat-App</Text>
    </Box>
    <Box 
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    w="100%"
    >
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList m="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel><Login/></TabPanel>
    <TabPanel><Signup/></TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default Homepage
