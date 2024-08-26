import React from 'react';
import { Link } from 'react-router-dom';
import bg from "../assets/Home.mp4";
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 animate-fade-in">
          Welcome to Trade Visualizer
        </h1>
        <p className="mt-4 text-lg text-gray-700 animate-slide-in-up">
          Your ultimate tool for visualizing and analyzing trades. Stay ahead of the market with our intuitive charts and data-driven insights.
        </p>
        <Link
          to="/upload-trade-book"
          className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 animate-pulse"
        >
          Get Started
        </Link>
      </div>
      <div className="mt-16 flex justify-center">
  <video
    autoPlay
    loop
    muted
    className="w-full max-w-4xl rounded-lg shadow-lg animate-fade-in"
  >
    <source src={bg} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

    </div>
  );
};

export default Home;
