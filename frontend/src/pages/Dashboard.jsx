import { FaFileAlt, FaClock, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// Simulated user name (Replace this with dynamic data from your auth system)
const userName = "Vikas"; 

const Dashboard = () => {
  const progress = 75; // Example progress value

  return (
    <div className="p-6">
      {/* Dashboard Overview Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-md mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          🚀 Welcome Back, {userName}!
        </h2>
        <p className="text-gray-600">Stay updated with your latest proposals.</p>
      </motion.div>

      {/* Stats Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Proposals", value: 24, icon: <FaFileAlt />, color: "text-blue-500" },
          { title: "Pending Review", value: 8, icon: <FaClock />, color: "text-yellow-500" },
          { title: "Approved", value: 12, icon: <FaCheckCircle />, color: "text-green-500" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/90 backdrop-blur-lg p-4 rounded-lg shadow-md flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <span className={`text-3xl ${item.color}`}>{item.icon}</span>
            <div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proposal Progress Bar */}
      <motion.div
        className="mt-6 bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-2">📊 Proposal Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <motion.div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">{progress}% of your proposals are completed!</p>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        className="mt-6 bg-white/90 backdrop-blur-lg p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-4">📝 Recent Activity</h3>
        <ul className="space-y-2">
          {[
            { text: "Proposal #24 approved ✅", time: "2 hours ago" },
            { text: "Proposal #19 submitted ✨", time: "1 day ago" },
            { text: "Proposal #15 pending review ⏳", time: "3 days ago" },
          ].map((activity, index) => (
            <motion.li
              key={index}
              className="p-3 bg-gray-100 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="font-medium">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
          <FaPlusCircle />
          Add New Proposal
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
