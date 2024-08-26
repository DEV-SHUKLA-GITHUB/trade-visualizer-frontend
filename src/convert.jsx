// import React, { useState, useEffect } from 'react';
// import oldJson from './newestjson.json'
// const transformData = (data) => {
//     // Ensure the data has the expected structure
//     if (!data || !Array.isArray(data.index) || !Array.isArray(data.data)) {
//       console.error('Invalid data structure:', data);
//       return {};
//     }

import { json } from "d3";

  
//     // Ensure index and data arrays have the same length
//     if (data.index.length !== data.data.length) {
//       console.error('Mismatched index and data lengths:', data);
//       return {};
//     }
  
//     const transformed = {MTM:{}};
  
//     data.index.forEach((isoTimestamp, index) => {
//       // Convert ISO 8601 timestamp to desired format
//       const date = new Date(isoTimestamp);
//       const formattedTimestamp = date.toISOString().slice(0, 19).replace('T', ' ');
  
//       // Ensure the data array at the given index exists and has a value
//       if (Array.isArray(data.data[index]) && data.data[index][0] !== undefined) {
//         transformed.MTM[formattedTimestamp] = data.data[index][0];
//       } else {
//         console.warn(`Invalid data at index ${index}:`, data.data[index]);
//       }
//     });
  
//     return transformed;
//   };
//   export const DataTransformer = () => {
//     const [newData, setNewData] = useState({});
  
//     useEffect(() => {
//     const newJson = JSON.parse(oldJson);
//       const transformedData = transformData(newJson);
//       setNewData(transformedData);
//     }, []);

//     console.log(newData,"newdata")
// //   return newData;
// };

// export { DataTransformer};





// convert.js

const transformData = (data) => {
    // Ensure the data has the expected structure
    if (!data || !Array.isArray(data.index) || !Array.isArray(data.data)) {
      console.error('Invalid data structure:', data);
      return {};
    }
  
    // Ensure index and data arrays have the same length
    if (data.index.length !== data.data.length) {
      console.error('Mismatched index and data lengths:', data);
      return {};
    }
  
    const transformed = { MTM: {} };
  
    data.index.forEach((isoTimestamp, index) => {
      // Convert ISO 8601 timestamp to desired format
      const date = new Date(isoTimestamp);
      const formattedTimestamp = date.toISOString().replace('T', ' ');
  
      // Ensure the data array at the given index exists and has a value
      if (Array.isArray(data.data[index]) && data.data[index][0] !== undefined) {
        transformed.MTM[formattedTimestamp] = data.data[index][0];
      } else {
        console.warn(`Invalid data at index ${index}:`, data.data[index]);
      }
    });
  
    return transformed;
  };
  
  // Example usage to transform the data
  const fetchDataAndTransform = (data) => {
    // try {
    //   const response = await fetch('./newestjson.json'); // Adjust the path to your JSON file
    //   const oldJson = await response.json();
        const newjson = JSON.parse(data)
      const transformedData = transformData(newjson);
      return transformedData;
    // } catch (error) {
    //   console.error('Error fetching or transforming data:', error);
    //   return {};
    // }
  };
  
  // Export the function for use in other files
  export { transformData, fetchDataAndTransform };
  