import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";

// Constants for repeated class strings
const containerStyles = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bg: "gray.100",
  p: 4,
};

const cardStyles = {
  width: "100%",
  maxWidth: "md",
  bg: "white",
  color: "black",
  rounded: "lg",
  shadow: "md",
  p: 8,
};

const titleStyles = {
  fontSize: "xl",
  fontWeight: "semibold",
  color: "gray.800",
  mb: 6,
};

const footerTextStyles = {
  mt: 8,
  fontSize: "sm",
  color: "gray.600",
};

const linkStyles = {
  color: "blue",
  _hover: {
    color: "blue.700",
  },
};

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8200/ess/autenticate/login', {
        userEmail: email,
        Password: password
      });

      const { status, message, results, token } = response.data;

      if (status === 200) {
        localStorage.setItem('token', token);
        navigate('/'); 
      } else {
        console.error(message);
        // Handle other status codes or display error message to the user
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., display error message to the user
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <Box {...containerStyles}>
      <Box {...cardStyles}>
        <Text {...titleStyles}>Login to Your Account</Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>Login</Button>
        </form>
        <Text {...footerTextStyles}>
          Don't have an account?{' '}
          <Button variant="link" onClick={handleSignUpClick} style={linkStyles}>Sign up</Button>
        </Text>
      </Box>
    </Box>
  );
}

export default LoginForm;
