import React from "react";
import { cn } from "../../lib/utils";

export const Toggle = React.forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "peer w-10 h-5 rounded-full bg-white ring-2 ring-red-500 duration-300",
          "after:content-[''] after:absolute after:top-1 after:left-1 after:bg-red-500 after:rounded-full after:h-3 after:w-3 after:transition-transform after:duration-300",
          "peer-checked:after:translate-x-5 peer-checked:after:bg-green-500 peer-checked:ring-green-500",
          "peer-hover:after:scale-95",
          className
        )}
      ></div>
    </label>
  );
});

Toggle.displayName = "Toggle";
