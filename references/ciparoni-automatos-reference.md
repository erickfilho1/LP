# Reference: Ciparoni AutômatOS

Source: https://ciparoni.com/formacao-automatos/
Captured on: 2026-05-27

Screenshots:
- `references/screenshots/ciparoni-desktop-top.png`
- `references/screenshots/ciparoni-mobile-top.png`
- `references/screenshots/ciparoni-full.pdf`

## Overall Impression

The page feels like a dark, cinematic launch page for a technical product. It uses a strong hero image, dense glow, floating app/tool icons, pixel texture, and software UI motifs to make automation feel powerful and tangible.

The design is not minimal. It is high-energy, productized, and atmospheric. It would be a useful reference for motion, depth, visual proof, and "software magic" moments, but our brand system should translate those ideas into a cleaner red/navy/white execution.

## Structure

1. Hero with product logo, large promise, CTA, waitlist status, and full-bleed cinematic image.
2. Positioning statement: first and only formation focused on automation/macros for web designers.
3. Use-case grid with blurred/glowing cards for concrete automation examples.
4. Benefit block: "systems that work for you" with efficiency and monetization promises.
5. Before/after speed comparisons using task cards and short demo videos.
6. Tool explanation: Automa and Keyboard Maestro with cost framing.
7. Lead capture section with email field and CTA.
8. Bonus stack with repeated bonus cards.
9. Final CTA.
10. Instructor authority section and footer.

## Visual Language

- Background: near-black base with warm orange glow and subtle dotted/pixel texture.
- Hero: full-bleed image, not split layout. The product/person is visible immediately.
- Depth: glow behind the figure, blurred UI/cards in foreground, tiny workflow nodes in background.
- Typography: custom Sora font, heavy rounded geometric headings, light body text.
- Accent color: orange used for CTAs, highlights, underline scribbles, glow, and status dot.
- Secondary color: blue/violet used for selected emphasized words and tags.
- Cards: dark glassy cards over image-like thumbnails, often with soft blur and glow.
- Decorative marks: hand-drawn underline SVGs, dotted texture overlays, app icons.

## Motion and Interaction

### GSAP / JS stack

The page loads:
- `gsap@3.13.0`
- `ScrollTrigger`
- `SplitText`
- `Lenis@1.1.16`
- Elementor Pro / Elementor frontend scripts
- Happy Elementor Addons
- WP Rocket lazy loading

### Smooth scroll

Desktop only:
- Lenis is enabled when viewport width is above 1024px.
- Duration is set to `2`, creating a heavy, slow, cinematic scroll.
- Lenis scroll updates are connected to `ScrollTrigger.update`.
- GSAP ticker drives `lenis.raf(time * 1000)`.

Reference behavior:
- Use sparingly. This creates a premium feel, but can feel sluggish if the page needs fast scanning.
- For our page, consider a lighter duration like `1.0` to `1.3` if we use Lenis.

### Scroll reveal

The page adds `.scroll-bottom` to Elementor icon-list items and observes:
- `.scroll-left`
- `.scroll-right`
- `.scroll-bottom`
- `.scroll-top`

Behavior:
- On scroll/resize, elements become `.ativo` when their top reaches roughly 80 percent of viewport height plus a small threshold.
- The class is removed if the element leaves the trigger zone, so reveals can reverse.

Reference behavior:
- Simple, CSS-driven reveal system.
- Directional classes make content feel assembled while scrolling.
- For our brand, prefer one-time reveals unless repeated motion adds meaning.

### Pixel transition overlay

There is a full-screen `.pixels-overlay` used when opening and closing the form.

Behavior:
- JS creates 32 `.pixel` divs.
- GSAP sets opacity to `0`.
- Pixels fade in with random stagger.
- Callback opens/closes the form.
- Pixels fade back out with random stagger.
- While form is open, `html` and `body` receive `.rolagem-off` to disable scrolling.

Reference behavior:
- Strong branded transition for modal/form reveal.
- Makes a normal opt-in form feel like a product interaction.
- We can adapt this idea with cleaner red/navy pixel tiles or thin scanline blocks.

### Pixel canvas hover effect

The page defines a custom element:
- `<pixel-canvas data-gap="5" data-speed="100" data-colors="#F0F6FF, #8FA4FF, #9DACD2">`

Behavior:
- Each card gets an internal canvas grid.
- Pixels appear from the center outward on hover/focus.
- Pixels shimmer subtly once visible.
- Pixels disappear on mouseleave/focusout.
- Reduced motion disables speed.

Reference behavior:
- Excellent reusable effect for cards tied to automation/software.
- Could be adapted to our cards as a restrained hover detail, using red/blue/white token colors.

### Tab title attention effect

On browser blur, the page alternates the document title between two attention messages. On focus, it restores the original title.

Reference behavior:
- Useful for launches and checkout/lead capture.
- Optional; only use if it matches funnel strategy.

### Form submit feedback

On form submit:
- The form wrapper is hidden.
- A confirmation heading receives `.show`.

Reference behavior:
- Simple state swap.
- Good enough for a waitlist, but we should add accessible status handling in our implementation.

## CSS / Component Ideas To Borrow

- Full-bleed hero with text over media.
- One bold CTA plus small status indicator.
- Status dot with glow beside "inscrições encerradas" style text.
- Highlight spans inside body copy for conversion emphasis.
- Hand-drawn underline asset under key phrase.
- Cards that are mostly visual thumbnails, with copy appearing as caption/title.
- Repeated proof through concrete examples, not abstract benefit claims.
- Before/after time compression cards.
- Modal/form transition that feels like part of the product world.
- Hover pixel shimmer on cards.

## What Not To Copy Directly

- Dark orange/blue palette, because it conflicts with our red/navy/white design system.
- Heavy atmospheric hero if the final brand direction needs to stay clean and editorial.
- Excessive blur/glow on every section.
- Slow Lenis duration if the page becomes frustrating to navigate.
- Elementor-specific class structure.
- The exact copy structure and product framing.

## Translation For Our Landing Page

Use the reference as a motion and interaction library, not as a visual clone.

Recommended adaptations:
- Keep our clean white/near-white sections, then reserve dark cinematic treatment for one high-impact hero or proof/demo section.
- Use red for primary CTA and pixel transition accents.
- Use navy for trust/status frames, not blue-violet highlight words.
- Replace orange glow with subtle red accent or sharp navy shadows.
- Use pixel shimmer only on technical/product cards, not every card.
- Use scroll reveal with short fade/translate, aligned with our design-system timing.
- If using Lenis, keep it mild and desktop-only.

## Possible Implementation Ingredients

- `IntersectionObserver` for one-time scroll reveal.
- Optional `gsap` for modal pixel transition and staggered hero entrance.
- Optional `lenis` for desktop smooth scroll.
- Custom `<pixel-canvas>` element for card hover shimmer.
- CSS variables mapped to our brand tokens.
- `prefers-reduced-motion` support for every motion effect.
