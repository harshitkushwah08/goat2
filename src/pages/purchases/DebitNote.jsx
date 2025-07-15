import React, { useState } from 'react';
import {
  FileX,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import DropdownSelectMenu from '../../components/ui/selectDropdown';

export const DebitNote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categoryOptions = [
    { value: "Debit Note", label: "Debit Note" },
    { value: "Purchase Return", label: "Purchase Return" },
  ];

  const [debitNotes, setDebitNotes] = useState([
    { id: 1, debitNoteNo: 'DN-001', date: '2024-01-15', noteFor: 'Damaged goods', amount: 5000, category: 'Debit Note' },
    { id: 2, debitNoteNo: 'DN-002', date: '2024-01-14', noteFor: 'Quality issues', amount: 3200, category: 'Purchase Return' },
    { id: 3, debitNoteNo: 'DN-003', date: '2024-01-13', noteFor: 'Short delivery', amount: 6700, category: 'Debit Note' },
    { id: 4, debitNoteNo: 'DN-004', date: '2024-01-12', noteFor: 'Expired items', amount: 2500, category: 'Purchase Return' },
    { id: 5, debitNoteNo: 'DN-005', date: '2024-01-11', noteFor: 'Overcharge correction', amount: 1500, category: 'Debit Note' },
    { id: 6, debitNoteNo: 'DN-006', date: '2024-01-10', noteFor: 'Packing issue', amount: 1900, category: 'Debit Note' },
  ]);

  const getCategoryBadgeVariant = (category) => {
    switch (category) {
      case 'Debit Note':
        return 'success';       // green badge
      case 'Purchase Return':
        return 'secondary';     // gray/blue badge
      default:
        return 'secondary';
    }
  };

  const filteredDebitNotes = debitNotes.filter(note => {
    const matchesSearch = note.debitNoteNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.noteFor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || note.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredDebitNotes.length / itemsPerPage);
  const paginatedDebitNotes = filteredDebitNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  return (
 <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Debit Notes</h3>
          <p className="text-sm text-bodyGray-500">Manage debit notes and purchase returns</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 p-2 ">
             <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
            Create Debit Note
        </Button>
            <FileX className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
      </div>      

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
              <Input
                placeholder="Search by debit note no or note for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-bodyGray-200 focus:ring-primary-200 focus:border-primary-600"
              />
            </div>
            <div className="flex gap-2">
              <DropdownSelectMenu
                options={[{ value: "all", label: "All Categories" }, ...categoryOptions]}
                selected={selectedCategoryFilter}
                onChange={setSelectedCategoryFilter}
              />
              <Button variant="outline" className="text-primary-600 hover:bg-primary-100">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debit Notes ({filteredDebitNotes.length})</CardTitle>
          <CardDescription>Track debit notes and purchase returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
                <tr>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Debit No.</th>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Date</th>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Note For</th>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Amount</th>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Category</th>
                  <th className="py-3 px-3 text-left text-bodyGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDebitNotes.map(note => (
                  <tr key={note.id} className="border-b border-bodyGray-300 hover:bg-primary-50">
                    <td className="py-3 px-4 font-medium text-bodyGray-900">{note.debitNoteNo}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{note.date}</td>
                    <td className="py-3 px-4 text-bodyGray-600">{note.noteFor}</td>
                    <td className="py-3 px-4 font-medium text-red-600">₹{note.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Badge variant={getCategoryBadgeVariant(note.category)}>
                        {note.category}
                      </Badge>
                    
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-blue-700 hover:bg-blue-200">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-primary-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-bodyGray-500">
              Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebitNote;
