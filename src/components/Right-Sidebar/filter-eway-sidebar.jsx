import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Filter, Calendar, User, CircleDollarSign, CheckCircle, Truck } from 'lucide-react';

export default function EWayBillFilterSidebar({ isOpen, onClose }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 " />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-80 max-w-full bg-boldWhite border-l border-bodyGray-200 shadow-xl p-6 flex flex-col overflow-y-auto">
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-bodyGray-800 flex items-center gap-1">
                  <Filter className="w-5 h-5 text-primary-600" />
                  Filter E-Way Bills
                </h2>
                <button onClick={onClose} aria-label="Close">
                  <X className="w-5 h-5 text-bodyGray-600" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-4 text-sm font-medium text-bodyGray-700 mb-4 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <input type="date" className="w-1/2 border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                    <input type="date" className="w-1/2 border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                  </div>
                </div>

                <div>
                  <label className=" text-sm font-medium text-bodyGray-700 mb-4 flex items-center gap-1">
                    <User className="w-4 h-4 text-primary-500" />
                    Customer
                  </label>
                  <input type="text" placeholder="Enter customer name" className="w-full border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                </div>

                 <div>
                  <label className=" text-sm font-medium text-bodyGray-700 mb-4 flex items-center gap-1">
                    <Truck className="w-4 h-4 text-primary-500" />
                    Vehcile No.
                  </label>
                  <input type="text" placeholder="Enter vehcile no. name" className="w-full border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                </div>



                <div>
                  <label className=" text-sm font-medium text-bodyGray-700 mb-2 flex items-center gap-1">
                    <CircleDollarSign className="w-4 h-4 text-primary-500" />
                    Value (₹)
                  </label>
                  <div className="flex gap-4">
                    <input type="number" placeholder="Min" className="w-1/2 border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                    <input type="number" placeholder="Max" className="w-1/2 border border-bodyGray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
                  </div>
                </div>
              </div>

              <div className="flex-grow" />

              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 py-2 px-4 rounded-md bg-primary-600 text-boldWhite text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-md border border-bodyGray-300 text-bodyGray-700 text-sm font-medium hover:bg-bodyGray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
