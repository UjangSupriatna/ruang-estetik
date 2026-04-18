'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const stats = [
  { value: '30+', label: 'Proyek Selesai' },
  { value: '5+', label: 'Tahun Pengalaman' },
  { value: '98%', label: 'Klien Puas' },
];

export default function Hero() {
  return (
    <section id="beranda" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Interior desain elegan oleh Ruangan Elegan"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        quality={85}
      />

      {/* Dark Overlay Gradient */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 flex h-full flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              Interior Design & Building
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-playfair)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Wujudkan{' '}
            <span className="text-gold-400 dark:text-gold-400">Ruangan Impian</span>{' '}
            Anda
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            Jasa desain interior dan bangunan profesional yang mengubah visi Anda menjadi kenyataan. Dari konsep hingga penyelesaian, kami hadir untuk Anda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              asChild
              className="h-12 rounded-full bg-gold-500 px-8 text-base font-semibold text-white shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-600 hover:shadow-xl hover:shadow-gold-500/30 sm:h-13"
            >
              <a href="#kontak">
                <Phone className="mr-2 size-4" />
                Konsultasi Gratis
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 rounded-full border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white sm:h-13"
            >
              <a href="#portfolio">
                Lihat Portfolio
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-auto pb-8 pt-16 sm:pb-12"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 md:gap-16">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3">
                {/* Divider */}
                {index > 0 && (
                  <div className="hidden sm:block h-10 w-px bg-white/20" />
                )}
                <div>
                  <p className="font-[var(--font-playfair)] text-3xl font-bold text-gold-400 dark:text-gold-400 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60 sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-white/40 uppercase">
            Scroll
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-1.5 w-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
