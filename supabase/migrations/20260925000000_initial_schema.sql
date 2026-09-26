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
