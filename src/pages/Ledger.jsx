import React, { useState } from 'react';
import { FileText, User, Building, Banknote, Layers, Eye, Edit, Mail, Plus, Repeat,BookOpen,Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import Tooltip from '../components/ui/toolTip';
import { Badge } from '../components/ui/badge';


export const Ledger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('debtors');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tabs = [
    { id: 'debtors', name: 'Debtors (Customers)', icon: <User className="mr-2 w-4 h-4" /> },
    { id: 'creditors', name: 'Creditors (Vendors)', icon: <Building className="mr-2 w-4 h-4" /> },
    { id: 'cash', name: 'Cash & Banks', icon: <Banknote className="mr-2 w-4 h-4" /> },
    { id: 'other', name: 'Other Accounts', icon: <Layers className="mr-2 w-4 h-4" /> },
  ];

  const getGstBadgeColor = (gstType) => {
  switch (gstType.toLowerCase()) {
    case 'registered':
    case 'registered business':
      return 'success';      // usually green
    case 'unregistered':
      return 'secondary';    // usually gray
    case 'consumer':
      return 'destructive';  // usually red
    default:
      return 'secondary';
  }
};

const getTypeBadgeColor = (type) => {
  switch (type.toLowerCase()) {
    case 'expense':
      return 'warning';      // e.g., yellow/orange
    case 'bank':
    case 'cash':
      return 'success';     // green
    default:
      return 'secondary';   // gray
  }
};


const getBalanceBadgeColor = (balanceType) => {
  switch (balanceType.toLowerCase()) {
    case 'receivable':
      return 'success';     // green
    case 'payable':
      return 'destructive'; // red
    default:
      return 'secondary';   // gray
  }
};


  const data = {
    debtors: [
      { id: 1, name: 'Alpha Corp', phone: '9876543210', city: 'Delhi', gstType: 'Registered', gstin: '07AAAAA0000A1Z5', balance: 15000, balanceType: 'Receivable' },
      { id: 2, name: 'Beta Traders', phone: '9123456780', city: 'Mumbai', gstType: 'Unregistered', gstin: '', balance: 8000, balanceType: 'Receivable' },
    ],
    creditors: [
      { id: 1, name: 'Gamma Supplies', phone: '9988776655', city: 'Pune', gstType: 'Registered', gstin: '27BBBBB1111B2Z6', balance: 12000, balanceType: 'Payable' },
      { id: 2, name: 'Delta Wholesale', phone: '9090909090', city: 'Chennai', gstType: 'Registered', gstin: '33CCCCC2222C3Z7', balance: 5000, balanceType: 'Payable' },
    ],
    cash: [
      { id: 1, accountName: 'Cash in Hand', type: 'Cash', description: 'Main office cash', balance: 7000 },
      { id: 2, accountName: 'ICICI Bank', type: 'Bank', description: 'Current Account', balance: 25000 },
    ],
    other: [
      { id: 1, accountName: 'Office Rent', type: 'Expense', description: 'Monthly rent', balance: 12000 },
      { id: 2, accountName: 'Internet Charges', type: 'Expense', description: 'Broadband bill', balance: 2000 },
    ],
  };

  const filteredData = (data[selectedTab] || []).filter(item =>
    (item.name || item.accountName).toLowerCase().includes(searchTerm.toLowerCase())
    || (item.gstin && item.gstin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Add button text based on tab
  const addButtonText = {
    debtors: 'Add Customer',
    creditors: 'Add Vendor',
    cash: 'Add Bank/Cash',
    other: 'Add Expense',
  }[selectedTab];

  return (
<div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Ledger</h3>
          <p className="text-sm text-bodyGray-500">View and track all financial transactions</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
          
            <BookOpen className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>          
  

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left py-3 px-3 text-bodyGray-500">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            onClick={() => { setSelectedTab(tab.id); setCurrentPage(1); }}
            variant={selectedTab === tab.id ? 'default' : 'outline'}
            className={selectedTab === tab.id ? 'justify-start bg-primary-600' : 'justify-start border-bodyGray-200 text-bodyGray-500'}
          >
            {tab.icon}
            {tab.name}
          </Button>
        ))}
      </div>

<Card>
        <CardContent className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-96 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-300"
        />
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {addButtonText}
          </Button>
          {(selectedTab === 'cash') && (
            <>
          <Button variant="outline" className="gap-2 text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Plus className="w-4 h-4" />
                Adjust Balance
              </Button>
          <Button variant="outline" className="gap-2 text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Repeat className="w-4 h-4" />
                Contra Entry
              </Button>
            </>
          )}
          <Button variant="outline" className="gap-2 text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
          <Button variant="outline" className="gap-2 text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
            <FileText className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
      </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accounts ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
              {selectedTab === 'debtors' || selectedTab === 'creditors' ? (
                <tr>
                  <th className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">Company Name</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">Phone</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">City</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">GST Type</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">GSTIN</th>
                <th className="text-left py-3 px-3 text-bodyGray-500">Type</th>
              <th className="text-left py-3 px-3 text-bodyGray-500">Balance</th>                  
              <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              ) : (
                <tr>
                  <th className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">Account Name</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Type</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">Description</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Balance</th>                  
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {paginatedData.map(item => (
                <tr key={item.id} className="border-b hover:bg-primary-50">
                  {selectedTab === 'debtors' || selectedTab === 'creditors' ? (
                    <>
                      <td className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px] font-medium">{item.name}</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">{item.phone}</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500 truncate max-w-[120px]">{item.city}</td>
  <td className="px-4">
            <Badge variant={getGstBadgeColor(item.gstType)}>
              {item.gstType || 'N/A'}
            </Badge>
          </td>                      <td className="text-left py-3 px-3 text-bodyGray-500 font-mono text-xs">{item.gstin || '-'}</td>
                     <td className="text-left py-3 px-3 text-bodyGray-500">
  <Badge variant={getBalanceBadgeColor(item.balanceType)}>
    {item.balanceType}
  </Badge>
</td>
<td className="text-left py-3 px-3 text-bodyGray-500 font-medium">
  ₹{item.balance.toLocaleString('en-IN')}
</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500">
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
                    </>
                  ) : (
                    <>
                      <td className="text-left py-3 px-3 text-bodyGray-500 py-3 font-medium">{item.accountName}</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500">    <Badge variant={getTypeBadgeColor(item.type)}>{item.type}</Badge></td>
                      <td className="text-left py-3 px-3 text-bodyGray-500">{item.description}</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500 font-medium ">₹{item.balance.toLocaleString('en-IN')}</td>
                      <td className="text-left py-3 px-3 text-bodyGray-500">
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
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >Previous</Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => setCurrentPage(page)}
            >{page}</Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >Next</Button>
        </div>
      )}
    </div>
  );
};

export default Ledger;
