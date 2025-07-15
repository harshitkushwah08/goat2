import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';


export const DeliveryChallans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const challans = [
    {
      id: 1,
      challanNo: 'DC-001',
      customerName: 'John Doe',
      invoiceNo: 'INV-001',
      date: '2024-01-15',
      deliveryDate: '2024-01-16',
      destination: 'Mumbai, Maharashtra',
      items: 5,
      status: 'Delivered',
      vehicleNo: 'MH-01-AB-1234'
    },
    {
      id: 2,
      challanNo: 'DC-002',
      customerName: 'Jane Smith',
      invoiceNo: 'INV-002',
      date: '2024-01-14',
      deliveryDate: '2024-01-15',
      destination: 'Delhi, Delhi',
      items: 3,
      status: 'In Transit',
      vehicleNo: 'DL-02-CD-5678'
    },
    {
      id: 3,
      challanNo: 'DC-003',
      customerName: 'ABC Corp',
      invoiceNo: 'INV-003',
      date: '2024-01-13',
      deliveryDate: '2024-01-14',
      destination: 'Bangalore, Karnataka',
      items: 8,
      status: 'Pending',
      vehicleNo: 'KA-03-EF-9012'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'In Transit':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredChallans = challans.filter(challan => {
    const matchesSearch = challan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challan.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challan.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || challan.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredChallans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChallans = filteredChallans.slice(startIndex, startIndex + itemsPerPage);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Delivery Challans</h3>
            <p className="text-sm text-bodyGray-500">Manage delivery challans and shipments</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Challan
        </Button>

            <Truck className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>        

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Challans</p>
                <p className="text-2xl font-bold text-bodyGray-900">156</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Delivered</p>
                <p className="text-2xl font-bold text-bodyGray-900">89</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">In Transit</p>
                <p className="text-2xl font-bold text-bodyGray-900">45</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Pending</p>
                <p className="text-2xl font-bold text-bodyGray-900">22</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Calendar className="h-6 w-6" />
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
                  placeholder="Search by customer, challan no, or invoice..."
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
                  { value: 'success', label: 'Pending' },
                  { value: 'In Transit', label: 'In Transit' },
                  { value: 'Delivered', label: 'Delivered' },
                  { value: 'Cancelled', label: 'Cancelled' },
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
          <CardTitle>Delivery Challans ({filteredChallans.length})</CardTitle>
          <CardDescription>Track all delivery challans and shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Challan No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Customer</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Invoice No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Delivery Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Destination</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Vehicle No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChallans.map((challan) => (
                  <tr key={challan.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4 font-medium text-bodyGray-900 ">{challan.challanNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{challan.customerName}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{challan.invoiceNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{challan.date}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{challan.deliveryDate}</td>
                    <td className="py-3 px-4 text-bodyGray-600 ">
                      <div className="flex items-center gap-1 ">
                        <MapPin className="w-3 h-3" />
                        {challan.destination}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{challan.vehicleNo}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(challan.status)}>
                        {challan.status}
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

export default DeliveryChallans;