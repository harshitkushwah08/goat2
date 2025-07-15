import { useState, Fragment, useRef } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { 
  FileText, 
  UploadCloud, 
  Trash2, 
  Save, 
  X, 
  CheckCircle, 
  MoreVertical,
  FileCheck,
  FileEdit,
  Download,
  Plus,
  Star,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { PageHeader } from "../../components/ui/PageHeader";
import { Badge } from "../../components/ui/badge";
import { motion } from "framer-motion";

export const TemplatePage = () => {
  const [selectedInvoiceTemplate, setSelectedInvoiceTemplate] = useState(1);
  const [selectedQuotationTemplate, setSelectedQuotationTemplate] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [templateType, setTemplateType] = useState('invoice'); // 'invoice' or 'quotation'
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const invoiceTemplates = [
    { 
      id: 1, 
      name: "Modern Invoice", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Clean and professional invoice design with modern layout",
      isDefault: true,
      lastUsed: "2 days ago",
      popularity: "Most used"
    },
    { 
      id: 2, 
      name: "Classic Invoice", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863255/pexels-photo-6863255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Traditional business invoice format with detailed sections",
      isDefault: false,
      lastUsed: "1 week ago",
      popularity: "Popular"
    },
    { 
      id: 3, 
      name: "Minimal Invoice", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Simple and elegant invoice layout for a clean look",
      isDefault: false,
      lastUsed: "3 weeks ago",
      popularity: ""
    },
  ];

  const quotationTemplates = [
    { 
      id: 1, 
      name: "Business Quotation", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863262/pexels-photo-6863262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Professional quotation template for businesses with detailed pricing",
      isDefault: true,
      lastUsed: "Yesterday",
      popularity: "Most used"
    },
    { 
      id: 2, 
      name: "Detailed Quotation", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863263/pexels-photo-6863263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Comprehensive quotation with detailed breakdown of costs and terms",
      isDefault: false,
      lastUsed: "5 days ago",
      popularity: ""
    },
    { 
      id: 3, 
      name: "Simple Quotation", 
      format: "DOCX", 
      preview: "https://images.pexels.com/photos/6863264/pexels-photo-6863264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Straightforward quotation for quick estimates and proposals",
      isDefault: false,
      lastUsed: "2 weeks ago",
      popularity: "Popular"
    },
  ];

  const openDeleteDialog = (template, type) => {
    setDeleteTarget({ ...template, type });
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", deleteTarget);
    setIsDeleteOpen(false);
  };

  const openTemplateSelector = (type) => {
    setTemplateType(type);
    setShowTemplateSelector(true);
  };

  const handleSelectTemplate = (id) => {
    if (templateType === 'invoice') {
      setSelectedInvoiceTemplate(id);
    } else {
      setSelectedQuotationTemplate(id);
    }
    setShowTemplateSelector(false);
  };

  const handleUpload = () => {
    setShowUploadDialog(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setShowUploadDialog(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full">
      <PageHeader
        title="Document Templates"
        description="Manage your invoice and quotation templates"
        icon={<FileText className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Upload Template",
            icon: <UploadCloud className="w-4 h-4" />,
            onClick: handleUpload
          }
        ]}
      />

      {/* Featured Templates Banner */}
      <div className="w-full bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <Badge variant="success" className="mb-2">New Feature</Badge>
            <h2 className="text-2xl font-bold text-bodyGray-900">Discover Premium Templates</h2>
            <p className="text-bodyGray-600 max-w-md">
              Enhance your business documents with our professionally designed templates. 
              Perfect for creating impressive invoices and quotations.
            </p>
            <Button className="mt-2 bg-primary-600 hover:bg-primary-700">
              Explore Premium Templates <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Featured Templates" 
              className="rounded-lg shadow-lg w-64 h-40 object-cover"
            />
            <div className="absolute -top-3 -right-3 bg-primary-600 text-white p-2 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Templates Section */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-bodyGray-200 p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-bodyGray-900 flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-primary-600" />
                Invoice Templates
              </h3>
              <p className="text-sm text-bodyGray-500 mt-1">Select a template for your invoices</p>
            </div>
            <Button 
              onClick={() => openTemplateSelector('invoice')}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Choose Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoiceTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`border-2 rounded-lg overflow-hidden transition-all ${
                  selectedInvoiceTemplate === template.id
                    ? 'border-primary-500 ring-2 ring-primary-100'
                    : 'border-bodyGray-300 hover:border-primary-200'
                }`}
              >
                <div className="aspect-[4/3] bg-bodyGray-100 relative">
                  {template.preview ? (
                    <img 
                      src={template.preview} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-bodyGray-400" />
                    </div>
                  )}
                  {selectedInvoiceTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  {template.isDefault && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      Default
                    </div>
                  )}
                  {template.popularity && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" fill="currentColor" />
                      {template.popularity}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-bodyGray-900">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-bodyGray-500">{template.format}</span>
                        <span className="text-xs text-bodyGray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {template.lastUsed}
                        </span>
                      </div>
                    </div>
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-1 rounded-md hover:bg-bodyGray-100">
                        <MoreVertical className="w-4 h-4 text-bodyGray-500" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                  onClick={() => setSelectedInvoiceTemplate(template.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Select
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                >
                                  <FileEdit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            {!template.isDefault && (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => openDeleteDialog(template, 'invoice')}
                                    className={`${
                                      active ? 'bg-red-50 text-red-700' : 'text-red-600'
                                    } flex w-full items-center px-4 py-2 text-sm`}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="text-sm text-bodyGray-600 mt-2 line-clamp-2">{template.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary-200 text-primary-700 hover:bg-primary-50"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Preview
                    </Button>
                    <Button 
                      size="sm"
                      className={selectedInvoiceTemplate === template.id ? "bg-primary-700" : "bg-primary-600 hover:bg-primary-700"}
                      onClick={() => setSelectedInvoiceTemplate(template.id)}
                    >
                      {selectedInvoiceTemplate === template.id ? "Selected" : "Choose"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotation Templates Section */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-bodyGray-200 p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-bodyGray-900 flex items-center gap-2">
                <FileEdit className="h-6 w-6 text-primary-600" />
                Quotation Templates
              </h3>
              <p className="text-sm text-bodyGray-500 mt-1">Select a template for your quotations</p>
            </div>
            <Button 
              onClick={() => openTemplateSelector('quotation')}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Choose Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotationTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`border-2 rounded-lg overflow-hidden transition-all ${
                  selectedQuotationTemplate === template.id
                    ? 'border-primary-500 ring-2 ring-primary-100'
                    : 'border-bodyGray-300 hover:border-primary-200'
                }`}
              >
                <div className="aspect-[4/3] bg-bodyGray-100 relative">
                  {template.preview ? (
                    <img 
                      src={template.preview} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-bodyGray-400" />
                    </div>
                  )}
                  {selectedQuotationTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  {template.isDefault && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      Default
                    </div>
                  )}
                  {template.popularity && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" fill="currentColor" />
                      {template.popularity}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-bodyGray-900">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-bodyGray-500">{template.format}</span>
                        <span className="text-xs text-bodyGray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {template.lastUsed}
                        </span>
                      </div>
                    </div>
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-1 rounded-md hover:bg-bodyGray-100">
                        <MoreVertical className="w-4 h-4 text-bodyGray-500" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                  onClick={() => setSelectedQuotationTemplate(template.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Select
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-bodyGray-700'
                                  } flex w-full items-center px-4 py-2 text-sm`}
                                >
                                  <FileEdit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            {!template.isDefault && (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => openDeleteDialog(template, 'quotation')}
                                    className={`${
                                      active ? 'bg-red-50 text-red-700' : 'text-red-600'
                                    } flex w-full items-center px-4 py-2 text-sm`}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="text-sm text-bodyGray-600 mt-2 line-clamp-2">{template.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary-200 text-primary-700 hover:bg-primary-50"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Preview
                    </Button>
                    <Button 
                      size="sm"
                      className={selectedQuotationTemplate === template.id ? "bg-primary-700" : "bg-primary-600 hover:bg-primary-700"}
                      onClick={() => setSelectedQuotationTemplate(template.id)}
                    >
                      {selectedQuotationTemplate === template.id ? "Selected" : "Choose"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Transition show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsDeleteOpen(false)}>
          <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>

                <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Delete
                </Dialog.Title>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete <span className="font-medium text-gray-800">
                    {deleteTarget?.name}
                  </span>? This action cannot be undone.
                </p>

                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={() => setIsDeleteOpen(false)}
                    variant="outline"
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Template Selector Modal */}
      <Transition show={showTemplateSelector} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShowTemplateSelector(false)}>
          <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Choose {templateType === 'invoice' ? 'Invoice' : 'Quotation'} Template
                  </Dialog.Title>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowTemplateSelector(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(templateType === 'invoice' ? invoiceTemplates : quotationTemplates).map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        (templateType === 'invoice' ? selectedInvoiceTemplate : selectedQuotationTemplate) === template.id
                          ? 'border-primary-500 ring-2 ring-primary-100'
                          : 'border-bodyGray-300 hover:border-primary-200'
                      }`}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <div className="aspect-[4/3] bg-bodyGray-100 relative">
                        {template.preview ? (
                          <img 
                            src={template.preview} 
                            alt={template.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-bodyGray-400" />
                          </div>
                        )}
                        {(templateType === 'invoice' ? selectedInvoiceTemplate : selectedQuotationTemplate) === template.id && (
                          <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                        {template.isDefault && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Default
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-bodyGray-900">{template.name}</h3>
                        <p className="text-sm text-bodyGray-600 mt-2">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowTemplateSelector(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary-600 hover:bg-primary-700"
                    onClick={() => setShowTemplateSelector(false)}
                  >
                    Confirm Selection
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Upload Template Dialog */}
      <Transition show={showUploadDialog} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => !isUploading && setShowUploadDialog(false)}>
          <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Upload New Template
                  </Dialog.Title>
                  <Button 
                    variant="ghost" 
                    onClick={() => !isUploading && setShowUploadDialog(false)}
                    disabled={isUploading}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-bodyGray-700">Template Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="templateType" 
                          value="invoice" 
                          checked={templateType === 'invoice'} 
                          onChange={() => setTemplateType('invoice')}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span>Invoice</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="templateType" 
                          value="quotation" 
                          checked={templateType === 'quotation'} 
                          onChange={() => setTemplateType('quotation')}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span>Quotation</span>
                      </label>
                    </div>
                  </div>

                  <div className="relative rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 p-8 hover:border-primary-400 transition">
                    <input 
                      type="file" 
                      className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0" 
                      accept=".docx,.pdf,.html"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      disabled={isUploading}
                    />
                    <div className="space-y-4 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                        <UploadCloud className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-bodyGray-900">
                          {isUploading ? "Uploading..." : "Drop your file here or browse"}
                        </p>
                        <p className="text-sm text-bodyGray-500">Support files: DOCX, PDF, HTML</p>
                        <p className="text-xs text-bodyGray-500">Max file size: 10MB</p>
                      </div>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-bodyGray-700">Uploading...</span>
                        <span className="text-sm text-bodyGray-500">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-bodyGray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => !isUploading && setShowUploadDialog(false)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-primary-600 hover:bg-primary-700"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Select File"}
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TemplatePage;