import { motion } from 'framer-motion';
import '../styles/hover-effects.css';

const features = [
  {
    title: 'Real-time Monitoring',
    description: 'AI-powered analysis of your driving behavior in real-time',
    icon: '📊',
  },
  {
    title: 'Smart Scoring',
    description: 'Get detailed insights into your driving patterns and safety score',
    icon: '🎯',
  },
  {
    title: 'Reward System',
    description: 'Earn credits and unlock benefits for safe driving',
    icon: '💎',
  },
  {
    title: 'Government Integration',
    description: 'Direct integration with RTO and insurance providers',
    icon: '🏛️',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Smart Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our comprehensive suite of features helps you become a better driver
            while earning rewards for safe driving practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 feature-box"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold button">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 