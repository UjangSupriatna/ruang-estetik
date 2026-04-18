'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Eye,
  X,
  ArrowRight,
  PencilRuler,
  Sparkles,
  Calendar,
  MapPin,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const categories = ['Semua', 'Rumah Tinggal', 'Komersial', 'Renovasi'] as const
type Category = (typeof categories)[number]

interface PortfolioItem {
  id: number
  sketchImage: string
  resultImage: string
  title: string
  category: Category
  description: string
  location: string
  year: string
  area: string
  duration: string
  style: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    sketchImage: '/images/portfolio-living-sketch.png',
    resultImage: '/images/portfolio-living.png',
    title: 'Rumah Minimalis Modern',
    category: 'Rumah Tinggal',
    description: 'Desain interior ruang tamu dengan konsep minimalis modern yang mengutamakan kenyamanan dan estetika bersih.',
    location: 'Bandung, Jawa Barat',
    year: '2024',
    area: '120 m²',
    duration: '3 Minggu',
    style: 'Minimalis Modern',
  },
  {
    id: 2,
    sketchImage: '/images/portfolio-kitchen-sketch.png',
    resultImage: '/images/portfolio-kitchen.png',
    title: 'Dapur Mewah Scandinavian',
    category: 'Rumah Tinggal',
    description: 'Renovasi dapur dengan sentuhan skandinavia, material premium, dan pencahayaan alami yang optimal.',
    location: 'Bandung, Jawa Barat',
    year: '2024',
    area: '45 m²',
    duration: '4 Minggu',
    style: 'Scandinavian Luxury',
  },
  {
    id: 3,
    sketchImage: '/images/portfolio-bedroom-sketch.png',
    resultImage: '/images/portfolio-bedroom.png',
    title: 'Kamar Tidur Eksekutif',
    category: 'Rumah Tinggal',
    description: 'Suite kamar tidur dengan furnitur custom, pencahayaan ambient, dan material berkualitas tinggi.',
    location: 'Jakarta Selatan',
    year: '2023',
    area: '60 m²',
    duration: '2 Minggu',
    style: 'Contemporary Elegance',
  },
  {
    id: 4,
    sketchImage: '/images/portfolio-office-sketch.png',
    resultImage: '/images/portfolio-office.png',
    title: 'Kantor Modern Premium',
    category: 'Komersial',
    description: 'Desain kantor dengan konsep open space, area kolaborasi, dan ruang meeting yang representatif.',
    location: 'Bandung, Jawa Barat',
    year: '2024',
    area: '250 m²',
    duration: '6 Minggu',
    style: 'Modern Corporate',
  },
  {
    id: 5,
    sketchImage: '/images/portfolio-bathroom-sketch.png',
    resultImage: '/images/portfolio-bathroom.png',
    title: 'Spa Bathroom Suite',
    category: 'Renovasi',
    description: 'Transformasi kamar mandi standar menjadi pengalaman spa mewah dengan marmer dan aksen kayu.',
    location: 'Bandung, Jawa Barat',
    year: '2023',
    area: '25 m²',
    duration: '2 Minggu',
    style: 'Luxury Spa',
  },
  {
    id: 6,
    sketchImage: '/images/portfolio-residence-sketch.png',
    resultImage: '/images/portfolio-living.png',
    title: 'Residensi Hillside',
    category: 'Komersial',
    description: 'Proyek residensial mewah dengan pemandangan panorama, menggabungkan alam dan arsitektur modern.',
    location: 'Lembang, Bandung',
    year: '2024',
    area: '380 m²',
    duration: '8 Minggu',
    style: 'Tropical Modern',
  },
]

const categoryBadgeStyles: Record<Category, string> = {
  'Semua': 'bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-50',
  'Rumah Tinggal': 'bg-gold-50 text-gold-700 border-gold-200 hover:bg-gold-50',
  'Komersial': 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
  'Renovasi': 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800/50 dark:text-neutral-400 dark:border-neutral-700',
}

/* ---------- Portfolio Card ---------- */
function PortfolioCard({
  item,
  index,
  onOpenDetail,
}: {
  item: PortfolioItem
  index: number
  onOpenDetail: (item: PortfolioItem) => void
}) {
  const [showSketch, setShowSketch] = useState(false)

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
          {/* Result Image (default) */}
          <motion.img
            src={showSketch ? item.sketchImage : item.resultImage}
            alt={showSketch ? `Sketsa ${item.title}` : item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - always visible */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              className={`${categoryBadgeStyles[item.category]} text-xs font-medium backdrop-blur-sm`}
            >
              {item.category}
            </Badge>
          </div>

          {/* Sketch/Result Toggle - visible on hover */}
          <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowSketch(!showSketch)
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors ${
                showSketch
                  ? 'bg-gold-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <PencilRuler className="size-3" />
              {showSketch ? 'Sketsa' : 'Hasil'}
            </button>
          </div>

          {/* Bottom info overlay - visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
              <span className="flex items-center gap-1"><MapPin className="size-3" />{item.location}</span>
              <span>•</span>
              <span>{item.year}</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Sketch indicator */}
          {showSketch && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="flex items-center gap-1 rounded-full bg-neutral-800/80 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                <PencilRuler className="size-3" />
                SKETSA
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                {item.style} • {item.area}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground hover:text-gold-500"
              onClick={() => onOpenDetail(item)}
            >
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/* ---------- Portfolio Detail Modal ---------- */
function PortfolioDetail({
  item,
  open,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: PortfolioItem | null
  open: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const [viewMode, setViewMode] = useState<'sketch' | 'result' | 'compare'>('compare')

  if (!item) return null

  const details = [
    { icon: MapPin, label: 'Lokasi', value: item.location },
    { icon: Calendar, label: 'Tahun', value: item.year },
    { icon: Maximize2, label: 'Luas', value: item.area },
    { icon: Calendar, label: 'Durasi', value: item.duration },
    { icon: Sparkles, label: 'Gaya', value: item.style },
  ]

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div>
            <Badge className={`${categoryBadgeStyles[item.category]} text-xs mb-2`}>
              {item.category}
            </Badge>
            <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-bold text-foreground">
              {item.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Navigation */}
            {hasPrev && (
              <Button variant="ghost" size="icon" className="size-9" onClick={onPrev}>
                <ChevronLeft className="size-5" />
              </Button>
            )}
            {hasNext && (
              <Button variant="ghost" size="icon" className="size-9" onClick={onNext}>
                <ChevronRight className="size-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* View Mode Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1">
            {([
              { key: 'compare', label: 'Sketsa → Hasil', icon: ArrowRight },
              { key: 'sketch', label: 'Sketsa', icon: PencilRuler },
              { key: 'result', label: 'Hasil Jadi', icon: Sparkles },
            ] as const).map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  viewMode === mode.key
                    ? 'bg-white dark:bg-neutral-700 text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <mode.icon className="size-4" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Images Area */}
          <AnimatePresence mode="wait">
            {viewMode === 'compare' && (
              <motion.div
                key="compare"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Sketch */}
                <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      <PencilRuler className="size-3" />
                      SKETSA AWAL
                    </span>
                  </div>
                  <div className="aspect-[4/3]">
                    <Image
                      src={item.sketchImage}
                      alt={`Sketsa ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Result */}
                <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-1.5 rounded-full bg-gold-500/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      <Sparkles className="size-3" />
                      HASIL JADI
                    </span>
                  </div>
                  <div className="aspect-[4/3]">
                    <Image
                      src={item.resultImage}
                      alt={`Hasil ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {viewMode === 'sketch' && (
              <motion.div
                key="sketch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <PencilRuler className="size-4" />
                    SKETSA AWAL
                  </span>
                </div>
                <div className="aspect-[16/10]">
                  <Image
                    src={item.sketchImage}
                    alt={`Sketsa ${item.title}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            )}

            {viewMode === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center gap-2 rounded-full bg-gold-500/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <Sparkles className="size-4" />
                    HASIL JADI
                  </span>
                </div>
                <div className="aspect-[16/10]">
                  <Image
                    src={item.resultImage}
                    alt={`Hasil ${item.title}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow indicator between images in compare mode */}
          {viewMode === 'compare' && (
            <div className="hidden md:flex justify-center -mt-6 relative z-10">
              <div className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-gold-500/25">
                <PencilRuler className="size-4" />
                <ArrowRight className="size-4" />
                <Sparkles className="size-4" />
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-3 text-center border border-neutral-100 dark:border-neutral-700/50"
              >
                <detail.icon className="size-4 text-gold-500 mx-auto mb-1.5" />
                <p className="text-xs text-muted-foreground">{detail.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{detail.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-5 border border-neutral-100 dark:border-neutral-700/50">
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Eye className="size-4 text-gold-500" />
              Deskripsi Proyek
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <Button
              asChild
              className="bg-gold-500 hover:bg-gold-600 text-neutral-900 font-semibold gap-2 px-8"
            >
              <a href="#kontak">
                <ArrowRight className="size-4" />
                Konsultasi Proyek Serupa
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ---------- Main Component ---------- */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('Semua')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredItems =
    activeCategory === 'Semua'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  const handleOpenDetail = useCallback((item: PortfolioItem) => {
    setSelectedItem(item)
    const idx = portfolioItems.findIndex((i) => i.id === item.id)
    setSelectedIndex(idx)
  }, [])

  const handlePrev = useCallback(() => {
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : portfolioItems.length - 1
    setSelectedIndex(prevIndex)
    setSelectedItem(portfolioItems[prevIndex])
  }, [selectedIndex])

  const handleNext = useCallback(() => {
    const nextIndex = selectedIndex < portfolioItems.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(nextIndex)
    setSelectedItem(portfolioItems[nextIndex])
  }, [selectedIndex])

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
            className="inline-block text-gold-500 dark:text-gold-400 font-medium text-sm tracking-wider uppercase mb-3"
          >
            Portfolio
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Portfolio Kami
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Lihat transformasi dari sketsa awal hingga hasil jadi dalam setiap proyek kami
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
                  : 'hover:bg-gold-50 hover:text-gold-600 hover:border-gold-300 dark:hover:bg-gold-950/30 dark:hover:text-gold-400 dark:hover:border-gold-800'
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
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  onOpenDetail={handleOpenDetail}
                />
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
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />
        </motion.div>
      </div>

      {/* Detail Modal */}
      <PortfolioDetail
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < portfolioItems.length - 1}
      />
    </section>
  )
}
