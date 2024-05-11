import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import JobImage from "./dec812a0a2370f145091a5fca52956dd.jpg"
import { Link } from 'react-router-dom';

// Main Home component
function Home() {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === 'light' ? 'white' : 'zinc.900'} color={colorMode === 'light' ? 'zinc.800' : 'white'} minHeight="100vh">
      <Container maxW="container.xl" py={8}>
        <Header />
        <MainContent />
        <ExperienceSection />
      </Container>
    </Box>
  );
}


// Header component
function Header() {
  return (
    <Box textAlign="center" mb={12}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={4}>
        Let's start your careers here!
      </Heading>
      <Heading as="h2" fontSize="2xl" mb={6}>
        Looking for a career change? Browse our job listings now!
      </Heading>
      <Text mb={4}>
        Max velitius dignissim quis ut lorem. Etiam eros pulvinar odio dapibus,
        sagittis quisque orci pretium donec sit. Aliquam porta integer maecenas
        risus lobortis.
      </Text>
      <Link to="/careers">
        <Button bg="green.500" color="white" px={6} py={2} rounded="lg" _hover={{ bg: 'green.600' }} transition="all 0.3s">
          Browse Jobs
        </Button>
      </Link>
    </Box>
  );
}

// MainContent component
function MainContent() {
  return (
    <Flex justifyContent="center" alignItems="center" gap={8} mb={12}>
      <Box maxW="sm">
        <Image src={JobImage} alt="Professional" rounded="full" boxShadow="lg" />
      </Box>
      <Flex flex={1} flexDirection="column" gap={6}>
        <InfoBox title="Talents Agency" />
        <InfoBox title="Portal Job" />
        <InfoBox title="Careers Coaching" />
      </Flex>
    </Flex>
  );
}

// InfoBox component
function InfoBox({ title }) {
  return (
    <Box bg="green.100" p={4} rounded="lg" boxShadow="md">
      <Heading as="h3" fontSize="lg" fontWeight="semibold">{title}</Heading>
      <Text>Facilisi etiam consectetur mi nibh. Ipsum posuere venenatis cubilia donec potenti si.</Text>
    </Box>
  );
}

// ExperienceSection component
function ExperienceSection() {
  return (
    <Box textAlign="center">
      <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
        15+ Years of Experience
      </Heading>
      <Text mb={6}>
        Our Service: Bridge for industrial and corporate development.
      </Text>
      <Text mb={8}>
        Donec eros lacus velit nec facilisi lorem sit et dictum suspendisse.
        Maximus ligula eget risus sagittis, nec feugiat eros fringilla magnis
        montes viverra erat commodo pulvinar.
      </Text>
    </Box>
  );
}

export default Home;
