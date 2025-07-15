import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

export const CommonFilter = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  filterSections = [],
  title = "Filters",
  description = "Filter your results"
}) => {
  // Each filter section should have:
  // { id, title, type, options, value, onChange }
  // type can be: 'select', 'radio', 'checkbox', 'range', 'date', 'dateRange'
  
  const [localFilters, setLocalFilters] = useState({});
  
  // Initialize local filters from props
  React.useEffect(() => {
    const initialFilters = {};
    filterSections.forEach(section => {
      if (section.value !== undefined) {
        initialFilters[section.id] = section.value;
      }
    });
    setLocalFilters(initialFilters);
  }, [filterSections]);
  
  const handleChange = (sectionId, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [sectionId]: value
    }));
  };
  
  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };
  
  const handleClear = () => {
    const clearedFilters = {};
    filterSections.forEach(section => {
      clearedFilters[section.id] = section.type === 'checkbox' ? [] : '';
    });
    setLocalFilters(clearedFilters);
    onClear(clearedFilters);
  };

  const renderFilterControl = (section) => {
    const value = localFilters[section.id] !== undefined ? localFilters[section.id] : section.value;
    
    switch (section.type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(section.id, e.target.value)}
            className="w-full border border-bodyGray-300 rounded-md p-2 focus:ring-primary-500"
          >
            {section.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {section.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={value === option.value}
                  onChange={() => handleChange(section.id, option.value)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-2">
            {section.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      handleChange(section.id, [...currentValues, option.value]);
                    } else {
                      handleChange(section.id, currentValues.filter(v => v !== option.value));
                    }
                  }}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
        
      case 'range':
        return (
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={section.minPlaceholder || "Min"}
              value={value?.min || ''}
              onChange={(e) => handleChange(section.id, { ...value, min: e.target.value })}
              className="w-full"
            />
            <Input
              type="number"
              placeholder={section.maxPlaceholder || "Max"}
              value={value?.max || ''}
              onChange={(e) => handleChange(section.id, { ...value, max: e.target.value })}
              className="w-full"
            />
          </div>
        );
        
      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(section.id, e.target.value)}
            className="w-full"
          />
        );
        
      case 'dateRange':
        return (
          <div className="flex gap-2">
            <Input
              type="date"
              placeholder={section.startPlaceholder || "Start date"}
              value={value?.start || ''}
              onChange={(e) => handleChange(section.id, { ...value, start: e.target.value })}
              className="w-full"
            />
            <Input
              type="date"
              placeholder={section.endPlaceholder || "End date"}
              value={value?.end || ''}
              onChange={(e) => handleChange(section.id, { ...value, end: e.target.value })}
              className="w-full"
            />
          </div>
        );
        
      case 'search':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
            <Input
              placeholder={section.placeholder || "Search..."}
              value={value || ''}
              onChange={(e) => handleChange(section.id, e.target.value)}
              className="pl-9"
            />
          </div>
        );
        
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleChange(section.id, e.target.value)}
            placeholder={section.placeholder || ""}
            className="w-full"
          />
        );
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                    <div className="px-6 py-5 border-b border-bodyGray-200">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                          <Filter className="h-5 w-5 text-primary-600" />
                          {title}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="text-bodyGray-500 hover:text-bodyGray-700 focus:outline-none"
                          onClick={onClose}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-bodyGray-500">{description}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {filterSections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h3 className="text-sm font-medium text-bodyGray-700">{section.title}</h3>
                          {renderFilterControl(section)}
                          {section.description && (
                            <p className="text-xs text-bodyGray-500">{section.description}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-bodyGray-200 p-6">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={handleClear}
                          className="flex-1 border-bodyGray-300 text-bodyGray-700 hover:bg-bodyGray-50"
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={handleApply}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CommonFilter;