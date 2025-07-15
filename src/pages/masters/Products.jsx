import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Tag,
  BarChart,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';
import Tooltip from '../../components/ui/toolTip';

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      price: 2499.99,
      costPrice: 1800.00,
      stock: 45,
      status: 'Active',
      hsnCode: '8518',
      gstRate: '18%',
      salesCount: 120,
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      sku: 'EOC-002',
      category: 'Furniture',
      price: 7999.99,
      costPrice: 5500.00,
      stock: 8,
      status: 'Active',
      hsnCode: '9401',
      gstRate: '18%',
      salesCount: 35,
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 3,
      name: 'Adjustable Laptop Stand',
      sku: 'ALS-003',
      category: 'Accessories',
      price: 1299.99,
      costPrice: 800.00,
      stock: 0,
      status: 'Out of Stock',
      hsnCode: '3926',
      gstRate: '18%',
      salesCount: 85,
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 4,
      name: 'LED Desk Lamp',
      sku: 'LDL-004',
      category: 'Lighting',
      price: 899.99,
      costPrice: 600.00,
      stock: 32,
      status: 'Active',
      hsnCode: '9405',
      gstRate: '12%',
      salesCount: 67,
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 5,
      name: 'Premium Notebook Set',
      sku: 'PNS-005',
      category: 'Stationery',
      price: 499.99,
      costPrice: 300.00,
      stock: 120,
      status: 'Active',
      hsnCode: '4820',
      gstRate: '12%',
      salesCount: 210,
      image: 'https://placehold.co/600x400/png'
    }
  ];

const statusOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Lighting', label: 'Lighting' },
  { value: 'Stationery', label: 'Stationery' },
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Out of Stock':
        return 'destructive';
      case 'Discontinued':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.hsnCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
 <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">            Products
</h3>
            <p className="text-sm text-bodyGray-500">Manage your product catalog</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
            <Package className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>  

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Products</p>
                <p className="text-2xl font-bold text-bodyGray-900">256</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Categories</p>
                <p className="text-2xl font-bold text-bodyGray-900">12</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Tag className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Sales</p>
                <p className="text-2xl font-bold text-bodyGray-900">1,245</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹12.5L</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <BarChart className="h-6 w-6" />
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
                  placeholder="Search by name, SKU, or HSN code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownSelectMenu
            options={statusOptions}
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
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3 text-bodyGray-500">Product</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">SKU</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Category</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Price</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Stock</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">HSN Code</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">GST Rate</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id} 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-bodyGray-100"
                        />
                        <span className="font-medium text-bodyGray-900 truncate max-w-[120px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{product.sku}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-bodyGray-900 truncate max-w-[80px]">₹{product.price.toLocaleString()}</p>
                        <p className="text-xs text-bodyGray-500 truncate max-w-[80px]">Cost: ₹{product.costPrice.toLocaleString()}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{product.hsnCode}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{product.gstRate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(product.status)}>
                        {product.status}
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

export default Products;