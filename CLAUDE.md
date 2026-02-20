# CLAUDE.md — IslandBytes Web Theme Workflow

## Project Overview

**IslandBytes** is a static website with three core files:
- [index.html](index.html) — Landing page (`body.landing-page`)
- [support.html](support.html) — Support/contact page (`body.support-page`)
- [styles.css](styles.css) — All styles via CSS custom properties in `:root`
- [landing.js](landing.js) — Animations (counter, terminal typewriter)
- [script.js](script.js) — Support page interactions

Design tokens live in `:root` inside [styles.css](styles.css). Any theme change must start there.

---

## Theme Application Workflow

When the user provides a photo of a website to use as a design reference, follow this exact process:

### Step 0 — Confirm the reference image

Acknowledge the image and state what you can observe from it before making any changes. Never modify files based on guesswork. If the image is unclear in any area, say so explicitly.

### Step 1 — Extract design tokens from the photo

Analyze the reference image and document the following before touching any code:

| Token | What to extract |
|---|---|
| **Primary color** | Dominant brand/accent color (buttons, links, highlights) |
| **Secondary color** | Supporting accent or hover state color |
| **Background** | Page background — solid, gradient, or texture |
| **Surface color** | Card/panel background color |
| **Text colors** | Heading color, body text color, muted/secondary text |
| **Border / divider** | Border color, style, radius cues |
| **Typography** | Font family (serif/sans/mono), weight, size scale feel |
| **Spacing feel** | Compact vs. airy (affects padding/gap values) |
| **Button style** | Rounded vs. sharp, filled vs. outlined, shadow presence |
| **Shadow style** | Subtle/flat vs. strong/elevated |
| **Animation cues** | Does the reference feel static, subtle, or lively? |

Present these as a named extraction block, for example:

```
THEME EXTRACTION — [Reference site name or "Sample"]
Primary:        #2563eb
Secondary:      #7c3aed
Background:     #0f172a  (dark, solid)
Surface:        rgba(255,255,255,0.06)
Heading text:   #f8fafc
Body text:      #94a3b8
Border:         rgba(255,255,255,0.1), radius ~12px
Typography:     Sans-serif, medium weight headings
Spacing:        Airy — generous padding
Buttons:        Pill-shaped, filled primary, ghost secondary
Shadows:        Glow-style, color-matched
Animations:     Subtle fade/slide, no heavy motion
```

### Step 2 — Map extracted tokens to existing CSS variables

Show a mapping table before writing any code:

| CSS variable | Current value | New value | Reason |
|---|---|---|---|
| `--teal` | `#14b8a6` | `#2563eb` | Matches reference primary |
| `--teal-light` | `#2dd4bf` | `#3b82f6` | Lighter variant of primary |
| … | … | … | … |

Also note structural changes needed (e.g., background gradient direction, button border-radius, font-family swap).

### Step 3 — Apply changes (Iteration 1)

Make all CSS and HTML changes necessary to reflect the extracted theme. Keep changes minimal and focused:

1. Update `:root` CSS variables in [styles.css](styles.css)
2. Update `body.landing-page` and `body.support-page` background rules if needed
3. Update font `<link>` tags in [index.html](index.html) and [support.html](support.html) if the font family changes
4. Update any hardcoded color values that don't use variables (search for hex values in the CSS)
5. Adjust `border-radius`, `padding`, `box-shadow` patterns if the spacing/shape language differs significantly

After applying changes, explicitly state:
> **Iteration 1 complete.** Changes applied: [bullet list of what changed]

### Step 4 — Comparison Review (Iteration 1 → 2)

After Iteration 1, perform a structured comparison between the reference image and your applied changes. Go section by section:

```
COMPARISON — Iteration 1 vs. Reference
--------------------------------------------
Navigation bar:   [Match / Partial / Mismatch] — notes
Hero background:  [Match / Partial / Mismatch] — notes
Hero text:        [Match / Partial / Mismatch] — notes
Buttons:          [Match / Partial / Mismatch] — notes
Cards/panels:     [Match / Partial / Mismatch] — notes
Footer:           [Match / Partial / Mismatch] — notes
Typography feel:  [Match / Partial / Mismatch] — notes
Color temperature:[Match / Partial / Mismatch] — notes (warm/cool/neutral)
--------------------------------------------
GAPS IDENTIFIED: [list specific discrepancies to fix in Iteration 2]
```

### Step 5 — Apply refinements (Iteration 2)

Address every gap identified in the Iteration 1 comparison. Focus on:
- Color temperature corrections (e.g., a teal that reads too warm vs. the reference's cool blue)
- Spacing/rhythm adjustments (padding, gap, margin)
- Typography weight or size corrections
- Subtle detail fixes (border opacity, shadow spread, gradient angle)

After applying, state:
> **Iteration 2 complete.** Refinements applied: [bullet list]

### Step 6 — Final Comparison Review

Repeat the structured comparison table from Step 4. The goal is for all sections to read **Match** or **Partial with acceptable tradeoff**. If gaps remain:

- If they are fixable: proceed to Iteration 3
- If they are architectural (e.g., reference uses full-page video background that isn't practical): flag them as **deliberate deviations** and explain why

State clearly:
> **Final Review complete.** Theme fidelity: [High / Medium / Needs iteration 3]

---

## Rules & Constraints

- **Never remove content** — headlines, copy, links, and the logo stay intact
- **Never rename CSS classes** — only change property values, not selectors
- **Never inline styles** — all changes go through [styles.css](styles.css) or `:root` variables
- **Preserve accessibility** — maintain sufficient contrast ratios (WCAG AA minimum)
- **Preserve animations** — adapt animation colors to new palette but keep the motion logic in [landing.js](landing.js) untouched unless the reference clearly uses a static design
- **Google Fonts only** — if swapping fonts, choose from Google Fonts and update `<link>` tags in both HTML files
- **Mobile-first preserved** — do not remove or break the existing `@media` breakpoints at `768px` and `480px`

---

## File Reference

| File | Purpose | Theme-relevant sections |
|---|---|---|
| [styles.css](styles.css) | All styling | `:root` variables (lines 1–23), `body.landing-page` bg (line 132), `body.support-page` bg (line 136) |
| [index.html](index.html) | Landing page | Font `<link>` (line 11), body class (line 13) |
| [support.html](support.html) | Support page | Font `<link>`, body class |
| [landing.js](landing.js) | JS animations | Color strings only if hardcoded (check before editing) |

---

## How to Invoke This Workflow

Simply share a screenshot or image of the website whose theme you want to apply, and say something like:

> "Apply this website's theme to IslandBytes."

Claude will automatically follow Steps 0–6 above, completing at least two full iterations with structured comparison reviews before declaring the theme applied.
