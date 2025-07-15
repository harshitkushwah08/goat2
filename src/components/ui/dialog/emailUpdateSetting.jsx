import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Mail, X, Send } from 'lucide-react';
import { toast } from 'react-hot-toast'; // make sure to install react-hot-toast
import { Input } from '../input';
import { Button } from '../button';

const UpdateEmailDialog = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    toast.success('Email updation link has been sent to registered mobile no.');
    onClose();
  };

  return (
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <Dialog.Title className="text-lg font-semibold text-bodyGray-900">
                    Update Email
                  </Dialog.Title>
                </div>
                <button
                  onClick={onClose}
                  className="text-bodyGray-500 hover:text-bodyGray-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-bodyGray-500 mb-4">
                Enter the OTP sent to your new email address to confirm the update.
              </p>

              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mb-4 text-center tracking-widest font-mono text-lg"
              />

              <Button
                onClick={handleSubmit}
                className="w-full bg-primary-600 hover:bg-primary-700"
              >
                <Send className="w-4 h-4 mr-2" /> Submit
              </Button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateEmailDialog;
