# Terra Wedding Seating Plan

## Overview

This is a wedding seating chart application themed around the Arknights game universe, featuring Terra map locations and faction-based guest organization. The application allows guests to search for their assigned table by name or faction, with an Arknights-inspired UI aesthetic adapted for a wedding context using white themes and geometric design elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Single-page application architecture with component-based design

**UI Component System**
- Shadcn/ui component library (New York style variant) providing pre-built, customizable React components
- Radix UI primitives for accessible, unstyled UI components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for managing component variants
- Custom design system following Arknights aesthetic with geometric shapes, angular elements, and faction-based color schemes

**Typography Strategy**
- Google Fonts integration with three font families:
  - Rajdhani (700, 600, 500) for headings and labels
  - Inter (400, 500, 600) for body text
  - Orbitron (700) for location names and faction badges

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React hooks (useState, useMemo) for local component state
- Custom hooks for responsive behavior (use-mobile, use-toast)

**Data Flow**
- Dynamic data fetching via RESTful API endpoints
- TanStack Query handles server state with automatic cache invalidation
- Client-side filtering and search using useMemo for performance
- Real-time updates when data changes through admin interface

### Backend Architecture

**Server Framework**
- Express.js HTTP server with TypeScript
- Vite middleware integration for development with HMR
- Static file serving for production builds

**Development vs Production**
- Development: Vite dev server middleware handles React app serving
- Production: Pre-built static files served from dist/public directory
- Request logging middleware for API routes

**API Structure**
- RESTful API routes in server/routes.ts with full CRUD operations
- Guest endpoints: GET /api/guests, POST /api/guests, PATCH /api/guests/:id, DELETE /api/guests/:id
- Table endpoints: GET /api/tables, POST /api/tables, PATCH /api/tables/:id, DELETE /api/tables/:id
- Zod schema validation on all POST/PATCH requests preventing ID mutations
- Table reference validation ensures guests can only be assigned to existing tables
- Comprehensive error handling with 400/404 status codes

### Data Storage Solutions

**Database Schema (Drizzle ORM)**
- PostgreSQL as the target database (via @neondatabase/serverless)
- Drizzle ORM for type-safe database queries and schema definitions
- Schema includes three main tables:
  - `users`: Authentication/user management (id, username, password)
  - `tables`: Wedding table locations (id, name, gridX, gridY for map positioning)
  - `guests`: Guest information (id, name, faction, tableId foreign key)

**Data Organization**
- Factions: 10 predefined factions (Rhodes Island, Lungmen, Ursus, Victoria, Kazimierz, Laterano, Siesta, Bolivar, Sargon, Yan)
- Grid-based table layout system for visual representation on Terra map
- Relationship: One table to many guests

**Current Data Source**
- In-memory storage (MemStorage) initialized from shared/wedding-data.ts
- 10 tables mapped to grid coordinates
- 50+ guests pre-assigned to tables by faction
- Data persists during application runtime and resets on server restart
- Storage implements IStorage interface for all CRUD operations

### Authentication and Authorization

**Planned Authentication**
- User schema defined with username/password fields
- Express session management prepared (connect-pg-simple for session storage)
- No active authentication implementation in current codebase
- Storage interface includes getUserByUsername and createUser methods

**Security Considerations**
- CORS and credential handling configured in API client
- Password field present in schema (should be hashed in production)
- Session-based auth pattern prepared but not implemented

### Design System Architecture

**Theme Configuration**
- CSS custom properties for color system with light/dark mode support
- Tailwind extended configuration with custom border radii and color palette
- HSL color format for consistent theming
- Elevation system using opacity-based overlays (elevate-1, elevate-2)

**Component Patterns**
- Geometric clipping paths for Arknights-style angular corners
- Faction-specific color coding with icons
- Hover and active states using elevation classes
- Responsive grid layouts for table visualization

**Visual Design Elements**
- Terra map background image at full opacity for clear visibility
- Badge system for faction identification with faction icons
- Uniform grey color scheme for all faction regions at full opacity
- Faction names displayed in light grey text
- Guest count numbers and icons displayed in light grey text
- Search and filter UI with real-time updates
- Top-left corner text displays "PRTS SYNTHESIZE INFORMATION ANALYSIS" with typewriter animation effect and continuous blinking cursor (no background box)
- Spread-out faction positioning across 16:10 landscape map
- Radar pulse animations with stable timing for each faction region (all in grey)

## Recent Changes (October 24, 2025)

### Map Redesign - Landscape Layout with Radar Animations
- Redesigned interactive map to landscape format (16:10 aspect ratio)
- Replaced circular command region layout with spread-out faction positioning
- Each faction positioned at fixed coordinates across the map for better spatial coverage
- Added dual radar pulse animations to each faction region using CSS keyframes
- Implemented stable animation delays per faction (no render jitter)
- Animation timing creates wave effect across regions for visual appeal
- Factions spread across map positions: center, northeast, east, northwest, west, north, southeast, south, southwest, far east
- Custom Rhodes Island icon component featuring Arknights-inspired geometric crystal design
- Faction regions show maroon red (red-900 to red-950) hover effect for visual feedback
- Radar pulse animations turn red when hovering over faction regions
- Selected faction regions display in dark red (red-800 to red-900 gradient) with red ring and pulsing border
- Clicking a faction turns it dark red while the modal is open, clearing selection on modal close

### Admin Interface Implementation
- Created comprehensive admin page at /admin for managing seating arrangements
- Table-organized view showing all guests grouped by their assigned tables
- Guest management features:
  - Move guests between tables using dropdown selection
  - Add new guests with validated forms
  - Edit existing guest details
  - Delete guests with confirmation
- Table management features:
  - Add new tables with grid positioning
  - View guest counts per table
- Navigation between Home and Admin pages with persistent floating buttons

### API & Data Layer
- Migrated from static data imports to dynamic API-based data fetching
- Implemented full CRUD operations for guests and tables
- Added Zod validation schemas (insertTableSchema, insertGuestSchema, updateTableSchema, updateGuestSchema)
- Update schemas explicitly omit ID fields to prevent data corruption
- Table reference validation ensures referential integrity
- All mutations include error handlers with user-facing toast notifications

### Interactive Features
- Added autocomplete dropdown to search bar showing up to 8 guest name suggestions
- Each suggestion displays guest name, faction badge, and assigned table
- Keyboard navigation support (Arrow keys, Enter to select, Escape to close)
- Click-to-select functionality for suggestions
- Click outside dropdown to close
- Faction region click opens modal dialog showing all guests seated at that table
- Modal displays circular table visualization with:
  - Round table center showing table name and total seat count
  - Guests positioned around the circle with numbered seats (1, 2, 3, etc.)
  - Each guest card shows name and faction badge with Arknights-style angular corners
  - Automatic positioning based on number of guests
- Removed static search results and selected region info boxes for cleaner interface

### UI/UX Improvements
- Loading states for all data fetching operations
- Toast notifications for all CRUD operations (success and error cases)
- Responsive layout with proper scrolling and spacing
- Faction badges with icons and color coding throughout admin interface

## External Dependencies

**Core Framework Dependencies**
- React ecosystem: react, react-dom, @tanstack/react-query
- Build tools: vite, @vitejs/plugin-react, esbuild
- Routing: wouter
- Backend: express, Node.js http server

**Database & ORM**
- drizzle-orm for database operations
- drizzle-kit for migrations and schema management
- @neondatabase/serverless for Neon PostgreSQL connection
- drizzle-zod for schema validation
- connect-pg-simple for PostgreSQL session storage

**UI Component Libraries**
- @radix-ui/* packages (30+ components for accessible UI primitives)
- lucide-react for icon system
- embla-carousel-react for carousel functionality
- cmdk for command palette patterns
- recharts for potential data visualization

**Styling & Utilities**
- tailwindcss with postcss and autoprefixer
- clsx and tailwind-merge for className management
- class-variance-authority for component variants
- date-fns for date manipulation

**Form Handling**
- react-hook-form for form state management
- @hookform/resolvers for validation integration
- zod for schema validation

**Development Tools**
- TypeScript for type safety
- tsx for running TypeScript in Node.js
- @replit/* plugins for Replit-specific development features (cartographer, dev banner, error overlay)

**Asset Management**
- Google Fonts CDN for Rajdhani, Orbitron, and Inter typefaces
- Custom Terra map background images in attached_assets directory
- Image imports via Vite's asset handling