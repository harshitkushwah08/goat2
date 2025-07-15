import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Lottie from "lottie-react";
import Checkmark from '../../../assets/Checkmark.json';

export default function SendReminderDialog({ isOpen, onClose, phoneNumber }) {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowTick(false);
      const timer = setTimeout(() => setShowTick(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0  bg-black/10" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping" />
            {showTick && (
              <Lottie
                animationData={Checkmark}
                loop={false}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
          <Dialog.Title as="h3" className="mt-4 text-lg font-semibold leading-6 text-gray-900">
            Reminder Sent!
          </Dialog.Title>
          <p className="mt-2 text-sm text-gray-500">
            The reminder has been sent to the registered mobile number 
            <span className="font-medium text-gray-800"> {phoneNumber}</span> via WhatsApp and SMS.
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
