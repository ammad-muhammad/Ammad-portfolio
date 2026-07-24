"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

// ── Portfolio Knowledge Base ──────────────────────────────────
const SYSTEM_PROMPT = `
You are Ammad's personal AI assistant on his portfolio website.
You answer questions about Muhammad Ammad in a friendly, professional tone.
Keep answers concise (2-4 sentences max). Be helpful and enthusiastic.
If asked something you don't know about Ammad, say "I'm not sure about that, but you can contact Ammad directly!"

Here is everything about Muhammad Ammad:

PERSONAL INFO:
- Full Name: Muhammad Ammad
- Location: Karachi, Pakistan
- Email: official.muhammadammad@gmail.com
- Phone: +92 314 449 2427
- GitHub: github.com/ammad-muhammad
- LinkedIn: linkedin.com/in/ammadm/
- Status: Available for work / Open to opportunities

EDUCATION:
- Bachelors in Computer Science at Federal Urdu University of Arts, Science and Technology
- Started: March 2022, Currently ongoing

EXPERIENCE:
1. Backend PHP Laravel Intern at JoeyCo Logitech Pvt. Ltd (Feb 2023 - Mar 2023)
   - Worked on backend projects, gained web development experience
   - Collaborated with team on scalable web applications

2. Frontend & Backend Developer at Software House (Mar 2023 - Aug 2023)
   - Built responsive UIs with HTML, CSS, Bootstrap, JavaScript
   - Developed backend with Laravel PHP, MySQL
   - Worked with designers on UI/UX integration

SKILLS:
- Frontend: React, Next.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap, Material UI
- Backend: Node.js, Express.js, PHP, Laravel
- Database: Firebase, MySQL, MongoDB
- Tools: GitHub, Figma, Redux, VS Code

CERTIFICATIONS:
1. Front End Development - Jawan Pakistan Institute (Nov 2022 - Feb 2023)
   - HTML, CSS, JavaScript, Bootstrap, Firebase, GitHub
2. Web & Mobile App Development Full Stack - Saylani Mass IT Training SMIT (Sep 2024 - Ongoing)
   - React, Node.js, Express.js, Firebase, MongoDB

PROJECTS:
1. AI PitchCraft (Hackathon Project at SMIT)
   - Tech: React.js, Firebase, Gemini AI API
   - AI-powered startup pitch generator
   - Firebase Authentication, Firestore for real-time data
   - Users can generate, edit, download professional pitches

2. Taxero Solution (Client Project)
   - Tech: HTML, CSS, JavaScript, Bootstrap
   - Professional website for tax solutions company
   - Responsive, cross-browser compatible

3. Personal Portfolio
   - Tech: HTML, CSS, JavaScript, Bootstrap
   - Responsive with animations and smooth scrolling

4. Portfolio v2
   - Tech: HTML, Tailwind CSS, JavaScript
   - Modern sleek design

5. Password Generator
   - Tech: HTML, CSS, JavaScript
   - Generates strong random passwords with customization

6. CRUD Application
   - Tech: HTML, CSS, JavaScript
   - Create, Read, Update, Delete operations

7. To-Do Application
   - Tech: HTML, CSS, JavaScript
   - Task management with localStorage

8. Netflix Clone
   - Tech: HTML, CSS, JavaScript
   - Pixel-perfect Netflix UI clone

9. Age Calculator
   - Tech: HTML, CSS, JavaScript
   - Calculates exact age in years, months, days

PERSONALITY & ABOUT:
- Hardworking and passionate developer
- Loves exploring new technologies
- Started coding because he wanted to build things that work
- Cares about clean UI, smooth interactions, readable code
- Currently leveling up full-stack skills at SMIT
- Based in Karachi, Pakistan

COMMON QUESTIONS TO ANSWER:
Q: Is Ammad available for work?
A: Yes! Ammad is actively looking for frontend/full-stack opportunities.

Q: What is Ammad's strongest skill?
A: React.js and Frontend Development with 2+ years experience.

Q: Can Ammad do freelance work?
A: Yes, Ammad is open to freelance projects and full-time roles.

Q: How to contact Ammad?
A: Email: official.muhammadammad@gmail.com or use the contact form on this page.

Q: What projects has Ammad built?
A: He has built 9+ projects including AI PitchCraft (hackathon winner), Taxero Solution (client work), Netflix Clone, and more.
`;

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  "Who is Ammad? 👋",
  "What are his skills? 💻",
  "Show me his projects 🚀",
  "Is he available for work? 💼",
];

function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
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
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
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
      content: "Hi! I'm Ammad's AI assistant 👋 Ask me anything about Muhammad Ammad — his skills, projects, experience, or how to hire him!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [typedIds, setTypedIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
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
      const aiText = data.text;

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) setHasNewMessage(true);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now. Contact Ammad at official.muhammadammad@gmail.com 😊",
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
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-[9998]
                       w-[340px] sm:w-[380px]
                       flex flex-col rounded-2xl overflow-hidden
                       border border-white/10
                       shadow-2xl shadow-black/50"
            style={{
              background: "linear-gradient(135deg, #0a0f1e 0%, #060b14 100%)",
              bottom: "88px",
              right: "16px",
              maxHeight: "calc(100vh - 110px)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-white/8"
              style={{
                background: "linear-gradient(to right, rgba(6,182,212,0.1), rgba(59,130,246,0.1))",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500
                                  flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full
                                  bg-green-400 border-2 border-[#0a0f1e]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ammad's Assistant</p>
                  
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-white/40 hover:text-white hover:bg-white/10
                           transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3"
              style={{ overflowY: "auto", scrollbarWidth: "none" }}
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                      ${msg.role === "assistant"
                        ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                        : "bg-white/10 border border-white/15"
                      }`}
                  >
                    {msg.role === "assistant"
                      ? <Bot size={13} className="text-white" />
                      : <User size={13} className="text-white/70" />
                    }
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed
                      ${msg.role === "assistant"
                        ? "bg-white/[0.06] text-white/85 rounded-tl-sm border border-white/8"
                        : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-sm"
                      }`}
                  >
                    {msg.role === "assistant" && msg.id !== "1" && !typedIds.has(msg.id)
                      ? (
                        <TypingText
                          text={msg.content}
                          onComplete={() => setTypedIds(prev => new Set(prev).add(msg.id))}
                        />
                      )
                      : msg.content
                    }
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500
                                  flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/8 rounded-2xl rounded-tl-sm
                                  px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                        animate={{ y: [0, -5, 0] }}
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

            {/* Suggested questions — show only at start */}
            {messages.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/25
                               bg-cyan-500/8 text-cyan-400 hover:bg-cyan-500/15
                               transition-all duration-150 whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t border-white/8">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                              border border-white/10 bg-white/[0.04]
                              focus-within:border-cyan-500/40
                              focus-within:bg-white/[0.06]
                              transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Ammad..."
                  className="flex-1 bg-transparent text-white/80 text-sm
                             placeholder:text-white/25 outline-none"
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                             bg-gradient-to-br from-cyan-400 to-blue-500
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-all duration-150"
                >
                  {loading
                    ? <Loader2 size={14} className="text-white animate-spin" />
                    : <Send size={14} className="text-white" />
                  }
                </motion.button>
              </div>
              <p className="text-white/15 text-[10px] text-center mt-1.5">
                Powered by Google Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-[9998]
                   w-14 h-14 rounded-2xl
                   bg-gradient-to-br from-cyan-400 to-blue-600
                   flex items-center justify-center
                   shadow-lg shadow-cyan-500/30
                   border border-cyan-400/30"
        style={{ boxShadow: "0 0 20px rgba(34,211,238,0.3), 0 4px 20px rgba(0,0,0,0.4)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {hasNewMessage && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                       bg-red-500 border-2 border-[#030712]"
          />
        )}

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}
