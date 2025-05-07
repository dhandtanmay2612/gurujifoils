import { motion } from 'framer-motion';

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const userData = {
    name: 'John Doe',
    score: 85,
    level: 'Gold',
    rewards: [
      { name: 'Toll Discount', value: '20% off', progress: 75 },
      { name: 'Insurance Premium', value: '15% off', progress: 60 },
      { name: 'Road Tax', value: '10% off', progress: 90 },
    ],
    behavior: {
      speeding: 5,
      hardBraking: 3,
      phoneUsage: 2,
      laneDiscipline: 8,
    },
    recentTrips: [
      { date: '2024-03-15', score: 88, distance: '25 km' },
      { date: '2024-03-14', score: 82, distance: '15 km' },
      { date: '2024-03-13', score: 90, distance: '30 km' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
          <p className="text-gray-400">Here's your driving performance overview</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your DriveSafe Score</h2>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                {userData.level} Level
              </span>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-700"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * userData.score) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{userData.score}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-400 mb-1">Speeding Incidents</h3>
                <p className="text-2xl font-semibold">{userData.behavior.speeding}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-400 mb-1">Hard Braking</h3>
                <p className="text-2xl font-semibold">{userData.behavior.hardBraking}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-400 mb-1">Phone Usage</h3>
                <p className="text-2xl font-semibold">{userData.behavior.phoneUsage}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm text-gray-400 mb-1">Lane Discipline</h3>
                <p className="text-2xl font-semibold">{userData.behavior.laneDiscipline}</p>
              </div>
            </div>
          </motion.div>

          {/* Rewards Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-6">Your Rewards</h2>
            <div className="space-y-6">
              {userData.rewards.map((reward) => (
                <div key={reward.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{reward.name}</span>
                    <span className="text-blue-400">{reward.value}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${reward.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Trips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-6">Recent Trips</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Score</th>
                    <th className="pb-4">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.recentTrips.map((trip) => (
                    <tr key={trip.date} className="border-t border-gray-700">
                      <td className="py-4 text-gray-300">{trip.date}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            trip.score >= 85
                              ? 'bg-green-500/20 text-green-400'
                              : trip.score >= 70
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {trip.score}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">{trip.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 