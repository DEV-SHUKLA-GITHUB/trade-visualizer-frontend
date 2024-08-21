import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Trade Visualizer</div>
        <div>
          <Link to="/" className="text-white px-4 py-2 hover:bg-blue-700 rounded">Home</Link>
          <Link to="/about" className="text-white px-4 py-2 hover:bg-blue-700 rounded">About</Link>
          <Link to="/upload-trade-book" className="text-white px-4 py-2 hover:bg-blue-700 rounded">Upload Trade Book</Link>
          <Link to="/dashboard" className="text-white px-4 py-2 hover:bg-blue-700 rounded">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
