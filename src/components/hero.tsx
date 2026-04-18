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
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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
        className="relative z-20 flex h-full flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pt-36 sm:pt-40 md:pt-44"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Wujudkan
            <br />
            <span className="text-silver-400">Ruangan Impian</span>
            <br />
            Anda
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl"
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
              className="h-13 rounded-full bg-silver-500 px-8 text-base font-semibold text-white shadow-lg shadow-silver-500/25 transition-all hover:bg-silver-600 hover:shadow-xl hover:shadow-silver-500/30"
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
              className="h-13 rounded-full border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white"
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
          className="mt-auto pb-8 pt-16 sm:pt-20 sm:pb-12"
        >
          <div className="flex flex-row gap-4 sm:gap-10 md:gap-16 flex-wrap">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3 sm:gap-4">
                {index > 0 && (
                  <div className="hidden sm:block h-12 w-px bg-white/20" />
                )}
                <div>
                  <p className="text-2xl font-bold text-silver-400 sm:text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50 sm:text-sm md:text-base">
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
