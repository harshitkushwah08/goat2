import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Image as ImageIcon, Tag as TagIcon, Pencil } from 'lucide-react';
import { Button } from '../../components/ui/button'; 

export default function EditTaskModal({ isOpen, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    tags: task.tags,
    due: task.due,
    cover: null,
  });

  const quickTags = ['High Priority', 'Bug', 'Feature', 'UI', 'Backend'];

  const handleAddTag = (tag) => {
    if (!editedTask.tags.includes(tag)) {
      setEditedTask({ ...editedTask, tags: [...editedTask.tags, tag] });
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files?.[0]) {
      setEditedTask({ ...editedTask, cover: e.target.files[0] });
    }
  };

  const handleSave = () => {
    if (editedTask.title.trim()) {
      onSave({
        ...task,
        title: editedTask.title,
        tags: editedTask.tags,
        due: editedTask.due,
        cover: editedTask.cover ? URL.createObjectURL(editedTask.cover) : task.cover, // keep old if unchanged
      });
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-boldWhite p-6 shadow-xl space-y-4">
                <Dialog.Title className="text-lg font-semibold text-bodyGray-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5" /> Edit Task
                </Dialog.Title>

                <input
                  type="text"
                  placeholder="Task title..."
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="w-full p-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-bodyGray-900"
                />

                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddTag(tag)}
                      className="flex items-center gap-1 px-2 py-1 text-xs border border-primary-500 text-primary-500 rounded-full hover:bg-primary-50 active:scale-95 transition"
                    >
                      <TagIcon className="w-3 h-3" />
                      {tag}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Tags (comma separated)..."
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean),
                    })
                  }
                  value={editedTask.tags.join(', ')}
                  className="w-full p-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-bodyGray-900"
                />

                <input
                  type="text"
                  placeholder="Due (e.g., 5 days left)"
                  value={editedTask.due}
                  onChange={(e) => setEditedTask({ ...editedTask, due: e.target.value })}
                  className="w-full p-2 border border-bodyGray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-bodyGray-900"
                />

                <div className="relative h-32 rounded-lg border-2 border-primary-500 bg-gray-50 flex justify-center items-center shadow hover:shadow-md transition cursor-pointer overflow-hidden">
                  <div className="absolute flex flex-col items-center pointer-events-none">
                    <ImageIcon className="mb-2 text-primary-500 w-6 h-6" />
                    <span className="text-xs text-gray-500 font-medium">Drag & drop or click to upload new cover</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {editedTask.cover && (
                  <p className="text-xs text-primary-700 truncate bg-primary-100 p-2">
                    Selected: {editedTask.cover.name}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 flex-1">
                    Save
                  </Button>
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
