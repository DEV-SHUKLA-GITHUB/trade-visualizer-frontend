import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import axios from 'axios';
import { motion } from 'framer-motion';
import bg from "../assets/upload.mp4";

const UploadTradeBook = () => {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('uploading');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    handleFileUpload(uploadedFile);
  };

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile && uploadedFile.type !== 'text/csv') {
      setError('Please upload a CSV file.');
      setFile(null);
    } else {
      setError('');
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileUpload(droppedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a CSV file.');
      return;
    }
    setLoading(true);
    setStage('uploading');

    setTimeout(() => {
      setStage('computing');
    }, 2000);

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const jsonData = results.data;
        jsonData.pop();
        const formattedData = jsonData.map(row => ({
          ...row,
          Qty: parseInt(row.Qty, 10),
          price: parseFloat(row.price),
        }));
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('https://trade-visualizer-backend.onrender.com/calculate_mtm', formData);
          navigate('/dashboard', { state: { tableData: formattedData, plotData: response.data } });
        } catch (error) {
          console.error('Error sending data to backend:', error);
          setError('Failed to calculate MTM. Please try again later.');
          setLoading(false);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setError('Error parsing CSV file. Please check the file and try again.');
        setLoading(false);
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Upload Your Trade Book
        </h1>
        <div 
          className={`flex flex-col mb-6 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out ${
            isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file" className="cursor-pointer">
            <div className="text-gray-500 text-lg">
              {file ? file.name : 'Drag and drop a CSV file here or click to select'}
            </div>
          </label>
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>
        <motion.button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 ease-in-out"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              {stage === 'uploading' ? 'Uploading' : 'Computing'}
            </span>
          ) : (
            'Submit'
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UploadTradeBook;