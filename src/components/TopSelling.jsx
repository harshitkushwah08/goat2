import React from "react";

const products = [
  { name: "Wireless Mouse", category: "Electronics", unitsSold: 120, revenue: 24000 },
  { name: "Yoga Mat", category: "Fitness", unitsSold: 85, revenue: 12750 },
  { name: "Notebook Pack", category: "Stationery", unitsSold: 100, revenue: 10000 },
  { name: "T-shirt", category: "Apparel", unitsSold: 60, revenue: 9000 },
];

const TopSellingProducts = () => {
  return (
     <div className="bg-boldWhite p-6 h-[435px] rounded-xl border-3 w-[56%] border-bodyGray-100 ">
      <h2 className="text-lg font-semibold text-bodyGray-800 mb-4">Top Selling Product</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-bodyGray-500  bg-primary-50 border-b border-primary-600">
              <th className="text-left p-3 py-4">Product</th>
              <th className="text-left p-3 py-4">Category</th>
              <th className="text-left p-3 py-4">Units Sold</th>
              <th className="text-left p-3 py-4">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, idx) => (
              <tr key={idx} className="border-b border-primary-200 last:border-none">
                <td className="p-3 py-6">{prod.name}</td>
                <td className="p-3 py-6">{prod.category}</td>
                <td className="p-3 py-6">{prod.unitsSold}</td>
                <td className="p-3 py-6 font-medium">₹ {prod.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
