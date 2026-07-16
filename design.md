# NITT Innovation Challenge — Design System

> Design system extracted and adapted from [eloqwnt.com](https://eloqwnt.com) for the Institute Innovation Council, NIT Trichy.  
> Version 1.0 · July 2026

---

## 1. Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Clarity First** | Every element serves a purpose. No decorative clutter. |
| **Generous Whitespace** | Breathing room between sections creates visual hierarchy. |
| **Subtle Motion** | Scroll-triggered reveals and micro-interactions add life without distraction. |
| **Typographic Hierarchy** | Three-font system with clear roles. |
| **Institutional Trust** | NITT branding + clean design = credibility. |

---

## 2. Color Palette

### Core Colors

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ⬜ | White | `#ffffff` | Hero background, cards |
| 🟫 | Warm Gray | `#f2f0ed` | Alternating section backgrounds |
| 🟫 | Light Warm | `#f8f7f5` | Form backgrounds, subtle tints |
| ⬛ | Near Black | `#0a0a0a` | Footer, dark sections |
| ⬛ | Text Primary | `#111111` | Headings, body text |
| 🔘 | Text Secondary | `#555555` | Descriptions, labels |
| 🔘 | Text Muted | `#999999` | Placeholders, timestamps |

### Accent Colors (NITT Identity)

| Swatch | Name | Hex | HSL | Usage |
|--------|------|-----|-----|-------|
| 🔵 | NITT Navy | `#1a237e` | `234, 66%, 30%` | Buttons, links, accents |
| 🔵 | Navy Light | `#3949ab` | `231, 47%, 45%` | Hover states |
| 🔵 | Navy Subtle | `#e8eaf6` | `232, 57%, 94%` | Form focus rings, badges |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#16a34a` | Form success, valid states |
| Error | `#dc2626` | Validation errors |
| Warning | `#f59e0b` | Deadline warnings |

---

## 3. Typography

### Font Stack

| Role | Font Family | Weight Range | Usage |
|------|-------------|--------------|-------|
| **Display** | Josefin Sans | 200–700 | Hero titles, section headings, large display text |
| **Body** | Montserrat | 300–700 | Paragraphs, form labels, general body text |
| **UI** | Roboto Condensed | 400–700 | Navigation, buttons, labels, badges, small text |
| **Serif Accent** | Times New Roman | 400 | Quotes, emphasis text, tagline accents |

### Type Scale (Fluid)

```css
--fs-hero:    clamp(2.5rem, 5vw + 1rem, 5rem);      /* Hero heading */
--fs-h1:      clamp(2rem, 3.5vw + 0.5rem, 3.5rem);   /* Section titles */
--fs-h2:      clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem); /* Subsection titles */
--fs-h3:      clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem);/* Card titles */
--fs-body:    clamp(0.95rem, 0.9vw + 0.3rem, 1.125rem);/* Body text */
--fs-small:   clamp(0.8rem, 0.7vw + 0.3rem, 0.875rem); /* Labels, captions */
--fs-xs:      0.75rem;                                  /* Fine print */
```

### Line Heights

| Size | Line Height |
|------|-------------|
| Display | `1.1` |
| Heading | `1.2` |
| Body | `1.7` |
| Small | `1.5` |

### Letter Spacing

| Context | Value |
|---------|-------|
| Section labels | `0.15em` (uppercase) |
| Nav links | `0.05em` |
| Body text | `0` (normal) |
| Headings | `-0.02em` |

---

## 4. Spacing System

8px base grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-1` | `0.25rem` (4px) | Inline element gaps |
| `--sp-2` | `0.5rem` (8px) | Icon gaps, tight padding |
| `--sp-3` | `0.75rem` (12px) | Button padding-y |
| `--sp-4` | `1rem` (16px) | Default gap, form spacing |
| `--sp-6` | `1.5rem` (24px) | Card padding |
| `--sp-8` | `2rem` (32px) | Section content gap |
| `--sp-12` | `3rem` (48px) | Between components |
| `--sp-16` | `4rem` (64px) | Section padding-y (mobile) |
| `--sp-24` | `6rem` (96px) | Section padding-y (desktop) |
| `--sp-32` | `8rem` (128px) | Hero padding |

---

## 5. Layout

### Container

```css
max-width: 1200px;
margin: 0 auto;
padding: 0 clamp(1.5rem, 5vw, 4rem);
```

### Breakpoints

| Name | Min-Width | Usage |
|------|-----------|-------|
| Mobile | `0px` | Default (mobile-first) |
| Tablet | `768px` | Two-column layouts |
| Desktop | `1024px` | Full layouts |
| Wide | `1440px` | Max container width |

### Grid

- Form: Single column (mobile) → Two columns (tablet+)
- Timeline: Vertical flow with left-aligned indicators
- Cards: `repeat(auto-fit, minmax(280px, 1fr))`

---

## 6. Components

### 6.1 Section Header (Dot Indicator)

Inspired by eloqwnt's `• Section Name` pattern:

```
● About the Programme
```

- 8px filled circle (`var(--accent)`)
- Uppercase label, Roboto Condensed 600, letter-spacing 0.15em
- Font size: `var(--fs-small)`

### 6.2 Buttons

**Primary Button (Dark)**
- Background: `var(--black)`
- Text: `var(--white)`, Roboto Condensed 600
- Padding: `0.875rem 2rem`
- Border-radius: `50px`
- Hover: Slide-up fill animation, background → `var(--accent)`

**Secondary Button (Outline)**
- Border: `2px solid var(--black)`
- Background: transparent
- Hover: Background fills with `var(--black)`, text turns white

### 6.3 Form Inputs

- Background: `var(--white)`
- Border: `1px solid #ddd`
- Border-radius: `8px`
- Padding: `0.875rem 1rem`
- Focus: `border-color: var(--accent)`, `box-shadow: 0 0 0 3px var(--accent-subtle)`
- Font: Montserrat 400
- Transition: `all 0.3s ease`

### 6.4 Cards

- Background: `var(--white)`
- Border-radius: `16px`
- Padding: `var(--sp-6)`
- Box-shadow: `0 1px 3px rgba(0,0,0,0.06)`
- Hover: `box-shadow: 0 8px 30px rgba(0,0,0,0.08)`, `transform: translateY(-2px)`

### 6.5 Infinite Marquee Strip

- Full-width band, background: `var(--black)`, text: `var(--white)`
- CSS animation: `translateX` loop
- Duration: `30s linear infinite`
- Content repeats 10× for seamless loop
- Font: Roboto Condensed 500, uppercase, letter-spacing 0.15em

---

## 7. Animation Specifications

### Scroll Reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- **Trigger**: IntersectionObserver with `threshold: 0.15`
- **Stagger**: Children delay by `0.1s` each via CSS `transition-delay`

### Hover Underline

```css
.hover-line {
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}
:hover .hover-line {
  width: 100%;
}
```

### Smooth Scroll

```css
html {
  scroll-behavior: smooth;
}
```

### Button Hover

- Scale: `1.02`
- Background transition: `0.3s ease`
- Optional: Subtle box-shadow glow

### Marquee

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 8. Responsive Behavior

| Element | Mobile (<768px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|
| Hero heading | `2.5rem` | `5rem` |
| Section padding | `4rem 0` | `6rem 0` |
| Nav | Hamburger menu | Horizontal links |
| Form grid | 1 column | 2 columns |
| Timeline | Left-aligned | Left-aligned with larger markers |
| Marquee | Smaller text | Standard |
| Buttons | Full width | Auto width |

---

## 9. Accessibility

- Color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text)
- All interactive elements have `:focus-visible` outlines
- Form inputs have associated `<label>` elements
- Semantic HTML5 elements throughout
- `prefers-reduced-motion` media query disables animations
- Proper heading hierarchy (single H1, sequential H2/H3)
- ARIA labels on icon-only elements

---

## 10. Page Structure

```
┌─────────────────────────────────────┐
│  NAVBAR (Logo + Links + CTA)        │
├─────────────────────────────────────┤
│  HERO (Fullscreen)                  │
│  Title + Tagline + Scroll Arrow     │
├─────────────────────────────────────┤
│  MARQUEE STRIP (Infinite scroll)    │
├─────────────────────────────────────┤
│  ABOUT (Programme Introduction)     │
│  bg: warm gray                      │
├─────────────────────────────────────┤
│  PROBLEM (Alumni Disconnect)        │
│  bg: white                          │
├─────────────────────────────────────┤
│  DETAILS & ELIGIBILITY              │
│  bg: warm gray                      │
├─────────────────────────────────────┤
│  TIMELINE (Key Dates)               │
│  bg: white                          │
├─────────────────────────────────────┤
│  REGISTRATION FORM (Alumni Survey)  │
│  bg: warm gray                      │
├─────────────────────────────────────┤
│  CONTACT + FOOTER                   │
│  bg: near black                     │
└─────────────────────────────────────┘
```

---

## 11. Assets

| Asset | Source | Format |
|-------|--------|--------|
| NIT Trichy Logo | Official NITT emblem | SVG / PNG |
| IIC Logo | Ministry of Education IIC | PNG |
| Icons | Inline SVGs | SVG |

---

*Document created for the NITT Innovation Challenge · IIC, NIT Trichy · July 2026*
