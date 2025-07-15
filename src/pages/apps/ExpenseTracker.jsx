import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  TrendingUp,
  TrendingDown,
  PieChart,
  IndianRupee
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';



export const ExpenseTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const expenses = [
    {
      id: 1,
      description: 'Office Rent',
      amount: 25000,
      category: 'Office',
      date: '2024-01-15',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      receipt: 'RCP-001'
    },
    {
      id: 2,
      description: 'Marketing Campaign',
      amount: 15000,
      category: 'Marketing',
      date: '2024-01-14',
      paymentMethod: 'Credit Card',
      status: 'Paid',
      receipt: 'RCP-002'
    },
    {
      id: 3,
      description: 'Software License',
      amount: 8000,
      category: 'Technology',
      date: '2024-01-13',
      paymentMethod: 'Bank Transfer',
      status: 'Pending',
      receipt: 'RCP-003'
    },
    {
      id: 4,
      description: 'Travel Expenses',
      amount: 12000,
      category: 'Travel',
      date: '2024-01-12',
      paymentMethod: 'Cash',
      status: 'Paid',
      receipt: 'RCP-004'
    },
    {
      id: 5,
      description: 'Office Supplies',
      amount: 3500,
      category: 'Office',
      date: '2024-01-11',
      paymentMethod: 'Credit Card',
      status: 'Paid',
      receipt: 'RCP-005'
    }
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

    const categories = ['all', 'Office', 'Marketing', 'Technology', 'Travel', 'Utilities', 'Meals'];


  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.receipt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses.filter(expense => 
    new Date(expense.date).getMonth() === new Date().getMonth()
  ).reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(expense => expense.status === 'Pending').length;

  return (
<div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Expense Tracker</h3>
            <p className="text-sm text-bodyGray-500">Track and manage business expenses</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
            <IndianRupee className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>         

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹{totalExpenses.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-sm text-red-500">+12% vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <IndianRupee className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">This Month</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹{thisMonthExpenses.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-sm text-green-500">-5% vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Pending</p>
                <p className="text-2xl font-bold text-bodyGray-900">{pendingExpenses}</p>
                <p className="text-sm text-bodyGray-500 mt-1">Awaiting approval</p>
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
                <p className="text-sm font-medium text-bodyGray-600">Categories</p>
                <p className="text-2xl font-bold text-bodyGray-900">{categories.length - 1}</p>
                <p className="text-sm text-bodyGray-500 mt-1">Active categories</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <PieChart className="h-6 w-6" />
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
                  placeholder="Search by description or receipt number..."
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
                    { value: 'Office', label: 'Office' },
                     { value: 'Marketing', label: 'Marketing' },
                    { value: 'Technology', label: 'Technology' },
                    { value: 'Travel', label: 'Travel' },
                    { value: 'Utilities', label: 'Utilities' },
                    { value: 'Meals', label: 'Meals' },
                                            ]}
                                            selected={selectedCategory}
                                            onChange={setSelectedCategory}
                                          />
              <Button variant="outline" className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses ({filteredExpenses.length})</CardTitle>
          <CardDescription>Track all business expenses and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Description</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Amount</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Category</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Payment Method</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Receipt</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.map((expense) => (
                  <tr key={expense.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4 font-medium text-bodyGray-900 truncate max-w-[120px]">{expense.description}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900">₹{expense.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{expense.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600">{expense.date}</td>
                    <td className="py-3 px-4 text-bodyGray-600  truncate max-w-[100px]">{expense.paymentMethod}</td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{expense.receipt}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(expense.status)}>
                        {expense.status}
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

export default ExpenseTracker;