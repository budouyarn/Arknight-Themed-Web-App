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
- Static wedding data (guests and tables) imported from shared module
- Client-side filtering and search using useMemo for performance
- No backend API calls in current implementation - data is hardcoded

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
- Placeholder routes defined in server/routes.ts (currently no active endpoints)
- Storage interface pattern defined but using in-memory implementation
- Prepared for CRUD operations on users, guests, and tables

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
- Static data exported from shared/wedding-data.ts
- 10 tables mapped to grid coordinates
- 50+ guests pre-assigned to tables by faction
- No database connection active in current implementation

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
- Terra map background image integration
- Geometric grid overlays for tech aesthetic
- Badge system for faction identification with custom colors and icons
- Search and filter UI with real-time updates

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