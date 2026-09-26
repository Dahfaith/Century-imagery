-- Phase 2: Admin Authentication & RLS Policies

-- 1. Add Foreign Key and Unique constraint to profiles table to link to auth.users properly
ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);

-- 2. Create trigger to automatically create a profile when an auth.user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'editor');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Create a helper function to securely get the current user's role for RLS policies
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- 4. Apply Admin Write RLS Policies (Left pending from Phase 1)

-- profiles
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (public.get_user_role() IN ('super_admin', 'admin'));
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Super admins can update profiles" ON profiles FOR UPDATE USING (public.get_user_role() = 'super_admin');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- site_settings
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE USING (public.get_user_role() IN ('super_admin', 'admin'));

-- pages
CREATE POLICY "Admins can manage pages" ON pages FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- media
CREATE POLICY "Admins can manage media" ON media FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- projects
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- project_media
CREATE POLICY "Admins can manage project media" ON project_media FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- services
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- service_items
CREATE POLICY "Admins can manage service items" ON service_items FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- journal_posts
CREATE POLICY "Admins can manage journal posts" ON journal_posts FOR ALL USING (public.get_user_role() IN ('super_admin', 'admin', 'editor'));

-- bookings
CREATE POLICY "Admins can view bookings" ON bookings FOR SELECT USING (public.get_user_role() IN ('super_admin', 'admin'));
CREATE POLICY "Admins can update bookings" ON bookings FOR UPDATE USING (public.get_user_role() IN ('super_admin', 'admin'));
CREATE POLICY "Admins can delete bookings" ON bookings FOR DELETE USING (public.get_user_role() IN ('super_admin', 'admin'));
