import { motion } from 'framer-motion';
import '../styles/hover-effects.css';

const tiers = [
  {
    name: 'Bronze',
    points: '0 - 5,000 Credits',
    icon: '🏅',
    benefits: [
      '5% Insurance Discount',
      'Basic Dashboard Access',
      'Monthly Reports',
      'Safety Tips',
    ],
    current: true,
  },
  {
    name: 'Silver',
    points: '5,000 - 10,000 Credits',
    icon: '🥈',
    benefits: [
      '15% Insurance Discount',
      'Toll Pass Credits',
      '5% Road Tax Rebate',
      'Advanced Analytics',
    ],
    upgrade: true,
  },
  {
    name: 'Gold',
    points: '10,000 - 20,000 Credits',
    icon: '🥇',
    benefits: [
      '25% Insurance Discount',
      '10% Road Tax Rebate',
      'Premium EV Charging Credits',
      'Priority RTO Services',
    ],
  },
  {
    name: 'Platinum',
    points: '20,000+ Credits',
    icon: '👑',
    benefits: [
      '40% Insurance Discount',
      '20% Road Tax Rebate',
      'Green Vehicle Purchase Bonus',
      'VIP Support & Services',
    ],
  },
];

const DriveCredits = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Drive Credits Ecosystem
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our innovative reward system that translates safe driving into real-world benefits.
            Climb through tiers and unlock progressive rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 card"
            >
              <div className="text-4xl mb-4">{tier.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{tier.name}</h3>
              <p className="text-gray-400 mb-4">{tier.points}</p>
              <ul className="space-y-2 mb-6">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-gray-300">
                    <span className="text-blue-500 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-lg button ${
                  tier.upgrade
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {tier.current ? 'Current Tier' : tier.upgrade ? 'Upgrade Now' : 'View Benefits'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriveCredits; 