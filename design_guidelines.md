# Arknights Terra Map Wedding Seating Plan - Design Guidelines

## Design Approach
**Reference-Based Design**: Arknights Game UI Aesthetic with Wedding White Theme

Drawing inspiration from Arknights' distinctive UI while adapting it for a wedding context. The design merges the game's sharp, angular, tech-inspired interface with elegant white tones suitable for a wedding celebration.

## Core Design Principles

### 1. Arknights Visual Language
- **Geometric Precision**: Sharp angles, hexagonal accents, diagonal cut corners
- **Tech-Inspired Elements**: Glowing borders, holographic effects, futuristic grid patterns
- **Faction Identity**: Visual badges and accent treatments for each faction group
- **Information Density**: Organized, grid-based layouts with clear data hierarchy

### 2. Wedding White Integration
Adapt the typically dark Arknights aesthetic to wedding white by:
- Using white/off-white as primary background with subtle geometric textures
- Maintaining faction accent colors as borders, badges, and highlights only
- Creating contrast through sharp geometric shapes and shadows rather than dark backgrounds
- Adding soft glows and halos around key elements for elegance

## Typography

**Font Families** (via Google Fonts CDN):
- Primary: 'Rajdhani' (700, 600, 500) - Angular, tech-inspired for headings and labels
- Secondary: 'Inter' (400, 500, 600) - Clean, readable for body text and guest names
- Accent: 'Orbitron' (700) - For Terra location names and faction badges

**Hierarchy**:
- Hero Title: text-5xl to text-6xl, font-bold (Rajdhani)
- Table/Location Names: text-2xl to text-3xl, font-bold (Orbitron)
- Guest Names: text-lg, font-medium (Inter)
- Faction Labels: text-sm, font-semibold, uppercase tracking-wide (Rajdhani)
- Search Input: text-base, font-normal (Inter)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-4, p-6, p-8
- Section gaps: gap-6, gap-8
- Card spacing: space-y-4, space-y-6
- Grid gaps: gap-4 for cards, gap-8 for table grid

**Container Structure**:
- Max width: max-w-7xl for main content
- Responsive padding: px-4 sm:px-6 lg:px-8

## Component Library

### Navigation Header
- Fixed position with backdrop blur
- Sharp geometric border at bottom with faction-colored accent line
- Logo/title on left with Arknights-style angular badge
- Navigation minimal - just event title and date displayed

### Search Interface
- Prominent search bar with hexagonal end caps (decorative SVG shapes)
- Icon integration: Heroicons for search, filter, and close icons
- Faction filter chips with geometric borders and faction badges
- Real-time search results with fade-in animation (subtle, 200ms)
- Clear all filters button with angular design

### Guest Cards (Operator Card Style)
- Card border: 2px solid with sharp corners and diagonal corner cuts (clip-path)
- Faction badge in top-right corner with hexagonal background
- Guest name prominent with faction affiliation below
- Table assignment with icon and location name
- Subtle gradient overlay on hover (minimal, elegant)
- Shadow: shadow-md, elevated on hover to shadow-lg

### Terra Map Grid View
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-5 for table positions
- Each table position as a geometric cell with:
  - Hexagonal or angular container (using clip-path or border-radius with transform)
  - Table name (Terra location) at top
  - Guest count indicator
  - Faction distribution visual (small colored dots/badges)
  - Click to highlight assigned guests
- Visual connections between search result and map position (subtle line or glow)

### Table Detail Cards
- Larger card format when table is selected
- Header with Terra location name and decorative geometric frame
- Guest list with faction grouping (visual separators)
- Faction color accents as left border or badge
- Guest count summary with icons

### Faction Visual System
Each faction gets distinctive treatment:
- Unique geometric badge shape (hexagon, diamond, shield variants)
- Border accent styling (solid, dashed, double-line variations)
- Small icon or insignia within badge
- Faction name in uppercase with letter-spacing

**Suggested Terra Locations (Tables)**:
Lungmen, Rhodes Island, Ursus, Victoria, Kazimierz, Laterano, Siesta, Bolivar, Sargon, Yan

### Loading & Empty States
- Geometric loader with rotating hexagonal elements
- "No results found" with Arknights-style information panel
- Elegant messaging that fits wedding context

## Images

**Hero Section Background**:
- Full-width decorative Terra map illustration (stylized, abstract)
- Subtle white overlay to maintain readability
- Geometric overlay patterns (lines, hexagons) at 10-20% opacity
- Image description: Abstract, stylized map of Terra with geometric patterns, white-tinted, showing interconnected locations with futuristic aesthetic

**Placement**: Background of header section, fixed or subtle parallax effect

**Faction Badges**:
- Small icon sets representing each faction (use Font Awesome for placeholder: shield, star, users, globe, etc.)
- Integrated into guest cards and search filters

## Animations (Minimal & Purposeful)

Use sparingly, maintain elegance:
- Search results: fade-in transition-opacity duration-200
- Card hover: scale-102 transition-transform duration-150
- Map grid highlight: border glow pulse (2s duration, infinite)
- Filter selection: smooth background fill transition-colors duration-200

**Avoid**: Excessive parallax, continuous animations, distracting effects

## Accessibility

- High contrast between text and backgrounds
- Focus states with visible outline (ring-2 with faction color)
- Keyboard navigation for search and filters
- ARIA labels for all interactive elements
- Touch targets minimum 44x44px for mobile
- Screen reader friendly faction and table announcements

## Responsive Strategy

**Mobile (base)**:
- Single column layout for guest cards
- Simplified map grid (2 columns)
- Search bar full width
- Faction filters as horizontal scroll chips

**Tablet (md:)**:
- 2 column guest cards
- 3 column map grid
- Side-by-side search and filters

**Desktop (lg:)**:
- Split view: Search/results on left, map grid on right
- 3-4 column guest cards in results
- 5 column map grid
- Sticky sidebar for filters

## Special Touches

- Geometric corner decorations on major containers (CSS clip-path)
- Subtle scan-line effect overlay (optional, very subtle)
- Faction-specific micro-interactions (hover reveals faction quote or detail)
- "Find Your Seat" prominent CTA button with hexagonal frame
- Event details panel with Arknights information card styling
- Welcome message in Arknights briefing/mission style format