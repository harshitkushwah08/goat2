import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table } from '../../components/ui/Table';
import { Pagination } from '../../components/ui/Pagination';
import { StatsCards } from '../../components/ui/StatsCards';

export const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stockData = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      reorderPoint: 15,
      lastRestocked: '2024-01-10',
      supplier: 'TechSound Inc.',
      location: 'A1-B2',
      status: 'In Stock',
      value: 4499.55
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      sku: 'EOC-002',
      category: 'Furniture',
      currentStock: 8,
      minStock: 5,
      maxStock: 50,
      reorderPoint: 10,
      lastRestocked: '2024-01-05',
      supplier: 'ComfortSeating Ltd.',
      location: 'B2-C3',
      status: 'Low Stock',
      value: 2399.92
    },
    {
      id: 3,
      name: 'Adjustable Laptop Stand',
      sku: 'ALS-003',
      category: 'Accessories',
      currentStock: 0,
      minStock: 15,
      maxStock: 75,
      reorderPoint: 20,
      lastRestocked: '2023-12-28',
      supplier: 'DeskTech Solutions',
      location: 'C1-A2',
      status: 'Out of Stock',
      value: 0
    },
    {
      id: 4,
      name: 'Wireless Keyboard',
      sku: 'WK-004',
      category: 'Electronics',
      currentStock: 25,
      minStock: 8,
      maxStock: 60,
      reorderPoint: 12,
      lastRestocked: '2024-01-15',
      supplier: 'TechSound Inc.',
      location: 'A2-B1',
      status: 'In Stock',
      value: 1899.95
    },
    {
      id: 5,
      name: 'LED Desk Lamp',
      sku: 'LDL-005',
      category: 'Lighting',
      currentStock: 12,
      minStock: 10,
      maxStock: 40,
      reorderPoint: 15,
      lastRestocked: '2024-01-08',
      supplier: 'BrightLights Co.',
      location: 'D3-E2',
      status: 'Low Stock',
      value: 899.50
    }
  ];

  const categories = ['all', 'Electronics', 'Furniture', 'Accessories', 'Lighting', 'Office Supplies'];
  const statuses = ['all', 'In Stock', 'Low Stock', 'Out of Stock', 'Reorder Required'];

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

  const getStockLevel = (current, min, max) => {
    const percentage = (current / max) * 100;
    if (current === 0) return 'empty';
    if (current <= min) return 'low';
    if (percentage >= 80) return 'high';
    return 'medium';
  };

  const filteredItems = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const stats = [
    {
      title: 'Total Items',
      value: stockData.length,
      subValue: '+12% vs last month',
      trend: {
        icon: <TrendingUp className="h-4 w-4 mr-1 text-green-500" />,
        className: "text-sm text-green-500"
      },
      icon: <Package className="h-6 w-6" />,
      iconBg: "bg-primary-100",
      iconColor: "text-primary-600"
    },
    {
      title: 'Low Stock Items',
      value: stockData.filter(item => item.status === 'Low Stock').length,
      subValue: '-5% vs last month',
      trend: {
        icon: <TrendingDown className="h-4 w-4 mr-1 text-green-500" />,
        className: "text-sm text-green-500"
      },
      icon: <AlertTriangle className="h-6 w-6" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: 'Out of Stock',
      value: stockData.filter(item => item.status === 'Out of Stock').length,
      subValue: '+2 items',
      trend: {
        icon: <TrendingUp className="h-4 w-4 mr-1 text-red-500" />,
        className: "text-sm text-red-500"
      },
      icon: <TrendingDown className="h-6 w-6" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: 'Total Value',
      value: `₹${stockData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`,
      subValue: '+8% vs last month',
      trend: {
        icon: <TrendingUp className="h-4 w-4 mr-1 text-green-500" />,
        className: "text-sm text-green-500"
      },
      icon: <BarChart3 className="h-6 w-6" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
  ];

  const columns = [
    {
      header: 'Item',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-medium text-bodyGray-900">{row.name}</p>
          <p className="text-sm text-bodyGray-500">{row.sku} • {row.category}</p>
        </div>
      )
    },
    {
      header: 'Stock Level',
      accessor: 'currentStock',
      render: (row) => {
        const stockLevel = getStockLevel(row.currentStock, row.minStock, row.maxStock);
        return (
          <div className="flex flex-col">
            <span className="font-medium text-bodyGray-900">
              {row.currentStock} / {row.maxStock}
            </span>
            <div className="w-20 h-2 rounded-full mt-1 bg-bodyGray-200">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: 
                    stockLevel === 'empty' ? 'var(--color-error)' :
                    stockLevel === 'low' ? 'var(--color-warning)' :
                    stockLevel === 'medium' ? 'var(--color-info)' : 'var(--color-success)',
                  width: `${(row.currentStock / row.maxStock) * 100}%`
                }}
              />
            </div>
          </div>
        );
      }
    },
    {
      header: 'Reorder Point',
      accessor: 'reorderPoint',
      render: (row) => (
        <span className={`font-medium ${
          row.currentStock <= row.reorderPoint ? 'text-yellow-600' : 'text-bodyGray-900'
        }`}>
          {row.reorderPoint}
        </span>
      )
    },
    {
      header: 'Supplier',
      accessor: 'supplier',
      className: 'text-bodyGray-600'
    },
    {
      header: 'Last Restocked',
      accessor: 'lastRestocked',
      className: 'text-bodyGray-600'
    },
    {
      header: 'Status',
      accessor: 'status',
      isStatus: true
    }
  ];

  const handleViewItem = (item) => {
    console.log("View item:", item);
  };

  const handleEditItem = (item) => {
    console.log("Edit item:", item);
  };

  const handleDeleteItem = (item) => {
    console.log("Delete item:", item);
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <PageHeader
        title="Stock Management"
        description="Monitor and manage your inventory stock levels"
        icon={<Package className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Import Stock",
            icon: <Upload className="w-4 h-4" />,
            onClick: () => console.log("Import stock"),
            className: "bg-bodyGray-800 text-boldWhite hover:bg-bodyGray-700"
          },
          {
            label: "Export Report",
            icon: <Download className="w-4 h-4" />,
            onClick: () => console.log("Export report"),
            className: "bg-bodyGray-800 text-boldWhite hover:bg-bodyGray-700"
          },
          {
            label: "Add Stock",
            icon: <Plus className="w-4 h-4" />,
            onClick: () => console.log("Add stock")
          }
        ]}
      />

      <StatsCards stats={stats} />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search by name, SKU, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-bodyGray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-bodyGray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-bodyGray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-bodyGray-900"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Stock Items ({filteredItems.length})</CardTitle>
            <Button variant="outline" className="text-primary-600 hover:bg-primary-100">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            data={paginatedItems}
            onView={handleViewItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            statusColorMap={{
              'In Stock': 'success',
              'Low Stock': 'warning',
              'Out of Stock': 'destructive'
            }}
            emptyMessage="No stock items found matching your criteria"
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockManagement;