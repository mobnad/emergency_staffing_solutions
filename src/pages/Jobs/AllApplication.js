import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Heading,
    Center,
    useToast
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

const AllApplications = () => {
    const [applicationData, setApplicationData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Fetch data when currentPage changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8200/allapplications?page=${currentPage + 1}`);
            setApplicationData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch application data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <Center>
            <Box>
                <Heading as='h1' mb='4'>
                    All Applications
                </Heading>

                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Job ID</Th>
                            <Th>Apply Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {applicationData.map((application, index) => (
                            <Tr key={index}>
                                <Td>{application.name}</Td>
                                <Td>{application.email_id}</Td>
                                <Td>{application.job_title}</Td>
                                <Td>{application.created_at}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                {totalPages > 1 && (
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='next >'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel='< previous'
                        marginPagesDisplayed={2}
                        containerClassName='pagination'
                        subContainerClassName='pages pagination'
                        activeClassName='active'
                    />
                )}
            </Box>
        </Center>
    );
};

export default AllApplications;
