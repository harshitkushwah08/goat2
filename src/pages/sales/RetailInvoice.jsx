import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator, 
  Receipt, 
  User, 
  MapPin, 
  Save,
  CreditCard,
  Printer,
  ArrowLeft,
  Package,
  FileText,
  Clock,
  Tag,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { PageHeader } from '../../components/ui/PageHeader';

export const RetailInvoice = () => {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [items, setItems] = useState([
    { id: 1, name: '', price: 0, quantity: 1, total: 0 }
  ]);

  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage'); // percentage or amount
  const [taxRate, setTaxRate] = useState(18);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Quick add items for retail
  const quickItems = [
    { name: 'Coffee', price: 150, category: 'Beverages' },
    { name: 'Sandwich', price: 200, category: 'Food' },
    { name: 'Pastry', price: 120, category: 'Bakery' },
    { name: 'Juice', price: 80, category: 'Beverages' },
    { name: 'Water Bottle', price: 20, category: 'Beverages' },
    { name: 'Chips', price: 50, category: 'Snacks' }
  ];

  // Inventory items
  const inventoryItems = [
    { id: 101, name: 'Laptop', price: 45000, stock: 12, category: 'Electronics' },
    { id: 102, name: 'Smartphone', price: 25000, stock: 20, category: 'Electronics' },
    { id: 103, name: 'Headphones', price: 2500, stock: 35, category: 'Accessories' },
    { id: 104, name: 'Office Chair', price: 8000, stock: 8, category: 'Furniture' },
    { id: 105, name: 'Desk Lamp', price: 1200, stock: 15, category: 'Lighting' },
  ];

  const [showInventory, setShowInventory] = useState(false);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      price: 0,
      quantity: 1,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'price' || field === 'quantity') {
          updatedItem.total = updatedItem.price * updatedItem.quantity;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addQuickItem = (quickItem) => {
    const newItem = {
      id: Date.now(),
      name: quickItem.name,
      price: quickItem.price,
      quantity: 1,
      total: quickItem.price,
      category: quickItem.category
    };
    setItems([...items, newItem]);
  };

  const addInventoryItem = (invItem) => {
    const newItem = {
      id: Date.now(),
      name: invItem.name,
      price: invItem.price,
      quantity: 1,
      total: invItem.price,
      category: invItem.category,
      inventoryId: invItem.id
    };
    setItems([...items, newItem]);
    setShowInventory(false);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discountType === 'percentage' 
    ? (subtotal * discount) / 100 
    : discount;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    console.log("Saving invoice...");
    // Add save logic here
  };

  const handleCompleteSale = () => {
    console.log("Completing sale...");
    // Add complete sale logic here
  };

  return (
    <div className="flex flex-col gap-5 bg-bodyGray-50 p-6 min-h-screen">
      <PageHeader
        title="Retail Invoice"
        description="Quick billing for retail customers"
        icon={<ShoppingCart className="h-6 w-6 text-bodyGray-800" />}
        actions={[
          {
            label: "Save Draft",
            icon: <Save className="w-4 h-4" />,
            onClick: handleSave,
            className: "bg-bodyGray-800 text-boldWhite hover:bg-bodyGray-700"
          },
          {
            label: "Print Invoice",
            icon: <Printer className="w-4 h-4" />,
            onClick: handlePrint
          }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary-600" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Customer Name"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  className="border-bodyGray-300 focus:border-primary-500"
                />
                <Input
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  className="border-bodyGray-300 focus:border-primary-500"
                />
              </div>
              <Input
                placeholder="Email (Optional)"
                value={customer.email}
                onChange={(e) => setCustomer({...customer, email: e.target.value})}
                className="border-bodyGray-300 focus:border-primary-500"
              />
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-bodyGray-400" />
                <textarea
                  placeholder="Address (Optional)"
                  value={customer.address}
                  onChange={(e) => setCustomer({...customer, address: e.target.value})}
                  className="w-full pl-10 p-3 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite text-bodyGray-900 min-h-20 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Add Items */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Quick Add Items</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowInventory(!showInventory)}
                  className="text-primary-600 border-primary-300"
                >
                  <Package className="w-4 h-4 mr-2" />
                  {showInventory ? "Hide Inventory" : "Show Inventory"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showInventory ? (
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      className="w-full pl-10 p-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                  </div>
                  <div className="overflow-auto max-h-60">
                    <table className="min-w-full divide-y divide-bodyGray-200">
                      <thead className="bg-bodyGray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-bodyGray-500 uppercase tracking-wider">Item</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-bodyGray-500 uppercase tracking-wider">Price</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-bodyGray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-bodyGray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-bodyGray-200">
                        {inventoryItems.map((item) => (
                          <tr key={item.id} className="hover:bg-bodyGray-50">
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-bodyGray-900">{item.name}</span>
                                <span className="text-xs text-bodyGray-500">{item.category}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-bodyGray-900">₹{item.price}</td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <Badge variant={item.stock > 10 ? "success" : item.stock > 0 ? "warning" : "destructive"}>
                                {item.stock}
                              </Badge>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => addInventoryItem(item)}
                                className="text-primary-600 hover:bg-primary-50"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => addQuickItem(item)}
                      className="h-auto p-3 flex flex-col items-center gap-1 border-bodyGray-300 hover:border-primary-500 hover:bg-primary-50"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-bodyGray-500">₹{item.price}</span>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  Items
                </CardTitle>
                <Button onClick={addItem} size="sm" className="bg-primary-600 hover:bg-primary-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border border-bodyGray-200 rounded-lg bg-bodyGray-50">
                    <div className="flex-1">
                      <Input
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="border-bodyGray-300 focus:border-primary-500 bg-white"
                      />
                    </div>
                    <div className="w-full md:w-24">
                      <Input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="border-bodyGray-300 focus:border-primary-500 bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-32">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                        className="border-bodyGray-300 hover:bg-bodyGray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="text-center border-bodyGray-300 focus:border-primary-500 bg-white"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                        className="border-bodyGray-300 hover:bg-bodyGray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-full md:w-24 flex items-center">
                      <span className="font-medium text-bodyGray-900">₹{item.total.toFixed(2)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes, terms and conditions..."
                className="w-full p-3 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-bodyGray-900 min-h-24 resize-none"
              />
              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-bodyGray-600">
                  I confirm that this sale complies with all applicable tax regulations and business policies.
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bill Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary-600" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Invoice Info */}
              <div className="bg-bodyGray-50 p-3 rounded-lg border border-bodyGray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-bodyGray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> Date:
                  </span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-bodyGray-600 flex items-center">
                    <Tag className="w-4 h-4 mr-1" /> Invoice #:
                  </span>
                  <span className="font-medium">INV-{Math.floor(Math.random() * 10000)}</span>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-bodyGray-600">Subtotal:</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-bodyGray-700">Discount:</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="border-bodyGray-300 focus:border-primary-500"
                  />
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="px-3 py-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-bodyGray-900"
                  >
                    <option value="percentage">%</option>
                    <option value="amount">₹</option>
                  </select>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-bodyGray-600">Discount Amount:</span>
                  <span className="text-red-600 font-medium">-₹{discountAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Tax */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-bodyGray-700">Tax Rate (%):</label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="border-bodyGray-300 focus:border-primary-500"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-bodyGray-600">Tax Amount:</span>
                  <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-bodyGray-200" />

              {/* Grand Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total:</span>
                <span className="text-primary-600">₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-bodyGray-700">Payment Method:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'cash', label: 'Cash', icon: <CreditCard className="w-4 h-4" /> },
                    { value: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
                    { value: 'upi', label: 'UPI', icon: <CreditCard className="w-4 h-4" /> },
                  ].map(method => (
                    <Button
                      key={method.value}
                      type="button"
                      variant={paymentMethod === method.value ? "default" : "outline"}
                      className={`flex items-center justify-center gap-1 ${
                        paymentMethod === method.value 
                          ? "bg-primary-600 text-white" 
                          : "border-bodyGray-300 text-bodyGray-700"
                      }`}
                      onClick={() => setPaymentMethod(method.value)}
                    >
                      {method.icon}
                      {method.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  onClick={handleCompleteSale}
                  disabled={!termsAccepted || items.length === 0 || items.some(item => !item.name || item.price <= 0)}
                >
                  Complete Sale
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full border-bodyGray-300">
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                  <Button variant="outline" className="w-full border-bodyGray-300">
                    <Printer className="w-4 h-4 mr-2" /> Print
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-bodyGray-300 text-bodyGray-700"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 border border-bodyGray-200 rounded-lg hover:bg-bodyGray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Receipt className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">INV-{1000 + i}</p>
                        <p className="text-xs text-bodyGray-500">{i * 5} mins ago</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{(i * 1000 + 500).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-3 text-primary-600 hover:bg-primary-50">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RetailInvoice;