
import { Check, PackageCheck, Factory, Truck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Operations = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const operations = [
    {
      title: "Quality Check",
      description: "We thoroughly inspect all raw materials to ensure they meet our strict quality standards",
      icon: Check,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Execution",
      description: "Our expert team meticulously plans and executes each step of the production process",
      icon: PackageCheck,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Production",
      description: "Using state-of-the-art technology to manufacture our premium foil products",
      icon: Factory,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      title: "Logistics",
      description: "Efficient delivery systems ensure your products arrive on time and in perfect condition",
      icon: Truck,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <section id="operations" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title pb-4">Business Operations</h2>
        
        <div 
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          {/* Operations Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-guruji-silver via-guruji-gold to-guruji-purple hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {operations.map((op, index) => (
                <div key={index} className={`flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${op.bgColor} ${op.iconColor} mb-4`}
                    >
                      <op.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2">{op.title}</h3>
                    <p className="text-gray-600">{op.description}</p>
                  </div>
                  
                  {/* Timeline Point */}
                  <div className="hidden md:flex md:w-0 justify-center items-center">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-guruji-purple animate-pulse"></div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operations;
