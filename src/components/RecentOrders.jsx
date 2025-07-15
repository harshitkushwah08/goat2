import {
  ExternalLink, Download
} from "lucide-react";
import DownloadStartedDialog from "./ui/dialog/DownloadPopup";
import { useState } from "react";
import { Badge } from "./ui/badge"; // adjust import if needed

const allInvoices = Array.from({ length: 20 }, (_, i) => ({
  id: `#INV00${i + 1}`,
  customer: `Customer ${i + 1}`,
  date: `2023-${(i % 12) + 1}-10`,
  status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Overdue',
  total: `₹${(Math.random() * 100000 + 10000).toFixed(0)}`,
  fy: i < 15 ? 'FY 2021–2022' : i < 30 ? 'FY 2022–2023' : 'FY 2023–2024',
}));

const statusColor = {
  Completed: 'bg-primary-100 text-primary-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Overdue: 'bg-red-100 text-red-600',
};

const getOverdueDays = (dateStr) => {
  const invoiceDate = new Date(dateStr);
  const today = new Date();
  if (today <= invoiceDate) return 0;
  const diffTime = today - invoiceDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const RecentOrders = () => {
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  return (
    <div className="overflow-x-auto mt-5 p-5 bg-boldWhite w-full">
      <span className="text-lg font-semibold pb-2 border-b border-primary-200 w-auto text-bodyGray-900">Recent Invoices</span>
      <div className="mt-10">
        <table className="w-full text-sm">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
            <tr>
              <th className="px-4 text-left"></th>
              <th className="px-3 text-left">Invoice Number</th>
              <th className="px-4 text-left">Customer</th>
              <th className="px-4 text-left">Date</th>
              <th className="px-4 text-left">Status</th>
              <th className="px-4 text-left">Total</th>
              <th className="px-4 text-left">FY</th>
              <th className="px-4 text-left">Overdue In</th>
              <th className="px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((inv, index) => (
              <tr
                key={index}
                className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition"
              >
                <td className="px-4 py-3 text-bodyGray-500 hover:text-boldWhite hover:bg-primary-600 hover:scale-105 active:scale-100 transition cursor-pointer">
                  <ExternalLink size={16} />
                </td>
                <td className="px-4 py-3 font-medium">{inv.id}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-medium ${statusColor[inv.status]}`}>{inv.status} </span>
                </td>
                <td className="px-4 py-3 font-semibold">{inv.total}</td>
                <td className="px-4 py-3">{inv.fy}</td>
                <td className="px-4 py-3">
                  {inv.status === 'Overdue' ? (
                    <Badge variant="destructive">
                      Overdue by {getOverdueDays(inv.date)} day{getOverdueDays(inv.date) !== 1 ? 's' : ''}
                    </Badge>
                  ) : (
                    <Badge variant="success">On Time</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:bg-blue-500 hover:text-boldWhite ml-3 active:scale-95 transition-all bg-blue-50 p-2 rounded-lg"
                    onClick={() => setDownloadOpen(true)}
                  >
                    <Download className="w-5 h-5 inline-block" />
                  </button>

                  <DownloadStartedDialog
                    isOpen={isDownloadOpen}
                    onClose={() => setDownloadOpen(false)}
                    fileName="Report-Q3-2025.pdf"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
