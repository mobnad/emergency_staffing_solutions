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
} from '@chakra-ui/react';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        department: '',
        description: '',
        salary: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8200/ess/jobs/job', formData);
            console.log(response.data); // Log the response data if needed
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error creating job:', error);
            setError('An error occurred while creating the job.');
        }
    };

    return (
        <Container maxW="6xl" centerContent mt={10}>
            <Box p={8} borderWidth={1} borderRadius="lg">
                <Heading mb={4}>Create Job</Heading>
                <Text mb={8}>Fill out the form below to create a new job listing.</Text>

                {isSubmitted && (
                    <Alert status="success" mb={4}>
                        <AlertIcon />
                        Job listing created successfully!
                    </Alert>
                )}

                {error && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <FormControl mb={4} id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            placeholder="Job Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb={4} id="location" isRequired>
                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            placeholder="Job Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb={4} id="department" isRequired>
                        <FormLabel>Department</FormLabel>
                        <Input
                            type="text"
                            placeholder="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb={4} id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Job Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb={4} id="salary" isRequired>
                        <FormLabel>Salary</FormLabel>
                        <Input
                            type="number"
                            placeholder="Salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="teal">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CreateJob;
