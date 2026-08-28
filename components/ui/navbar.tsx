'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export function Navbar() {
  const [activeLink, setActiveLink] = useState('About')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-50 py-4 px-6 sm:px-10 lg:px-16 bg-transparent"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-700 shadow-sm shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for New Project
        </div>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`
                text-xs font-medium tracking-wide transition-colors duration-150 flex items-center gap-1
                ${activeLink === link.label ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}
              `}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Let's Talk Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-all duration-200 shadow-sm"
          >
            Let's Talk
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          className="md:hidden p-1.5 text-gray-600 hover:text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMenuOpen(false); }}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between
                    ${activeLink === link.label ? 'bg-gray-100 text-black font-semibold' : 'text-gray-600 hover:text-black'}
                  `}
                >
                  <span>{link.label}</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-2.5 text-center text-xs font-semibold text-white bg-black rounded-full flex items-center justify-center gap-1.5"
              >
                Let's Talk <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
