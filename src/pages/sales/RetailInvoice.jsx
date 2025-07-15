import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Calculator, Receipt, User, MapPin, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

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

  // Quick add items for retail
  const quickItems = [
    { name: 'Coffee', price: 150 },
    { name: 'Sandwich', price: 200 },
    { name: 'Pastry', price: 120 },
    { name: 'Juice', price: 80 },
    { name: 'Water Bottle', price: 20 },
    { name: 'Chips', price: 50 }
  ];

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
      total: quickItem.price
    };
    setItems([...items, newItem]);
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

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Retail Invoice</h3>
            <p className="text-sm text-bodyGray-500">Quick billing for retail customers</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Save className="w-4 h-4 mr-2" />
                Save Draft
        </Button>
         <Button onClick={handlePrint} className="bg-primary-600 hover:bg-primary-700">
                <Receipt className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
            <ShoppingCart className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>       

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Customer Name"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                />
                <Input
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                />
              </div>
              <Input
                placeholder="Email (Optional)"
                value={customer.email}
                onChange={(e) => setCustomer({...customer, email: e.target.value})}
              />
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-bodyGray-400" />
                <textarea
                  placeholder="Address (Optional)"
                  value={customer.address}
                  onChange={(e) => setCustomer({...customer, address: e.target.value})}
                  className="w-full pl-10 p-3 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900  min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Add Items */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Add Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => addQuickItem(item)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-bodyGray-500">₹{item.price}</span>
                  </Button>
                ))}
              </div>
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
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border border-bodyGray-300  rounded-lg">
                    <div className="flex-1">
                      <Input
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-24">
                      <Input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-32">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-full md:w-24 flex items-center">
                      <span className="font-medium">₹{item.total.toFixed(2)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bill Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount:</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="px-3 py-2 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900 "
                  >
                    <option value="percentage">%</option>
                    <option value="amount">₹</option>
                  </select>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount Amount:</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Tax */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tax Rate (%):</label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                />
                <div className="flex justify-between text-sm">
                  <span>Tax Amount:</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-bodyGray-300 " />

              {/* Grand Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total:</span>
                <span className="text-primary-600">₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method:</label>
                <select className="w-full px-3 py-2 border border-bodyGray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900 ">
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Complete Sale
                </Button>
                <Button variant="outline" className="w-full">
                  Save & Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};