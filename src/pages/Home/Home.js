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
        Looking for an Opportunity at the Hospitality industry!
      </Heading>
      <Heading as="h2" fontSize="2xl" mb={6}>
        Get in Touch With us and Browse our job listings now!
      </Heading>
      <Text mb={4}>
        "Rapid Relief Hospitality offers swift employment solutions, connecting job seekers with immediate opportunities in the hospitality industry. With streamlined processes and a wide network of employers, we expedite the job search, helping individuals secure positions quickly and efficiently."
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
        <InfoBox title="Talents Agency" text= 'Rapid response, reliable results: Our emergency staffing solutions keep your operations running smoothly, even in the most critical situations.'/>
        <InfoBox title="Portal Job" text= 'From urgent care to critical care, we provide the right staff at the right time, ensuring seamless continuity of care for your patients.' />
        <InfoBox title="Careers Coaching" text= 'When every minute counts, trust our emergency staffing solutions to deliver qualified professionals who are ready to step in and make a difference.' />
      </Flex>
    </Flex>
  );
}

// InfoBox component
function InfoBox({ title,text }) {
  return (
    <Box bg="blue.100" p={4} rounded="lg" boxShadow="md">
      <Heading as="h3" fontSize="lg" fontWeight="semibold">{title}</Heading>
      <Text color="black">{text}</Text>
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
      <Text mb={8}>
      Founded in response to a growing need for rapid employment solutions, Rapid Relief Hospitality emerged as a beacon of hope for job seekers in the hospitality sector. Established by industry veterans with a passion for empowering individuals, the company swiftly gained traction, leveraging its extensive network to match eager candidates with urgent job openings. With a commitment to efficiency and excellence, Rapid Relief Hospitality continues to revolutionize the hiring process, providing swift relief to both employers and employees alike.
      </Text>
    </Box>
  );
}

export default Home;
