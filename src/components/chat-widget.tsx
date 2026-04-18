'use client'

import { useState, useRef, useEffect, useSyncExternalStore, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'

const WHATSAPP_NUMBER = '6283862295779'

/* ─── WhatsApp SVG Icon ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.118-1.962C9.72 30.876 12.764 31.87 16.004 31.87 24.826 31.87 32 24.696 32 16.004 32 7.312 24.826 0 16.004 0zm9.302 22.61c-.39 1.1-1.932 2.014-3.168 2.28-.844.18-1.948.324-5.664-1.218-4.756-1.972-7.816-6.788-8.052-7.104-.228-.316-1.858-2.476-1.858-4.724s1.18-3.356 1.6-4.06c.42-.704.916-.88 1.224-.88.308 0 .616.004.884.016.284.012.664-.108 1.038.792.39.932 1.328 3.244 1.444 3.478.116.234.194.508.04.82-.156.316-.234.508-.468.784-.234.274-.492.614-.704.82-.234.236-.478.49-.204.962.272.47 1.212 1.996 2.602 3.234 1.788 1.594 3.296 2.088 3.772 2.322.47.234.748.196 1.022-.118.28-.316 1.186-1.382 1.504-1.858.316-.47.636-.39 1.07-.234.436.156 2.752 1.298 3.222 1.534.47.234.784.352.9.546.118.194.118 1.12-.272 2.218z" />
    </svg>
  )
}

/* ─── Types ─── */
interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: Date
}

/* ─── Knowledge Base (fallback dari isi konten website) ─── */
const knowledgeBase: { keywords: string[]; response: string }[] = [
  // Tentang / About
  {
    keywords: ['tentang', 'about', 'profil', 'siapa', 'perusahaan', 'ruang estetik', 'tentang kami'],
    response:
      'Ruang Estetik adalah jasa desain interior dan bangunan yang berdiri sejak 2020 di Bandung, Jawa Barat. Kami telah menyelesaikan 30+ proyek dengan tim 50+ profesional dan tingkat kepuasan klien 98%. Kami menggabungkan kreativitas dengan keahlian teknis untuk menciptakan ruangan yang indah dan fungsional.',
  },
  // Layanan / Services
  {
    keywords: ['layanan', 'service', 'jasa', 'apa saja', 'offer', 'menawarkan'],
    response:
      'Kami menyediakan 4 layanan utama:\n1️⃣ Desain Interior — menciptakan ruangan indah & fungsional\n2️⃣ Renovasi Rumah — transformasi ruangan lama jadi modern\n3️⃣ Konstruksi Bangunan — pembangunan dari nola dengan kualitas terbaik\n4️⃣ Konsultasi Desain — saran ahli, konsultasi awal GRATIS!\n\nLayanan mana yang Anda butuhkan?',
  },
  {
    keywords: ['desain interior', 'interior', 'design interior'],
    response:
      'Layanan Desain Interior kami menciptakan ruangan yang indah dan fungsional sesuai kepribadian dan kebutuhan Anda. Dari pemilihan warna hingga tata letak furnitur, kami tangani semua detail-nya. Ingin konsultasi gratis? Hubungi kami via WhatsApp! 😊',
  },
  {
    keywords: ['renovasi', 'renovate', 'perbaikan', 'transformasi'],
    response:
      'Layanan Renovasi Rumah kami mengubah ruangan lama menjadi baru dengan sentuhan modern. Kami menangani renovasi dapur, kamar mandi, dan seluruh ruangan. Tim profesional kami memastikan hasil berkualitas!',
  },
  {
    keywords: ['konstruksi', 'bangun', 'bangunan', 'membangun', 'construction'],
    response:
      'Layanan Konstruksi Bangunan kami membangun dari nol dengan kualitas terbaik. Tim profesional kami memastikan setiap detail dikerjakan sempurna, dari pondasi hingga finishing.',
  },
  {
    keywords: ['konsultasi', 'consult', 'konsultasi desain', 'saran'],
    response:
      'Konsultasi Desain kami memberikan saran ahli untuk proyek Anda. Kabar baik: konsultasi awalnya GRATIS! 🎉 Anda bisa langsung hubungi kami via WhatsApp untuk menjadwalkan konsultasi.',
  },
  // Proses
  {
    keywords: ['proses', 'cara kerja', 'langkah', 'step', 'alur', 'flow'],
    response:
      'Proses kerja kami ada 4 tahap:\n1️⃣ Konsultasi — Diskusi kebutuhan, keinginan & anggaran\n2️⃣ Desain — Konsep desain, 3D rendering & revisi\n3️⃣ Pelaksanaan — Pengerjaan profesional & tepat waktu\n4️⃣ Penyelesaian — Serah terima dengan garansi kualitas\n\nSiap memulai? Hubungi kami via WhatsApp!',
  },
  // Harga / Biaya
  {
    keywords: ['harga', 'biaya', 'cost', 'price', 'berapa', 'tarif', 'budget', 'anggaran', 'bayar'],
    response:
      'Biaya kami disesuaikan dengan skala dan kompleksitas proyek. Kami menawarkan paket mulai dari Rp 5 juta untuk konsultasi desain hingga proyek penuh dengan anggaran transparan. Pilihan anggaran:\n• Di bawah Rp 50 Juta\n• Rp 50 - 100 Juta\n• Rp 100 - 250 Juta\n• Rp 250 - 500 Juta\n• Di atas Rp 500 Juta\n\nKonsultasi awal GRATIS! Hubungi kami untuk penawaran detail.',
  },
  // Waktu / Durasi
  {
    keywords: ['waktu', 'lama', 'durasi', 'berapa lama', 'selesai', 'timeline', 'jadwal'],
    response:
      'Waktu penyelesaian bervariasi tergantung skala proyek:\n• Renovasi kamar: 2-4 minggu\n• Proyek konstruksi penuh: 3-6 bulan\n\nKami akan memberikan timeline detail saat konsultasi awal. Konsultasi gratis!',
  },
  // Garansi
  {
    keywords: ['garansi', 'warranty', 'jaminan'],
    response:
      'Ya, kami memberikan garansi kualitas selama 1 tahun untuk semua pekerjaan kami! Ini mencakup perbaikan gratis untuk masalah yang timbul akibat pekerjaan kami. Kepuasan klien adalah prioritas utama kami. ✅',
  },
  // Area Layanan
  {
    keywords: ['area', 'lokasi', 'wilayah', 'daerah', 'cover', 'jangkauan'],
    response:
      'Kami melayani seluruh wilayah Jabodetabek dan kota-kota besar di Indonesia. Untuk proyek di luar Jabodetabek, kami memiliki tim yang siap didistribusikan. Kantor kami berada di Bandung, Jawa Barat.',
  },
  // Kontak
  {
    keywords: ['kontak', 'hubungi', 'contact', 'telepon', 'wa', 'whatsapp', 'email', 'alamat'],
    response:
      'Anda bisa menghubungi kami melalui:\n📱 WhatsApp: +62 838-6229-5779 (respon cepat!)\n📧 Email: derrycp37@gmail.com (respon 24 jam)\n📍 Alamat: Bandung, Jawa Barat\n🕐 Jam operasional: Senin-Sabtu, 09:00-18:00 WIB\n\nAtau klik icon WhatsApp di widget ini untuk langsung chat! 💬',
  },
  // Portofolio
  {
    keywords: ['portofolio', 'portfolio', 'hasil', 'proyek', 'karya', 'contoh'],
    response:
      'Kami telah menyelesaikan 30+ proyek desain interior dan bangunan! Portfolio kami mencakup berbagai gaya: minimalis, Japandi, Scandinavian, Art Deco, Industrial, dan lainnya. Scroll ke bagian Portfolio di website kami untuk melihat hasil before & after setiap proyek. 🏠',
  },
  // Testimoni
  {
    keywords: ['testimoni', 'review', 'ulasan', 'pendapat', 'klien'],
    response:
      'Kami memiliki tingkat kepuasan klien 98%! Klien kami memuji kualitas kerja, komunikasi yang baik, dan hasil yang melebihi ekspektasi. Scroll ke bagian Testimoni di website untuk membaca ulasan langsung dari klien kami. ⭐',
  },
  // Keterlibatan Klien
  {
    keywords: ['terlibat', 'ikut', 'partisipasi', 'revisi', 'ubah'],
    response:
      'Tentu saja! Kolaborasi dengan klien adalah prioritas kami. Kami melibatkan Anda di setiap tahap, mulai dari konsep awal, pemilihan material, hingga finishing. Revisi desain juga termasuk dalam paket kami. Kepuasan Anda adalah fokus kami! 🤝',
  },
  // Cara Mulai
  {
    keywords: ['mulai', 'start', 'daftar', 'booking', 'cara', 'pesan'],
    response:
      'Sangat mudah memulai proyek dengan Ruang Estetik!\n1️⃣ Hubungi kami via WhatsApp di +62 838-6229-5779\n2️⃣ Atau isi form konsultasi gratis di bagian Kontak\n3️⃣ Tim kami akan menjadwalkan pertemuan awal\n4️⃣ Kami buatkan konsep desain sesuai kebutuhan Anda\n\nKonsultasi awal GRATIS! Hubungi kami sekarang! 🚀',
  },
  // Jam Operasional
  {
    keywords: ['jam', 'buka', 'operasional', 'jadwal kerja', 'hari kerja'],
    response:
      'Jam operasional kami:\n🕐 Senin - Sabtu: 09:00 - 18:00 WIB\n📍 Bandung, Jawa Barat\n\nDi luar jam kerja, Anda tetap bisa mengirim pesan via WhatsApp dan kami akan membalas di hari kerja berikutnya.',
  },
  // Greeting
  {
    keywords: ['halo', 'hai', 'hi', 'hello', 'selamat', 'assalamualaikum', 'hey'],
    response:
      'Halo! 👋 Selamat datang di Ruang Estetik! Saya asisten virtual yang siap membantu Anda. Anda bisa bertanya tentang:\n• Layanan desain interior & bangunan\n• Harga & anggaran\n• Proses kerja\n• Portofolio\n• Cara memulai proyek\n\nSilakan tanyakan apa saja! 😊',
  },
  // Terima kasih
  {
    keywords: ['terima kasih', 'thanks', 'makasih', 'thx', 'oke', 'ok', 'baik'],
    response:
      'Sama-sama! 😊 Jika Anda butuh info lebih lanjut atau ingin memulai proyek, jangan ragu hubungi kami via WhatsApp. Tim kami siap membantu! 🏠✨',
  },
]

/* ─── Fallback response (no keyword matched) ─── */
const fallbackResponse =
  'Terima kasih atas pertanyaan Anda! 🤔 Untuk informasi lebih detail, saya sarankan untuk menghubungi tim kami langsung via WhatsApp di +62 838-6229-5779. Konsultasi awal GRATIS! Anda juga bisa bertanya tentang: layanan, harga, proses kerja, portofolio, atau cara memulai proyek.'

/* ─── Bot logic ─── */
function getBotResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim()

  // Score each knowledge entry by how many keywords match
  let bestMatch = { score: 0, response: fallbackResponse }

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        score += keyword.length // longer keyword match = higher score
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { score, response: entry.response }
    }
  }

  return bestMatch.response
}

/* ─── Quick suggestions ─── */
const quickSuggestions = [
  'Layanan apa saja?',
  'Berapa biayanya?',
  'Cara mulai proyek?',
  'Hubungi via WA',
]

/* ─── Component ─── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const greetingAddedRef = useRef(false)
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  // Initial greeting - use ref to avoid setState in effect
  const greeting: Message = {
    id: 'greeting',
    role: 'bot',
    text: 'Halo! 👋 Selamat datang di Ruang Estetik! Saya asisten virtual yang siap membantu Anda. Silakan tanyakan tentang layanan, harga, portofolio, atau cara memulai proyek Anda!',
    timestamp: new Date(),
  }

  const ensureGreeting = useCallback(() => {
    if (!greetingAddedRef.current) {
      greetingAddedRef.current = true
      setMessages([greeting])
    }
  }, [greeting])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (showChat) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [showChat])

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      const botResponse = getBotResponse(text)
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }, [input])

  const handleQuickSuggestion = (suggestion: string) => {
    setInput(suggestion)
    setTimeout(() => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: suggestion,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      const delay = 600 + Math.random() * 800
      setTimeout(() => {
        const botResponse = getBotResponse(suggestion)
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: botResponse,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setIsTyping(false)
      }, delay)
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const openChat = () => {
    setShowChat(true)
    setIsOpen(false)
    ensureGreeting()
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-2 w-[340px] sm:w-[380px] overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-2xl shadow-black/15 dark:border-neutral-700/40 dark:bg-neutral-900"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-neutral-800 to-neutral-700 px-4 py-3 dark:from-neutral-700 dark:to-neutral-600">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-silver-400 to-silver-600">
                  <Bot className="size-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Ruang Estetik</p>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-400" />
                    <p className="text-[11px] text-neutral-300">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[340px] overflow-y-auto bg-neutral-50 px-4 py-4 dark:bg-neutral-900/50" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="mr-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-silver-400 to-silver-600">
                      <Bot className="size-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-neutral-800 text-white dark:bg-neutral-700'
                        : 'bg-white text-neutral-800 shadow-sm dark:bg-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.role === 'user' && (
                    <div className="ml-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-600">
                      <User className="size-3.5 text-neutral-600 dark:text-neutral-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-3 flex justify-start">
                  <div className="mr-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-silver-400 to-silver-600">
                    <Bot className="size-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-neutral-800">
                    <div className="flex gap-1">
                      <span className="size-2 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-500" style={{ animationDelay: '0ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-500" style={{ animationDelay: '150ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-500" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="flex gap-2 overflow-x-auto bg-neutral-50 px-4 py-2 dark:bg-neutral-900/50" style={{ scrollbarWidth: 'none' }}>
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-600 transition-all hover:border-silver-400 hover:bg-silver-50 hover:text-silver-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-silver-500 dark:hover:bg-neutral-700 dark:hover:text-silver-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="flex items-center gap-2 border-t border-neutral-200/60 bg-white px-3 py-2.5 dark:border-neutral-700/40 dark:bg-neutral-900">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan Anda..."
                className="flex-1 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-silver-400/50 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="flex size-9 items-center justify-center rounded-full bg-silver-500 text-white transition-all hover:bg-silver-600 disabled:opacity-40 disabled:hover:bg-silver-500"
              >
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Menu - Icon Only */}
      <AnimatePresence>
        {isOpen && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-3 mb-1"
          >
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
            >
              <button
                onClick={openChat}
                className="group flex size-12 items-center justify-center rounded-full bg-neutral-800 shadow-lg shadow-black/20 transition-all duration-200 hover:bg-neutral-700 hover:shadow-xl hover:scale-110 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                title="AI Assistant"
              >
                <Bot className="size-5 text-white" />
              </button>
            </motion.div>

            {/* WhatsApp */}
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
                <WhatsAppIcon className="size-5 text-white" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => {
          if (showChat) {
            setShowChat(false)
          } else {
            setIsOpen(!isOpen)
          }
        }}
        className="relative flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: isOpen || showChat
            ? 'linear-gradient(135deg, #404040, #525252)'
            : 'linear-gradient(135deg, #6b7f9a, #3f4f65)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen || showChat ? (
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
              <Bot className="size-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ping indicator when closed */}
        {!isOpen && !showChat && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-silver-400 opacity-50" />
            <span className="relative inline-flex size-4 rounded-full bg-silver-500" />
          </span>
        )}
      </motion.button>
    </div>
  )
}
