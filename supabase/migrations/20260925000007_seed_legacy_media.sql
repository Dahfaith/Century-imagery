-- Legacy Media Seed

-- 1. MEDIA INSERTS

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'f3b7e6c6-1b10-40c3-90a7-363b07e513fc',
  'hero.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/videos/hero.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '07d28c4c-fad0-4e31-bbee-57f796bc3992',
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
  'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f',
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
  '10db8e52-00af-4c18-9d20-6b6167a4d34a',
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
  'ea75ff63-437f-4d56-99cd-abc6f184463c',
  'armed-forces.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/projects/armed-forces.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '2752c042-4fc3-49a1-a5a9-96b28b9673ed',
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
  '2914b801-45b8-408a-a666-814525415d00',
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
  '1ce83755-783a-47f1-9c4d-d7004087b3d3',
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
  '750cfe8c-91c5-4d43-a058-46d8e6f47092',
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
  'd0dc3f34-756f-4486-988b-0965e3c39d9a',
  'dj-tunez.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/projects/dj-tunez.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '8cba8a5c-344b-4786-97c9-8c42bf7d6d96',
  'utiva.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/projects/utiva.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '02fca517-11f9-4ba4-980e-a2cdf5dcb72c',
  'public-figures.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/projects/public-figures.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'ef95191b-0826-43e9-98aa-11a40d586425',
  'wedding-cinema.MP4',
  1024,
  'video/mp4',
  'video',
  'r2',
  '/projects/wedding-cinema.MP4',
  'ready'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'e3b897f5-a084-4d2e-983f-6a3b32b09ae9',
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
  '93b85297-8756-4f63-8752-2c470b1e5824',
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
  'eaaa2b83-b78c-42b0-b762-843e7d59c880',
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
  '0997660e-7741-41ce-9c1e-342d60d5a981',
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
  'e95e16e0-6292-45b5-b68e-55dfa8c2d6b1',
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
  'e03ac8c8-a9d4-44a6-980d-d2f96b3a194e',
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
  'c0a474de-57fd-42db-ab23-74415aa3e146',
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
  'b8891981-bcfa-401f-a19c-5cc73480f01e',
  'photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT (id) DO NOTHING;

-- 2. PROJECT UPDATES
UPDATE projects SET hero_media_id = 'f3b7e6c6-1b10-40c3-90a7-363b07e513fc', cover_media_id = '07d28c4c-fad0-4e31-bbee-57f796bc3992' WHERE slug = 'rebel-empire-osogbo';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '07d28c4c-fad0-4e31-bbee-57f796bc3992', 0 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '07d28c4c-fad0-4e31-bbee-57f796bc3992'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f', 1 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '10db8e52-00af-4c18-9d20-6b6167a4d34a', 2 FROM projects p
WHERE p.slug = 'rebel-empire-osogbo'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '10db8e52-00af-4c18-9d20-6b6167a4d34a'
  );
UPDATE projects SET hero_media_id = 'ea75ff63-437f-4d56-99cd-abc6f184463c', cover_media_id = '2752c042-4fc3-49a1-a5a9-96b28b9673ed' WHERE slug = 'oyo-state-armed-forces-remembrance';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '2914b801-45b8-408a-a666-814525415d00', 0 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '2914b801-45b8-408a-a666-814525415d00'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '1ce83755-783a-47f1-9c4d-d7004087b3d3', 1 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '1ce83755-783a-47f1-9c4d-d7004087b3d3'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '750cfe8c-91c5-4d43-a058-46d8e6f47092', 2 FROM projects p
WHERE p.slug = 'oyo-state-armed-forces-remembrance'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '750cfe8c-91c5-4d43-a058-46d8e6f47092'
  );
UPDATE projects SET hero_media_id = 'd0dc3f34-756f-4486-988b-0965e3c39d9a', cover_media_id = '2752c042-4fc3-49a1-a5a9-96b28b9673ed' WHERE slug = 'dj-tunez-live-experiences';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f', 0 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '10db8e52-00af-4c18-9d20-6b6167a4d34a', 1 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '10db8e52-00af-4c18-9d20-6b6167a4d34a'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '750cfe8c-91c5-4d43-a058-46d8e6f47092', 2 FROM projects p
WHERE p.slug = 'dj-tunez-live-experiences'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '750cfe8c-91c5-4d43-a058-46d8e6f47092'
  );
UPDATE projects SET hero_media_id = '8cba8a5c-344b-4786-97c9-8c42bf7d6d96', cover_media_id = '2752c042-4fc3-49a1-a5a9-96b28b9673ed' WHERE slug = 'utiva-future-of-tech';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '2914b801-45b8-408a-a666-814525415d00', 0 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '2914b801-45b8-408a-a666-814525415d00'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '1ce83755-783a-47f1-9c4d-d7004087b3d3', 1 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '1ce83755-783a-47f1-9c4d-d7004087b3d3'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f', 2 FROM projects p
WHERE p.slug = 'utiva-future-of-tech'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f'
  );
UPDATE projects SET hero_media_id = '02fca517-11f9-4ba4-980e-a2cdf5dcb72c', cover_media_id = '2752c042-4fc3-49a1-a5a9-96b28b9673ed' WHERE slug = 'iconic-legacies-public-figures';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '10db8e52-00af-4c18-9d20-6b6167a4d34a', 0 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '10db8e52-00af-4c18-9d20-6b6167a4d34a'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f', 1 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '750cfe8c-91c5-4d43-a058-46d8e6f47092', 2 FROM projects p
WHERE p.slug = 'iconic-legacies-public-figures'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '750cfe8c-91c5-4d43-a058-46d8e6f47092'
  );
UPDATE projects SET hero_media_id = 'ef95191b-0826-43e9-98aa-11a40d586425', cover_media_id = '2752c042-4fc3-49a1-a5a9-96b28b9673ed' WHERE slug = 'century-legacy-wedding-cinema';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '750cfe8c-91c5-4d43-a058-46d8e6f47092', 0 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '750cfe8c-91c5-4d43-a058-46d8e6f47092'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '10db8e52-00af-4c18-9d20-6b6167a4d34a', 1 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '10db8e52-00af-4c18-9d20-6b6167a4d34a'
  );

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '2914b801-45b8-408a-a666-814525415d00', 2 FROM projects p
WHERE p.slug = 'century-legacy-wedding-cinema'
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '2914b801-45b8-408a-a666-814525415d00'
  );

-- 3. SERVICE UPDATES
UPDATE services SET cover_media_id = 'c1030b1f-9b7a-4d5c-9257-5fa77cdf845f' WHERE slug = 'film-cinema-production';
UPDATE services SET cover_media_id = 'e3b897f5-a084-4d2e-983f-6a3b32b09ae9' WHERE slug = 'commercial-brand-production';
UPDATE services SET cover_media_id = '750cfe8c-91c5-4d43-a058-46d8e6f47092' WHERE slug = 'luxury-event-cinema';
UPDATE services SET cover_media_id = '2914b801-45b8-408a-a666-814525415d00' WHERE slug = 'century-post-lab';
UPDATE services SET cover_media_id = '93b85297-8756-4f63-8752-2c470b1e5824' WHERE slug = 'aerial-specialized';
UPDATE services SET cover_media_id = 'eaaa2b83-b78c-42b0-b762-843e7d59c880' WHERE slug = 'photography-division';
UPDATE services SET cover_media_id = '1ce83755-783a-47f1-9c4d-d7004087b3d3' WHERE slug = 'production-support';

-- 4. JOURNAL UPDATES
UPDATE journal_posts SET cover_media_id = '0997660e-7741-41ce-9c1e-342d60d5a981' WHERE slug = 'the-geometry-of-light-in-lagos';
UPDATE journal_posts SET cover_media_id = 'e95e16e0-6292-45b5-b68e-55dfa8c2d6b1' WHERE slug = 'directors-notes-narrative-in-60-seconds';
UPDATE journal_posts SET cover_media_id = 'e03ac8c8-a9d4-44a6-980d-d2f96b3a194e' WHERE slug = 'behind-the-scenes-nocturne-campaign';
UPDATE journal_posts SET cover_media_id = 'c0a474de-57fd-42db-ab23-74415aa3e146' WHERE slug = 'the-rebirth-of-african-luxury-cinema';
UPDATE journal_posts SET cover_media_id = 'b8891981-bcfa-401f-a19c-5cc73480f01e' WHERE slug = 'architecting-the-visual-brand-campaign';

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
