import React, { useState, useEffect,useRef,lazy  } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import ImageModule from "docxtemplater-image-module-free";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ComposedChart } from "recharts";
import { DocumentTextIcon } from "@heroicons/react/24/outline";


const DashboardPage = () => {
    const graphRef = useRef(null);
    const graphRefSaving = useRef(null);
    const [formData, setFormData] = useState({
        date: "",
        reference: "",
        projectSize: "",
        customerName: "",
        customerAddress: "",
        customerPhone: "",
        customerMail: "",
        tariffEssclation: "1.5%",
        consumptionIncrement: "1.0%",
        generationDegration: "0.5%",
        totalDaily: "",
        perKwMonthly: "",
        totalMonthly: "",
        perKwYearly: "",
        totalYearly: "",
        yearlyConsumption: "25000",
        electricityRate: "11.00",
        discomName: "Adani",
        companyName: `ROCKET SALES CORPORATION`,
        companyAddress: `118, KARAS DEV NAGAR, NEAR ITI COLLEGE, Sukhliya, Indore, Madhya-Pradesh, 452011`,
        companyPhone: `9893110268`,
        companyMail:`rocketsales1978@rediffmail.com`,
        companyGst: `23AOZPK2468M1Z6`,
        companyPoc: `Mr. RAJESH KUSHWAH`,
        wattPeak: `550 Wp`,
        noOfPanels: `28 `,
        panelType: `Mono Prec Half Cut`,
        panelBrand: `Adani/Waaree/Tata`,
        panelWarranty: `12 Years / 30 Years `,
        sizeKw: `15 kW`,
        inverterMake: `Growatt/SunGrow/Waaree`,
        phase: `Three Phase`,
        type: `Hybrid Inverter`,
        quantity: `2`,
        inverterWarranty: `7 Years (Product)`, 
        cableMake: `Polycab/Havells`,
        ac: `Core 0.4 sqmm`,
        dc: `Core 4 sqmm `,
        structureType: `Aluminum`,
        structureDes: `9' civil work above that pre-GI structure with 2 feet`,
        all: `Net & Solar Meter: Genus / Secure \nDC Cables & Conduits: Havells/Polycab \nAC Cables: Havells/Polycab \nDCDB: Reputed Make \nACDB: Reputed Make \nTermination Accessories: Reputed Make \nEarthing (Pits, Strips and Cables): Reputed Make - 3 Nos. \nLightning Arrestor: Reputed Make - 1 Nos. \n`,
        bosWarranty: `1 Year(s)`,
        paymentTerms: `1. 80% advance payment along with confirmed purchase order. \n2. 20% after completion of job.`,
        paymentMode: `Payment mode: account payee Cheque or Online.`,
        companyBankDetails: `Payment Can Be Paid In Cash Or Cheque: \nBank Details: Bank of India \nAccount Name - ROCKET SALES CORPORATION \nAccount No. - 880830110000078 \nIFSC Code - BKID0008808 \nBranch - SNEH NAGAR BRANCH INDORE MP 482001 \n`,
        ourScopeDetails: `1. Preparation of Engineering Drawing, Design for solar structure and solar power plant as per relevant IS standard \n2. Supply of Solar Modules, Inverters, Structures, Cables, and Balance of Plant . Installation of structure, solar modules, inverter, AC-DC cable, LT panel etc for solar power plant \n3. Installation of monitoring and controlling system for solar power plant \n4. Commissioning of Solar Power Plant and supply of power to LT panel of SGD  \n5. Zero Export Device installation \n`,
        customerScopeDetails: `1. Providing safe storage place for material during installation & commissioning period. \n2. Provide space for to evacuate the solar power \n3. Design/ Drawing approval within  days \n`,
        companyTermsConditions: `Packing is included in the offer \nTransportation charges our scope \nCivil and digging are at customer scope \n Prices quotes are firm and valid for 30 days from the date of offer. After this period a reconfirmation from our office should be taken.\nWater supply at site will be provided by customer free of cost during the time of installation and commissioning \nClosed, covered, locked stores will be provided by customer during the time of installation and commissioning \nWe will start the approval process as soon as we receive order conformation. From the time of confirmation till days before installation day, there will be a nominal cancellation charge of INR, or % of system cost, whichever is higher. \nDelivery: - weeks from the date of technically and commercially cleared order \nForce Major clause: this quotation as well as the resulting contract are subject to the standard force Majuro condition \nInclude licensing charges.\n`,
        systemPrice: `352850`,
        gstRate:`13.80`,
        addCharges:`1500`,
        netLia:`10000`,
        subsidy:`78000`
    });
    const borderColor = "border-primary-500";
    const [monthlyData, setMonthlyData] = useState([]);
    const [BillData, setBillData] = useState([]);
    const textAreaContainerRef = useRef(null);

    useEffect(() => {
      if (textAreaContainerRef.current) {
        const textareas = textAreaContainerRef.current.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`; 
        });
      }
    }, [formData]); 
  

    useEffect(() => {
        const systemPrice = parseFloat(formData.systemPrice) || 0;
        const gstRate = parseFloat(formData.gstRate) / 100 || 0;
        const addCharges = parseFloat(formData.addCharges) || 0;
        const netLia = parseFloat(formData.netLia) || 0;
        const subsidy = parseFloat(formData.subsidy) || 0;

        const gstPrice = systemPrice * gstRate;
        const totalPrice = gstPrice + systemPrice;
        const costToCust = totalPrice + addCharges + netLia;
        const effPrice = costToCust - subsidy;
        const treeSaved = Math.floor(parseFloat(formData.projectSize) * 15.5);
        const co2Reduction = Math.floor(parseFloat(formData.projectSize) * 0.83);

        const billBeforeSolar = parseFloat(formData.electricityRate) * parseFloat(formData.yearlyConsumption);
        const solarSavings = parseFloat(formData.electricityRate) * parseFloat(formData.totalYearly);
        const billAfterSolar = billBeforeSolar - solarSavings;
        const payBackPeriod = (parseFloat(formData.costToCust))/ solarSavings; 



        setFormData((prevData) => ({
            ...prevData,
            gstPrice: gstPrice.toFixed(2),
            totalPrice: totalPrice.toFixed(2),
            costToCust: costToCust.toFixed(2),
            effPrice: effPrice.toFixed(2),
            treeSaved: treeSaved,
            co2Reduction: co2Reduction,
            billBeforeSolar: billBeforeSolar,
            solarSavings: solarSavings.toFixed(2),
            billAfterSolar: billAfterSolar,
            payBackPeriod: payBackPeriod.toFixed(2)
        }));
    }, [formData.systemPrice, formData.gstRate, formData.addCharges, formData.netLia, formData.subsidy,formData.projectSize, formData.electricityRate, formData.yearlyConsumption, formData.totalYearly, formData.costToCust]);

    useEffect(() => {
        const billBeforeSolar_Graph = parseFloat(formData.electricityRate) * parseFloat(formData.yearlyConsumption);
        const solarSavings_Graph = parseFloat(formData.electricityRate) * parseFloat(formData.totalYearly);
        const billAfterSolar_Graph = billBeforeSolar_Graph - solarSavings_Graph;

        let graphData = [];
        let electricityRate_Graph = parseFloat(formData.electricityRate);
        let yearlyConsumption_Graph = parseFloat(formData.yearlyConsumption);
        let solarGeneration_Graph = parseFloat(formData.totalYearly);

        for (let i = 0; i < 30; i++) {
            electricityRate_Graph += (electricityRate_Graph * parseFloat(formData.tariffEssclation) / 100);
            yearlyConsumption_Graph += (yearlyConsumption_Graph * parseFloat(formData.consumptionIncrement) / 100);
            solarGeneration_Graph -= (solarGeneration_Graph * parseFloat(formData.generationDegration) / 100);

            const billBeforeSolar_Graph2 = electricityRate_Graph * yearlyConsumption_Graph;
            const solarSavings_Graph2 = electricityRate_Graph * solarGeneration_Graph;
            const billAfterSolar_Graph2 = billBeforeSolar_Graph2 - solarSavings_Graph2;

            graphData.push({
                year: i + 1,
                billBeforeSolar: parseFloat(billBeforeSolar_Graph2.toFixed(2)),
                billAfterSolar: parseFloat(billAfterSolar_Graph2.toFixed(2)),
            });
        }

        setBillData(graphData);
    }, [formData.projectSize, formData.electricityRate, formData.yearlyConsumption, formData.totalYearly, formData.tariffEssclation, formData.consumptionIncrement, formData.generationDegration]);
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            let updatedData = { ...prevData, [name]: value };

            if (name === "projectSize") {
                updatedData = {
                    ...updatedData,
                    totalDaily: value * 5,
                    perKwMonthly: value * 30,
                    totalMonthly: value * 30 * 5,
                    perKwYearly: value * 30 * 12,
                    totalYearly: value * 30 * 12 * 5,
                };
            }
            return updatedData;
        });
    };
    useEffect(() => {
        const totalYearly = parseFloat(formData.totalYearly);
    
        const calculateMonthData = (percentage) => {
          const generationUnits = totalYearly * (percentage / 100);
          const savings = generationUnits * parseFloat(formData.electricityRate);
          return { generationUnits: generationUnits.toFixed(2), savings: savings.toFixed(2) };
        };
    
        const months = [
          { name: "January", percentage: 9.0 },
          { name: "February", percentage: 9.0 },
          { name: "March", percentage: 10.0 },
          { name: "April", percentage: 10.0 },
          { name: "May", percentage: 10.0 },
          { name: "June", percentage: 7.5 },
          { name: "July", percentage: 6.5 },
          { name: "August", percentage: 6.5 },
          { name: "September", percentage: 7.0 },
          { name: "October", percentage: 8.0 },
          { name: "November", percentage: 8.0 },
          { name: "December", percentage: 8.5 },
        ];
    
        const calculatedData = months.map((month) => {
          const { generationUnits, savings } = calculateMonthData(month.percentage);
          return {
            month: month.name,
            GenerationUnits: parseFloat(generationUnits),
            Savings: parseFloat(savings),
          };
        });
    
        setMonthlyData(calculatedData);
      }, [formData.totalYearly, formData.electricityRate]);

    const formatMultiLineText = (text) => {
        return text
            .split("\n") 
            .map(line => line.trim().replace(/^-\s*/, "")) 
            .filter(line => line) 
            .map(line => ({ text: `• ${line}` }));
    };

    const generateDocuments = async () => {
        try {
            if (!graphRef.current) throw new Error("Graph element not found!");
            if (!graphRefSaving.current) throw new Error("Graph element not found!");

            const canvas = await html2canvas(graphRef.current);
            const canvasSaving = await html2canvas(graphRefSaving.current);
            const imgData = canvas.toDataURL("image/jpeg").replace(/^data:image\/jpeg;base64,/, ""); 
            const imgDataSaving = canvasSaving.toDataURL("image/jpeg").replace(/^data:image\/jpeg;base64,/, ""); 
        
            const response = await fetch("./template.docx");
            if (!response.ok) throw new Error("Failed to load template");
            const blob = await response.blob();
            
            const arrayBuffer = await blob.arrayBuffer();
            const zip = new PizZip(arrayBuffer);

            const imageModule = new ImageModule({
                centered: true, 
                getImage: (tagValue) => Uint8Array.from(atob(tagValue), (c) => c.charCodeAt(0)), 
                getSize: () => [720, 370],
              });
          

              const doc = new Docxtemplater(zip, { modules: [imageModule] });

            const formattedData = {
                ...formData,
                companyTermsConditions: formatMultiLineText(formData.companyTermsConditions),
                ourScopeDetails: formatMultiLineText(formData.ourScopeDetails),
                customerScopeDetails: formatMultiLineText(formData.customerScopeDetails),
                paymentTerms: formatMultiLineText(formData.paymentTerms),
                companyBankDetails: formatMultiLineText(formData.companyBankDetails),
                all: formatMultiLineText(formData.all),
                graphBillImage: imgData,
                graphSavingImage: imgDataSaving,
                monthlyData: monthlyData.map((data) => ({
                    month: data.month,
                    generationUnits: data.GenerationUnits,
                    savings: data.Savings,
                })),
                ...monthlyData.reduce((acc, data) => {
                    acc[`${data.month.toLowerCase()}_generation`] = data.GenerationUnits;
                    acc[`${data.month.toLowerCase()}_savings`] = data.Savings;
                    return acc;
                }, {}),
            };
            
            doc.setData(formattedData);
            doc.render();
            
            const output = doc.getZip().generate({ type: "blob" });
            saveAs(output, `${formData.projectSize}kW_${formData.customerName}_Quotation-${formData.reference}.docx`);
        } catch (error) {
            console.error("Error generating document:", error);
        }
    };


    return (
        <div className="flex flex-row items-center justify-center mt-5 min-h-screen flex-wrap max-w-full  bg-boldWhite">

<form onSubmit={(e) => { e.preventDefault(); generateDocuments(); }} className="flex flex-col gap-10">
<div className="flex flex-col gap-5 items-center w-[80%] max-w-full mx-auto " ref={textAreaContainerRef}>
<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>
    Project Details
  </h2>
  <span className="flex flex-col">
  <label htmlFor="date" aria-label="date" className="text-bodyGray-400 text-sm ml-3">Date</label>
  <input
    type="date"
    id="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
 </span>
 <span className="flex flex-col">
 <label htmlFor="reference" className="text-bodyGray-400 text-sm ml-3">Reference No.</label>
  <input
    type="text"
    name="reference"
    placeholder="Reference No."
    value={formData.reference}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
 </span>
 
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>
    Customer Details
  </h2>
<span className="flex flex-col">
<label htmlFor="projectSize" className="text-bodyGray-400 text-sm ml-3">Project Size (kW)</label>
  <input
    type="text"
    name="projectSize"
    placeholder="Project Size (kW)"
    value={formData.projectSize}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</span>

<span className="flex flex-col">
<label htmlFor="customerName" className="text-bodyGray-400 text-sm ml-3">Customer Name</label>
  <input
    type="text"
    name="customerName"
    placeholder="Customer Name"
    value={formData.customerName}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</span>
  
<span className="flex flex-col">
<label htmlFor="customerAddress" className="text-bodyGray-400 text-sm ml-3">Customer Address</label>
  <input
    type="text"
    name="customerAddress"
    placeholder="Customer Address"
    value={formData.customerAddress}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</span>
 
<span className="flex flex-col">
<label htmlFor="customerPhone" className="text-bodyGray-400 text-sm ml-3">Customer Phone</label>
  <input
    type="text"
    name="customerPhone"
    placeholder="Customer Phone"
    value={formData.customerPhone}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</span>

</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Factors Details</h2>

  <span className="flex flex-col">
    <label htmlFor="tariffEssclation" className="text-bodyGray-400 text-sm ml-3">Tariff Escalation %</label>
    <input 
      type="text" 
      id="tariffEssclation" 
      name="tariffEssclation" 
      placeholder="Tariff Escalation %" 
      value={formData.tariffEssclation} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="consumptionIncrement" className="text-bodyGray-400 text-sm ml-3">Consumption Increment %</label>
    <input 
      type="text" 
      id="consumptionIncrement" 
      name="consumptionIncrement" 
      placeholder="Consumption Increment %" 
      value={formData.consumptionIncrement} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="generationDegration" className="text-bodyGray-400 text-sm ml-3">Generation Degradation %</label>
    <input 
      type="text" 
      id="generationDegration" 
      name="generationDegration" 
      placeholder="Generation Degradation %" 
      value={formData.generationDegration} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>


<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Consumption Details</h2>

  <div className="flex space-x-2">
    <span className="flex flex-col w-full">
      <label htmlFor="projectSize" className="text-bodyGray-400 text-sm ml-3">Per kW Daily (kWh)</label>
      <input 
        type="text" 
        id="projectSize" 
        name="projectSize" 
        placeholder="Per kW Daily (kWh)" 
        value={formData.projectSize} 
        onChange={handleChange} 
        required 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
    <span className="flex flex-col w-full">
      <label htmlFor="totalDaily" className="text-bodyGray-400 text-sm ml-3">Total Daily (kWh)</label>
      <input 
        type="text" 
        id="totalDaily" 
        name="totalDaily" 
        placeholder="Total Daily (kWh)" 
        value={formData.totalDaily} 
        readOnly 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
  </div>

  <div className="flex space-x-2">
    <span className="flex flex-col w-full">
      <label htmlFor="perKwMonthly" className="text-bodyGray-400 text-sm ml-3">Per kW Monthly (kWh)</label>
      <input 
        type="text" 
        id="perKwMonthly" 
        name="perKwMonthly" 
        placeholder="Per kW Monthly (kWh)" 
        value={formData.perKwMonthly} 
        readOnly 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
    <span className="flex flex-col w-full">
      <label htmlFor="totalMonthly" className="text-bodyGray-400 text-sm ml-3">Total Monthly (kWh)</label>
      <input 
        type="text" 
        id="totalMonthly" 
        name="totalMonthly" 
        placeholder="Total Monthly (kWh)" 
        value={formData.totalMonthly} 
        readOnly 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
  </div>

  <div className="flex space-x-2">
    <span className="flex flex-col w-full">
      <label htmlFor="perKwYearly" className="text-bodyGray-400 text-sm ml-3">Per kW Yearly (kWh)</label>
      <input 
        type="text" 
        id="perKwYearly" 
        name="perKwYearly" 
        placeholder="Per kW Yearly (kWh)" 
        value={formData.perKwYearly} 
        readOnly 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
    <span className="flex flex-col w-full">
      <label htmlFor="totalYearly" className="text-bodyGray-400 text-sm ml-3">Total Yearly (kWh)</label>
      <input 
        type="text" 
        id="totalYearly" 
        name="totalYearly" 
        placeholder="Total Yearly (kWh)" 
        value={formData.totalYearly} 
        readOnly 
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
  </div>

  <div className="flex space-x-2">
    <span className="flex flex-col w-full">
      <label htmlFor="electricityRate" className="text-bodyGray-400 text-sm ml-3">Electricity Rate (Rs.)</label>
      <input 
        type="text" 
        id="electricityRate" 
        name="electricityRate" 
        placeholder="Electricity Rate (Rs.)" 
        value={formData.electricityRate} 
        onChange={handleChange} 
        required  
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
    <span className="flex flex-col w-full">
      <label htmlFor="discomName" className="text-bodyGray-400 text-sm ml-3">DISCOM Name</label>
      <input 
        type="text" 
        id="discomName" 
        name="discomName" 
        placeholder="DISCOM Name" 
        value={formData.discomName} 
        onChange={handleChange} 
        required  
        className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
      />
    </span>
  </div>
</div>


<div className="bg-boldWhite p-8 rounded w-full max-w space-y-4">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Company Details</h2>

  <span className="flex flex-col">
    <label htmlFor="companyName" className="text-bodyGray-400 text-sm ml-3">Company Name</label>
    <input 
      type="text" 
      id="companyName" 
      name="companyName" 
      placeholder="Company Name" 
      value={formData.companyName} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="companyAddress" className="text-bodyGray-400 text-sm ml-3">Company Address</label>
    <input 
      type="text" 
      id="companyAddress" 
      name="companyAddress" 
      placeholder="Company Address" 
      value={formData.companyAddress} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="companyPhone" className="text-bodyGray-400 text-sm ml-3">Company Phone</label>
    <input 
      type="text" 
      id="companyPhone" 
      name="companyPhone" 
      placeholder="Company Phone" 
      value={formData.companyPhone} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="companyGst" className="text-bodyGray-400 text-sm ml-3">Company GST</label>
    <input 
      type="text" 
      id="companyGst" 
      name="companyGst" 
      placeholder="Company GST" 
      value={formData.companyGst} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="companyPoc" className="text-bodyGray-400 text-sm ml-3">Company POC</label>
    <input 
      type="text" 
      id="companyPoc" 
      name="companyPoc" 
      placeholder="Company POC" 
      value={formData.companyPoc} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="companyMail" className="text-bodyGray-400 text-sm ml-3">Company Mail</label>
    <input 
      type="text" 
      id="companyMail" 
      name="companyMail" 
      placeholder="Company Mail" 
      value={formData.companyMail} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>


                
<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Panel Details</h2>

  <span className="flex flex-col">
    <label htmlFor="wattPeak" className="text-bodyGray-400 text-sm ml-3">Watt Peak</label>
    <input type="text" id="wattPeak" name="wattPeak" placeholder="Watt Peak" value={formData.wattPeak} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="noOfPanels" className="text-bodyGray-400 text-sm ml-3">No. of Panels</label>
    <input type="text" id="noOfPanels" name="noOfPanels" placeholder="No. of Panels" value={formData.noOfPanels} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="panelType" className="text-bodyGray-400 text-sm ml-3">Panel Type</label>
    <input type="text" id="panelType" name="panelType" placeholder="Panel Type" value={formData.panelType} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="panelBrand" className="text-bodyGray-400 text-sm ml-3">Panel Make/Brand</label>
    <input type="text" id="panelBrand" name="panelBrand" placeholder="Panel Make/Brand" value={formData.panelBrand} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="panelWarranty" className="text-bodyGray-400 text-sm ml-3">Panel Warranty</label>
    <input type="text" id="panelWarranty" name="panelWarranty" placeholder="Panel Warranty" value={formData.panelWarranty} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Inverter Details</h2>

  <span className="flex flex-col">
    <label htmlFor="sizeKw" className="text-bodyGray-400 text-sm ml-3">Size (kW)</label>
    <input type="text" id="sizeKw" name="sizeKw" placeholder="Size (kW)" value={formData.sizeKw} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="inverterMake" className="text-bodyGray-400 text-sm ml-3">Inverter Make/Brand</label>
    <input type="text" id="inverterMake" name="inverterMake" placeholder="Inverter Make/Brand" value={formData.inverterMake} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="phase" className="text-bodyGray-400 text-sm ml-3">Phase</label>
    <input type="text" id="phase" name="phase" placeholder="Phase" value={formData.phase} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="type" className="text-bodyGray-400 text-sm ml-3">Type</label>
    <input type="text" id="type" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="quantity" className="text-bodyGray-400 text-sm ml-3">Quantity</label>
    <input type="text" id="quantity" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>

  <span className="flex flex-col">
    <label htmlFor="inverterWarranty" className="text-bodyGray-400 text-sm ml-3">Inverter Warranty</label>
    <input type="text" id="inverterWarranty" name="inverterWarranty" placeholder="Inverter Warranty" value={formData.inverterWarranty} onChange={handleChange} required className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </span>
</div>


<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Cable Details</h2>

  <span className="flex flex-col">
    <label htmlFor="cableMake" className="text-bodyGray-400 text-sm ml-3">Cable Make/Brand</label>
    <input 
      type="text" 
      id="cableMake" 
      name="cableMake" 
      placeholder="Cable Make/Brand" 
      value={formData.cableMake} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="ac" className="text-bodyGray-400 text-sm ml-3">AC</label>
    <input 
      type="text" 
      id="ac" 
      name="ac" 
      placeholder="AC" 
      value={formData.ac} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="dc" className="text-bodyGray-400 text-sm ml-3">DC</label>
    <input 
      type="text" 
      id="dc" 
      name="dc" 
      placeholder="DC" 
      value={formData.dc} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Structure Details</h2>

  <span className="flex flex-col">
    <label htmlFor="structureType" className="text-bodyGray-400 text-sm ml-3">Structure Type</label>
    <input 
      type="text" 
      id="structureType" 
      name="structureType" 
      placeholder="Structure Type" 
      value={formData.structureType} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="structureDes" className="text-bodyGray-400 text-sm ml-3">Structure Description</label>
    <input 
      type="text" 
      id="structureDes" 
      name="structureDes" 
      placeholder="Structure Description" 
      value={formData.structureDes} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Balance of System</h2>

  <span className="flex flex-col">
    <label htmlFor="all" className="text-bodyGray-400 text-sm ml-3">All Details</label>
    <textarea 
      id="all" 
      name="all" 
      placeholder="All Details" 
      value={formData.all} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" 
      style={{ minHeight: "40px", overflow: "hidden" }}  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="bosWarranty" className="text-bodyGray-400 text-sm ml-3">BOS Warranty</label>
    <input 
      type="text" 
      id="bosWarranty" 
      name="bosWarranty" 
      placeholder="BOS Warranty"  
      value={formData.bosWarranty} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>


<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>
    Commercial Offer & Payment Schedule
  </h2>

  <span className="flex flex-col">
    <label htmlFor="systemPrice" className="text-bodyGray-400 text-sm ml-3">System Price</label>
    <input 
      type="text" 
      id="systemPrice" 
      name="systemPrice" 
      placeholder="System Price" 
      value={formData.systemPrice} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="gstRate" className="text-bodyGray-400 text-sm ml-3">GST Rate %</label>
    <input 
      type="text" 
      id="gstRate" 
      name="gstRate" 
      placeholder="GST Rate %" 
      value={formData.gstRate} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="gstPrice" className="text-bodyGray-400 text-sm ml-3">GST Price</label>
    <input 
      type="text" 
      id="gstPrice" 
      name="gstPrice" 
      placeholder="GST Price" 
      value={formData.gstPrice} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="totalPrice" className="text-bodyGray-400 text-sm ml-3">Total Price</label>
    <input 
      type="text" 
      id="totalPrice" 
      name="totalPrice" 
      placeholder="Total Price" 
      value={formData.totalPrice} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="addCharges" className="text-bodyGray-400 text-sm ml-3">Additional Charges</label>
    <input 
      type="text" 
      id="addCharges" 
      name="addCharges" 
      placeholder="Additional Charges" 
      value={formData.addCharges} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="netLia" className="text-bodyGray-400 text-sm ml-3">Net Liaising Charges</label>
    <input 
      type="text" 
      id="netLia" 
      name="netLia" 
      placeholder="Net Liaising Charges" 
      value={formData.netLia} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="costToCust" className="text-bodyGray-400 text-sm ml-3">Cost To Customer</label>
    <input 
      type="text" 
      id="costToCust" 
      name="costToCust" 
      placeholder="Cost To Customer" 
      value={formData.costToCust} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="subsidy" className="text-bodyGray-400 text-sm ml-3">M.N.R.E Subsidy</label>
    <input 
      type="text" 
      id="subsidy" 
      name="subsidy" 
      placeholder="M.N.R.E Subsidy" 
      value={formData.subsidy} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="effPrice" className="text-bodyGray-400 text-sm ml-3">Effective Price After Subsidy</label>
    <input 
      type="text" 
      id="effPrice" 
      name="effPrice" 
      placeholder="Effective Price After Subsidy" 
      value={formData.effPrice} 
      onChange={handleChange} 
      required 
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"  
    />
  </span>
</div>

                

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Payment Term</h2>

  <span className="flex flex-col">
    <label htmlFor="paymentTerms" className="text-bodyGray-400 text-sm ml-3">Payment Terms</label>
    <textarea 
      id="paymentTerms"
      name="paymentTerms"
      placeholder="Payment Terms"
      value={formData.paymentTerms}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ minHeight: "40px", overflow: "hidden" }}
    />
  </span>

  <span className="flex flex-col">
    <label htmlFor="paymentMode" className="text-bodyGray-400 text-sm ml-3">Payment Mode</label>
    <input 
      type="text"
      id="paymentMode"
      name="paymentMode"
      placeholder="Payment Mode"
      value={formData.paymentMode}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Bank Details</h2>

  <span className="flex flex-col">
    <label htmlFor="companyBankDetails" className="text-bodyGray-400 text-sm ml-3">Company Bank Details</label>
    <textarea 
      id="companyBankDetails"
      name="companyBankDetails"
      placeholder="Company Bank Details"
      value={formData.companyBankDetails}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ minHeight: "40px", overflow: "hidden" }}
    />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Our Scope</h2>

  <span className="flex flex-col">
    <label htmlFor="ourScopeDetails" className="text-bodyGray-400 text-sm ml-3">Our Scope Details</label>
    <textarea 
      id="ourScopeDetails"
      name="ourScopeDetails"
      placeholder="Our Scope Details"
      value={formData.ourScopeDetails}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ minHeight: "40px", overflow: "hidden" }}
    />
  </span>

  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Customer Scope</h2>

  <span className="flex flex-col">
    <label htmlFor="customerScopeDetails" className="text-bodyGray-400 text-sm ml-3">Customer Scope Details</label>
    <textarea 
      id="customerScopeDetails"
      name="customerScopeDetails"
      placeholder="Customer Scope Details"
      value={formData.customerScopeDetails}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ minHeight: "40px", overflow: "hidden" }}
    />
  </span>
</div>

<div className="bg-boldWhite p-8 rounded w-full space-y-6">
  <h2 className={`text-3xl font-semibold border-b-2 ${borderColor} pb-3 font-spartan`}>Company Terms & Conditions</h2>

  <span className="flex flex-col">
    <label htmlFor="companyTermsConditions" className="text-bodyGray-400 text-sm ml-3">Company Terms & Conditions</label>
    <textarea
      id="companyTermsConditions"
      name="companyTermsConditions"
      placeholder="Company Terms & Conditions"
      value={formData.companyTermsConditions}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border-b border-bodyGray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ minHeight: "40px", overflow: "hidden" }}
    />
  </span>
</div>

                </div>

                <div className="flex justify-center my-15">
  <button type="submit" className="w-4xl bg-bodyGray-900 text-boldWhite py-4 text-md rounded  flex justify-center gap-2 hover:bg-primary-600 cursor-pointer active:scale-98 transition duration-150">
    Generate Document <DocumentTextIcon className="w-6 h-6 text-boldWhite" />
  </button>
</div>            </form>
            <ResponsiveContainer width="85%" height={450} ref={graphRefSaving} className="mt-5 mb-10">
  <ComposedChart data={monthlyData} margin={{ top: 60, right: 30, left: 20, bottom: 5 }}>
    <text
      x="50%"
      y={20}  
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={24}
      fontWeight="600"
    >
      Monthly Generation & Savings
    </text>
    <CartesianGrid strokeDasharray="4 4" />
    <XAxis dataKey="month" />
    <YAxis
      tickCount={12} 
      yAxisId="left"
      domain={[0, 1000]}
      label={{ value: "kW", angle: -90, position: "insideLeft" }}
    />
    <YAxis
          tickCount={12} 
      yAxisId="right"
      orientation="right"
      domain={[1000, 9000]}
      label={{ value: "Savings (₹)", angle: -90, position: "insideRight" }}
    />
    <Tooltip />
    <Legend verticalAlign="top" align="center" wrapperStyle={{ top: 40 }} />
    <Bar yAxisId="left" dataKey="GenerationUnits" fill="#1873d3" name="Generation (kW)" barSize={30} />
    <Line
      yAxisId="right"
      type="monotone"
      dataKey="Savings"
      stroke="#ff8c00"
      strokeWidth={3}
      name="Savings (₹)"
    />
  </ComposedChart>
</ResponsiveContainer>

<ResponsiveContainer width="85%" height={450} ref={graphRef} className="mt-5 mb-10">
  <ComposedChart
    data={BillData}
    margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
  >
    <text
      x="50%"
      y="20"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={24}
      fontWeight="600"
    >
      Bill Before And After Solar
    </text>

    <Legend verticalAlign="top" align="center" wrapperStyle={{ top: 40 }} />

    <CartesianGrid strokeDasharray="4 4" />
    <XAxis dataKey="year" />
    <YAxis
      tickCount={7} 
      tickFormatter={(value) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(value)
      }
    />
    <Tooltip
      formatter={(value) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(value)
      }
    />

    <Bar dataKey="billBeforeSolar" fill="#1873d3" name="Bill Before Solar" strokeWidth={2}/>
    <Bar dataKey="billAfterSolar" fill="#ff8c00" name="Bill After Solar" strokeWidth={2}/>
  </ComposedChart>
</ResponsiveContainer>


        </div>

        
    );
};

export default DashboardPage;
