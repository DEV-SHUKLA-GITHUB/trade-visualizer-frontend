import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 animate-fade-in">
          About Trade Visualizer
        </h1>
        <p className="mt-4 text-lg text-gray-700 animate-slide-in-up">
          Trade Visualizer is designed to empower traders with the tools they need to make informed decisions in a fast-paced market. 
          Our platform offers comprehensive visualization of trading data, allowing users to track, analyze, and optimize their trades with ease.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 animate-slide-in-left">
          <h2 className="text-2xl font-semibold text-blue-500">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            Our mission is to simplify trading for everyone by providing a user-friendly platform with advanced features that 
            cater to both beginners and experienced traders. We believe in the power of data, and our goal is to make that data accessible and actionable.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 animate-slide-in-right">
          <h2 className="text-2xl font-semibold text-blue-500">Why Choose Us?</h2>
          <p className="mt-4 text-gray-600">
            Trade Visualizer stands out for its ease of use, powerful analytics, and real-time data visualization. 
            We provide a seamless experience for tracking your trades, so you can focus on what really matters – making the right decisions at the right time.
          </p>
        </div>
      </div>

      <div className="mt-16 p-6 rounded-lg shadow-lg bg-blue-500 text-white transform hover:scale-105 transition-transform duration-300 animate-fade-in">
        <h2 className="text-2xl font-semibold">Join Our Community</h2>
        <p className="mt-4">
          Become part of a growing community of traders who trust Trade Visualizer to help them navigate the complexities of the market.
          Whether you're a seasoned professional or just starting out, our platform offers the tools you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default About;
