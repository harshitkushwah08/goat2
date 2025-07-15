import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Building,
  Calendar,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';


export const Purchase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const purchases = [
    {
      id: 1,
      purchaseNo: 'PO-001',
      supplierName: 'ABC Suppliers',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 45000,
      status: 'Received',
      items: 5,
      paymentStatus: 'Paid'
    },
    {
      id: 2,
      purchaseNo: 'PO-002',
      supplierName: 'XYZ Trading',
      date: '2024-01-14',
      dueDate: '2024-02-14',
      amount: 32000,
      status: 'Pending',
      items: 3,
      paymentStatus: 'Pending'
    },
    {
      id: 3,
      purchaseNo: 'PO-003',
      supplierName: 'Global Imports',
      date: '2024-01-13',
      dueDate: '2024-02-13',
      amount: 67000,
      status: 'Partial',
      items: 8,
      paymentStatus: 'Partial'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Partial':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Partial':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

     const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Partial", label: "Partial" },
];

const filteredPurchases = purchases.filter(purchase => {
  const matchesSearch = purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       purchase.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = selectedStatus === 'all' || purchase.paymentStatus === selectedStatus;
  return matchesSearch && matchesStatus;
});


  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPurchases = filteredPurchases.slice(startIndex, startIndex + itemsPerPage);

  return (
 <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Purchase</h3>
            <p className="text-sm text-bodyGray-500">Manage supplier purchase orders</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
        <Button className="bg-primary-600 hover:bg-primary-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Bill
        </Button>
            <ShoppingCart className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>       

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Orders</p>
                <p className="text-2xl font-bold text-bodyGray-900">89</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Amount</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹1,44,000</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Pending</p>
                <p className="text-2xl font-bold text-bodyGray-900">23</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Suppliers</p>
                <p className="text-2xl font-bold text-bodyGray-900">15</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search by supplier or purchase order number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
      <DropdownSelectMenu
                         options={statusOptions}
                         selected={selectedStatus}
                         onChange={setSelectedStatus}
                       />              <Button variant="outline" className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Filter className="w-4 h-4 mr-2" />
                 Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders ({filteredPurchases.length})</CardTitle>
          <CardDescription>Manage all purchase orders from suppliers</CardDescription>
        </CardHeader>
        <CardContent>
      <div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
      <tr className="border-b">
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Invoice No.</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Purchase Type</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Date</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Vendor Name</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Amount</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Due Date</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Items</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Payment Status</th>
        <th className="text-left py-3 px-4 font-medium text-bodyGray-600">Actions</th>
      </tr>
    </thead>
    <tbody>
      {paginatedPurchases.map((purchase) => (
        <tr key={purchase.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
          <td className="py-3 px-4 font-medium text-bodyGray-900">{purchase.purchaseNo}</td>
 <td className="py-3 px-4">
            <Badge variant={purchase.isUploaded ? 'secondary' : 'primary'}>
              {purchase.isUploaded ? 'Uploaded Bill' : 'Created'}
            </Badge>
          </td>          <td className="py-3 px-4 text-bodyGray-600">{purchase.date}</td>
          <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{purchase.supplierName}</td>
          <td className="py-3 px-4 font-medium text-bodyGray-900 truncate max-w-[120px]">₹{purchase.amount.toLocaleString()}</td>
          <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{purchase.dueDate}</td>
          <td className="py-3 px-4 text-bodyGray-600">{purchase.items}</td>
          <td className="py-3 px-4">
            <Badge variant={getPaymentStatusColor(purchase.paymentStatus)}>
              {purchase.paymentStatus}
            </Badge>
          </td>
      
          <td className="py-3 px-4">
            <div className="flex items-center gap-2">
         <Tooltip text="View">
                     <Button variant="ghost" size="sm" className="hover:text-blue-600 active:scale-95 transition-all">
                       <Eye className="w-4 h-4" />
                     </Button>
                   </Tooltip>
                   <Tooltip text="Download">
                     <Button variant="ghost" size="sm" className="hover:text-blue-700 hover:bg-blue-200 active:scale-95 transition-all">
                       <Download className="w-4 h-4" />
                     </Button>
                   </Tooltip>
                   <Tooltip text="Edit">
                     <Button variant="ghost" size="sm" className="hover:text-primary-600 active:scale-95 transition-all">
                       <Edit className="w-4 h-4" />
                     </Button>
                   </Tooltip>
                   <Tooltip text="Delete">
                     <Button variant="ghost" size="sm" className="hover:text-red-600 active:scale-95 transition-all">
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   </Tooltip>
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
  );
};

export default Purchase;