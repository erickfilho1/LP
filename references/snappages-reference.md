# Reference: SnapPages

Source: https://lp.snappages.com.br/
Captured on: 2026-05-27

Screenshots:
- `references/screenshots/snappages-desktop-top.png`
- `references/screenshots/snappages-mobile-top-2.png`
- `references/screenshots/snappages-full.pdf`

## Overall Impression

SnapPages is a dark, product-led landing page with a strong SaaS feel. It sells speed and convenience through huge mockups, video demonstration, sticky cards, repeated CTA blocks, carousels of examples, testimonials, pricing, founder story, and FAQ.

The page is more commercial and platform-oriented than the AutômatOS reference. It leans on purple gradients, dark background, glossy UI mockups, large buttons, sticky stacking sections, and scroll-triggered transformations.

## Structure

1. Hero with logo, direct promise, supporting copy, CTA, and risk-reversal line.
2. Large product/video demo immediately after the hero.
3. Product claim section: "Isso aqui parece bruxaria..." and risk-free test CTA.
4. Feature/value blocks: components, AI builder, weekly templates, responsive pages, support, speed, tutorials.
5. CTA repeat.
6. Authority/social proof: market leaders use SnapPages.
7. Bonus/extra asset bank: SnapAssets.
8. Long visual gallery/carousels of examples and testimonials.
9. Audience segmentation: designers, web designers, agencies, infoproducers.
10. Pricing cards: monthly, quarterly, annual.
11. Founder story.
12. FAQ and footer.

## Visual Language

- Background: nearly black with purple atmospheric gradients and radial glows.
- Hero: centered text with large tilted product mockups at left and right.
- Brand signal: logo is centered above H1.
- Typography: rounded/geometric sans, large bold H1, white and pale lavender text.
- Primary CTA: pill button with purple gradient, thick rounded border, arrow icon, hover glow.
- Risk reversal: small status dot beside "7 Dias Para Testar Sem Riscos".
- Product proof: large embedded video block just below first viewport.
- Mockups: angled UI screenshots with shadow and perspective.
- Sections: dark bands, glossy panels, gradients, and repeated image-heavy components.
- Testimonials: image carousel/sliders using screenshot cards.
- Pricing: long feature lists in plan cards, with highlighted plan badges.

## Technical Stack

The page loads:
- WordPress / Elementor / Hello Elementor
- Pro Elements / Elementor Pro-like modules
- GSAP `3.12.2`
- ScrollTrigger
- Lenis `1.1.18` and another Lenis plugin init
- Swiper `8.4.5`
- Panda Video embed
- WP Rocket lazy loading

## Motion and Interaction

### Smooth Scroll

Desktop only:

```js
if (window.innerWidth > 1024) {
  const lenis = new Lenis({
    duration: 1.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });
}
```

Reference behavior:
- Scroll feels heavier and more premium than native.
- Less slow than the AutômatOS page, but still noticeably smoothed.
- Good for cinematic landing pages; risky for pages that need fast comparison.

### Scroll Reveal

Elements use utility classes:
- `.scroll-left`
- `.scroll-right`
- `.scroll-bottom`
- `.scroll-top`

Initial CSS:

```css
.scroll-left,
.scroll-right,
.scroll-bottom,
.scroll-top {
  opacity: 0 !important;
  filter: blur(7px) !important;
  transition: 0.5s ease all !important;
}

.scroll-left { transform: translate(-30px, 0) !important; }
.scroll-right { transform: translate(30px, 0) !important; }
.scroll-bottom { transform: translate(0, 80px) !important; }
.scroll-top { transform: translate(0, -80px) !important; }

.ativo {
  opacity: 1 !important;
  filter: blur(0px) !important;
  transform: translate(0, 0) !important;
  transition: 0.5s ease all !important;
  will-change: transform, filter;
}
```

Reveal JS:

```js
const elementos = document.querySelectorAll('.scroll-left, .scroll-right, .scroll-bottom, .scroll-top');
const posicaoScroll = window.innerHeight * 0.5;

function fadeScroll() {
  elementos.forEach((el) => {
    const elementoTop = el.getBoundingClientRect().top - posicaoScroll;
    if (elementoTop < 320) {
      el.classList.add('ativo');
    } else {
      el.classList.remove('ativo');
    }
  });
}
```

Reference behavior:
- Strong blur-to-sharp reveal.
- Reversible: class is removed if element leaves trigger zone.
- Stagger is handled with helper classes `.e1`, `.e2`, `.e3`, `.e4` using delayed transitions on desktop.

### Scroll Text Fill

The `.selecionado` class uses a text-gradient mask whose CSS variable is animated by GSAP:

```css
.selecionado {
  background: linear-gradient(to right, #ffffff30 50%, #ffffff 50%);
  background-size: 200%;
  background-position: var(--bg-position, 0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

```js
gsap.to(".selecionado", {
  "--bg-position": "-100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".selecionado",
    start: "top bottom-=30%",
    end: "bottom center",
    scrub: true
  }
});
```

Reference behavior:
- Text appears to brighten/fill as the user scrolls.
- Useful for a single key sentence or promise, not for body text.

### Video Tilt Open

Videos start with perspective rotation and flatten when active:

```css
.video {
  transform-origin: bottom;
  transform: perspective(1000px) rotateX(20deg) !important;
  transition: transform 0.5s ease-in-out;
}

.video-ativoo {
  transform-origin: bottom;
  transform: perspective(1000px) rotateX(0deg) !important;
  transition: transform 0.5s ease-in-out;
}
```

GSAP/ScrollTrigger toggles `.video-ativoo`:

```js
gsap.utils.toArray(".video").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 60%",
    end: "bottom 20%",
    toggleClass: { targets: el, className: "video-ativoo" }
  });
});
```

Reference behavior:
- Product/video blocks feel like they unfold into view.
- Excellent for a demo section if the transform is subtle.

### Sticky Stacking Blocks

Several Elementor containers use sticky settings:
- `sticky: top`
- offsets around 80, 100, 120, 140
- sticky parent enabled
- classes `.bloco` and `.blocos`

Separate ScrollTriggers toggle `.is-active` on `.blocos` while each block crosses viewport center:

```js
const blocks = gsap.utils.toArray('.blocos');

blocks.forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top center',
    end: 'bottom center',
    toggleClass: { targets: el, className: 'is-active' }
  });
});
```

Reference behavior:
- Creates a progressive stack of feature cards.
- Good for showing "before/after", process steps, or offer pillars.

### Notebook Screen Open

The `.notebook-screen` starts folded shut and opens on scroll:

```css
.notebook-screen {
  transform-origin: bottom;
  transform: perspective(1000px) rotateX(90deg);
  transition: transform 0.5s ease-in-out;
}

.notebook-screen-aberto {
  transform-origin: bottom;
  transform: perspective(1000px) rotateX(0deg);
  transition: transform 0.5s ease-in-out;
}
```

```js
gsap.to(".notebook-screen", {
  className: "notebook-screen notebook-screen-aberto",
  scrollTrigger: {
    trigger: ".notebook-screen",
    start: "top bottom-=7%",
    end: "top bottom",
    scrub: true
  }
});
```

Reference behavior:
- A laptop/mockup literally opens as the user reaches it.
- Strong effect for product demonstration.

### CTA Arrow Motion

Buttons use a pill gradient, outer border pseudo-element, hover glow, and animated arrow:

```css
.elementor-button {
  position: relative;
  background: linear-gradient(90deg, #9C4EFF, #492781) !important;
  border-radius: 2000px;
}

.elementor-button:hover {
  box-shadow: 0px 0px 40px 0px #492781 !important;
}

.elementor-button-icon {
  animation: seta 1.2s ease infinite;
}

@keyframes seta {
  0%, 100% { transform: translatex(10px); }
  50% { transform: translatex(5px); }
}
```

Reference behavior:
- High-conversion, very obvious CTA.
- For our brand, translate into red CTA with subtle arrow nudge, not purple glow.

### Swiper Carousels

Image carousels use Elementor Swiper. One carousel is LTR and another is RTL, creating opposing horizontal motion in testimonial/example strips.

Reference behavior:
- Good for proof density.
- Can become visually noisy if every section uses movement.

## Ideas Worth Borrowing

- Hero with product mockups partially outside viewport for a bigger-than-screen product feel.
- Video/demo placed immediately after the hero instead of buried later.
- Risk-reversal line next to CTA.
- Scroll text fill for one strategic phrase.
- Product mockup "opening" with perspective rotation.
- Sticky feature stack for offer pillars or process.
- Opposing carousel rows for social proof/assets.
- CTA arrow nudge, but restrained.
- Pricing section with a visually dominant recommended plan.

## What Not To Copy Directly

- Purple gradient brand language, because it conflicts with our red/navy/white system.
- Very large pill radius if our brand needs a sharper, cleaner shape.
- Heavy blur reveal on every element.
- Duplicate Lenis loading/plugin setup.
- Overlong feature lists without hierarchy.
- Generic repeated feature body copy.
- Mobile overflow issues where text and media feel clipped.

## Translation For Our Landing Page

Use SnapPages as a reference for product demonstration, pricing, and sticky motion.

Recommended adaptations:
- Keep our CTA red and sharp-radius, but borrow the arrow movement and outer border idea.
- Use navy/white product mockups instead of purple atmospheric mockups.
- Use a cleaner reveal: opacity plus small translate; reserve blur for one special section.
- Use one sticky feature stack for process or value pillars.
- Use scroll text fill for one phrase in our main promise or proof statement.
- Use a demo/video section early if the product benefits from showing instead of explaining.
- Keep Lenis optional and desktop-only with a lighter duration.

