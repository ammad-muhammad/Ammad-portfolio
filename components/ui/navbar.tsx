'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [activeLink, setActiveLink] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const isAtTop = currentY < 20

      setScrolled(!isAtTop)

      // Hide when scrolling DOWN, show when scrolling UP
      if (currentY > lastY && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  // AT TOP: full navbar
  if (!scrolled) {
    return (
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 sm:mx-8 lg:mx-16 mt-3 px-4 sm:px-6
                        flex items-center justify-between h-14
                        transition-all duration-300">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent shrink-0"
          >
            &lt;Ammad /&gt;
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-white/5 rounded-xl px-1.5 py-1 border border-white/8">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`
                    relative px-4 py-1.5 text-sm font-medium rounded-lg
                    transition-all duration-200 cursor-pointer
                    ${activeLink === link.label ? 'text-cyan-400' : 'text-white/60 hover:text-white/90'}
                  `}
                >
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="hidden md:block px-5 py-2 text-sm font-bold text-[#030712]
                       bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl
                       hover:scale-105 transition-all duration-200 shrink-0"
          >
            Resume
          </a>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-white/60 hover:text-cyan-400"
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
              className="mx-4 sm:mx-8 mt-2 rounded-2xl border border-white/10
                         bg-[#0a0f1e]/90 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-3 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => { setActiveLink(link.label); setMenuOpen(false); }}
                    className={`
                      px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${activeLink === link.label
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  download
                  className="mt-1 px-4 py-2.5 text-center text-sm font-bold
                             text-[#030712] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    )
  }

  // SCROLLED: only center pill — no logo, no resume
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.nav
          key="scrolled-nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          {/* Desktop: floating center pill only */}
          <div className="hidden md:flex justify-center pt-3">
            <div
              className="flex items-center gap-1 px-2 py-1.5 rounded-2xl
                         border border-white/10
                         bg-[#0a0f1e]/80 backdrop-blur-xl
                         shadow-lg shadow-black/30"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`
                    relative px-3.5 py-1.5 text-sm font-medium rounded-xl
                    transition-all duration-200 cursor-pointer whitespace-nowrap
                    ${activeLink === link.label
                      ? "text-cyan-400"
                      : "text-white/55 hover:text-white/90"
                    }
                  `}
                >
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="activePillScrolled"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/25 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile: full bar with hamburger only */}
          <div
            className="md:hidden mx-4 mt-3 px-4
                        flex items-center justify-between h-12
                        rounded-2xl border border-white/10
                        bg-[#0a0f1e]/80 backdrop-blur-xl"
          >
            <a
              href="#home"
              className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              &lt;Ammad /&gt;
            </a>
            <button
              className="text-white/60 hover:text-cyan-400 transition-colors"
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
                className="md:hidden mx-4 mt-2 rounded-2xl border border-white/10
                           bg-[#0a0f1e]/90 backdrop-blur-xl overflow-hidden"
              >
                <div className="px-3 py-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => { setActiveLink(link.label); setMenuOpen(false); }}
                      className={`
                        px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${activeLink === link.label
                          ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/resume.pdf"
                    download
                    className="mt-1 px-4 py-2.5 text-center text-sm font-bold
                               text-[#030712] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl"
                  >
                    Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
