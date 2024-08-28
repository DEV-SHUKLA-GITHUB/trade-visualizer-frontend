
import React, { useState, useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import {fetchDataAndTransform} from "../convert";
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = ({plotData}) => {
  const [positiveDataPoints, setPositiveDataPoints] = useState([]);
  const [negativeDataPoints, setNegativeDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = fetchDataAndTransform(plotData)
    const positivePoints = [];
    const negativePoints = [];
    Object.keys(data.MTM).forEach((key, index, array) => {
      const value = parseFloat(data.MTM[key].toFixed(2));
      const currentPoint = { x: new Date(key), y: value };

      if (value >= 0) {
        positivePoints.push(currentPoint);
        negativePoints.push({ x: new Date(key), y: 0 });  // Fill the gap with zero
      } else {
        negativePoints.push(currentPoint);
        positivePoints.push({ x: new Date(key), y: 0 });  // Fill the gap with zero
      }

      // Interpolation at transition points for smooth transitions
      if (index > 0) {
        const prevValue = parseFloat(data.MTM[array[index - 1]].toFixed(2));
        if ((prevValue >= 0 && value < 0) || (prevValue < 0 && value >= 0)) {
          const zeroPoint = { 
            x: new Date(key),
            y: 0
          };
          positivePoints.push(zeroPoint);
          negativePoints.push(zeroPoint);
        }
      }
    });

    setPositiveDataPoints(positivePoints);
    setNegativeDataPoints(negativePoints);
    setIsLoaded(true);
  }, []);

  const options = {

    theme: "light2",
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM DD YYYY"
        }
      },
      axisY: {
        prefix: "₹",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "₹#,###.##"
        }
      },
      data: [
        {
          name: "Values",
          type: "splineArea",  // Use 'splineArea' for continuous areas
          color: "#35b99e",
          yValueFormatString: "₹#,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints: positiveDataPoints
        },
        {
          name: "Values",
          type: "splineArea",  // Use 'splineArea' for continuous areas
          color: "#f7a9a7",
          yValueFormatString: "₹#,###.##",
          xValueFormatString: "MMM DD YYYY",    
          dataPoints: negativeDataPoints
        }
      ]
    }],
    navigator: {
      slider: {
        minimum: new Date("2024-08-20"),
        maximum: new Date("2024-08-21")
      }
    },
    rangeSelector: {
        enabled: false,
      },
  };

  return (
    // <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {isLoaded && 
          <div className="relative overflow-hidden">
            <CanvasJSStockChart options={options}/>
          </div>
        }
      {/* </div> */}
    </div>
  );
};

export default StockChart;