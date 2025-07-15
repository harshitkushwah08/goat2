import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Download, X } from 'lucide-react';
import { Button } from '../button';

const ExportAllDataDialog = ({ isOpen, onClose, onExport }) => (
  <Transition appear show={isOpen} as={React.Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" />
      </Transition.Child>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="ease-in duration-150"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg border border-bodyGray-200">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-bodyGray-900">Export All Data</Dialog.Title>
              <button onClick={onClose} className="text-bodyGray-500 hover:text-bodyGray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-bodyGray-500 mb-6">
              Export a complete copy of all your data including invoices, purchases, settings and more.
            </p>
            <Button
              className="w-full bg-primary-600 hover:bg-primary-700"
              onClick={() => {
                onExport();
                onClose();
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Export & Download
            </Button>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default ExportAllDataDialog;
