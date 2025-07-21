# LuxBrew - Premium Coffee Shop Web Application

## Overview

LuxBrew is a fully responsive, luxurious web application for a premium coffee shop brand. The application features a modern React frontend with a Node.js/Express backend, designed with a mobile-first approach and elegant UI components. The app provides a complete e-commerce experience for coffee lovers, including product browsing, cart management, wishlist functionality, and user profiles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for global state, TanStack React Query for server state
- **UI Framework**: Radix UI primitives with custom Tailwind CSS styling
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom color palette and design system

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Data Storage**: Currently using in-memory storage (MemStorage) with plans for PostgreSQL integration
- **Session Management**: Simple session-based approach using generated session IDs

### Design System
- **Color Palette**: Luxury coffee theme with cream white, light beige, light gold, rich brown, and coffee tan
- **Typography**: Playfair Display for headings, Poppins for body text
- **Component Library**: Custom components built on Radix UI primitives
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints

## Key Components

### Frontend Components
1. **Pages**: Splash, Home, Products, Product Detail, Cart, Wishlist, Profile
2. **Navigation**: Bottom navigation bar with badges for cart and wishlist counts
3. **Product Components**: Coffee cards, quantity selectors, rating displays
4. **UI Components**: Comprehensive set of reusable components (buttons, dialogs, forms, etc.)

### Backend Components
1. **Routes**: RESTful API endpoints for products, cart, and wishlist operations
2. **Storage Layer**: Abstracted storage interface with in-memory implementation
3. **Middleware**: Request logging, error handling, and development utilities

### Database Schema
1. **Products**: Core product information with pricing, categories, and ratings
2. **Cart Items**: User cart with product references, quantities, and customizations
3. **Wishlist Items**: Simple product bookmarking with timestamps

## Data Flow

### Client-Server Communication
- **API Requests**: TanStack React Query manages all server communication
- **Error Handling**: Centralized error handling with user-friendly toast notifications
- **State Synchronization**: Automatic cache invalidation and refetching on mutations

### Session Management
- **Session Tracking**: Client-generated session IDs stored in local storage
- **Cart Persistence**: Cart and wishlist data tied to session IDs
- **State Persistence**: Zustand with persistence middleware for cart/wishlist counts

### Product Management
- **Product Catalog**: Static product data with categories, ratings, and pricing
- **Popular Products**: Separate endpoint for featured/popular items
- **Category Filtering**: Dynamic filtering by coffee categories

## External Dependencies

### Production Dependencies
- **UI Libraries**: Radix UI components, Lucide React icons
- **Data Management**: TanStack React Query, Zustand
- **Database**: Drizzle ORM with Neon Database serverless PostgreSQL
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Utilities**: Date-fns, clsx for conditional styling

### Development Dependencies
- **Build Tools**: Vite, TypeScript, esbuild
- **Development**: tsx for TypeScript execution, Replit-specific plugins

### Database Integration
- **ORM**: Drizzle with PostgreSQL dialect
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon Database serverless PostgreSQL (configured but not yet fully integrated)

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR for frontend, tsx for backend
- **Database**: Currently using in-memory storage with PostgreSQL migration path
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: esbuild bundling for Node.js deployment
- **Assets**: Static file serving with Vite-built client assets

### Replit Integration
- **Development**: Replit-specific plugins for enhanced development experience
- **Runtime Error Overlay**: Development-time error reporting
- **Cartographer**: Replit's development tooling integration

### Database Migration Strategy
The application is architected to easily transition from in-memory storage to PostgreSQL:
1. Storage interface abstraction allows for plug-and-play database implementations
2. Drizzle schema already defined for PostgreSQL
3. Migration scripts configured for database setup
4. Environment-based configuration for database connections

This architecture supports both development flexibility and production scalability while maintaining a consistent API contract between storage implementations.