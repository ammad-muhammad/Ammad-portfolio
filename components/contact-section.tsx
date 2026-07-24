"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "official.muhammadammad@gmail.com",
    href: "mailto:official.muhammadammad@gmail.com",
    color: "#61DAFB",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 314 449 2427",
    href: "tel:+923144492427",
    color: "#68A063",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
    href: "https://maps.google.com/?q=Karachi,Pakistan",
    color: "#F7DF1E",
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/ammad-muhammad",
    color: "#e2e8f0",
    emoji: "🐙",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ammadm/",
    color: "#0A66C2",
    emoji: "💼",
  },
  {
    label: "Email",
    href: "mailto:official.muhammadammad@gmail.com",
    color: "#61DAFB",
    emoji: "✉️",
  },
];

// ── Types ─────────────────────────────────────────────────────

type FormState = "idle" | "loading" | "success" | "error";

// ── Main Section ──────────────────────────────────────────────

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message too short";
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS env variables missing!");
      setFormState("error");
      return;
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            reply_to: form.email,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send email");
      }

      console.log("EmailJS success!");
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);

    } catch (error: any) {
      console.error("EmailJS error details:", error.message || error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-white text-sm bg-white/[0.04] border outline-none placeholder:text-white/25 transition-all duration-200";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#030712] overflow-hidden py-10"
    >
      {/* Bg glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            05.
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get In Touch
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/40 text-base max-w-xl mb-14"
        >
          Open to freelance projects, full-time roles, and collaborations.
          Let&apos;s build something great together!
        </motion.p>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: Info + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Availability card */}
            <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold tracking-wide">
                    Available for work
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  Let&apos;s Talk 👋
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Whether it&apos;s a project, opportunity, or just a hello,
                  my inbox is always open.
                </p>
              </div>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {INFO_CARDS.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08]
                             bg-white/[0.02] hover:bg-white/[0.04]
                             hover:border-white/15 transition-all duration-200 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: `${card.color}15`,
                      borderColor: `${card.color}30`,
                    }}
                  >
                    <card.icon size={15} style={{ color: card.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/35 text-xs mb-0.5">{card.label}</p>
                    <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                      {card.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                             border border-white/10 bg-white/[0.03]
                             hover:bg-white/[0.06] text-white/50 hover:text-white
                             transition-all duration-200 text-sm font-medium"
                >
                  <span className="text-base leading-none">{s.emoji}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Glass Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="lg:col-span-3"
          >
            <div
              className="relative p-7 sm:p-8 rounded-2xl border border-white/10
                         bg-white/[0.02] backdrop-blur-sm overflow-hidden h-full"
            >
              {/* Corner glows */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/[0.08] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

              {/* Success state */}
              {(formState as string) === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                  >
                    <CheckCircle size={56} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-white font-bold text-xl">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-white/50 text-sm text-center max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within
                    24 hours!
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 flex flex-col gap-5"
                >
                  <h3 className="text-white font-bold text-lg mb-1">
                    Send a Message
                  </h3>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs font-medium tracking-wide uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Muhammad Ali"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        borderColor: errors.name
                          ? "rgba(239,68,68,0.5)"
                          : focused === "name"
                          ? "rgba(34,211,238,0.5)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focused === "name"
                            ? "0 0 0 3px rgba(34,211,238,0.08)"
                            : "none",
                      }}
                    />
                    {errors.name && (
                      <span className="text-red-400 text-xs">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs font-medium tracking-wide uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        borderColor: errors.email
                          ? "rgba(239,68,68,0.5)"
                          : focused === "email"
                          ? "rgba(34,211,238,0.5)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focused === "email"
                            ? "0 0 0 3px rgba(34,211,238,0.08)"
                            : "none",
                      }}
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs font-medium tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Hey Ammad, I'd love to discuss a project with you..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={inputBase + " resize-none"}
                      style={{
                        borderColor: errors.message
                          ? "rgba(239,68,68,0.5)"
                          : focused === "message"
                          ? "rgba(34,211,238,0.5)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focused === "message"
                            ? "0 0 0 3px rgba(34,211,238,0.08)"
                            : "none",
                      }}
                    />
                    <div className="flex justify-between">
                      {errors.message ? (
                        <span className="text-red-400 text-xs">
                          {errors.message}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-white/20 text-xs">
                        {form.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Error message */}
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl
                                 border border-red-500/30 bg-red-500/10"
                    >
                      <span className="text-red-400 text-xl">⚠️</span>
                      <div>
                        <p className="text-red-400 font-semibold text-sm">
                          Failed to send!
                        </p>
                        <p className="text-red-400/70 text-xs mt-0.5">
                          Email directly: official.muhammadammad@gmail.com
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "loading" || formState === "success"}
                    whileHover={{ scale: formState === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: formState === "loading" ? 1 : 0.98 }}
                    className="relative flex items-center justify-center gap-2
                               px-6 py-3.5 rounded-xl font-bold text-sm text-[#030712]
                               bg-gradient-to-r from-cyan-400 to-blue-500
                               hover:shadow-lg hover:shadow-cyan-500/25
                               disabled:opacity-70 disabled:cursor-not-allowed
                               transition-all duration-200 overflow-hidden"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}

                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>

                  <p className="text-white/20 text-xs text-center">
                    I typically respond within 24 hours ✦
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
