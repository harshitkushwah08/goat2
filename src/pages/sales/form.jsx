import React, { useState } from "react";
import { FileText, Edit, CheckCircle, Trash2, PlusCircle } from "lucide-react";

export const FormPage = () => {
  const [selectedForm, setSelectedForm] = useState(1);

  const forms = [
    { id: 1, name: "Contact Form", description: "User contact information." },
    { id: 2, name: "Survey Form", description: "Collect user feedback." },
    { id: 3, name: "Registration Form", description: "User sign-up details." },
  ];

  const toggleSelect = (id) => {
    setSelectedForm(selectedForm === id ? 1 : id);
  };

  const deleteAll = () => {
    setSelectedForm(null);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Form Design</h3>
              <p className="text-sm text-bodyGray-500">All your custom Form Designs</p>
            </div>
            <div className="rounded-lg bg-boldWhite p-2">
              <FileText className="h-6 w-6 text-bodyGray-800" />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-8 w-full mt-7">
            <div className="flex justify-centre gap-5 w-full">
              <button className="flex items-center gap-3 bg-bodyGray-900 text-boldWhite px-4 py-2 rounded-lg hover:bg-bodyGray-800  w-full">
                <PlusCircle className="h-5 w-5" /> Create a New Form
              </button>
              <button
  onClick={deleteAll}
  className="flex items-center justify-center gap-2 border border-red-600 text-red-600 bg-boldWhite px-4 py-2 w-full cursor-pointer rounded-lg transition-all hover:bg-red-600 hover:text-boldWhite  focus:scale-100"
>
  <Trash2 className="w-5 h-5" />
  Delete All
</button>
            </div>
            {forms.map((form) => (
              <div
                key={form.id}
                className={`flex items-center justify-between w-full p-4 rounded-xl border border-bodyGray-300 ${
                  selectedForm === form.id ? "bg-primary-500 text-boldWhite" : "bg-boldWhite text-bodyGray-900"
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div
                    className={`p-2 rounded-full border ${
                      selectedForm === form.id ? "text-primary-600  bg-boldWhite" : "bg-bodyGray-900  text-boldWhite"
                    }`}
                  >
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">{form.name}</h3>
                    <p className={`text-sm ${selectedForm === form.id ? "text-bodyGray-300" : "text-bodyGray-600"} `}>{form.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg transition-all  ${selectedForm === form.id ? "hover:bg-boldWhite hover:text-primary-600" : "hover:bg-bodyGray-800 hover:text-boldWhite hover:scale-110"} cursor-pointer`}>
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleSelect(form.id)}
                    className={`cursor-pointer p-2 rounded-lg transition-all ${
                      selectedForm === form.id ? "text-boldWhite hover:text-primary-600 hover:bg-boldWhite" : "hover:bg-primary-500 hover:text-boldWhite hover:scale-110"
                    }`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button className={`cursor-pointer p-2 rounded-lg  ${
                      selectedForm === form.id ? "hover:bg-boldWhite hover:text-red-500" : "hover:bg-red-500 hover:text-boldWhite"
                    }`}>
                    <Trash2 className="h-5 w-5"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
