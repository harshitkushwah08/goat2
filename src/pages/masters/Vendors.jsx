import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
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

export const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const vendors = [
    {
      id: 1,
      name: 'ABC Suppliers',
      contactPerson: 'John Smith',
      email: 'john@abcsuppliers.com',
      phone: '+91 9876543210',
      address: 'Mumbai, Maharashtra',
      gstin: '27AABCS1234Z1ZX',
      status: 'Active',
      totalOrders: 25,
      totalValue: 245000,
      lastOrder: '2024-01-15'
    },
    {
      id: 2,
      name: 'XYZ Trading',
      contactPerson: 'Jane Wilson',
      email: 'jane@xyztrading.com',
      phone: '+91 9876543211',
      address: 'Delhi, Delhi',
      gstin: '07AABCX5678Y1Z5',
      status: 'Active',
      totalOrders: 18,
      totalValue: 189000,
      lastOrder: '2024-01-14'
    },
    {
      id: 3,
      name: 'Global Imports',
      contactPerson: 'Mike Brown',
      email: 'mike@globalimports.com',
      phone: '+91 9876543212',
      address: 'Bangalore, Karnataka',
      gstin: '29AABCG9012Z1ZP',
      status: 'Inactive',
      totalOrders: 5,
      totalValue: 67000,
      lastOrder: '2023-12-20'
    }
  ];

  
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },

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

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Vendors</h3>
            <p className="text-sm text-bodyGray-500">Manage your vendor and supplier database</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
         <Button className="bg-primary-600 hover:bg-primary-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Bulk
        </Button>
            <Building className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>       

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-bodyGray-900">48</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Active</p>
                <p className="text-2xl font-bold text-bodyGray-900">42</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Orders</p>
                <p className="text-2xl font-bold text-bodyGray-900">356</p>
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
                <p className="text-2xl font-bold text-bodyGray-900">₹32.5L</p>
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
                  placeholder="Search by name, contact person, email, or GSTIN..."
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
          <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
          <CardDescription>Manage your vendor and supplier database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Vendor</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Contact</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">GSTIN</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Location</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Orders</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Total Value</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Last Order</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVendors.map((vendor) => (
                  <tr key={vendor.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-bodyGray-900 truncate max-w-[100px]">{vendor.name}</p>
                        <p className="text-sm text-bodyGray-500">{vendor.contactPerson}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-bodyGray-400" />
                          <span className="text-bodyGray-600 truncate max-w-[120px]">{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-bodyGray-400" />
                          <span className="text-bodyGray-600 truncate max-w-[100px]">{vendor.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{vendor.gstin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-bodyGray-400" />
                        <span className="text-bodyGray-600 truncate max-w-[120px]">{vendor.address}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600">{vendor.totalOrders}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900">₹{vendor.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{vendor.lastOrder}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(vendor.status)}>
                        {vendor.status}
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

export default Vendors;