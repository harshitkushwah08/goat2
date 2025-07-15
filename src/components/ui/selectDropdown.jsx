import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react"; 

export default function DropdownSelectMenu({ options, selected, onChange }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex justify-between items-center w-full px-3 py-2 border border-bodyGray-200 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {options.find((o) => o.value === selected)?.label || "Select"}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-bodyGray-300 ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => onChange(option.value)}
                    className={`${
                      active ? "bg-primary-100 text-primary-900" : "text-gray-700"
                    } flex w-full px-4 py-2 text-sm truncate max-w-[150px]`}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
