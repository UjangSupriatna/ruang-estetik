# Task 6: Process Section Component

## Agent: process-agent
## Status: ✅ Complete

## What was done
Created the "Proses Kerja Kami" (How We Work) process section component at `/home/z/my-project/src/components/process.tsx`.

## Component Details

### Structure
- Section with `id="proses"` for anchor navigation
- Title: "Proses Kerja Kami" with Playfair Display font
- Subtitle: "Langkah-langkah yang kami ambil untuk mewujudkan ruangan impian Anda"
- 4 process steps with staggered scroll animations

### Steps
1. **Konsultasi** (MessageCircle icon) — Diskusi mendalam tentang kebutuhan, keinginan, dan anggaran proyek Anda
2. **Desain** (PenTool icon) — Pembuatan konsep desain, 3D rendering, dan revisi hingga Anda puas
3. **Pelaksanaan** (Hammer icon) — Tim profesional kami mengerjakan proyek dengan kualitas terbaik dan tepat waktu
4. **Penyelesaian** (CheckCircle icon) — Serah terima proyek dengan garansi kualitas dan layanan purna jual

### Visual Design
- Amber (`amber-500`) step number circles with shadow and ring
- White icon containers with subtle ring border
- Playfair Display for step titles, matching project typography
- Stone color palette for text (900, 600)
- `bg-stone-50` section background to differentiate from adjacent sections

### Responsive Layout
- **Mobile/Tablet**: Vertical layout (`flex-col`) with centered content and vertical connecting line
- **Desktop** (`lg:`): Horizontal layout (`flex-row`) with horizontal connecting line and evenly spaced steps

### Connecting Lines
- Horizontal on `lg:` breakpoints — positioned behind step cards with amber-200 line and decorative dots
- Vertical on smaller screens — centered amber-200 line running between steps

### Animations
- Section header: fade-in with upward motion on scroll (viewport trigger)
- Step cards: staggered reveal with 0.2s delay between each, using framer-motion `variants` pattern
- All animations use `viewport={{ once: true }}` to prevent re-triggering

### Integration
- Added `<Process />` component to `src/app/page.tsx` after Portfolio section
- Lint passes clean
- Dev server compiles successfully (200 responses confirmed)
