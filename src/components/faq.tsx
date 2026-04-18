'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircleQuestion } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    id: 'faq-1',
    question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?',
    answer:
      'Waktu penyelesaian bervariasi tergantung skala proyek. Renovasi kamar biasanya membutuhkan 2-4 minggu, sedangkan proyek konstruksi penuh bisa memakan waktu 3-6 bulan. Kami akan memberikan timeline detail saat konsultasi awal.',
  },
  {
    id: 'faq-2',
    question: 'Berapa biaya jasa desain interior?',
    answer:
      'Biaya kami disesuaikan dengan skala dan kompleksitas proyek. Kami menawarkan paket mulai dari Rp 5 juta untuk konsultasi desain hingga proyek penuh dengan anggaran yang transparan. Konsultasi awal kami GRATIS.',
  },
  {
    id: 'faq-3',
    question: 'Apakah saya bisa terlibat dalam proses desain?',
    answer:
      'Tentu saja! Kolaborasi dengan klien adalah prioritas kami. Kami melibatkan Anda di setiap tahap, mulai dari konsep awal, pemilihan material, hingga finishing. Revisi desain juga termasuk dalam paket kami.',
  },
  {
    id: 'faq-4',
    question: 'Apakah ada garansi untuk pekerjaan Anda?',
    answer:
      'Ya, kami memberikan garansi kualitas selama 1 tahun untuk semua pekerjaan kami. Ini mencakup perbaikan gratis untuk masalah yang timbul akibat pekerjaan kami. Kepuasan klien adalah prioritas utama kami.',
  },
  {
    id: 'faq-5',
    question: 'Area layanan Anda mencakup mana saja?',
    answer:
      'Kami melayani seluruh wilayah Jabodetabek dan kota-kota besar di Indonesia. Untuk proyek di luar Jabodetabek, kami memiliki tim yang siap didistribusikan. Hubungi kami untuk informasi lebih lanjut.',
  },
  {
    id: 'faq-6',
    question: 'Bagaimana cara memulai proyek dengan Ruangan Elegan?',
    answer:
      'Sangat mudah! Anda bisa mengisi form konsultasi gratis di website kami atau menghubungi kami langsung via telepon/WhatsApp. Tim kami akan menjadwalkan pertemuan awal untuk memahami kebutuhan Anda.',
  },
]

function FadeInOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInOnScroll>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-gold-50 dark:bg-gold-900/20 mb-5">
              <MessageCircleQuestion className="size-6 text-gold-600 dark:text-gold-400" />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Pertanyaan Umum
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Jawaban untuk pertanyaan yang sering diajukan klien kami
            </p>
            <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gold-500 dark:bg-gold-400" />
          </div>
        </FadeInOnScroll>

        {/* FAQ Accordion */}
        <StaggerContainer>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <StaggerItem key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="border-border/60 group rounded-xl mb-3 overflow-hidden transition-colors data-[state=open]:bg-gold-50/60 dark:data-[state=open]:bg-gold-950/20 data-[state=open]:border-gold-200/50 dark:data-[state=open]:border-gold-800/30 data-[state=closed]:bg-card data-[state=closed]:hover:bg-muted/30"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-foreground hover:no-underline data-[state=open]:text-gold-600 dark:data-[state=open]:text-gold-400 [&>svg]:text-muted-foreground data-[state=open]:[&>svg]:text-gold-500 dark:data-[state=open]:[&>svg]:text-gold-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-5 text-sm sm:text-base leading-relaxed text-muted-foreground data-[state=open]:text-foreground/80">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeInOnScroll delay={0.3}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Masih punya pertanyaan lain?
            </p>
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-gold-500/20 transition-all duration-200 hover:bg-gold-600 hover:shadow-gold-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              Hubungi Kami
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
