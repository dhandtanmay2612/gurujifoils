import { useInView } from 'react-intersection-observer';

const Gallery = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Team Member Highlight (CEO and Founder Section) */}
        <div
          ref={ref}
          className={`max-w-2xl mx-auto mt-16 transition-all duration-1000 ${inView ? 'opacity-100 delay-300' : 'opacity-0 translate-y-10'}`}
          style={{ backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e2e2'}}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold font-heading text-guruji-deep-blue mb-2">Guruji Foils</h3>
              <p className="text-sm text-guruji-purple font-medium mb-4">Founder & CEO</p>
              <p className="text-gray-600 mb-4">
                With a passion for innovation and quality, Guruji Foils has become a trusted name in the packaging and decorative materials industry since its founding in 2016.
              </p>
              <div className="text-sm text-gray-500">
                <p>"Our commitment is to provide environmentally friendly products without compromising on premium finishes and impactful presentation."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;