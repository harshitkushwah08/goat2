import  { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Chart from "react-apexcharts";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import ReactApexChart from 'react-apexcharts';

export const InventoryDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: <Package className="h-6 w-6" />,
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: <AlertTriangle className="h-6 w-6" />,
      variant: 'warning',
    },
    {
      title: 'Total Value',
      value: '₹847,392',
      change: '+8%',
      trend: 'up',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: 'Categories',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: <Package className="h-6 w-6" />,
    },
  ];

  const recentItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      sku: 'WH-001',
      category: 'Electronics',
      stock: 45,
      price: 99.99,
      status: 'In Stock',
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      name: 'Office Chair',
      sku: 'OC-002',
      category: 'Furniture',
      stock: 8,
      price: 299.99,
      status: 'Low Stock',
      lastUpdated: '4 hours ago',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      sku: 'LS-003',
      category: 'Accessories',
      stock: 0,
      price: 49.99,
      status: 'Out of Stock',
      lastUpdated: '1 day ago',
    },
    {
      id: 4,
      name: 'Desk Lamp',
      sku: 'DL-004',
      category: 'Lighting',
      stock: 156,
      price: 79.99,
      status: 'In Stock',
      lastUpdated: '3 hours ago',
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      sku: 'BS-005',
      category: 'Electronics',
      stock: 12,
      price: 129.99,
      status: 'Low Stock',
      lastUpdated: '5 hours ago',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: 2847 },
    { id: 'electronics', name: 'Electronics', count: 456 },
    { id: 'furniture', name: 'Furniture', count: 234 },
    { id: 'accessories', name: 'Accessories', count: 789 },
    { id: 'lighting', name: 'Lighting', count: 123 },
    { id: 'office', name: 'Office Supplies', count: 567 },
  ];

  const stockByCategory = {
  series: [{
    name: 'Stock',
    data: [456, 234, 789, 123, 567], // sample from categories
  }],
  options: {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: categories.filter(c => c.id !== 'all').map(c => c.name) },
    colors: ['#059669'],
  }
};

const inventoryTrends = {
  series: [{
    name: 'Total Items',
    data: [2500, 2600, 2700, 2800, 2847], // sample trend
  }],
  options: {
    chart: { type: 'line', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    colors: ['#2563eb'],
  }
};


  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredItems = recentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Inventory Dashboard</h3>
            <p className="text-sm text-bodyGray-500">Manage your inventory and track stock levels</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-5 p-2 ">
              <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
            <Package className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={stat.variant === 'warning' ? 'border-yellow-200' : ''}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bodyGray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-bodyGray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-primary-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ₹{stat.trend === 'up' ? 'text-primary-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-bodyGray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ₹{
                  stat.variant === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-primary-100 text-primary-600'
                }`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Stock by Category</CardTitle>
      <CardDescription>Overview of items stock by category</CardDescription>
    </CardHeader>
    <CardContent>
      <Chart 
        options={stockByCategory.options} 
        series={stockByCategory.series} 
        type="bar" 
        height={300} 
      />
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Inventory Trends</CardTitle>
      <CardDescription>Total items trend over months</CardDescription>
    </CardHeader>
    <CardContent>
      <Chart 
        options={inventoryTrends.options} 
        series={inventoryTrends.series} 
        type="line" 
        height={300} 
      />
    </CardContent>
  </Card>
</div>

 <Card>
    <CardHeader>
      <CardTitle>Vendors Graphs</CardTitle>
      <CardDescription>Total items trend over months</CardDescription>
    </CardHeader>
    <CardContent><ReactApexChart
  type="bar"
  series={[{ data: [150, 120, 100, 80, 60] }]}
  options={{
    xaxis: { categories: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'] },
    colors: ['#60a5fa'],
    plotOptions: { bar: { horizontal: true } }
  }}
  height={250}
/>
  </CardContent>
  </Card>

      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="lg:w-1/3">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse items by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ₹{
                    selectedCategory === category.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'hover:bg-bodyGray-50'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:w-2/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Items</CardTitle>
                <CardDescription>Latest inventory updates</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64 focus:ring-primary-200 border-primary-600 border-2 transition-colors"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-primary-600 text-primary-600 hover:bg-primary-100 active:bg-primary-700 active:scale-98 active:text-boldWhite transtion-colors">
                  <Filter className="w-4 h-4 mr-2 " />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-bodyGray-600">Item</th>
                    <th className="text-left py-3 px-4 font-semibold text-bodyGray-600">SKU</th>
                    <th className="text-left py-3 px-4 font-semibold  text-bodyGray-600">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold  text-bodyGray-600">Price</th>
                    <th className="text-left py-3 px-4 font-semibold  text-bodyGray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold  text-bodyGray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}       className="border-b border-bodyGray-300 h-20 hover:bg-primary-50 transition"
>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-bodyGray-900">{item.name}</p>
                          <p className="text-sm mt-1 text-bodyGray-400">{item.category}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-bodyGray-600">{item.sku}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ₹{
                          item.stock === 0 ? 'text-red-600' : 
                          item.stock < 20 ? 'text-yellow-600' : 'text-primary-600'
                        }`}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-bodyGray-900 font-medium">₹{item.price}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="hover:text-blue-600 hover:scale-105 active:scale-100 transtion-all">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-primary-600 hover:scale-105 active:scale-100 transtion-all">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-red-600 hover:scale-105 active:scale-100 transtion-all">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default InventoryDashboard;