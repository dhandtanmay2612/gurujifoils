
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title pb-4">About Guruji Foils</h2>
        
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-guruji-gold to-transparent opacity-30"></div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Guruji Foils is a packaging and decorative materials business, turning imagination into real-world artistry. Since 2016, we've provided high-quality foil products that are environmentally friendly, premium in finish, and impactful in presentation. We believe in delivering products that are not only functional but also elevate the aesthetic of our clients' offerings.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-guruji-purple mb-3">Our Vision</h3>
                <p className="text-gray-600">Achieve milestones with ethics and customer satisfaction.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-heading font-bold text-guruji-purple mb-3">Our Mission</h3>
                <p className="text-gray-600">We are fulfilling customers' colorful goals with our environment-friendly products since 2016.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
