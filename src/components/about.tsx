'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ---------- Count-up hook ---------- */
function useCountUp(target: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
    return () => {
      start = 0;
    };
  }, [target, duration, inView]);

  return count;
}

/* ---------- Stat card ---------- */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <span className="font-[var(--font-playfair)] text-3xl font-bold text-amber-600 dark:text-amber-400 sm:text-4xl">
        {count}
        {stat.suffix}
      </span>
      <span className="mt-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ---------- Data ---------- */
const stats: StatItem[] = [
  { value: 500, suffix: '+', label: 'Proyek Selesai' },
  { value: 15, suffix: '+', label: 'Tahun Pengalaman' },
  { value: 50, suffix: '+', label: 'Tim Profesional' },
  { value: 98, suffix: '%', label: 'Klien Puas' },
];

/* ---------- Animation variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const imageVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/* ---------- Component ---------- */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-amber-100/40 dark:bg-amber-900/10" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-amber-100/30 dark:bg-amber-900/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative frame behind image */}
            <div className="absolute -bottom-4 -right-4 z-0 hidden h-full w-full rounded-2xl border-2 border-amber-300/40 dark:border-amber-600/30 lg:block" />

            <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl shadow-black/10">
              <Image
                src="/images/about-team.png"
                alt="Tim profesional Ruangan Elegan"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
              {/* Subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2"
          >
            {/* Label */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:border-amber-600/30 dark:bg-amber-900/20 dark:text-amber-400 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Tentang Kami
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="mt-5 font-[var(--font-playfair)] text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]"
            >
              Mengubah Ruangan Menjadi{' '}
              <span className="text-amber-600 dark:text-amber-400">Karya Seni</span>
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Sejak 2009, Ruangan Elegan telah menjadi mitra terpercaya dalam mewujudkan ruangan
              impian. Kami menggabungkan kreativitas dengan keahlian teknis untuk menciptakan
              ruangan yang tidak hanya indah, tetapi juga fungsional.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Tim kami terdiri dari arsitek dan desainer berpengalaman yang berkomitmen memberikan
              hasil terbaik di setiap proyek. Dari konsep awal hingga penyelesaian, kami memastikan
              setiap detail sesuai dengan harapan Anda.
            </motion.p>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} inView={isInView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
