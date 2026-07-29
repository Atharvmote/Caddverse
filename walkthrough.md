# CADDverse Techlabs Upgrade Walkthrough

I have successfully updated the typography, copy, layout, and visual elements of the CADDverse Techlabs portal.

## Key Upgrades Implemented

### 1. Reshuffled Header Navigation
- Reordered the menu options inside `Header.tsx` to: **Home, About Us, Courses, Training, Our Journey**.
- Mapped the **Training** option directly to the `#upskilling` anchor section on the home page so clicking it scrolls to the upskilling segment.
- Placed the **Inquire Now** button as a premium CTA on the far right.

### 2. Apple/Microsoft-Grade Typography
- Integrated **Plus Jakarta Sans** and **Inter** font systems globally.
- Set heading tracking to Apple's signature tight tracking (`letter-spacing: -0.025em`) with subpixel antialiasing.

### 3. Custom Centered Section Underlines (60% width)
- Removed all manual horizontal divider lines globally.
- Styled `.section-title` with a custom centered bottom underline via the `::after` pseudo-element:
  - Width: **60%** (leaves **20% spacing** on both the left and right sides).
  - Perfect dynamic fit that centers automatically beneath any title length.

### 4. Translucent Blueprint Waves
- Removed the heavy, opaque solid navy/blue color block shape from the bottom-right corner of the Hero section.
- Replaced it with **4 concentric translucent vector curves** (solid, dashed, thin, and dotted) and a soft blue gradient glow (`stopOpacity="0.35"` to `0`) that integrates with the CAD blueprint grid background.

---

## Verification Screenshots

Here is the updated Why Choose section showing the custom centered title underline and new typography:

![Centered Underline & Apple Typography](file:///C:/Users/HOME/.gemini/antigravity-ide/brain/e3185b55-dbec-4070-a19c-6a0164467167/why_choose_heading_underline_1784659945442.png)

Here is the updated corner curves visual showing the transparent, blueprint curves matching the CAD theme:

![Transparent Blueprint Curve Waves](file:///C:/Users/HOME/.gemini/antigravity-ide/brain/e3185b55-dbec-4070-a19c-6a0164467167/hero_section_curves_1784659902478.png)
