import React, { useState } from 'react';
import { Download, Search, Filter, FileText, File, Image, FileSpreadsheet, File as FilePdf, Clock, Calendar, Trash2, Share2, Eye, DownloadCloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import DropdownSelectMenu from '../components/ui/selectDropdown';

export const RecentlyDownloaded = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


      const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pdf", label: "Pdf" },
  { value: "excel", label: "Excel" },
  { value: "document", label: "Document" },
  { value: "other", label: "Other" },
];

  const downloads = [
    {
      id: 1,
      name: 'Invoice-001-2025.pdf',
      type: 'pdf',
      size: '1.2 MB',
      downloadedAt: new Date(new Date().setHours(new Date().getHours() - 2)),
      source: 'Invoice #INV-001',
      path: '/downloads/invoices'
    },
    {
      id: 2,
      name: 'Sales-Report-June-2025.xlsx',
      type: 'excel',
      size: '3.5 MB',
      downloadedAt: new Date(new Date().setHours(new Date().getHours() - 5)),
      source: 'Reports > Sales',
      path: '/downloads/reports'
    },
    {
      id: 3,
      name: 'Product-Catalog-2025.pdf',
      type: 'pdf',
      size: '8.7 MB',
      downloadedAt: new Date(new Date().setHours(new Date().getHours() - 8)),
      source: 'Products > Catalog',
      path: '/downloads/products'
    },
    {
      id: 4,
      name: 'Customer-List-Export.xlsx',
      type: 'excel',
      size: '2.1 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      source: 'Customers > Export',
      path: '/downloads/customers'
    },
 
    {
      id: 6,
      name: 'Purchase-Order-Template.docx',
      type: 'document',
      size: '0.8 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
      source: 'Templates > Purchase Orders',
      path: '/downloads/templates'
    },
    {
      id: 7,
      name: 'GST-Return-Form.pdf',
      type: 'pdf',
      size: '1.5 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      source: 'Compliance > GST',
      path: '/downloads/compliance'
    },
    {
      id: 8,
      name: 'Inventory-Audit-Report.xlsx',
      type: 'excel',
      size: '5.2 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
      source: 'Inventory > Reports',
      path: '/downloads/inventory'
    },
    {
      id: 9,
      name: 'Employee-Handbook.pdf',
      type: 'pdf',
      size: '3.9 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
      source: 'HR > Documents',
      path: '/downloads/hr'
    },
    {
      id: 10,
      name: 'System-Backup-June-2025.zip',
      type: 'other',
      size: '256 MB',
      downloadedAt: new Date(new Date().setDate(new Date().getDate() - 10)),
      source: 'Settings > Backup',
      path: '/downloads/backups'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FilePdf className="w-6 h-6 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-6 h-6 text-green-600" />;
      case 'image':
        return <Image className="w-6 h-6 text-purple-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <File className="w-6 h-6 text-bodyGray-500" />;
    }
  };

  const formatTime = (time) => {
    const now = new Date();
    const downloadTime = new Date(time);
    
    const diffMs = now - downloadTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return downloadTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: downloadTime.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || download.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDownloads = filteredDownloads.slice(startIndex, startIndex + itemsPerPage);

  // Group downloads by date for display
  const groupedDownloads = {};
  
  paginatedDownloads.forEach(download => {
    const now = new Date();
    const downloadDate = new Date(download.downloadedAt);
    
    let group = 'older';
    
    if (downloadDate.toDateString() === now.toDateString()) {
      group = 'today';
    } else if (downloadDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
      group = 'yesterday';
    } else if (downloadDate > new Date(new Date().setDate(new Date().getDate() - 7))) {
      group = 'this_week';
    } else if (downloadDate > new Date(new Date().setDate(new Date().getDate() - 30))) {
      group = 'this_month';
    }
    
    if (!groupedDownloads[group]) {
      groupedDownloads[group] = [];
    }
    
    groupedDownloads[group].push(download);
  });

  const getGroupLabel = (group) => {
    switch (group) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'this_week':
        return 'This Week';
      case 'this_month':
        return 'This Month';
      case 'older':
        return 'Older';
      default:
        return '';
    }
  };

  const handleDownloadAgain = (id) => {
    console.log('Downloading again:', id);
    // Add download logic here
  };

  const handleDelete = (id) => {
    console.log('Deleting download history:', id);
    // Add delete logic here
  };

  const handleClearAll = () => {
    console.log('Clearing all download history');
    // Add clear all logic here
  };

  return (
<div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Recently Downloaded</h3>
          <p className="text-sm text-bodyGray-500">View and manage your download history</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
            <Button 
          variant="outline" 
          className="border-red-300 text-red-600 active:scale-98 transition hover:bg-red-50"
          onClick={handleClearAll}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear History
        </Button>
            <Download className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>        

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-bodyGray-900">{downloads.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <DownloadCloud className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Today</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {downloads.filter(d => new Date(d.downloadedAt).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">This Week</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {downloads.filter(d => new Date(d.downloadedAt) > new Date(new Date().setDate(new Date().getDate() - 7))).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">Total Size</p>
                <p className="text-2xl font-bold text-bodyGray-900">
                  {(downloads.reduce((sum, d) => sum + parseFloat(d.size), 0)).toFixed(1)} MB
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search downloads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full focus:ring-primary-200 focus:border-primary-600 border-bodyGray-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
 <DropdownSelectMenu
          options={statusOptions}
          selected={selectedType}
          onChange={setSelectedType}
        />         
            
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {Object.keys(groupedDownloads).length > 0 ? (
          Object.entries(groupedDownloads).map(([timeframe, downloads]) => (
            <Card key={timeframe}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{getGroupLabel(timeframe)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloads.map((download) => (
                    <div 
                      key={download.id} 
                      className="p-4 border border-bodyGray-300 rounded-lg hover:bg-bodyGray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-bodyGray-100">
                          {getFileIcon(download.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-bodyGray-900">
                              {download.name}
                            </h3>
                            <span className="text-xs text-bodyGray-500">
                              {formatTime(download.downloadedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {download.size}
                            </Badge>
                            <span className="text-sm text-bodyGray-500">
                              {download.source}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-bodyGray-500">
                              {download.path}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" className="text-primary-600 hover:bg-primary-50 transition active:scale-98" size="sm" onClick={() => handleDownloadAgain(download.id)}>
                                <Download className="w-4 h-4 mr-1" />
                                Download Again
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-500 active:scale-98 transition">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 active:scale-98 transtion" onClick={() => handleDelete(download.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Download className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
              <h3 className="text-lg font-medium text-bodyGray-900 mb-2">No downloads found</h3>
              <p className="text-bodyGray-600">
                {searchTerm || selectedType !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'You have no download history at the moment'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "bg-primary-600" : ""}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyDownloaded;