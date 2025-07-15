import {Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { X } from "lucide-react";

export function FilterSidebar({
  isOpen,
  onClose,
  tempStatus,
  setTempStatus,
  tempFY,
  setTempFY,
  tempMinInvoice,
  setTempMinInvoice,
  tempMaxInvoice,
  setTempMaxInvoice,
  tempAmountMoreThan,
  setTempAmountMoreThan,
  tempDateRange,
  setTempDateRange,
  tempDueFilter,
  setTempDueFilter,
  tempCustomDueDate,
  setTempCustomDueDate,

  tempLabel,
  setTempLabel,
  applyFilters,
  clearFilters,
}) {
  // Escape key
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

 

  return (
    <Transition show={isOpen} as={Fragment}>
      <div>
        {/* Blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/10  z-30"
            onClick={onClose}
          />
        </Transition.Child>

        {/* Sidebar */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-150"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed right-0 top-0 w-80 max-w-full bg-boldWhite shadow-xl h-full z-40 flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-bodyGray-800">Filters</h4>
              <X onClick={onClose} className="cursor-pointer text-bodyGray-500 hover:text-bodyGray-800" />
            </div>

            <div className="flex flex-col gap-6">

              {/* STATUS */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Status</h5>
                <select
                  value={tempStatus}
                  onChange={e => setTempStatus(e.target.value)}
                  className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              {/* FY */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Financial Year</h5>
                <select
                  value={tempFY}
                  onChange={e => setTempFY(e.target.value)}
                  className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                >
                  <option value="All">All</option>
                  <option value="FY 2021–2022">FY 2021–2022</option>
                  <option value="FY 2022–2023">FY 2022–2023</option>
                  <option value="FY 2023–2024">FY 2023–2024</option>
                </select>
              </div>

              {/* Invoice Number Range */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Invoice Number Range</h5>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min #"
                    value={tempMinInvoice}
                    onChange={e => setTempMinInvoice(e.target.value)}
                    className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max #"
                    value={tempMaxInvoice}
                    onChange={e => setTempMaxInvoice(e.target.value)}
                    className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Amount Filter</h5>
                <input
                  type="number"
                  placeholder="More than e.g. 50000"
                  value={tempAmountMoreThan}
                  onChange={e => setTempAmountMoreThan(e.target.value)}
                  className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                />
              </div>

              {/* Quick Date */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Quick Date Range</h5>
                <select
                  value={tempDateRange}
                  onChange={e => setTempDateRange(e.target.value)}
                  className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                >
                  <option value="">All</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Due Filter as buttons */}
              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Due Filter</h5>
                <div className="flex gap-2 mb-2">
                  {["dueToday", "dueTomorrow", "custom"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setTempDueFilter(opt)}
                      className={`flex-1 text-xs py-2 rounded-md border 
                        ${tempDueFilter === opt 
                          ? "bg-primary-500 text-boldWhite border-primary-500" 
                          : "bg-bodyGray-100 text-bodyGray-800 hover:bg-primary-100"}`}
                    >
                      {opt === "dueToday" ? "Due Today" :
                       opt === "dueTomorrow" ? "Due Tomorrow" :
                       "Custom Date"}
                    </button>
                  ))}
                </div>
                {tempDueFilter === "custom" && (
                  <input
                    type="date"
                    value={tempCustomDueDate || ""}
                    onChange={e => setTempCustomDueDate(e.target.value)}
                    className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                  />
                )}
              </div>

              <div>
                <h5 className="text-xs font-semibold text-bodyGray-500 mb-2 uppercase">Label</h5>
                <select
                  value={tempLabel}
                  onChange={e => setTempLabel(e.target.value)}
                  className="w-full border border-bodyGray-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-100 outline-none"
                >
                  <option value="">All</option>
                  <option value="priority">Priority</option>
                  <option value="internal">Internal</option>
                  <option value="client">Client</option>
                </select>
              </div>

    
            </div>

            <div className="mt-auto flex gap-2 pt-6">
              <button
                onClick={clearFilters}
                className="flex-1 border border-bodyGray-400 text-bodyGray-800 py-2 rounded-md hover:bg-bodyGray-100 transition"
              >
                Clear
              </button>
              <button
                onClick={() => { applyFilters(); onClose(); }}
                className="flex-1 bg-primary-500 text-boldWhite py-2 rounded-md hover:bg-primary-600 transition">
                Save
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
