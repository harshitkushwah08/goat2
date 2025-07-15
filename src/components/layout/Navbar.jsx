import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Info, LogOut, Settings, Sun, Moon, 
    Download, ChevronDown, FileText,
   CheckCircle, AlertTriangle,
   History,
   Pen,
  BookOpen,
  LayoutGrid,
  UserPlus,
  Users,
  Contact
} from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import { imgPath } from "../../assets/imagesData";
import { Badge } from "../ui/badge";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = 'theme';
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Invoice Created',
      message: 'Invoice #INV-2024-001 has been created successfully',
      time: '2 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of ₹25,000 received from ABC Corp',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Stock Alert',
      message: 'Product "Laptop Stand" is running low on stock',
      time: '3 hours ago',
      type: 'warning',
      read: true
    },
    {
      id: 4,
      title: 'GST Filing Reminder',
      message: 'GST filing due date is approaching (Due: 20th Jan)',
      time: '1 day ago',
      type: 'error',
      read: false
    }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 outline-0 py-2 border-2 transition-all border-gray-300 rounded-lg  focus:border-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <a href='/'>
        <div className="relative p-3 text-gray-600 flex flex-row items-center justify-center gap-4 text-sm border-bodyGray-200 border-2 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer active:bg-primary-600 active:text-boldWhite active:scale-98 transition-colors group">
          <Pen className='w-4 h-4' /> Custom Forms
        </div>
        </a>
        <a href='/forms/custom'>
        <div className="relative p-3 text-gray-600 flex flex-row items-center justify-center gap-4 text-sm border-bodyGray-200 border-2 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer active:bg-primary-600 active:text-boldWhite active:scale-98 transition-colors group">
          <LayoutGrid className='w-4 h-4' /> Form Builder
        </div>
        </a>
        <a href='/forms/templates'>

         <div className="relative p-3 text-gray-600 flex flex-row items-center justify-center gap-4 text-sm border-bodyGray-200 border-2 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer active:bg-primary-600 active:text-boldWhite active:scale-98 transition-colors group">
          <BookOpen className='w-4 h-4' /> Templates
        </div>
        </a>
        <div 
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          <Download className="w-5 h-5" />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Recent Downloads</h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Invoice-001-2025.pdf</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sales-Report-June.xlsx</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Product-Catalog.pdf</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={() => navigate('/recently-downloaded')}
                className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all downloads
              </button>
            </div>
          </div>
        </div>



        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <span className="text-sm text-gray-500">{unreadCount} new</span>
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    }}
                  >
                    Mark all read
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-200">
                <Link
                  to="/notifications"
                  className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1 hover:bg-blue-50 rounded transition-colors"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <button
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img
              src={imgPath.imgLogoMobile}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
            />
            <ChevronDown className="w-4 h-4" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-70 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={imgPath.imgLogoMobile}
                    alt="Profile" 
                    className="w-16 h-16 rounded-full border-2 border-bodyGray-200 p-1  hover:shadow-lg transition-shadow"
                  />
                  <div>
                    <p className="text-md font-semibold text-gray-900 text-center mt-2">John Doe</p>
                    <p className="text-xs text-gray-500 text-center">john@example.com</p>
                    <p className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 text-center">Premium Plan</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <div className="px-3 py-1 text-xs text-gray-500 uppercase font-semibold">Account</div>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mx-2 my-1 active:bg-primary-50"
                  onClick={() => setShowProfile(false)}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mx-2 my-1 active:bg-primary-50"
                  onClick={() => setShowProfile(false)}
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mx-2 my-1 active:bg-primary-50"
                  onClick={() => setShowProfile(false)}
                >
                  <Contact className="w-4 h-4 mr-3" />
                  Contact Us
                </Link>
                <div className="px-3 py-1 text-xs text-gray-500 uppercase font-semibold mt-2">Content</div>
                <Link
                  to="/recently-deleted"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mx-2 my-1 active:bg-primary-50"
                  onClick={() => setShowProfile(false)}
                >
                  <History className="w-4 h-4 mr-3" />
                  Recently Deleted
                </Link>
                <div className="px-3 py-1 text-xs text-gray-500 uppercase font-semibold mt-2">Accounts</div>
                <div className="flex items-center px-4 py-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <img
                      src={imgPath.imgLogoMobile}
                      alt="Current Account" 
                      className="w-6 h-6 rounded-full border border-primary-500"
                    />
                    <span className="font-medium">John Doe</span>
                    <Badge variant="success" className="text-xs ml-1">Active</Badge>
                  </div>
                </div>
                <div className="flex items-center px-4 py-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <img
                      src={imgPath.testi1}
                      alt="Second Account" 
                      className="w-6 h-6 rounded-full border border-gray-300"
                    />
                    <span className="text-gray-500">Jane Smith</span>
                  </div>
                </div>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md mx-2 my-1"
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  Add Another Account
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mx-2 my-1"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};