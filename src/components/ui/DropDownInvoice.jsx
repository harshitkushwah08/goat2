// components/DropdownMenu.jsx
import React from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useRole, useInteractions } from "@floating-ui/react";
import { MoreHorizontal } from "lucide-react";

export const DropdownMenu = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(6), flip(), shift()],
    placement: "bottom-end"
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="text-gray-600 ml-3 m-auto cursor-pointer active:scale-95 hover:scale-105 hover:text-primary-700 transition"
      >
        <MoreHorizontal className="w-5 h-5"/>
      </button>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 mt-2 w-52 rounded-xl bg-boldWhite shadow-xl ring-1 ring-black/10 focus:outline-none"
        >
          <div className="py-1 text-sm text-bodyGray-800">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false); // close after click
                }}
                className={`flex w-full items-center px-4 py-2 gap-2 transition-colors hover:bg-primary-100 hover:text-primary-700 ${
                  item.danger ? "text-red-600 hover:text-red-700" : ""
                }`}
              >
                {item.icon}
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
