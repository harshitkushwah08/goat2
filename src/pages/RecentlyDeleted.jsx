import React, { useState } from 'react';
import { 
  Trash2, 
  RotateCcw, 
  Search, 
  Filter, 
  AlertTriangle,
  FileText,
  Package,
  Users,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export const RecentlyDeleted = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const deletedItems = [
    {
      id: 1,
      name: 'Invoice INV-001',
      type: 'Invoice',
      deletedDate: '2024-01-15',
      deletedBy: 'John Doe',
      size: '2.4 KB',
      daysLeft: 12,
      originalLocation: '/sales/invoices'
    },
    {
      id: 2,
      name: 'Product - Wireless Headphones',
      type: 'Product',
      deletedDate: '2024-01-14',
      deletedBy: 'Jane Smith',
      size: '1.8 KB',
      daysLeft: 11,
      originalLocation: '/inventory/items'
    },
    {
      id: 3,
      name: 'Customer - ABC Corp',
      type: 'Customer',
      deletedDate: '2024-01-13',
      deletedBy: 'Mike Johnson',
      size: '1.2 KB',
      daysLeft: 10,
      originalLocation: '/masters/customers'
    },
    {
      id: 4,
      name: 'Purchase Order PO-005',
      type: 'Purchase Order',
      deletedDate: '2024-01-12',
      deletedBy: 'Sarah Wilson',
      size: '3.1 KB',
      daysLeft: 9,
      originalLocation: '/purchases/orders'
    },
    {
      id: 5,
      name: 'Expense - Office Supplies',
      type: 'Expense',
      deletedDate: '2024-01-11',
      deletedBy: 'Tom Brown',
      size: '0.9 KB',
      daysLeft: 8,
      originalLocation: '/apps/expenses'
    }
  ];

  const itemTypes = ['all', 'Invoice', 'Product', 'Customer', 'Purchase Order', 'Expense'];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Invoice':
        return <FileText className="w-4 h-4" />;
      case 'Product':
        return <Package className="w-4 h-4" />;
      case 'Customer':
        return <Users className="w-4 h-4" />;
      case 'Purchase Order':
        return <FileText className="w-4 h-4" />;
      case 'Expense':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Invoice':
        return 'bg-blue-100 text-blue-600';
      case 'Product':
        return 'bg-green-100 text-green-600';
      case 'Customer':
        return 'bg-purple-100 text-purple-600';
      case 'Purchase Order':
        return 'bg-orange-100 text-orange-600';
      case 'Expense':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-bodyGray-100 text-bodyGray-600';
    }
  };

  const getDaysLeftColor = (days) => {
    if (days <= 3) return 'destructive';
    if (days <= 7) return 'warning';
    return 'secondary';
  };

  const filteredItems = deletedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.deletedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleRestore = (id) => {
    console.log('Restoring item:', id);
    // Add restore logic here
  };

  const handlePermanentDelete = (id) => {
    console.log('Permanently deleting item:', id);
    // Add permanent delete logic here
  };

  const handleEmptyTrash = () => {
    console.log('Emptying trash');
    // Add empty trash logic here
  };

  return (
<div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Recently Deleted</h3>
            <p className="text-sm text-bodyGray-500">Items are permanently deleted after 15 days</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
               <Button 
          variant="outline" 
          className="border-red-300 text-red-600 hover:bg-red-50"
          onClick={handleEmptyTrash}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Empty Trash
        </Button>
            <Trash2 className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>   
            

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Items in trash are automatically deleted after 15 days
              </p>
              <p className="text-sm text-yellow-700">
                Restore important items before they are permanently removed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Items</p>
                <p className="text-2xl font-bold text-bodyGray-900">{deletedItems.length}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Trash2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {deletedItems.filter(item => item.daysLeft <= 3).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">This Week</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {deletedItems.filter(item => {
                    const deletedDate = new Date(item.deletedDate);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return deletedDate >= weekAgo;
                  }).length}
                </p>
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
                <p className="text-sm font-medium text-bodyGray-600">Total Size</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {(deletedItems.reduce((sum, item) => sum + parseFloat(item.size), 0)).toFixed(1)} KB
                </p>
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
                  placeholder="Search deleted items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
           
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deleted Items ({filteredItems.length})</CardTitle>
          <CardDescription>Items can be restored or permanently deleted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Name</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Type</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Deleted Date</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Deleted By</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Size</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Days Left</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Original Location</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <span className="font-medium text-bodyGray-900 truncate max-w-[120px]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600">{item.deletedDate}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[120px]">{item.deletedBy}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{item.size}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getDaysLeftColor(item.daysLeft)}>
                        {item.daysLeft} days
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{item.originalLocation}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRestore(item.id)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handlePermanentDelete(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Trash2 className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
              <p className="text-bodyGray-500 text-lg">No deleted items found</p>
              <p className="text-bodyGray-400 text-sm">Items you delete will appear here for 15 days</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentlyDeleted;