import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    SimpleGrid,
    Box,
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Center
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import './Jobs.css';

const Jobs = () => {
    const [jobData, setJobData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [tokenExists, setTokenExists] = useState(false);
    const itemsPerPage = 9;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8200/ess/jobs/jobs');
                setJobData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const token = localStorage.getItem('token');
        if (token) {
            setTokenExists(true);
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);
    };

    const filteredJobs = jobData.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handleCreateJobClick = () => {
        navigate('/createjob');
    };

    const handleAllApplicationsClick = () => {
        navigate('/allapplications'); // Navigate to the "/allapplications" route
    };

    return (
        <Center>
            <div>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Heading as='h1' mb='4'>
                        Jobs
                    </Heading>
                    {tokenExists && (
                        <>
                            <Button colorScheme='green' rightIcon={<AddIcon />} onClick={handleCreateJobClick}>
                                Create Job
                            </Button>
                            <Button colorScheme='blue' ml='4' onClick={handleAllApplicationsClick}>
                                All Applications
                            </Button>
                        </>
                    )}
                </Box>
                <InputGroup mb='4'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={SearchIcon} color='gray.300' />}
                    />
                    <Input
                        placeholder='Search by title...'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </InputGroup>

                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='4'>
                    {currentJobs.map((job, index) => (
                        <Box key={index}>
                            <Card maxW='sm'>
                                <CardBody>
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{job.title}</Heading>
                                        <Text>{job.location}</Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            {job.salary}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    height='60px'
                                >
                                    <Link to={`/jobs/${job.id}`}>
                                        <Button variant='solid' colorScheme='blue'>
                                            View details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Box>
                    ))}
                </SimpleGrid>

                <ReactPaginate
                    breakLabel='...'
                    nextLabel='next >'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='< previous'
                    marginPagesDisplayed={2}
                    containerClassName='pagination'
                    subContainerClassName='pages pagination'
                    activeClassName='active'
                />
            </div>
        </Center>
    );
};

export default Jobs;
