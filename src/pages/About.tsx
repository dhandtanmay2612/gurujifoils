import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: 'Drivers Monitored', value: '1M+' },
    { label: 'Road Accidents Prevented', value: '10K+' },
    { label: 'Rewards Distributed', value: '₹50M+' },
    { label: 'Partner Organizations', value: '100+' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI & Computer Vision Lead',
      bio: 'PhD in Computer Vision with 10+ years of experience in autonomous systems.',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Government Relations',
      bio: 'Former traffic police officer with 15 years of experience in road safety.',
    },
    {
      name: 'Priya Sharma',
      role: 'Product Director',
      bio: 'Expert in user experience and behavioral psychology.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Making India's Roads Safer through AI-Powered Driving Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            DriveSafeAI is revolutionizing road safety by combining cutting-edge AI technology with
            practical incentives to create a safer driving ecosystem for everyone.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Vision</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">Smart Roads</h3>
              <p className="text-gray-400">
                Creating an intelligent transportation system that rewards safe driving and
                promotes responsible behavior on the road.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">Data-Driven Safety</h3>
              <p className="text-gray-400">
                Using AI and machine learning to analyze driving patterns and provide
                personalized feedback for improvement.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-pink-500">Eco-Friendly Future</h3>
              <p className="text-gray-400">
                Encouraging sustainable driving practices and supporting the transition to
                electric vehicles through our reward system.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-blue-500 mb-4">{member.role}</div>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 