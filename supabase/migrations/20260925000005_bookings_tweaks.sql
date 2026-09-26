-- 20260925000005_bookings_tweaks.sql

-- 1. Alter preferred_date to TEXT to accommodate flexible timelines (e.g. "October 2026 / Immediate")
ALTER TABLE public.bookings ALTER COLUMN preferred_date TYPE TEXT USING preferred_date::TEXT;

-- 2. Tighten public insert policy to prevent users from bypassing Next.js validation and setting admin notes
DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;
CREATE POLICY "Anyone can submit a booking" ON public.bookings
FOR INSERT WITH CHECK (
    status = 'new' AND admin_notes IS NULL
);
