
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Operations from '@/components/Operations';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  useEffect(() => {
    // Update the document title
    document.title = "GURUJI FOILS - Imaginativeness to Life";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-500 animate-gradient text-white">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Operations />
      <Gallery />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
