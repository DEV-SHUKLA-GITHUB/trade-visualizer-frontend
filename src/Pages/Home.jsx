import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bg from '../assets/Home.mp4';

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center text-white">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-blue-500"
        >
          Welcome to Trade Visualizer
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-xl text-gray-300"
        >
          Your ultimate tool for visualizing and analyzing trades. Stay ahead of the market with our intuitive charts and data-driven insights.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            to="/upload-trade-book"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 ease-in-out"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
