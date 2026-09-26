# Century Imagery - CMS Implementation Roadmap

This document outlines the phased approach to implementing the full CMS and Admin Dashboard for Century Imagery.

## Phase 1: Backend Foundation (Completed)
- Supabase project integration
- Supabase database schema for CMS content
- Row Level Security (RLS) foundation
- TypeScript database types
- Environment variable structure
- Cloudflare Stream server-side integration foundation
- Secure Direct Creator Upload foundation
- Backend documentation

## Phase 2: Admin Authentication (Completed)
- Setup Supabase Auth
- Implement secure login UI (not publicly accessible)
- Implement session management in Next.js
- Finalize RLS write policies for authenticated admins
- Restrict admin routes via middleware

## Phase 3: Admin Dashboard Shell
- Create protected `/admin` layout
- Build admin sidebar navigation
- Build admin header and user profile menu
- Implement dashboard overview page
- Set up reusable admin UI components (tables, forms, modals)

## Phase 4: Projects CMS
- Build Project list and CRUD UI
- Implement project sorting and categorization
- Form handling for project details (title, description, client, year, etc.)
- Status toggling (Draft vs Published)

## Phase 5: Media Library + Cloudflare Stream Uploads
- Build Media Library UI in the admin panel
- Implement the Direct Creator Upload flow to Cloudflare Stream
- Handle asynchronous video processing status
- Attach media assets to Projects (Cover, Hero, Gallery)
- Future: Integrate Cloudflare R2 for images

## Phase 6: Services CMS
- Build Services list and CRUD UI
- Manage service divisions and sort order
- Build Service Items management (adding/removing offerings within a division)

## Phase 7: Pages CMS
- Build Pages list and CRUD UI
- Implement structured JSON editors for Homepage, About, and Services pages
- Manage global page statuses

## Phase 8: Journal CMS
- Build Journal list and CRUD UI
- Implement rich text or block editor for article content
- Manage author, excerpts, and cover media

## Phase 9: Bookings Management
- Build Bookings dashboard
- View incoming client inquiries
- Change booking status (new, reviewing, contacted, confirmed, completed)
- Add private admin notes to inquiries

## Phase 10: Connect Public Frontend to CMS
- Replace hardcoded static data with Supabase queries
- Render dynamic projects on Work page
- Render dynamic services on Services page
- Connect Booking form to insert into the `bookings` table
- Integrate Cloudflare Stream playback in the frontend video player

## Phase 11: SEO + Site Settings
- Build Site Settings admin page
- Manage global contact info, social links, and SEO defaults
- Inject dynamic SEO tags into Next.js metadata API

## Phase 12: Security + Production QA
- Comprehensive security review
- Penetration testing of file uploads
- Performance optimization and caching strategies
- Final production deployment and hand-off
