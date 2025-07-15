import React, { useState } from 'react';
import { Search, FileText, Download, Filter, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import FilterSidebar from '../../components/ui/filterHsn';

const hsnData = [
  {
    code: "1001",
    description: "Wheat and meslin",
    gstRate: "0%",
    category: "Agricultural Products",
    chapter: "10 - Cereals"
  },
  {
    code: "1006",
    description: "Rice",
    gstRate: "0%",
    category: "Agricultural Products", 
    chapter: "10 - Cereals"
  },
  {
    code: "2201",
    description: "Waters, including natural or artificial mineral waters",
    gstRate: "18%",
    category: "Beverages",
    chapter: "22 - Beverages, spirits and vinegar"
  },
  {
    code: "6403",
    description: "Footwear with outer soles of rubber, plastics, leather",
    gstRate: "18%",
    category: "Footwear",
    chapter: "64 - Footwear, gaiters and the like"
  },
  {
    code: "8471",
    description: "Automatic data processing machines and units thereof",
    gstRate: "18%",
    category: "Electronics",
    chapter: "84 - Nuclear reactors, boilers, machinery"
  },
  {
    code: "9403",
    description: "Other furniture and parts thereof",
    gstRate: "18%",
    category: "Furniture",
    chapter: "94 - Furniture; bedding, mattresses"
  }
];

export const HSNFinder = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = hsnData.filter(item => {
    const matchesSearch = item.code.includes(searchTerm) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getGSTBadgeColor = (rate) => {
    switch(rate) {
      case '0%': return 'success';
      case '5%': return 'secondary';
      case '12%': return 'warning';
      case '18%': return 'destructive';
      case '28%': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex flex-col gap-5 bg-boldWhite p-5 ">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">HSN Code Finder</h3>
            <p className="text-sm text-bodyGray-500">Search and find HSN codes with GST rates for your products</p>
          </div>

          <div className="rounded-lg bg-boldWhite p-2 flex flex-row items-center gap-5">
             <Button className="bg-primary-600 hover:bg-primary-700 w-full md:w-auto active:scale-97 transition cursor-pointer">
              <Download className="w-4 h-4 mr-2 " />
              Export HSN List
            </Button>
                <FileText className="h-6 w-6 text-boldGray-900" />
          </div>
        </div>
      </div>
          

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative 0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search by HSN code or product description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 ring-primary-200 focus:border-primary-400 border-bodyGray-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
            
         
              
              <Button variant="outline"  onClick={() => setIsFilterOpen(true)} className="active:text-boldWhite cursor-pointer transtion-colors active:bg-primary-600">
                <Filter className="w-4 h-4 mr-2 " />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>HSN Codes ({filteredData.length} results)</CardTitle>
          <CardDescription>
            Click on any HSN code to view detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="block md:hidden space-y-4">
            {filteredData.map((item, index) => (
              <div key={index} className="border border-bodyGray-300  rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-primary-600">{item.code}</span>
                  <Badge variant={getGSTBadgeColor(item.gstRate)}>
                    GST: {item.gstRate}
                  </Badge>
                </div>
                <p className="text-sm text-bodyGray-800 ">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-bodyGray-500">
                  <span>{item.category}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bodyGray-300 ">
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">HSN Code</th>
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">Chapter</th>
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">GST Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-bodyGray-600 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b border-bodyGray-100  hover:bg-bodyGray-50 ">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-primary-600">{item.code}</span>
                    </td>
                    <td className="py-3 px-4 text-bodyGray-800  max-w-xs">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600 ">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-bodyGray-600  text-sm">
                      {item.chapter}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getGSTBadgeColor(item.gstRate)}>
                        {item.gstRate}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
              <p className="text-bodyGray-500">No HSN codes found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

            <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(filters) => setActiveFilters(filters)}
        activeFilters={activeFilters}
        onClearFilters={() => setActiveFilters({})}
      />
    </div>

    
  );
};