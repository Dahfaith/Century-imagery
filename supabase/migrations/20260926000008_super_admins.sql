-- Upgrade existing accounts if they have already signed up
UPDATE public.profiles
SET role = 'super_admin'
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('iamdahfaith@gmail.com', 'centuryimagery@gmail.com', 'Centuryimagery@gmail.com')
);

-- Ensure future signups with these emails also get super_admin automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  IF lower(new.email) IN ('iamdahfaith@gmail.com', 'centuryimagery@gmail.com') THEN
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'super_admin');
  ELSE
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'editor');
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
