import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import CountUp from "react-countup";

const data = [
  { name: "Electronics", value: 400 },
  { name: "Apparel", value: 300 },
  { name: "Groceries", value: 300 },
  { name: "Books", value: 200 },
];

const COLORS = ["#10b981", "#6366f1", "#facc15", "#f472b6"];

const SalesCategory = () => {
  const series = data.map((item) => item.value);
  const labels = data.map((item) => item.name);
  const total = series.reduce((a, b) => a + b, 0);

  const [startTotal, setStartTotal] = useState(0);
  useEffect(() => {
    setStartTotal(total);
  }, [total]);

  const options = {
    chart: {
      type: 'radialBar',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '40%',
          background: '#fff',
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 3,
            opacity: 0.1
          }
        },
        track: {
          background: '#f3f4f6',
          strokeWidth: '100%',
          margin: 0
        },
        dataLabels: {
          name: { fontSize: '14px', color: '#6b7280' },
          value: {
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            formatter: function (val) {
              return `₹ ${parseInt(val).toLocaleString()}`;
            }
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            formatter: () => `₹ ${total.toLocaleString()}`,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'diagonal1',
        shadeIntensity: 0.4,
        gradientToColors: COLORS,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    colors: COLORS,
    labels,
    legend: {
      show: true,
      fontSize: '13px',
      position: 'bottom',
      labels: { colors: '#6b7280' },
      markers: { width: 10, height: 10, radius: 4 },
      itemMargin: { horizontal: 8, vertical: 4 }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      y: {
        formatter: (val) => `₹ ${val.toLocaleString()}`
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 280 },
          legend: { position: 'bottom' }
        }
      }
    ]
  };

  return (
    <div className="w-full md:w-[40%] bg-boldWhite rounded-2xl p-6 border-2 border-bodyGray-100">
      <h3 className="text-lg font-semibold text-bodyGray-800 mb-2">Sales by Category</h3>
      <div className="text-2xl font-bold text-primary-600 mb-4">
        <CountUp end={startTotal} duration={1} prefix="₹ " separator="," />
      </div>
      <Chart options={options} series={series} type="radialBar" height={320} />
    </div>
  );
};

export default SalesCategory;
