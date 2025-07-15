import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bodyGray-100 text-bodyGray-900 gap-1">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-4 px-6 py-2 bg-boldWhite border-2 border-bodyGray-900 text-bodyGray-900 text-lg rounded-lg shadow-md hover:bg-bodyGray-900 hover:text-boldWhite transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;