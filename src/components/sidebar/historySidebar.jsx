// components/HistorySidebar.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { History, Sparkles, MessageCircle, Trash2, X } from 'lucide-react';

const recentChats = [
  "What is the weather in New York today and tomorrow and also next week?",
  "Define quantum computing and its applications in AI",
  "Who won the IPL 2024 final and how did they perform?",
  "Generate a sales report template for Q3 2025",
  "Summarize the key features of the new tax policy",
  "How can I improve inventory turnover ratio?",
];

const truncateText = (text, maxLength = 5) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxLength) return text;
  return words.slice(0, maxLength).join(' ') + '...';
};

export default function HistorySidebar({ isOpen, onClose }) {
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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-80 max-w-full bg-boldWhite border-l border-bodyGray-200 shadow-xl p-6 flex flex-col gap-5 overflow-y-auto">
                
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-bodyGray-700">History</h2>
                  <button onClick={onClose} aria-label="Close sidebar">
                    <X className="w-5 h-5 text-bodyGray-700" />
                  </button>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200 mb-4">
                  <h3 className="text-sm font-medium text-primary-700 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-primary-600" />
                    AI Assistant Capabilities
                  </h3>
                  <ul className="text-xs text-primary-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Generate reports and analysis
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Answer business and inventory questions
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Provide market insights and trends
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Help with document creation
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  {recentChats.slice(0, 3).map((chat, index) => (
                    <div key={index} className="flex border hover:bg-primary-600 text-bodyGray-500 hover:text-boldWhite hover:border-primary-50 active:scale-98 transition border-bodyGray-300 py-3 px-3 rounded-xl items-start gap-4">
                      <MessageCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">{truncateText(chat)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex-grow" />

                <button className="flex items-center gap-2 w-full py-3 px-4 rounded-lg text-sm border-2 active:scale-98 transition-transform text-red-600 hover:text-boldWhite hover:bg-red-600 transition-colors font-medium">
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
