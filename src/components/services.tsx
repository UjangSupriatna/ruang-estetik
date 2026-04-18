'use client'

import { motion } from 'framer-motion'
import { Palette, Home, Building2, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const services = [
  {
    title: 'Desain Interior',
    image: '/images/service-interior.png',
    icon: Palette,
    description:
      'Kami menciptakan ruangan yang indah dan fungsional sesuai kepribadian dan kebutuhan Anda. Dari pemilihan warna hingga tata letak furnitur.',
  },
  {
    title: 'Renovasi Rumah',
    image: '/images/service-renovation.png',
    icon: Home,
    description:
      'Transformasi ruangan lama menjadi baru dengan sentuhan modern. Renovasi dapur, kamar mandi, dan seluruh ruangan.',
  },
  {
    title: 'Konstruksi Bangunan',
    image: '/images/service-construction.png',
    icon: Building2,
    description:
      'Pembangunan dari nol dengan kualitas terbaik. Tim profesional kami memastikan setiap detail dikerjakan sempurna.',
  },
  {
    title: 'Konsultasi Desain',
    image: '/images/service-consulting.png',
    icon: Lightbulb,
    description:
      'Dapatkan saran ahli untuk proyek Anda. Konsultasi awal gratis untuk membantu mewujudkan visi desain Anda.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
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

export default function Services() {
  return (
    <section id="layanan" className="py-20 md:py-28 bg-white dark:bg-card">
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
            Layanan Kami
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Solusi lengkap untuk kebutuhan desain interior dan bangunan Anda
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card className="group overflow-hidden border-border/60 bg-card py-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-900/10 dark:hover:shadow-amber-500/5">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <CardContent className="relative px-5 pb-6 pt-0">
                    {/* Icon */}
                    <div className="-mt-8 mb-4 flex">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-6 w-6 text-white" strokeWidth={1.8} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-2 text-xl font-bold text-foreground"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Link */}
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 transition-colors duration-200 hover:text-amber-700 dark:hover:text-amber-300"
                    >
                      Pelajari Lebih Lanjut
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
