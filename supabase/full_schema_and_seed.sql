-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE: profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- references auth.users(id) but we'll leave out the hard FK to auth.users if not standard, though standard is `REFERENCES auth.users(id) ON DELETE CASCADE`
    full_name TEXT,
    role TEXT DEFAULT 'editor',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Optional: if auth schema exists
-- ALTER TABLE profiles ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- TABLE: site_settings
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT,
    site_description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    address TEXT,
    footer_tagline TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    tiktok_url TEXT,
    linkedin_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    seo_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: pages
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    seo_title TEXT,
    seo_description TEXT,
    seo_image_url TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- TABLE: media
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT,
    original_filename TEXT,
    media_type TEXT,
    mime_type TEXT,
    file_size BIGINT,
    provider TEXT,
    provider_asset_id TEXT,
    provider_url TEXT,
    thumbnail_url TEXT,
    playback_url TEXT,
    duration_seconds NUMERIC,
    width INTEGER,
    height INTEGER,
    status TEXT DEFAULT 'processing',
    alt_text TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT,
    category TEXT,
    year INTEGER,
    location TEXT,
    short_description TEXT,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'draft',
    cover_media_id UUID REFERENCES media(id) ON DELETE SET NULL,
    hero_media_id UUID REFERENCES media(id) ON DELETE SET NULL,
    seo_title TEXT,
    seo_description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- TABLE: project_media
CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    media_type TEXT,
    sort_order INTEGER DEFAULT 0,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    icon TEXT,
    cover_media_id UUID REFERENCES media(id) ON DELETE SET NULL,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: service_items
CREATE TABLE service_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: journal_posts
CREATE TABLE journal_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    cover_media_id UUID REFERENCES media(id) ON DELETE SET NULL,
    author_name TEXT,
    status TEXT DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE: bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    project_name TEXT,
    preferred_date DATE,
    location TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Site settings are viewable by everyone." ON site_settings FOR SELECT USING (true);
CREATE POLICY "Published pages are viewable by everyone." ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Media is viewable by everyone." ON media FOR SELECT USING (true);
CREATE POLICY "Published projects are viewable by everyone." ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Project media is viewable by everyone." ON project_media FOR SELECT USING (true);
CREATE POLICY "Published services are viewable by everyone." ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Service items are viewable by everyone." ON service_items FOR SELECT USING (true);
CREATE POLICY "Published journal posts are viewable by everyone." ON journal_posts FOR SELECT USING (status = 'published');

-- BOOKINGS: Public can insert, only admins can read/update (read/update pending Phase 2)
CREATE POLICY "Anyone can submit a booking" ON bookings FOR INSERT WITH CHECK (true);

-- PENDING POLICIES (PHASE 2 - Admin Authentication)
-- The following policies will be implemented in Phase 2 when the auth architecture is established:
-- CREATE POLICY "Admin full access on profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on media" ON media FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on project_media" ON project_media FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on services" ON services FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on service_items" ON service_items FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on journal_posts" ON journal_posts FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access on bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
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
-- Seed official services if they do not exist
INSERT INTO services (slug, title, status, sort_order)
VALUES 
    ('film-cinema-production', 'Film & Cinema Production', 'published', 1),
    ('commercial-brand-production', 'Commercial & Brand Production', 'published', 2),
    ('luxury-event-cinema', 'Luxury Event Cinema', 'published', 3),
    ('photography-division', 'Photography Division', 'published', 4),
    ('aerial-specialized', 'Aerial & Specialized', 'published', 5),
    ('century-post-lab', 'The Century Post Lab', 'published', 6),
    ('production-support', 'Production Support', 'published', 7)
ON CONFLICT (slug) DO NOTHING;
-- Seed official structured pages if they do not exist
INSERT INTO pages (slug, title, status, content)
VALUES 
    ('home', 'Homepage', 'published', '{"hero": {"eyebrow": "VISUAL STORYTELLING", "heading": "CENTURY IMAGERY", "description": "Crafting cinematic experiences that transcend the ordinary. We specialize in luxury events, brand narratives, and visual arts.", "cta_text": "View Our Work", "cta_link": "/work"}, "about_preview": {"heading": "BEYOND THE LENS", "text": "We are a collective of visual artists dedicated to capturing the essence of your story. Our approach blends technical precision with raw emotional intelligence.", "link_text": "Discover Our Story"}}'::jsonb),
    ('about', 'About Us', 'published', '{"hero": {"heading": "ABOUT CENTURY", "description": "A legacy of visual excellence."}, "bio": {"heading": "AKIN IDOWU", "text": "Founder and lead director..."}, "statement": {"text": "We believe in the power of visual storytelling to move, inspire, and endure."}}'::jsonb),
    ('services', 'Services Overview', 'published', '{"hero": {"heading": "OUR SERVICES", "description": "Comprehensive visual production services from concept to post-production."}, "cta": {"heading": "READY TO CREATE?", "text": "Let us bring your vision to life."}}'::jsonb),
    ('booking', 'Booking Information', 'published', '{"hero": {"heading": "BOOKING", "description": "Start your journey with Century Imagery."}, "instructions": {"heading": "HOW IT WORKS", "text": "Fill out the inquiry form below and our team will get back to you within 24 hours to schedule a consultation."}}'::jsonb)
ON CONFLICT (slug) DO NOTHING;
-- 20260925000004_seed_journal.sql

DO $$
BEGIN

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'the-geometry-of-light-in-lagos') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'the-geometry-of-light-in-lagos',
      'The Geometry of Light in Lagos: Framing the Unseen',
      'An exploration of how harsh equatorial sunlight dictates the cinematic rhythm of West African storytelling.',
      'Akin Idowu',
      'published',
      true,
      'The Geometry of Light in Lagos | Century Imagery',
      'Exploring cinematic lighting techniques and the rhythm of West African storytelling on location in Lagos.',
      NOW(),
      '{
        "blocks": [
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111111",
            "type": "heading",
            "content": "Embracing the Harsh African Sun"
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111112",
            "type": "paragraph",
            "content": "Lagos doesn''t ease you into the day. The sun hits the pavement with an uncompromising intensity by 8 AM, throwing sharp, high-contrast shadows across the brutalist architecture of the mainland. For a cinematographer, this presents a unique challenge: do you fight the natural contrast with massive diffusion, or do you lean into the geometry of the shadows? During our recent production for the Rebel Empire campaign, we chose the latter."
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111113",
            "type": "heading",
            "content": "Silhouettes as Storytellers"
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111114",
            "type": "paragraph",
            "content": "By exposing for the highlights, we let the shadows fall into a deep, rich black. This naturally created silhouettes that emphasized the form and movement of our subjects against the vibrant, chaotic backdrop of the Balogun market. Itâ€™s a visual language that speaks to the resilience and underlying mystery of the city itselfâ€”what is hidden in the shadows is often just as important as what is illuminated."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'directors-notes-narrative-in-60-seconds') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'directors-notes-narrative-in-60-seconds',
      'Director''s Notes: Condensing Narrative into 60 Seconds',
      'How to establish character, conflict, and resolution in the blink of an eye for modern commercial formats.',
      'Century Studio',
      'published',
      false,
      'Commercial Directing: 60 Second Narratives',
      'Learn how to establish character, conflict, and resolution for modern commercial formats.',
      NOW() - INTERVAL '3 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222221",
            "type": "heading",
            "content": "The Economy of Frames"
          },
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222222",
            "type": "paragraph",
            "content": "When you have 60 seconds (or increasingly, 15 seconds for social formats), every single frame must carry narrative weight. You don''t have the luxury of a slow pan to establish the geography; the geography must be immediately understood by the color palette, the production design, and the first action the character takes."
          },
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222223",
            "type": "paragraph",
            "content": "In our recent work for a global luxury brand, we had to convey heritage, precision, and modernity in a single sequence. We achieved this by matching the kinetic energy of a contemporary dancer with the slow, deliberate macro shots of a watchmaker. The juxtaposition created a dialecticâ€”the old world precision meeting new world energyâ€”without a single line of dialogue."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'behind-the-scenes-nocturne-campaign') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'behind-the-scenes-nocturne-campaign',
      'Behind the Scenes: The Nocturne Campaign',
      'Rigging heavy cameras to high-speed drones for an ambitious continuous one-take sequence through a moving train.',
      'Technical Team',
      'published',
      false,
      'Behind the Scenes: Nocturne Drone Rigging',
      'Technical breakdown of rigging heavy cameras to high-speed drones for a continuous one-take.',
      NOW() - INTERVAL '10 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333331",
            "type": "heading",
            "content": "Defying Physics"
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333332",
            "type": "paragraph",
            "content": "The brief sounded impossible: start wide over the savannah, push in through the open window of a moving locomotive, navigate the narrow dining car past talent, and exit the rear door, pulling up into a wide shotâ€”all in one continuous, seamless take. No hidden cuts. No CGI transitions."
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333333",
            "type": "heading",
            "content": "Custom FPV Solutions"
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333334",
            "type": "paragraph",
            "content": "Standard heavy-lift drones couldn''t fit through the window, and typical FPV cinewhoops couldn''t carry the cinema glass the director demanded. Our specialized aerial unit spent three weeks designing a custom 3D-printed rig that could safely carry a stripped-down RED Komodo with a lightweight prime lens. The result was a rig that had a margin of error of less than 2 inches on either side as it passed through the train window at 30 miles per hour."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'color-grading-the-feeling-of-nostalgia') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'color-grading-the-feeling-of-nostalgia',
      'Color Grading: Engineering the Feeling of Nostalgia',
      'Why halation, grain structure, and lifted blacks evoke emotional responses from audiences.',
      'Century Post Lab',
      'published',
      false,
      'Color Grading Nostalgia | Post Production',
      'Understanding how halation, grain structure, and lifted blacks evoke emotional responses.',
      NOW() - INTERVAL '15 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444441",
            "type": "paragraph",
            "content": "Digital sensors are perfect. They capture an incredible amount of dynamic range with absolute clinical precision, virtually no noise, and perfect color fidelity. And yet, the first thing we do in the color suite is try to break that perfection."
          },
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444442",
            "type": "heading",
            "content": "The Psychology of Film Emulation"
          },
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444443",
            "type": "paragraph",
            "content": "Why do audiences respond to the imperfections of celluloid? It''s deeply psychological. Film grain mimics the organic imperfection of human memory. We don''t remember events in crisp 8K resolution; we remember the feeling, the warmth, the slight blur of motion. By lifting the black levels slightly to reduce contrast, introducing sub-pixel halation around bright light sources, and applying a custom print film LUT, we are essentially signaling to the viewer''s brain: ''This is a memory. This is important.''"
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'the-future-of-virtual-production-in-africa') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'the-future-of-virtual-production-in-africa',
      'The Future of Virtual Production in Africa',
      'How LED volumes are democratizing high-concept sci-fi and fantasy storytelling for local filmmakers.',
      'Akin Idowu',
      'published',
      true,
      'Virtual Production in Africa',
      'How LED volumes are democratizing high-concept sci-fi and fantasy storytelling.',
      NOW() - INTERVAL '30 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555551",
            "type": "heading",
            "content": "Beyond Green Screens"
          },
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555552",
            "type": "paragraph",
            "content": "For decades, African filmmakers with ambitious sci-fi or fantasy scripts were hampered by the sheer cost of post-production VFX and the unconvincing lighting problems inherent to green screen shoots. Virtual productionâ€”shooting on a stage surrounded by high-resolution LED screens displaying real-time 3D environments rendered in Unreal Engineâ€”is completely changing the calculus."
          },
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555553",
            "type": "paragraph",
            "content": "Because the LED screens physically emit light, the actors are actually illuminated by the virtual environment. A scene set on a neon-drenched cyberpunk street in 2100 Lagos casts genuine, accurate reflections on the characters'' skin and props in-camera. This not only dramatically reduces post-production costs but allows the director and actors to actually see and react to the world they are performing in. It is a paradigm shift that is finally leveling the playing field for global storytelling."
          }
        ]
      }'::jsonb
    );
  END IF;

END $$;
-- 20260925000005_bookings_tweaks.sql

-- 1. Alter preferred_date to TEXT to accommodate flexible timelines (e.g. "October 2026 / Immediate")
ALTER TABLE public.bookings ALTER COLUMN preferred_date TYPE TEXT USING preferred_date::TEXT;

-- 2. Tighten public insert policy to prevent users from bypassing Next.js validation and setting admin notes
DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;
CREATE POLICY "Anyone can submit a booking" ON public.bookings
FOR INSERT WITH CHECK (
    status = 'new' AND admin_notes IS NULL
);
-- Full Data Seed from Original Static Files

-- SCHEMA FIXES
ALTER TABLE projects ALTER COLUMN year TYPE text USING year::text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS credits JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]'::jsonb;
ALTER TABLE journal_posts ADD COLUMN IF NOT EXISTS category TEXT;

-- SERVICES

UPDATE services 
SET 
  short_description = 'Feature film cinematography, documentaries, and auteur-grade music video direction.',
  description = 'Crafted to the exacting standards of international cinema. From narrative feature films and compelling documentaries to high-concept music video production, we direct moving images with cinematic depth and emotional resonance.',
  status = 'published',
  sort_order = 1
WHERE slug = 'film-cinema-production';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'film-cinema-production', 'Film & Cinema Production', 'Feature film cinematography, documentaries, and auteur-grade music video direction.', 'Crafted to the exacting standards of international cinema. From narrative feature films and compelling documentaries to high-concept music video production, we direct moving images with cinematic depth and emotional resonance.', 'published', 1
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'film-cinema-production');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Feature Film Cinematography', 1 FROM services WHERE slug = 'film-cinema-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Short Films & Documentaries', 2 FROM services WHERE slug = 'film-cinema-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Music Video Direction & Production', 3 FROM services WHERE slug = 'film-cinema-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Film Directing & Producing', 4 FROM services WHERE slug = 'film-cinema-production'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Broadcast TV commercials, digital ads, and luxury fashion & beauty campaigns.',
  description = 'We architect high-impact brand campaign films and commercial narratives for discerning brands, translating corporate vision and product artistry into unforgettable motion pictures.',
  status = 'published',
  sort_order = 2
WHERE slug = 'commercial-brand-production';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'commercial-brand-production', 'Commercial & Brand Production', 'Broadcast TV commercials, digital ads, and luxury fashion & beauty campaigns.', 'We architect high-impact brand campaign films and commercial narratives for discerning brands, translating corporate vision and product artistry into unforgettable motion pictures.', 'published', 2
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'commercial-brand-production');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'TV Commercials & Digital Ads', 1 FROM services WHERE slug = 'commercial-brand-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Brand Films & Corporate Stories', 2 FROM services WHERE slug = 'commercial-brand-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Fashion & Beauty Campaigns', 3 FROM services WHERE slug = 'commercial-brand-production'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Product Commercials', 4 FROM services WHERE slug = 'commercial-brand-production'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Century Legacy wedding films, nightlife cinematography, and multi-cam live production.',
  description = 'Transforming once-in-a-lifetime celebrations into timeless cinematic heirlooms. We capture bespoke weddings, high-society galas, and immersive nightlife with refined discretion and cinematic flair.',
  status = 'published',
  sort_order = 3
WHERE slug = 'luxury-event-cinema';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'luxury-event-cinema', 'Luxury Event Cinema', 'Century Legacy wedding films, nightlife cinematography, and multi-cam live production.', 'Transforming once-in-a-lifetime celebrations into timeless cinematic heirlooms. We capture bespoke weddings, high-society galas, and immersive nightlife with refined discretion and cinematic flair.', 'published', 3
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'luxury-event-cinema');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Century Legacy Wedding Films', 1 FROM services WHERE slug = 'luxury-event-cinema'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Luxury Event Coverage', 2 FROM services WHERE slug = 'luxury-event-cinema'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'After Dark â€” Nightlife & Lounge Cinematography', 3 FROM services WHERE slug = 'luxury-event-cinema'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Live Event Multi-Cam Production', 4 FROM services WHERE slug = 'luxury-event-cinema'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Film-grade DaVinci color grading, story cutting, sound design, and 4K mastering.',
  description = 'Our dedicated post-production lab brings every frame to master perfection. Precision narrative cutting, bespoke soundscapes, motion graphics, and multi-format delivery tailored to global broadcast and mobile cinema.',
  status = 'published',
  sort_order = 4
WHERE slug = 'century-post-lab';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'century-post-lab', 'The Century Post Lab', 'Film-grade DaVinci color grading, story cutting, sound design, and 4K mastering.', 'Our dedicated post-production lab brings every frame to master perfection. Precision narrative cutting, bespoke soundscapes, motion graphics, and multi-format delivery tailored to global broadcast and mobile cinema.', 'published', 4
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'century-post-lab');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Cinematic Editing & Story Cutting', 1 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Film-Grade Color Grading (DaVinci Resolve)', 2 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Sound Design & Score Mixing', 3 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Motion Graphics & Visual Effects', 4 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Trailer & Teaser Cuts', 5 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, '4K Mastering & Multi-Format Delivery (16:9, 9:16, 1:1)', 6 FROM services WHERE slug = 'century-post-lab'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Licensed 4K/6K drone cinematography, high-speed capture, and studio lighting.',
  description = 'Expanding the physical boundaries of cinema. Utilizing certified high-altitude drone systems, high-frame-rate slow-motion cameras, and specialized lighting setups for complex location environments.',
  status = 'published',
  sort_order = 5
WHERE slug = 'aerial-specialized';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'aerial-specialized', 'Aerial & Specialized', 'Licensed 4K/6K drone cinematography, high-speed capture, and studio lighting.', 'Expanding the physical boundaries of cinema. Utilizing certified high-altitude drone systems, high-frame-rate slow-motion cameras, and specialized lighting setups for complex location environments.', 'published', 5
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'aerial-specialized');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Licensed Drone Cinematography (4K/6K)', 1 FROM services WHERE slug = 'aerial-specialized'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Slow Motion & High-Speed Capture', 2 FROM services WHERE slug = 'aerial-specialized'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Studio & Location Lighting Setup', 3 FROM services WHERE slug = 'aerial-specialized'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Stunning editorial, commercial, fashion, and lifestyle photography.',
  description = 'High-fashion editorial stills and commercial photography that complement our motion picture work, capturing light and human character with sculptural poise.',
  status = 'published',
  sort_order = 6
WHERE slug = 'photography-division';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'photography-division', 'Photography Division', 'Stunning editorial, commercial, fashion, and lifestyle photography.', 'High-fashion editorial stills and commercial photography that complement our motion picture work, capturing light and human character with sculptural poise.', 'published', 6
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'photography-division');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Editorial & Commercial Photography', 1 FROM services WHERE slug = 'photography-division'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Fashion & Lifestyle Shoots', 2 FROM services WHERE slug = 'photography-division'
ON CONFLICT DO NOTHING;

UPDATE services 
SET 
  short_description = 'Creative direction, concept development, location scouting, casting, and crew hire.',
  description = 'Full-scale production infrastructure for visiting international crews and domestic productions. We provide comprehensive creative leadership, top-tier cinema equipment rental, and vetted technical personnel.',
  status = 'published',
  sort_order = 7
WHERE slug = 'production-support';

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT 'production-support', 'Production Support', 'Creative direction, concept development, location scouting, casting, and crew hire.', 'Full-scale production infrastructure for visiting international crews and domestic productions. We provide comprehensive creative leadership, top-tier cinema equipment rental, and vetted technical personnel.', 'published', 7
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'production-support');

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Creative Direction & Concept Development', 1 FROM services WHERE slug = 'production-support'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Location Scouting & Casting', 2 FROM services WHERE slug = 'production-support'
ON CONFLICT DO NOTHING;

INSERT INTO service_items (service_id, title, sort_order)
SELECT id, 'Equipment Rental & Crew Hire', 3 FROM services WHERE slug = 'production-support'
ON CONFLICT DO NOTHING;

-- PROJECTS

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'rebel-empire-osogbo',
  'Rebel Empire: Nocturne Ascendant',
  'Club Rebel Empire, Osogbo',
  'ENTERTAINMENT',
  '2024 â€“ 2026',
  'Osogbo, Osun State, Nigeria',
  'Serving as primary video architect to capture the pulse, high-octane lighting, and nocturnal prestige of Osogboâ€™s landmark nightlife empire.',
  'Century Imagery was commissioned as the foundational video architect for Club Rebel Empire. Crafting after-dark cinematography that translates pulsating soundscapes and high-energy nightlife into cinematic visual art.',
  '[{"role":"Executive Video Architect","name":"Akin Idowu"},{"role":"Production Unit","name":"Century Imagery LLC"},{"role":"Client Partner","name":"Club Rebel Empire"},{"role":"Color & Finishing","name":"The Century Post Lab"}]'::jsonb,
  '["ENTERTAINMENT"]'::jsonb,
  'published',
  1
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'oyo-state-armed-forces-remembrance',
  'Oyo State Armed Forces Day (Tri-Year Protocol)',
  'Government of Oyo State',
  'DOCUMENTARY',
  '2023 â€“ 2025',
  'Ibadan, Oyo State, Nigeria',
  'Documenting the ceremonial solemnity, executive parade, and military honors of Oyo State Armed Forces Remembrance Day across three consecutive years.',
  'Trusted by state executive protocol to architect the official multi-camera documentary archive of Oyo State Armed Forces Remembrance Day across three consecutive editions. Capturing solemn military wreaths, executive addresses, and historical honor with dignity.',
  '[{"role":"Lead Documentary Director","name":"Akin Idowu"},{"role":"Commissioning Authority","name":"Oyo State Government Protocol"},{"role":"Cinematography Unit","name":"Century Imagery LLC"},{"role":"Aerial Unit","name":"Century Flight Labs"}]'::jsonb,
  '["DOCUMENTARY"]'::jsonb,
  'published',
  2
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'dj-tunez-live-experiences',
  'DJ Tunez: Sound & Vibrations',
  'DJ Tunez / Starboy Worldwide',
  'MUSIC',
  '2024',
  'Lagos & Tour Circuits',
  'Electric concert cinematography and visual motion capturing global Afrobeats ambassador DJ Tunez in full sonic flight.',
  'Capturing the kinetic synergy between DJ Tunez, star guest performers, and tens of thousands of revellers. Fast anamorphic camera tracks, bass-sync cuts, and vibrant festival grading that crossed over 400,000+ views.',
  '[{"role":"Cinematographer & Director","name":"Akin Idowu"},{"role":"Featured Artist","name":"DJ Tunez"},{"role":"Production Company","name":"Century Imagery LLC"},{"role":"Editor","name":"The Century Post Lab"}]'::jsonb,
  '["MUSIC"]'::jsonb,
  'published',
  3
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'utiva-future-of-tech',
  'Utiva: Accelerating African Tech Talent',
  'Utiva International',
  'CORPORATE',
  '2024',
  'Lagos, Nigeria',
  'Human-centric corporate cinema documenting the transformative impact of African tech talent across the continent.',
  'Produced for premier tech learning accelerator Utiva. Blending high-production office narrative cinematography, inspiring student journeys, and sleek modern motion design to articulate tech empowerment.',
  '[{"role":"Director","name":"Akin Idowu"},{"role":"Brand Partner","name":"Utiva"},{"role":"Cinematography Unit","name":"Century Imagery LLC"}]'::jsonb,
  '["CORPORATE"]'::jsonb,
  'published',
  4
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'iconic-legacies-public-figures',
  'Iconic Legacies: High Profiles & Cultural Dignitaries',
  'Prominent Public Figures & Dignitaries',
  'CULTURAL',
  '2025',
  'Ibadan & Lagos, Nigeria',
  'Intimate, high-contrast portraiture and legacy documentation for revered public figures, traditional icons, and statesmen.',
  'Commissioned to capture private celebrations, leadership retrospectives, and cultural milestones with the utmost discretion, dignified optical composition, and film-grade DaVinci Resolve color timing.',
  '[{"role":"Director & Lead Camera","name":"Akin Idowu"},{"role":"Production Unit","name":"Century Imagery LLC"},{"role":"Mastering","name":"The Century Post Lab"}]'::jsonb,
  '["CULTURAL"]'::jsonb,
  'published',
  5
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  'century-legacy-wedding-cinema',
  'The Sovereign Union: Luxury Event Cinema',
  'Century Legacy Private Commissions',
  'ENTERTAINMENT',
  '2025',
  'Ibadan & Lagos, Nigeria',
  'A multi-camera heirloom film preserving the grandeur, traditional royalty, and emotional intimacy of high-society wedding celebration.',
  'A hallmark Century Imagery luxury wedding production. Mastered in 4K DCI with live sound score capture and film-grade DaVinci color grading to transform once-in-a-lifetime vows into an everlasting motion picture heirloom.',
  '[{"role":"Director","name":"Akin Idowu"},{"role":"Camera Unit","name":"Century Imagery LLC"},{"role":"Sound Design","name":"The Century Post Lab"}]'::jsonb,
  '["ENTERTAINMENT"]'::jsonb,
  'published',
  6
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  location = EXCLUDED.location,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  services = EXCLUDED.services,
  status = 'published';

-- JOURNAL

INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  'the-geometry-of-light-in-lagos',
  'The Geometry of Light: Capturing West African Daylight on Anamorphic Glass',
  'Cinematography',
  'A technical and aesthetic reflection on balancing intense midday equatorial sunshine with deep architectural shadow play.',
  '{"blocks":[{"type":"paragraph","content":"Shooting in coastal West Africa presents an optical contrast unlike anywhere else in the world. The sunlight is direct, golden, and mercilessly sharp. If approached with standard European diffusion techniques, one risks flattening the rich, dynamic vitality that defines this territory."},{"type":"paragraph","content":"In this breakdown, we examine our lighting package for our latest editorial piece, utilizing vintage Russian prime lenses paired with custom diffusion to achieve an organic texture."},{"type":"paragraph","content":"By embracing negative fillâ€”blocking light rather than adding artificial bounceâ€”we sculpted deep, velvety blacks against glowing skin highlights. This contrast ratio forms the visual signature of Century Imagery LLC."},{"type":"paragraph","content":"In The Century Post Lab, we built bespoke film-emulation curves in DaVinci Resolve, pulling subtle warm gold into the roll-off highlights while maintaining absolute neutrality in the deep shadow detail."},{"type":"quote","content":"Daylight in coastal Lagos is not a passive element; it is an active optical character with visceral texture and fierce intensity."},{"type":"paragraph","content":"Specs: ARRI Alexa Mini LF, Cooke Anamorphic /i Full Frame Plus, Tiffen Black Pro-Mist 1/4, DaVinci Resolve 19 Studio"}]}'::jsonb,
  'Akin Idowu',
  TRUE,
  'published',
  '2025-09-01T07:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';

INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  'directors-notes-narrative-in-60-seconds',
  'Director''s Notes: Sculpting Narrative Emotion in Under 60 Seconds',
  'Director''s Notes',
  'How deliberate pacing, macro framing, and dynamic sound design tell an entire brand story before the viewer looks away.',
  '{"blocks":[{"type":"paragraph","content":"The sixty-second format is the ultimate crucible of cinematic discipline. With zero tolerance for ornamental excess, each transition must deliver dramatic revelation."},{"type":"paragraph","content":"When directing commercial films for luxury brands, we often start by designing the soundscape before the camera rolls. A heartbeat rhythm, the tactile strike of a lighter, or the rustle of raw silk can anchor the audience before the visual cut occurs."},{"type":"paragraph","content":"When image and auditory pacing lock into synchrony, sixty seconds feels expansiveâ€”a full narrative journey rendered with cinematic weight."},{"type":"quote","content":"Commercial films must make every single frame justify its existence. The art lies not in packing more visual information, but in crafting moments of negative space."},{"type":"paragraph","content":"Specs: RED V-Raptor 8K VV, Atlas Orion 2x Anamorphic, Sound Devices 833 / Custom Foley"}]}'::jsonb,
  'Akin Idowu',
  FALSE,
  'published',
  '2025-08-01T07:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';

INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  'behind-the-scenes-nocturne-campaign',
  'Behind The Scenes: Lighting the Shadows of Nocturne Velvet',
  'Behind The Scenes',
  'On set with the camera team in Abuja: rigged gimbals, haze atmospheres, and warm tungsten lighting setups.',
  '{"blocks":[{"type":"paragraph","content":"Nocturne Velvet required us to shoot in an authentic brutalist cellar with minimal ambient luminance. Our mandate: keep the image rich and luxurious without slipping into muddy underexposure."},{"type":"paragraph","content":"We deployed a low-wattage tungsten package hidden behind architectural columns, projecting micro-pools of 2800K warmth that kissed glassware and reflective bar surfaces."},{"type":"paragraph","content":"Using haze as an optical diffuser, light beams became tangible ribbons in space, creating dimension and depth without clouding skin tones."},{"type":"quote","content":"Building a nocturnal mood requires darkness to be treated as a physical material rather than just the absence of light."},{"type":"paragraph","content":"Specs: Sony FX9 / FX3 Rigged Gimbal, Dedo Light Tungsten Package, Hazer Atmos System"}]}'::jsonb,
  'Century Imagery Production Team',
  FALSE,
  'published',
  '2025-07-01T07:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';

INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  'the-rebirth-of-african-luxury-cinema',
  'Culture & Aesthetics: The Global Rebirth of African Luxury Cinema',
  'Culture',
  'How contemporary African directors are redefining luxury visual storytelling across fashion, music, and international brand campaigns.',
  '{"blocks":[{"type":"paragraph","content":"A seismic shift is unfolding in global visual culture. From Lagos and Accra to Johannesburg, African filmmakers are establishing a fresh cinematic grammar."},{"type":"paragraph","content":"It is characterized by unapologetic color palettes, monumental architectural framing, and an innate reverence for legacy celebrations."},{"type":"paragraph","content":"At Century Imagery LLC, we stand at the vanguard of this movementâ€”proving that the highest tier of commercial and narrative cinema can be conceptualized and produced entirely in West Africa for the world''s most discerning audiences."},{"type":"quote","content":"We are no longer translating our culture for external validation; we are setting the aesthetic agenda for global cinema."},{"type":"paragraph","content":"Specs: Anamorphic 35mm Format, West African Natural Light, Handcrafted Set Production"}]}'::jsonb,
  'Akin Idowu',
  FALSE,
  'published',
  '2025-06-01T07:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';

INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  'architecting-the-visual-brand-campaign',
  'Campaigns: Architecting a Visual Identity from Treatment to Broadcast',
  'Campaigns',
  'Inside the conceptual journey: pitch treatments, production design supervision, and post-production execution.',
  '{"blocks":[{"type":"paragraph","content":"Before a camera rig is assembled or a location secured, the success of a campaign film is determined in the treatment phase."},{"type":"paragraph","content":"We collaborate closely with brand leaders to identify the core emotional archetype. Are we evoking quiet reverence, nocturnal mystery, or kinetic rebellion?"},{"type":"paragraph","content":"Once that core frequency is established, every departmentâ€”costume, lighting, lens choice, and soundâ€”operates in harmonious alignment."},{"type":"quote","content":"A campaign film without a distinct optical thesis is merely moving noise."},{"type":"paragraph","content":"Specs: Cinema Optical Treatment, Storyboard Concept Art, 4K Deliverable Package"}]}'::jsonb,
  'Akin Idowu',
  FALSE,
  'published',
  '2025-05-01T07:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';
-- Legacy Media Seed

-- Ensure all existing media rows have thumbnails and playback URLs populated
UPDATE media SET thumbnail_url = COALESCE(thumbnail_url, provider_url), playback_url = COALESCE(playback_url, provider_url) WHERE thumbnail_url IS NULL OR playback_url IS NULL;

-- 1. MEDIA INSERTS

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '32c9cfaf-fdcf-4b20-9c87-62ac38f17b81',
  'hero.MP4',
  13461642,
  'video/mp4',
  'video',
  'r2',
  '/videos/hero.MP4',
  '/videos/hero.MP4',
  '/videos/hero.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'fa918deb-e196-40c5-8f3d-3c3fdfca6084',
  'rebel-empire.jpg',
  44342,
  'image/jpeg',
  'image',
  'r2',
  '/projects/rebel-empire.jpg',
  '/projects/rebel-empire.jpg',
  '/projects/rebel-empire.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '36a7cd68-89ed-460f-8445-aae7dbd0e895',
  'film-cinema.jpg',
  90608,
  'image/jpeg',
  'image',
  'r2',
  '/services/film-cinema.jpg',
  '/services/film-cinema.jpg',
  '/services/film-cinema.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05',
  'photography.jpg',
  120218,
  'image/jpeg',
  'image',
  'r2',
  '/services/photography.jpg',
  '/services/photography.jpg',
  '/services/photography.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '24a036b5-7175-459f-84d5-f94c8d3b2245',
  'armed-forces.MP4',
  13461642,
  'video/mp4',
  'video',
  'r2',
  '/projects/armed-forces.MP4',
  '/projects/armed-forces.MP4',
  '/projects/armed-forces.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'c2268b2f-68c1-4012-825d-1eb7676919ad',
  'hero-mockup-gold.png',
  812728,
  'image/png',
  'image',
  'r2',
  '/brand/hero-mockup-gold.png',
  '/brand/hero-mockup-gold.png',
  '/brand/hero-mockup-gold.png',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '41217c30-95cc-4fc6-a018-dd3c202ff530',
  'post-lab.jpg',
  63481,
  'image/jpeg',
  'image',
  'r2',
  '/services/post-lab.jpg',
  '/services/post-lab.jpg',
  '/services/post-lab.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '1534af73-d150-4ccd-b9b3-840b2fb369c5',
  'production-support.jpg',
  63481,
  'image/jpeg',
  'image',
  'r2',
  '/services/production-support.jpg',
  '/services/production-support.jpg',
  '/services/production-support.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '3409126a-40a0-4c49-805f-998d1170ed16',
  'luxury-event.jpg',
  29380,
  'image/jpeg',
  'image',
  'r2',
  '/services/luxury-event.jpg',
  '/services/luxury-event.jpg',
  '/services/luxury-event.jpg',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'f3d05fdc-258b-4ca1-9067-d201ae78ea86',
  'dj-tunez.MP4',
  10172755,
  'video/mp4',
  'video',
  'r2',
  '/projects/dj-tunez.MP4',
  '/projects/dj-tunez.MP4',
  '/projects/dj-tunez.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '2d75fe52-38f5-4270-940e-f167c5ce1da7',
  'utiva.MP4',
  3014656,
  'video/mp4',
  'video',
  'r2',
  '/projects/utiva.MP4',
  '/projects/utiva.MP4',
  '/projects/utiva.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'e37994ad-9c03-4529-89e1-1c5c5c4be66a',
  'public-figures.MP4',
  7944892,
  'video/mp4',
  'video',
  'r2',
  '/projects/public-figures.MP4',
  '/projects/public-figures.MP4',
  '/projects/public-figures.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'c0eb7654-3c68-4cab-b7a7-7adb3f6401cf',
  'wedding-cinema.MP4',
  2646011,
  'video/mp4',
  'video',
  'r2',
  '/projects/wedding-cinema.MP4',
  '/projects/wedding-cinema.MP4',
  '/projects/wedding-cinema.MP4',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'e47a24c1-1796-4cda-8bd9-632745f91ba2',
  'commercial-brand.MOV',
  38136976,
  'video/mp4',
  'video',
  'r2',
  '/services/commercial-brand.MOV',
  '/services/commercial-brand.MOV',
  '/services/commercial-brand.MOV',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '22785ddd-327a-49bd-a144-6223c8f8bd35',
  'aerial-specialized.MOV',
  14495232,
  'video/mp4',
  'video',
  'r2',
  '/services/aerial-specialized.MOV',
  '/services/aerial-specialized.MOV',
  '/services/aerial-specialized.MOV',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'c5b72cdf-38d9-4bb2-bc2d-53bf938c8ce1',
  'photography.MOV',
  28536663,
  'video/mp4',
  'video',
  'r2',
  '/services/photography.MOV',
  '/services/photography.MOV',
  '/services/photography.MOV',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '4d2536b3-edaf-49b3-98f0-e321a28df823',
  'photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  102400,
  'image/com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'd7185503-4a27-45ec-9f4f-e3ee5b7450f5',
  'photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  102400,
  'image/com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  'd57b72d0-deb7-4e22-8cc9-d5dc27c959be',
  'photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  102400,
  'image/com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '33e1b90b-4a04-4a56-b512-ac254e23ad01',
  'photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  102400,
  'image/com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '2e767f55-d99e-4921-8150-781a3aae3eb0',
  'photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  102400,
  'image/com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';

-- 2. PROJECT UPDATES
UPDATE projects SET hero_media_id = NULL, cover_media_id = 'fa918deb-e196-40c5-8f3d-3c3fdfca6084' WHERE slug = 'rebel-empire-osogbo';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'fa918deb-e196-40c5-8f3d-3c3fdfca6084', 0 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'fa918deb-e196-40c5-8f3d-3c3fdfca6084'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '36a7cd68-89ed-460f-8445-aae7dbd0e895', 1 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '36a7cd68-89ed-460f-8445-aae7dbd0e895'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05', 2 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05'
  );
UPDATE projects SET hero_media_id = '24a036b5-7175-459f-84d5-f94c8d3b2245', cover_media_id = 'c2268b2f-68c1-4012-825d-1eb7676919ad' WHERE slug = 'oyo-state-armed-forces-remembrance';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '41217c30-95cc-4fc6-a018-dd3c202ff530', 0 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '41217c30-95cc-4fc6-a018-dd3c202ff530'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '1534af73-d150-4ccd-b9b3-840b2fb369c5', 1 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '1534af73-d150-4ccd-b9b3-840b2fb369c5'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '3409126a-40a0-4c49-805f-998d1170ed16', 2 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '3409126a-40a0-4c49-805f-998d1170ed16'
  );
UPDATE projects SET hero_media_id = 'f3d05fdc-258b-4ca1-9067-d201ae78ea86', cover_media_id = 'c2268b2f-68c1-4012-825d-1eb7676919ad' WHERE slug = 'dj-tunez-live-experiences';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '36a7cd68-89ed-460f-8445-aae7dbd0e895', 0 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '36a7cd68-89ed-460f-8445-aae7dbd0e895'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05', 1 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '3409126a-40a0-4c49-805f-998d1170ed16', 2 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '3409126a-40a0-4c49-805f-998d1170ed16'
  );
UPDATE projects SET hero_media_id = '2d75fe52-38f5-4270-940e-f167c5ce1da7', cover_media_id = 'c2268b2f-68c1-4012-825d-1eb7676919ad' WHERE slug = 'utiva-future-of-tech';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '41217c30-95cc-4fc6-a018-dd3c202ff530', 0 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '41217c30-95cc-4fc6-a018-dd3c202ff530'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '1534af73-d150-4ccd-b9b3-840b2fb369c5', 1 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '1534af73-d150-4ccd-b9b3-840b2fb369c5'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '36a7cd68-89ed-460f-8445-aae7dbd0e895', 2 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '36a7cd68-89ed-460f-8445-aae7dbd0e895'
  );
UPDATE projects SET hero_media_id = 'e37994ad-9c03-4529-89e1-1c5c5c4be66a', cover_media_id = 'c2268b2f-68c1-4012-825d-1eb7676919ad' WHERE slug = 'iconic-legacies-public-figures';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05', 0 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '36a7cd68-89ed-460f-8445-aae7dbd0e895', 1 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '36a7cd68-89ed-460f-8445-aae7dbd0e895'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '3409126a-40a0-4c49-805f-998d1170ed16', 2 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '3409126a-40a0-4c49-805f-998d1170ed16'
  );
UPDATE projects SET hero_media_id = 'c0eb7654-3c68-4cab-b7a7-7adb3f6401cf', cover_media_id = 'c2268b2f-68c1-4012-825d-1eb7676919ad' WHERE slug = 'century-legacy-wedding-cinema';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '3409126a-40a0-4c49-805f-998d1170ed16', 0 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '3409126a-40a0-4c49-805f-998d1170ed16'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05', 1 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'ba3c3fa3-1b26-4e1c-aa2b-b384bc327e05'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '41217c30-95cc-4fc6-a018-dd3c202ff530', 2 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '41217c30-95cc-4fc6-a018-dd3c202ff530'
  );

-- 3. SERVICE UPDATES
UPDATE services SET cover_media_id = '36a7cd68-89ed-460f-8445-aae7dbd0e895' WHERE slug = 'film-cinema-production';
UPDATE services SET cover_media_id = 'e47a24c1-1796-4cda-8bd9-632745f91ba2' WHERE slug = 'commercial-brand-production';
UPDATE services SET cover_media_id = '3409126a-40a0-4c49-805f-998d1170ed16' WHERE slug = 'luxury-event-cinema';
UPDATE services SET cover_media_id = '41217c30-95cc-4fc6-a018-dd3c202ff530' WHERE slug = 'century-post-lab';
UPDATE services SET cover_media_id = '22785ddd-327a-49bd-a144-6223c8f8bd35' WHERE slug = 'aerial-specialized';
UPDATE services SET cover_media_id = 'c5b72cdf-38d9-4bb2-bc2d-53bf938c8ce1' WHERE slug = 'photography-division';
UPDATE services SET cover_media_id = '1534af73-d150-4ccd-b9b3-840b2fb369c5' WHERE slug = 'production-support';

-- 4. JOURNAL UPDATES
UPDATE journal_posts SET cover_media_id = '4d2536b3-edaf-49b3-98f0-e321a28df823' WHERE slug = 'the-geometry-of-light-in-lagos';
UPDATE journal_posts SET cover_media_id = 'd7185503-4a27-45ec-9f4f-e3ee5b7450f5' WHERE slug = 'directors-notes-narrative-in-60-seconds';
UPDATE journal_posts SET cover_media_id = 'd57b72d0-deb7-4e22-8cc9-d5dc27c959be' WHERE slug = 'behind-the-scenes-nocturne-campaign';
UPDATE journal_posts SET cover_media_id = '33e1b90b-4a04-4a56-b512-ac254e23ad01' WHERE slug = 'the-rebirth-of-african-luxury-cinema';
UPDATE journal_posts SET cover_media_id = '2e767f55-d99e-4921-8150-781a3aae3eb0' WHERE slug = 'architecting-the-visual-brand-campaign';

-- 5. RESTORE FULL ABOUT PAGE CONTENT
UPDATE pages 
SET content = jsonb_build_object(
  'hero', jsonb_build_object('heading', 'ABOUT CENTURY', 'description', 'STUDIO PROFILE â€¢ CENTURY IMAGERY LLC'),
  'bio', jsonb_build_object(
    'heading', 'WE DIRECT CINEMA. ARCHITECTING LEGACIES.',
    'text', E'Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.\n\nOperating from studio headquarters in Ibadan with active deployments in Lagos and worldwide transit, our unit serves as primary video architect for landmark nightlife, documents state government protocol across consecutive years, and directs campaign visuals for global music icons and continental tech accelerators.\n\nWith portfolio releases achieving over 400,000+ organic views, we translate pulsating energy and solemn ceremony into everlasting motion picture art.'
  )
)
WHERE slug = 'about';

-- 6. REMOVE DUPLICATE EMPTY SERVICE ROW
DELETE FROM services WHERE slug = 'the-century-post-lab';

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
-- 20260926000009_booking_notifications.sql

ALTER TABLE public.bookings
ADD COLUMN admin_notified BOOLEAN DEFAULT false,
ADD COLUMN client_notified BOOLEAN DEFAULT false;
