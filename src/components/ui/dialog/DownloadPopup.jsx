import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";

export default function DownloadStartedDialog({ isOpen, onClose, fileName = "invoice.pdf" }) {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setProgress(0);
      setIsDownloading(true);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsDownloading(false);
            toast.success("Download complete!", { id: "download-complete" });
            setTimeout(() => {
              onClose();
            }, 800);
            return 100;
          }
          return prev + 4;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const handleCancel = () => {
    setProgress(0);
    setIsDownloading(false);
    onClose();
  };

  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={isOpen}
      onClose={() => {
        if (!isDownloading) onClose();
      }}
    >
      <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xs rounded-2xl bg-white p-6 text-center border border-dotted border-primary-500">
          <Dialog.Title as="h3" className="mb-2 text-lg font-semibold text-gray-900">
            Download Started
          </Dialog.Title>
          <p className="text-sm text-gray-500 mb-1">Your download is in progress...</p>
          <p className="text-xs text-gray-400 mb-4 truncate">{fileName}</p>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-green-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isDownloading}
              className={`flex-1 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium shadow 
                ${
                  isDownloading
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDownloading}
              className={`flex-1 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium shadow 
                ${
                  !isDownloading
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
