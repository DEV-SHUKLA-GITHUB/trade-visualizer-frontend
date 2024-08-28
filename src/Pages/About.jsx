import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Trade Visualizer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trade Visualizer is designed to empower traders with the tools they need to make informed decisions in a fast-paced market. 
          Our platform offers comprehensive visualization of trading data, allowing users to track, analyze, and optimize their trades with ease.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8 rounded-lg border border-gray-200 bg-gray-50 transition-transform transform hover:-translate-y-2 duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to simplify trading for everyone by providing a user-friendly platform with advanced features that 
            cater to both beginners and experienced traders. We believe in the power of data, and our goal is to make that data accessible and actionable.
          </p>
        </div>

        <div className="p-8 rounded-lg border border-gray-200 bg-gray-50 transition-transform transform hover:-translate-y-2 duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600">
            Trade Visualizer stands out for its ease of use, powerful analytics, and real-time data visualization. 
            We provide a seamless experience for tracking your trades, so you can focus on what really matters – making the right decisions at the right time.
          </p>
        </div>
      </div>

      <div className="mt-20 p-8 rounded-lg bg-gray-800 text-white transition-transform transform hover:-translate-y-2 duration-300">
        <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-gray-300">
          Become part of a growing community of traders who trust Trade Visualizer to help them navigate the complexities of the market.
          Whether you're a seasoned professional or just starting out, our platform offers the tools you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default About;
