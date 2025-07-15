import  { useState } from "react";
import {  ListTodo,Hand } from "lucide-react";
import SideBar_AI from "../../components/Right-Sidebar/sidebar-r";
import CreateTaskModal from "../../components/ui/todoModal";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../sections/SortableItem";

const initialData = {
  todo: {
    name: "To Do",
    tasks: [
      { id: "1", title: "Layout Design", tags: ["Update", "Web"], due: "12 days left" },
      { id: "2", title: "e-Finance Onboarding", tags: ["New Feature", "iOS"], due: "24 days left" },
    ],
  },
  inProgress: {
    name: "In Progress",
    tasks: [
      { id: "3", title: "Create iconset for the entire platform", tags: ["UI Kit", "Application"], due: "2 days left" },
      { id: "4", title: "Explore new visual concepts", tags: ["Web", "Portfolio"], due: "4 days left" },
      { id: "5", title: "Develop overall look & feel", tags: ["Concept", "Web"], due: "7 days left" },
    ],
  },
  inReview: {
    name: "In Review",
    tasks: [
      { id: "6", title: "Take pictures of office", tags: ["Team"], due: "4 days left" },
      { id: "7", title: "Brainstorm on platform's name", tags: ["Tag"], due: "8 days left" },
      { id: "8", title: "Complete Wireframes", tags: ["UX", "Prototype"], due: "5 days left" },
    ],
  },
};

export const ToDoList = () => {
  const [columns, setColumns] = useState(initialData);
  const [activeTask, setActiveTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const sensors = useSensors(useSensor(PointerSensor));

   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleAddTask = (task) => {
    setColumns(prev => ({
      ...prev,
      todo: {
        ...prev.todo,
        tasks: [...prev.todo.tasks, task]
      }
    }));
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(active.id);
  };

const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over) {
    setActiveTask(null);
    return;
  }

  // If dropped on itself, do nothing
  if (active.id === over.id) {
    setActiveTask(null);
    return;
  }

  // Find source column and index
  let sourceColumnKey = null;
  let sourceTaskIndex = -1;
  for (const key in columns) {
    const idx = columns[key].tasks.findIndex(task => task.id === active.id);
    if (idx !== -1) {
      sourceColumnKey = key;
      sourceTaskIndex = idx;
      break;
    }
  }

  if (sourceColumnKey === null) {
    setActiveTask(null);
    return;
  }

  // Determine if over.id is a task or column
  let destColumnKey = null;
  let destTaskIndex = -1;

  // Check if over.id is a task id in any column
  for (const key in columns) {
    const idx = columns[key].tasks.findIndex(task => task.id === over.id);
    if (idx !== -1) {
      destColumnKey = key;
      destTaskIndex = idx;
      break;
    }
  }

  // If not found in tasks, maybe dropped on empty column container (over.id is column id)
  if (!destColumnKey && columns[over.id]) {
    destColumnKey = over.id;
    destTaskIndex = -1; // append at end
  }

  if (!destColumnKey) {
    setActiveTask(null);
    return;
  }

  // Same column drag (reorder)
  if (sourceColumnKey === destColumnKey) {
    if (destTaskIndex === -1) {
      setActiveTask(null);
      return;
    }

    if (sourceTaskIndex !== destTaskIndex) {
      const newTasks = arrayMove(columns[sourceColumnKey].tasks, sourceTaskIndex, destTaskIndex);
      setColumns({
        ...columns,
        [sourceColumnKey]: {
          ...columns[sourceColumnKey],
          tasks: newTasks,
        },
      });
    }
  } else {
    // Moving between columns

    const taskToMove = columns[sourceColumnKey].tasks[sourceTaskIndex];
    const newSourceTasks = [...columns[sourceColumnKey].tasks];
    newSourceTasks.splice(sourceTaskIndex, 1);

    const newDestTasks = [...columns[destColumnKey].tasks];
    if (destTaskIndex === -1) {
      // Append to empty or end of column
      newDestTasks.push(taskToMove);
    } else {
      // Insert before the destination task
      newDestTasks.splice(destTaskIndex, 0, taskToMove);
    }

    setColumns({
      ...columns,
      [sourceColumnKey]: { ...columns[sourceColumnKey], tasks: newSourceTasks },
      [destColumnKey]: { ...columns[destColumnKey], tasks: newDestTasks },
    });
  }

  setActiveTask(null);
};


  return (
    <div className="flex w-full ">
      <div className="flex-grow p-5 overflow-auto">
  <div className="relative mb-5 overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">To-Do List</h3>
            <p className="text-sm text-bodyGray-500">Manage your tasks efficiently</p>
          </div>
          <div className="rounded-lg bg-boldWhite p-2 ">
            <ListTodo className="h-6 w-6 text-bodyGray-800 " />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 px-0 py-2 ">
  <div className="flex gap-2">
    <button className="px-3 py-1  text-sm font-medium border border-bodyGray-400 text-bodyGray-500 rounded-md hover:bg-red-50 hover:text-red-500 hover:border-red-600 active:bg-red-500 active:border-red-400 cursor-pointer active:text-boldWhite active:scale-95 transition">
      High Priority
    </button>
    <button className="px-3 py-1 text-sm font-medium border border-bodyGray-400 text-bodyGray-500 rounded-md   hover:bg-yellow-50 hover:text-yellow-500 hover:border-yellow-600 active:bg-yellow-500 active:border-yellow-600 cursor-pointer active:text-boldWhite active:scale-95 transition">
      Medium Priority
    </button>
    <button className="px-3 py-1 text-sm font-medium border border-bodyGray-400 text-bodyGray-500 rounded-md hover:bg-primary-100 hover:text-primary-500 hover:border-primary-600 active:bg-primary-600 active:border-primary-600 cursor-pointer active:text-boldWhite active:scale-95 transition">
      Low Priority
    </button>
  </div>
  <button onClick={() => setIsTaskModalOpen(true)} className="bg-boldWhite cursor-pointer border-2 border-primary-600 hover:bg-primary-600 hover:text-boldWhite hover:border-primary-600 text-primary-600 px-4 py-2 rounded-md text-sm font-medium active:scale-95 transition">
    + Create Task
  </button>
</div>

      </div>        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(columns).map(([columnId, column]) => (
  <div
    key={columnId}
    id={columnId} 
  className="bg-primary-50 p-5 rounded-xl min-h-[300px]"
>
                <div className="text-lg font-semibold mb-2">{column.name}</div>
                <SortableContext
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.tasks.map((task) => (
                    <SortableItem key={task.id} id={task.id} task={task} />
                  ))}
                </SortableContext>
              </div>
            ))}
          </div>
          <DragOverlay>
            {activeTask && (
<div className="bg-boldWhite/5 p-3 rounded-lg shadow flex items-center space-x-2">
  <Hand className="w-4 h-4 text-bodyGray-600" />
  <span className="text-sm text-bodyGray-800">Dragging</span>
</div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
  <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreate={handleAddTask}
      />
    <SideBar_AI isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
};

