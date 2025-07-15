import { AboutData } from '../assets/mockData';
import  { useState } from 'react';
import { Linkedin, Github, Instagram,Info, FileText, Lock, BarChart, Settings, Trash2,ChevronDown, ChevronUp,MessageCircleQuestion } from "lucide-react";

const services = [
  {
    icon: <FileText className="h-8 w-8 text-bodyGray-800" />, 
    title: "Dynamic Document Generation",
    description: "Inventory Pro allows users to create dynamic forms that generate Word documents and PDFs. Users can provide a template with placeholders that are automatically filled with form input values.",
    bgColor: "bg-boldWhite",
    textColor: "text-bodyGray-900"
  },
  {
    icon: <BarChart className="h-8 w-8 text-boldWhite" />, 
    title: "Mathematical Logic Support",
    description: "The platform supports complex calculations following the BODMAS rule, ensuring accurate mathematical logic in documents. Users can generate graphs seamlessly.",
    bgColor: "bg-primary-500",
    textColor: "text-boldWhite"
  },
  {
    icon: <Lock className="h-8 w-8 text-bodyGray-800" />, 
    title: "Secure & Reliable",
    description: "With a secure login system and two-factor authentication, Inventory Pro ensures top-tier security, keeping all user data safe and protected at all times.",
    bgColor: "bg-boldWhite",
    textColor: "text-bodyGray-900"
  },
  {
    icon: <Settings className="h-8 w-8 text-boldWhite" />, 
    title: "Multiple Forms Support",
    description: "Users can work with multiple forms at once while maintaining clarity by selecting only one template per session. This enhances usability and efficiency.",
    bgColor: "bg-primary-500",
    textColor: "text-boldWhite"
  },
  {
    icon: <Trash2 className="h-8 w-8 text-bodyGray-800" />, 
    title: "Trash Folder",
    description: "Deleted forms are stored in a trash folder for 15 days, allowing users to restore them if needed or delete them permanently.",
    bgColor: "bg-boldWhite",
    textColor: "text-bodyGray-900"
  }
];

const faqData = [
  {
    question: "What is Quotation Pro used for?",
    answer: "Quotation Pro is used to generate professional documents like quotations, invoices, and contracts using dynamic templates."
  },
  {
    question: "Can I customize the document templates?",
    answer: "Yes, you can upload custom Word templates with placeholders which get automatically filled by form inputs."
  },
  {
    question: "Is Quotation Pro secure?",
    answer: "Absolutely. We use secure login and two-factor authentication to keep your data protected."
  },
  {
    question: "Can I recover deleted documents?",
    answer: "Yes, deleted documents stay in a trash folder for 15 days before being permanently removed."
  },
  {
    question: "Does it support multiple users or teams?",
    answer: "Currently, each account is individual, but we’re working on adding team support in future updates."
  },
];

export const InfoPage = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <>
    <div className="flex flex-col gap-8  justify-center items-center  bg-boldWhite  p-6">
       <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full ">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-bodyGray-900">Info </h3>
              <p className="text-sm text-bodyGray-500">Minds Behind Inventory Pro 2025 &copy;</p>
            </div>
            <div className="rounded-lg bg-boldWhite p-2">
              <Info className="h-6 w-6 text-bodyGray-800" />
            </div>
          </div>
          </div>

      <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center p-0 space-y-5 w-full ">
              <div className="w-full">
                <div className="relative overflow-hidden  bg-boldWhite border-b-2 border-primary-200 p-6 w-full">
                  <div className="flex items-center justify-between ">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-600">Services</h3>
                      <p className="text-sm text-bodyGray-500">Discover the features that make Quotation Pro powerful</p>
                    </div>
                  </div>
                </div>
              </div>
              {services.map((service, index) => (
                <div key={index} className={`flex items-center p-6 w-full rounded-xl ${service.bgColor} ${service.textColor}`}>
                  <div className="p-4 rounded-lg bg-opacity-20">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{service.title}</h4>
                    <p className="text-sm mt-1">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

    <div className="w-full">
                <div className="relative overflow-hidden  bg-boldWhite border-b-2 border-primary-200 p-6 w-full">
                  <div className="flex items-center justify-between ">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-600">F.A.Q</h3>
                      <p className="text-sm text-bodyGray-500">Questions You Might Have </p>
                    </div>
                  </div>
                </div>
              </div>

      <section className="w-full space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-boldWhite rounded-md border-b-2 border-bodyGray-300 p-4 cursor-pointer transition-all duration-300"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold text-bodyGray-800">{faq.question}</h4>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-bodyGray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-bodyGray-600" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-10 py-5 text-sm text-bodyGray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>

                <div className="flex flex-col items-center p-0 space-y-6 w-full">
              <div className="w-full">
                <div className="relative overflow-hidden  border-b-2 border-primary-200 p-6 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-600">About Us</h3>
                      <p className="text-sm text-bodyGray-500">Learn more about the team behind Quotation Pro</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>

    <div className="flex flex-col gap-10 justify-center items-center mt-10">
      {AboutData.map((item) => ( 
      <div className="w-full h-150 max-w-5xl bg-boldWhite shadow-md   overflow-hidden flex flex-col md:flex-row">
        <img
          alt="About Page Background"
          src={item.img}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover"
        />
        <div className="flex flex-col gap-4 justify-center p-6 md:w-1/2">
          <h1 className="text-3xl font-bold text-bodyGray-900">{item.name}</h1>
          <p className="text-lg text-bodyGray-500 mt-2">{item.job}</p>
          <p className="text-sm text-bodyGray-400 mt-4 leading-6">
           {item.bio}
          </p>
          <section className="flex justify-start items-center gap-5 mt-5">
      <a href={item.linkedin}>
        <button
          className="group flex justify-center items-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-bodyGray-500 to-bodyGray-900 text-boldWhite font-semibold transition-all duration-300 active:scale-100  hover:bg-bodyGray-900 hover:text-bodyGray-100 cursor-pointer hover:scale-110"
        >
          <Linkedin className="w-5 h-5" />
        </button>
      </a>
      <a href={item.github}>
        <button
          className="group flex justify-center items-center p-2 rounded-md drop-shadow-xl bg-bodyGray-900 text-boldWhite font-semibold transition-all duration-300  hover:bg-bodyGray-900 active:scale-100  hover:text-bodyGray-100 cursor-pointer hover:scale-110"
        >
          <Github className="w-5 h-5" />
        </button>
      </a>
      <a href={item.instagram}>
        <button
          className="group flex justify-center items-center p-2 rounded-md drop-shadow-xl bg-pink-600 text-boldWhite font-semibold transition-all duration-300  hover:bg-pink-800 active:scale-100 hover:text-bodyGray-100 cursor-pointer hover:scale-110"
        >
          <Instagram className="w-5 h-5" />
        </button>
      </a>
    </section>

        </div>
      </div>
      ))}
    </div>
     
    </div>

   
    </>
  );
};
