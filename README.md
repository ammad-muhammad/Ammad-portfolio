# Muhammad Ammad — Full Stack Web & Mobile Developer Portfolio

<div align="center">

  <img src="public/ammad.png" alt="Muhammad Ammad" width="140" height="140" style="border-radius: 50%; object-fit: cover;" />

  <h3>Muhammad Ammad</h3>
  <p><strong>Full Stack Web & Mobile Developer based in Karachi, Pakistan</strong></p>

  <p>
    <a href="https://github.com/ammad-muhammad"><img src="https://img.shields.io/badge/GitHub-ammad--muhammad-181717?style=for-the-badge&logo=github" alt="GitHub" /></a>
    <a href="https://www.linkedin.com/in/ammadm/"><img src="https://img.shields.io/badge/LinkedIn-ammadm-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" /></a>
    <a href="mailto:official.muhammadammad@gmail.com"><img src="https://img.shields.io/badge/Email-official.muhammadammad%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js%2016-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS%204-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Groq%20AI-F05A28?style=flat-square&logo=openai&logoColor=white" alt="Groq AI" />
  </p>
</div>

---

## 🌟 Overview

This repository houses the modern, high-performance personal portfolio of **Muhammad Ammad**. Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS 4**, this portfolio delivers an editorial, cinematic experience with seamless single-scroll section transitions, fluid animations powered by **Framer Motion**, and an integrated **AI Assistant Chatbot** powered by **Groq**.

---

## ✨ Features & Architecture

### 1. 🎬 Cinematic 1-Scroll Section Controller
- **Stacked Viewport Controller (`HeroToNextTransition`)**: Manages full-height section transitions with custom cubic-bezier curves.
- **Film Closing Collapse**: Downward scroll on the CTA section triggers a cinematic vertical collapse (*film closing squeeze effect*) revealing the Contact & Footer section.
- **Hash & Navbar Resolver**: Instant smooth navigation when clicking navbar anchors or direct URL hash routing without page jumps or blank screens.

### 2. ⚡ Integrated AI Assistant Chatbot
- **Real-Time Intelligence**: Powered by Groq's ultra-fast `qwen/qwen3.8-27b` model providing sub-100ms response latencies.
- **Knowledge-Grounded**: Trained on Ammad's background, work experience, technical stack, hackathons, and availability.
- **Interactive UI**: Sleek minimal white/black modal with typing animation, quick prompts, and mobile responsiveness.

### 3. 💼 Comprehensive Sections
- **Hero Section**: Editorial big split stroke typography (`MUHAMMAD` outlined / `AMMAD` solid), cut-out portrait reveal, role bio, and quick social links.
- **About Section**: Watermark background typography, dynamic developer bio, key metric counters, and one-click ATS Word Resume (`.docx`) download.
- **Skills & Technologies**: 16-skill icon grid featuring modern frontend, backend, database, and cloud toolsets.
- **Projects / Selected Work**: Showcase of production-grade SaaS products (**Hirely**, **ClinicAI**, **DevMind AI**) with comprehensive Architecture & Feature Breakdown Modals.
- **Services**: Interactive service cards with real-time UI mockup hover previews.
- **Experience**: Dark theme (`#111111`) interactive timeline with floating work highlight badge overlays.
- **Contact & Footer**: Dual-column dark/light layout with interactive service selector, EmailJS client submission, and compact single-line footer.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Smooth Scrolling** | [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Email Service** | [EmailJS](https://www.emailjs.com/) |
| **AI Integration** | [Groq API (`qwen/qwen3.8-27b`)](https://groq.com/) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ammad-muhammad/Ammad-portfolio.git
   cd Ammad-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

   # Groq AI API Key (for Chatbot)
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
ammad-portfolio/
├── app/
│   ├── api/
│   │   └── chat/route.ts       # Groq AI Chat API endpoint
│   ├── globals.css             # Global Tailwind styling & font definitions
│   ├── layout.tsx              # Root HTML & metadata wrapper
│   └── page.tsx                # Main entry point rendering HeroToNextTransition
├── components/
│   ├── about-section.tsx       # About Me & metrics section
│   ├── chatbot.tsx             # Floating AI Assistant chatbot component
│   ├── contact-section.tsx     # Contact form with EmailJS integration
│   ├── cta-section.tsx         # "Have A Project In Mind?" CTA section
│   ├── experience-section.tsx  # Work history & experience cards
│   ├── footer.tsx              # Minimal single-line bottom footer
│   ├── hero-section.tsx        # Hero landing section
│   ├── hero-transition.tsx     # Full-screen transition orchestrator
│   ├── projects-section.tsx    # Selected projects with details modal
│   ├── service-section.tsx     # Service cards with preview hover cards
│   ├── skills-section.tsx      # 16-skill technology icon grid
│   └── ui/
│       └── navbar.tsx          # Responsive navigation bar
├── public/                     # Static assets, images, and resume.docx
├── package.json
├── tsconfig.json
└── README.md
```

---

## 👨‍💻 Author

**Muhammad Ammad**
- **Role**: Full Stack Web & Mobile Developer
- **Location**: Karachi, Pakistan
- **GitHub**: [@ammad-muhammad](https://github.com/ammad-muhammad)
- **LinkedIn**: [in/ammadm](https://www.linkedin.com/in/ammadm/)
- **Email**: [official.muhammadammad@gmail.com](mailto:official.muhammadammad@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
