import { useState,useEffect } from "react";
import { LayoutDashboard, ArrowUpRight, TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, CreditCard } from "lucide-react";
import CountUp from "react-countup";
import SalesCategory from "../components/graphs/SalesCategory";
import SalesChart from "../components/graphs/MonthlySales";
import DailySalesChart from "../components/graphs/DailySales";
import TopSellingProducts from "../components/TopSelling";
import RecentOrders from "../components/RecentOrders";
import { Skeleton } from "../components/ui/skeleton";

const DashboardCard = ({ title, amount, pending, index }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isFirst = index === 0;
  return (
    <div
      className={`${
        isFirst ? "bg-bodyGray-900 text-boldWhite border-bodyGray-900" : "bg-bodyGray-50 text-bodyGray-900 border-bodyGray-200"
      }  rounded-3xl p-6 h-50 w-full max-w-sm relative   border-2`}
    >
      <div className={`text-md ${isFirst ? "text-bodyGray-400" : "text-bodyGray-500"} mt-2`}>
        {title}
      </div>
      <div className="mt-10">
         
          <CountUp
            className="text-4xl font-semibold"
            end={amount}
            duration={1}
            prefix="₹ "
            separator=","
          />
      </div>
        
          <span className={`${isFirst ? "text-bodyGray-400" : "text-bodyGray-500"}`}>
               {loading ? (
          <Skeleton className="h-5 w-30 rounded-md mt-5" />
        ) : (
            <span className="text-sm mt-5 block">
            Pending <span className="ml-1 ">💰 ₹ {pending.toLocaleString()}</span>
            </span>
        )}
          </span>


      <div className="absolute top-6 right-6 group">
        <span className="absolute inset-0 rounded-full bg-primary-600 opacity-50 group-hover:animate-ping"></span>

        <div className={`relative rounded-full p-4 group-hover:scale-110 cursor-pointer transition-transform 
          ${isFirst 
            ? "bg-bodyGray-300 text-bodyGray-900 hover:bg-primary-600 hover:text-boldWhite"
            : "bg-bodyGray-100 text-bodyGray-900 hover:bg-primary-600 hover:text-boldWhite"}`}>
          <ArrowUpRight size={24} />
        </div>
      </div>
    </div>
  );
};

const QuickStatsCard = ({ title, value, icon, trend, percentage, color }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-bodyGray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-bodyGray-500">{title}</p>
          <p className="text-xl font-bold mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const FinancialDash = () => {
  const cards = [
    { title: "Total Credit", amount: 100586203, pending: 45452 },
    { title: "Total Debit", amount: 80562215, pending: 13200 },
    { title: "Total Invoice", amount: 2537, pending: 4500},
  ];

  const quickStats = [
    {
      title: "Total Revenue",
      value: "₹1,245,890",
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      trend: "up",
      percentage: "12.5%",
      color: "bg-green-100"
    },
    {
      title: "Active Customers",
      value: "1,245",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      trend: "up",
      percentage: "8.2%",
      color: "bg-blue-100"
    },
    {
      title: "Pending Orders",
      value: "45",
      icon: <ShoppingBag className="w-5 h-5 text-yellow-600" />,
      trend: "down",
      percentage: "3.1%",
      color: "bg-yellow-100"
    },
    {
      title: "Total Transactions",
      value: "3,456",
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      trend: "up",
      percentage: "14.2%",
      color: "bg-purple-100"
    }
  ];



  return (
    <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Financial Dashboard</h3>
            <p className="text-sm text-bodyGray-500">User Financial Statistical Model</p>
          </div>
          <div className="rounded-lg bg-boldWhite p-2 ">
            <LayoutDashboard className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>
     
      <div className="flex flex-wrap justify-evenly gap-5">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            index={index}
            title={card.title}
            amount={card.amount}
            pending={card.pending}
          />
        ))}
      </div>

 

      <div className="flex flex-row gap-5 items-center justify-center mt-5">
        <SalesChart />
        <SalesCategory />
      </div>
      
      <div className="flex flex-row gap-5 items-center justify-center mt-5">
        <DailySalesChart/>
        <TopSellingProducts />
      </div>
      
           <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        {quickStats.map((stat, index) => (
          <QuickStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            percentage={stat.percentage}
            color={stat.color}
          />
        ))}

    
      </div>
      <RecentOrders />
    </div>
  );
};

export default FinancialDash;