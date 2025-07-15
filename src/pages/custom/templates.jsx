import { useState, Fragment } from "react";
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
  Plus
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { PageHeader } from "../../components/ui/PageHeader";

export const TemplatePage = () => {
  const [selectedInvoiceTemplate, setSelectedInvoiceTemplate] = useState(1);
  const [selectedQuotationTemplate, setSelectedQuotationTemplate] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [templateType, setTemplateType] = useState('invoice'); // 'invoice' or 'quotation'

  const invoiceTemplates = [
    { id: 1, name: "Modern Invoice", format: "DOCX", preview: "/template1.jpg", description: "Clean and professional invoice design" },
    { id: 2, name: "Classic Invoice", format: "DOCX", preview: "/template2.jpg", description: "Traditional business invoice format" },
    { id: 3, name: "Minimal Invoice", format: "DOCX", preview: "/template3.jpg", description: "Simple and elegant invoice layout" },
  ];

  const quotationTemplates = [
    { id: 1, name: "Business Quotation", format: "DOCX", preview: "/template1.jpg", description: "Professional quotation template for businesses" },
    { id: 2, name: "Detailed Quotation", format: "DOCX", preview: "/template2.jpg", description: "Comprehensive quotation with detailed breakdown" },
    { id: 3, name: "Simple Quotation", format: "DOCX", preview: "/template3.jpg", description: "Straightforward quotation for quick estimates" },
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

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full">
      <PageHeader
        title="Templates"
        description="Manage your document templates"
        icon={<FileText className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Upload Template",
            icon: <UploadCloud className="w-4 h-4" />,
            onClick: () => console.log("Upload template")
          }
        ]}
      />

      {/* Invoice Templates Section */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary-600" />
                Invoice Templates
              </h3>
              <p className="text-sm text-bodyGray-500">Select a template for your invoices</p>
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
              <div
                key={template.id}
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
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-bodyGray-900">{template.name}</h3>
                      <p className="text-xs text-bodyGray-500 mt-1">{template.format}</p>
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
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="text-sm text-bodyGray-600 mt-2">{template.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log("Preview template", template.id)}
                    >
                      Preview
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotation Templates Section */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                <FileEdit className="h-5 w-5 text-primary-600" />
                Quotation Templates
              </h3>
              <p className="text-sm text-bodyGray-500">Select a template for your quotations</p>
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
              <div
                key={template.id}
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
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-bodyGray-900">{template.name}</h3>
                      <p className="text-xs text-bodyGray-500 mt-1">{template.format}</p>
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
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="text-sm text-bodyGray-600 mt-2">{template.description}</p>
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log("Preview template", template.id)}
                    >
                      Preview
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template Upload Section */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary-600" />
                Upload New Template
              </h3>
              <p className="text-sm text-bodyGray-500">Add your custom document templates</p>
            </div>
          </div>

          <div className="relative rounded-xl border-2 border-dashed border-bodyGray-800 bg-boldWhite p-8 hover:border-bodyGray-400 transition">
            <input type="file" className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0" multiple />
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-bodyGray-900">
                <UploadCloud className="h-10 w-10 text-boldWhite" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium text-bodyGray-900">Drop your files here or browse</p>
                <p className="text-sm text-bodyGray-500">Support files: DOCX, PDF, HTML</p>
                <p className="text-xs text-bodyGray-500">Max file size: 10MB</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-xl bg-boldWhite p-4 border border-bodyGray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-bodyGray-900 p-2">
                    <FileText className="h-6 w-6 text-boldWhite" />
                  </div>
                  <div>
                    <p className="font-medium text-bodyGray-900">invoice-template.docx</p>
                    <p className="text-xs text-bodyGray-500">2.4 MB • DOCX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-bodyGray-500">84%</span>
                  <Button variant="ghost" className="text-bodyGray-400 hover:text-bodyGray-900">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-bodyGray-300">
                <div className="h-full w-[84%] rounded-full bg-primary-500 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button className="bg-primary-600 text-boldWhite hover:bg-primary-700"> 
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
            <Button variant="outline" className="text-bodyGray-600 border-2 border-bodyGray-300 hover:bg-bodyGray-200">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Transition show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsDeleteOpen(false)}>
          <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
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
          </div>
        </Dialog>
      </Transition>

      {/* Template Selector Modal */}
      <Transition show={showTemplateSelector} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShowTemplateSelector(false)}>
          <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
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
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TemplatePage;