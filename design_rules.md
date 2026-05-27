# Cilex Ibiza - Mediterranean Luxury Design System

## 1. Core Philosophy
The design language is **Editorial Mediterranean Luxury**. It focuses on evoking the feeling of a premium, curated Ibiza experience—warm sunsets, pristine beaches, and exclusive access. The aesthetic relies heavily on high-contrast typography for headings, clean sans-serif for body text, and a warm, earthy color palette.

## 2. Typography Rules (Updated)
We are now utilizing the custom local fonts provided in the `fonts` folder.
- **Display Font**: `Tosh` (Used for Headings. Sharp, modern display features).
- **Body Font**: `Roboto` (Clean, legible sans-serif for body copy and paragraphs).

## 3. Color Palette
The colors are mapped to CSS variables in `globals.css` and `tailwind.config.ts`.

### Backgrounds
- **Base (Light)**: `#F2EBDF` (Sand/Warm White)
- **Soft Base**: `#EFE5D2`
- **Warm Base**: `#E8DCC4`
- **Dark (Footer/Sections)**: `#14110D`
- **Dark Soft**: `#211C16`

### Text & Lines
- **Primary Ink**: `#1A1612` (Almost black, warm)
- **Soft Ink**: `#3E342A`
- **Muted Ink**: `#6B5D4F`
- **Lines/Borders**: `#C8B89E`
- **Soft Lines**: `#DCCFB6`

### Accents
- **Fuchsia (Primary CTA)**: `#d946ef`
- **Fuchsia Deep (Hover)**: `#a21caf`
- **Gold**: `#B89855`
- **Soft Gold**: `#D4B97A`
- **Olive**: `#5A6B3F`
- **Sea (Deep Teal)**: `#2E5A5C`

## 4. UI Components & Elements
- **Buttons**:
  - *Primary*: Ink background, white text. Hover state translates Y-axis slightly (-2px) and changes background to Terracotta.
  - *Terracotta*: Solid terracotta. Hover state deepens to Terracotta Deep.
  - *Ghost*: Simple text with a 1px solid bottom border.
  - *Shape*: Sharp edges (border-radius: 0) or very subtle rounding, wide padding (18px 32px), small uppercase text with wide tracking.
- **Navigation**: Sticky top bar with a glassmorphism effect (backdrop-blur: 16px) over the background color at 94% opacity. Thin 0.5px border on the bottom.
- **Dividers**: Use 0.5px or 1px lines in the `var(--line)` color to separate sections.
- **Grain Overlay**: Add a subtle SVG noise filter or CSS repeating gradient pattern to background sections to give a tactile, paper-like feel.
- **Marquee**: Use continuous scrolling text bands (background: Ink, text: Gold) to display keywords with a small terracotta star/diamond separator.

## 5. Implementation Strategy in Next.js/Tailwind
1. **Typography**: We've loaded the custom `Tosh` and `Roboto` fonts using `@font-face` in `src/app/globals.css`. They are bound to Tailwind's `font-display` and `font-body` utilities respectively.
2. **Shadcn UI Overrides**: When using Shadcn components (like buttons, dialogs, dropdowns), override the default border radii to `0` or `0.3rem` and apply the terracotta/ink color scheme instead of the default slate/zinc.
3. **Framer Motion**: Apply `fade-up` animations on scroll for all major text blocks and images to maintain a fluid, high-end feel.
