-- 20260926000009_booking_notifications.sql

ALTER TABLE public.bookings
ADD COLUMN admin_notified BOOLEAN DEFAULT false,
ADD COLUMN client_notified BOOLEAN DEFAULT false;
