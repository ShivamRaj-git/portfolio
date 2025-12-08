# Gen-Z Dark Rave Portfolio - Design Guidelines

## Design Approach
**Reference-Based Aesthetic**: Cyber-punk meets underground rave culture - think Cyberpunk 2077 UI meets festival visuals with glitch art influence. Intense, rebellious, energetic, and unapologetically bold.

## Core Visual Identity

### Color Palette
**Primary Colors:**
- Base: Pure black (#000000) and deep charcoal (#0a0a0a)
- Neon Pink: Electric magenta (#FF10F0)
- Neon Green: Acid lime (#39FF14)
- Electric Blue: Cyber cyan (#00D9FF)
- Ultraviolet: Deep purple (#8B00FF)

**Usage:**
- Backgrounds: Black and deep grays exclusively
- Accents: Neon colors for text highlights, borders, and interactive elements
- Glows: Heavy neon glow effects on all accent elements
- Gradients: Combine multiple neon colors for dynamic effects

### Typography
**Font Selection:**
- Primary Display: Bold, condensed, futuristic sans-serif (like Bebas Neue, Druk, or Monument Extended)
- Body Text: Clean, geometric sans-serif with good readability
- Accent: Glitchy or distorted variants for special headings

**Hierarchy:**
- H1: 72-96px, all caps, heavy weight, neon glow
- H2: 48-64px, condensed, letter-spacing tight
- H3: 32-40px, bold
- Body: 16-18px, increased line-height for readability
- All text in white or neon accent colors

### Visual Effects System
**Applied Throughout:**
1. **Grain/Noise Overlay**: Subtle film grain across all pages (10-15% opacity)
2. **Chromatic Aberration**: RGB split effect on hover states and headings
3. **Glitch Effects**: Intermittent text glitches, scanline overlays
4. **Neon Glow**: CSS glow shadows on all interactive elements (box-shadow with color spread)
5. **Scan Lines**: Horizontal lines creating CRT monitor effect

## Layout System

### Spacing
Use Tailwind units: 4, 8, 12, 16, 24, 32 for consistent rhythm
- Sections: py-24 to py-32
- Component spacing: gap-8 to gap-12
- Tight elements: p-4, m-2

### Grid & Structure
- Container: max-w-7xl centered
- Multi-column where impactful: 2-3 columns on desktop for skills/projects
- Asymmetric layouts encouraged - break traditional grids
- Full-bleed backgrounds with contained content

## Page-Specific Design

### Landing/Hero Page
**Layout:**
- Full viewport height (100vh)
- Centered content with Three.js animated background
- Animated neon particles and glitch wave effects
- Large animated name display (glitch effect on load)
- Subtitle with cyberpunk flair
- Pulsating "ENTER" CTA button with neon border

**No hero image** - replaced with Three.js particle system and neon wireframe visuals

### About Page
**Layout:**
- Split sections approach
- Skills displayed in holographic card grid (3 columns desktop, 1 mobile)
- Animated timeline running vertically with neon connecting lines
- Each timeline item: date + description in cards with hover lift effect
- Three.js background element: floating skill sphere or neon ring

**Visual Treatment:**
- Cards with semi-transparent dark backgrounds
- Neon borders (1-2px) with glow
- Hover: increase glow intensity + slight scale

### Skills Section
**Layout:**
- Icon grid: 4-6 columns desktop, 2-3 mobile
- Each skill card contains: neon icon + skill name
- 3D tilt effect on hover using perspective transforms
- Center feature: Three.js neon skill sphere auto-rotating

**Interaction:**
- Cards respond to mouse position with 3D tilt
- Icons pulse with neon glow on hover
- Staggered entrance animations

### Projects Page
**Layout:**
- Grid: 2 columns desktop, 1 column mobile
- Each project card: image/visual + title + tech stack tags
- Hover: 3D tilt with enhanced neon glow
- Click leads to project detail page with Barba.js transition

**Project Detail Page:**
- Full-width hero with project visual
- Description section with neon dividers
- Tech stack displayed as neon badge pills
- Live/GitHub links as glowing CTA buttons
- Optional: Small Three.js scene showcasing project theme

### Contact Page
**Layout:**
- Centered form (max-w-2xl)
- Form fields with neon borders
- Labels float on focus with glow effect
- Submit button: large, neon-outlined with pulse animation
- Social links below: icon grid with neon hover pulsation

**Form Design:**
- Dark input backgrounds with neon focus states
- Validation states use neon colors (green = valid, pink = error)

## Navigation

### Global Nav
**Design:**
- Fixed top or side navigation
- Semi-transparent dark background with blur
- Nav links: uppercase, spaced, neon underline on active
- Hamburger menu (mobile): animated with glitch effect
- Logo/Name: glitchy animated text effect

**Transitions:**
- Barba.js powers all page transitions
- Transition effect: liquid distortion or glitch wipe
- Duration: 800-1200ms for dramatic effect
- Each page has unique entrance animation

## Component Library

### Buttons
- Primary: Neon border (2px), transparent background, glow on hover
- CTA: Filled neon background with pulse animation
- Ghost: Text-only with glow underline on hover
- All buttons: uppercase, bold, letter-spaced

### Cards
- Background: rgba(10, 10, 10, 0.8) with backdrop blur
- Border: 1px neon glow
- Hover: Increased glow + subtle scale (1.02-1.05)
- Shadow: Multi-layer neon glow shadows

### Form Elements
- Inputs: Dark background, neon border on focus
- Placeholders: Gray with low opacity
- Focus states: Bright neon glow
- Error states: Neon pink glow

### Icons
Use Heroicons or similar, styled with neon colors and glow effects

## Animation Strategy

### Page Transitions
- Entry: Glitch fade-in or liquid distortion reveal
- Exit: Glitch fade-out or pixel dissolve
- Between pages: 1000ms smooth morphing

### Micro-interactions
- Hover: Glow intensification (200ms)
- Button clicks: Pulse ripple effect
- Form interactions: Smooth focus glow (300ms)
- Scroll: Parallax on background elements (subtle)

### Three.js Scenes
- Landing: Particle system with mouse-reactive movement
- Skills: Rotating neon sphere/ring
- Background: Animated wireframe waves
- All scenes: Mouse-reactive, performance-optimized

## Responsive Design

### Breakpoints
- Mobile: Full-width cards, stacked layouts, reduced particle density
- Tablet: 2-column grids, moderate effects
- Desktop: Full experience with all effects enabled

### Mobile Considerations
- Reduce Three.js particle count for performance
- Simplify animations (remove complex distortions)
- Larger touch targets (min 44px)
- Simplified navigation with full-screen menu

## Accessibility (within theme)

- Sufficient contrast: White text on black backgrounds
- Focus states: Bright neon outlines (high visibility)
- Reduced motion option: Disable heavy animations if preferred
- Keyboard navigation: Full support with visible focus

## Performance Notes

- Lazy load Three.js scenes
- Optimize particle counts
- Use CSS transforms over position changes
- Preload critical fonts and animations

This design creates an immersive, high-energy rave experience that's rebellious, modern, and unmistakably Gen-Z while maintaining usability and performance.