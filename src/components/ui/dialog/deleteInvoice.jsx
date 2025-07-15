import React from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DeleteInvoiceDialog({ isOpen, onClose, onDelete }) {
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
          <div className="fixed inset-0 bg-black/10" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 text-center ">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <Dialog.Title
            as="h3"
            className="mt-4 text-lg font-semibold leading-6 text-gray-900"
          >
            Delete Invoice
          </Dialog.Title>
          <div className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this invoice? This action cannot
            be undone.
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
