import React, { useState } from "react";
import { FileText, Trash, Undo,Trash2 } from "lucide-react";

export const TrashPage = () => {
  const [forms, setForms] = useState([
    { id: 1, name: "Contact Form", description: "User contact information." },
    { id: 2, name: "Survey Form", description: "Collect user feedback." },
    { id: 3, name: "Registration Form", description: "User sign-up details." },
  ]);

  const restoreForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const deleteForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const deleteAll = () => {
    setForms([]);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Trash Invoice</h3>
              <p className="text-sm text-bodyGray-500">User deleted Invoice design</p>
            </div>
            <div className="rounded-lg bg-boldWhite p-2">
              <Trash className="h-6 w-6 text-bodyGray-800" />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-8 w-full mt-7">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between w-full p-4 rounded-xl border border-bodyGray-300"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-2 rounded-full bg-bodyGray-900 text-boldWhite">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">{form.name}</h3>
                    <p className="text-sm text-bodyGray-600">{form.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => restoreForm(form.id)}
                    className="p-2 rounded-lg  text-bodyGray-900 hover:bg-primary-500 hover:text-boldWhite cursor-pointer trasition-all"
                  >
                    <Undo className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteForm(form.id)}
                    className="p-2 rounded-lg  text-bodyGray-900 hover:bg-red-600 hover:text-boldWhite cursor-pointer trasition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {forms.length > 0 && (
        <button
        onClick={deleteAll}
        className="mt-6 w-full p-3 hover:bg-red-600 transition-all cursor-pointer text-red-500 hover:text-boldWhite border-2 rounded-lg flex items-center justify-center"
      >
        <Trash2 className="h-5 w-5 mr-2" /> Delete All
      </button>
      
          )}
        </div>
      </div>
    </div>
  );
};
