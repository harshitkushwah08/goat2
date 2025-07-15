import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Trash2 } from "lucide-react";
import { Button } from "./button";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 " />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xs rounded-2xl bg-boldWhite p-6 shadow-xl space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-2">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <Dialog.Title className="text-lg font-semibold text-bodyGray-900">
                  Delete this task?
                </Dialog.Title>
                <p className="text-sm text-bodyGray-500 mt-1">
                  Are you sure you want to delete this task? <br />
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-bodyGray-300 text-bodyGray-700 hover:bg-bodyGray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
