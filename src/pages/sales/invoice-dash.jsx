import  { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import {
  File,
  Wallet,
  Clock,
  CalendarClock,
  PlusCircle,
  FilePlus,
  ExternalLink,
  ArrowLeft,
    ArrowRight,
    Download,
      Printer,Copy,Edit,Trash2,Bell,Mail,X

} from 'lucide-react';
import { DropdownMenu } from '../../components/ui/DropDownInvoice';
import DeleteInvoiceDialog from "../../components/ui/dialog/deleteInvoice";
import PrintInvoiceDialog from '../../components/ui/dialog/printInvoice';
import SendReminderDialog from '../../components/ui/dialog/SendReminderDialog';

import SendEmailReminderDialog from '../../components/ui/dialog/EmailRemainderDialog';
import DownloadStartedDialog from '../../components/ui/dialog/DownloadPopup';

export const InvoiceDashboard = () => {
  const registeredPhone = "+91-9876543210";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPrintDialogOpen, setPrintDialogOpen] = useState(false);
  const [isRemainderDialogOpen, setRemainderDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const storedEmail = "client@example.com";
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  const handlePrint = () => {
    console.log("Printing invoice...");
    setPrintDialogOpen(false);
  };
  const handleDelete = () => {
    console.log("Invoice deleted!");
    setIsDialogOpen(false);
  };

  const allInvoices = Array.from({ length: 30 }, (_, i) => ({
    id: `#RSC45${45 + i}`,
    customer: `Customer ${i + 1}`,
    date: `Nov ${2 + i}, 2025 10:${i % 60}`,
    status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Overdue',
    total: `₹${(Math.random() * 100000 + 5000).toFixed(0)}`,
  }));

  const getOverdueDays = (dateStr) => {
    const invoiceDate = new Date(dateStr);
    const today = new Date();
    if (today <= invoiceDate) return 0;
    const diffTime = today - invoiceDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };




  const statusColor = {
    Completed: "bg-primary-100 text-primary-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Overdue: "bg-red-100 text-red-600",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allInvoices.length / itemsPerPage);

  const paginatedInvoices = allInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatCurrency = (value) => {
    const num = Number(value.toString().replace(/[^\d.-]/g, ""));
    const formatted = num.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });
    return formatted.length > 18 ? formatted.slice(0, 18) + "…" : formatted;
};

  // Chart options for invoice trends
  const invoiceTrendOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      foreColor: theme === 'dark' ? '#e5e7eb' : '#4b5563'
    },
    colors: ['#10b981', '#ef4444'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    tooltip: {
      theme: theme === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return "₹" + val.toLocaleString('en-IN');
        }
      }
    }
  };

  const invoiceTrendSeries = [
    {
      name: 'Paid Invoices',
      data: [31000, 40000, 35000, 51000, 49000, 62000, 69000, 91000, 148000, 120000, 99000, 87000]
    },
    {
      name: 'Pending Invoices',
      data: [11000, 32000, 45000, 32000, 34000, 52000, 41000, 31000, 40000, 28000, 33000, 42000]
    }
  ];


  return (
    <div className="relative overflow-hidden bg-boldWhite p-5 w-full ">
          <div className="flex items-center justify-between p-5">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Invoice Dashboard </h3>
              <p className="text-sm text-bodyGray-500">Overview of all invoices</p>
            </div>
            <div className="flex flex-row gap-5 items-center rounded-lg bg-boldWhite p-2">
                   <button className="flex items-center gap-2 cursor-pointer rounded-lg  px-4 py-2 text-boldWhite border-2 active:scale-98 transition-transform border-primary-500 bg-primary-500  hover:bg-primary-700">
          <PlusCircle size={18} /> Create Invoice
        </button>
              <FilePlus className="h-6 w-6 text-bodyGray-800" />
            </div>
          </div>

      <div className="grid grid-cols-4 gap-4 mb-6 p-2">
        <div className="flex flex-row justify-center  items-center rounded-3xl border-2 ring-4 ring-bodyGray-50 border-bodyGray-200 p-5">
            <span className="flex items-center justify-center rounded-full  border-primary-200  border-2 p-3">
          <File className='w-6 h-6  text-bodyGray-600'/>
          </span>
          <span className='flex flex-col items-start ml-5'>
          <p className="text-xs text-bodyGray-400">Total Drafts</p>
          <p className="text-2xl text-bodyGray-800 font-semibold">704</p>
          </span>
        </div>
        <div className="flex flex-row justify-center  items-center rounded-3xl border-2 ring-4 ring-bodyGray-50 border-bodyGray-200 p-5">
                      <span className="flex items-center justify-center rounded-full  border-primary-200  border-2 p-3">

          <Wallet className='w-6 h-6  text-bodyGray-600'/>

          </span>
            <span className='flex flex-col items-start ml-5'>
          <p className="text-sm text-bodyGray-500">Total Drafts</p>
          <p className="text-xl font-semibold">{formatCurrency("₹45,020")}</p>
          </span>
        </div>
        <div className="flex flex-row justify-center  items-center rounded-3xl border-2 ring-4 ring-bodyGray-50 border-bodyGray-200 p-5">
                      <span className="flex items-center justify-center rounded-full  border-primary-200  border-2 p-3">

          <Clock className='w-6 h-6  text-bodyGray-600'/>
          </span>
                      <span className='flex flex-col items-start ml-5'>

          <p className="text-sm text-bodyGray-500">Total Drafts</p>
          <p className="text-xl font-semibold">{formatCurrency("₹54,75,002")}</p>
        </span>
        </div>
        <div className="flex flex-row justify-center  items-center rounded-3xl border-2 ring-4 ring-bodyGray-50 border-bodyGray-200 p-5">
                      <span className="flex items-center justify-center rounded-full  border-primary-200  border-2 p-3">
          <CalendarClock className='w-6 h-6  text-bodyGray-600'/>
            </span>
                        <span className='flex flex-col items-start ml-5'>

          <p className="text-sm text-bodyGray-500">Over Due</p>
          <p className="text-xl font-semibold">{formatCurrency("₹45500004755")}</p>
        </span>
        </div>
      </div>

      <div className="flex justify-between items-center py-5 px-5 m-5 border-1 border-bodyGray-300 ring-2 ring-bodyGray-100 rounded-xl mb-4">
        <p>
          <span className="text-primary-600 font-semibold">15.2% </span>{' '}
          Higher This is the result of the statistical data above
        </p>
        <button className="text-sm text-bodyGray-800 hover:translate-x-1 transition-transform cursor-pointer hover:text-primary-600 flex items-center gap-1">
          View Deep Data Analytics →
        </button>
      </div>

      {/* Invoice Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-bodyGray-200 mb-6">
        <h3 className="text-lg font-semibold mb-4">Invoice Trends</h3>
        <div className="h-80">
          <ReactApexChart 
            options={invoiceTrendOptions} 
            series={invoiceTrendSeries} 
            type="area" 
            height="100%" 
          />
        </div>
      </div>

      


    

<div className="relative overflow-hidden bg-boldWhite p-5 w-full">
      
      <div className="flex items-centre flex-wrap justify-between p-5 mb-1">
        <div>
          <h3 className="text-lg font-semibold text-bodyGray-900">Invoice Lists </h3>
          <p className="text-sm text-bodyGray-500">The History of Invoices that have been created throughout</p>
        </div>
        <div className="flex flex-row gap-5 items-center rounded-lg bg-boldWhite p-2">
          <input
            type="text"
            placeholder="Search invoice"
            className="border-b-1 border-bodyGray-400 text-sm px-4 py-2 w-78 h-10 text-bodyGray-800 placeholder-bodyGray-400  focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-200 transition duration-200"
          />
        </div>
      </div>


    </div>

<div className="overflow-x-auto h-full overflow-visible border-1 border-bodyGray-300">
        <table className="w-full  text-sm">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-15">
            <tr>
              <th className="px-4 text-left"> </th>
              <th className="px-3 text-left">Invoice Number</th>
              <th className="px-4 text-left">Customer</th>
              <th className="px-4 text-left">Date</th>
              <th className="px-4 text-left">Status</th>
              <th className="px-4 text-left">Total</th>
              <th className="px-4 text-left">FY</th>
              <th className="px-4 text-left">Overdue In </th>
              <th className="px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((inv, index) => (
            <tr
              key={index}
          className="border-b border-bodyGray-300 h-15 hover:bg-primary-50 transition overflow-visible"
                    >
                <td className="px-4 py-3 text-bodyGray-500 hover:text-boldWhite hover:bg-primary-600 hover:scale-105 active:scale-100 transition cursor-pointer ">
                  <ExternalLink size={16} />
                </td>
                <td className="px-4 py-3 font-medium">{inv.id}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-medium ${statusColor[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">{inv.total}</td>
                <td className="px-4 py-3">{inv.fy}</td>
                 <td className="px-4 py-3">
                  {inv.status === 'Overdue' ? (
                    <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-xl text-xs">
                      Overdue by {getOverdueDays(inv.date)} day{getOverdueDays(inv.date) !== 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="text-primary-600 font-semibold">On Time</span>
                  )}
                </td>
                <td className="px-4 py-3">
                    <button className="border-primary-600 text-primary-600 border-2 p-2 text-xs hover:bg-primary-100 mr-2 active:bg-primary-600 active:text-boldWhite rounded">
          Record Payment
        </button>
                  <button className="text-blue-600 hover:bg-blue-500 hover:text-boldWhite ml-3 active:scale-95 transition-all  bg-blue-50 p-2 rounded-lg" onClick={() => setDownloadOpen(true)}>
                    <Download className="w-5 h-5 inline-block " />
                  </button>
   <DropdownMenu
         items={[
           { icon: <Printer className="w-4 h-4" />, text: "Print Invoice",onClick: () => setPrintDialogOpen(true)},
           { icon: <Copy className="w-4 h-4" />, text: "Duplicate", onClick: () => console.log("Duplicate") },
           { icon: <Edit className="w-4 h-4" />, text: "Edit", onClick: () => console.log("Edit") },
           { 
             icon: <Trash2 className="w-4 h-4" />, 
             text: "Delete", 
             danger: true, 
             onClick: () => setIsDialogOpen(true) 
           },
           { icon: <Bell className="w-4 h-4" />, text: "Send Reminder", onClick: () => setRemainderDialogOpen(true) },
           { icon: <Mail className="w-4 h-4" />, text: "Send Mail", onClick: () => setOpen(true) },
           { icon: <X className="w-4 h-4" />, text: "Cancel Invoice", danger: true, onClick: () => console.log("Cancel") }
         ]}
       />

        <DeleteInvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={handleDelete}
      />
  <PrintInvoiceDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
        onPrint={handlePrint}
      />

      <SendReminderDialog
        isOpen={isRemainderDialogOpen}
        onClose={() => setRemainderDialogOpen(false)}
        phoneNumber={registeredPhone}
      />

 <SendEmailReminderDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        storedEmail={storedEmail}
      />

            <DownloadStartedDialog isOpen={isDownloadOpen} onClose={() => setDownloadOpen(false)}         fileName="Report-Q3-2025.pdf" />


              
                </td>
              </tr>
            ))}
            {paginatedInvoices.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-bodyGray-500">
                  No invoices match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-center items-center my-10 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 flex items-center flex-row gap-2 disabled:opacity-50 disabled:hover:text-bodyGray-400 transition-colors cursor-pointer text-bodyGray-800 hover:text-primary-600"
          disabled={currentPage === 1}
        >
          <ArrowLeft className='w-5 h-5'/> Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === idx + 1
                ? 'bg-primary-500 text-boldWhite'
                : 'bg-bodyGray-100 text-bodyGray-800 hover:bg-primary-100'
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 flex items-center flex-row gap-2 disabled:hover:text-bodyGray-400 disabled:opacity-50 transition-colors cursor-pointer text-bodyGray-800 hover:text-primary-600"
          disabled={currentPage === totalPages}
        >
         Next  <ArrowRight className='w-5 h-5'/>
        </button>
      </div>


    </div>
  );
};