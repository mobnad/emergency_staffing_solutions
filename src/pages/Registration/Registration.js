import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import './Registration.css'; // Import custom CSS file

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

function RegistrationForm() {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <Box {...containerStyles}>
      <Box {...cardStyles}>
        <Text {...titleStyles}>Create an Account</Text>
        <form onSubmit={handleSubmit}>
          <InputField id="username" type="text" label="Username" />
          <InputField id="email" type="email" label="Email" />
          <InputField id="password" type="password" label="Password" />
          <Button type="submit" colorScheme="blue" mt={4}>
            Register
          </Button>
        </form>
        <FooterText handleLoginClick={handleLoginClick} />
      </Box>
    </Box>
  );
}

function InputField({ id, type, label }) {
  return (
    <FormControl mb={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input type={type} id={id} name={id} required />
    </FormControl>
  );
}

function FooterText({ handleLoginClick }) {
  return (
    <Text {...footerTextStyles}>
      Already have an account? 
      <Button variant="link" onClick={handleLoginClick} style={linkStyles}>
        Login
      </Button>
    </Text>
  );
}

export default RegistrationForm;
