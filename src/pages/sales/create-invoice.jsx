import React, { useState } from "react";
import { Circle, Plus, Pencil, X } from "lucide-react";
import { nanoid } from "nanoid";

export const CreateInvoice = () => {
  /* ----------------------------- state ----------------------------- */
  const [invoiceType, setInvoiceType] = useState("tax"); // tax | supply
  const [invoice, setInvoice] = useState({
    prefix: "",
    number: "",
    date: new Date().toISOString().substring(0, 10),
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

  const [buyer, setBuyer] = useState(null); // fill when Select Buyer
  const [consigneeOption, setConsigneeOption] = useState("same"); // same | none | new

  const [items, setItems] = useState([
    { id: nanoid(), name: "", qty: 1, rate: 0, amount: 0 },
  ]);

  const [optionalOpen, setOptionalOpen] = useState({
    transportation: false,
    other: false,
  });

  /* ---------------------------- handlers --------------------------- */
  const handleInvoiceChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              amount:
                field === "qty" || field === "rate"
                  ? (field === "qty" ? value : item.qty) *
                    (field === "rate" ? value : item.rate)
                  : item.amount,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: nanoid(), name: "", qty: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleOptionalSection = (key) => {
    setOptionalOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ---------------------------- helpers ---------------------------- */
  const subTotal = items.reduce((sum, i) => sum + Number(i.amount || 0), 0);

  /* ----------------------------- jsx ------------------------------- */
  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-6 bg-boldWhite rounded-xl shadow-sm">
      {/* Invoice type */}
      <div className="flex gap-10 items-center">
        <label className="flex items-center gap-2 font-medium text-yellow-600">
          <input
            type="radio"
            value="tax"
            checked={invoiceType === "tax"}
            onChange={() => setInvoiceType("tax")}
          />
          Tax Invoice
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="supply"
            checked={invoiceType === "supply"}
            onChange={() => setInvoiceType("supply")}
          />
          Bill of Supply
        </label>
      </div>

      {/* Invoice + Supplier */}
      <div className="grid md:grid-cols-2 gap-6 border rounded-lg p-6">
        {/* left */}
        <div className="space-y-4">
          <div>
            <label className="text-sm">Invoice Prefix</label>
            <input
              type="text"
              value={invoice.prefix}
              onChange={(e) => handleInvoiceChange("prefix", e.target.value)}
              className="w-full border-b border-bodyGray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm">Invoice No.</label>
            <input
              type="text"
              value={invoice.number}
              onChange={(e) => handleInvoiceChange("number", e.target.value)}
              className="w-full border-b border-bodyGray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm">Invoice Date</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => handleInvoiceChange("date", e.target.value)}
              className="w-full border-b border-bodyGray-400 focus:outline-none"
            />
          </div>
        </div>
        {/* right */}
        <div className="bg-bodyGray-100 rounded-lg p-6 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold uppercase">{supplier.name}</h3>
            <Pencil size={16} className="cursor-pointer text-bodyGray-500" />
          </div>
          <div className="text-sm space-y-1 leading-5">
            <div>
              Mobile : <span className="font-medium">{supplier.mobile}</span>
            </div>
            <div>
              City : <span className="font-medium">{supplier.city}</span>
            </div>
            <div>
              State : <span className="font-medium">{supplier.state}</span>
            </div>
            <div>
              Pincode : <span className="font-medium">{supplier.pincode}</span>
            </div>
            <div>
              GSTIN : <span className="font-medium">{supplier.gstin}</span>
            </div>
            <div className="mt-2">
              <strong>Address :</strong> {supplier.address}
            </div>
          </div>
        </div>
      </div>

      {/* Buyer details */}
      <section className="border rounded-lg">
        <header className="bg-bodyGray-400 text-sm font-semibold px-4 py-2 flex justify-between items-center">
          <span>BUYER DETAILS</span>
          <div className="flex gap-4">
            <button className="px-3 py-1 border rounded shadow-sm text-sm">Select Buyer</button>
            <button className="px-3 py-1 border rounded shadow-sm text-sm">Add New Buyer</button>
          </div>
        </header>
        {/* buyer form could go here when a buyer is selected */}
      </section>

      {/* consignee options */}
      <div className="flex flex-col md:flex-row gap-6 border rounded-lg p-4">
        <label className="flex items-center gap-2 font-medium text-yellow-600">
          <input
            type="radio"
            name="consignee"
            value="same"
            checked={consigneeOption === "same"}
            onChange={() => setConsigneeOption("same")}
          />
          Show consignee (same as above)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="consignee"
            value="none"
            checked={consigneeOption === "none"}
            onChange={() => setConsigneeOption("none")}
          />
          Consignee not required
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="consignee"
            value="new"
            checked={consigneeOption === "new"}
            onChange={() => setConsigneeOption("new")}
          />
          Add Consignee (if different from above)
        </label>
      </div>

      {/* products */}
      <section className="border rounded-lg">
        <header className="bg-bodyGray-400 text-sm font-semibold px-4 py-2 flex justify-between items-center">
          <span>PRODUCTS</span>
          <div className="flex gap-4">
            <button className="px-3 py-1 border rounded shadow-sm text-sm" onClick={addItem}>
              <Plus size={14} /> Add New Item
            </button>
          </div>
        </header>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">#</th>
                <th className="py-2">Item Name</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Rate</th>
                <th className="py-2">Amount</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-2">{idx + 1}</td>
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                      className="w-full border-b border-bodyGray-400 focus:outline-none"
                      placeholder="Description"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, "qty", Number(e.target.value))}
                      className="w-20 border-b border-bodyGray-400 focus:outline-none text-right"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={0}
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                      className="w-28 border-b border-bodyGray-400 focus:outline-none text-right"
                    />
                  </td>
                  <td className="py-2 pr-2 text-right">₹{item.amount.toFixed(2)}</td>
                  <td className="py-2">
                    {items.length > 1 && (
                      <button onClick={() => removeItem(item.id)} className="text-red-500">
                        <X size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* summary */}
          <div className="flex justify-end pt-4 text-sm font-medium">
            Subtotal : ₹{subTotal.toFixed(2)}
          </div>
        </div>
      </section>

      {/* optional fields */}
      <section className="rounded-xl bg-bodyGray-300">
        <header className="text-center text-bodyGray-600 font-semibold py-2">
          OPTIONAL FIELDS
        </header>
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* transportation */}
          <div className="border rounded-lg overflow-hidden">
            <button
              className="w-full bg-bodyGray-400 text-sm font-semibold px-4 py-2 flex justify-between items-center"
              onClick={() => toggleOptionalSection("transportation")}
            >
              TRANSPORTATION DETAILS
              <span>{optionalOpen.transportation ? "▲" : "▼"}</span>
            </button>
            {optionalOpen.transportation && (
              <div className="p-4 text-sm text-bodyGray-500 space-y-2">
                {/* place your transportation fields here */}
                <input
                  type="text"
                  placeholder="Vehicle No."
                  className="w-full border-b border-bodyGray-400 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* other */}
          <div className="border rounded-lg overflow-hidden">
            <button
              className="w-full bg-bodyGray-400 text-sm font-semibold px-4 py-2 flex justify-between items-center"
              onClick={() => toggleOptionalSection("other")}
            >
              OTHER DETAILS
              <span>{optionalOpen.other ? "▲" : "▼"}</span>
            </button>
            {optionalOpen.other && (
              <div className="p-4 text-sm text-bodyGray-500 space-y-2">
                {/* place your other fields here */}
                <textarea
                  rows={3}
                  placeholder="Notes"
                  className="w-full border-b border-bodyGray-400 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* actions */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-bodyGray-300 rounded-md">Cancel</button>
        <button className="px-6 py-2 bg-primary-600 text-boldWhite rounded-md hover:bg-primary-700">
          Save Invoice
        </button>
      </div>
    </div>
  );
}
