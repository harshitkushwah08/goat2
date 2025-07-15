import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Lottie from "lottie-react";
import checkmarkAnimation from "../../../assets/Checkmark.json"; // adjust your path
import { Mail } from "lucide-react";

export default function SendEmailReminderDialog({ isOpen, onClose, storedEmail }) {
  const [customEmail, setCustomEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
      setCustomEmail("");
    }
  }, [isOpen]);

  const handleSendEmail = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000); 
  };

  return (
    <>
      <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
        <div className="fixed inset-0  bg-black/10" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <Dialog.Title as="h3" className="mb-4 text-lg font-semibold text-gray-900 flex flex-row items-center justify-center gap-4">
        <Mail/>   Send Email Reminder  
            </Dialog.Title>
            <div className="text-sm text-gray-700 mb-4">
              This invoice will be sent to:
              <div className="mt-1 font-medium text-sm bg-primary-700 rounded-sm text-boldWhite p-4">{storedEmail}</div>
            </div>

            <div className="mt-4 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">Or add another email</label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="e.g., another@email.com"
                className="w-full rounded-md border-b-2 border-primary-400 h-10 px-2 focus:border-primary-500 focus:ring-primary-500 text-sm"
              />
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={handleSendEmail}
                className="flex-1 inline-flex justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Send Email
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Success popup */}
      <Dialog as="div" className="relative z-50" open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="fixed inset-0  bg-black/10" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping" />
              {/* Lottie checkmark */}
              <Lottie
                animationData={checkmarkAnimation}
                loop={false}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <Dialog.Title as="h3" className="mt-4 text-lg font-semibold leading-6 text-gray-900">
              Email Sent!
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-500">
              The reminder email has been sent successfully.
            </p>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
