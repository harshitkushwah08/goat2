import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './sidebar/sidebar';
import { Navbar } from './layout/Navbar'; 
import { Footer } from './footer/Footer'; 

export function LayoutWrapper({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-bodyGray-50 ">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}