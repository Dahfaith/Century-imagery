# Admin Authentication & Authorization

This document outlines the authentication and authorization implementation for the Century Imagery CMS (Phase 2).

## Authentication Method
The application uses **Supabase Auth** with email and password for administrator login. Public signups are intentionally disabled to ensure only invited personnel can access the admin backend.

The login page is located at `/admin/login`.

### Login Flow
1. **User Request**: The administrator enters their credentials at `/admin/login`.
2. **Supabase Verification**: The Next.js Server Action (`app/admin/actions.ts`) signs in with Supabase Auth.
3. **Session Establishment**: Supabase SSR sets the authenticated session cookies.
4. **Redirection**: On successful auth, the user is redirected to `/admin`.
5. **Middleware Protection**: The Next.js `middleware.ts` intercepts requests to `/admin/*`, validating the session server-side. If unauthenticated, it safely redirects the user back to `/admin/login`.

## Server-Side Authorization Model
Authentication merely confirms *who* the user is, but **Authorization** controls *what* they can do. 

The authorization is built around the `profiles` table which uses the following roles:
- `super_admin`: Full CMS access (Phase 2+).
- `admin`: Administrative access depending on final granular permissions.
- `editor`: Content editing access only.

### `requireAuth` Utility
The `lib/supabase/auth.ts` exports a reusable `requireAuth` function for future CMS route handlers and server actions.
It securely:
1. Validates the session server-side via `supabase.auth.getUser()`.
2. Queries the `profiles` table to retrieve the trusted role.
3. Aborts and redirects unauthorized users before executing any sensitive logic.

## Row Level Security (RLS)
The `supabase/migrations/20260925000001_admin_auth_rls.sql` migration finalizes the security foundation:
- A trigger automatically creates a `profile` entry (defaulting to `editor`) when a new `auth.user` is added.
- The `get_user_role()` secure SQL function checks the user's role.
- RLS policies grant `SELECT`, `UPDATE`, `INSERT`, and `DELETE` permissions to the CMS tables strictly based on the admin role, preventing unauthorized API or direct database tampering.

## Initial Super-Admin Setup Procedure
Because public registration is disabled, the first super-admin must be securely bootstrapped via the Supabase Dashboard:

1. **Create the User**: 
   - Log into your Supabase Dashboard.
   - Navigate to **Authentication** > **Users** > **Add User**.
   - Select **Send invitation** or **Create new user** using the founder's email (`akin@centuryimagery.com`).
   - If you select *Create new user*, ensure "Auto Confirm User?" is checked to skip email verification during initial setup.
   
2. **Assign the Super-Admin Role**:
   - The database trigger automatically creates a row in the `profiles` table for this new user, setting their role to `editor`.
   - Navigate to the **Table Editor** > `profiles`.
   - Find the newly created profile row.
   - Change the `role` column from `editor` to `super_admin` and click **Save**.

3. **Verify**:
   - Navigate to `/admin/login` on the application.
   - Sign in with the credentials.
   - You should successfully route to `/admin` and see your role listed as `super_admin`.

## Security Considerations
- **No Client Trust**: Roles and permissions are never read from local storage or unverified cookies. `supabase.auth.getUser()` verifies the JWT signature server-side.
- **Service Role Key**: Never exposed. Used only in isolated `admin.ts` scenarios where RLS bypass is intentionally needed.
- **Environment Variables**: Only the Supabase Anon Key and Project URL are exposed to the browser.
