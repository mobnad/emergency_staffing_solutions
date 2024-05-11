import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar/NavBar';
import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/About/About';
import Footer from './pages/Footer/Footer';
import PropertiesDetails from './pages/JobsDetails/JobsDetails';
import LoginForm from './pages/Login/Login';
import RegistrationForm from './pages/Registration/Registration';
import Jobs from './pages/Jobs/Jobs';
import CreateJob from './pages/CreateJobs/CreateJobs';
import AllApplications from './pages/Jobs/AllApplication';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Jobs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs/:id" element={<PropertiesDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/createjob" element={<CreateJob />} />
        <Route path="/allapplications" element={<AllApplications />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
