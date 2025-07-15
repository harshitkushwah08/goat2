import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Edit, 
  Trash2, 
  Save,
  CheckCircle,
  Calendar,
  Tag
} from 'lucide-react';

import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export const FormView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Get form data from location state or fetch it based on ID
  const form = location.state?.form || {
    id: parseInt(id),
    name: 'Sample Form',
    description: 'This is a sample form',
    category: 'other',
    lastEdited: '2024-01-15',
    fields: 5,
    status: 'Active',
    formFields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
      { id: 'message', label: 'Message', type: 'textarea', required: false },
      { id: 'consent', label: 'I agree to be contacted', type: 'checkbox', required: true }
    ]
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Process form submission
    alert("Form submitted successfully!");
  };

  const handleExportPDF = () => {
    console.log("Exporting form as PDF");
    // Implement PDF export logic
    alert("Form exported as PDF");
  };

  const handleDelete = () => {
    console.log("Deleting form:", form.id);
    setShowDeleteDialog(false);
    navigate('/forms/custom');
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'tel':
        return (
          <input
            type="tel"
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              name={field.id}
              required={field.required}
              checked={formData[field.id] || false}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </div>
        );
      
      case 'select':
        return (
          <select
            id={field.id}
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      
      case 'rating':
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex flex-col items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={rating}
                  required={field.required}
                  checked={formData[field.id] === rating.toString()}
                  onChange={() => handleInputChange(field.id, rating.toString())}
                  className="sr-only peer"
                />
                <span className="text-2xl cursor-pointer text-gray-300 peer-checked:text-yellow-500 hover:text-yellow-400">
                  ★
                </span>
                <span className="text-xs">{rating}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <PageHeader
        title={form.name}
        description={form.description}
        icon={<FileText className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Edit Form",
            icon: <Edit className="w-4 h-4" />,
            onClick: () => navigate(`/forms/edit/${form.id}`, { state: { form } }),
            className: "bg-bodyGray-800 text-boldWhite hover:bg-bodyGray-700"
          },
          {
            label: "Delete Form",
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => setShowDeleteDialog(true),
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
              <CardDescription>Fill out the form fields below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {form.formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/forms/custom')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Forms
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Submit Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary-100">
                    <FileText className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">{form.name}</p>
                    <p className="text-sm text-bodyGray-500">{form.fields} fields</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Tag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Category</p>
                    <p className="text-sm text-bodyGray-500">{form.category.charAt(0).toUpperCase() + form.category.slice(1)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge variant={form.status === 'Active' ? 'success' : 'secondary'}>
                      {form.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Last Edited</p>
                    <p className="text-sm text-bodyGray-500">{form.lastEdited}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleExportPDF}
                  className="w-full bg-primary-600 hover:bg-primary-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Delete Form</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Are you sure you want to delete the form "{form.name}"? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormView;