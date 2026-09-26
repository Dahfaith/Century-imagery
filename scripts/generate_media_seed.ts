import { services } from '../data/services';
import { projects } from '../data/projects';
import { articles as journalArticles } from '../data/journal';
import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';

function escapeSql(str: string | null | undefined): string {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function getExt(url: string) {
  const match = url.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : 'jpg';
}

function getType(ext: string) {
  if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
  return 'image';
}

let sql = `-- Legacy Media Seed\n\n`;

// Map of URL -> generated UUID
const mediaMap = new Map<string, string>();

function ensureMedia(url: string | undefined): string | null {
  if (!url) return null;
  if (mediaMap.has(url)) return mediaMap.get(url)!;
  
  const id = crypto.randomUUID();
  mediaMap.set(url, id);
  
  const ext = getExt(url);
  const type = getType(ext);
  const filename = url.split('/').pop() || 'media';
  
  sql += `
INSERT INTO media (id, file_name, file_size, mime_type, media_type, provider, provider_url, status)
VALUES (
  '${id}',
  ${escapeSql(filename)},
  1024,
  ${escapeSql(`${type}/${ext}`)},
  '${type}',
  'r2',
  ${escapeSql(url)},
  'ready'
) ON CONFLICT DO NOTHING;
`;
  return id;
}

sql += `-- 1. MEDIA INSERTS\n`;

const projectUpdates = projects.map(p => {
  const heroId = ensureMedia(p.heroImage || p.videoUrl); // Projects often had heroImage or videoUrl
  const coverId = ensureMedia(p.heroImage || p.gallery?.[0]);
  
  let gallerySql = '';
  if (p.gallery) {
    p.gallery.forEach((gUrl, i) => {
      const gId = ensureMedia(gUrl);
      if (gId) {
        gallerySql += `
INSERT INTO project_media (project_id, media_id, sort_order)
SELECT id, '${gId}', ${i} FROM projects WHERE slug = ${escapeSql(p.slug)}
ON CONFLICT DO NOTHING;
`;
      }
    });
  }
  
  return { slug: p.slug, heroId, coverId, gallerySql };
});

const serviceUpdates = services.map(s => {
  const coverId = ensureMedia(s.videoUrl || s.imagePlaceholder);
  return { slug: s.id, coverId };
});

const journalUpdates = journalArticles.map((j: any) => {
  const coverId = ensureMedia(j.coverImage);
  return { slug: j.slug, coverId };
});

sql += `\n-- 2. PROJECT UPDATES\n`;
projectUpdates.forEach(pu => {
  if (pu.heroId || pu.coverId) {
    sql += `UPDATE projects SET `;
    const sets = [];
    if (pu.heroId) sets.push(`hero_media_id = '${pu.heroId}'`);
    if (pu.coverId) sets.push(`cover_media_id = '${pu.coverId}'`);
    sql += sets.join(', ') + ` WHERE slug = ${escapeSql(pu.slug)};\n`;
  }
  sql += pu.gallerySql;
});

sql += `\n-- 3. SERVICE UPDATES\n`;
serviceUpdates.forEach(su => {
  if (su.coverId) {
    sql += `UPDATE services SET cover_media_id = '${su.coverId}' WHERE slug = ${escapeSql(su.slug)};\n`;
  }
});

sql += `\n-- 4. JOURNAL UPDATES\n`;
journalUpdates.forEach(ju => {
  if (ju.coverId) {
    sql += `UPDATE journal_posts SET cover_media_id = '${ju.coverId}' WHERE slug = ${escapeSql(ju.slug)};\n`;
  }
});


const outPath = path.join(__dirname, '../supabase/migrations/20260925000007_seed_legacy_media.sql');
fs.writeFileSync(outPath, sql);
console.log('Migration generated at:', outPath);
