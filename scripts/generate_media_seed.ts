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
sql += `-- Ensure all existing media rows have thumbnails and playback URLs populated\nUPDATE media SET thumbnail_url = COALESCE(thumbnail_url, provider_url), playback_url = COALESCE(playback_url, provider_url) WHERE thumbnail_url IS NULL OR playback_url IS NULL;\n\n`;

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
  
  let fileSize = 102400; // default 100KB fallback
  try {
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const localPath = path.join(process.cwd(), 'public', cleanUrl);
    if (fs.existsSync(localPath)) {
      fileSize = fs.statSync(localPath).size;
    }
  } catch (e) {}

  const mimeType = type === 'video' 
    ? `video/${ext === 'mov' ? 'mp4' : ext}` 
    : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  
  sql += `
INSERT INTO media (id, filename, file_size, mime_type, media_type, provider, provider_url, thumbnail_url, playback_url, status)
VALUES (
  '${id}',
  ${escapeSql(filename)},
  ${fileSize},
  ${escapeSql(mimeType)},
  '${type}',
  'r2',
  ${escapeSql(url)},
  ${escapeSql(url)},
  ${escapeSql(url)},
  'ready'
) ON CONFLICT (id) DO UPDATE SET
  file_size = EXCLUDED.file_size,
  thumbnail_url = EXCLUDED.thumbnail_url,
  playback_url = EXCLUDED.playback_url,
  status = 'ready';
`;
  return id;
}

sql += `-- 1. MEDIA INSERTS\n`;

const projectUpdates = projects.map((p: any) => {
  const heroId = ensureMedia(p.heroVideo || p.videoUrl || (p.slug === 'rebel-empire-osogbo' ? '/videos/hero.MP4' : null));
  const coverId = ensureMedia(p.heroImage || p.gallery?.[0]);
  
  let gallerySql = '';
  if (p.gallery) {
    p.gallery.forEach((gUrl, i) => {
      const gId = ensureMedia(gUrl);
      if (gId) {
        gallerySql += `
INSERT INTO project_media (project_id, media_id, sort_order)
SELECT p.id, '${gId}', ${i} FROM projects p
WHERE p.slug = ${escapeSql(p.slug)}
  AND NOT EXISTS (
    SELECT 1 FROM project_media pm WHERE pm.project_id = p.id AND pm.media_id = '${gId}'
  );
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

sql += `\n-- 5. RESTORE FULL ABOUT PAGE CONTENT\n`;
sql += `UPDATE pages 
SET content = jsonb_build_object(
  'hero', jsonb_build_object('heading', 'ABOUT CENTURY', 'description', 'STUDIO PROFILE • CENTURY IMAGERY LLC'),
  'bio', jsonb_build_object(
    'heading', 'WE DIRECT CINEMA. ARCHITECTING LEGACIES.',
    'text', E'Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.\\n\\nOperating from studio headquarters in Ibadan with active deployments in Lagos and worldwide transit, our unit serves as primary video architect for landmark nightlife, documents state government protocol across consecutive years, and directs campaign visuals for global music icons and continental tech accelerators.\\n\\nWith portfolio releases achieving over 400,000+ organic views, we translate pulsating energy and solemn ceremony into everlasting motion picture art.'
  )
)
WHERE slug = 'about';
`;

const outPath = path.join(__dirname, '../supabase/migrations/20260925000007_seed_legacy_media.sql');
fs.writeFileSync(outPath, sql);
console.log('Migration generated at:', outPath);
