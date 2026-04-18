'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Budi Santoso',
    role: 'Pemilik Rumah, Jakarta',
    rating: 5,
    text: 'Hasilnya luar biasa! Tim Ruangan Elegan benar-benar memahami apa yang kami inginkan. Ruang tamu kami sekarang terlihat seperti di majalah interior.',
  },
  {
    name: 'Sari Dewi',
    role: 'CEO, PT Maju Bersama',
    rating: 5,
    text: 'Renovasi kantor kami berjalan sangat lancar. Profesional, tepat waktu, dan hasilnya melebihi ekspektasi. Sangat merekomendasikan!',
  },
  {
    name: 'Ahmad Rizki',
    role: 'Pemilik Restoran',
    rating: 5,
    text: 'Desain interior restoran kami menjadi daya tarik utama pelanggan. Terima kasih Ruangan Elegan atas kreativitas dan dedikasinya.',
  },
  {
    name: 'Linda Kusuma',
    role: 'Interior Enthusiast',
    rating: 4,
    text: 'Konsultasi desain yang sangat membantu. Mereka memberikan saran-saran yang praktis dan estetis. Prosesnya sangat menyenangkan.',
  },
  {
    name: 'Rudi Hartono',
    role: 'Developer Properti',
    rating: 5,
    text: 'Sudah 3 proyek bersama Ruangan Elegan dan hasilnya selalu konsisten. Kualitas terbaik dengan harga yang wajar.',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
          )}
        />
      ))}
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <section
      id="testimoni"
      className="relative w-full overflow-hidden bg-gradient-to-b from-amber-50/50 to-white py-20 dark:from-amber-950/20 dark:to-background sm:py-28"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-amber-100/40 dark:bg-amber-900/10" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-amber-100/30 dark:bg-amber-900/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
            <Star className="size-3.5 fill-amber-500 text-amber-500" />
            Testimoni Klien
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Apa Kata Klien Kami
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Testimoni dari klien yang telah mempercayakan proyek mereka kepada
            kami
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="mx-auto max-w-6xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full border-amber-100/60 bg-white/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg dark:border-amber-900/30 dark:bg-card/80">
                    <CardContent className="flex h-full flex-col gap-5 pt-6">
                      {/* Quote Icon */}
                      <div className="flex items-start justify-between">
                        <Quote className="size-10 fill-amber-100 text-amber-500 dark:fill-amber-900/40 dark:text-amber-400" />
                        <StarRating rating={testimonial.rating} />
                      </div>

                      {/* Testimonial Text */}
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 border-t border-amber-100/60 pt-4 dark:border-amber-900/20">
                        {/* Avatar */}
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          {getInitials(testimonial.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground sm:text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => api?.scrollPrev()}
                className="flex size-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-600 shadow-sm transition-all hover:bg-amber-50 hover:shadow-md dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-900/60"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      current === i
                        ? 'w-6 bg-amber-500 dark:bg-amber-400'
                        : 'w-2 bg-amber-200 hover:bg-amber-300 dark:bg-amber-800 dark:hover:bg-amber-700'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={() => api?.scrollNext()}
                className="flex size-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-600 shadow-sm transition-all hover:bg-amber-50 hover:shadow-md dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-900/60"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
