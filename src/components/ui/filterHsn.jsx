import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Filter, X, BadgePercent, Layers, Book } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export default function FilterSidebar({
  isOpen,
  onClose,
  onApplyFilters,
  activeFilters = {},
  onClearFilters,
}) {
  const [localFilters, setLocalFilters] = useState({
    category: '',
    gstRate: '',
    chapter: '',
  });

  const handleClear = () => {
    setLocalFilters({ category: '', gstRate: '', chapter: '' });
    onClearFilters?.();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Blur backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 " />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          {/* Sidebar slide animation */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-sm bg-boldWhite shadow-xl flex flex-col p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary-600" />
                  Filters
                </h2>
                <Button variant="ghost" onClick={onClose}>
                  <X className="w-5 h-5 text-bodyGray-500" />
                </Button>
              </div>

              {/* Quick tags with animation */}
              <div>
                <h4 className="text-sm font-medium text-bodyGray-700 mb-2">Quick Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'GST 18%', icon: BadgePercent },
                    { label: 'Electronics', icon: Layers },
                    { label: 'Chapter 84', icon: Book },
                    { label: 'GST 0%', icon: BadgePercent },
                  ].map(({ label, icon: Icon }, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1 text-xs transition hover:bg-primary-50 hover:border-primary-500 active:scale-95"
                      onClick={() => {
                        // simple demo: set to localFilters
                        if (label.includes('GST'))
                          setLocalFilters((p) => ({ ...p, gstRate: label.split(' ')[1] }));
                        else if (label.includes('Chapter'))
                          setLocalFilters((p) => ({ ...p, chapter: label.split(' ')[1] }));
                        else
                          setLocalFilters((p) => ({ ...p, category: label }));
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Advanced filters */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-bodyGray-600 mb-1">Category</label>
                  <select
                    value={localFilters.category}
                    onChange={(e) => setLocalFilters((p) => ({ ...p, category: e.target.value }))}
                    className="w-full border border-bodyGray-300 rounded-md p-2 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-bodyGray-600 mb-1">GST Rate</label>
                  <select
                    value={localFilters.gstRate}
                    onChange={(e) => setLocalFilters((p) => ({ ...p, gstRate: e.target.value }))}
                    className="w-full border border-bodyGray-300 rounded-md p-2 focus:ring-primary-500"
                  >
                    <option value="">All Rates</option>
                    <option value="0%">0%</option>
                    <option value="5%">5%</option>
                    <option value="12%">12%</option>
                    <option value="18%">18%</option>
                    <option value="28%">28%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-bodyGray-600 mb-1">Chapter</label>
                  <input
                    type="text"
                    value={localFilters.chapter}
                    onChange={(e) => setLocalFilters((p) => ({ ...p, chapter: e.target.value }))}
                    placeholder="e.g., 84"
                    className="w-full border border-bodyGray-300 rounded-md p-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4 mt-auto flex-wrap">
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1 text-bodyGray-700 hover:border-red-500 hover:text-red-500"
                >
                  Clear Filters
                </Button>
                <Button
                  onClick={() => {
                    onApplyFilters?.(localFilters);
                    onClose();
                  }}
                  className="bg-primary-600 hover:bg-primary-700 text-white flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
