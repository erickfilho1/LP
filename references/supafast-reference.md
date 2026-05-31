# Reference: Supafast

Source: https://withsupafast.com/
Captured on: 2026-05-28

Screenshots:
- `references/screenshots/supafast-desktop-top.png`
- `references/screenshots/supafast-mobile-top.png`
- `references/screenshots/supafast-full.pdf`

Raw captures:
- `references/supafast-dom.html`
- `references/supafast-source.html`

Important note:
- This is a reference extraction only. Do not merge these tokens into our brand design system automatically.
- Treat this as the favorite structural reference for menu, buttons, section rhythm, cards, interactions, and motion direction.

## Overall Impression

Supafast is a premium dark B2B SaaS / AI agency landing page. It feels fast, confident, technical, and conversion-oriented without looking overloaded. The core design move is simple: black canvas, white typography, acid-yellow CTA, pill navigation, oversized cards, and a horizontal proof strip immediately after the hero.

This page is a strong reference because the quality comes from system discipline rather than visual noise. The hierarchy is very clear, the menu is compact, the hero copy is direct, the CTA is unmistakable, and the sections use repeatable card patterns that would translate well into our own landing page later.

## Page Structure

1. Floating capsule navigation with logo, anchor links, and compact CTA.
2. Hero with mono/eyebrow label, large pain-driven headline, support copy, and yellow CTA.
3. Horizontal portfolio screenshot rail directly under the hero.
4. Logo/social-proof row with SaaS and AI companies.
5. Problem framing section: "Sound Familiar?"
6. Before/After comparison cards with warning and success icon systems.
7. Service section: "Everything that ships with your site".
8. Service cards for website/landing page, growth assets, and development.
9. Founder/client testimonial area with video and text proof.
10. Trust section: "Trusted by SaaS & technical companies".
11. FAQ section: "Questions founders ask us".
12. Selected work / portfolio section.
13. Founder/about section: "Who's behind Supafast?"
14. Final CTA: book intro call.
15. Content/social footer.

## Technical Stack

The page appears to use:
- Framer
- Framer runtime modules
- Motion module: `motion.C1G5WL4y.mjs`
- Slideshow module: `SlideShow.WSXwkths.mjs`
- Smooth scroll module: `SmoothScroll_Prod.0LshCCuV.mjs`
- Typeform module
- Cal.com embed: `https://app.cal.com/embed/embed.js`
- PostHog
- Facebook Pixel

No direct GSAP dependency was found in the rendered DOM or source capture. The motion language appears to be Framer/Motion-based rather than GSAP-based.

Rendered DOM signal counts:
- `framer`: 10314
- `transform`: 639
- `scroll`: 28
- `lenis`: 11
- `animation`: 5
- `motion`: 1
- `sticky`: 1

## Design DNA

### Design Type

Category:
- Premium dark SaaS agency landing page
- Founder-focused conversion page
- Technical B2B product marketing
- Fast-build landing page service

Visual keywords:
- Sharp
- Fast
- Confident
- Editorial
- Technical
- Compact
- High contrast
- Proof-heavy

### Color Tokens Observed

Core:
- `#000000` / `oklch(0.00% 0.0000 0.0)` - main black background
- `#0C0C0B` / `oklch(15.39% 0.0021 106.6)` - near-black panel background
- `#FFFFFF` / `oklch(100.00% 0.0000 89.9)` - primary text
- `rgba(255,255,255,0.64)` / `#FFFFFFA3` - muted body copy
- `#313131` / `oklch(31.32% 0.0000 89.9)` - dark border / secondary surface

Accent:
- `#FBE64D` / `oklch(91.59% 0.1665 101.3)` - primary yellow CTA
- `#63CC79` / `oklch(76.21% 0.1532 148.6)` - success / after state
- `#EF8869` / `oklch(73.15% 0.1338 37.5)` - warning / before state
- `#FB2C36` / `oklch(63.78% 0.2373 25.4)` - red emphasis
- `#7D5DFF` / `oklch(60.14% 0.2287 286.4)` - purple accent
- `#EA6DF8` / `oklch(73.44% 0.2249 323.5)` - pink/purple accent
- `#ECEADD` / `oklch(93.51% 0.0174 99.6)` - warm off-white

Surface language:
- Navigation and cards use black/dark surfaces with thin translucent white borders.
- CTA uses a saturated yellow fill rather than gradient.
- Status cards use semantic color: orange for friction, green for desired state.
- White is used sparingly and mostly for text, logos, and high-contrast UI details.

### Typography

Fonts detected:
- `DM Sans` - primary interface and marketing font
- `Fragment Mono` - likely eyebrow labels, tiny technical labels, and microcopy
- `Inter` - loaded as a secondary/supporting font
- `Apfel Grotezk` - custom loaded font, likely used in selected components or legacy Framer styles

Observed type scale:
- Hero H1: `72px` desktop, `52px` tablet, `36px` mobile
- H2: `57px` desktop, `42px` tablet, `30px` mobile
- H3: `46px` desktop
- H4: `37px` desktop, `28px` tablet, `22px` mobile
- H5: `24px` desktop, `20px` mobile
- H6: `23px` desktop, `20px` tablet, `18px` mobile
- Body large: `18px` desktop, `17px` tablet, `16px` mobile
- Body default: `16px` desktop, `15px` tablet, `14px` mobile
- Button text: `18px` desktop, down to `14px` mobile
- Large CTA text: `22px` desktop, down to `16px` mobile

Typography behavior:
- Main headings use `font-weight: 700`, with bold weight available at `900`.
- Headings use tight tracking around `-0.04em`.
- Hero and section titles use `text-wrap: balance`.
- Body copy uses comfortable line height: `1.5em` to `1.55em`.
- The page avoids overdecorated typography; confidence comes from size, weight, and contrast.

## Layout and Spacing

Observed spacing rhythm:
- Section padding commonly uses `96px 0`, `80px 0`, `64px 0`, and `40px 0`.
- Responsive horizontal padding commonly uses `24px`, `16px`, and `40px`.
- Common card/content gaps: `8px`, `10px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`, `82px`.
- Hero layout is vertically compact enough to show proof assets before the user scrolls far.

Recommended translation for our LP:
- Use `96px` for major desktop section rhythm.
- Use `64px` for medium sections or repeated proof blocks.
- Use `24px` card internal spacing as a default.
- Use `48px` for big card padding when the section needs premium weight.
- Use `16px` horizontal padding on mobile and `24px` to `40px` on tablet.

## Radius and Shape Language

Observed radii:
- `360px` - pill links/buttons
- `88px`, `60px`, `48px`, `44px`, `40px`, `34px`, `30px` - large capsules and hero/card shells
- `24px`, `16px`, `12px`, `8px` - cards, images, small UI elements

Design meaning:
- Navigation and CTAs are very pill-shaped.
- Cards are rounded but not toy-like.
- Images and portfolio screenshots use enough radius to feel designed, but still rectangular and product-oriented.
- The whole system is "soft technical": polished, rounded, but still sharp due to black/yellow contrast.

## Navigation

Desktop:
- Floating pill nav near the top center.
- Black/dark capsule with subtle border.
- Logo on the left.
- Anchor links in the middle: Services, Testimonials, FAQs, Work.
- CTA on the right: `Book a Call`.
- Link hover style uses a translucent white background, rounded `360px`, and a `0.2s` transition.

Mobile:
- Navigation collapses into a compact black capsule.
- Logo remains visible.
- Menu content is heavily reduced/cropped, which keeps the hero clean.

Reference behavior:
- Keep nav minimal.
- Use nav as a conversion strip, not a full website menu.
- The menu should feel like a product UI component floating over the page.

## Buttons and CTAs

Primary CTA:
- Yellow pill button.
- Strong contrast against black background.
- Uses icon support, including lightning-style energy.
- Copy example: `Let's fix your page`.
- Large enough to feel like the main action, but not bloated.

Secondary CTA:
- Small nav CTA: `Book a Call`.
- White/dark pill treatment.
- Less visually loud than the hero CTA.

Interaction language:
- Pills transition background/color/radius in about `0.2s`.
- Hover is clean and fast, not bouncy.
- CTA affordance comes from contrast and shape more than animation.

For our LP:
- Use one unmistakable primary CTA color.
- Keep CTA copy action-oriented and specific.
- Add a small icon only if it reinforces speed, clarity, or action.
- Avoid multiple competing CTA colors.

## Cards

Card system:
- Large dark rounded cards with thin translucent borders.
- Comparison cards use clear semantic contrast:
  - Before: warm/orange warning icons and friction copy.
  - After: green success/lightning icons and outcome copy.
- Service cards are simple, modular, and named by outcome.
- Testimonial cards mix media, quote, and authority.

Important detail:
- The cards do not rely on complicated decoration. They rely on:
  - Strong title hierarchy.
  - Tight icon systems.
  - Consistent padding.
  - Clear before/after narrative.
  - Enough negative space to make each claim feel expensive.

For our LP:
- Use comparison cards early if the offer has a "current painful state vs desired outcome" angle.
- Use card grids for services, deliverables, proof, and FAQ summaries.
- Keep icon colors semantic instead of decorative.

## Motion and Interaction

Observed motion direction:
- Smooth scroll behavior from Framer/SmoothScroll module.
- Horizontal portfolio strip under hero.
- Slideshow/carousel module loaded.
- Many transform declarations, indicating Framer-managed movement/layout transforms.
- Likely entrance reveals and scroll-linked transforms rather than complex timeline animation.

Motion personality:
- Fast but controlled.
- Product-gallery motion gives immediate proof.
- Components feel like they slide/reveal into place rather than explode or bounce.
- The motion supports clarity and proof; it does not become the main show.

Recommended motion translation:
- Use smooth scroll carefully only if performance stays clean.
- Use subtle reveal animations on section titles/cards.
- Use a horizontal proof rail after the hero.
- Use hover states on buttons/cards with small translate or border/brightness change.
- Avoid heavy 3D, particle systems, or gratuitous parallax for this reference direction.

## Section Patterns Worth Reusing

### Hero Pattern

Structure:
- Eyebrow: audience/category.
- H1: pain-led, direct, conversational.
- Paragraph: explain what changes and timeline.
- CTA: one clear next step.
- Proof strip: product/project screenshots immediately below.

Why it works:
- The user understands the problem before the offer.
- The CTA appears before any complex explanation.
- The portfolio strip provides visual proof before trust logos.

### Before / After Pattern

Structure:
- Section title: `Sound Familiar?`
- Card 1: current broken state.
- Card 2: transformed desired state.

Why it works:
- It converts objections into a visual story.
- The prospect sees themselves in the "before" card.
- The "after" card makes the value tangible without needing long copy.

### Deliverables Pattern

Structure:
- Strong section title.
- 3 service/deliverable cards.
- Each card is named by buyer value, not internal production task.

Why it works:
- It keeps offer scope clear.
- It avoids a generic "services" section.
- It feels productized and fast.

### FAQ Pattern

Structure:
- Founder-relevant questions.
- Clean stacked accordions/cards.
- Questions are practical, not filler.

FAQ examples observed:
- `How fast can you ship a page?`
- `Do you only work with SaaS companies?`
- `Can you work with my existing design/dev team?`
- `Do you write the copy too?`
- `What if I need more than one page?`

## Implementation Notes for Our Future LP

Use Supafast as a structural north star, not as a visual clone.

What to borrow:
- Floating capsule nav.
- One powerful primary CTA color.
- Pain-led hero.
- Portfolio/proof rail immediately after hero.
- Before/after comparison.
- Productized deliverable cards.
- Tight FAQ.
- Founder/about block near the end.
- Final booking CTA.

What not to copy literally:
- Exact copy.
- Exact color palette unless our brand direction asks for it.
- Exact screenshots, logos, or client proof.
- Framer-specific class structure.

Engineering direction:
- If building in React/Next later, this can be implemented with CSS variables, componentized sections, and a small animation layer.
- GSAP is optional; the Supafast reference does not require it.
- For a similar feel, use CSS transitions plus a motion library or GSAP only for scroll rail/reveal polish.
- Keep motion progressive-enhancement friendly so the LP remains fast.

## Favorite Reference Verdict

This should be marked as the favorite reference for:
- Overall landing page structure
- Navigation behavior
- CTA system
- Card rhythm
- SaaS/AI agency positioning
- High-conversion section order
- Motion restraint

It is less useful as a color system if our brand wants a different emotional territory, but extremely useful as a page architecture and interaction benchmark.
