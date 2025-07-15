import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Building,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';

export const PaymentsMade = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

const payments = [
  {
    id: 1,
    paymentNo: 'PM-001',
    supplierName: 'ABC Suppliers',
    totalAmount: 45000,
    advanceAmount: 15000,
    pendingAmount: 30000,  // 45000 - 15000
    paymentMethod: 'Bank Transfer',
    paymentDate: '2024-01-15',
    status: 'Completed',
    reference: 'TXN987654321'
  },
  {
    id: 2,
    paymentNo: 'PM-002',
    supplierName: 'XYZ Trading',
    totalAmount: 32000,
    advanceAmount: 10000,
    pendingAmount: 22000,  // 32000 - 10000
    paymentMethod: 'Cheque',
    paymentDate: '2024-01-14',
    status: 'Pending',
    reference: 'CHQ456789'
  },
  {
    id: 3,
    paymentNo: 'PM-003',
    supplierName: 'Global Imports',
    totalAmount: 67000,
    advanceAmount: 25000,
    pendingAmount: 42000,  // 67000 - 25000
    paymentMethod: 'Cash',
    paymentDate: '2024-01-13',
    status: 'Completed',
    reference: 'CASH002'
  }
];


 const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Completed", label: "Completed" },
  { value: "Pending", label: "Pending" },
  { value: "Failed", label: "Failed" },
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.paymentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
 <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Payments Made</h3>
            <p className="text-sm text-bodyGray-500">Track payments made to suppliers</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
            <CreditCard className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>           

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Paid</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹1,44,000</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Pending</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹32,000</p>
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
                <p className="text-sm font-medium text-bodyGray-600">This Month</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹89,000</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <CreditCard className="h-6 w-6" />
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
              <div className="p-3 rounded-full bg-green-100 text-green-600">
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
                  placeholder="Search by supplier, payment no, or purchase order..."
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

      <Card>
        <CardHeader>
          <CardTitle>Payments Made ({filteredPayments.length})</CardTitle>
          <CardDescription>Track all payments made to suppliers</CardDescription>
        </CardHeader>
        <CardContent>
       <div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
      <tr className="border-b">
        <th className="text-left py-3 px-3 text-bodyGray-500">Sr No.</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Supplier</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Total Amount</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Advance Amount</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Pending Amount</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Payment Method</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Reference</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
        <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
      </tr>
    </thead>
    <tbody>
      {paginatedPayments.map((payment) => (
        <tr key={payment.id}                   className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">

          <td className="py-3 px-4 font-medium text-bodyGray-900">{payment.paymentNo}</td>
          <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{payment.supplierName}</td>
          <td className="py-3 px-4 font-medium text-bodyGray-900">₹{payment.totalAmount.toLocaleString()}</td>
          <td className="py-3 px-4 font-medium text-green-600">₹{payment.advanceAmount.toLocaleString()}</td>
          <td className="py-3 px-4 font-medium text-red-600">₹{payment.pendingAmount.toLocaleString()}</td>
          <td className="py-3 px-4 text-bodyGray-600">{payment.paymentMethod}</td>
          <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{payment.paymentDate}</td>
          <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{payment.reference}</td>
          <td className="py-3 px-4">
            <Badge variant={getStatusColor(payment.status)}>
              {payment.status}
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

export default PaymentsMade;