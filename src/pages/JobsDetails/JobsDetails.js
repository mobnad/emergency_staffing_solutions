import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Spinner, Image, HStack, Center, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import jobImage from "./recruitment-04.gif";

export default function PropertiesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); // State for apply modal
  const [name, setName] = useState(''); // State for name input
  const [email, setEmail] = useState(''); // State for email input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8200/ess/jobs/jobs/${id}`);
        setJob(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const token = localStorage.getItem('token');
    if (token) {
      setTokenExists(true);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.post(`http://localhost:8200/ess/jobs/deletejob/${id}`);
      setIsConfirmationModalOpen(false);
      navigate('/careers');
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async () => {
    try {
      const response = await axios.post('http://localhost:8200/jobapplied', {
        name,
        email,
        jobTitle: job.title // Include the job title in the request
      });
      console.log(response.data); // Log the response data
      setIsApplyModalOpen(false); // Close the apply modal after successful submission
    } catch (error) {
      console.log('Error submitting application:', error);
    }
  };

  return (
    <Center>
      <Box p={8}>
        {job ? (
          <HStack spacing={8} align="stretch">
            <Image
              src={jobImage}
              alt=''
              borderRadius='lg'
              boxSize="300px"
            />

            <VStack spacing={4} align="stretch" flex="1">
              <Heading>{job.title}</Heading>
              <Text fontSize="lg">Location: {job.location}</Text>
              <Text fontSize="lg">Department: {job.department}</Text>
              <Text fontSize="lg">Description: {job.description}</Text>
              <Text fontSize="lg">Salary: {job.salary}</Text>
              <Text fontSize="lg">Posted At: {job.posted_at}</Text>

              {!tokenExists && (
                <Button colorScheme="teal" mt={4} onClick={handleApply}>
                  Apply
                </Button>
              )}

              {tokenExists && (
                <Button colorScheme="red" onClick={() => setIsConfirmationModalOpen(true)} mt={4}>
                  Delete
                </Button>
              )}
            </VStack>
          </HStack>
        ) : (
          <Spinner size="xl" />
        )}

        <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this job listing?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
              <Button variant="ghost" onClick={() => setIsConfirmationModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Apply modal */}
        <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Apply for Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleSubmitApplication}>Submit</Button>
              <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
