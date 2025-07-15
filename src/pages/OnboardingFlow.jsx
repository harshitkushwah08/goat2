import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building, 
  Globe, 
  DollarSign, 
  Users, 
  Briefcase, 
  ArrowRight, 
  CheckCircle,
  Store,
  Factory,
  ShoppingBag,
  Truck
} from "lucide-react";
import { Button } from "../components/ui/button";
import { PageLoader } from "../components/ui/loader";

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  const [businessInfo, setBusinessInfo] = useState({
    sector: "",
    currency: "INR",
    employees: "1-10",
    taxRegistered: "yes",
    gstNumber: "",
    businessType: ""
  });

  const handleChange = (field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Simulate loading process
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              navigate("/dashboard");
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  const sectors = [
    { id: "retail", name: "Retail", icon: <Store className="w-6 h-6" /> },
    { id: "wholesale", name: "Wholesaler & Distributor", icon: <Truck className="w-6 h-6" /> },
    { id: "manufacturing", name: "Manufacturing", icon: <Factory className="w-6 h-6" /> },
    { id: "trading", name: "Trading", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" }
  ];

  const employeeRanges = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501+"
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Partnership (LLP)",
    "Private Limited Company",
    "Public Limited Company",
    "One Person Company"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-bodyGray-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <img src="/logo/horizontal-logo.png" alt="InventoryPro" className="h-12 mx-auto mb-8" />
          
          <h1 className="text-2xl font-bold text-bodyGray-900 mb-2">Setting up your workspace</h1>
          <p className="text-bodyGray-600 mb-8">Please wait while we prepare everything for you...</p>
          
          <div className="w-full bg-bodyGray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${progress >= 20 ? 'text-primary-600' : 'text-bodyGray-300'} mr-3`} />
              <span className={progress >= 20 ? 'text-bodyGray-900' : 'text-bodyGray-400'}>
                Setting up your account
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${progress >= 40 ? 'text-primary-600' : 'text-bodyGray-300'} mr-3`} />
              <span className={progress >= 40 ? 'text-bodyGray-900' : 'text-bodyGray-400'}>
                Configuring business settings
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${progress >= 60 ? 'text-primary-600' : 'text-bodyGray-300'} mr-3`} />
              <span className={progress >= 60 ? 'text-bodyGray-900' : 'text-bodyGray-400'}>
                Preparing inventory system
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${progress >= 80 ? 'text-primary-600' : 'text-bodyGray-300'} mr-3`} />
              <span className={progress >= 80 ? 'text-bodyGray-900' : 'text-bodyGray-400'}>
                Finalizing your dashboard
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${progress >= 100 ? 'text-primary-600' : 'text-bodyGray-300'} mr-3`} />
              <span className={progress >= 100 ? 'text-bodyGray-900' : 'text-bodyGray-400'}>
                Ready to go!
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-bodyGray-50 flex flex-col">
      <header className="p-6">
        <img src="/logo/horizontal-logo.png" alt="InventoryPro" className="h-10 w-30" />
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    s < step ? 'bg-primary-600 text-white' : 
                    s === step ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' : 
                    'bg-bodyGray-100 text-bodyGray-400'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                <div className="text-xs mt-2 text-bodyGray-500">
                  {s === 1 ? 'Business Type' : 
                   s === 2 ? 'Currency' : 
                   s === 3 ? 'Company Details' : 'Confirmation'}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-bodyGray-200 p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-bodyGray-900 mb-2">Select your business sector</h1>
                <p className="text-bodyGray-600">This helps us customize your experience based on your business needs.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {sectors.map((sector) => (
                    <div
                      key={sector.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        businessInfo.sector === sector.id 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-bodyGray-200 hover:border-primary-300'
                      }`}
                      onClick={() => handleChange('sector', sector.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${
                          businessInfo.sector === sector.id 
                            ? 'bg-primary-100 text-primary-600' 
                            : 'bg-bodyGray-100 text-bodyGray-500'
                        }`}>
                          {sector.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-bodyGray-900">{sector.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-bodyGray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    value={businessInfo.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    className="w-full p-3 border border-bodyGray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-bodyGray-900 mb-2">Select your currency</h1>
                <p className="text-bodyGray-600">Choose the primary currency you'll use for transactions.</p>
                
                <div className="mt-6">
                  <div className="grid grid-cols-1 gap-3">
                    {currencies.map((currency) => (
                      <div
                        key={currency.code}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center ${
                          businessInfo.currency === currency.code 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-bodyGray-200 hover:border-primary-300'
                        }`}
                        onClick={() => handleChange('currency', currency.code)}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-bodyGray-100 rounded-full mr-4 text-lg font-bold">
                          {currency.symbol}
                        </div>
                        <div>
                          <h3 className="font-medium text-bodyGray-900">{currency.name}</h3>
                          <p className="text-sm text-bodyGray-500">{currency.code}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-bodyGray-900 mb-2">Company Details</h1>
                <p className="text-bodyGray-600">Tell us a bit more about your business.</p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-bodyGray-700 mb-2">
                      Number of Employees
                    </label>
                    <select
                      value={businessInfo.employees}
                      onChange={(e) => handleChange('employees', e.target.value)}
                      className="w-full p-3 border border-bodyGray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {employeeRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bodyGray-700 mb-2">
                      Are you registered for tax?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="taxRegistered"
                          value="yes"
                          checked={businessInfo.taxRegistered === "yes"}
                          onChange={() => handleChange('taxRegistered', 'yes')}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="taxRegistered"
                          value="no"
                          checked={businessInfo.taxRegistered === "no"}
                          onChange={() => handleChange('taxRegistered', 'no')}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  
                  {businessInfo.taxRegistered === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-bodyGray-700 mb-2">
                        GST Number (if applicable)
                      </label>
                      <input
                        type="text"
                        value={businessInfo.gstNumber}
                        onChange={(e) => handleChange('gstNumber', e.target.value)}
                        placeholder="e.g., 22AAAAA0000A1Z5"
                        className="w-full p-3 border border-bodyGray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-bodyGray-900 mb-2">Confirm your details</h1>
                <p className="text-bodyGray-600">Please review your information before proceeding.</p>
                
                <div className="mt-6 space-y-4 bg-bodyGray-50 p-6 rounded-xl border border-bodyGray-200">
                  <div className="flex justify-between">
                    <span className="text-bodyGray-500">Business Sector:</span>
                    <span className="font-medium text-bodyGray-900">
                      {sectors.find(s => s.id === businessInfo.sector)?.name || "Not selected"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-bodyGray-500">Business Type:</span>
                    <span className="font-medium text-bodyGray-900">
                      {businessInfo.businessType || "Not selected"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-bodyGray-500">Currency:</span>
                    <span className="font-medium text-bodyGray-900">
                      {currencies.find(c => c.code === businessInfo.currency)?.name || "Not selected"} 
                      ({currencies.find(c => c.code === businessInfo.currency)?.symbol || ""})
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-bodyGray-500">Employees:</span>
                    <span className="font-medium text-bodyGray-900">{businessInfo.employees}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-bodyGray-500">Tax Registered:</span>
                    <span className="font-medium text-bodyGray-900">
                      {businessInfo.taxRegistered === "yes" ? "Yes" : "No"}
                    </span>
                  </div>
                  
                  {businessInfo.taxRegistered === "yes" && businessInfo.gstNumber && (
                    <div className="flex justify-between">
                      <span className="text-bodyGray-500">GST Number:</span>
                      <span className="font-medium text-bodyGray-900">{businessInfo.gstNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className={step === 1 ? 'opacity-0' : ''}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-primary-600 hover:bg-primary-700"
                disabled={
                  (step === 1 && (!businessInfo.sector || !businessInfo.businessType)) ||
                  (step === 3 && businessInfo.taxRegistered === "yes" && !businessInfo.gstNumber)
                }
              >
                {step < 4 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}