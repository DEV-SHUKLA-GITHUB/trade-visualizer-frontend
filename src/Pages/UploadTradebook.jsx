import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Papa from 'papaparse';

const UploadTradeBook = () => {
  const [selectedBroker, setSelectedBroker] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [navigate, setNavigate] = useState(false);

  const handleBrokerChange = (e) => {
    setSelectedBroker(e.target.value);
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
    if (!selectedBroker || !file) {
      setError('Please select a broker and upload a CSV file.');
      return;
    }

    // Parse the CSV file to JSON
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const jsonData = results.data;
        console.log(results.data,"json data")
        
        // Send the JSON data to the /calculate_mtm API endpoint
        fetch('http://127.0.0.1:5000/calculate_mtm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // broker: selectedBroker,
            data: jsonData,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            setNavigate(true); // Navigate to the dashboard if successful
          })
          .catch((error) => {
            console.error('Error:', error);
            setError('There was an issue uploading the file. Please try again.');
          });
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setError('Error parsing CSV file. Please check the file and try again.');
      },
    });
  };

  if (navigate) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Upload Trade Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col mb-6">
          <label htmlFor="broker" className="font-semibold text-lg">Select Broker:</label>
          <select
            id="broker"
            value={selectedBroker}
            onChange={handleBrokerChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a broker</option>
            <option value="zerodha">Zerodha</option>
            <option value="finvasia">Finvasia</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="file" className="font-semibold text-lg">Upload Trade Book:</label>
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
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadTradeBook;
