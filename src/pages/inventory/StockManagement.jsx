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
  Edit,
  Eye,
  Trash2
} from 'lucide-react';

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
    }
  ];

  const categories = ['all', 'Electronics', 'Furniture', 'Accessories', 'Lighting', 'Office Supplies'];
  const statuses = ['all', 'In Stock', 'Low Stock', 'Out of Stock', 'Reorder Required'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return { bg: 'var(--color-success-light)', text: 'var(--color-success)' };
      case 'Low Stock':
        return { bg: 'var(--color-warning-light)', text: 'var(--color-warning)' };
      case 'Out of Stock':
        return { bg: 'var(--color-error-light)', text: 'var(--color-error)' };
      default:
        return { bg: 'var(--bg-tertiary)', text: 'var(--text-secondary)' };
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
      change: '+12%',
      trend: 'up',
      icon: <Package className="h-6 w-6" />,
    },
    {
      title: 'Low Stock Items',
      value: stockData.filter(item => item.status === 'Low Stock').length,
      change: '-5%',
      trend: 'down',
      icon: <AlertTriangle className="h-6 w-6" />,
      variant: 'warning',
    },
    {
      title: 'Out of Stock',
      value: stockData.filter(item => item.status === 'Out of Stock').length,
      change: '+2',
      trend: 'up',
      icon: <TrendingDown className="h-6 w-6" />,
      variant: 'error',
    },
    {
      title: 'Total Value',
      value: `₹${stockData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: <BarChart3 className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen animate-fade-in"
         style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}>
            <Package className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
            Stock Management
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Monitor and manage your inventory stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Stock
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Stock
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} 
               className="card hover:scale-105 transition-transform duration-200"
               style={{ 
                 borderColor: stat.variant === 'warning' ? 'var(--color-warning-light)' : 
                             stat.variant === 'error' ? 'var(--color-error-light)' : 'var(--border-primary)'
               }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {stat.title}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" style={{ color: 'var(--color-success)' }} />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" style={{ color: 'var(--color-error)' }} />
                  )}
                  <span className="text-sm" 
                        style={{ color: stat.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)' }}>
                    {stat.change}
                  </span>
                  <span className="text-sm ml-1" style={{ color: 'var(--text-tertiary)' }}>
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full"
                   style={{ 
                     backgroundColor: stat.variant === 'warning' ? 'var(--color-warning-light)' : 
                                    stat.variant === 'error' ? 'var(--color-error-light)' : 'var(--color-primary-100)',
                     color: stat.variant === 'warning' ? 'var(--color-warning)' : 
                           stat.variant === 'error' ? 'var(--color-error)' : 'var(--color-primary-500)'
                   }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" 
                      style={{ color: 'var(--text-tertiary)' }} />
              <input
                placeholder="Search by name, SKU, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-9"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
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
              className="input"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Stock Items ({filteredItems.length})
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your inventory stock levels and reorder points
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Item
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Stock Level
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Reorder Point
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Supplier
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Last Restocked
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => {
                const statusColors = getStatusColor(item.status);
                const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock);
                
                return (
                  <tr key={item.id} 
                      className="border-b hover:bg-opacity-50 transition-colors"
                      style={{ borderColor: 'var(--border-primary)' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {item.name}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                          {item.sku} • {item.category}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {item.currentStock} / {item.maxStock}
                        </span>
                        <div className="w-20 h-2 rounded-full mt-1" 
                             style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              backgroundColor: stockLevel === 'empty' ? 'var(--color-error)' :
                                             stockLevel === 'low' ? 'var(--color-warning)' :
                                             stockLevel === 'medium' ? 'var(--color-info)' : 'var(--color-success)',
                              width: `${(item.currentStock / item.maxStock) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium" 
                            style={{ 
                              color: item.currentStock <= item.reorderPoint ? 'var(--color-warning)' : 'var(--text-primary)'
                            }}>
                        {item.reorderPoint}
                      </span>
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.supplier}
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.lastRestocked}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: statusColors.bg,
                              color: statusColors.text
                            }}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg transition-colors"
                                style={{ color: 'var(--text-tertiary)' }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = 'var(--bg-tertiary)';
                                  e.target.style.color = 'var(--color-info)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.color = 'var(--text-tertiary)';
                                }}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg transition-colors"
                                style={{ color: 'var(--text-tertiary)' }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = 'var(--bg-tertiary)';
                                  e.target.style.color = 'var(--color-primary-500)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.color = 'var(--text-tertiary)';
                                }}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg transition-colors"
                                style={{ color: 'var(--text-tertiary)' }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = 'var(--color-error-light)';
                                  e.target.style.color = 'var(--color-error)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.color = 'var(--text-tertiary)';
                                }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "btn-primary" : "btn-secondary"}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockManagement;