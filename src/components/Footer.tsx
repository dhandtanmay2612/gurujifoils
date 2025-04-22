
import { ArrowUp, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-4 bg-gradient-to-r from-guruji-silver via-guruji-gold to-guruji-silver bg-clip-text text-transparent">GURUJI FOILS</h2>
            <p className="text-gray-400 mb-4">Transforming ordinary packaging with extraordinary metallic finishes since 2016.</p>
            <p className="text-gray-400">Quality foil products that are environmentally friendly, premium in finish, and impactful in presentation.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-guruji-gold transition-colors">About Us</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-guruji-gold transition-colors">Our Products</a></li>
              <li><a href="#operations" className="text-gray-400 hover:text-guruji-gold transition-colors">Operations</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-guruji-gold transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-guruji-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-guruji-gold transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-guruji-gold transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-guruji-gold transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-guruji-gold transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-guruji-gold transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Guruji Foils. All rights reserved.
          </p>
          
          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
