import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { imgPath } from '../../assets/imagesData';

export const NavLanding = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-bodyGray-300 bg-boldWhite ">
      <div className="container mx-auto px-5 flex h-18 items-center justify-between">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
        <img src={imgPath.imgLogoHorizontal} alt="Inventory Pro Logo" className="h-10 w-30" />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-bodyGray-800 hover:text-primary-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 transition cursor-pointer active:scale-95">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary-600 hover:bg-primary-700 text-boldWhite transition cursor-pointer active:scale-95">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-primary-600" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-boldWhite border-t shadow-sm">
          <nav className="flex flex-col gap-3 p-4">
            {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-bodyGray-800 hover:text-primary-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link to="/login" className="text-sm font-medium text-bodyGray-800 hover:text-primary-600">
              Log in
            </Link>
            <Link to="/signup" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
