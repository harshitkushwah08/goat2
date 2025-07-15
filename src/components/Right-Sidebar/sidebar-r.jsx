import React from 'react';
import { Bot, Send,StarIcon } from 'lucide-react';

const SideBar_AI = () => {
  const popularQuestions = [
    "How to create a new to-do item?",
    "Can I set reminders for tasks?",
    "How to prioritize tasks?",
    "How to assign a due date?",
    "Can I sync tasks with my calendar?"
  ];

  return (
    <div className="mt-10 border-l-1 ring-1 ring-primary-100 p-4 h-auto rounded-lg border-primary-200">
      <h2 className="text-md font-semibold mb-3 flex items-center justify-between text-bodyGray-800">
        AI Assistant <Bot className="w-5 h-5 text-primary-500" />
      </h2>

      <div className="bg-bodyGray-50 p-3 rounded-lg mb-4">
        <h3 className="text-sm font-semibold text-bodyGray-800 mb-4">Popular Questions</h3>
        <ul className="space-y-2">
          {popularQuestions.map((q, i) => (
            <li key={i} className="text-sm flex py-3 px-3 ring-1 hover:bg-primary-50  gap-1 rounded-sm ring-primary-200 flex-wrap flex-row items-center text-bodyGray-500 hover:text-primary-500 cursor-pointer transition">
              <StarIcon className='w-4 h-4'/>{q}
            </li>
          ))}
        </ul>
      </div>

      <textarea
        placeholder="Ask anything about your to-do list..."
        className="w-full p-3 border border-bodyGray-400 rounded-lg h-20 resize-none text-sm
                   outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500
                   placeholder-bodyGray-400 text-bodyGray-800"
      />

      <button className="mt-2 bg-bodyGray-800 cursor-pointer hover:rotate-40 hover:bg-primary-600 transition text-boldWhite p-2 rounded-full float-right active:scale-95">
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SideBar_AI;
