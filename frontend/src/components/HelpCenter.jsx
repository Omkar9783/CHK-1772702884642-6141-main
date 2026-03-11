import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Send, Bot, User, HelpCircle, Loader2 } from "lucide-react";
import { chatWithBot } from "../services/api";

const HelpCenter = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with a welcome message on mount
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: "Hello! I am your CropCare Dashboard Assistant. I can help guide you on how to use the Disease Detection tool, view your History, or browse the Crop Library. What would you like to know how to do today?",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      // Modify the prompt to instruct the AI to act specifically as a UI Help Guide
      const systemContext = "You are the CropCare Dashboard Help Assistant. Your sole job is to explain HOW to use the application. If the user asks how to detect a disease, tell them to click the Camera icon and upload a leaf photo. If they ask about history, tell them to click the Clock icon. If they ask about diseases, tell them to check the Library (Book icon). Keep instructions very short, friendly, and step-by-step. Do not provide farming advice; only app usage instructions.";
      
      const payload = `${systemContext}\n\nUser Question: ${userMsg}`;
      
      const response = await chatWithBot(payload);
      
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm sorry, I'm having trouble connecting to the Help Desk right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-card overflow-hidden flex flex-col h-[500px] border-emerald-500/30 border-2 shadow-2xl shadow-emerald-900/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 p-4 text-white flex items-center gap-4">
        <div className="relative w-14 h-14 shrink-0">
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
          <img src="/friendly_robot.png" alt="Help Robot" className="w-full h-full object-cover rounded-full border-2 border-emerald-300 shadow-md relative z-10" />
        </div>
        <div>
          <h3 className="font-black text-xl leading-tight">Help Center Assistant</h3>
          <p className="text-emerald-100 text-sm font-medium">Ask me how to use the app!</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/30">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-100 border border-emerald-300 shadow-sm overflow-hidden"
              }`}
            >
              {msg.sender === "user" ? <User size={16} /> : <img src="/friendly_robot.png" alt="AI" className="w-full h-full object-cover" />}
            </div>
            
            <div
              className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm font-medium ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-200"
                  : "bg-white text-gray-700 rounded-tl-none border border-emerald-100 shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={16} />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-emerald-100 shadow-sm flex gap-1 items-center">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-emerald-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl py-3 pl-4 pr-12 text-gray-800 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white p-2 rounded-xl transition-colors shadow-sm"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
