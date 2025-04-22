
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#hero" className="flex items-center">
          <h1 className={`text-xl md:text-2xl font-bold font-heading ${scrolled ? 'text-guruji-deep-blue' : 'text-white'}`}>
            GURUJI <span className="text-guruji-gold">FOILS</span>
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className={`nav-link ${scrolled ? 'text-gray-700' : 'text-white'}`}>About</a>
          <a href="#products" className={`nav-link ${scrolled ? 'text-gray-700' : 'text-white'}`}>Products</a>
          <a href="#operations" className={`nav-link ${scrolled ? 'text-gray-700' : 'text-white'}`}>Operations</a>
          <a href="#gallery" className={`nav-link ${scrolled ? 'text-gray-700' : 'text-white'}`}>Gallery</a>
          <a href="#contact" className={`nav-link ${scrolled ? 'text-gray-700' : 'text-white'}`}>Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} /> : <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen bg-white shadow-lg' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#about" className="nav-link text-gray-700" onClick={toggleMenu}>About</a>
          <a href="#products" className="nav-link text-gray-700" onClick={toggleMenu}>Products</a>
          <a href="#operations" className="nav-link text-gray-700" onClick={toggleMenu}>Operations</a>
          <a href="#gallery" className="nav-link text-gray-700" onClick={toggleMenu}>Gallery</a>
          <a href="#contact" className="nav-link text-gray-700" onClick={toggleMenu}>Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
