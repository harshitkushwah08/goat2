import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Tag,
  Calendar,
  Users,
  ShoppingCart,
  CreditCard,
  FileSpreadsheet,
  LayoutGrid,
  ArrowRight
} from 'lucide-react';

import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

export const CustomFormsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedForm, setSelectedForm] = useState(null);
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Categories', count: 12 },
    { id: 'invoice', name: 'Invoice', count: 3, icon: <FileText className="w-4 h-4" /> },
    { id: 'customer', name: 'Customer', count: 2, icon: <Users className="w-4 h-4" /> },
    { id: 'order', name: 'Order', count: 2, icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'payment', name: 'Payment', count: 1, icon: <CreditCard className="w-4 h-4" /> },
    { id: 'survey', name: 'Survey', count: 2, icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'other', name: 'Other', count: 2, icon: <Tag className="w-4 h-4" /> },
  ];

  const [forms, setForms] = useState([
    { 
      id: 1, 
      name: 'Customer Feedback Form', 
      description: 'Collect customer feedback after purchase', 
      category: 'survey',
      lastEdited: '2024-01-15',
      fields: 12,
      status: 'Active',
      formFields: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'rating', label: 'Rate our service', type: 'rating', required: true },
        { id: 'feedback', label: 'Your Feedback', type: 'textarea', required: false },
        { id: 'contactConsent', label: 'Can we contact you about your feedback?', type: 'checkbox', required: false }
      ]
    },
    { 
      id: 2, 
      name: 'New Customer Registration', 
      description: 'Register new customers with detailed information', 
      category: 'customer',
      lastEdited: '2024-01-14',
      fields: 8,
      status: 'Active',
      formFields: [
        { id: 'name', label: 'Customer Name', type: 'text', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'address', label: 'Address', type: 'textarea', required: false },
        { id: 'company', label: 'Company Name', type: 'text', required: false }
      ]
    },
    { 
      id: 3, 
      name: 'Custom Invoice Template', 
      description: 'Customized invoice with additional fields', 
      category: 'invoice',
      lastEdited: '2024-01-13',
      fields: 15,
      status: 'Draft',
      formFields: [
        { id: 'customerName', label: 'Customer Name', type: 'text', required: true },
        { id: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
        { id: 'items', label: 'Line Items', type: 'array', required: true },
        { id: 'taxRate', label: 'Tax Rate (%)', type: 'number', required: true },
        { id: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
      ]
    },
    { 
      id: 4, 
      name: 'Product Order Form', 
      description: 'Custom order form with product specifications', 
      category: 'order',
      lastEdited: '2024-01-12',
      fields: 10,
      status: 'Active',
      formFields: [
        { id: 'productName', label: 'Product Name', type: 'text', required: true },
        { id: 'quantity', label: 'Quantity', type: 'number', required: true },
        { id: 'specifications', label: 'Specifications', type: 'textarea', required: false },
        { id: 'deliveryDate', label: 'Requested Delivery Date', type: 'date', required: true }
      ]
    },
    { 
      id: 5, 
      name: 'Payment Receipt Form', 
      description: 'Custom payment receipt with additional details', 
      category: 'payment',
      lastEdited: '2024-01-11',
      fields: 7,
      status: 'Active',
      formFields: [
        { id: 'paymentAmount', label: 'Payment Amount', type: 'number', required: true },
        { id: 'paymentMethod', label: 'Payment Method', type: 'select', required: true },
        { id: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
        { id: 'reference', label: 'Reference Number', type: 'text', required: false }
      ]
    },
    { 
      id: 6, 
      name: 'Employee Survey', 
      description: 'Internal survey for employee feedback', 
      category: 'survey',
      lastEdited: '2024-01-10',
      fields: 20,
      status: 'Draft',
      formFields: [
        { id: 'department', label: 'Department', type: 'select', required: true },
        { id: 'satisfaction', label: 'Job Satisfaction', type: 'rating', required: true },
        { id: 'feedback', label: 'Feedback', type: 'textarea', required: true },
        { id: 'suggestions', label: 'Suggestions for Improvement', type: 'textarea', required: false }
      ]
    },
  ]);

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : <Tag className="w-4 h-4" />;
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'invoice': return 'bg-blue-100 text-blue-600';
      case 'customer': return 'bg-green-100 text-green-600';
      case 'order': return 'bg-purple-100 text-purple-600';
      case 'payment': return 'bg-yellow-100 text-yellow-600';
      case 'survey': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleUseForm = (form) => {
    setCurrentForm(form);
    setShowFormDetails(true);
  };

  const handleEditForm = (e, form) => {
    e.stopPropagation();
    console.log("Edit form", form.id);
    // Navigate to form editor or open edit modal
  };

  const handleDeleteForm = (e, form) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${form.name}"?`)) {
      setForms(forms.filter(f => f.id !== form.id));
    }
  };

  const handleCreateNewForm = () => {
    const newForm = {
      id: Date.now(),
      name: 'New Form',
      description: 'Form description',
      category: 'other',
      lastEdited: new Date().toISOString().split('T')[0],
      fields: 0,
      status: 'Draft',
      formFields: []
    };
    setForms([newForm, ...forms]);
    setCurrentForm(newForm);
    // Navigate to form builder or open builder modal
  };

  const handleSubmitForm = (formData) => {
    console.log("Form submitted:", formData);
    setShowFormDetails(false);
    // Process form submission
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <PageHeader
        title="Custom Forms"
        description="Create and manage custom forms for your business"
        icon={<LayoutGrid className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Create New Form",
            icon: <Plus className="w-4 h-4" />,
            onClick: handleCreateNewForm
          }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse forms by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'hover:bg-bodyGray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <div className={`p-1.5 rounded-md ${
                          selectedCategory === category.id 
                            ? 'bg-primary-100' 
                            : 'bg-bodyGray-100'
                        }`}>
                          {category.icon}
                        </div>
                      )}
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  New Form
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Import Form
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Recent Forms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-3/4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                    <Input
                      placeholder="Search forms..."
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
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <Card 
                key={form.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedForm === form.id ? 'ring-2 ring-primary-200 border-primary-500' : ''
                }`}
                onClick={() => handleUseForm(form)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(form.category)}`}>
                        {getCategoryIcon(form.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-bodyGray-900 line-clamp-1">{form.name}</h3>
                        <p className="text-xs text-bodyGray-500">Last edited: {form.lastEdited}</p>
                      </div>
                    </div>
                    {selectedForm === form.id && (
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  
                  <p className="text-sm text-bodyGray-600 mb-4 line-clamp-2">{form.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(form.status)}>
                        {form.status}
                      </Badge>
                      <span className="text-xs text-bodyGray-500">{form.fields} fields</span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => handleEditForm(e, form)}
                      >
                        <Edit className="w-4 h-4 text-bodyGray-500 hover:text-primary-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => handleDeleteForm(e, form)}
                      >
                        <Trash2 className="w-4 h-4 text-bodyGray-500 hover:text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Form Details Modal */}
            {showFormDetails && currentForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">{currentForm.name}</h2>
                      <button 
                        onClick={() => setShowFormDetails(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-500 mt-1">{currentForm.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitForm(new FormData(e.target));
                    }}>
                      <div className="space-y-6">
                        {currentForm.formFields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            
                            {field.type === 'text' && (
                              <input
                                type="text"
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'email' && (
                              <input
                                type="email"
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'tel' && (
                              <input
                                type="tel"
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'number' && (
                              <input
                                type="number"
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'date' && (
                              <input
                                type="date"
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'textarea' && (
                              <textarea
                                name={field.id}
                                required={field.required}
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            )}
                            
                            {field.type === 'checkbox' && (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name={field.id}
                                  required={field.required}
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-500">Yes</span>
                              </div>
                            )}
                            
                            {field.type === 'select' && (
                              <select
                                name={field.id}
                                required={field.required}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              >
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </select>
                            )}
                            
                            {field.type === 'rating' && (
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <label key={rating} className="flex flex-col items-center">
                                    <input
                                      type="radio"
                                      name={field.id}
                                      value={rating}
                                      required={field.required}
                                      className="sr-only"
                                    />
                                    <span className="text-2xl cursor-pointer hover:text-yellow-500 peer-checked:text-yellow-500">
                                      ★
                                    </span>
                                    <span className="text-xs">{rating}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowFormDetails(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          Submit Form
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Add New Form Card */}
            <Card className="border-2 border-dashed border-bodyGray-300 hover:border-primary-400 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="p-3 rounded-full bg-primary-100 mb-4">
                  <Plus className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-medium text-bodyGray-900 mb-2">Create Custom Form</h3>
                <p className="text-sm text-bodyGray-500 text-center">
                  Design a custom form for your business needs
                </p>
                <Button 
                  className="mt-4 bg-primary-600 hover:bg-primary-700"
                  onClick={handleCreateNewForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Start Building
                </Button>
              </CardContent>
            </Card>
          </div>

          {filteredForms.length === 0 && searchTerm && (
            <div className="text-center py-12 bg-bodyGray-50 rounded-lg border border-bodyGray-200">
              <FileText className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
              <h3 className="text-lg font-medium text-bodyGray-900 mb-2">No forms found</h3>
              <p className="text-bodyGray-500">
                No forms match your search criteria. Try adjusting your filters or create a new form.
              </p>
              <Button className="mt-4 bg-primary-600 hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Form
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomFormsPage;