'use client'

import { motion } from 'framer-motion'
import { MessageCircle, PenTool, Hammer, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Step {
  number: number
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: MessageCircle,
    title: 'Konsultasi',
    description:
      'Diskusi mendalam tentang kebutuhan, keinginan, dan anggaran proyek Anda',
  },
  {
    number: 2,
    icon: PenTool,
    title: 'Desain',
    description:
      'Pembuatan konsep desain, 3D rendering, dan revisi hingga Anda puas',
  },
  {
    number: 3,
    icon: Hammer,
    title: 'Pelaksanaan',
    description:
      'Tim profesional kami mengerjakan proyek dengan kualitas terbaik dan tepat waktu',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Penyelesaian',
    description:
      'Serah terima proyek dengan garansi kualitas dan layanan purna jual',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Process() {
  return (
    <section id="proses" className="py-20 md:py-28 bg-stone-50 dark:bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 text-center md:mb-16"
        >
          <h2
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Proses Kerja Kami
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Langkah-langkah yang kami ambil untuk mewujudkan ruangan impian Anda
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative"
        >
          {/* Connecting Line — horizontal on desktop */}
          <div className="absolute top-24 left-0 hidden w-full lg:block">
            <div className="mx-auto max-w-4xl">
              <div className="relative h-0.5 w-full bg-silver-200 dark:bg-silver-800">
                <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-silver-400 bg-white" />
                <div className="absolute left-1/3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-silver-400 bg-white" />
                <div className="absolute left-2/3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-silver-400 bg-white" />
                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-silver-400 bg-white" />
              </div>
            </div>
          </div>

          {/* Connecting Line — vertical on mobile/tablet */}
          <div className="absolute top-24 bottom-24 left-1/2 -translate-x-1/2 lg:hidden">
            <div className="h-full w-0.5 bg-silver-200 dark:bg-silver-800" />
          </div>

          {/* Steps Grid — vertical on mobile, horizontal on desktop */}
          <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:gap-0 lg:justify-between">
            {steps.map((step) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative flex w-full max-w-xs flex-col items-center text-center lg:w-1/4 lg:max-w-none lg:px-4"
                >
                  {/* Step Number Circle */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-silver-500 shadow-lg shadow-silver-500/25 ring-4 ring-silver-100 dark:ring-silver-900/30">
                    <span className="text-lg font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-md ring-1 ring-border/60">
                    <IconComponent
                      className="h-6 w-6 text-silver-500 dark:text-silver-400"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 text-xl font-bold text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
