# Muhammad Ammad — Personal Portfolio

<div align="center">

![Portfolio Preview](public/preview.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, animated, and fully responsive developer portfolio built with cutting-edge web technologies.**

[🌐 Live Demo](ammad-portfolio-wine.vercel.app) · [📧 Contact](mailto:official.muhammadammad@gmail.com) · [💼 LinkedIn](https://linkedin.com/in/muhammad-ammad)

</div>

---

## ✨ Overview

This is my personal portfolio website — designed and developed from scratch to showcase my skills, projects, and professional journey as a **Frontend Developer** based in **Karachi, Pakistan**.

I built this portfolio not just to show what I know, but to push my limits — experimenting with 3D animations, particle effects, physics-based interactions, and AI integration to create an experience that stands out.

---

## 🚀 Features

### 🎭 Animated Loader
- Letter-by-letter name reveal animation on first visit
- Smooth blur-in effect using Framer Motion
- Session-based — only plays once per browser session
- Orbitron font for futuristic feel

### 🏠 Hero Section
- Interactive 3D robot model via Spline
- Gooey text morphing effect for role titles
- Floating developer symbols background (CSS animations)
- Spotlight effect with animated grid overlay
- Social links with hover animations

### 👤 About Section
- Glassmorphism 3D card with hover tilt effect
- Floating skill bubbles in background
- Animated stats counter
- Human-written bio

### 💻 Skills Section
- Infinite marquee rows (3 rows, alternating directions)
- Animated progress bars with scroll trigger
- 4 categorized skill cards (Frontend / Styling / Backend / Tools)
- Hover lift + glow effects

### 🗂️ Projects Section
- 9 projects with filter system (All / AI / Client / Portfolio / Tool / Clone)
- 3D tilt cards on mouse move with glare effect
- AnimatePresence for smooth filter transitions
- GitHub + Live links per project

### 📅 Experience Section
- Animated timeline with scroll-draw effect
- 3D flip cards — front shows info, back shows details
- Education and Certifications included
- Stagger animations on scroll

### 📬 Contact Section
- Glassmorphism form with real-time validation
- EmailJS integration — emails land directly in Gmail
- Focus glow on inputs
- Success/error states with animations

### 🤖 AI Chatbot
- Powered by Groq API (llama-3.1-8b-instant)
- Trained on all portfolio data
- Typing animation for responses
- Suggested questions on open
- Floating FAB button with pulse animation

### 🔥 Flame Transitions
- CSS flame divider between sections
- Ember particle animations
- Triggers on scroll into view

### 🧭 Smart Navbar
- Full navbar at top of page
- Scrolled state: floating pill links only (desktop)
- Mobile: hamburger menu always
- Active link indicator with spring animation
- Hide on scroll down, show on scroll up

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **3D Scene** | Spline (@splinetool/react-spline) |
| **AI Chatbot** | Groq API (LLaMA 3.1) |
| **Email** | EmailJS |
| **Fonts** | Orbitron, Space Grotesk (Google Fonts) |
| **Icons** | Lucide React |
| **Deployment** | Vercel / Netlify |

---

## 📁 Project Structure

```
ammad-portfolio/
│
├── 📁 app/
│ ├── 📁 api/
│ │ └── 📁 chat/
│ │ └── route.ts
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
│
├── 📁 components/
│ ├── 📁 ui/
│ │ ├── navbar.tsx
│ │ ├── flame-transition.tsx
│ │ ├── spotlight.tsx
│ │ ├── splite.tsx
│ │ └── gooey-text-morphing.tsx
│ │
│ ├── page-loader.tsx
│ ├── site-wrapper.tsx
│ ├── hero-section.tsx
│ ├── about-section.tsx
│ ├── skills-section.tsx
│ ├── projects-section.tsx
│ ├── experience-section.tsx
│ ├── contact-section.tsx
│ ├── chatbot.tsx
│ └── footer.tsx
│
├── 📁 public/
│ └── resume.pdf
│
├── .env.local
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```


---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ammad32/ammad-portfolio.git

# Navigate to project
cd ammad-portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` in root:

```env
# EmailJS (for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Groq AI (for chatbot)
GROQ_API_KEY=your_groq_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

### Netlify

```bash
npm run build
# Upload the .next folder or connect GitHub repo
```

---

## 📸 Sections Preview

| Section | Description |
|---------|-------------|
| 🎭 Loader | Letter-by-letter name animation |
| 🏠 Hero | 3D robot + gooey text + dev particles |
| 👤 About | Glass card + floating skill bubbles |
| 💻 Skills | Infinite marquee + progress cards |
| 🗂️ Projects | 3D tilt cards + category filter |
| 📅 Experience | Animated timeline + flip cards |
| 📬 Contact | Glass form + EmailJS |
| 🤖 Chatbot | Groq AI trained on portfolio data |

---

## 🔑 Key Decisions

**Why Next.js?**
App Router gives server-side API routes — perfect for keeping AI API keys secure server-side.

**Why Groq over OpenAI?**
Groq is completely free, extremely fast (LLaMA 3.1), and requires no credit card.

**Why Framer Motion?**
Best-in-class animation library for React — declarative, performant, and powerful.

**Why Spline for 3D?**
Zero Three.js boilerplate — drag and drop 3D scenes that work instantly in React.

---

## 📬 Contact

**Muhammad Ammad**
Frontend Developer — Karachi, Pakistan

| Platform | Link |
|----------|------|
| 📧 Email | official.muhammadammad@gmail.com |
| 💼 LinkedIn | linkedin.com/in/muhammad-ammad |
| 🐙 GitHub | github.com/ammad32 |
| 🌐 Portfolio | ammmad-portfolio.netlify.app |

---

## 📄 License

MIT License — feel free to use this as inspiration for your own portfolio.
Just don't copy it as-is and claim it as yours. Build something original! 🚀


---

<div align="center">

**Designed & Built with ❤️ by Muhammad Ammad**

*"I started coding not because it was trending — but because I wanted to build things that actually work."*

⭐ Star this repo if you found it helpful!

</div>
