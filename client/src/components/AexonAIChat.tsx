"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Minimize2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { API_ENDPOINTS } from "@/config/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AexonAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm Aexon AI Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Call the real RAG API backend with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for production
      
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          sessionId: sessionId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();
      
      console.log('API Response:', data); // Debug log

      if (data.status === 'success') {
        // Save session ID for conversation memory
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.answer,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        // Handle error response
        console.error('API Error:', data);
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message || "I'm having trouble connecting right now. Please try again or contact us at info@aexontech.com.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
    } catch (error: any) {
      console.error('Chat API error:', error);
      
      let errorMessage = "I'm currently offline. Please email us at info@aexontech.com or call +91 8762722153 for immediate assistance.";
      
      if (error.name === 'AbortError') {
        errorMessage = "Request timed out. The AI is taking too long to respond. Please try again.";
      }
      
      // Fallback error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group cursor-pointer"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary-blue rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              
              {/* Button */}
              <div className="relative bg-gradient-to-br from-primary-blue to-cyan-blue p-4 rounded-full shadow-2xl border border-white/20 text-white">
                <Sparkles size={28} className="text-white" />
              </div>
 
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-cyan-blue animate-ping opacity-10" />
            </div>
 
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-white text-dark-navy text-xs font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100">
              Chat with Aexon AI
            </div>
          </motion.button>
        )}
      </AnimatePresence>
 
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] flex flex-col"
          >
            <div
              className={`flex flex-col h-full rounded-2xl shadow-2xl border overflow-hidden ${
                isDark
                  ? "bg-dark-navy/95 border-white/10 backdrop-blur-xl text-white"
                  : "bg-white/95 border-slate-200/60 backdrop-blur-xl text-slate-700"
              }`}
            >
              {/* Header */}
              <div className={`p-4 flex items-center justify-between border-b ${
                isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-blue/5 text-primary-blue dark:bg-white/10 dark:text-cyan-blue">
                      <Sparkles size={20} className={isDark ? "text-white" : "text-primary-blue dark:text-cyan-blue"} />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 bg-teal-green ${
                      isDark ? "border-dark-navy" : "border-white"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-navy dark:text-white text-sm">
                      Aexon AI
                    </h3>
                    <p className={`text-[10px] font-semibold ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                      Always here to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg transition-all ${
                      isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
                    }`}
                  >
                    <Minimize2 size={18} className={isDark ? "text-gray-400" : "text-slate-500"} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg transition-all ${
                      isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
                    }`}
                  >
                    <X size={18} className={isDark ? "text-gray-400" : "text-slate-500"} />
                  </button>
                </div>
              </div>
 
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm font-semibold leading-relaxed ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-primary-blue to-cyan-blue text-white"
                          : isDark
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          message.sender === "user"
                            ? "text-white/60"
                            : isDark
                            ? "text-gray-400"
                            : "text-slate-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
 
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <div className="flex gap-1">
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            isDark ? "bg-white/60" : "bg-slate-400"
                          }`}
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            isDark ? "bg-white/60" : "bg-slate-400"
                          }`}
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            isDark ? "bg-white/60" : "bg-slate-400"
                          }`}
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
 
                <div ref={messagesEndRef} />
              </div>
 
              {/* Input */}
              <div
                className={`p-4 border-t ${
                  isDark ? "border-white/10" : "border-slate-100"
                }`}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-primary-blue/15 transition-all font-semibold ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white placeholder-white/30"
                        : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400"
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-blue to-cyan-blue text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p
                  className={`text-[10px] mt-2.5 text-center font-bold uppercase tracking-wider ${
                    isDark ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  Powered by Aexon AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
