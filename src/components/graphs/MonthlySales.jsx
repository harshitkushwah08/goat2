import React, { useState } from "react";
import Chart from "react-apexcharts";

const dataSets = {
  Monthly: [
    { name: "Jan", income: 16700, expenses: 16900 },
    { name: "Feb", income: 16900, expenses: 17400 },
    { name: "Mar", income: 15700, expenses: 16200 },
    { name: "Apr", income: 17500, expenses: 17200 },
    { name: "May", income: 15400, expenses: 15800 },
    { name: "Jun", income: 16800, expenses: 19500 },
    { name: "Jul", income: 19100, expenses: 17500 },
    { name: "Aug", income: 16000, expenses: 16200 },
    { name: "Sep", income: 15100, expenses: 15800 },
    { name: "Oct", income: 16500, expenses: 19000 },
    { name: "Nov", income: 13900, expenses: 18200 },
    { name: "Dec", income: 17000, expenses: 19100 },
  ],
  Weekly: [
    { name: "Mon", income: 5000, expenses: 4800 },
    { name: "Tue", income: 4700, expenses: 4900 },
    { name: "Wed", income: 5300, expenses: 4500 },
    { name: "Thu", income: 5600, expenses: 5200 },
    { name: "Fri", income: 6000, expenses: 5100 },
    { name: "Sat", income: 6200, expenses: 5800 },
    { name: "Sun", income: 5800, expenses: 5600 },
  ],
  Yearly: [
    { name: "2020", income: 125000, expenses: 118000 },
    { name: "2021", income: 143000, expenses: 134000 },
    { name: "2022", income: 158000, expenses: 149000 },
    { name: "2023", income: 172000, expenses: 160000 },
    { name: "2024", income: 181000, expenses: 175000 },
  ],
};

const SalesChart = () => {
  const [view, setView] = useState("Monthly");
  const data = dataSets[view];

  const categories = data.map((d) => d.name);
  const incomeData = data.map((d) => d.income);
  const expensesData = data.map((d) => d.expenses);
  const totalProfit = incomeData.reduce((acc, val, i) => acc + (val - expensesData[i]), 0);

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#05df72", "#ef4444"],
    xaxis: {
      categories,
      labels: { style: { fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { fontSize: "12px" } },
    },
    tooltip: {
      y: {
        formatter: (val) => `₹ ${val.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    legend: {
      show: true,
      labels: {
        colors: "#4b5563",
      },
    },
  };

  const chartSeries = [
    { name: "Income", data: incomeData },
    { name: "Expenses", data: expensesData },
  ];

  return (
    <div className="bg-boldWhite p-6 rounded-2xl  w-[62%]  border-2 border-bodyGray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-bodyGray-800">Revenue</h2>
          <p className="text-sm text-bodyGray-500">
            Total Profit <span className={`${totalProfit < 0 ? "text-red-400" : "text-primary-600"} font-medium`}>₹ {totalProfit.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {["Monthly", "Weekly", "Yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-3 py-1.5 rounded-lg text-sm border font-medium cursor-pointer active:scale-90 hover:scale-105 transition-transform ${
                view === type
                  ? "bg-primary-600 text-boldWhite"
                  : "bg-boldWhite text-bodyGray-800 border-bodyGray-400 hover:bg-bodyGray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <Chart options={chartOptions} series={chartSeries} type="area" height={320} />
    </div>
  );
};

export default SalesChart;
