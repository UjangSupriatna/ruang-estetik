'use client'

import React, { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Sun, Moon, Phone, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
]

const emptySubscribe = () => () => {}

function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  const textColor = scrolled
    ? 'text-foreground/70 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
    : 'text-white/70 hover:text-white hover:bg-white/10'

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={`size-9 ${textColor}`} aria-label="Toggle theme">
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`size-9 ${textColor}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="size-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        const navHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth',
        })
      }
      setMobileOpen(false)
    },
    []
  )

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg shadow-black/[0.06] border-b border-neutral-200/50 dark:border-neutral-700/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo */}
          <a
            href="#beranda"
            onClick={(e) => scrollToSection(e, '#beranda')}
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className={`flex size-9 items-center justify-center rounded-lg shadow-sm transition-colors duration-500 ${
              scrolled
                ? 'bg-gradient-to-br from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-300'
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              <Gem className={`size-5 transition-colors duration-500 ${scrolled ? 'text-silver-50' : 'text-white'}`} />
            </div>
            <span
              className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Ruang{' '}
              <span className="text-silver-500 dark:text-silver-400">Estetik</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? scrolled
                        ? 'text-silver-600 dark:text-silver-400'
                        : 'text-silver-400'
                      : scrolled
                        ? 'text-foreground/70 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-colors duration-500 ${
                        scrolled ? 'bg-silver-500 dark:bg-silver-400' : 'bg-silver-400'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />
            <Button
              asChild
              className="bg-silver-500 hover:bg-silver-600 text-white dark:bg-silver-500 dark:hover:bg-silver-400 dark:text-neutral-900 shadow-md shadow-silver-500/20 hover:shadow-silver-600/30 transition-all duration-200 font-semibold gap-2 px-5"
              size="default"
            >
              <a
                href="#kontak"
                onClick={(e) => scrollToSection(e, '#kontak')}
              >
                <Phone className="size-3.5" />
                Konsultasi Gratis
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            {/* Mobile Phone CTA */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`size-9 transition-all duration-500 ${
                scrolled
                  ? 'text-silver-500 hover:text-silver-600 hover:bg-silver-50 dark:hover:bg-silver-900/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <a href="https://wa.me/6283862295779" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Phone className="size-4" />
              </a>
            </Button>
            <ThemeToggle scrolled={scrolled} />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`size-9 transition-colors duration-500 ${
                    scrolled
                      ? 'text-foreground/70 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
                <SheetHeader className="p-6 pb-4 border-b border-border/50">
                  <SheetTitle>
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-300">
                        <Gem className="size-5 text-silver-50" />
                      </div>
                      <span
                        className="text-xl font-bold tracking-tight text-foreground"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        Ruang{' '}
                        <span className="text-silver-500 dark:text-silver-400">
                          Estetik
                        </span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-4">
                  {navLinks.map((link, index) => {
                    const sectionId = link.href.replace('#', '')
                    const isActive = activeSection === sectionId
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.2 }}
                      >
                        <SheetClose asChild>
                          <a
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                              isActive
                                ? 'text-silver-500 dark:text-silver-400 bg-silver-50 dark:bg-silver-900/15 border-r-2 border-silver-500 dark:border-silver-400'
                                : 'text-foreground/70 hover:text-foreground hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
                            }`}
                          >
                            {link.label}
                          </a>
                        </SheetClose>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-auto px-6 pb-6 pt-4 border-t border-border/50">
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full bg-silver-500 hover:bg-silver-600 text-white dark:bg-silver-500 dark:hover:bg-silver-400 dark:text-neutral-900 shadow-md shadow-silver-500/20 hover:shadow-silver-600/30 font-semibold gap-2 h-11"
                      size="default"
                    >
                      <a
                        href="#kontak"
                        onClick={(e) => scrollToSection(e, '#kontak')}
                      >
                        <Phone className="size-4" />
                        Konsultasi Gratis
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
