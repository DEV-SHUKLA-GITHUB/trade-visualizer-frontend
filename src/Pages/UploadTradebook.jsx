import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import Select from 'react-select';
import bg from "../assets/upload.mp4";
import axios from 'axios';
import { format } from 'd3';

const UploadTradeBook = () => {
  const [selectedBroker, setSelectedBroker] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('uploading');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const brokers = [
    { value: 'zerodha', label: 'Zerodha' },
    { value: 'finvasia', label: 'Finvasia' },
  ];

  const handleBrokerChange = (selectedOption) => {
    setSelectedBroker(selectedOption);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type !== 'text/csv') {
      setError('Please upload a CSV file.');
      setFile(null);
    } else {
      setError('');
      setFile(uploadedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !file) {
      setError('Please upload a CSV file.');
      return;
    }
setLoading(true)
setStage('uploading'); // Start with 'uploading' stage

// Wait for 1 second before switching to 'computing' stage
setTimeout(() => {
  setStage('computing');
}, 2000);
    // Parse the CSV file to JSON
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
          const response = await axios.post('http://127.0.0.1:5000/calculate_mtm', formData)
          // Navigate to the dashboard and pass the response data
          console.log(response.data,"response")
          navigate('/dashboard', { state: { tableData: formattedData, plotData: response.data } });
        } catch (error) {
          console.error('Error sending data to backend:', error);
          setError('Failed to calculate MTM. Please try again later.');
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setError('Error parsing CSV file. Please check the file and try again.');
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-md mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Upload Trade Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="flex flex-col mb-6">
            <label htmlFor="broker" className="font-semibold text-lg mb-2">
              Select Broker:
            </label>
            <Select
              id="broker"
              options={brokers}
              value={selectedBroker}
              onChange={handleBrokerChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select a broker"
            />
          </div> */}
          <div className="flex flex-col mb-6">
            <label htmlFor="file" className="font-semibold text-lg">
              Upload Trade Book:
            </label>
            <input
              type="file"
              id="file"
              accept=".csv"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            disabled={loading} // Disable button while loading
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
              'Upload'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTradeBook;
