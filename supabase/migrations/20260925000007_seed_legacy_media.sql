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
UPDATE projects SET hero_media_id = '32c9cfaf-fdcf-4b20-9c87-62ac38f17b81', cover_media_id = 'fa918deb-e196-40c5-8f3d-3c3fdfca6084' WHERE slug = 'rebel-empire-osogbo';

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
  'hero', jsonb_build_object('heading', 'ABOUT CENTURY', 'description', 'STUDIO PROFILE • CENTURY IMAGERY LLC'),
  'bio', jsonb_build_object(
    'heading', 'WE DIRECT CINEMA. ARCHITECTING LEGACIES.',
    'text', E'Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.\n\nOperating from studio headquarters in Ibadan with active deployments in Lagos and worldwide transit, our unit serves as primary video architect for landmark nightlife, documents state government protocol across consecutive years, and directs campaign visuals for global music icons and continental tech accelerators.\n\nWith portfolio releases achieving over 400,000+ organic views, we translate pulsating energy and solemn ceremony into everlasting motion picture art.'
  )
)
WHERE slug = 'about';

-- 6. REMOVE DUPLICATE EMPTY SERVICE ROW
DELETE FROM services WHERE slug = 'the-century-post-lab';

