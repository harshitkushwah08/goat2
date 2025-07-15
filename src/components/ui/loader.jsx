import React from "react";
import { cn } from "../../lib/utils";
import { imgPath } from "../../assets/imagesData"; // adjust path if needed

export const Loader = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-4 w-4",          // smaller for button
    default: "h-8 w-8",     // balanced default
    lg: "h-16 w-16",
    xl: "h-20 w-20",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <div
        className={cn(
          "absolute rounded-full border-2 border-t-primary-600 p-13 border-b-primary-600 border-l-transparent border-r-transparent animate-spin-slow",
          sizes[size]
        )}
      />
      <img
        src={imgPath.imgLogoMobile}
        alt="Loading..."
        className={cn("animate-bounce-slow rounded-full shadow-md", sizes[size])}
      />
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-boldWhite/80  z-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-10 mt-10">
      <Loader size="xl" />
      <p className="text-bodyGray-600 font-medium">Loading...</p>
    </div>
  </div>
);

export const ButtonLoader = ({ className }) => (
  <Loader size="sm" className={cn("text-current", className)} />
);
