# Task 7 - FAQ Agent Worklog

## Task
Create a professional FAQ section component for the Ruangan Elegan Interior Design & Building services website.

## Implementation Details

### File Created
- `/home/z/my-project/src/components/faq.tsx`

### Component Structure
- **Section**: `id="faq"` for navbar navigation
- **Header**: "Pertanyaan Umum" title with Playfair Display font, amber icon badge, decorative amber divider, and subtitle
- **Accordion**: 6 FAQ items using shadcn Accordion (`type="single" collapsible`)
- **Animations**: Framer-motion scroll-triggered:
  - `FadeInOnScroll` - for header and bottom CTA
  - `StaggerContainer` / `StaggerItem` - for staggered accordion items
- **CTA**: "Hubungi Kami" amber button linking to `#kontak`

### FAQ Items (Indonesian)
1. Project timeline (2-4 weeks for rooms, 3-6 months for full construction)
2. Interior design pricing (starting from Rp 5 juta, free initial consultation)
3. Client involvement in design process (collaborative approach)
4. Quality warranty (1 year coverage)
5. Service area (Jabodetabek and major Indonesian cities)
6. How to start a project (form, phone, WhatsApp)

### Styling
- Amber accent on active/expanded accordion items:
  - Background: `bg-amber-50/60` (light) / `bg-amber-950/20` (dark)
  - Border: `border-amber-200/50` / `border-amber-800/30`
  - Text: `text-amber-700` / `text-amber-400`
  - Chevron: `text-amber-600` / `text-amber-400`
- Rounded cards with hover effects on closed items
- Responsive: mobile-first with `sm:` and `lg:` breakpoints

### Quality Checks
- `bun run lint` passes with no errors
- Consistent with project conventions (amber accents, Playfair Display, dark mode support)
