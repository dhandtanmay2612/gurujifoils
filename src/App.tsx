import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DriveCredits from './components/DriveCredits';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
import './styles/hover-effects.css';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <DriveCredits />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as we create them */}
          <Route path="/features" element={<div>Features Page</div>} />
          <Route path="/scoreboard" element={<div>Scoreboard Page</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
