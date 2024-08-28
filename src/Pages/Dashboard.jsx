import React, { useRef } from 'react';
import StockChart from '../Components/StockChart.jsx';
import data from '../data.json';
import { GoDownload } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { tableData,plotData } = location.state || { tableData: [] };
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

  return (
    <div className="bg-white p-4">
<div className="flex pt-10">
  <div className="w-3/4 container mx-auto bg-white rounded-lg shadow-lg p-6">
    <div className="flex mx-6 justify-between">
      <div className="flex space-x-10">
        <div className="flex flex-col">
          <span>MTM</span>
          <span className={`text-2xl font-semibold ${data.minimum_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹ {data.minimum_mtm}
          </span>
        </div>

        <div className="flex flex-col">
          <span>Minimum</span>
          <span className={`text-2xl font-semibold ${data.min_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹ {data.minimum_mtm}
          </span>
        </div>

        <div className="flex flex-col">
          <span>Maximum</span>
          <span className={`text-2xl font-semibold ${data.max_mtm >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹ {data.maximum_mtm}
          </span>
        </div>
      </div>
      <div className="px-4 flex">
        <GoDownload className="w-6 h-6 cursor-pointer" onClick={handleDownload} />
        <IoIosShareAlt className="w-6 h-6 ms-4" />
      </div>
    </div>
    <div ref={chartRef} className="mt-6">
      <StockChart plotData={plotData} />
    </div>
  </div>
  <div className="flex flex-col w-1/4">
    <div className="border flex flex-col rounded-xl m-4 p-6 mt-0 bg-white shadow-lg">
      Charges<span className="pt-2 text-2xl">₹ {data.charges} </span>
    </div>
    <div className="border flex flex-col rounded-xl m-4 p-6 mt-0 bg-white shadow-lg">
      <span className="pb-2">What If</span> In Progress
    </div>
  </div>
</div>
      <div className="pt-10">
        <h2 className="text-xl font-bold mb-4">Imported Trades</h2>
        <div className="max-h-64 overflow-y-auto">
        {tableData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Symbol</th>
              <th className="py-2 px-4 border-b">Qty</th>
              <th className="py-2 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((trade, index) => (
              <tr key={index}>
                <td className="py-2 text-center px-4 border-b">{trade.Time.slice(0,10)}</td>
                <td className="py-2 text-center px-4 border-b">{trade.Time.slice(10,17)}</td>
                <td className="py-2 text-center px-4 border-b">{trade.Type}</td>
                <td className="py-2 text-center px-4 border-b">{trade.symbol}</td>
                <td className="py-2 text-center px-4 border-b">{trade.Qty}</td>
                <td className="py-2 text-center px-4 border-b">{trade.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-red-500">No trade data available.</p>
      )}
        </div>
      </div>
      {/* <DataTransformer/> */}
    </div>
  );
}

export default Dashboard;
