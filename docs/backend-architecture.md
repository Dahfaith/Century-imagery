# Century Imagery - Backend Architecture

## Overview

This document outlines the backend architecture for Century Imagery, a Next.js 15 application using a decoupled headless approach with Supabase and Cloudflare.

## Architecture

The production architecture is built on the following pillars:

- **Source Code**: GitHub
- **Application & API**: Next.js (App Router) on Vercel
- **Database & Auth**: Supabase (PostgreSQL)
- **Videos**: Cloudflare Stream
- **Images / Large Files**: Cloudflare R2 (planned)

### Data Flow

```
Century Admin
        |
        v
Supabase Auth (Admin Authentication)
        |
        v
Supabase Database (CMS Content)
        |
        +----------------------+
        |                      |
        v                      v
Cloudflare Stream          Cloudflare R2
(Videos)                   (Images/files)
        |
        v
Public Century Website
```

## 1. Supabase (Database & Auth)

Supabase serves as the primary data store and authentication provider. 

**Authentication**: 
- Uses Supabase Auth to handle secure login for administrators and editors.
- Public signup is disabled.

**Database Schema**:
- `profiles`: User information and roles (`super_admin`, `admin`, `editor`).
- `site_settings`: Global website configuration and SEO.
- `pages`: Content for static pages (Homepage, About, etc.) with structured JSON.
- `projects`: Portfolio projects.
- `services` & `service_items`: Century divisions and their specific offerings.
- `journal_posts`: Blog and news articles.
- `media`: Centralized media registry (references Cloudflare Stream and R2 assets).
- `project_media`: Junction table linking projects to multiple media assets.
- `bookings`: Client inquiry records.

**Security**:
- Row Level Security (RLS) is enabled on all CMS tables.
- Public policies allow read-only access to published content.
- Admin policies (to be fully implemented in Phase 2) require valid authenticated sessions to write data.
- The `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server-side code.

## 2. Media Delivery

### Cloudflare Stream (Videos)

To handle large cinematic files efficiently without taxing the Next.js server, we use **Direct Creator Uploads**:

1. Client requests an upload URL from the Next.js server.
2. Next.js server requests a one-time upload URL from Cloudflare using the secure `CLOUDFLARE_STREAM_API_TOKEN`.
3. The Next.js server returns the one-time URL to the client.
4. The client browser uploads the video directly to Cloudflare.
5. Once processed, the Cloudflare video UID is saved in the Supabase `media` table.
6. The video is delivered securely and adaptively via Cloudflare Stream.

### Cloudflare R2 (Images)

R2 is planned for future phases to handle high-resolution image uploads and general media storage, replacing static GitHub-hosted assets.

## 3. Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: The public URL of the Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous key for Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: The secret service role key (SERVER ONLY).
- `CLOUDFLARE_ACCOUNT_ID`: The Cloudflare account ID (SERVER ONLY).
- `CLOUDFLARE_STREAM_API_TOKEN`: The API token with Stream write permissions (SERVER ONLY).

## 4. Next.js Utilities

- `lib/supabase/client.ts`: Used in Client Components.
- `lib/supabase/server.ts`: Used in Server Components, Server Actions, and Route Handlers (handles cookies).
- `lib/supabase/admin.ts`: Used strictly on the server to bypass RLS for administrative tasks.
- `lib/cloudflare/stream.ts`: Server-only utility for interacting with the Cloudflare Stream API.
