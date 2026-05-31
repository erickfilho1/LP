# Design System Reference

This file is the local reference for the landing page brand rules.

## Visual direction

- Style: minimalist and clean
- Tone: serious, confident, energetic without feeling cold
- Use whitespace as part of the design
- Prefer purposeful graphics over decoration

## Color tokens

```css
:root {
  --color-red: #FF0F33;
  --color-blue: #012871;
  --color-dark: #0D0D0D;
  --color-bg: #FAFAFA;
  --color-white: #FFFFFF;

  --color-gray-100: #F5F5F5;
  --color-gray-200: #E0E0E0;
  --color-gray-400: #9E9E9E;
  --color-gray-600: #6E6E6E;
  --color-gray-800: #2E2E2E;

  --color-red-light: #FFD6DC;
  --color-red-mid: #FF6B80;
  --color-red-dark: #7A0017;

  --color-blue-light: #D0D9F0;
  --color-blue-mid: #2B54A8;
  --color-blue-dark: #00153A;
}
```

## Color usage

- Use red for primary CTAs, accent lines, standout tags, and key highlights.
- Use blue for secondary actions, trust elements, and selected borders or links.
- Use dark for headings and core text.
- Use `#FAFAFA` or white for main backgrounds.
- Do not combine red and blue in the same interactive element.
- Do not use purple, teal, or orange as accents.

## Typography

Import fonts before any UI work:

```css
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&family=Roboto+Flex:opsz,wght@8..144,300;8..144,400;8..144,500;8..144,700&display=swap');
```

```css
:root {
  --font-display: 'Raleway', sans-serif;
  --font-body: 'Roboto Flex', sans-serif;
}
```

## Type scale

- H1: Raleway 800, 56px to 72px, letter-spacing `-0.03em`, line-height `1`
- H2: Raleway 700, 36px to 48px, letter-spacing `-0.02em`, line-height `1.1`
- H3: Raleway 600, 24px to 32px, letter-spacing `-0.01em`, line-height `1.2`
- H4: Raleway 600, 18px to 22px, line-height `1.3`
- Eyebrow: Raleway 700, 12px to 13px, uppercase, letter-spacing `0.08em` to `0.12em`
- Body large: Roboto Flex 400, 18px, line-height `1.75`
- Body default: Roboto Flex 400, 16px, line-height `1.65`
- Small: Roboto Flex 400, 13px, line-height `1.55`
- Buttons: Raleway 700, 13px to 14px, uppercase, letter-spacing `0.06em`

## Spacing

- Base unit: 8px
- Use multiples of 8 whenever possible
- Key vertical paddings: 80px for hero breathing room, 120px for large desktop sections

## Layout

- 12-column grid
- 24px column gap
- 1280px max width
- 48px desktop side padding
- 24px mobile side padding
- Prefer 5/7, 4/8, 6/6, or 3/9 compositions
- Avoid centering every section; asymmetry is welcome when intentional

## Components

- Buttons: small radius, uppercase, strong letter spacing
- Cards: white background, subtle border, very light hover lift when interactive
- Accent line: 32px by 3px red bar before important titles
- Tags: compact, uppercase, minimal radius

## Motion

- Use fade plus translate for entrances
- Brand easing: `cubic-bezier(0.23, 1, 0.32, 1)`
- UI motion up to 300ms
- Hero motion up to 600ms
- Stagger grids and lists by 80ms
- Use IntersectionObserver with threshold `0.15` and reveal only once
- Never use `transition: all`

## Avoid

- Primary gradient backgrounds
- Heavy shadows
- Border radius above 8px
- Generic fonts like Inter or Arial
- Symmetrical, over-centered layouts everywhere
- Decorative icons without purpose
- Looping animations without user intent
