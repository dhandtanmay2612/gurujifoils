import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foil-gradient bg-[length:300%_300%] animate-gradient-shift"
    >
      {/* Background Effect */}
      {/* Using the locally stored image */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/hot-stamps.WEBP')] bg-cover bg-center mix-blend-overlay"></div>
      </div>
      
      {/* Content */}
      <div className={`container mx-auto px-4 text-center text-white transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 shimmer-effect bg-clip-text text-transparent">
          GURUJI FOILS
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 animate-color-shift">
          Imaginativeness to Life
        </p>
        <p className="max-w-xl mx-auto text-black-300 mb-12">
          Transforming ordinary packaging with extraordinary metallic finishes since 2016.
        </p>
        <a 
          href="#about" 
          className="inline-flex items-center gap-2 text-white/90 hover:text-white animate-pulse"
        >
          <span>Discover More</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;