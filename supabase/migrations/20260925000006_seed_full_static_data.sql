-- Full Data Seed from Original Static Files

-- SCHEMA FIXES
ALTER TABLE projects ALTER COLUMN year TYPE text USING year::text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS credits JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]'::jsonb;

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
SELECT id, 'After Dark — Nightlife & Lounge Cinematography', 3 FROM services WHERE slug = 'luxury-event-cinema'
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
  '2024 – 2026',
  'Osogbo, Osun State, Nigeria',
  'Serving as primary video architect to capture the pulse, high-octane lighting, and nocturnal prestige of Osogbo’s landmark nightlife empire.',
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
  '2023 – 2025',
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
  '{"blocks":[{"type":"paragraph","content":"Shooting in coastal West Africa presents an optical contrast unlike anywhere else in the world. The sunlight is direct, golden, and mercilessly sharp. If approached with standard European diffusion techniques, one risks flattening the rich, dynamic vitality that defines this territory."},{"type":"paragraph","content":"In this breakdown, we examine our lighting package for our latest editorial piece, utilizing vintage Russian prime lenses paired with custom diffusion to achieve an organic texture."},{"type":"paragraph","content":"By embracing negative fill—blocking light rather than adding artificial bounce—we sculpted deep, velvety blacks against glowing skin highlights. This contrast ratio forms the visual signature of Century Imagery LLC."},{"type":"paragraph","content":"In The Century Post Lab, we built bespoke film-emulation curves in DaVinci Resolve, pulling subtle warm gold into the roll-off highlights while maintaining absolute neutrality in the deep shadow detail."},{"type":"quote","content":"Daylight in coastal Lagos is not a passive element; it is an active optical character with visceral texture and fierce intensity."},{"type":"paragraph","content":"Specs: ARRI Alexa Mini LF, Cooke Anamorphic /i Full Frame Plus, Tiffen Black Pro-Mist 1/4, DaVinci Resolve 19 Studio"}]}'::jsonb,
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
  '{"blocks":[{"type":"paragraph","content":"The sixty-second format is the ultimate crucible of cinematic discipline. With zero tolerance for ornamental excess, each transition must deliver dramatic revelation."},{"type":"paragraph","content":"When directing commercial films for luxury brands, we often start by designing the soundscape before the camera rolls. A heartbeat rhythm, the tactile strike of a lighter, or the rustle of raw silk can anchor the audience before the visual cut occurs."},{"type":"paragraph","content":"When image and auditory pacing lock into synchrony, sixty seconds feels expansive—a full narrative journey rendered with cinematic weight."},{"type":"quote","content":"Commercial films must make every single frame justify its existence. The art lies not in packing more visual information, but in crafting moments of negative space."},{"type":"paragraph","content":"Specs: RED V-Raptor 8K VV, Atlas Orion 2x Anamorphic, Sound Devices 833 / Custom Foley"}]}'::jsonb,
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
  '{"blocks":[{"type":"paragraph","content":"A seismic shift is unfolding in global visual culture. From Lagos and Accra to Johannesburg, African filmmakers are establishing a fresh cinematic grammar."},{"type":"paragraph","content":"It is characterized by unapologetic color palettes, monumental architectural framing, and an innate reverence for legacy celebrations."},{"type":"paragraph","content":"At Century Imagery LLC, we stand at the vanguard of this movement—proving that the highest tier of commercial and narrative cinema can be conceptualized and produced entirely in West Africa for the world''s most discerning audiences."},{"type":"quote","content":"We are no longer translating our culture for external validation; we are setting the aesthetic agenda for global cinema."},{"type":"paragraph","content":"Specs: Anamorphic 35mm Format, West African Natural Light, Handcrafted Set Production"}]}'::jsonb,
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
  '{"blocks":[{"type":"paragraph","content":"Before a camera rig is assembled or a location secured, the success of a campaign film is determined in the treatment phase."},{"type":"paragraph","content":"We collaborate closely with brand leaders to identify the core emotional archetype. Are we evoking quiet reverence, nocturnal mystery, or kinetic rebellion?"},{"type":"paragraph","content":"Once that core frequency is established, every department—costume, lighting, lens choice, and sound—operates in harmonious alignment."},{"type":"quote","content":"A campaign film without a distinct optical thesis is merely moving noise."},{"type":"paragraph","content":"Specs: Cinema Optical Treatment, Storyboard Concept Art, 4K Deliverable Package"}]}'::jsonb,
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
