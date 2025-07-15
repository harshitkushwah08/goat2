import React, { useState } from "react";
import { FileText, Plus, Trash2, User, Building, Calculator} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const CreateInvoice = () => {
  const [invoiceType, setInvoiceType] = useState("tax");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  const [invoice, setInvoice] = useState({
    prefix: "INV",
    number: "001",
    date: new Date().toISOString().substring(0, 10),
    dueDate: "",
    poNumber: "",
    notes: ""
  });

  const [supplier, setSupplier] = useState({
    name: "YOGITA ENTERPRISES",
    mobile: "9926000396",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "452011",
    gstin: "23BHDPK0340J1ZT",
    address: "190, Karasdev Nagar Main Road Sukhliya",
  });

  const [buyer, setBuyer] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
    gstin: "",
    address: "",
  });

  const [items, setItems] = useState([
    { id: 1, name: "", description: "", qty: 1, rate: 0, discount: 0, tax: 18, amount: 0 },
  ]);

  const [consigneeOption, setConsigneeOption] = useState("same");

  const templates = [
    { id: 1, name: "Modern Template", preview: "/template1.jpg", description: "Clean and professional design" },
    { id: 2, name: "Classic Template", preview: "/template2.jpg", description: "Traditional business format" },
    { id: 3, name: "Minimal Template", preview: "/template3.jpg", description: "Simple and elegant layout" },
  ];

  const handleInvoiceChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleSupplierChange = (field, value) => {
    setSupplier((prev) => ({ ...prev, [field]: value }));
  };

  const handleBuyerChange = (field, value) => {
    setBuyer((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Calculate amount
          const subtotal = updatedItem.qty * updatedItem.rate;
          const discountAmount = (subtotal * updatedItem.discount) / 100;
          const taxableAmount = subtotal - discountAmount;
          const taxAmount = (taxableAmount * updatedItem.tax) / 100;
          updatedItem.amount = taxableAmount + taxAmount;
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", description: "", qty: 1, rate: 0, discount: 0, tax: 18, amount: 0 },
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalDiscount = items.reduce((sum, item) => sum + ((item.qty * item.rate * item.discount) / 100), 0);
    const taxableAmount = subtotal - totalDiscount;
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.qty * item.rate;
      const itemDiscount = (itemSubtotal * item.discount) / 100;
      const itemTaxable = itemSubtotal - itemDiscount;
      return sum + ((itemTaxable * item.tax) / 100);
    }, 0);
    const grandTotal = taxableAmount + totalTax;

    return { subtotal, totalDiscount, taxableAmount, totalTax, grandTotal };
  };

  const totals = calculateTotals();

  return (
    <div className="flex flex-col gap-6 bg-bodyGray-50  p-4 md:p-6 min-h-screen">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                <FileText className="h-6 w-6 text-primary-600" />
                Create Invoice
              </CardTitle>
              <CardDescription>
                Generate professional invoices for your business
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowTemplateSelector(true)}
              >
                {/* <Template className="w-4 h-4 mr-2" /> */}
                Select Template
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                {/* <Save className="w-4 h-4 mr-2" /> */}
                Save Invoice
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Choose Invoice Template</CardTitle>
              <Button variant="ghost" onClick={() => setShowTemplateSelector(false)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50 '
                      : 'border-bodyGray-300  hover:border-primary-200'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="aspect-[3/4] bg-bodyGray-100  rounded mb-3 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-bodyGray-400" />
                  </div>
                  <h3 className="font-medium text-bodyGray-900 ">{template.name}</h3>
                  <p className="text-sm text-bodyGray-500 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowTemplateSelector(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => setShowTemplateSelector(false)}
                className="bg-primary-600 hover:bg-primary-700"
                disabled={!selectedTemplate}
              >
                Use Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Type Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex items-center gap-2 font-medium text-yellow-600 cursor-pointer">
              <input
                type="radio"
                value="tax"
                checked={invoiceType === "tax"}
                onChange={() => setInvoiceType("tax")}
                className="text-yellow-600"
              />
              Tax Invoice
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="supply"
                checked={invoiceType === "supply"}
                onChange={() => setInvoiceType("supply")}
              />
              Bill of Supply
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details & Supplier Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-bodyGray-800 ">Invoice Prefix</label>
                <Input
                  value={invoice.prefix}
                  onChange={(e) => handleInvoiceChange("prefix", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-bodyGray-800 ">Invoice No.</label>
                <Input
                  value={invoice.number}
                  onChange={(e) => handleInvoiceChange("number", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-bodyGray-800 ">Invoice Date</label>
                <Input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => handleInvoiceChange("date", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-bodyGray-800 ">Due Date</label>
                <Input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => handleInvoiceChange("dueDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-bodyGray-800 ">PO Number (Optional)</label>
              <Input
                value={invoice.poNumber}
                onChange={(e) => handleInvoiceChange("poNumber", e.target.value)}
                placeholder="Purchase Order Number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Supplier Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Supplier Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={supplier.name}
              onChange={(e) => handleSupplierChange("name", e.target.value)}
              placeholder="Company Name"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={supplier.mobile}
                onChange={(e) => handleSupplierChange("mobile", e.target.value)}
                placeholder="Mobile"
              />
              <Input
                value={supplier.gstin}
                onChange={(e) => handleSupplierChange("gstin", e.target.value)}
                placeholder="GSTIN"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                value={supplier.city}
                onChange={(e) => handleSupplierChange("city", e.target.value)}
                placeholder="City"
              />
              <Input
                value={supplier.state}
                onChange={(e) => handleSupplierChange("state", e.target.value)}
                placeholder="State"
              />
              <Input
                value={supplier.pincode}
                onChange={(e) => handleSupplierChange("pincode", e.target.value)}
                placeholder="Pincode"
              />
            </div>
            <textarea
              value={supplier.address}
              onChange={(e) => handleSupplierChange("address", e.target.value)}
              placeholder="Address"
              className="w-full p-3 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900 min-h-20"
            />
          </CardContent>
        </Card>
      </div>

      {/* Buyer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Buyer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={buyer.name}
              onChange={(e) => handleBuyerChange("name", e.target.value)}
              placeholder="Customer Name"
            />
            <Input
              value={buyer.mobile}
              onChange={(e) => handleBuyerChange("mobile", e.target.value)}
              placeholder="Mobile"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={buyer.email}
              onChange={(e) => handleBuyerChange("email", e.target.value)}
              placeholder="Email"
            />
            <Input
              value={buyer.gstin}
              onChange={(e) => handleBuyerChange("gstin", e.target.value)}
              placeholder="GSTIN (Optional)"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              value={buyer.city}
              onChange={(e) => handleBuyerChange("city", e.target.value)}
              placeholder="City"
            />
            <Input
              value={buyer.state}
              onChange={(e) => handleBuyerChange("state", e.target.value)}
              placeholder="State"
            />
            <Input
              value={buyer.pincode}
              onChange={(e) => handleBuyerChange("pincode", e.target.value)}
              placeholder="Pincode"
            />
          </div>
          <textarea
            value={buyer.address}
            onChange={(e) => handleBuyerChange("address", e.target.value)}
            placeholder="Address"
            className="w-full p-3 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900 min-h-20"
          />
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Items</CardTitle>
            <Button onClick={addItem} size="sm" className="bg-primary-600 hover:bg-primary-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bodyGray-300 ">
                  <th className="text-left py-2 px-2">#</th>
                  <th className="text-left py-2 px-2">Item Name</th>
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-left py-2 px-2">Qty</th>
                  <th className="text-left py-2 px-2">Rate</th>
                  <th className="text-left py-2 px-2">Discount %</th>
                  <th className="text-left py-2 px-2">Tax %</th>
                  <th className="text-left py-2 px-2">Amount</th>
                  <th className="text-left py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-bodyGray-100 ">
                    <td className="py-2 px-2">{idx + 1}</td>
                    <td className="py-2 px-2">
                      <Input
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                        placeholder="Item name"
                        className="min-w-32"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        placeholder="Description"
                        className="min-w-32"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => handleItemChange(item.id, "qty", Number(e.target.value))}
                        className="w-20"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                        className="w-24"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={item.discount}
                        onChange={(e) => handleItemChange(item.id, "discount", Number(e.target.value))}
                        className="w-20"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        min={0}
                        value={item.tax}
                        onChange={(e) => handleItemChange(item.id, "tax", Number(e.target.value))}
                        className="w-20"
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-medium">₹{item.amount.toFixed(2)}</td>
                    <td className="py-2 px-2">
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Totals and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={invoice.notes}
              onChange={(e) => handleInvoiceChange("notes", e.target.value)}
              placeholder="Terms and conditions, notes, etc."
              className="w-full p-3 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900  min-h-32"
            />
          </CardContent>
        </Card>

        {/* Totals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Invoice Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Total Discount:</span>
              <span>-₹{totals.totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxable Amount:</span>
              <span>₹{totals.taxableAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Tax:</span>
              <span>₹{totals.totalTax.toFixed(2)}</span>
            </div>
            <hr className="border-bodyGray-300 " />
            <div className="flex justify-between text-lg font-bold">
              <span>Grand Total:</span>
              <span className="text-primary-600">₹{totals.grandTotal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline">Preview</Button>
            <Button className="bg-primary-600 hover:bg-primary-700">
              Generate Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};