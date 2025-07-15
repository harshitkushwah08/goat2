import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  CheckCircle,
  AlertTriangle,
  Info,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import DropdownSelectMenu from '../components/ui/selectDropdown';

export const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const notifications = [
    // Today
    {
      id: 1,
      message: 'New invoice payment received from ABC Corp',
      type: 'success',
      time: new Date(new Date().setHours(new Date().getHours() - 2)),
      isRead: false,
      relatedTo: 'Invoice #INV-001',
      details: 'Payment of ₹25,000 received via bank transfer'
    },
    {
      id: 2,
      message: 'Low stock alert for Wireless Headphones',
      type: 'warning',
      time: new Date(new Date().setHours(new Date().getHours() - 4)),
      isRead: false,
      relatedTo: 'Product #WH-001',
      details: 'Current stock: 5 units (below minimum threshold of 10)'
    },
    {
      id: 3,
      message: 'Monthly sales report is ready for review',
      type: 'info',
      time: new Date(new Date().setHours(new Date().getHours() - 6)),
      isRead: true,
      relatedTo: 'Report #SR-2025-06',
      details: 'June 2025 sales report has been generated'
    },
    
    // Yesterday
    {
      id: 4,
      message: 'New customer registered: XYZ Ltd',
      type: 'success',
      time: new Date(new Date().setDate(new Date().getDate() - 1)),
      isRead: true,
      relatedTo: 'Customer #CUST-045',
      details: 'Contact: Jane Smith, Email: jane@xyzltd.com'
    },
    {
      id: 5,
      message: 'System update completed successfully',
      type: 'info',
      time: new Date(new Date().setDate(new Date().getDate() - 1)),
      isRead: true,
      relatedTo: 'System',
      details: 'Updated to version 2.5.0 with new features and bug fixes'
    },
    
    // This Week
    {
      id: 6,
      message: 'Invoice #INV-002 is overdue',
      type: 'error',
      time: new Date(new Date().setDate(new Date().getDate() - 3)),
      isRead: false,
      relatedTo: 'Invoice #INV-002',
      details: 'Payment of ₹15,000 was due on June 15, 2025'
    },
    {
      id: 7,
      message: 'New purchase order received from supplier',
      type: 'success',
      time: new Date(new Date().setDate(new Date().getDate() - 4)),
      isRead: true,
      relatedTo: 'PO #PO-005',
      details: 'Order value: ₹45,000 from ABC Suppliers'
    },
    
    // This Month
    {
      id: 8,
      message: 'GST filing deadline approaching',
      type: 'warning',
      time: new Date(new Date().setDate(new Date().getDate() - 10)),
      isRead: true,
      relatedTo: 'Compliance',
      details: 'GSTR-1 for June 2025 due on July 11, 2025'
    },
    {
      id: 9,
      message: 'Backup completed successfully',
      type: 'info',
      time: new Date(new Date().setDate(new Date().getDate() - 15)),
      isRead: true,
      relatedTo: 'System',
      details: 'Automatic backup completed. Size: 256 MB'
    },
    
    // Older
    {
      id: 10,
      message: 'Account subscription renewed',
      type: 'success',
      time: new Date(new Date().setDate(new Date().getDate() - 45)),
      isRead: true,
      relatedTo: 'Subscription',
      details: 'Your premium plan has been renewed for 12 months'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };



  const getTimeframeLabel = (timeframe) => {
    switch (timeframe) {
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

  const isInTimeframe = (time, timeframe) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - today.getDay());
    
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const notificationDate = new Date(time);
    notificationDate.setHours(0, 0, 0, 0);
    
    switch (timeframe) {
      case 'today':
        return notificationDate.getTime() === today.getTime();
      case 'yesterday':
        return notificationDate.getTime() === yesterday.getTime();
      case 'this_week':
        return notificationDate >= weekStart && notificationDate < today;
      case 'this_month':
        return notificationDate >= monthStart && notificationDate < weekStart;
      case 'older':
        return notificationDate < monthStart;
      case 'all':
      default:
        return true;
    }
  };

  const formatTime = (time) => {
    const now = new Date();
    const notificationTime = new Date(time);
    
    const diffMs = now - notificationTime;
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
      return notificationTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: notificationTime.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.relatedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesTimeframe = selectedTimeframe === 'all' || isInTimeframe(notification.time, selectedTimeframe);
    return matchesSearch && matchesType && matchesTimeframe;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  // Group notifications by timeframe for display
  const groupedNotifications = {};
  
  paginatedNotifications.forEach(notification => {
    let group = 'older';
    
    if (isInTimeframe(notification.time, 'today')) {
      group = 'today';
    } else if (isInTimeframe(notification.time, 'yesterday')) {
      group = 'yesterday';
    } else if (isInTimeframe(notification.time, 'this_week')) {
      group = 'this_week';
    } else if (isInTimeframe(notification.time, 'this_month')) {
      group = 'this_month';
    }
    
    if (!groupedNotifications[group]) {
      groupedNotifications[group] = [];
    }
    
    groupedNotifications[group].push(notification);
  });

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Add logic to mark all notifications as read
  };

  const clearAllNotifications = () => {
    console.log('Clearing all notifications');
    // Add logic to clear all notifications
  };

  return (
   <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Notifications</h3>
            <p className="text-sm text-bodyGray-500">View and manage all system notifications</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <CheckCircle className="w-4 h-4 mr-2" />
            Mark All as Read
        </Button>

         <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={clearAllNotifications}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
            <Bell className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>     

    
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 focus:ring-primary-200 focus:border-primary-600 border-bodyGray-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
<DropdownSelectMenu
  options={[
    { value: 'all', label: 'All Types' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Information' },
    { value: 'error', label: 'Error' },
  ]}
  selected={selectedType}
  onChange={setSelectedType}
/>

<DropdownSelectMenu
  options={[
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'older', label: 'Older' },
  ]}
  selected={selectedTimeframe}
  onChange={setSelectedTimeframe}
/>

          
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {Object.keys(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([timeframe, notifications]) => (
            <Card key={timeframe}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{getTimeframeLabel(timeframe)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border border-bodyGray-200 rounded-lg ${notification.isRead ? 'bg-white' : 'bg-primary-50 border-primary-200'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'success' ? 'bg-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className={`font-medium ${notification.isRead ? 'text-bodyGray-800' : 'text-bodyGray-900'}`}>
                              {notification.message}
                            </h3>
                            <span className="text-xs text-bodyGray-500">
                              {formatTime(notification.time)}
                            </span>
                          </div>
                          <p className="text-sm text-bodyGray-600 mt-1">
                            {notification.details}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.relatedTo}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              {!notification.isRead && (
                                <Button variant="ghost" size="sm">
                                  Mark as Read
                                </Button>
                              )}
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
              <Bell className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
              <h3 className="text-lg font-medium text-bodyGray-900 mb-2">No notifications found</h3>
              <p className="text-bodyGray-600">
                {searchTerm || selectedType !== 'all' || selectedTimeframe !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'You have no notifications at the moment'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

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

export default Notifications;