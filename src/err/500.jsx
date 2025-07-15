import { imgPath } from "../assets/imagesData";
import { RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Error500Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center p-8">
        <div className="mb-4">
          <div className="relative inline-flex">
            <img
              src={imgPath.imgLogoMobile}
              alt="Logo"
              className="w-16 h-16 rounded-full animate-bounce-slow"
            />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-primary-600 mb-2">500</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Internal Server Error</h2>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong on our end. Please try again later.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md shadow hover:bg-primary-700 transition"
          >
            <RefreshCw size={16} /> Try Again
          </button>
     
        </div>
      </div>
    </div>
  );
}
