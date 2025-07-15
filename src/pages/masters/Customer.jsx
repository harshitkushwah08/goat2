import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';

export const Customer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

    
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },

];

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      company: 'ABC Corp',
      email: 'john.doe@abccorp.com',
      phone: '+91 9876543210',
      address: 'Mumbai, Maharashtra',
      gstin: '27AABCU9603R1ZX',
      status: 'Active',
      totalOrders: 15,
      totalValue: 125000,
      lastOrder: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      company: 'XYZ Ltd',
      email: 'jane.smith@xyzltd.com',
      phone: '+91 9876543211',
      address: 'Delhi, Delhi',
      gstin: '07AAACX9123F1Z5',
      status: 'Active',
      totalOrders: 8,
      totalValue: 89000,
      lastOrder: '2024-01-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      company: 'Global Traders',
      email: 'mike.j@globaltraders.com',
      phone: '+91 9876543212',
      address: 'Bangalore, Karnataka',
      gstin: '29AADCG4567B1ZP',
      status: 'Inactive',
      totalOrders: 3,
      totalValue: 45000,
      lastOrder: '2023-12-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Customers</h3>
            <p className="text-sm text-bodyGray-500">Manage your customer database</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
         <Button className="bg-primary-600 hover:bg-primary-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Bulk
        </Button>
            <Users className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Customers</p>
                <p className="text-2xl font-bold text-bodyGray-900">156</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Active</p>
                <p className="text-2xl font-bold text-bodyGray-900">134</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Orders</p>
                <p className="text-2xl font-bold text-bodyGray-900">1,245</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
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
                <p className="text-2xl font-bold text-bodyGray-900">₹45.2L</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FileText className="h-6 w-6" />
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
                  placeholder="Search by name, company, email, or GSTIN..."
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
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
          <CardDescription>Manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3  text-bodyGray-500">Customer</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Contact</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">GSTIN</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Location</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Orders</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Total Value</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Last Order</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4">
                      <div >
                        <p className="font-medium text-bodyGray-900 truncate max-w-[100px]">{customer.name}</p>
                        <p className="text-sm text-bodyGray-500">{customer.company}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-bodyGray-400" />
                          <span className="text-bodyGray-600 truncate max-w-[120px]">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-bodyGray-400" />
                          <span className="text-bodyGray-600 truncate max-w-[100px]">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{customer.gstin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-bodyGray-400" />
                        <span className="text-bodyGray-600 truncate max-w-[120px]">{customer.address}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600">{customer.totalOrders}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900">₹{customer.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-bodyGray-600 ">{customer.lastOrder}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                         <div className="flex items-center gap-2">
                                              <Tooltip text="View">
                                              <Button variant="ghost" size="sm" className="hover:text-blue-600 active:scale-95 transition-all">
                                              <Eye className="w-4 h-4" />
                                            </Button>
                                            </Tooltip>
                                                                  
                                                  <Tooltip text="Edit">
                      
                                                                    <Button variant="ghost" size="sm" className="hover:text-primary-600 active:scale-95 transition-all">
                                                                     <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                    </Tooltip>
                                                                                            <Tooltip text="Delete">
                      
                                                                    <Button  variant="ghost" size="sm" className="hover:text-red-600 active:scale-95 transition-all">
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

export default Customer;