import React from 'react';
import { Calculator, Plus,Equal } from 'lucide-react';

export const GSTCalc = () => {
  const [type, setType] = React.useState("inclusive");
  const [gst, setGst] = React.useState(18);
  const [amount, setAmount] = React.useState("");

  const gstRate = parseFloat(gst);
  const amt = parseFloat(amount);

  let gstAmount = 0;
  let total = 0;

  if (!isNaN(amt)) {
    if (type === "inclusive") {
      const base = amt / (1 + gstRate / 100);
      gstAmount = amt - base;
      total = amt;
    } else {
      gstAmount = amt * (gstRate / 100);
      total = amt + gstAmount;
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-boldWhite p-5 ">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">G.S.T Calculator</h3>
            <p className="text-sm text-bodyGray-500">G.S.T Calculation Made Easy</p>
          </div>
          <div className="rounded-lg bg-boldWhite p-2 ">
            <Calculator className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 p-5'>
        <h2 className='text-2xl font-semibold text-boldWhite rounded-lg bg-primary-500 p-5'>GST- Goods and Services Tax</h2>
        <p className='text-md text-bodyGray-400 px-2'>GST or the Goods and Services Tax is an indirect tax that came into effect in India on the 1st of July, 2017. GST is levied on goods and services and has replaced other indirect taxes that were in effect before it came into use.</p>
</div>

   <div className="mt-6 w-full flex flex-wrap justify-center items-center gap-8">
  <div className='w-1/4'>
    <label htmlFor='amount' className="text-sm font-medium text-bodyGray-800">Amount</label>
    <input
      id='amount'
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter amount"
      className="mt-2 w-full p-3 border border-bodyGray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
    />
  </div>

  <Plus className="h-6 w-6 text-bodyGray-500 mt-6" />

  <div className='w-1/4'>
    <label htmlFor='gst' className="text-sm font-medium text-bodyGray-800">GST %</label>
    <select
      id="gst"
      value={gst}
      onChange={e => setGst(e.target.value)}
      className="mt-2 w-full p-3 border border-bodyGray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-boldWhite text-bodyGray-800"
    >
      <option value={5}>5%</option>
      <option value={12}>12%</option>
      <option value={18}>18%</option>
      <option value={28}>28%</option>
    </select>
  </div>

  <Plus className="h-6 w-6 text-bodyGray-500 mt-6" />

  <div className='w-1/4'>
    <label htmlFor='type' className="text-sm font-medium text-bodyGray-800">GST Type</label>
    <select
      id="type"
      value={type}
      onChange={e => setType(e.target.value)}
      className="mt-2 w-full p-3 border border-bodyGray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-boldWhite text-bodyGray-800"
    >
      <option value="inclusive">Inclusive</option>
      <option value="exclusive">Exclusive</option>
    </select>
  </div>
</div>

<div className="mt-10 flex flex-row items-center justify-center gap-10 p-5">
  <div className="text-center w-85">
    <div className="text-4xl font-semibold text-bodyGray-900 max-w-[650px] mx-auto truncate overflow-hidden boldWhitespace-nowrap">
      ₹{!isNaN(amt) ? amt.toLocaleString('en-IN', { minimumFractionDigits: 1 }) : "0.0"}
    </div>
    <p className="text-blue-400 mt-4">Base Amount</p>
  </div>

  <Plus className="h-6 w-6 text-bodyGray-400" />

  <div className="text-center w-85">
    <div className="text-4xl font-semibold text-bodyGray-900 max-w-[650px] mx-auto truncate overflow-hidden boldWhitespace-nowrap">
      ₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
    </div>
    <p className="text-bodyGray-400 mt-4">GST Amount</p>
  </div>

  <Equal className="h-6 w-6 text-bodyGray-400" />

  <div className="text-center w-85">
    <div className="text-4xl font-semibold text-primary-600 max-w-[650px] mx-auto truncate overflow-hidden boldWhitespace-nowrap">
      ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
    </div>
    <p className="text-primary-600 mt-4">Total Amount</p>
  </div>
</div>

<div className=" p-5 mb-4">
  <h2 className="text-2xl bg-primary-500 my-5 font-semibold text-boldWhite p-5 rounded-lg ">
    How can you calculate GST with this tool?
  </h2>
  <p className="text-bodyGray-500 mb-3 p-2">
    With the free GST calculator, you can calculate the tax amount in three simple steps.
    The tool provides you with three fields that have to be filled, and it calculates GST
    automatically based on what you fill in.
  </p>
  <ol className="relative border-l border-primary-200 space-y-10 p-5 ml-5">
    <li className="ml-2">
      <div className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-primary-600 text-boldWhite rounded-full text-sm font-bold">1</div>
      <p className="text-bodyGray-800">Enter the price of the goods or services in the Amount field.</p>
    </li>
    <li className="ml-2">
      <div className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-primary-600 text-boldWhite rounded-full text-sm font-bold">2</div>
      <p className="text-bodyGray-800">Enter the percentage of GST, or the slab that the product comes under, in the GST % field.</p>
    </li>
    <li className="ml-2">
      <div className="absolute -left-3.5 flex items-center justify-center w-7 h-7 bg-primary-600 text-boldWhite rounded-full text-sm font-bold">3</div>
      <p className="text-bodyGray-800">
        Choose if the price that you entered is inclusive or exclusive of tax in the Tax field.
        <br />
        <br />
        If the price you've entered is <strong>inclusive</strong> of tax, the tool automatically calculates, and displays the original price of the goods or service after subtracting the GST.
        <br />
        <br />
        If the price you've entered is <strong>exclusive</strong> of tax, the tool automatically adds the GST and gives the final price.
      </p>
    </li>
  </ol>
</div>

    </div>

  );
};
