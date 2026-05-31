# Reference: RPX Digital / O Ronaldo X

Source: https://oronaldox.com.br/
Captured on: 2026-05-28

Screenshots:
- `references/screenshots/oronaldox-desktop-top.png`
- `references/screenshots/oronaldox-mobile-top.png`
- `references/screenshots/oronaldox-full.pdf`

Raw rendered DOM snapshot:
- `references/oronaldox-dom.html`

Important note:
- This is a reference extraction only. Do not merge these tokens into our brand design system automatically.

## Overall Impression

RPX Digital is a premium dark agency landing page with a futuristic, high-contrast visual system. It uses black, electric blue, luminous arcs, animated particles, rounded typography, and soft-glow CTAs to position the agency as modern, polished, strategic, and conversion-driven.

Compared with the previous references, this one is cleaner and more agency/editorial. It is less "product SaaS" and more "premium design studio with performance angle".

## Page Structure

1. Fixed/simple top bar with RPX logo and contact button.
2. Hero with centered offer: "Transforme cliques em clientes reais".
3. Social proof under CTA: overlapped client avatars and "+200 clientes atendidos".
4. Trust/portfolio intro: confidence and client trust framing.
5. Project gallery/carousel.
6. Services section: identity, sites/LPs, launch creatives, social media, slides, fast delivery.
7. Comparison/value section: what the client receives vs does not receive.
8. Process section: briefing, creation, delivery.
9. Feedback/testimonials.
10. Founder/about section.
11. Checklist/fit section.
12. FAQ and final WhatsApp CTA.
13. Footer.

## Technical Stack

The page appears to use:
- WordPress
- Hello Elementor
- Elementor / Elementor Pro
- Swiper `8.4.5`
- Lenis `1.0.34`
- Three.js `r72`
- Mobile Detect
- WP Rocket lazy load
- Elementor animations: `fadeInDown`, `fadeInUp`, `grow`

No GSAP was found in the rendered DOM or asset list. The scroll and motion system is mostly Elementor animations, custom scroll-class toggling, Lenis, Swiper, and a custom canvas particle system.

## Design DNA

### Design Type

Category:
- Premium dark agency landing page
- Futuristic editorial
- High-end digital studio
- Conversion-focused portfolio

Visual keywords:
- Electric
- Minimal but atmospheric
- Glossy
- Spacious
- Trust-driven
- High contrast
- Rounded geometric

### Color Tokens Observed

Core:
- `#000000` / `oklch(0.000 0.000 0.0)` - main black background
- `#000305` / `oklch(0.090 0.017 224.6)` - near-black blue section background
- `#00071B` / `oklch(0.134 0.048 257.5)` - deep navy used for button text and overlays
- `#010101` / `oklch(0.067 0.000 89.9)` - badge/pill background
- `#FFFFFF` / `oklch(1.000 0.000 89.9)` - primary text
- `#FFFFFF80` - muted text at 50% opacity

Accent blues:
- `#2E90FF` / `oklch(0.655 0.187 254.8)` - primary electric blue
- `#34C2FF` / `oklch(0.767 0.144 232.4)` - cyan-blue glow/borders
- `#9FE2FF` / `oklch(0.878 0.078 226.8)` - light cyan particle/glow
- `#34C2FF1A` - low-opacity border for cards

Occasional:
- `#14FF00` - small green success/check accent

### Typography

Observed font families:
- Headings and most UI: `Visby`
- Some text blocks: `Kross Neue Grotesk`
- Elementor global defaults mention Roboto/Roboto Slab, but actual page styling heavily uses custom `Visby`.

Approximate type scale:
- Hero H1: `80px`, weight `700`, letter spacing `-3px`, color white, centered
- Hero subcopy: `24px`, weight `500`, letter spacing `-0.4px`
- Section title large: `48px`, weight `500`, line-height `120%`, letter spacing around `-1.4px`
- Section title standard: `40px`, weight `700` or `500`
- Card title: `22px` to `24px`, weight `700`, line-height around `23px`
- Body: `16px` to `20px`, weight `400` or `500`, line-height often `120%` to `140%`
- Labels/badges: `18px`, weight `300` to `400`, pill style
- FAQ title: `20px`, accordion duration `400ms`

Typography feel:
- Rounded, soft, geometric sans
- Large negative tracking in hero
- High contrast between large hero and compact body
- Mostly white text, with blue gradient emphasis on selected words

### Spacing and Layout

Common section padding:
- Desktop sections often use `80px`, `100px`, or `100px 100px`
- Large visual section uses `100px 60px 300px`
- Content/cards often use `20px`, `24px`, `32px`, or `40px` internal padding
- Small gaps: `12px`
- Medium gaps: `20px`, `40px`
- Larger paired layout gap: `60px`

Layout behavior:
- Hero is center-aligned, with content stacked vertically.
- Page uses full-width black/dark bands with contained inner content.
- Cards sit in rows/grids with 1px translucent blue borders.
- Process and service blocks use repeated card structures.
- Mobile keeps the hero centered and crops/positions the luminous background arcs dramatically.

### Radius and Shape Language

Observed radius:
- Buttons: `100px` or pill/fully rounded
- Badges: `900px`
- Cards: commonly `20px`
- Accordion: `12px`
- Carousels/images: `10px`
- Some media panels: `8px`, `16px`, `24px`

Shape language:
- Very rounded CTA and badges
- Rounded but restrained cards
- Circular avatar stacks
- Large curved luminous background arcs

### Components

Hero:
- Full-screen-ish dark hero with background image `background-hero.webp`
- Centered logo/title/subtitle/CTA/social proof
- Blue gradient span for the key phrase
- Thin top navigation with dark background and subtle border

CTA:
- Pill button
- Bright blue fill
- Deep navy text
- External-link icon
- Header button is outline/pill with blue border and white text
- Elementor `grow` animation on hover

Social proof:
- Overlapping avatar carousel/row
- Negative image spacing around `-20px`
- `+200 clientes atendidos` below

Cards:
- Dark gradient background from `#000000` to `#000305`
- `1px` border with `#34C2FF1A`
- `20px` radius
- Internal padding often `20px` or `32px`
- Hover shifts background toward pure black

Badges:
- Black pill background
- White text
- `10px` padding
- Very high radius
- Used as section eyebrow markers: "CONFIANCA", "PROJETOS", "SERVICOS", "PROCESSOS", etc.

Carousels:
- Swiper-based
- Portfolio carousel with 4 visible slides on desktop, 2 on mobile/tablet
- Speed around `7000ms`
- Autoplay enabled, infinite loop
- No navigation controls

FAQ:
- Elementor nested accordion
- `12px` radius
- `20px` title font size
- `400ms` animation
- One item expanded at a time

## Motion and Effects

### Elementor Entrance Animations

Hero elements use:
- `fadeInDown` for H1
- `fadeInUp` for subcopy/CTA/social proof
- `grow` hover animation for CTA buttons

Effect quality:
- Simple and clean
- Focused mostly on initial hero reveal

### Lenis Smooth Scroll

Custom setup:

```js
const lenis = new Lenis({
  duration: 1.5,
  lerp: 0.05,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.2,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
});
```

Notes:
- Smooth scroll is always initialized, not only desktop.
- It logs scroll events to console.
- For our implementation, remove console logging and consider desktop-only use.

### Scroll Reveal Utility Classes

Custom classes:
- `.scroll-esquerda`
- `.scroll-direita`
- `.scroll-base`
- `.scroll-topo`
- `.scroll-zoom`

JS trigger:

```js
const elementos = document.querySelectorAll('.scroll-esquerda, .scroll-direita, .scroll-base, .scroll-topo, .scroll-zoom');
const posicaoScroll = window.innerHeight * 0.9;

function fadeScroll() {
  elementos.forEach((elemento) => {
    const elementoTop = elemento.getBoundingClientRect().top - posicaoScroll;
    if (elementoTop < 120) {
      elemento.classList.add('ativo');
    } else {
      elemento.classList.remove('ativo');
    }
  });
}
```

Behavior:
- Elements become active near the bottom of viewport.
- Reveal reverses when scrolling away.
- No IntersectionObserver; simple scroll listener.

### Particle / Star Canvas

The page loads Three.js, but the visible particle effect is implemented with a canvas object called `Stars`.

Core behavior:
- Creates 1200 tiny circles
- Colors rotate through low-opacity electric blues
- Circles move continuously with small random velocity
- Mouse proximity increases circle radius
- Canvas resizes to viewport
- Animation runs with `requestAnimationFrame`

Color palette:
- `#2E90FF30`
- `#2E90FF50`
- `#9FE2FF50`
- `#2E90FF40`
- `#34C2FF40`
- `#34C2FF50`

Design effect:
- Creates a subtle digital/starfield layer.
- Reinforces the futuristic agency tone.
- More elegant than generic gradient blobs, but potentially expensive because it draws 1200 particles.

### Background Imagery

Important image assets:
- `background-hero.webp` - hero luminous arcs
- `bg-hero-top.png` - upper hero/section glow treatment
- `bg-luz.png` - bottom light/glow section
- `cta-wpp.png` - WhatsApp CTA visual
- `NG-QUIZ.png` - case/project background

## What To Borrow

- Dark premium agency hero with one strong promise.
- Blue electric accent as a single focused highlight color.
- Overlapping client avatars under CTA as compact social proof.
- Full-width atmospheric background image with strong negative space.
- Animated particle canvas, but only if optimized and subtle.
- Swiper portfolio strip with no visible controls.
- Simple service cards with translucent accent borders.
- Rounded badges as section labels.
- FAQ with clean accordion and short answers.
- Process section with human wording: briefing, creation, delivery.

## What Not To Copy Directly

- The black/blue palette should stay as reference only, because our brand system is red/navy/white.
- Avoid using 1200 particles by default; reduce count or disable on mobile.
- Avoid always-on Lenis on mobile unless verified.
- Do not copy the exact hero promise or copy structure.
- Do not use oversized pill CTAs if our local brand direction calls for sharper buttons.
- Avoid console logging scroll events in production.

## Translation For Our Landing Page

This reference is valuable for a premium agency landing page. For our brand:

- Translate electric blue glow into restrained navy depth and red accents.
- Use the hero composition idea, but keep our CTA shape and typography rules.
- Keep client-avatar proof under the CTA.
- Use particles or a subtle grid only in one atmospheric section, not the whole page.
- Borrow the section rhythm: hero, trust, projects, services, process, testimonials, founder, FAQ.
- Keep cards sharper and cleaner than RPX if following our design system.
- Use scroll reveal with `IntersectionObserver`, not a raw scroll listener.

