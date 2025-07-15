import React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-bodyGray-900 text-boldWhite hover:bg-bodyGray-800",
    secondary: "bg-bodyGray-100 text-bodyGray-900 hover:bg-bodyGray-300",
    destructive: "bg-red-500 text-boldWhite hover:bg-red-600",
    outline: "border border-bodyGray-300 text-bodyGray-900 hover:bg-bodyGray-100",
    success: "bg-primary-500 text-boldWhite hover:bg-primary-600",
    warning: "bg-yellow-500 text-boldWhite hover:bg-yellow-600",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };