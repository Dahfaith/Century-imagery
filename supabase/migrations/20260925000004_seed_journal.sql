-- 20260925000004_seed_journal.sql

DO $$
BEGIN

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'the-geometry-of-light-in-lagos') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'the-geometry-of-light-in-lagos',
      'The Geometry of Light in Lagos: Framing the Unseen',
      'An exploration of how harsh equatorial sunlight dictates the cinematic rhythm of West African storytelling.',
      'Akin Idowu',
      'published',
      true,
      'The Geometry of Light in Lagos | Century Imagery',
      'Exploring cinematic lighting techniques and the rhythm of West African storytelling on location in Lagos.',
      NOW(),
      '{
        "blocks": [
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111111",
            "type": "heading",
            "content": "Embracing the Harsh African Sun"
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111112",
            "type": "paragraph",
            "content": "Lagos doesn''t ease you into the day. The sun hits the pavement with an uncompromising intensity by 8 AM, throwing sharp, high-contrast shadows across the brutalist architecture of the mainland. For a cinematographer, this presents a unique challenge: do you fight the natural contrast with massive diffusion, or do you lean into the geometry of the shadows? During our recent production for the Rebel Empire campaign, we chose the latter."
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111113",
            "type": "heading",
            "content": "Silhouettes as Storytellers"
          },
          {
            "id": "e2f1b4a1-0000-0000-0000-111111111114",
            "type": "paragraph",
            "content": "By exposing for the highlights, we let the shadows fall into a deep, rich black. This naturally created silhouettes that emphasized the form and movement of our subjects against the vibrant, chaotic backdrop of the Balogun market. It’s a visual language that speaks to the resilience and underlying mystery of the city itself—what is hidden in the shadows is often just as important as what is illuminated."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'directors-notes-narrative-in-60-seconds') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'directors-notes-narrative-in-60-seconds',
      'Director''s Notes: Condensing Narrative into 60 Seconds',
      'How to establish character, conflict, and resolution in the blink of an eye for modern commercial formats.',
      'Century Studio',
      'published',
      false,
      'Commercial Directing: 60 Second Narratives',
      'Learn how to establish character, conflict, and resolution for modern commercial formats.',
      NOW() - INTERVAL '3 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222221",
            "type": "heading",
            "content": "The Economy of Frames"
          },
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222222",
            "type": "paragraph",
            "content": "When you have 60 seconds (or increasingly, 15 seconds for social formats), every single frame must carry narrative weight. You don''t have the luxury of a slow pan to establish the geography; the geography must be immediately understood by the color palette, the production design, and the first action the character takes."
          },
          {
            "id": "e2f1b4a2-0000-0000-0000-222222222223",
            "type": "paragraph",
            "content": "In our recent work for a global luxury brand, we had to convey heritage, precision, and modernity in a single sequence. We achieved this by matching the kinetic energy of a contemporary dancer with the slow, deliberate macro shots of a watchmaker. The juxtaposition created a dialectic—the old world precision meeting new world energy—without a single line of dialogue."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'behind-the-scenes-nocturne-campaign') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'behind-the-scenes-nocturne-campaign',
      'Behind the Scenes: The Nocturne Campaign',
      'Rigging heavy cameras to high-speed drones for an ambitious continuous one-take sequence through a moving train.',
      'Technical Team',
      'published',
      false,
      'Behind the Scenes: Nocturne Drone Rigging',
      'Technical breakdown of rigging heavy cameras to high-speed drones for a continuous one-take.',
      NOW() - INTERVAL '10 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333331",
            "type": "heading",
            "content": "Defying Physics"
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333332",
            "type": "paragraph",
            "content": "The brief sounded impossible: start wide over the savannah, push in through the open window of a moving locomotive, navigate the narrow dining car past talent, and exit the rear door, pulling up into a wide shot—all in one continuous, seamless take. No hidden cuts. No CGI transitions."
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333333",
            "type": "heading",
            "content": "Custom FPV Solutions"
          },
          {
            "id": "e2f1b4a3-0000-0000-0000-333333333334",
            "type": "paragraph",
            "content": "Standard heavy-lift drones couldn''t fit through the window, and typical FPV cinewhoops couldn''t carry the cinema glass the director demanded. Our specialized aerial unit spent three weeks designing a custom 3D-printed rig that could safely carry a stripped-down RED Komodo with a lightweight prime lens. The result was a rig that had a margin of error of less than 2 inches on either side as it passed through the train window at 30 miles per hour."
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'color-grading-the-feeling-of-nostalgia') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'color-grading-the-feeling-of-nostalgia',
      'Color Grading: Engineering the Feeling of Nostalgia',
      'Why halation, grain structure, and lifted blacks evoke emotional responses from audiences.',
      'Century Post Lab',
      'published',
      false,
      'Color Grading Nostalgia | Post Production',
      'Understanding how halation, grain structure, and lifted blacks evoke emotional responses.',
      NOW() - INTERVAL '15 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444441",
            "type": "paragraph",
            "content": "Digital sensors are perfect. They capture an incredible amount of dynamic range with absolute clinical precision, virtually no noise, and perfect color fidelity. And yet, the first thing we do in the color suite is try to break that perfection."
          },
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444442",
            "type": "heading",
            "content": "The Psychology of Film Emulation"
          },
          {
            "id": "e2f1b4a4-0000-0000-0000-444444444443",
            "type": "paragraph",
            "content": "Why do audiences respond to the imperfections of celluloid? It''s deeply psychological. Film grain mimics the organic imperfection of human memory. We don''t remember events in crisp 8K resolution; we remember the feeling, the warmth, the slight blur of motion. By lifting the black levels slightly to reduce contrast, introducing sub-pixel halation around bright light sources, and applying a custom print film LUT, we are essentially signaling to the viewer''s brain: ''This is a memory. This is important.''"
          }
        ]
      }'::jsonb
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.journal_posts WHERE slug = 'the-future-of-virtual-production-in-africa') THEN
    INSERT INTO public.journal_posts (
      id, slug, title, excerpt, author_name, status, featured, seo_title, seo_description, published_at, content
    ) VALUES (
      uuid_generate_v4(),
      'the-future-of-virtual-production-in-africa',
      'The Future of Virtual Production in Africa',
      'How LED volumes are democratizing high-concept sci-fi and fantasy storytelling for local filmmakers.',
      'Akin Idowu',
      'published',
      true,
      'Virtual Production in Africa',
      'How LED volumes are democratizing high-concept sci-fi and fantasy storytelling.',
      NOW() - INTERVAL '30 days',
      '{
        "blocks": [
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555551",
            "type": "heading",
            "content": "Beyond Green Screens"
          },
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555552",
            "type": "paragraph",
            "content": "For decades, African filmmakers with ambitious sci-fi or fantasy scripts were hampered by the sheer cost of post-production VFX and the unconvincing lighting problems inherent to green screen shoots. Virtual production—shooting on a stage surrounded by high-resolution LED screens displaying real-time 3D environments rendered in Unreal Engine—is completely changing the calculus."
          },
          {
            "id": "e2f1b4a5-0000-0000-0000-555555555553",
            "type": "paragraph",
            "content": "Because the LED screens physically emit light, the actors are actually illuminated by the virtual environment. A scene set on a neon-drenched cyberpunk street in 2100 Lagos casts genuine, accurate reflections on the characters'' skin and props in-camera. This not only dramatically reduces post-production costs but allows the director and actors to actually see and react to the world they are performing in. It is a paradigm shift that is finally leveling the playing field for global storytelling."
          }
        ]
      }'::jsonb
    );
  END IF;

END $$;
