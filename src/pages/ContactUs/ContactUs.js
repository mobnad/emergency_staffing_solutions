import React, { useState } from 'react';
import axios from 'axios';

import {
    Box,
    Container,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Link,
} from '@chakra-ui/react';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

const EnquiryForm = ({ isSubmitted, setIsSubmitted, isPrivacyModalOpen, setIsPrivacyModalOpen, handlePrivacyModalClose }) => {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            const response = await axios.post('http://localhost:8200/contactus', {
                name,
                email,
                message
            });

            setIsSubmitted(true);
            setSuccessMessage(response.data.message);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

    return (
        <Container maxW="6xl" centerContent mt={10}>
            <Box p={8} borderWidth={1} borderRadius="lg">
                <Heading mb={4}>Contact Us</Heading>
                <Text mb={8}>We'd love to hear from you! Please fill out the form below.</Text>

                {successMessage && (
                    <Alert status="success" mb={4}>
                        <AlertIcon />
                        {successMessage}
                    </Alert>
                )}

                {isSubmitted && !successMessage && (
                    <Alert status="success" mb={4}>
                        <AlertIcon />
                        Thanks for reaching out! We will contact you soon.
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <FormControl mb={4} id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Your Name" name="name" />
                    </FormControl>

                    <FormControl mb={4} id="email" isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" placeholder="Your Email" name="email" />
                    </FormControl>

                    <FormControl mb={4} id="message" isRequired>
                        <FormLabel>Message</FormLabel>
                        <Textarea placeholder="Your Message" name="message" />
                    </FormControl>

                    <FormControl mb={4} id="privacy" isRequired>
                        <Checkbox
                            isChecked={isPrivacyChecked}
                            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                        >
                            I agree to the{' '}
                            <Link onClick={() => setIsPrivacyModalOpen(true)} color="teal.500" cursor="pointer">
                                Privacy Policy
                            </Link>
                        </Checkbox>
                    </FormControl>

                    <Button type="submit" colorScheme="teal">
                        Submit
                    </Button>
                </form>
                <Modal isOpen={isPrivacyModalOpen} onClose={handlePrivacyModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Privacy Policy Agreement</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <PrivacyPolicy />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" onClick={handlePrivacyModalClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Container>
    );
};

const ContactUs = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

    const handlePrivacyModalClose = () => {
        setIsPrivacyModalOpen(false);
    };

    return (
        <EnquiryForm
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            isPrivacyModalOpen={isPrivacyModalOpen}
            setIsPrivacyModalOpen={setIsPrivacyModalOpen}
            handlePrivacyModalClose={handlePrivacyModalClose}
        />
    );
};

export default ContactUs;
