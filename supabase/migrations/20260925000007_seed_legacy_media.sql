-- Legacy Media Seed

-- 1. MEDIA INSERTS

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '06bc1585-3d4b-49f0-97ba-5d8485f258a3',
  'rebel-empire.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/projects/rebel-empire.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f',
  'film-cinema.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/film-cinema.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'e14443a4-1cda-456f-b786-c8782eea9e2b',
  'photography.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/photography.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '622773a7-0541-4891-9529-f8b2f659e3a9',
  'hero-mockup-gold.png',
  1024,
  'image/png',
  'image',
  'r2',
  '/brand/hero-mockup-gold.png',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'e028886f-a89c-4663-b581-0060947099fc',
  'post-lab.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/post-lab.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '187dae69-45b4-4bf5-881e-e0aa264ee9c1',
  'production-support.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/production-support.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'bb14bbda-e887-43c0-84d9-22848d66ab78',
  'luxury-event.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/luxury-event.jpg',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '5997fcda-0cb3-4a3a-9122-7ce284dd5bac',
  'commercial-brand.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/commercial-brand.MOV',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'cd3dfd60-4fef-43c3-a89d-5e04e5a60f2b',
  'aerial-specialized.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/aerial-specialized.MOV',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '93cc40c7-3ddc-4e5f-a2c4-4ca6b849d2d1',
  'photography.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/photography.MOV',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '7a01ba2b-5e09-4b83-aeb2-7c40ebe57de5',
  'photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  1024,
  'image/com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'ea58aa12-be7e-4db5-b7af-0dda85cad961',
  'photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '19ca1f05-29b0-479a-9b15-628f533f4933',
  'photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'e08fdea0-3164-438f-b9e7-b37f646de9d5',
  'photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'ff5acae3-f399-402c-a643-b7c708121124',
  'photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO NOTHING;

-- 2. PROJECT UPDATES
UPDATE projects SET hero_media_id = '06bc1585-3d4b-49f0-97ba-5d8485f258a3', cover_media_id = '06bc1585-3d4b-49f0-97ba-5d8485f258a3' WHERE slug = 'rebel-empire-osogbo';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '06bc1585-3d4b-49f0-97ba-5d8485f258a3', 0 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '06bc1585-3d4b-49f0-97ba-5d8485f258a3'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f', 1 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e14443a4-1cda-456f-b786-c8782eea9e2b', 2 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e14443a4-1cda-456f-b786-c8782eea9e2b'
  );
UPDATE projects SET hero_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9', cover_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9' WHERE slug = 'oyo-state-armed-forces-remembrance';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e028886f-a89c-4663-b581-0060947099fc', 0 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e028886f-a89c-4663-b581-0060947099fc'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '187dae69-45b4-4bf5-881e-e0aa264ee9c1', 1 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '187dae69-45b4-4bf5-881e-e0aa264ee9c1'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'bb14bbda-e887-43c0-84d9-22848d66ab78', 2 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'bb14bbda-e887-43c0-84d9-22848d66ab78'
  );
UPDATE projects SET hero_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9', cover_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9' WHERE slug = 'dj-tunez-live-experiences';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f', 0 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e14443a4-1cda-456f-b786-c8782eea9e2b', 1 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e14443a4-1cda-456f-b786-c8782eea9e2b'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'bb14bbda-e887-43c0-84d9-22848d66ab78', 2 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'bb14bbda-e887-43c0-84d9-22848d66ab78'
  );
UPDATE projects SET hero_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9', cover_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9' WHERE slug = 'utiva-future-of-tech';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e028886f-a89c-4663-b581-0060947099fc', 0 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e028886f-a89c-4663-b581-0060947099fc'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '187dae69-45b4-4bf5-881e-e0aa264ee9c1', 1 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '187dae69-45b4-4bf5-881e-e0aa264ee9c1'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f', 2 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f'
  );
UPDATE projects SET hero_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9', cover_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9' WHERE slug = 'iconic-legacies-public-figures';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e14443a4-1cda-456f-b786-c8782eea9e2b', 0 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e14443a4-1cda-456f-b786-c8782eea9e2b'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f', 1 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'bb14bbda-e887-43c0-84d9-22848d66ab78', 2 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'bb14bbda-e887-43c0-84d9-22848d66ab78'
  );
UPDATE projects SET hero_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9', cover_media_id = '622773a7-0541-4891-9529-f8b2f659e3a9' WHERE slug = 'century-legacy-wedding-cinema';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'bb14bbda-e887-43c0-84d9-22848d66ab78', 0 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'bb14bbda-e887-43c0-84d9-22848d66ab78'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e14443a4-1cda-456f-b786-c8782eea9e2b', 1 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e14443a4-1cda-456f-b786-c8782eea9e2b'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'e028886f-a89c-4663-b581-0060947099fc', 2 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'e028886f-a89c-4663-b581-0060947099fc'
  );

-- 3. SERVICE UPDATES
UPDATE services SET cover_media_id = '6196a5fa-a6d8-4b69-ba6a-b4c1d468099f' WHERE slug = 'film-cinema-production';
UPDATE services SET cover_media_id = '5997fcda-0cb3-4a3a-9122-7ce284dd5bac' WHERE slug = 'commercial-brand-production';
UPDATE services SET cover_media_id = 'bb14bbda-e887-43c0-84d9-22848d66ab78' WHERE slug = 'luxury-event-cinema';
UPDATE services SET cover_media_id = 'e028886f-a89c-4663-b581-0060947099fc' WHERE slug = 'century-post-lab';
UPDATE services SET cover_media_id = 'cd3dfd60-4fef-43c3-a89d-5e04e5a60f2b' WHERE slug = 'aerial-specialized';
UPDATE services SET cover_media_id = '93cc40c7-3ddc-4e5f-a2c4-4ca6b849d2d1' WHERE slug = 'photography-division';
UPDATE services SET cover_media_id = '187dae69-45b4-4bf5-881e-e0aa264ee9c1' WHERE slug = 'production-support';

-- 4. JOURNAL UPDATES
UPDATE journal_posts SET cover_media_id = '7a01ba2b-5e09-4b83-aeb2-7c40ebe57de5' WHERE slug = 'the-geometry-of-light-in-lagos';
UPDATE journal_posts SET cover_media_id = 'ea58aa12-be7e-4db5-b7af-0dda85cad961' WHERE slug = 'directors-notes-narrative-in-60-seconds';
UPDATE journal_posts SET cover_media_id = '19ca1f05-29b0-479a-9b15-628f533f4933' WHERE slug = 'behind-the-scenes-nocturne-campaign';
UPDATE journal_posts SET cover_media_id = 'e08fdea0-3164-438f-b9e7-b37f646de9d5' WHERE slug = 'the-rebirth-of-african-luxury-cinema';
UPDATE journal_posts SET cover_media_id = 'ff5acae3-f399-402c-a643-b7c708121124' WHERE slug = 'architecting-the-visual-brand-campaign';

-- 5. RESTORE FULL ABOUT PAGE CONTENT
UPDATE pages 
SET content = jsonb_build_object(
  'hero', jsonb_build_object('heading', 'ABOUT CENTURY', 'description', 'STUDIO PROFILE • CENTURY IMAGERY LLC'),
  'bio', jsonb_build_object(
    'heading', 'WE DIRECT CINEMA. ARCHITECTING LEGACIES.',
    'text', E'Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.\n\nOperating from studio headquarters in Ibadan with active deployments in Lagos and worldwide transit, our unit serves as primary video architect for landmark nightlife, documents state government protocol across consecutive years, and directs campaign visuals for global music icons and continental tech accelerators.\n\nWith portfolio releases achieving over 400,000+ organic views, we translate pulsating energy and solemn ceremony into everlasting motion picture art.'
  )
)
WHERE slug = 'about';
