import { services } from '../data/services';
import { projects } from '../data/projects';
import { articles as journalArticles } from '../data/journal';
import * as fs from 'fs';
import * as path from 'path';

function escapeSql(str: string | null | undefined): string {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

let sql = `-- Full Data Seed from Original Static Files\n\n`;

// Fix schema limitation for year
sql += `-- SCHEMA FIXES\n`;
sql += `ALTER TABLE projects ALTER COLUMN year TYPE text USING year::text;\n\n`;

// 1. SERVICES
sql += `-- SERVICES\n`;
services.forEach((s, index) => {
  sql += `
UPDATE services 
SET 
  short_description = ${escapeSql(s.tagline)},
  description = ${escapeSql(s.description)},
  status = 'published',
  sort_order = ${index + 1}
WHERE slug = ${escapeSql(s.id)};

INSERT INTO services (slug, title, short_description, description, status, sort_order)
SELECT ${escapeSql(s.id)}, ${escapeSql(s.title)}, ${escapeSql(s.tagline)}, ${escapeSql(s.description)}, 'published', ${index + 1}
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = ${escapeSql(s.id)});
`;

  s.capabilities.forEach((cap, i) => {
    sql += `
INSERT INTO service_items (service_id, title, sort_order)
SELECT id, ${escapeSql(cap)}, ${i + 1} FROM services WHERE slug = ${escapeSql(s.id)}
ON CONFLICT DO NOTHING;
`;
  });
});

// 2. PROJECTS
sql += `\n-- PROJECTS\n`;
projects.forEach((p, index) => {
  // credits to JSON
  let creditsJson = 'NULL';
  if (p.credits && p.credits.length > 0) {
    creditsJson = escapeSql(JSON.stringify(p.credits));
  }
  
  // services array to JSON
  const servicesJson = escapeSql(JSON.stringify([p.category]));

  sql += `
INSERT INTO projects (slug, title, client_name, category, year, location, short_description, description, credits, services, status, sort_order)
VALUES (
  ${escapeSql(p.slug)},
  ${escapeSql(p.title)},
  ${escapeSql(p.client)},
  ${escapeSql(p.category)},
  ${escapeSql(p.year)},
  ${escapeSql(p.location)},
  ${escapeSql(p.shortDescription)},
  ${escapeSql(p.fullDescription)},
  ${creditsJson}::jsonb,
  ${servicesJson}::jsonb,
  'published',
  ${index + 1}
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
`;
});

// 3. JOURNAL
sql += `\n-- JOURNAL\n`;
journalArticles.forEach((j: any, index: number) => {
  // Convert old string content to the new JSON block structure
  let blocks = j.content.map((text: any) => ({ type: 'paragraph', content: text }));
  if (j.pullQuote) {
    blocks.push({ type: 'quote', content: j.pullQuote });
  }
  if (j.cameraSpecs) {
    blocks.push({ type: 'paragraph', content: 'Specs: ' + j.cameraSpecs.join(', ') });
  }
  
  const contentJson = escapeSql(JSON.stringify({ blocks }));

  sql += `
INSERT INTO journal_posts (slug, title, category, excerpt, content, author_name, featured, status, published_at)
VALUES (
  ${escapeSql(j.slug)},
  ${escapeSql(j.title)},
  ${escapeSql(j.category)},
  ${escapeSql(j.excerpt)},
  ${contentJson}::jsonb,
  ${escapeSql(j.author)},
  ${j.featured ? 'TRUE' : 'FALSE'},
  'published',
  ${escapeSql(new Date(j.date).toISOString())}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  featured = EXCLUDED.featured,
  status = 'published';
`;
});

const outPath = path.join(__dirname, '../supabase/migrations/20260925000006_seed_full_static_data.sql');
fs.writeFileSync(outPath, sql);
console.log('Migration generated at:', outPath);
