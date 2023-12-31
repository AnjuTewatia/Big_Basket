import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Select,
  Span,
  Option,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "male", // Default gender
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dark-rose-gharial-vest.cyclic.cloud/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          gender: "",
        });
        toast({
          size: "500",
          position: "top-center",
          title: "Done.",
          description: "You are signedUp successfully!.",
          status: "success",
          duration: 4000,
          isClosable: true,
  });
      } else {
        setMessage(data.message);
        toast({
          size: "500",
          position: "top-center",
          title: "Done.",
          description: "Error while signing In!.",
          status: "warning",
          duration: 4000,
          isClosable: true,
  });
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    }
  };

  return (
    <>
      <Box
        maxW="400px"
        mx="auto"
        p="7"
        border="1px solid #e2e8f0"
        borderRadius="lg"
        boxShadow="md"
        bg="white"
        marginTop="30px"
      >
        <Heading>Admin Register</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mt="3">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt="3">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt="3">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt="3">
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt="3">
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>

          <Button mt="5" mb="5" colorScheme="blue" type="submit">
            Register
          </Button>
          <Link to ="/admin/login">
          <Text>If Already register please  <span color="blue"> Login</span>  ?</Text>
          </Link>
        </form>

        {message && <p>{message}</p>}
      </Box>
    </>
  );
};

export default SignUp;