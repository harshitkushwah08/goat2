import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function PrinterPopup({ isOpen, onClose }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          window.print();
          onClose(); 
        }
      }, 300);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 w-80">
        <Printer className="w-10 h-10 text-primary" />
        <p className="text-center text-gray-700">Preparing your invoice for printing...</p>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Dialog>
  );
}

