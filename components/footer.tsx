"use client";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/ammad-muhammad"      },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ammadm/"    },
  { label: "Email",    href: "mailto:official.muhammadammad@gmail.com" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-3 sm:py-4 px-6 sm:px-12 select-none shrink-0">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 font-medium">

        {/* Brand logo & tagline */}
        <div className="flex items-center gap-2">
          <a href="#home" className="font-extrabold text-sm text-gray-900 tracking-tight">
            &lt;Ammad /&gt;
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-[11px]">Full Stack Web & Mobile Developer · Karachi, Pakistan</span>
        </div>

        {/* Socials & Copyright */}
        <div className="flex items-center gap-4 text-[11px]">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              {s.label}
            </a>
          ))}
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">© 2025 Muhammad Ammad</span>
        </div>

      </div>
    </footer>
  );
}
