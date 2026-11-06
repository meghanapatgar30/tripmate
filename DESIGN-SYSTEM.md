# TripMate — Official Brand Design System & UI Specifications

TripMate uses a bold, sophisticated, urban travel-tech brand identity inspired by premium transport brands, automotive interfaces, and editorial travel publications.

---

## 🎨 Official Brand Palette

| Color Name | Hex Code | Purpose & Usage |
|---|---|---|
| **Charcoal Grey** | `#2A2A2A` | Navigation bar, dark hero sections, footer, primary headings, dark surfaces |
| **Moonlit Silver** | `#C0C0C0` | Subtle borders, secondary text, dividers, neutral badges |
| **Signal Red** | `#E10600` | Primary CTA buttons, active navigation indicators, price highlights, key badges, status alerts |
| **Soft White** | `#F5F5F5` | Main page backgrounds (`bg-[#F5F5F5]`), card containers, content areas |

---

## 📐 Brand Design Rules

1. **Charcoal & Soft White Dominance:** Main background is `#F5F5F5`; dark hero & footer sections use Charcoal `#2A2A2A`.
2. **Selective Signal Red:** Signal Red (`#E10600`) is reserved for primary CTAs, active tab lines, price highlights, and key icons.
3. **Zero AI SaaS Clichés:** No gradients (no red-to-purple or blue gradients), no excessive glassmorphism, no generic teal/purple palettes.
4. **Clean Borders over Heavy Shadows:** Uses subtle silver borders (`border-zinc-300` / `#C0C0C0`) and light shadows (`shadow-2xs` / `shadow-xs`).
5. **Urban Typography:** High-contrast, bold uppercase tracking for subheadings, clean sans-serif font pairing (*Plus Jakarta Sans* & *Space Grotesk*).

---

## 🧩 Component Specifications

1. **Button System (`Button.tsx`)**
   - `Primary`: `bg-[#E10600] text-white hover:bg-[#C40500]`
   - `Secondary`: `bg-[#2A2A2A] text-white hover:bg-black`
   - `Outline`: `border border-[#C0C0C0] bg-white text-[#2A2A2A]`
   - `Ghost`: `text-[#2A2A2A] hover:bg-zinc-200`

2. **Cards (`Card.tsx`)**
   - White surface `bg-white`, rounded `rounded-2xl`, subtle silver border `border-zinc-300`, dark hover border `hover:border-[#2A2A2A]`.

3. **Badges (`Badge.tsx`)**
   - `Red`: `bg-red-50 text-[#E10600] border border-red-200`
   - `Charcoal`: `bg-[#2A2A2A] text-white`
   - `Silver`: `bg-zinc-100 text-[#2A2A2A] border border-zinc-300`
