import  { Fragment, useState } from "react";
import { imgPath } from "../../assets/imagesData";
import {
  FileChartColumnIncreasing,
  Info,
  Book,
  Settings,
  ShoppingBag,
  LayoutDashboard,
  FileText,
  Package,
  Bot,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ListTodo,
  CircleDot,
  LogOut,
  Truck,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Tooltip } from "react-tooltip";


const mainMenuItems = [
  { icon: <LayoutDashboard size={20} />, name: "Dashboard", link: "/dashboard",tooltipName: 'Financial Dashboard'},
  { 
    icon: <FileText size={20} />, 
    name: "Sales", 
    tooltipName: 'Sales Group',
    subItems: [
      { name: "Invoices Dashboard", link: "/sales/invoice-dashboard" },
      { name: "Create Invoice", link: "/sales/create-invoice" },
      { name: "Invoice List", link: "/sales/invoice-list" },
      { name: "Retail Invoice", link: "/sales/retail-invoice" },
      { name: "Payments Receipts", link: "/sales/payments-receipts" },
      { name: "Proforma Invoice", link: "/sales/proforma-invoice" },
      { name: "Delivery Challans", link: "/sales/delivery-challans" },
    ],
  },
  {
    icon: <Package size={20} />,
    name: "Inventory",
    tooltipName: 'Inventory Group',
    subItems: [
      { name: "Inventory Dashboard", link: "/inventory/dashboard" },
      { name: "All Items", link: "/inventory/items" },
      { name: "Categories", link: "/inventory/categories" },
      { name: "Stock Management", link: "/inventory/stock" },
    ],
  },
    { 
    icon: <ShoppingBag  size={20} />, 
    name: "Purchases", 
    tooltipName: 'Purchase Group',
    subItems: [
      { name: "Purchase", link: "/purchases/purchase" },
      { name: "Payments Made", link: "/purchases/payments-made" },
      { name: "Debit Note", link: "/purchases/debit-note" },
      { name: "Purchase Order", link: "/purchases/purchase-order" },
    ],
  },
  {
    icon: <ListTodo size={20} />,
    name: "Apps",
    tooltipName: 'Apps Group',
    subItems: [
      { name: "Expense Tracker", link: "/apps/expense" },
      { name: "GST Calculator", link: "/apps/gst" },
      { name: "HSN Finder", link: "/apps/hsn" },
      { name: "To-do List", link: "/apps/todo" },
      { name: "Notes", link: "/apps/notes" },
    ],
  },
    { icon: <Truck  size={20} />, name: "E-WayBill", link: "/e-waybill" ,tooltipName: 'E-WayBill'},

  { icon: <FileChartColumnIncreasing  size={20} />, name: "Reports", link: "/reports" ,tooltipName: 'Reports'},
  { icon: <Book   size={20} />, name: "Ledger", link: "/ledger",tooltipName: 'Ledger' },
  { 
    icon: <FileText size={20} />, 
    name: "Masters", 
    tooltipName: 'Masters Group',
    subItems: [
      { name: "Customer", link: "/masters/customer" },
      { name: "Vendors", link: "/masters/vendors" },
      { name: "Products", link: "/masters/products" },
    ],
  },
 
  { icon: <Bot size={20} />, name: "A.I", link: "/ai",tooltipName: 'FRIDAY A.I' },
];

const bottomMenuItems = [
  
  { icon: <Settings size={20} />, name: "Settings", link: "/settings",tooltipName:"Settings" },
];

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  const isActiveParent = (item) => {
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.link);
    }
    return false;
  };

  const getLinkClass = (item) => {
    const isActive = isActiveLink(item.link) || isActiveParent(item);
    const baseClass = "rounded-lg cursor-pointer transition-all duration-200";
    const expandedClass = "flex items-center gap-3 p-3";
    const collapsedClass = "flex items-center justify-center p-2";

    return cn(
      expanded ? expandedClass : collapsedClass,
      baseClass,
      isActive
        ? "bg-primary-500 text-boldWhite shadow-md"
        : "hover:bg-primary-50 hover:text-primary-600 text-bodyGray-800"
    );
  };

  const handleMenuItemClick = (item) => {
    if (!expanded) setExpanded(true);

    if (item.subItems) {
      setExpandedSubmenu((prev) => (prev === item.name ? null : item.name));
    } else if (item.link) {
      navigate(item.link);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "h-full bg-boldWhite text-bodyGray-800 flex flex-col border-r border-bodyGray-300 transition-all duration-300 ease-in-out relative shadow-sm",
          expanded ? "w-60" : "w-20"
        )}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute -right-3 top-6 bg-boldWhite border border-bodyGray-300 rounded-full cursor-pointer p-1.5 shadow-md hover:shadow-lg transition-all duration-200 z-10"
        >
          {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className="flex justify-center items-center py-3 mt-2 border-b border-bodyGray-100">
          {expanded ? (
            <img src={imgPath.imgLogoHorizontal} className="w-30 h-10" alt="Desktop Logo" />
          ) : (
            <img src={imgPath.imgLogoMobile} className="w-10 h-10" alt="Mobile Logo" />
          )}
        </div>

    <div className="flex-grow overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
  {mainMenuItems.map((item, index) => (
    <div key={index}>
      {item.subItems ? (
        <>
          <div
            onClick={() => handleMenuItemClick(item)}
            className={getLinkClass(item)}
            data-tooltip-id={`tooltip-${index}`}
            data-tooltip-content={item.tooltipName || item.name}
          >
            {item.icon}
            {expanded && (
              <>
                <span className="text-sm font-medium flex-grow">{item.name}</span>
                <span className="ml-auto">
                  {expandedSubmenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </>
            )}
          </div>
          {!expanded && (
              <Tooltip
              id={`tooltip-${index}`}
              place="right"
              effect="solid"
              className="!z-50 !bg-gray-900 !text-white !text-xs !py-2 !px-2 rounded shadow"
            />
          )}
        </>
      ) : (
        <>
          <Link
            to={item.link}
            onClick={() => { if (!expanded) setExpanded(true); }}
            className={getLinkClass(item)}
            data-tooltip-id={`tooltip-${index}`}
            data-tooltip-content={item.tooltipName || item.name}
          >
            {item.icon}
            {expanded && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
          {!expanded && (
  <Tooltip
              id={`tooltip-${index}`}
              place="right"
              effect="solid"
              className="!z-50 !bg-gray-900 !text-white !text-xs !py-2 !px-2 rounded shadow"
            />
          )}
        </>
      )}

      {item.subItems && expandedSubmenu === item.name && expanded && (
        <div className="ml-6 mt-2 space-y-1 border-l border-bodyGray-300 pl-4">
          {item.subItems.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              to={subItem.link}
              className={cn(
                "flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-colors",
                isActiveLink(subItem.link)
                  ? "bg-primary-100 text-primary-700 font-medium"
                  : "text-bodyGray-600 hover:bg-bodyGray-50 hover:text-bodyGray-900"
              )}
            >
              <CircleDot size={8} className="text-primary-600" />
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


<div className="border-t-2 border-bodyGray-100 px-3 py-1 space-y-1">
  {bottomMenuItems.map((item, index) => (
    <Fragment key={index}>
      <Link
        to={item.link}
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
        className={getLinkClass(item)}
        data-tooltip-id={`bottom-tooltip-${index}`}
        data-tooltip-content={item.tooltipName || item.name}
      >
        {item.icon}
        {expanded && <span className="text-sm font-medium">{item.name}</span>}
      </Link>
      {!expanded && (
        <Tooltip
          id={`bottom-tooltip-${index}`}
          place="right"
          className="!z-50 !bg-gray-900 !text-white !text-xs !py-1 !px-2 rounded shadow"
        />
      )}
    </Fragment>
  ))}
  
  <Fragment>
    <button
      onClick={handleLogout}
      className={cn(
        "w-full rounded-lg cursor-pointer transition-all duration-200 text-red-600 hover:bg-red-50",
        expanded ? "flex items-center gap-2 p-3" : "flex items-center justify-center p-2"
      )}
      data-tooltip-id={`logout-tooltip`}
      data-tooltip-content="Logout"
    >
      <LogOut size={20} />
      {expanded && <span className="text-sm font-medium">Logout</span>}
    </button>
    {!expanded && (
      <Tooltip
        id={`logout-tooltip`}
        place="right"
        className="!z-50 !bg-gray-900 !text-white !text-xs !py-1 !px-2 rounded shadow"
      />
    )}
  </Fragment>
</div>

      </div>
    </div>
  );
};