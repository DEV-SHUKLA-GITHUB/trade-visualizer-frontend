import React, { useRef } from 'react';
import StockChart from '../Components/StockChart';
import { additionalData, data } from '../data';
import { GoDownload } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const chartRef = useRef(null);

  const handleDownload = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'stock-chart.png';
      link.click();
    }
  };

  // Convert the data object into an array of rows with Date, Time, and Price
  const dataRows = Object.entries(data).map(([key, value]) => {
    const dateTime = new Date(key);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    const price = value.toFixed(2);

    return { date, time, price };
  });

  return (
    <div className="bg-white p-4">
      <div className='flex pt-10'>
        <div className="w-3/4 container">
          <div className='flex mx-6 justify-between'>
            <div className='flex space-x-10'>
              <div className='flex flex-col'>
                <span>MTM</span>
                <span className={`text-2xl font-semibold ${additionalData.minimum_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ₹ {additionalData.minimum_mtm}
                </span>
              </div>

              <div className='flex flex-col'>
                <span>Minimum</span>
                <span className={`text-2xl font-semibold ${additionalData.minimum_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ₹ {additionalData.minimum_mtm}
                </span>
              </div>

              <div className='flex flex-col'>
                <span>Maximum</span>
                <span className={`text-2xl font-semibold ${additionalData.maximum_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ₹ {additionalData.maximum_mtm}
                </span>
              </div>
            </div>
            <div className='px-4 flex '>
              <GoDownload className='w-6 h-6 cursor-pointer' onClick={handleDownload} />
              <IoIosShareAlt className='w-6 h-6 ms-4' />
            </div>
          </div>
          <div ref={chartRef}>
            <StockChart />
          </div>
        </div>
        <div className='flex flex-col w-1/4'>
          <div className='border flex flex-col rounded-xl m-4 p-6 mt-0'>
            Charges<span className='pt-2 text-2xl'>₹ {additionalData.charges}</span>
          </div>
          <div className='border flex flex-col rounded-xl m-4 p-6 mt-0'>
            <span className='pb-2'>What If</span> In Progress
          </div>
        </div>
      </div>
      <div className="pt-10">
        <h2 className="text-xl font-bold mb-4">Imported Trades</h2>
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {dataRows.slice(0, 100).map((row, index) => (
                <tr key={index}>
                  <td className="py-2 text-center px-4 border-b">{row.date}</td>
                  <td className="py-2 text-center px-4 border-b">{row.time}</td>
                  <td className="py-2 text-center px-4 border-b">₹{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
