const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
let supabaseUrl = '', supabaseKey = '';
lines.forEach(l => {
  if(l.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = l.split('=')[1].trim();
  if(l.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) supabaseKey = l.split('=')[1].trim();
});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);
const crypto = require('crypto');

const demoPosts = [
  {
    slug: 'the-geometry-of-light-in-lagos',
    title: 'The Geometry of Light in Lagos: Framing the Unseen',
    excerpt: 'An exploration of how harsh equatorial sunlight dictates the cinematic rhythm of West African storytelling.',
    author_name: 'Akin Idowu',
    status: 'published',
    featured: true,
    seo_title: 'The Geometry of Light in Lagos | Century Imagery',
    seo_description: 'Exploring cinematic lighting techniques and the rhythm of West African storytelling on location in Lagos.',
    content: {
      blocks: [
        { id: crypto.randomUUID(), type: 'heading', content: 'Embracing the Harsh African Sun' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'Lagos doesn\'t ease you into the day. The sun hits the pavement with an uncompromising intensity by 8 AM, throwing sharp, high-contrast shadows across the brutalist architecture of the mainland. For a cinematographer, this presents a unique challenge: do you fight the natural contrast with massive diffusion, or do you lean into the geometry of the shadows?' },
        { id: crypto.randomUUID(), type: 'heading', content: 'Silhouettes as Storytellers' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'By exposing for the highlights, we let the shadows fall into a deep, rich black. This naturally created silhouettes that emphasized the form and movement of our subjects against the vibrant, chaotic backdrop of the Balogun market. It\'s a visual language that speaks to the resilience and underlying mystery of the city itself—what is hidden in the shadows is often just as important as what is illuminated.' }
      ]
    }
  },
  {
    slug: 'directors-notes-narrative-in-60-seconds',
    title: 'Director\'s Notes: Condensing Narrative into 60 Seconds',
    excerpt: 'How to establish character, conflict, and resolution in the blink of an eye for modern commercial formats.',
    author_name: 'Century Studio',
    status: 'published',
    featured: false,
    seo_title: 'Commercial Directing: 60 Second Narratives',
    seo_description: 'Learn how to establish character, conflict, and resolution for modern commercial formats.',
    content: {
      blocks: [
        { id: crypto.randomUUID(), type: 'heading', content: 'The Economy of Frames' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'When you have 60 seconds (or increasingly, 15 seconds for social formats), every single frame must carry narrative weight. You don\'t have the luxury of a slow pan to establish the geography; the geography must be immediately understood by the color palette, the production design, and the first action the character takes.' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'In our recent work for a global luxury brand, we had to convey heritage, precision, and modernity in a single sequence. We achieved this by matching the kinetic energy of a contemporary dancer with the slow, deliberate macro shots of a watchmaker. The juxtaposition created a dialectic—the old world precision meeting new world energy—without a single line of dialogue.' }
      ]
    }
  },
  {
    slug: 'behind-the-scenes-nocturne-campaign',
    title: 'Behind the Scenes: The Nocturne Campaign',
    excerpt: 'Rigging heavy cameras to high-speed drones for an ambitious continuous one-take sequence through a moving train.',
    author_name: 'Technical Team',
    status: 'published',
    featured: false,
    seo_title: 'Behind the Scenes: Nocturne Drone Rigging',
    seo_description: 'Technical breakdown of rigging heavy cameras to high-speed drones for a continuous one-take.',
    content: {
      blocks: [
        { id: crypto.randomUUID(), type: 'heading', content: 'Defying Physics' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'The brief sounded impossible: start wide over the savannah, push in through the open window of a moving locomotive, navigate the narrow dining car past talent, and exit the rear door, pulling up into a wide shot—all in one continuous, seamless take. No hidden cuts. No CGI transitions.' },
        { id: crypto.randomUUID(), type: 'heading', content: 'Custom FPV Solutions' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'Standard heavy-lift drones couldn\'t fit through the window, and typical FPV cinewhoops couldn\'t carry the cinema glass the director demanded. Our specialized aerial unit spent three weeks designing a custom 3D-printed rig that could safely carry a stripped-down RED Komodo with a lightweight prime lens. The result was a rig that had a margin of error of less than 2 inches on either side as it passed through the train window at 30 miles per hour.' }
      ]
    }
  },
  {
    slug: 'color-grading-the-feeling-of-nostalgia',
    title: 'Color Grading: Engineering the Feeling of Nostalgia',
    excerpt: 'Why halation, grain structure, and lifted blacks evoke emotional responses from audiences.',
    author_name: 'Century Post Lab',
    status: 'published',
    featured: false,
    seo_title: 'Color Grading Nostalgia | Post Production',
    seo_description: 'Understanding how halation, grain structure, and lifted blacks evoke emotional responses.',
    content: {
      blocks: [
        { id: crypto.randomUUID(), type: 'paragraph', content: 'Digital sensors are perfect. They capture an incredible amount of dynamic range with absolute clinical precision, virtually no noise, and perfect color fidelity. And yet, the first thing we do in the color suite is try to break that perfection.' },
        { id: crypto.randomUUID(), type: 'heading', content: 'The Psychology of Film Emulation' },
        { id: crypto.randomUUID(), type: 'paragraph', content: 'Why do audiences respond to the imperfections of celluloid? It\'s deeply psychological. Film grain mimics the organic imperfection of human memory. We don\'t remember events in crisp 8K resolution; we remember the feeling, the warmth, the slight blur of motion. By lifting the black levels slightly to reduce contrast, introducing sub-pixel halation around bright light sources, and applying a custom print film LUT, we are essentially signaling to the viewer\'s brain: "This is a memory. This is important."' }
      ]
    }
  }
];

async function seed() {
  for (const post of demoPosts) {
    const { error } = await supabase.from('journal_posts').insert({ ...post, published_at: new Date().toISOString() });
    if (error && error.code !== '23505') console.error('Error inserting', post.slug, error);
    else console.log('Seeded', post.slug);
  }
}
seed();
