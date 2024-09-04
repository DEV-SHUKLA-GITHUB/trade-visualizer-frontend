import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload-trade-book');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white py-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            About Trade Visualizer
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering traders with AI-driven insights and cutting-edge visualization tools for informed decision-making in dynamic markets.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-400/30"
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Our Mission</h2>
            <p className="text-gray-300">
              We're on a mission to democratize trading by leveraging AI and data visualization. Our platform bridges the gap between complex market data and actionable insights, catering to traders of all levels.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-400/30"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Why Choose Us?</h2>
            <p className="text-gray-300">
              Trade Visualizer combines state-of-the-art AI algorithms with intuitive design. Our real-time analytics and predictive modeling give you the edge in today's fast-paced trading environment.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-600 to-purple-600 p-10 rounded-xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our AI-Powered Trading Community</h2>
          <p className="text-xl">
            Experience the future of trading with our AI-driven platform. Whether you're a data scientist, a seasoned trader, or new to the market, Trade Visualizer provides the advanced tools and insights you need to thrive.
          </p>
          <button 
            onClick={handleGetStarted}
            className="mt-8 bg-white text-gray-900 py-3 px-8 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;