import  { useState,Fragment } from 'react';
import { DateRangePickerButton } from '../../components/dateInput';
import { FilterSidebar } from "../../components/ui/invoiceListFilter";
import { DropdownMenu } from '../../components/ui/DropDownInvoice';
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import DeleteInvoiceDialog from "../../components/ui/dialog/deleteInvoice";
import PrintInvoiceDialog from '../../components/ui/dialog/printInvoice';
import SendReminderDialog from '../../components/ui/dialog/SendReminderDialog';

import SendEmailReminderDialog from '../../components/ui/dialog/EmailRemainderDialog';
import DownloadStartedDialog from '../../components/ui/dialog/DownloadPopup';


import {
  ExternalLink,
  PlusCircle,
  List,
  ArrowRight,
  ArrowLeft,
  Download,
  Printer,
  Copy,
  Edit,
  Trash2,
  Mail,
  Bell,
  X,
  Filter
} from 'lucide-react';

export const InvoiceList = () => {

    const registeredPhone = "+91-9876543210";
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [isPrintDialogOpen, setPrintDialogOpen] = useState(false);
const [isRemainderDialogOpen, setRemainderDialogOpen] = useState(false);
const [open, setOpen] = useState(false);
const [isDownloadOpen, setDownloadOpen] = useState(false);
  const storedEmail = "client@example.com";


  const handlePrint = () => {
    console.log("Printing invoice...");
    setPrintDialogOpen(false);
  };
  const handleDelete = () => {
    console.log("Invoice deleted!");
    setIsDialogOpen(false);
  };


  const allInvoices = Array.from({ length: 45 }, (_, i) => ({
    id: `#INV00${i + 1}`,
    customer: `Customer ${i + 1}`,
    date: `2023-${(i % 12) + 1}-10`,
    status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Overdue',
    total: `₹${(Math.random() * 100000 + 10000).toFixed(0)}`,
    fy: i < 15 ? 'FY 2021–2022' : i < 30 ? 'FY 2022–2023' : 'FY 2023–2024',
  }));


  
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTab, setSelectedTab] = useState("Total Sales");

  const [selectedFY, setSelectedFY] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
const [sortOption, setSortOption] = useState('Newest');


const clearFilters = () => {
  setTempMinAmount('');
  setTempMaxAmount('');
  setTempStartDate('');
  setTempEndDate('');
  setTempFY('All');
  setTempStatus('All');
};


  const [tempMinAmount, setTempMinAmount] = useState('');
  const [tempMaxAmount, setTempMaxAmount] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [tempFY, setTempFY] = useState('All');
  const [tempStatus, setTempStatus] = useState('All');

  const itemsPerPage = 15;

  const applyFilters = () => {
    setMinAmount(tempMinAmount);
    setMaxAmount(tempMaxAmount);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setSelectedFY(tempFY);
    setSelectedStatus(tempStatus);
    setCurrentPage(1);
  };

  

  const statusColor = {
    Completed: 'bg-primary-100 text-primary-600',
    Pending: 'bg-yellow-100 text-yellow-600',
    Overdue: 'bg-red-100 text-red-600',
  };

  const filteredInvoices = allInvoices.filter((inv) => {
    const matchSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'All' || inv.status === selectedStatus;
    const matchFY = selectedFY === 'All' || inv.fy === selectedFY;

    const amountValue = Number(inv.total.replace(/[^\d]/g, ''));
    const matchAmount =
      (!minAmount || amountValue >= Number(minAmount)) &&
      (!maxAmount || amountValue <= Number(maxAmount));

    const invoiceDate = new Date(inv.date);
    const matchDate =
      (!startDate || invoiceDate >= new Date(startDate)) &&
      (!endDate || invoiceDate <= new Date(endDate));

    return matchSearch && matchStatus && matchFY && matchAmount && matchDate;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

 

const tabData = [
  { label: "Total Sales", amount: 12000, color: "bg-primary-500" },
  { label: "Unpaid Sales", amount: 3500, color: "bg-yellow-400" },
  { label: "Overdue", amount: 1800, color: "bg-red-400" },
  { label: "Completed", amount: 6700, color: "bg-blue-400" },
];






  const getOverdueDays = (dateStr) => {
    const invoiceDate = new Date(dateStr);
    const today = new Date();
    if (today <= invoiceDate) return 0;
    const diffTime = today - invoiceDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
     <div className="relative overflow-hidden bg-boldWhite p-5 w-full ">
          <div className="flex items-center justify-between p-5">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Invoice List </h3>
              <p className="text-sm text-bodyGray-500">Manage and view all invoices</p>
            </div>
            <div className="flex flex-row gap-5 items-center rounded-lg bg-boldWhite p-2">
               <button className="flex items-center gap-2 cursor-pointer rounded-lg  px-4 py-2 text-boldWhite border-2 active:scale-97 transition-transform border-primary-600 bg-primary-600 hover:text-boldWhite hover:bg-primary-500">
          <PlusCircle size={18} /> Create Invoice
        </button>
              <List className="h-6 w-6 text-bodyGray-800" />
            </div>
          </div>
     <div className="flex flex-wrap justify-between items-center w-full gap-5 p-5 mb-4 bg-boldWhite rounded-xl ">
<div className="flex flex-wrap items-center gap-3">
  {tabData.map((tab) => (
    <button
      key={tab.label}
      onClick={() => setSelectedTab(tab.label)}
      className={`px-5 py-2 rounded-lg border border-primary-200 transition flex flex-col items-start w-32
        ${selectedTab === tab.label ? `${tab.color} text-boldWhite border-0` : `bg-primary-50 text-bodyGray-800 hover:bg-bodyGray-100`}`}
    >
      <span className='text-xs font-medium'>{tab.label}</span>
      <span className="text-lg font-semibold mt-1">
        ₹{tab.amount.toLocaleString('en-IN')}
      </span>
    </button>
  ))}
</div>



  <div className="flex flex-wrap items-center gap-3 justify-end">
  <DateRangePickerButton />

  

 <button
  onClick={() => setIsFilterOpen(true)}
  className="flex flex-row items-center gap-2 cursor-pointer bg-primary-500 text-boldWhite px-4 py-2 rounded-md hover:bg-primary-600 transition active:scale-95"
>
  <Filter className='w-4 h-4 text-boldWhite'/> 
  Filter
</button>

  <HeadlessMenu as="div" className="relative inline-block text-left">
  <div>
    <HeadlessMenu.Button className="border px-4 py-2 rounded-md text-sm text-bodyGray-800 hover:bg-bodyGray-100 active:scale-95 transition truncate">
      Sort By: {sortOption}
    </HeadlessMenu.Button>
  </div>
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <HeadlessMenu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-boldWhite border border-bodyGray-200 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
      {['Newest', 'Oldest', 'Amount High–Low', 'Amount Low–High'].map(option => (
        <HeadlessMenu.Item key={option}>
          {({ active }) => (
            <button
              onClick={() => setSortOption(option)}
              className={`${
                active ? 'bg-primary-100 text-primary-700' : 'text-bodyGray-800'
              } px-4 py-2 w-full text-left text-sm`}
            >
              {option}
            </button>
          )}
        </HeadlessMenu.Item>
      ))}
    </HeadlessMenu.Items>
  </Transition>
</HeadlessMenu>

  </div>
</div>

      <div className="mb-5 p-5">
   <input
        type="text"
        placeholder="Search by ID or Customer Name..."
        className="w-full border border-bodyGray-400 focus:border-primary-700 transition-colors outline-none px-4 py-3 rounded-lg text-sm focus:ring-1 focus:ring-primary-400 shadow-sm"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} 
      />
      </div>

      <div className="overflow-x-auto border-1 border-bodyGray-300">
        <table className="w-full text-sm">
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
                className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition"
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
                    <span className="text-primary-600 font-medium">On Time</span>
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
        
                    <DownloadStartedDialog isOpen={isDownloadOpen} onClose={() => setDownloadOpen(false)}         fileName="Report-Q3-2025.pdf" // dynamic file name
        />
        

              
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

 

      <div className="flex justify-center gap-10 items-center mt-10 mb-5">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 flex items-center flex-row gap-2  disabled:opacity-50  disabled:hover:text-bodyGray-400 transition-colors cursor-pointer text-bodyGray-800 hover:text-primary-600"
        >
       <ArrowLeft className='w-5 h-5'/>   Previous 
        </button>

        <div className="space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-primary-500 text-boldWhite'
                  : 'bg-bodyGray-100 text-bodyGray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 flex items-center flex-row gap-2 disabled:opacity-50 disabled:hover:text-bodyGray-400 transition-colors cursor-pointer text-bodyGray-800 hover:text-primary-600"
        >
          Next <ArrowRight className='w-5 h-5'/>
        </button>
      </div>
      <FilterSidebar
  isOpen={isFilterOpen}
  onClose={() => setIsFilterOpen(false)}
  tempStatus={tempStatus}
  setTempStatus={setTempStatus}
  tempFY={tempFY}
  setTempFY={setTempFY}
  tempMinAmount={tempMinAmount}
  setTempMinAmount={setTempMinAmount}
  tempMaxAmount={tempMaxAmount}
  setTempMaxAmount={setTempMaxAmount}
  tempStartDate={tempStartDate}
  setTempStartDate={setTempStartDate}
  tempEndDate={tempEndDate}
  setTempEndDate={setTempEndDate}
  applyFilters={applyFilters}
  clearFilters={clearFilters}
/>

    </div>
  );
};
