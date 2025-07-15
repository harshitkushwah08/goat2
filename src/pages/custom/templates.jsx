import { useState, Fragment } from "react";
import { CheckCircle, MoreVertical, FileText, UploadCloud, Trash2, Save, X } from "lucide-react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Button } from "../../components/ui/button";

const templates = [
  { id: 1, name: "Template 1", format: "DOCX" },
  { id: 2, name: "Template 2", format: "DOCX" },
  { id: 3, name: "Template 3", format: "DOCX" },
];

export const TemplatePage = () => {
  const [selected, setSelected] = useState(templates[0]?.id || null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openDeleteDialog = (template) => {
    setDeleteTarget(template);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", deleteTarget); // add real delete logic
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full">

      {/* Templates header */}
      <div className="w-full">
        <div className="overflow-hidden rounded-2xl bg-boldWhite p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Templates</h3>
              <p className="text-sm text-bodyGray-500">List of templates</p>
            </div>
            <CheckCircle className="h-6 w-6 text-bodyGray-900" />
          </div>
        </div>
      </div>

      {/* Templates list */}
      <div className="w-full">
        {templates.map((template) => {
          const isSelected = selected === template.id;
          return (
            <div key={template.id} className="mt-5">
              <div
                className={`rounded-xl p-4 border border-bodyGray-300 flex justify-between items-center transition-all ${
                  isSelected ? "bg-primary-500 text-boldWhite" : "bg-boldWhite text-bodyGray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${isSelected ? "bg-boldWhite" : "bg-bodyGray-900"}`}>
                    <FileText className={`h-6 w-6 ${isSelected ? "text-primary-500" : "text-boldWhite"}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${isSelected ? "text-boldWhite" : "text-bodyGray-900"}`}>{template.name}</p>
                    <p className={`text-xs ${isSelected ? "text-boldWhite/80" : "text-bodyGray-500"}`}>2.4 MB • {template.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => setSelected(template.id)}>
                    <CheckCircle className={`w-10 h-10 p-2 rounded-md cursor-pointer transition ${
                      isSelected ? "text-boldWhite" : "text-bodyGray-900 hover:bg-primary-100 hover:text-primary-600"
                    }`} />
                  </Button>

                  {/* Clickable menu */}
                  <Menu as="div" className="relative">
                    <Menu.Button className={`w-8 h-8 rounded-md p-1 cursor-pointer transition ${
                      isSelected ? "text-boldWhite hover:bg-boldWhite/10" : "text-bodyGray-600 hover:bg-bodyGray-100 hover:text-primary-700"
                    }`}>
                      <MoreVertical className="w-6 h-6" />
                    </Menu.Button>
                    <Transition as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-boldWhite border border-bodyGray-300 rounded-md shadow-lg focus:outline-none z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => openDeleteDialog(template)}
                              className={`flex w-full items-center px-4 text-sm py-2 rounded cursor-pointer text-red-500 ${
                                active ? "bg-red-50" : ""
                              }`}
                            >
                              <Trash2 className="w-4 h-4 mr-3" /> Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          );
        })}
      </div>

   <Transition show={isDeleteOpen} as={Fragment}>
  <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsDeleteOpen(false)}>
    <div className="flex items-center justify-center min-h-screen p-4 text-center bg-black/30">
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
        
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <Trash2 className="h-8 w-8 text-red-600" />
        </div>

        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</Dialog.Title>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-800">{deleteTarget?.name}</span>? This action cannot be undone.
        </p>

        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => setIsDeleteOpen(false)}
            variant="outline"
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            className="flex-1 bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
</Transition>


      <div className="mt-6 grid grid-cols-2 gap-4 w-full">
        <Button className="bg-primary-600 text-boldWhite hover:bg-primary-700">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
        <Button variant="outline" className="text-bodyGray-600 border-2 border-bodyGray-300 hover:bg-bodyGray-200">
          Discard Changes
        </Button>
      </div>

      
  <div className="relative w-full">
        <div className="overflow-hidden rounded-2xl bg-boldWhite p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Upload Templates</h3>
              <p className="text-sm text-bodyGray-500">Drag & drop your files here</p>
            </div>
            <UploadCloud className="h-6 w-6 text-bodyGray-800" />
          </div>

          <div className="mt-6">
            <div className="relative rounded-xl border-2 border-dashed border-bodyGray-800 bg-boldWhite p-8 hover:border-bodyGray-400 transition">
              <input type="file" className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0" multiple />
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-bodyGray-900">
                  <UploadCloud className="h-10 w-10 text-boldWhite" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-bodyGray-900">Drop your files here or browse</p>
                  <p className="text-sm text-bodyGray-500">Support files: DOCX Only</p>
                  <p className="text-xs text-bodyGray-500">Max file size: 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-xl bg-boldWhite p-4 border border-bodyGray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-bodyGray-900 p-2">
                    <FileText className="h-6 w-6 text-boldWhite" />
                  </div>
                  <div>
                    <p className="font-medium text-bodyGray-900">document.pdf</p>
                    <p className="text-xs text-bodyGray-500">2.4 MB • PDF</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-bodyGray-500">84%</span>
                  <Button variant="ghost" className="text-bodyGray-400 hover:text-bodyGray-900">✖</Button>
                </div>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-bodyGray-300">
                <div className="h-full w-[84%] rounded-full bg-primary-500 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button className="bg-primary-600 text-boldWhite hover:bg-primary-700"> 
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
            <Button variant="outline" className="text-bodyGray-600 border-2 border-bodyGray-300 hover:bg-bodyGray-200">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
