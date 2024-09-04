import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.svg';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Trade Visualizer" className="h-10 w-auto mr-2" />
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
          <Link to="/about" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            About
          </Link>
          <Link to="/upload-trade-book" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            Upload Trade Book
          </Link>
          <div className="relative">
            <button className="text-white px-4 py-2 hover:bg-gray-700 rounded">
              <i className="fas fa-search"></i>
            </button>
            <div className="absolute top-full left-0 bg-gray-800 w-full rounded-lg shadow-md hidden">
              <input type="text" className="p-2 w-full bg-gray-900 text-white" placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
