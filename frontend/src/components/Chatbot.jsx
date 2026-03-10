import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  Loader2,
  Volume2,
  MicOff,
  VolumeX,
} from "lucide-react";
import { chatWithBot } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am your AI Crop Assistant. Ask me anything about crop diseases and treatments.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesEndRef = useRef(null);

  // Speech Recognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN"; // Can be made dynamic based on i18n

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await chatWithBot(userMsg);
      setMessages((prev) => [...prev, { sender: "ai", text: res.reply }]);
      speakText(res.reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I am having trouble connecting to the server. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!user) return null; // Only show for logged in users

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-80 md:w-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 mb-4">
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-full">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs text-emerald-100">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="hover:bg-emerald-500 p-2 rounded-full transition">
                {voiceEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-emerald-500 p-2 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96 min-h-80 bg-gray-50 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex max-w-[85%] ${
                  msg.sender === "user" ? "self-end" : "self-start"
                }`}>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="self-start bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            {SpeechRecognition && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-full transition-colors shrink-0 ${
                  isListening
                    ? "bg-red-100 text-red-600 animate-pulse"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}>
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-2 rounded-full transition-colors shrink-0 ${
                !input.trim()
                  ? "bg-emerald-100 text-emerald-300"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              }`}>
              <Send className="w-5 h-5 -ml-1 mt-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-1 text-white p-4 rounded-full shadow-xl transition-all flex items-center gap-3 animate-in zoom-in">
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
