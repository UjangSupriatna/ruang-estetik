'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

const categories = ['Semua', 'Rumah Tinggal', 'Komersial', 'Renovasi'] as const
type Category = (typeof categories)[number]

interface PortfolioItem {
  id: number
  image: string
  title: string
  category: Category
  description: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: '/images/portfolio-living.png',
    title: 'Rumah Minimalis Modern',
    category: 'Rumah Tinggal',
    description: 'Desain interior ruang tamu dengan konsep minimalis modern',
  },
  {
    id: 2,
    image: '/images/portfolio-kitchen.png',
    title: 'Dapur Mewah Scandinavian',
    category: 'Rumah Tinggal',
    description: 'Renovasi dapur dengan sentuhan skandinavia dan material premium',
  },
  {
    id: 3,
    image: '/images/portfolio-bedroom.png',
    title: 'Kamar Tidur Eksekutif',
    category: 'Rumah Tinggal',
    description: 'Suite kamar tidur dengan furnitur custom dan pencahayaan ambient',
  },
  {
    id: 4,
    image: '/images/portfolio-office.png',
    title: 'Kantor Modern Premium',
    category: 'Komersial',
    description: 'Desain kantor dengan konsep open space dan area kolaborasi',
  },
  {
    id: 5,
    image: '/images/portfolio-bathroom.png',
    title: 'Spa Bathroom Suite',
    category: 'Renovasi',
    description: 'Transformasi kamar mandi menjadi pengalaman spa mewah',
  },
  {
    id: 6,
    image: '/images/portfolio-living.png',
    title: 'Residensi Hillside',
    category: 'Komersial',
    description: 'Proyek residensial mewah dengan pemandangan panorama',
  },
]

const categoryBadgeStyles: Record<Category, string> = {
  'Semua': 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100',
  'Rumah Tinggal': 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100',
  'Komersial': 'bg-warm-100 text-warm-700 border-warm-200 hover:bg-warm-100',
  'Renovasi': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50',
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-500 p-0 gap-0 py-0">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - always visible */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              className={`${categoryBadgeStyles[item.category]} text-xs font-medium backdrop-blur-sm`}
            >
              {item.category}
            </Badge>
          </div>

          {/* Eye icon - visible on hover */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
              <Eye className="size-4" />
            </div>
          </div>

          {/* Description overlay - visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
            {item.description}
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('Semua')

  const filteredItems =
    activeCategory === 'Semua'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-amber-600 font-medium text-sm tracking-wider uppercase mb-3"
          >
            Portfolio
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Portfolio Kami
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Lihat hasil karya terbaik kami dalam berbagai proyek desain dan bangunan
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg'
                  : 'hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 dark:hover:bg-amber-950/30 dark:hover:text-amber-400 dark:hover:border-amber-800'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <p className="text-lg">Tidak ada proyek dalam kategori ini.</p>
            </motion.div>
          )}
        </div>

        {/* Bottom decorative accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 md:mt-20 flex justify-center"
        >
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
        </motion.div>
      </div>
    </section>
  )
}
