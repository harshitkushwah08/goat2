import React, { useState } from 'react';
import { 
  BarChart, 
  Download, 
  Search, 

  TrendingUp,
  RefreshCw,
  ShoppingCart,
  Users,
  Receipt,
  FileSpreadsheet,
  Package,
  Truck,
  FileOutput,
  FileInput,
  Percent,
  Database,
  History
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DateRangePickerButton } from '../components/dateInput';

export const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reportCategories = [
    { id: 'all', name: 'All Reports' },
    { id: 'sales', name: 'Sales Reports' },
    { id: 'purchase', name: 'Purchase Reports' },
    { id: 'gst', name: 'GST Reports' },
    { id: 'inventory', name: 'Inventory Reports' },
    { id: 'finance', name: 'Finance Reports' },
  ];

  const reports = [
    // Sales Reports
    {
      id: 1,
      name: 'Product Wise Sales Report',
      description: 'Sales analysis by product',
      category: 'sales',
      lastRun: '2024-01-15',
      format: 'PDF, Excel',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      id: 2,
      name: 'Party Wise Sales Report',
      description: 'Sales analysis by customer',
      category: 'sales',
      lastRun: '2024-01-14',
      format: 'PDF, Excel',
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 3,
      name: 'Invoice Details Report',
      description: 'Detailed report of all invoices',
      category: 'sales',
      lastRun: '2024-01-13',
      format: 'PDF, Excel',
      icon: <Receipt className="h-6 w-6" />
    },
    
    // Purchase Reports
    {
      id: 4,
      name: 'Product Wise Purchase Report',
      description: 'Purchase analysis by product',
      category: 'purchase',
      lastRun: '2024-01-12',
      format: 'PDF, Excel',
      icon: <Package className="h-6 w-6" />
    },
    {
      id: 5,
      name: 'Party Wise Purchase Report',
      description: 'Purchase analysis by vendor',
      category: 'purchase',
      lastRun: '2024-01-11',
      format: 'PDF, Excel',
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 6,
      name: 'Purchase Details Report',
      description: 'Detailed report of all purchases',
      category: 'purchase',
      lastRun: '2024-01-10',
      format: 'PDF, Excel',
      icon: <FileInput className="h-6 w-6" />
    },
    
    // GST Reports
    {
      id: 7,
      name: 'GST Sales Report',
      description: 'GST collected on sales',
      category: 'gst',
      lastRun: '2024-01-09',
      format: 'PDF, Excel',
      icon: <FileOutput className="h-6 w-6" />
    },
    {
      id: 8,
      name: 'GST Purchase Report',
      description: 'GST paid on purchases',
      category: 'gst',
      lastRun: '2024-01-08',
      format: 'PDF, Excel',
      icon: <FileInput className="h-6 w-6" />
    },
    {
      id: 9,
      name: 'GSTR-1',
      description: 'GST outward supplies return',
      category: 'gst',
      lastRun: '2024-01-07',
      format: 'PDF, Excel, JSON',
      icon: <Percent className="h-6 w-6" />
    },
    {
      id: 10,
      name: 'GSTR-2',
      description: 'GST inward supplies return',
      category: 'gst',
      lastRun: '2024-01-06',
      format: 'PDF, Excel, JSON',
      icon: <Percent className="h-6 w-6" />
    },
    {
      id: 11,
      name: 'HSN Sales Report',
      description: 'Sales grouped by HSN codes',
      category: 'gst',
      lastRun: '2024-01-05',
      format: 'PDF, Excel',
      icon: <FileSpreadsheet className="h-6 w-6" />
    },
    
    // Inventory Reports
    {
      id: 12,
      name: 'Current Stock Report',
      description: 'Current inventory levels',
      category: 'inventory',
      lastRun: '2024-01-04',
      format: 'PDF, Excel',
      icon: <Database className="h-6 w-6" />
    },
    
    // Delivery Reports
    {
      id: 13,
      name: 'Delivery Challan Report',
      description: 'Summary of delivery challans',
      category: 'sales',
      lastRun: '2024-01-03',
      format: 'PDF, Excel',
      icon: <Truck className="h-6 w-6" />
    },
    {
      id: 14,
      name: 'Delivery Challan Details Report',
      description: 'Detailed report of delivery challans',
      category: 'sales',
      lastRun: '2024-01-02',
      format: 'PDF, Excel',
      icon: <Truck className="h-6 w-6" />
    },
    
    {
      id: 15,
      name: 'TDS Summary Payable',
      description: 'TDS payable summary',
      category: 'finance',
      lastRun: '2024-01-01',
      format: 'PDF, Excel',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      id: 16,
      name: 'TDS Summary Receivable',
      description: 'TDS receivable summary',
      category: 'finance',
      lastRun: '2023-12-31',
      format: 'PDF, Excel',
      icon: <TrendingUp className="h-6 w-6" />
    },
    
    {
      id: 17,
      name: 'Bulk Export',
      description: 'Export multiple reports at once',
      category: 'sales',
      lastRun: '2023-12-30',
      format: 'ZIP',
      icon: <Download className="h-6 w-6" />
    },
    {
      id: 18,
      name: 'Audit Trail',
      description: 'System activity log for auditing',
      category: 'finance',
      lastRun: '2023-12-29',
      format: 'PDF, Excel',
      icon: <History className="h-6 w-6" />
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'sales':
        return 'bg-blue-100 text-blue-600';
      case 'purchase':
        return 'bg-green-100 text-green-600';
      case 'gst':
        return 'bg-purple-100 text-purple-600';
      case 'inventory':
        return 'bg-orange-100 text-orange-600';
      case 'finance':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-bodyGray-100 text-bodyGray-600';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRunReport = (id) => {
    console.log('Running report:', id);
  };

  const handleDownloadReport = (id, format) => {
    console.log('Downloading report:', id, 'in format:', format);
  };

  return (
  <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Reports</h3>
            <p className="text-sm text-bodyGray-500">Generate and view business reports</p>
          </div>
          <div className="rounded-lg bg-boldWhite p-2 ">
            <BarChart className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>      


          <div className="flex flex-col lg:flex-row gap-4 my-5">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div>
          <DateRangePickerButton />
            </div>
          </div>

      <div className="flex flex-wrap gap-4">
        {reportCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={selectedCategory === category.id ? "bg-primary-600 transition-colors" : "text-bodyGray-500 border-bodyGray-200 hover:bg-primary-50"}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md border-bodyGray-200 transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${getCategoryColor(report.category)}`}>
                  {report.icon}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-bodyGray-500">Last run: {report.lastRun}</span>
                </div>
              </div>
              <CardTitle className="mt-3">{report.name}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                    {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                  </span>
                  <span className="text-xs text-bodyGray-500">
                    Available formats: {report.format}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
              <Button 
   
  className="group flex-1 text-boldWhite hover:bg-primary-600 transition cursor-pointer active:scale-98"
  onClick={() => handleRunReport(report.id)}
>
  <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" />
  Run
</Button>

                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
            <p className="text-bodyGray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No reports found matching your criteria' 
                : 'No reports available'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;