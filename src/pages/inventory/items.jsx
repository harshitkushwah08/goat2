import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';


export const InventoryItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const items = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      brand: 'TechSound',
      stock: 45,
      minStock: 10,
      price: 99.99,
      cost: 65.00,
      status: 'In Stock',
      location: 'A1-B2',
      lastUpdated: '2024-01-15',
      image: 'https://placehold.co/600x400@2x.png'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      sku: 'EOC-002',
      category: 'Furniture',
      brand: 'ComfortSeating',
      stock: 8,
      minStock: 5,
      price: 299.99,
      cost: 180.00,
      status: 'Low Stock',
      location: 'B2-C3',
      lastUpdated: '2024-01-14',
      image: 'https://placehold.co/600x400@2x.png'
    },
    {
      id: 3,
      name: 'Adjustable Laptop Stand',
      sku: 'ALS-003',
      category: 'Accessories',
      brand: 'DeskTech',
      stock: 0,
      minStock: 15,
      price: 49.99,
      cost: 25.00,
      status: 'Out of Stock',
      location: 'C1-A2',
      lastUpdated: '2024-01-13',
      image: 'https://placehold.co/600x400@2x.png'
    },
    // Add more items...
  ];
const categories = [
  { value: "all", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Accessories", label: "Accessories" },
  { value: "Lighting", label: "Lighting" },
  { value: "Office Supplies", label: "Office Supplies" }
];

const statuses = [
  { value: "all", label: "All Status" },
  { value: "In Stock", label: "In Stock" },
  { value: "Low Stock", label: "Low Stock" },
  { value: "Out of Stock", label: "Out of Stock" }
];
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">All Items</h3>
            <p className="text-sm text-bodyGray-500">Manage your complete inventory catalog</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
              <Upload className="w-4 h-4 mr-2" />
            Import
        </Button>
         <Button className="bg-primary-600 hover:bg-primary-700">
              <Download className="w-4 h-4 mr-2" />
            Export
        </Button>
          <Button className="bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
        </Button>
            <Package className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>    

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search by name, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
             <DropdownSelectMenu
      options={categories}
      selected={selectedCategory}
      onChange={setSelectedCategory}
      placeholder="All Categories"
    />

    <DropdownSelectMenu
      options={statuses}
      selected={selectedStatus}
      onChange={setSelectedStatus}
      placeholder="All Status"
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Items ({filteredItems.length})</CardTitle>
              <CardDescription>Complete list of inventory items</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Item</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">SKU</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Category</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Stock</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Price</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Location</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-bodyGray-100"
                        />
                        <div>
                          <p className="font-medium text-bodyGray-900 truncate max-w-[120px]">{item.name}</p>
                          <p className="text-sm text-bodyGray-500 truncate max-w-[120px]">{item.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{item.sku}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{item.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ₹{
                          item.stock === 0 ? 'text-red-600' : 
                          item.stock <= item.minStock ? 'text-yellow-600' : 'text-primary-600'
                        }`}>
                          {item.stock}
                        </span>
                        <span className="text-xs text-bodyGray-500">Min: {item.minStock}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-bodyGray-900 font-medium truncate max-w-[100px]">₹{item.price}</span>
                        <span className="text-xs text-bodyGray-500 truncate max-w-[100px]">Cost: ₹{item.cost}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{item.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
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
                                                                          <Button variant="ghost" size="sm" className="hover:text-red-600 active:scale-95 transition-all">
                                                                            <Trash2 className="w-4 h-4" />
                                                                          </Button>
                                                                        </Tooltip>
                                                                         <Tooltip text="More">
                                                                          <Button variant="ghost" size="sm" className="hover:text-primary-600 active:scale-95 transition-all">
                                                                            <MoreHorizontal className="w-4 h-4" />
                                                                          </Button>
                                                                        </Tooltip>
                  
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-bodyGray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-primary-600 hover:bg-primary-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryItems;