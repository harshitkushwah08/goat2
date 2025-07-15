import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  BarChart3,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import ReactApexChart from 'react-apexcharts';

export const CategoriesInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#10b981'
  });

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      itemCount: 156,
      totalValue: 847392,
      color: '#3b82f6',
      lastUpdated: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Furniture',
      description: 'Office and home furniture items',
      itemCount: 89,
      totalValue: 234567,
      color: '#8b5cf6',
      lastUpdated: '2024-01-14',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Accessories',
      description: 'Various accessories and add-ons',
      itemCount: 234,
      totalValue: 123456,
      color: '#f59e0b',
      lastUpdated: '2024-01-13',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Lighting',
      description: 'Lighting equipment and fixtures',
      itemCount: 67,
      totalValue: 89012,
      color: '#ef4444',
      lastUpdated: '2024-01-12',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Office Supplies',
      description: 'Stationery and office equipment',
      itemCount: 345,
      totalValue: 45678,
      color: '#10b981',
      lastUpdated: '2024-01-11',
      status: 'Active'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = categories.reduce((sum, cat) => sum + cat.itemCount, 0);
  const totalValue = categories.reduce((sum, cat) => sum + cat.totalValue, 0);

  const handleAddCategory = () => {
    // Add category logic here
    setShowAddModal(false);
    setNewCategory({ name: '', description: '', color: '#10b981' });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    // Delete category logic here
    console.log('Delete category:', categoryId);
  };

  // Chart options for category distribution
  const categoryChartOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false
      }
    },
    labels: categories.map(cat => cat.name),
    colors: categories.map(cat => cat.color),
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      y: {
        formatter: function(value) {
          return value + " items";
        }
      }
    }
  };

  const categoryChartSeries = categories.map(cat => cat.itemCount);

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Categories</h3>
            <p className="text-sm text-bodyGray-500">Organize your inventory into categories</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
          
          <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
            <FolderOpen className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">
                  Total Categories
                </p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {categories.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <FolderOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">
                  Total Items
                </p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {totalItems.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">
                  Total Value
                </p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  ₹{totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Distribution of items across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ReactApexChart 
                options={categoryChartOptions} 
                series={categoryChartSeries} 
                type="pie" 
                height="100%" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Value Comparison</CardTitle>
            <CardDescription>Total value by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ReactApexChart 
                options={{
                  chart: {
                    type: 'bar',
                    toolbar: {
                      show: false
                    }
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: true,
                      distributed: true,
                      dataLabels: {
                        position: 'top'
                      }
                    }
                  },
                  colors: categories.map(cat => cat.color),
                  dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                      return '₹' + val.toLocaleString();
                    },
                    style: {
                      fontSize: '12px',
                      colors: ['#304758']
                    },
                    offsetX: 30
                  },
                  xaxis: {
                    categories: categories.map(cat => cat.name),
                    labels: {
                      formatter: function(val) {
                        return '₹' + Math.round(val/1000) + 'K';
                      }
                    }
                  },
                  yaxis: {
                    labels: {
                      show: true
                    }
                  },
                  tooltip: {
                    y: {
                      formatter: function(val) {
                        return '₹' + val.toLocaleString();
                      }
                    }
                  }
                }} 
                series={[{
                  name: 'Value',
                  data: categories.map(cat => cat.totalValue)
                }]} 
                type="bar" 
                height="100%" 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">

                      <div className='flex-1'>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
            />


          </div>
                  </div>


                        <div className="flex gap-2">

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    <FolderOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-bodyGray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-bodyGray-500">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-bodyGray-600">Items</span>
                  <span className="font-medium text-bodyGray-900">
                    {category.itemCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-bodyGray-600">Total Value</span>
                  <span className="font-medium text-bodyGray-900">
                    ₹{category.totalValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-bodyGray-600">Last Updated</span>
                  <span className="text-sm text-bodyGray-500">
                    {category.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-bodyGray-200">
                <Badge variant="success">
                  {category.status}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', color: '#10b981' });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-bodyGray-700">
                  Category Name
                </label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-bodyGray-700">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description"
                  rows={3}
                  className="w-full px-3 py-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-bodyGray-700">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="w-12 h-12 rounded-lg border cursor-pointer"
                  />
                  <Input
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', color: '#10b981' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddCategory}
                  className="bg-primary-600 hover:bg-primary-700 flex-1"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoriesInventory;