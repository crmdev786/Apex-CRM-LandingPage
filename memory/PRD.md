# APEX CRM Landing Page — PRD

## Original Problem Statement
Build a premium, hyper-minimalist landing page for APEX CRM — the premier operating system for motorcycle and powersports dealerships. High-end gallery-style light mode with monochrome zinc palette, glass-morphic surfaces, Framer Motion animations, Inter Tight + JetBrains Mono fonts.

## Architecture
- **Frontend**: React 19 + Tailwind CSS v3 + Framer Motion v11 + Lucide React
- **Backend**: FastAPI + MongoDB (stores access requests)
- **Fonts**: Inter Tight (structural), JetBrains Mono (metrics/data)

## User Personas
- Motorcycle/powersports dealership owners, GMs, and sales managers
- Enterprise buyers evaluating CRM software
- 400+ active dealerships (target market)

## Core Requirements (Static)
1. Monochrome light mode design — zero primary colors
2. Glass-morphic surfaces with fine slate borders
3. Framer Motion animations: magnetic buttons, 3D tilt, count-up, staggered reveals
4. Coded CRM dashboard mockup in hero section
5. Request Access modal with form submission to backend
6. All sections: Hero, Metrics, Capabilities, Comparison, Ticker, Footer

## What's Been Implemented (v1.0 — Feb 2026)

### Components
- `Nav.jsx` — Floating glass dock, magnetic button, scroll-aware opacity
- `Hero.jsx` — Gradient mesh bg, dot grid, staggered reveal, trust indicators, dual CTAs
- `DashboardMockup.jsx` — Fully coded CRM UI with lead queue, KPIs, sidebar, floating animation
- `Metrics.jsx` — Count-up numbers (spring easing) with useInView trigger
- `Capabilities.jsx` — Bento grid with 3D tilt + light sweep on hover (Lead Routing, Inventory Matrix, Smart Follow-Ups)
- `Comparison.jsx` — Legacy vs APEX 8-row table with strikethrough + gain badges
- `Ticker.jsx` — Infinite marquee with monochrome typographic partner logos
- `Footer.jsx` — Large APEX watermark, 2-column links, copyright bar
- `RequestAccessModal.jsx` — Glass overlay, 4-field form, spring animation, success state

### Backend
- `POST /api/request-access` — Stores name, dealership, email, volume in MongoDB

## Test Results
- Backend: 100% pass
- Frontend: 100% pass
- Form submission end-to-end: verified

## Prioritized Backlog

### P0 (Blocking)
- None currently

### P1 (Next Phase)
- Pricing section (tiered plans)
- Testimonials / social proof section
- Video walkthrough embed (for "Watch Demo" CTA)
- Email notification on access request submission (SendGrid/Resend)

### P2 (Future)
- Blog / documentation pages
- Live demo environment
- Analytics dashboard (track form conversions)
- Multi-language support

## Next Tasks
1. Add email notification for form submissions
2. Build pricing section
3. Add testimonials with JetBrains Mono quote styling
4. Set up production deployment
