import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';


export const PaymentsReceipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const payments = [
    {
      id: 1,
      receiptNo: 'RCP-001',
      customerName: 'John Doe',
      invoiceNo: 'INV-001',
      amount: 15000,
      paymentMethod: 'Bank Transfer',
      paymentDate: '2024-01-15',
      status: 'Completed',
      reference: 'TXN123456789'
    },
    {
      id: 2,
      receiptNo: 'RCP-002',
      customerName: 'Jane Smith',
      invoiceNo: 'INV-002',
      amount: 25000,
      paymentMethod: 'Cash',
      paymentDate: '2024-01-14',
      status: 'Completed',
      reference: 'CASH001'
    },
    {
      id: 3,
      receiptNo: 'RCP-003',
      customerName: 'ABC Corp',
      invoiceNo: 'INV-003',
      amount: 50000,
      paymentMethod: 'Cheque',
      paymentDate: '2024-01-13',
      status: 'Pending',
      reference: 'CHQ789012'
    }
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
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
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
            <h3 className="text-lg font-semibold text-bodyGray-900">Payment Receipts</h3>
            <p className="text-sm text-bodyGray-500">Manage customer payment receipts</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
            <Receipt className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>           
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Received</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹90,000</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Receipt className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Pending</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹50,000</p>
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
                <p className="text-2xl font-bold text-bodyGray-900">₹75,000</p>
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
                <p className="text-sm font-medium text-bodyGray-600">Total Receipts</p>
                <p className="text-2xl font-bold text-bodyGray-900">156</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <User className="h-6 w-6" />
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
                  placeholder="Search by customer, receipt no, or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
                    <DropdownSelectMenu
                                            options={[
                                              { value: 'all', label: 'All Status' },
                                              { value: 'Completed', label: 'Completed' },
                                              { value: 'Pending', label: 'Pending' },
                                              { value: 'Failed', label: 'Failed' },
                                            ]}
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
          <CardTitle>Payment Receipts ({filteredPayments.length})</CardTitle>
          <CardDescription>Track all customer payments and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Receipt No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Customer</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Invoice No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Amount</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Payment Method</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment) => (
                  <tr key={payment.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4 font-medium text-bodyGray-900 ">{payment.receiptNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{payment.customerName}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{payment.invoiceNo}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900 truncate max-w-[100px]">₹{payment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{payment.paymentMethod}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{payment.paymentDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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
  );
};

export default PaymentsReceipts;