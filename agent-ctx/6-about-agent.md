# Task 6 - About Agent Work Record

## Task
Create a professional About Us / Stats section component for "Ruangan Elegan"

## File Created
- `/home/z/my-project/src/components/about.tsx`

## Implementation Details

### Structure
- Section with `id="tentang"` for navigation targeting
- Two-column grid layout: image left, content right
- Responsive: stacks vertically on mobile, side-by-side on desktop (lg breakpoint)

### Image Side
- Uses `next/image` with `/images/about-team.png`
- Rounded corners (`rounded-2xl`), shadow (`shadow-xl`)
- Decorative frame offset behind image (desktop only)
- Subtle gradient overlay on image bottom
- Animated with framer-motion slide-in from left

### Content Side
- Amber "Tentang Kami" label badge with dot indicator
- Playfair Display title "Mengubah Ruangan Menjadi Karya Seni" with amber accent on "Karya Seni"
- Two paragraphs of Indonesian text about the company
- 4-stat grid (2x2) with count-up animation

### Stats
- 500+ Proyek Selesai
- 15+ Tahun Pengalaman
- 50+ Tim Profesional
- 98% Klien Puas

### Count-Up Animation
- Custom `useCountUp` hook using `requestAnimationFrame`
- Ease-out cubic easing for natural feel
- 2000ms duration
- Triggered when section scrolls into view via `useInView`

### Animations (framer-motion)
- `useInView` with `once: true` and `-100px` margin for scroll trigger
- Container variants with stagger children (0.15s delay between items)
- Image: slide-in from left with scale
- Content items: fade-up with stagger
- Stat cards: staggered fade-up with 0.15s delay between each

### Styling
- Amber accent colors throughout (amber-600/400 for light/dark)
- Subtle background decorative circles
- Stat cards with border, shadow, and hover effect
- Consistent with project's existing design language

## Lint Check
✅ All lint checks pass
