# Wedding of Leandro Kim and Sherine Lim - Seating Plan

## Overview

This project is an Arknights-themed wedding seating chart application. It allows guests to find their assigned tables using an interactive map of Terra, featuring faction-based organization and an Arknights-inspired UI adapted for a wedding context. The application includes guest search, table management for administrators, and a unique visual design integrating geometric elements and character-specific aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend uses React 18 with TypeScript, Vite for bundling, and Wouter for routing. UI is built with Shadcn/ui (New York style) and Radix UI primitives, styled using Tailwind CSS with custom design tokens and Class Variance Authority. Typography utilizes Google Fonts (Rajdhani, Inter, Orbitron) for distinct visual hierarchy. State management is handled by TanStack Query for server state and React hooks for local component state. Interactive features include an autocomplete search, a "Slide to Enter" welcome page, and a dynamic chat notification system. The interactive map features geometric clipping paths, faction-specific color coding, and radar pulse animations.

### Backend

The backend is an Express.js server with TypeScript, integrating Vite middleware for development. It provides a RESTful API with full CRUD operations for guests and tables. Zod is used for schema validation on all POST/PATCH requests to ensure data integrity.

### Data Storage

PostgreSQL, accessed via `@neondatabase/serverless`, is the target database. Drizzle ORM provides type-safe queries and schema definitions. The schema includes `users` (for authentication), `tables` (with grid coordinates), and `guests` (linked to tables by a foreign key). Initially, data is stored in-memory from `shared/wedding-data.ts`, persisting for the application's runtime.

### Authentication

An owner-only authentication system is implemented using Passport.js with a local strategy and session-based authentication (Memorystore for development). Password hashing is done with scrypt. A first-time setup flow allows for a single owner account creation, after which registration is disabled. All admin routes (POST/PATCH/DELETE for guests and tables) are protected, while GET endpoints are public.

### Design System

The design system uses CSS custom properties for theming (light/dark mode support), Tailwind for styling, and HSL for consistent color usage. It incorporates geometric clipping paths, faction-specific color coding with icons, and elevation effects. Visual elements include a Terra map background, badge system for faction identification, responsive grid layouts, and a "PRTS SYNTHESIZE INFORMATION ANALYSIS" typewriter effect in the top-left corner. The map is designed in a 16:10 landscape format with spread-out faction positioning and dual radar pulse animations.

**Layout Design:**
- Background color: Grey-white (96% lightness) for a soft, neutral appearance
- Table Map View: Full-screen layout utilizing the entire viewport with view navigation buttons fixed in top right corner
- Guest List View: Centered container with maximum width, featuring search bar at the top for guest/table filtering

## External Dependencies

**Core Frameworks & Tools:**
*   **Frontend:** React, Vite, Wouter, TanStack Query
*   **Backend:** Express.js, Node.js

**Database & ORM:**
*   PostgreSQL (`@neondatabase/serverless`)
*   Drizzle ORM, Drizzle-kit, Drizzle-Zod
*   `connect-pg-simple`

**Authentication:**
*   Passport.js (`passport`, `passport-local`)
*   `express-session`, `memorystore`
*   Node.js `crypto` (for scrypt)

**UI Components & Styling:**
*   Shadcn/ui, Radix UI
*   Tailwind CSS, PostCSS, Autoprefixer
*   `clsx`, `tailwind-merge`, `class-variance-authority`
*   `lucide-react` (icons)
*   Google Fonts (Rajdhani, Inter, Orbitron)

**Form Handling & Validation:**
*   `react-hook-form`
*   `@hookform/resolvers`
*   Zod

**Utilities:**
*   `date-fns`

**Development Tools:**
*   TypeScript, `tsx`
*   `@replit/*` plugins

**Asset Management:**
*   Google Fonts CDN
*   Custom Terra map background images