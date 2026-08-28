"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  "Who is Ammad? 👋",
  "What are his tech skills? 💻",
  "Show me his experience 💼",
  "How to contact him? ✉️",
];

function TypingText({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
        onComplete?.();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-3.5 bg-black ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am Ammad's AI assistant. Ask me anything about his skills, experience, projects, or availability!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [typedIds, setTypedIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!response.ok) throw new Error("API failed");

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'm temporarily offline. You can reach out directly at official.muhammadammad@gmail.com!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed z-[9998] w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-2xl text-gray-900"
            style={{
              bottom: "84px",
              right: "20px",
              maxHeight: "calc(100vh - 100px)",
              height: "500px",
            }}
          >
            {/* Header */}
            <div className="bg-black text-white px-4 py-3.5 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-tight">Muhammad Ammad</h4>
                  <p className="text-[10px] font-medium text-emerald-400">AI Assistant · Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages Body */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5 bg-white"
              style={{ scrollbarWidth: "none" }}
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                      msg.role === "assistant"
                        ? "bg-black text-white"
                        : "bg-gray-100 border border-gray-200 text-gray-700"
                    }`}
                  >
                    {msg.role === "assistant" ? <Bot size={13} /> : <User size={13} />}
                  </div>

                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-gray-50 border border-gray-200 text-gray-800 rounded-tl-xs"
                        : "bg-black text-white rounded-tr-xs"
                    }`}
                  >
                    {msg.role === "assistant" && msg.id !== "1" && !typedIds.has(msg.id) ? (
                      <TypingText
                        text={msg.content}
                        onComplete={() => setTypedIds((prev) => new Set(prev).add(msg.id))}
                      />
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-xs px-4 py-2.5 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-black"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (at start) */}
            {messages.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-white">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="px-3 py-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-black focus-within:bg-white transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-gray-900 text-xs placeholder:text-gray-400 outline-none"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center hover:bg-gray-800 disabled:opacity-30 transition-all"
                >
                  {loading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Send size={13} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Circular Launcher Button (No Text - Icon Only) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI Assistant"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9998] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center shadow-2xl border border-gray-800 hover:bg-gray-800 transition-all duration-300"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare size={18} />
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
          )}
        </div>
      </motion.button>
    </>
  );
}
