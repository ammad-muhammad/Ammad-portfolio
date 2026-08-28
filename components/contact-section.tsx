"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Footer } from "@/components/footer";

type FormState = "idle" | "loading" | "success" | "error";

const SERVICES = [
  "Frontend",
  "Full Stack",
  "UI/UX",
  "AI Integration",
  "Web Redesign",
];

export function ContactSection({
  isSectionActive = true,
}: {
  isSectionActive?: boolean;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selectedService, setSelectedService] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: `Service: ${selectedService || "Not specified"}\n\n${form.message}`,
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
      setSelectedService("");
      setTimeout(() => setFormState("idle"), 5000);
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full h-screen max-h-screen bg-white text-gray-900 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-8 lg:px-12 py-3 sm:py-6 gap-6 sm:gap-10">

        {/* LEFT COLUMN: Dark Panel (Animates element by element sequentially) */}
        <div className="bg-[#111111] text-white p-6 sm:p-9 rounded-2xl flex flex-col justify-between gap-5 h-full max-h-[420px] shadow-sm">
          
          {/* Top Info */}
          <div className="flex flex-col gap-3">
            {/* 1. Tag */}
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase"
            >
              /CONTACT
            </motion.p>

            {/* 2. Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight"
            >
              Have A Project <br />
              Idea In Mind? <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.2px #fff" }}>
                Let&apos;s Get Started
              </span>
            </motion.h2>

            {/* 3. Checklist Items (staggered sequentially) */}
            <div className="flex flex-col gap-2 pt-1">
              {[
                "Response within 24 hours",
                "Clean code & modern design",
                "React, Next.js & AI expertise",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isSectionActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.12 }}
                  className="flex items-center gap-2.5 text-xs text-gray-300 font-medium"
                >
                  <span className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-300">
                    ✓
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Bottom Email */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col gap-1"
          >
            <p className="text-[11px] text-gray-500 font-medium">Prefer email?</p>
            <a
              href="mailto:official.muhammadammad@gmail.com"
              className="text-xs text-gray-300 hover:text-white transition-colors font-medium"
            >
              official.muhammadammad@gmail.com
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Contact Form (Animates fields sequentially) */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-center h-full max-h-[420px]">
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-3 text-center py-8"
            >
              <CheckCircle size={44} className="text-black" />
              <h3 className="text-lg font-bold text-gray-900">Message Sent!</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
              {/* 1. Name + Email Fields */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Muhammad Ali"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-gray-900 outline-none transition-colors ${
                      errors.name ? "border-red-500" : focused === "name" ? "border-black" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-gray-900 outline-none transition-colors ${
                      errors.email ? "border-red-500" : focused === "email" ? "border-black" : "border-gray-200"
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>
              </motion.div>

              {/* 2. Service Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col gap-1"
              >
                <label className="text-[11px] font-semibold text-gray-700">What Do You Need?</label>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedService(selectedService === s ? "" : s)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                        selectedService === s
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 3. Project Brief */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.35 }}
                className="flex flex-col gap-1"
              >
                <label className="text-[11px] font-semibold text-gray-700">Project Brief</label>
                <textarea
                  rows={3}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`w-full px-3 py-1.5 rounded-lg border text-xs bg-white text-gray-900 outline-none resize-none transition-colors ${
                    errors.message ? "border-red-500" : focused === "message" ? "border-black" : "border-gray-200"
                  }`}
                />
                {errors.message && <span className="text-[10px] text-red-500">{errors.message}</span>}
              </motion.div>

              {/* 4. Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="pt-1"
              >
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
              </motion.div>

            </form>
          )}
        </div>

      </div>

      {/* Footer attached at bottom */}
      <Footer />
    </section>
  );
}
