-- Legacy Media Seed

-- 1. MEDIA INSERTS

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'eaf5acb6-b770-4774-962a-7ab12c3d70b3',
  'rebel-empire.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/projects/rebel-empire.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '90418a32-5e43-4f6c-b76f-a9765085dcfb',
  'film-cinema.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/film-cinema.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '056ac81b-5958-4c93-a3ee-98d690798f8f',
  'photography.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/photography.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'dea86dda-17ea-4a3d-b7bd-16b27134e154',
  'hero-mockup-gold.png',
  1024,
  'image/png',
  'image',
  'r2',
  '/brand/hero-mockup-gold.png',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '8738a5bb-ba99-4781-a73d-74d760773096',
  'post-lab.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/post-lab.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '645e6a66-aadf-4843-9f26-e2e09e4e74c4',
  'production-support.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/production-support.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'de5545f2-644c-47f3-9589-e39fa1015521',
  'luxury-event.jpg',
  1024,
  'image/jpg',
  'image',
  'r2',
  '/services/luxury-event.jpg',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '0b3d4789-832f-42e9-bae3-c827ddd4d36a',
  'commercial-brand.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/commercial-brand.MOV',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '90771c9f-8b46-4cc6-8103-4ef13ac9b74e',
  'aerial-specialized.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/aerial-specialized.MOV',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'e14fe02a-0041-4cf3-a878-d3f37cfe610c',
  'photography.MOV',
  1024,
  'video/mov',
  'video',
  'r2',
  '/services/photography.MOV',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '8a52d938-62ab-4c5a-a17a-6bd983f7167e',
  'photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  1024,
  'image/com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '6533a923-7dac-4359-a766-ba035189a14c',
  'photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'b3b1d147-75f1-4894-9134-cd6de52dce5b',
  'photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'dc3fc12e-e0cb-4995-ab9b-ca0ad0133c37',
  'photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT DO NOTHING;

INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  'ecedf99d-801b-4349-8de3-cb17487275a5',
  'photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  1024,
  'image/com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'image',
  'r2',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'ready'
) ON CONFLICT DO NOTHING;

-- 2. PROJECT UPDATES
UPDATE projects SET hero_media_id = 'eaf5acb6-b770-4774-962a-7ab12c3d70b3', cover_media_id = 'eaf5acb6-b770-4774-962a-7ab12c3d70b3' WHERE slug = 'rebel-empire-osogbo';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, 'eaf5acb6-b770-4774-962a-7ab12c3d70b3', 0 FROM projects WHERE slug = 'rebel-empire-osogbo'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '90418a32-5e43-4f6c-b76f-a9765085dcfb', 1 FROM projects WHERE slug = 'rebel-empire-osogbo'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '056ac81b-5958-4c93-a3ee-98d690798f8f', 2 FROM projects WHERE slug = 'rebel-empire-osogbo'
ON CONFLICT DO NOTHING;
UPDATE projects SET hero_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154', cover_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154' WHERE slug = 'oyo-state-armed-forces-remembrance';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '8738a5bb-ba99-4781-a73d-74d760773096', 0 FROM projects WHERE slug = 'oyo-state-armed-forces-remembrance'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '645e6a66-aadf-4843-9f26-e2e09e4e74c4', 1 FROM projects WHERE slug = 'oyo-state-armed-forces-remembrance'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, 'de5545f2-644c-47f3-9589-e39fa1015521', 2 FROM projects WHERE slug = 'oyo-state-armed-forces-remembrance'
ON CONFLICT DO NOTHING;
UPDATE projects SET hero_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154', cover_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154' WHERE slug = 'dj-tunez-live-experiences';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '90418a32-5e43-4f6c-b76f-a9765085dcfb', 0 FROM projects WHERE slug = 'dj-tunez-live-experiences'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '056ac81b-5958-4c93-a3ee-98d690798f8f', 1 FROM projects WHERE slug = 'dj-tunez-live-experiences'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, 'de5545f2-644c-47f3-9589-e39fa1015521', 2 FROM projects WHERE slug = 'dj-tunez-live-experiences'
ON CONFLICT DO NOTHING;
UPDATE projects SET hero_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154', cover_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154' WHERE slug = 'utiva-future-of-tech';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '8738a5bb-ba99-4781-a73d-74d760773096', 0 FROM projects WHERE slug = 'utiva-future-of-tech'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '645e6a66-aadf-4843-9f26-e2e09e4e74c4', 1 FROM projects WHERE slug = 'utiva-future-of-tech'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '90418a32-5e43-4f6c-b76f-a9765085dcfb', 2 FROM projects WHERE slug = 'utiva-future-of-tech'
ON CONFLICT DO NOTHING;
UPDATE projects SET hero_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154', cover_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154' WHERE slug = 'iconic-legacies-public-figures';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '056ac81b-5958-4c93-a3ee-98d690798f8f', 0 FROM projects WHERE slug = 'iconic-legacies-public-figures'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '90418a32-5e43-4f6c-b76f-a9765085dcfb', 1 FROM projects WHERE slug = 'iconic-legacies-public-figures'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, 'de5545f2-644c-47f3-9589-e39fa1015521', 2 FROM projects WHERE slug = 'iconic-legacies-public-figures'
ON CONFLICT DO NOTHING;
UPDATE projects SET hero_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154', cover_media_id = 'dea86dda-17ea-4a3d-b7bd-16b27134e154' WHERE slug = 'century-legacy-wedding-cinema';

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, 'de5545f2-644c-47f3-9589-e39fa1015521', 0 FROM projects WHERE slug = 'century-legacy-wedding-cinema'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '056ac81b-5958-4c93-a3ee-98d690798f8f', 1 FROM projects WHERE slug = 'century-legacy-wedding-cinema'
ON CONFLICT DO NOTHING;

INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '8738a5bb-ba99-4781-a73d-74d760773096', 2 FROM projects WHERE slug = 'century-legacy-wedding-cinema'
ON CONFLICT DO NOTHING;

-- 3. SERVICE UPDATES
UPDATE services SET cover_media_id = '90418a32-5e43-4f6c-b76f-a9765085dcfb' WHERE slug = 'film-cinema-production';
UPDATE services SET cover_media_id = '0b3d4789-832f-42e9-bae3-c827ddd4d36a' WHERE slug = 'commercial-brand-production';
UPDATE services SET cover_media_id = 'de5545f2-644c-47f3-9589-e39fa1015521' WHERE slug = 'luxury-event-cinema';
UPDATE services SET cover_media_id = '8738a5bb-ba99-4781-a73d-74d760773096' WHERE slug = 'century-post-lab';
UPDATE services SET cover_media_id = '90771c9f-8b46-4cc6-8103-4ef13ac9b74e' WHERE slug = 'aerial-specialized';
UPDATE services SET cover_media_id = 'e14fe02a-0041-4cf3-a878-d3f37cfe610c' WHERE slug = 'photography-division';
UPDATE services SET cover_media_id = '645e6a66-aadf-4843-9f26-e2e09e4e74c4' WHERE slug = 'production-support';

-- 4. JOURNAL UPDATES
UPDATE journal_posts SET cover_media_id = '8a52d938-62ab-4c5a-a17a-6bd983f7167e' WHERE slug = 'the-geometry-of-light-in-lagos';
UPDATE journal_posts SET cover_media_id = '6533a923-7dac-4359-a766-ba035189a14c' WHERE slug = 'directors-notes-narrative-in-60-seconds';
UPDATE journal_posts SET cover_media_id = 'b3b1d147-75f1-4894-9134-cd6de52dce5b' WHERE slug = 'behind-the-scenes-nocturne-campaign';
UPDATE journal_posts SET cover_media_id = 'dc3fc12e-e0cb-4995-ab9b-ca0ad0133c37' WHERE slug = 'the-rebirth-of-african-luxury-cinema';
UPDATE journal_posts SET cover_media_id = 'ecedf99d-801b-4349-8de3-cb17487275a5' WHERE slug = 'architecting-the-visual-brand-campaign';
