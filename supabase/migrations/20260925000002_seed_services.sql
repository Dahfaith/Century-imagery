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
