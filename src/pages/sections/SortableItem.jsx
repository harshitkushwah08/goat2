// SortableItem.jsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical, Edit, Trash2, GripVertical } from "lucide-react";
import EditTaskModal from "../../components/ui/EditModaltodo";
import ConfirmDeleteModal from "../../components/ui/deleteModaltodo";

export function SortableItem({ id, task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="bg-boldWhite p-3 rounded-lg shadow mb-2 relative flex items-start"
      >
        {/* Drag handle */}
        <button
          {...listeners}
          className="cursor-grab text-bodyGray-400 hover:text-bodyGray-600 mr-2 mt-1"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <div className="font-medium">{task.title}</div>
          <div className="text-sm text-bodyGray-500 flex flex-wrap gap-1 mt-1">
            {task.tags.map((tag, i) => (
              <span key={i} className="bg-bodyGray-300 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-right text-bodyGray-400 mt-1">{task.due}</div>
        </div>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-2">
          <Menu.Button className="p-1 rounded hover:bg-bodyGray-100 text-bodyGray-400">
            <MoreVertical className="w-4 h-4" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-1 w-28 rounded-md bg-boldWhite shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setIsEditOpen(true)}
                      className={`${
                        active ? "bg-primary-50 text-primary-600" : "text-bodyGray-700"
                      } flex items-center gap-2 px-2 py-1.5 text-sm w-full`}
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setIsDeleteConfirmOpen(true)}
                      className={`${
                        active ? "bg-red-50 text-red-600" : "text-red-500"
                      } flex items-center gap-2 px-2 py-1.5 text-sm w-full`}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Modals */}
      {isEditOpen && (
        <EditTaskModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          task={task}
          onSave={(updatedTask) => {
            console.log("Save", updatedTask);
            setIsEditOpen(false);
          }}
        />
      )}
      {isDeleteConfirmOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => {
            console.log("Delete", task.id);
            setIsDeleteConfirmOpen(false);
          }}
        />
      )}
    </>
  );
}
