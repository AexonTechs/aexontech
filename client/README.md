# Aexon - Premium Futuristic Software Agency Website

A cutting-edge, ultra-modern website for Aexon featuring a bold black-and-white aesthetic with immersive 3D elements, smooth animations, and premium interactions.

## Features

- **Ultra-Modern Design**: Matte black background (#050505) with sharp white typography
- **Interactive 3D Objects**: Holographic geometric shapes (torus, cube, cylinder) with physics-based movement
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **Lenis Smooth Scrolling**: Buttery-smooth scroll experience
- **Glassmorphism UI**: Subtle glass effects on cards and components
- **Responsive Design**: Fully responsive across all devices
- **Premium Interactions**: Magnetic buttons, hover effects, and parallax movement

## Tech Stack

- **Next.js 16.2.6** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Three.js & React Three Fiber** - 3D graphics
- **@react-three/drei** - Three.js helpers
- **GSAP** - Professional animations
- **Lenis** - Smooth scrolling
- **Lucide React** - Modern icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Global styles
└── components/
    ├── Navigation.tsx      # Top navigation bar
    ├── Hero.tsx            # Hero section with 3D objects
    ├── Services.tsx        # Services grid
    ├── About.tsx           # About section with stats
    ├── Contact.tsx         # Contact form
    ├── Footer.tsx          # Footer
    ├── SmoothScroll.tsx    # Lenis smooth scroll wrapper
    └── HolographicObjects.jsx  # 3D holographic objects
```

## Sections

### Hero
- Fullscreen dark layout with floating 3D objects
- Bold headline with animated underlines
- Glassmorphic CTA buttons
- Real-time stats display

### Services
- Asymmetrical grid layout with glass cards
- 6 enterprise capabilities:
  - Cloud-Native Architecture
  - AI Platform Engineering
  - Scalable Product Engineering
  - DevOps & Site Reliability
  - Digital Transformation
  - Data & Intelligence Systems

### About
- Split layout with content and animated stats
- Counter animations for metrics
- Premium card designs

### Contact
- Terminal-inspired background
- Floating label inputs with glow effects
- Smooth focus animations

### Footer
- Minimal monochrome design
- Social links with hover effects
- Animated dividers

## Customization

### Colors
The primary color scheme uses grayscale:
- Background: `#050505` and `#0A0A0A`
- Text: `#FFFFFF` (white) and various gray shades
- Borders: `white/10` to `white/20` opacity

### Typography
Using Inter font with weights from 300 to 900 for hierarchy.

### 3D Objects
Customize the holographic objects in `src/components/HolographicObjects.jsx`:
- Adjust positions, colors, and materials
- Modify rotation speeds and float intensity
- Change lighting and environment

## Performance

- Static generation for optimal performance
- Lazy loading for 3D components
- Optimized animations with GPU acceleration
- Minimal bundle size with tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2026 Aexon
