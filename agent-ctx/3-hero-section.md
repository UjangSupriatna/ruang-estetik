# Task 3 - Hero Section Component

## Summary
Created the Hero section component for "Ruangan Elegan" interior design website at `/home/z/my-project/src/components/hero.tsx`.

## Details

### Component Features
- **Full viewport hero section** with `h-screen` and background image from `/images/hero.png` using `next/image` with `fill` and `object-cover`
- **Dark overlay gradient** using the pre-defined `hero-overlay` CSS class from `globals.css`
- **Main headline**: "Wujudkan Ruangan Impian Anda" with Playfair Display font via `font-[var(--font-playfair)]` and "Ruangan Impian" highlighted in amber
- **Subheadline**: Full Indonesian text as specified
- **Two CTA buttons**:
  - "Konsultasi Gratis" — primary amber button with Phone icon
  - "Lihat Portfolio" — outline/ghost white button with ArrowRight icon
- **Stats bar** at bottom: "500+ Proyek Selesai", "15+ Tahun Pengalaman", "98% Klien Puas" with vertical dividers between items
- **Framer Motion animations**: fade-in-from-bottom with staggered children (container + item variants)
- **Scroll indicator** at bottom center with bouncing animation
- **Badge** at top: "Interior Design & Building" with pulsing dot

### Technical Decisions
- Used `'use client'` directive for client-side framer-motion
- Leveraged existing `hero-overlay` CSS class and `--font-playfair` variable from layout
- Used existing shadcn/ui `Button` component with custom amber styling via className overrides
- Responsive design: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Image priority loading for LCP optimization
- No new dependencies required — framer-motion was already installed

### Lint Status
✅ ESLint passes cleanly with no errors or warnings
