import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Star, Archive, Tag, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { NoteModal } from '../../components/ui/notesModal';

const initialNotes = [
  {
    id: 1,
    title: "Meeting Notes - Q4 Planning",
    content: "Discussed quarterly goals, budget allocation, and team expansion plans. Key decisions made regarding new product launches.",
    tags: ["meeting", "planning", "q4"],
    starred: true,
    archived: false,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z"
  },
  {
    id: 2,
    title: "Invoice Template Ideas",
    content: "New design concepts for invoice templates. Consider adding company branding, better layout for itemized billing.",
    tags: ["invoice", "design", "templates"],
    starred: false,
    archived: false,
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z"
  },
  {
    id: 3,
    title: "Customer Feedback Summary",
    content: "Compiled feedback from recent customer surveys. Overall satisfaction high, but need to improve response times.",
    tags: ["feedback", "customers", "improvement"],
    starred: true,
    archived: false,
    createdAt: "2024-01-13T11:00:00Z",
    updatedAt: "2024-01-13T17:30:00Z"
  }
];

export const Notes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [] });

  // Get all unique tags
  const allTags = [...new Set(notes.flatMap(note => note.tags))];

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    const matchesArchived = showArchived ? note.archived : !note.archived;
    
    return matchesSearch && matchesTag && matchesArchived;
  });

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        ...newNote,
        starred: false,
        archived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', tags: [] });
      setIsCreating(false);
    }
  };

  const handleToggleStar = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, starred: !note.starred } : note
    ));
  };

  const handleArchiveNote = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col gap-5 bg-boldWhite p-5 ">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Notes</h3>
        <p className="text-sm text-bodyGray-500">Organize your thoughts and important information</p>
          </div>

          <div className="rounded-lg bg-boldWhite p-2 flex flex-row items-center gap-5">
               <Button 
              onClick={() => setIsCreating(true)}
              className="bg-primary-600 hover:bg-primary-700 w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
                <Edit className="h-6 w-6 text-boldGray-900" />
          </div>
        </div>
      </div>
    
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bodyGray-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 ring-primary-200 focus:border-primary-600 border-bodyGray-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-bodyGray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-boldWhite  text-bodyGray-900 "
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              
              <Button
                variant={showArchived ? "default" : "outline"}
                onClick={() => setShowArchived(!showArchived)}
              >
                <Archive className="w-4 h-4 mr-2" />
                {showArchived ? 'Show Active' : 'Show Archived'}
              </Button>
            </div>
          </div>
        </CardContent>

      {isCreating && (
<NoteModal
  isOpen={isCreating}
  onClose={() => setIsCreating(false)}
  onCreate={handleCreateNote}
  newNote={newNote}
  setNewNote={setNewNote}
/>
)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStar(note.id)}
                    className={note.starred ? 'text-yellow-500' : 'text-bodyGray-400'}
                  >
                    <Star className="w-4 h-4" fill={note.starred ? 'currentColor' : 'none'} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleArchiveNote(note.id)}
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-bodyGray-600  line-clamp-3 text-sm">
                {note.content}
              </p>
              
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-bodyGray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(note.updatedAt)}
                </span>
                {note.archived && (
                  <Badge variant="outline" className="text-xs">
                    Archived
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Edit className="mx-auto h-12 w-12 text-bodyGray-400 mb-4" />
            <p className="text-bodyGray-500 mb-4">
              {searchTerm || selectedTag !== 'all' 
                ? 'No notes found matching your criteria' 
                : 'No notes yet. Create your first note to get started!'
              }
            </p>
            {!searchTerm && selectedTag === 'all' && (
              <Button onClick={() => setIsCreating(true)} className="bg-primary-600 hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Note
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};