import React from "react";
import Chart from "react-apexcharts";

const dailySalesData = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [3200, 4500, 3900, 5100, 6100, 7000, 5600],
};

const DailySalesChart = () => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: dailySalesData.categories,
      labels: { style: { fontSize: "13px" } },
    },
    dataLabels: { enabled: false },
    fill: {
      colors: ["#05df72"],
    },
    tooltip: {
      y: {
        formatter: (val) => `₹ ${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Daily Sales",
      data: dailySalesData.values,
    },
  ];

  return (
    <div className="bg-boldWhite p-6 rounded-xl w-[40%] border-2 border-bodyGray-100 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-bodyGray-800">Daily Sales</h2>
        <p className="text-sm text-bodyGray-500">Current week's daily performance</p>
      </div>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default DailySalesChart;
