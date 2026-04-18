'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot, Phone } from 'lucide-react'

const WHATSAPP_NUMBER = '6283862295779'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu - Icon Only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-3 mb-1"
          >
            {/* AI Assistant - Icon Only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
            >
              <button
                onClick={() => {
                  setIsOpen(false)
                  const el = document.getElementById('kontak')
                  if (el) {
                    const navHeight = 80
                    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="group flex size-12 items-center justify-center rounded-full bg-neutral-800 dark:bg-neutral-700 shadow-lg shadow-black/20 transition-all duration-200 hover:bg-neutral-700 dark:hover:bg-neutral-600 hover:shadow-xl hover:scale-110"
                title="AI Assistant"
              >
                <Bot className="size-5 text-white" />
              </button>
            </motion.div>

            {/* WhatsApp - Icon Only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex size-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-110"
                title="WhatsApp"
              >
                <Phone className="size-5 text-white" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #404040, #525252)'
            : 'linear-gradient(135deg, #6b7f9a, #3f4f65)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X className="size-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="size-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ping indicator when closed */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-silver-400 opacity-50" />
            <span className="relative inline-flex size-4 rounded-full bg-silver-500" />
          </span>
        )}
      </motion.button>
    </div>
  )
}
