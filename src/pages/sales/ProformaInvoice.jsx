import  { useState } from 'react';
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
  Copy
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';


export const ProformaInvoice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const proformaInvoices = [
    {
      id: 1,
      proformaNo: 'PI-001',
      customerName: 'John Doe',
      date: '2024-01-15',
      validUntil: '2024-02-15',
      amount: 25000,
      status: 'Sent',
      items: 5
    },
    {
      id: 2,
      proformaNo: 'PI-002',
      customerName: 'Jane Smith',
      date: '2024-01-14',
      validUntil: '2024-02-14',
      amount: 35000,
      status: 'Accepted',
      items: 3
    },
    {
      id: 3,
      proformaNo: 'PI-003',
      customerName: 'ABC Corp',
      date: '2024-01-13',
      validUntil: '2024-02-13',
      amount: 50000,
      status: 'Draft',
      items: 8
    },
    {
      id: 4,
      proformaNo: 'PI-004',
      customerName: 'XYZ Ltd',
      date: '2024-01-12',
      validUntil: '2024-02-12',
      amount: 15000,
      status: 'Expired',
      items: 2
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent':
        return 'secondary';
      case 'Accepted':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Expired':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredInvoices = proformaInvoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.proformaNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Proforma Invoice</h3>
            <p className="text-sm text-bodyGray-500">Create and manage proforma invoices</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Proforma
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
                <p className="text-sm font-medium text-bodyGray-600">Total Proformas</p>
                <p className="text-2xl font-bold text-bodyGray-900">24</p>
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
                <p className="text-sm font-medium text-bodyGray-600">Accepted</p>
                <p className="text-2xl font-bold text-bodyGray-900">8</p>
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
                <p className="text-2xl font-bold text-bodyGray-900">12</p>
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
                <p className="text-sm font-medium text-bodyGray-600">Total Value</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹1,25,000</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
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
                  placeholder="Search by customer or proforma number..."
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
                                { value: 'Draft', label: 'Draft' },
                                { value: 'Sent', label: 'Sent' },
                                { value: 'Accepted', label: 'Accepted' },
                                { value: 'Expired', label: 'Expired' },
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
          <CardTitle>Proforma Invoices ({filteredInvoices.length})</CardTitle>
          <CardDescription>Manage all proforma invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Proforma No</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Customer</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Valid Until</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Items</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Amount</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4 font-medium text-bodyGray-900">{invoice.proformaNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{invoice.customerName}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{invoice.date}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{invoice.validUntil}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{invoice.items}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900">₹{invoice.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status}
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

export default ProformaInvoice;