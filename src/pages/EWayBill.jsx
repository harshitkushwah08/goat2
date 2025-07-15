import  { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  FileText,
  Link,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import ReactApexChart from 'react-apexcharts';
import EWayBillFilterSidebar from '../components/Right-Sidebar/filter-eway-sidebar';
import Lottie from 'lottie-react';
import Connecting from '../assets/Connecting.json';
import DropdownSelectMenu from '../components/ui/selectDropdown';
import Tooltip from '../components/ui/toolTip';

export const EWayBill = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isConnected, setIsConnected] = useState(true);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
    const [isFilterOpen, setFilterOpen] = useState(false);
  const itemsPerPage = 10;

    const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Completed", label: "Completed" },
];

  const eWayBills = [
    {
      id: 1,
      eWayBillNo: 'EWB123456789012',
      invoiceNo: 'INV-001',
      customerName: 'ABC Corp',
      fromState: 'Maharashtra',
      toState: 'Gujarat',
      distance: 450,
      vehicleNo: 'MH-01-AB-1234',
      transporterName: 'Fast Logistics',
      generatedDate: '2024-01-15',
      validUntil: '2024-01-16',
      status: 'Active',
      value: 125000
    },
    {
      id: 2,
      eWayBillNo: 'EWB234567890123',
      invoiceNo: 'INV-002',
      customerName: 'XYZ Ltd',
      fromState: 'Delhi',
      toState: 'Punjab',
      distance: 350,
      vehicleNo: 'DL-02-CD-5678',
      transporterName: 'Quick Transport',
      generatedDate: '2024-01-14',
      validUntil: '2024-01-15',
      status: 'Expired',
      value: 89000
    },
    {
      id: 3,
      eWayBillNo: 'EWB345678901234',
      invoiceNo: 'INV-003',
      customerName: 'Global Traders',
      fromState: 'Karnataka',
      toState: 'Tamil Nadu',
      distance: 280,
      vehicleNo: 'KA-03-EF-9012',
      transporterName: 'Express Cargo',
      generatedDate: '2024-01-13',
      validUntil: '2024-01-14',
      status: 'Cancelled',
      value: 67000
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'destructive';
      case 'Cancelled':
        return 'secondary';
      case 'Completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const filteredEWayBills = eWayBills.filter(bill => {
    const matchesSearch = bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.eWayBillNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || bill.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEWayBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEWayBills = filteredEWayBills.slice(startIndex, startIndex + itemsPerPage);

  const handleConnect = () => {
    setShowConnectionModal(true);
    setTimeout(() => {
      setIsConnected(true);
      setShowConnectionModal(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">E-Way Bill</h3>
            <p className="text-sm text-bodyGray-500">Generate and manage E-Way Bills for goods transportation</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Generate E-Way Bill
        </Button>
            <Truck className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>

 

      <Card className={isConnected ? "border-green-300 bg-green-50" : "border-yellow-300 bg-yellow-50"}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-bodyGray-900">Connected to Government E-Way Bill Portal</h3>
                    <p className="text-sm text-bodyGray-600">User ID: EWBUSER2025 | Name: Harshit Kushwah</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-bodyGray-900">Not Connected to Government E-Way Bill Portal</h3>
                    <p className="text-sm text-bodyGray-600">Connect to generate and manage E-Way Bills directly</p>
                  </div>
                </>
              )}
            </div>
            <div>
              {isConnected ? (
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              ) : (
                <Button className="bg-primary-600 hover:bg-primary-700" onClick={handleConnect}>
                  <Link className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      
    
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total E-Way Bills</p>
                <p className="text-2xl font-bold text-bodyGray-900">156</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Active</p>
                <p className="text-2xl font-bold text-bodyGray-900">89</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Expired</p>
                <p className="text-2xl font-bold text-bodyGray-900">45</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Value</p>
                <p className="text-2xl font-bold text-bodyGray-900">₹2,81,000</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

  <Card className="mb-6">
        <CardHeader>
          <CardTitle>E-Way Bill Analytics</CardTitle>
          <CardDescription>Monthly trends and distribution of E-Way Bills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ReactApexChart 
              options={{
                chart: {
                  type: 'bar',
                  stacked: true,
                  toolbar: {
                    show: false,
                    tools: {
                      download: false,
                      selection: false,
                      zoom: false,
                      zoomin: false,
                      zoomout: false,
                      pan: false,
                      reset: false
                    }
                  }
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    borderRadius: 5,
                    columnWidth: '60%'
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: 2,
                  colors: ['transparent']
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                },
                yaxis: {
                  title: {
                    text: 'Number of E-Way Bills'
                  }
                },
                fill: {
                  opacity: 1
                },
                colors: ['#10b981', '#f59e0b', '#ef4444'],
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val + " bills"
                    }
                  }
                },
                legend: {
                  position: 'top',
                  horizontalAlign: 'right'
                }
              }}
              series={[
                {
                  name: 'Active',
                  data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 67, 72]
                },
                {
                  name: 'Expired',
                  data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
                },
                {
                  name: 'Cancelled',
                  data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
                }
              ]}
              type="bar"
              height="100%"
            />
          </div>
        </CardContent>
      </Card>
            <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search by customer, E-Way Bill no, or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
          <DropdownSelectMenu
          options={statusOptions}
          selected={selectedStatus}
          onChange={setSelectedStatus}
        />
              <Button variant="outline" onClick={() => setFilterOpen(true)} className="text-primary-600 hover:bg-primary-100 active:bg-primary-600 active:text-boldWhite transition-all cursor-pointer active:scale-98">
                <Filter className="w-4 h-4 mr-2" />
                 Filters
              </Button>

                    <EWayBillFilterSidebar isOpen={isFilterOpen} onClose={() => setFilterOpen(false)} />

            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>E-Way Bills ({filteredEWayBills.length})</CardTitle>
          <CardDescription>Track all E-Way Bills for goods transportation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
          <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr className="border-b">
                  <th className="text-left py-3 px-3  text-bodyGray-500">E-Way Bill No</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Invoice No</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Customer</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">From - To</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Vehicle No</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Date</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Value</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Status</th>
                  <th className="text-left py-3 px-3  text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEWayBills.map((bill) => (
                  <tr key={bill.id}                 
                  className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition">
                    <td className="py-3 px-4 font-medium text-bodyGray-900 font-mono">{bill.eWayBillNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{bill.invoiceNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600 truncate max-w-[100px]">{bill.customerName}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-bodyGray-400" />
                        <span className="text-bodyGray-600 truncate max-w-[100px]">{bill.fromState} - {bill.toState}</span>
                      </div>
                      <div className="text-xs text-bodyGray-400 mt-1">{bill.distance} km</div>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 font-mono text-sm">{bill.vehicleNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{bill.generatedDate}</td>
                    <td className="py-3 px-4 font-medium text-bodyGray-900">₹{bill.value.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                     <div className="flex items-center gap-2">
                                          <Tooltip text="View">
                                          <Button variant="ghost" size="sm" className="hover:text-blue-600 active:scale-95 transition-all">
                                          <Eye className="w-4 h-4" />
                                        </Button>
                                        </Tooltip>
                                                                <Tooltip text="Download">
                  
                                                                    <Button variant="ghost" size="sm" className="hover:text-blue-700 hover:bg-blue-200 active:scale-95 transition-all">
                                                                  <Download className="w-4 h-4" />
                                                                </Button>
                                                                </Tooltip>
                                                                                        <Tooltip text="Edit">
                  
                                                                <Button variant="ghost" size="sm" className="hover:text-primary-600 active:scale-95 transition-all">
                                                                 <Edit className="w-4 h-4" />
                                                                </Button>
                                                                </Tooltip>
                                                                                        <Tooltip text="Delete">
                  
                                                                <Button  variant="ghost" size="sm" className="hover:text-red-600 active:scale-95 transition-all">
                                                                  <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                                </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center mb-4">
                        <Lottie
                animationData={Connecting}
                loop={false}
                style={{ width: "100%", height: "100%" }}
              />            <h3 className="text-lg font-semibold my-8">Connecting to E-Way Bill Portal</h3>
            <p className="text-bodyGray-600 mb-4">Please wait while we establish a secure connection...</p>
          </div>
        </div>
      )}
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Distance Distribution</CardTitle>
          <CardDescription>Analysis of E-Way Bills by distance traveled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ReactApexChart 
              options={{
                chart: {
                  type: 'pie',
                  toolbar: {
                    show: false
                  }
                },
                labels: ['0-100 km', '101-300 km', '301-500 km', '501-1000 km', 'Above 1000 km'],
                colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
                legend: {
                  position: 'bottom',
                  horizontalAlign: 'center'
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 300
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }],
                tooltip: {
                  y: {
                    formatter: function(value) {
                      return value + " bills";
                    }
                  }
                }
              }}
              series={[42, 28, 15, 10, 5]}
              type="pie"
              height="100%"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EWayBill;