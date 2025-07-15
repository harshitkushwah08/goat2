import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  Copy,
  Building
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';


export const PurchaseOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const purchaseOrders = [
    {
      id: 1,
      orderNo: 'PO-001',
      supplierName: 'ABC Suppliers',
      date: '2024-01-15',
      deliveryDate: '2024-01-25',
      amount: 45000,
      status: 'Sent',
      items: 5,
      terms: 'Net 30'
    },
    {
      id: 2,
      orderNo: 'PO-002',
      supplierName: 'XYZ Trading',
      date: '2024-01-14',
      deliveryDate: '2024-01-24',
      amount: 32000,
      status: 'Confirmed',
      items: 3,
      terms: 'Net 15'
    },
    {
      id: 3,
      orderNo: 'PO-003',
      supplierName: 'Global Imports',
      date: '2024-01-13',
      deliveryDate: '2024-01-23',
      amount: 67000,
      status: 'Draft',
      items: 8,
      terms: 'Net 45'
    },
    {
      id: 4,
      orderNo: 'PO-004',
      supplierName: 'Tech Solutions',
      date: '2024-01-12',
      deliveryDate: '2024-01-22',
      amount: 25000,
      status: 'Delivered',
      items: 2,
      terms: 'Net 30'
    }
  ];

   const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Draft", label: "Sent" },
  { value: "Sent", label: "Sent" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent':
        return 'secondary';
      case 'Confirmed':
        return 'success';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
 <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Purchase Orders</h3>
            <p className="text-sm text-bodyGray-500">Create and manage purchase orders</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Purchase Order
        </Button>
            <FileText className="h-6 w-6 text-bodyGray-800 " />
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
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Value</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹1,69,000</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
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
                <FileText className="h-6 w-6" />
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
                  placeholder="Search by supplier or order number..."
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
                       />
              <Button variant="outline" className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>Manage all purchase orders to suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
    <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Order No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Supplier</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Delivery Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Items</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Amount</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id}
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">

                    <td className="py-3 px-4 font-medium text-bodyGray-900">{order.orderNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{order.supplierName}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{order.date}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{order.deliveryDate}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{order.items}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900 truncate max-w-[120px]">₹{order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                   <Tooltip text="View">
                               <Button variant="ghost" size="sm" className="hover:text-blue-600 active:scale-95 transition-all">
                                 <Eye className="w-4 h-4" />
                               </Button>
                             </Tooltip>
                             <Tooltip text="Send">
                               <Button variant="ghost" size="sm" className="hover:text-bodyGray-600 active:scale-95 transition-all">
                                 <Send className="w-4 h-4" />
                               </Button>
                             </Tooltip>  
                             <Tooltip text="Copy">
                               <Button variant="ghost" size="sm" className="hover:text-primary-700 active:scale-95 transition-all">
                                 <Copy className="w-4 h-4" />
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

export default PurchaseOrder;