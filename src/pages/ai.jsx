import { useState } from 'react';
import { Bot, ThumbsUp, ThumbsDown, Clipboard, Send, Sparkles, Zap, Lightbulb, Wand2, HistoryIcon } from 'lucide-react';
import { imgPath } from '../assets/imagesData';
import HistorySidebar from '../components/sidebar/historySidebar';


const recentChats = [
  "What is the weather in New York today and tomorrow and also next week?",
  "Define quantum computing and its applications in AI",
  "Who won the IPL 2024 final and how did they perform?",
  "Generate a sales report template for Q3 2025",
  "Summarize the key features of the new tax policy",
  "How can I improve inventory turnover ratio?",
];

const turncateText = (text,maxLength = 5) => {
const words = text.trim().split(/\s+/);
if (words.length <= maxLength) return text;
return words.slice(0, maxLength).join(' ') + '...';
}

const aiFeatures = [
  { 
    icon: <Sparkles className="h-5 w-5 text-purple-500" />, 
    title: "Smart Suggestions", 
    description: "Get intelligent recommendations based on your business data" 
  },
  { 
    icon: <Zap className="h-5 w-5 text-yellow-500" />, 
    title: "Quick Answers", 
    description: "Instant responses to your business queries" 
  },
  { 
    icon: <Lightbulb className="h-5 w-5 text-blue-500" />, 
    title: "Business Insights", 
    description: "Uncover trends and patterns in your data" 
  },
  { 
    icon: <Wand2 className="h-5 w-5 text-green-500" />, 
    title: "Document Generation", 
    description: "Create reports, emails, and more with AI assistance" 
  }
];

export const Ai = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI assistant. How can I help you with your inventory management today?'
    }
  ]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const simulateTyping = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque eum facilis repudiandae nihil quae laboriosam et velit deserunt hic delectus! Reiciendis maiores expedita fuga asperiores officia ratione, cumque harum tempora.'
      }]);
      setIsTyping(false);
      setInputValue("");
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-5 bg-boldWhite p-6 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl bg-boldWhite  p-5 w-full ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-bodyGray-900">A.I</h3>
            <p className="text-sm text-bodyGray-500">Your Personal A.I Chat Bot</p>
          </div>
          <div className="rounded-full p-3 flex flex-row justify-center items-center gap-4">
            <button  onClick={() => setSidebarOpen(true)}  className='flex flex-row justify-center items-center text-sm p-3 bg-primary-600 text-boldWhite gap-1 rounded-md transition-all active:scale-98 hover:bg-primary-700'><HistoryIcon  size={20}/> History Panel</button>
            <Bot className="h-6 w-6 text-bodyGray-800" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {aiFeatures.map((feature, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-bodyGray-200 shadow-sm hover:border-primary-200 hover:ring-2 hover:ring-primary-50 transition-shadow">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-bodyGray-100 rounded-full mr-3">
                {feature.icon}
              </div>
              <h3 className="font-medium text-bodyGray-800">{feature.title}</h3>
            </div>
            <p className="text-sm text-bodyGray-500">{feature.description}</p>
          </div>
        ))}
      </div>

<div className='flex flex-row w-full justify-between relative'>

    <div className='flex flex-col gap-5   w-3/4 pr-4'>
      {messages.map((message, index) => (
        message.role === 'assistant' ? (
          <div key={index} className="flex w-full max-w-2xl bg-primary-50 border-2 ring-1 ring-primary-50 border-primary-200 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="w-12 h-12 border-1 ring-3 ring-primary-100 bg-boldWhite border-primary-200 rounded-full overflow-hidden">
                <img
                  src={imgPath.imgLogoMobile}
                  alt="AI Logo"
                  className="w-full h-full object-cover p-1.5"
                />
              </div>

              <div className="flex-1 font-medium text-sm text-bodyGray-800 text-justify leading-relaxed">
                <p>{message.content}</p>

                <div className="flex flex-wrap justify-end gap-3 mt-4">
                  <div className="flex items-center gap-5 bg-boldWhite rounded-lg px-3 py-1 hover:bg-bodyGray-50">
                    <ThumbsUp className="h-3 w-3 text-bodyGray-500 cursor-pointer transition-colors hover:text-primary-500 active:scale-95" />
                    <ThumbsDown className="h-3 w-3 text-bodyGray-500 cursor-pointer transition-colors hover:text-red-500 active:scale-95" />
                  </div>

                  <button className="flex items-center gap-1 active:scale-95 transition-transform bg-boldWhite rounded-lg px-2 py-1 cursor-pointer">
                    <Clipboard className="h-3 w-3 text-bodyGray-500" />
                    <span className="text-sm text-bodyGray-500 hover:text-primary-600 transition-colors">Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className="flex flex-row items-center justify-start gap-5 ml-5">
            <img src={imgPath.testi1} alt='User' className='w-10 h-10 rounded-full ring-2 ring-primary-100' />
            <span className='text-md tracking-wider font-md text-bodyGray-800'>{message.content}</span>
          </div>
        )
      ))}

      {isTyping && (
        <div className="flex flex-row items-center justify-start gap-5 ml-5">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-bodyGray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-bodyGray-400 rounded-full animate-pulse mx-1" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-bodyGray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      )}
    </div>

      <div className="w-2/3 mt-5 fixed bottom-8">
        <div className="relative">
          <textarea
            placeholder="Ask anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full min-h-12 max-h-48 pt-4 pb-13 pr-15 pl-4 bg-boldWhite rounded-lg border-2 border-bodyGray-300 text-bodyGray-800 placeholder-bodyGray-400 shadow-sm focus:outline-none focus:ring-8 focus:ring-bodyGray-100 focus:border-bodyGray-400 transition duration-200 resize-none overflow-y-auto"
          ></textarea>

          <button
            onClick={simulateTyping}
            className="absolute bottom-5 right-4 bg-bodyGray-900 text-boldWhite p-2 hover:rotate-40 cursor-pointer rounded-full hover:bg-primary-600 border-2 hover:border-primary-600 hover:ring-2 hover:ring-primary-200 border-bodyGray-900 hover:text-boldWhite transition duration-200"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

  

    </div>

      <HistorySidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

    </div>
    
);
};