# 🎨 skele.t0l Music Portfolio - Figma Design System

## Complete Design Specifications for Implementation

---

## 🎨 COLOR PALETTE

### Primary Colors (Monochrome Base)
```
Pure Black     #000000  RGB(0, 0, 0)
Very Dark Gray #0A0A0A  RGB(10, 10, 10)
Dark Gray      #1A1A1A  RGB(26, 26, 26)
```

### Neutral Grays
```
Border Dark    #202020  RGB(32, 32, 32)
Border Mid     #303030  RGB(48, 48, 48)
Border Light   #404040  RGB(64, 64, 64)
Text Dark      #505050  RGB(80, 80, 80)
Text Mid       #606060  RGB(96, 96, 96)
Gray           #808080  RGB(128, 128, 128)
Light Gray     #A0A0A0  RGB(160, 160, 160)
Lighter Gray   #C0C0C0  RGB(192, 192, 192)
Very Light     #E0E0E0  RGB(224, 224, 224)
Pure White     #FFFFFF  RGB(255, 255, 255)
```

### Pastel Accents (Strategic Use)
```
Wisteria       #C5B4E3  RGB(197, 180, 227)  - Air/Mental/Leo
Blush Pink     #E8B4D9  RGB(232, 180, 217)  - Fire/Creative
Sage Mint      #B4D9C5  RGB(180, 217, 197)  - Earth/Grounded
Periwinkle     #B4C5E3  RGB(180, 197, 227)  - Water/Emotional
```

### Pastel Usage Map
- **Wisteria (#C5B4E3)**: Mars Node card, "locus" text, primary gradients
- **Blush Pink (#E8B4D9)**: Leo Node card, play button gradient
- **Sage Mint (#B4D9C5)**: Saturn Node card, release cards
- **Periwinkle (#B4C5E3)**: Scroll indicator, footer social links

---

## 📝 TYPOGRAPHY

### Font Families
```
Primary (Headings/UI):  'Space Mono', monospace
Secondary (Body):       'Georgia', serif
Weight Options:         400 (Regular), 700 (Bold)
```

### Type Scale

**H1 - Artist Name**
```
Font: Space Mono Bold
Size: 96px (desktop) → 48px (mobile) - clamp(3rem, 8vw, 6rem)
Weight: 700
Color: #FFFFFF
Letter Spacing: 0.1em (10% tracking)
Line Height: 1.1
Text Shadow: 0 0 40px rgba(197, 180, 227, 0.2)
```

**H2 - Section Titles**
```
Font: Space Mono Bold
Size: 56px (desktop) → 32px (mobile) - clamp(2rem, 5vw, 3.5rem)
Weight: 700
Color: #FFFFFF
Letter Spacing: 0.05em (5% tracking)
Line Height: 1.2
```

**H3 - Card Titles**
```
Font: Space Mono Regular
Size: 21px
Weight: 400
Color: #FFFFFF (or pastel accent on hover)
Letter Spacing: 0.05em
Line Height: 1.3
```

**Subtitle/Label**
```
Font: Space Mono Regular
Size: 14px
Weight: 400
Color: #808080
Letter Spacing: 0.3em (30% tracking) - ALL CAPS
Line Height: 1.4
Transform: uppercase
```

**Body Large**
```
Font: Georgia Regular
Size: 18px
Weight: 400
Color: #C0C0C0
Style: Italic
Line Height: 1.8
```

**Body Regular**
```
Font: Georgia Regular
Size: 16px
Weight: 400
Color: #A0A0A0
Line Height: 1.8
```

**Body Small**
```
Font: Georgia Regular
Size: 15px
Weight: 400
Color: #C0C0C0
Line Height: 1.7
```

**Metadata**
```
Font: Space Mono Regular
Size: 14px
Weight: 400
Color: #808080
Letter Spacing: 0.2em
Line Height: 1.5
```

**NEW Tagline**
```
Font: Space Mono Regular
Size: 14px
Weight: 400
Color: #A0A0A0
Letter Spacing: 0.4em
Line Height: 1.5

Special: "locus" section
Size: 12px
Color: #C5B4E3
Letter Spacing: 0.6em
Weight: 400
```

---

## 🎯 SPACING SYSTEM

### Spacing Scale (8px base)
```
XXS: 4px    (0.25rem)
XS:  8px    (0.5rem)
S:   16px   (1rem)
M:   24px   (1.5rem)
L:   32px   (2rem)
XL:  48px   (3rem)
XXL: 64px   (4rem)
XXXL: 96px  (6rem)
```

### Component Spacing
```
Section Padding (Vertical):   96px (6rem)
Section Padding (Horizontal): 32px (2rem)
Card Padding:                 32px (2rem)
Button Padding:               16px 40px (1rem 2.5rem)
Grid Gap:                     32px (2rem)
Element Margin Bottom:        16px (1rem)
Paragraph Spacing:            24px (1.5rem)
```

---

## 📦 COMPONENTS

### 1. Hero Frame
```
Type: Decorative Border
Position: Fixed inset
Top/Right/Bottom/Left: 40px
Border: 1px solid #303030
Border Radius: 4px
Corner Dots:
  - Size: 8px × 8px
  - Border Radius: 50% (circle)
  - Colors: TL: #C5B4E3, TR: #E8B4D9, BL: #B4D9C5, BR: #B4C5E3
  - Opacity: 0.6
  - Box Shadow: 0 0 10px [dot color]
  - Position: 10px from frame edge
```

### 2. Primary Button (CTA)
```
Background: Linear gradient 135deg, #C5B4E3 → #E8B4D9
Border: none
Border Radius: 6px
Padding: 16px 40px (1rem 2.5rem)
Font: Space Mono Bold, 16px
Color: #000000
Letter Spacing: 0.05em
Cursor: pointer

Hover State:
  Transform: scale(1.05)
  Box Shadow: 0 0 30px rgba(197, 180, 227, 0.5)
  
Active State:
  Transform: scale(0.95)
```

### 3. Secondary Button (Outline)
```
Background: transparent
Border: 2px solid #FFFFFF
Border Radius: 6px
Padding: 16px 40px
Font: Space Mono Regular, 16px
Color: #FFFFFF
Letter Spacing: 0.05em

Hover State:
  Transform: scale(1.05)
  Border Color: #C5B4E3
  Color: #C5B4E3
  
Active State:
  Transform: scale(0.95)
```

### 4. Card - Node Card
```
Background: #0A0A0A
Border: 2px solid #303030
Border Radius: 8px
Padding: 32px
Backdrop Filter: blur(10px)

Hover State:
  Border Color: [pastel accent - #E8B4D9, #C5B4E3, or #B4D9C5]
  Box Shadow: 0 0 30px [accent]40 (25% opacity)
  
Icon:
  Size: 48px (3rem)
  Margin Bottom: 16px
  Filter: drop-shadow on hover with accent color
  
Title:
  Color transitions to accent on hover
```

### 5. Card - Release Card
```
Background: #0A0A0A
Border: 2px solid #303030
Border Radius: 8px
Padding: 32px
Cursor: pointer

Album Art Container:
  Aspect Ratio: 1:1
  Background: gradient with pastel tint
  Border: 1px solid #303030
  Border Radius: 6px
  Margin Bottom: 24px
  
Hover State:
  Border Color: [pastel accent]
  Box Shadow: 0 0 30px [accent]40
  Album Art: scale(1.05)
  Border of album art: accent color
```

### 6. Audio Player
```
Background: #0A0A0A
Border: 2px solid #303030
Border Radius: 12px
Padding: 32px
Max Width: 500px

Album Art:
  Aspect Ratio: 1:1
  Background: gradient #1A1A1A → #0A0A0A
  Border: 1px solid #303030
  Rotating Circles:
    - Outer: 2px solid rgba(197, 180, 227, 0.4), 80% size
    - Inner: 2px solid rgba(232, 180, 217, 0.3), 60% size
    - Animation: rotate 360deg, 20s linear infinite
    
Progress Bar:
  Height: 4px
  Background: #202020
  Fill: Linear gradient 90deg, #C5B4E3 → #E8B4D9 → #B4C5E3
  Border Radius: 2px
  
Play Button:
  Size: 60px × 60px
  Background: Linear gradient 135deg, #C5B4E3 → #E8B4D9
  Border: none
  Border Radius: 50%
  Color: #000000
  Box Shadow: 0 0 20px rgba(197, 180, 227, 0.3)
  
  Hover:
    Scale: 1.1
    Box Shadow: 0 0 30px rgba(197, 180, 227, 0.5)
```

### 7. Streaming Link Button
```
Background: #0A0A0A
Border: 1px solid #404040
Border Radius: 6px
Padding: 12px 24px (0.75rem 1.5rem)
Font: Space Mono Regular, 14px
Color: #FFFFFF

Hover (Platform Specific Colors):
  Spotify:     Border #C5B4E3, Shadow 0 0 20px rgba(197, 180, 227, 0.25)
  Apple Music: Border #E8B4D9, Shadow 0 0 20px rgba(232, 180, 217, 0.25)
  SoundCloud:  Border #B4D9C5, Shadow 0 0 20px rgba(180, 217, 197, 0.25)
  Bandcamp:    Border #B4C5E3, Shadow 0 0 20px rgba(180, 197, 227, 0.25)
  Scale: 1.05
  Translate Y: -2px
```

### 8. Section Header
```
Decorative Line:
  Width: 120px
  Height: 1px
  Background: Linear gradient 90deg, 
    transparent → rgba(197, 180, 227, 0.6) → transparent
  Margin: 0 auto 16px

Subtitle:
  Font: Space Mono Regular, 14px
  Color: #808080
  Letter Spacing: 0.3em
  Transform: uppercase
  Margin Bottom: 8px
  
Title:
  Font: Space Mono Bold
  Size: clamp(2rem, 5vw, 3.5rem)
  Color: #FFFFFF
  Letter Spacing: 0.05em
```

### 9. Integration Statement Box
```
Background: #0A0A0A
Border: 1px solid #404040
Border Radius: 12px
Padding: 48px
Text Align: center

Quote Text:
  Font: Georgia Italic, 19px
  Line Height: 2
  Color: #C0C0C0
  Max Width: 800px
  
  Colored Spans:
    - "warrior's courage": #E8B4D9
    - "creative spotlight": #C5B4E3
    - "mystical depths": #B4C5E3
    - "structural discipline": #B4D9C5
```

---

## 🎭 EFFECTS & ANIMATIONS

### Transitions
```
Default Duration: 0.3s
Easing: ease

Properties:
  - all
  - color
  - border-color
  - transform
  - box-shadow
  - opacity
```

### Hover Scale
```
Transform: scale(1.05)
Duration: 0.3s
Easing: ease
```

### Tap/Active Scale
```
Transform: scale(0.95)
Duration: 0.15s
Easing: ease
```

### Fade In (Scroll Animations)
```
Initial:
  Opacity: 0
  Y: 30px
  
Animate:
  Opacity: 1
  Y: 0
  Duration: 0.8s
  Easing: ease-out
```

### Scroll Indicator
```
Animation: Bounce
Y Values: [0, 15px, 0]
Duration: 2s
Repeat: infinite
Easing: ease-in-out
```

### Particle System
```
Count: 100 particles
Colors: 70% white/gray, 30% pastel accents
Size: 0.5px - 2.5px
Speed: -0.1 to 0.1 (X and Y)
Opacity: 0.1 - 0.4
Connection Distance: 100px
Connection Opacity: 0.08
```

### Rotating Circles (Audio Player)
```
Outer Circle:
  Duration: 20s
  Direction: forward (clockwise)
  Easing: linear
  Repeat: infinite
  
Inner Circle:
  Duration: 30s
  Direction: reverse (counter-clockwise)
  Easing: linear
  Repeat: infinite
```

---

## 📐 LAYOUT GRID

### Desktop (1200px max-width)
```
Columns: 12
Gutter: 32px
Margin: 32px (auto-centered)
```

### Tablet (768px - 1199px)
```
Columns: 8
Gutter: 24px
Margin: 24px
```

### Mobile (< 768px)
```
Columns: 4
Gutter: 16px
Margin: 16px
```

### Section Max Widths
```
Hero: Full width
Featured Track: 1200px
Bio Section: 1200px
Releases: 1200px
Footer: Full width
```

### Grid Patterns
```
Node Cards: repeat(auto-fit, minmax(300px, 1fr))
Release Cards: repeat(auto-fit, minmax(280px, 1fr))
Audio + Description: repeat(auto-fit, minmax(300px, 1fr))
```

---

## 🎨 GRADIENT FORMULAS

### Primary Button Gradient
```
background: linear-gradient(135deg, #C5B4E3 0%, #E8B4D9 100%)
```

### Progress Bar Gradient
```
background: linear-gradient(90deg, #C5B4E3 0%, #E8B4D9 50%, #B4C5E3 100%)
```

### Scrollbar Gradient
```
background: linear-gradient(180deg, #C5B4E3 0%, #E8B4D9 100%)
```

### Section Divider Gradient
```
background: linear-gradient(90deg, transparent 0%, rgba(197, 180, 227, 0.6) 50%, transparent 100%)
```

### Release Card Background (Subtle)
```
background: linear-gradient(135deg, [pastel-accent]15 0%, #0A0A0A 100%)
Example: linear-gradient(135deg, rgba(197, 180, 227, 0.15) 0%, #0A0A0A 100%)
```

---

## 🌐 RESPONSIVE BREAKPOINTS

```
Mobile:         < 768px
Tablet:         768px - 1199px
Desktop:        ≥ 1200px
Large Desktop:  ≥ 1440px
```

### Responsive Typography
```
Use clamp() for fluid scaling:
H1: clamp(3rem, 8vw, 6rem)
H2: clamp(2rem, 5vw, 3.5rem)
Body: clamp(1rem, 2vw, 1.125rem)
```

### Responsive Spacing
```
Section Padding: clamp(4rem, 8vw, 6rem) 2rem
Card Padding: clamp(1.5rem, 3vw, 2rem)
```

---

## 🎯 ACCESSIBILITY

### Color Contrast Ratios
```
White on Black:     21:1 (AAA)
Light Gray on Black: 8.6:1 (AA)
Mid Gray on Black:   4.5:1 (AA)
Pastels on Black:    ~6:1 (AA)
```

### Focus States
```
All interactive elements:
  outline: 2px solid #C5B4E3
  outline-offset: 2px
```

### Touch Targets
```
Minimum Size: 44px × 44px
Button Padding ensures adequate size
```

---

## 📱 COMPONENT STATES

### Button States
```
Default:
  Cursor: pointer
  
Hover:
  Transform: scale(1.05)
  Additional effects per button type
  
Active/Pressed:
  Transform: scale(0.95)
  
Focus:
  Outline: 2px solid #C5B4E3
  Outline Offset: 2px
  
Disabled:
  Opacity: 0.5
  Cursor: not-allowed
```

### Card States
```
Default:
  Border: #303030
  
Hover:
  Border: [accent color]
  Box Shadow: 0 0 30px [accent]40
  Icon: colored filter
  Title: colored text
  
Focus:
  Outline: 2px solid [accent]
```

### Link States
```
Default:
  Color: #808080
  Text Decoration: none
  
Hover:
  Color: [accent color per platform]
  Transform: scale(1.05)
  Translate Y: -2px
  
Active:
  Transform: scale(0.98)
  
Visited:
  (Same as default)
```

---

## 🎨 DESIGN TOKENS (For Export)

```json
{
  "colors": {
    "black": "#000000",
    "darkest": "#0A0A0A",
    "darker": "#1A1A1A",
    "border-dark": "#202020",
    "border": "#303030",
    "border-light": "#404040",
    "text-darkest": "#505050",
    "text-dark": "#606060",
    "text-mid": "#808080",
    "text-light": "#A0A0A0",
    "text-lighter": "#C0C0C0",
    "light": "#E0E0E0",
    "white": "#FFFFFF",
    "wisteria": "#C5B4E3",
    "pink": "#E8B4D9",
    "sage": "#B4D9C5",
    "periwinkle": "#B4C5E3"
  },
  "typography": {
    "fontFamily": {
      "primary": "'Space Mono', monospace",
      "secondary": "'Georgia', serif"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "21px",
      "2xl": "24px",
      "3xl": "32px",
      "4xl": "48px",
      "5xl": "56px",
      "6xl": "96px"
    },
    "fontWeight": {
      "normal": 400,
      "bold": 700
    },
    "letterSpacing": {
      "tight": "0.05em",
      "normal": "0.1em",
      "wide": "0.2em",
      "wider": "0.3em",
      "widest": "0.4em",
      "ultra": "0.6em"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "12": "48px",
    "16": "64px",
    "24": "96px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "6px",
    "lg": "8px",
    "xl": "12px",
    "full": "50%"
  },
  "shadows": {
    "pastel-sm": "0 0 10px rgba(197, 180, 227, 0.3)",
    "pastel-md": "0 0 20px rgba(197, 180, 227, 0.3)",
    "pastel-lg": "0 0 30px rgba(197, 180, 227, 0.5)",
    "pink-glow": "0 0 30px rgba(232, 180, 217, 0.4)",
    "sage-glow": "0 0 30px rgba(180, 217, 197, 0.4)",
    "blue-glow": "0 0 30px rgba(180, 197, 227, 0.4)"
  }
}
```

---

## 📋 FIGMA EXPORT CHECKLIST

### Artboards to Create
- [ ] Hero Section (1920×1080)
- [ ] Audio Player Component (500×auto)
- [ ] Node Card × 3 (with different accents)
- [ ] Release Card × 3 (with different accents)
- [ ] Button Components (Primary + Secondary)
- [ ] Section Header Component
- [ ] Footer Layout
- [ ] Mobile Layouts (375×812)
- [ ] Color Palette Swatches
- [ ] Typography Samples

### Component Organization
```
📁 Components
  📁 Atoms
    - Button/Primary
    - Button/Secondary
    - Input/Text
    - Icon/Social
  📁 Molecules
    - Card/Node
    - Card/Release
    - Audio/Player
    - Link/Streaming
  📁 Organisms
    - Header/Hero
    - Section/Featured
    - Section/Bio
    - Footer
  📁 Effects
    - Particle/Background
    - Gradient/Button
    - Shadow/Pastel
```

### Text Styles to Create
- H1/Display
- H2/Title
- H3/Subtitle
- Label/Uppercase
- Body/Large-Italic
- Body/Regular
- Body/Small
- Metadata

### Color Styles to Create
- Primary/Black
- Primary/White
- Neutral/Dark-10
- Neutral/Gray-80
- Accent/Wisteria
- Accent/Pink
- Accent/Sage
- Accent/Periwinkle

---

## 🎯 IMPLEMENTATION NOTES

### Critical Design Decisions

1. **Monochrome Foundation**
   - 80% of design is black/white/gray
   - Creates professional, timeless base
   - Maximum readability and contrast

2. **Strategic Pastel Accents**
   - 20% of design uses pastel colors
   - Each accent has specific meaning
   - Used for: hover states, highlights, node cards, CTAs

3. **Hybrid Particle System**
   - Mostly white/gray particles (70%)
   - Occasional pastel particles (30%)
   - Creates subtle movement without distraction

4. **Typography Hierarchy**
   - Space Mono = technical, modern, strong
   - Georgia = traditional, readable, human
   - Contrast creates visual interest

5. **NEW Tagline Philosophy**
   ```
   INDOMITABLE SPIRIT  •  l o c u s  •  INFINITESIMAL ESSENCE
   ```
   - Replaces "warrior • healer • sound"
   - More philosophical and framework-aligned
   - "locus" emphasized with different styling
   - Captures both strength (indomitable) and humility (infinitesimal)

---

## 💾 EXPORT SPECIFICATIONS

### Image Assets
```
Logo/Icons:        SVG (vector) + PNG (@1x, @2x, @3x)
Album Art:         1000×1000px, PNG, sRGB
Background:        2560×1440px, PNG, optimized
Social Cards:      1200×630px (OG), 1024×512px (Twitter)
```

### File Formats
```
Screens:    Figma, PNG @2x
Components: Figma, React (provided)
Icons:      SVG
Colors:     JSON tokens
Typography: CSS @import
```

---

**This design system creates the perfect balance: monochrome elegance meets pastel soul** ⚫✨🎨

Your warrior spirit expressed through refined minimalism!
