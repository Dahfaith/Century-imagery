import { JournalArticle } from "./types";

export const articles: JournalArticle[] = [
  {
    slug: "the-geometry-of-light-in-lagos",
    title: "The Geometry of Light: Capturing West African Daylight on Anamorphic Glass",
    category: "Cinematography",
    date: "September 2025",
    readTime: "4 min read",
    author: "Akin Idowu",
    featured: true,
    pullQuote:
      "Daylight in coastal Lagos is not a passive element; it is an active optical character with visceral texture and fierce intensity.",
    excerpt:
      "A technical and aesthetic reflection on balancing intense midday equatorial sunshine with deep architectural shadow play.",
    cameraSpecs: [
      "ARRI Alexa Mini LF",
      "Cooke Anamorphic /i Full Frame Plus",
      "Tiffen Black Pro-Mist 1/4",
      "DaVinci Resolve 19 Studio",
    ],
    content: [
      "Shooting in coastal West Africa presents an optical contrast unlike anywhere else in the world. The sunlight is direct, golden, and mercilessly sharp. If approached with standard European diffusion techniques, one risks flattening the rich, dynamic vitality that defines this territory.",
      "In this breakdown, we examine our lighting package for our latest editorial piece, utilizing vintage Russian prime lenses paired with custom diffusion to achieve an organic texture.",
      "By embracing negative fill—blocking light rather than adding artificial bounce—we sculpted deep, velvety blacks against glowing skin highlights. This contrast ratio forms the visual signature of Century Imagery LLC.",
      "In The Century Post Lab, we built bespoke film-emulation curves in DaVinci Resolve, pulling subtle warm gold into the roll-off highlights while maintaining absolute neutrality in the deep shadow detail.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "directors-notes-narrative-in-60-seconds",
    title: "Director's Notes: Sculpting Narrative Emotion in Under 60 Seconds",
    category: "Director's Notes",
    date: "August 2025",
    readTime: "3 min read",
    author: "Akin Idowu",
    featured: false,
    pullQuote:
      "Commercial films must make every single frame justify its existence. The art lies not in packing more visual information, but in crafting moments of negative space.",
    excerpt:
      "How deliberate pacing, macro framing, and dynamic sound design tell an entire brand story before the viewer looks away.",
    cameraSpecs: [
      "RED V-Raptor 8K VV",
      "Atlas Orion 2x Anamorphic",
      "Sound Devices 833 / Custom Foley",
    ],
    content: [
      "The sixty-second format is the ultimate crucible of cinematic discipline. With zero tolerance for ornamental excess, each transition must deliver dramatic revelation.",
      "When directing commercial films for luxury brands, we often start by designing the soundscape before the camera rolls. A heartbeat rhythm, the tactile strike of a lighter, or the rustle of raw silk can anchor the audience before the visual cut occurs.",
      "When image and auditory pacing lock into synchrony, sixty seconds feels expansive—a full narrative journey rendered with cinematic weight.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "behind-the-scenes-nocturne-campaign",
    title: "Behind The Scenes: Lighting the Shadows of Nocturne Velvet",
    category: "Behind The Scenes",
    date: "July 2025",
    readTime: "5 min read",
    author: "Century Imagery Production Team",
    featured: false,
    pullQuote:
      "Building a nocturnal mood requires darkness to be treated as a physical material rather than just the absence of light.",
    excerpt:
      "On set with the camera team in Abuja: rigged gimbals, haze atmospheres, and warm tungsten lighting setups.",
    cameraSpecs: [
      "Sony FX9 / FX3 Rigged Gimbal",
      "Dedo Light Tungsten Package",
      "Hazer Atmos System",
    ],
    content: [
      "Nocturne Velvet required us to shoot in an authentic brutalist cellar with minimal ambient luminance. Our mandate: keep the image rich and luxurious without slipping into muddy underexposure.",
      "We deployed a low-wattage tungsten package hidden behind architectural columns, projecting micro-pools of 2800K warmth that kissed glassware and reflective bar surfaces.",
      "Using haze as an optical diffuser, light beams became tangible ribbons in space, creating dimension and depth without clouding skin tones.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "the-rebirth-of-african-luxury-cinema",
    title: "Culture & Aesthetics: The Global Rebirth of African Luxury Cinema",
    category: "Culture",
    date: "June 2025",
    readTime: "4 min read",
    author: "Akin Idowu",
    featured: false,
    pullQuote:
      "We are no longer translating our culture for external validation; we are setting the aesthetic agenda for global cinema.",
    excerpt:
      "How contemporary African directors are redefining luxury visual storytelling across fashion, music, and international brand campaigns.",
    cameraSpecs: [
      "Anamorphic 35mm Format",
      "West African Natural Light",
      "Handcrafted Set Production",
    ],
    content: [
      "A seismic shift is unfolding in global visual culture. From Lagos and Accra to Johannesburg, African filmmakers are establishing a fresh cinematic grammar.",
      "It is characterized by unapologetic color palettes, monumental architectural framing, and an innate reverence for legacy celebrations.",
      "At Century Imagery LLC, we stand at the vanguard of this movement—proving that the highest tier of commercial and narrative cinema can be conceptualized and produced entirely in West Africa for the world's most discerning audiences.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "architecting-the-visual-brand-campaign",
    title: "Campaigns: Architecting a Visual Identity from Treatment to Broadcast",
    category: "Campaigns",
    date: "May 2025",
    readTime: "3 min read",
    author: "Akin Idowu",
    featured: false,
    pullQuote:
      "A campaign film without a distinct optical thesis is merely moving noise.",
    excerpt:
      "Inside the conceptual journey: pitch treatments, production design supervision, and post-production execution.",
    cameraSpecs: [
      "Cinema Optical Treatment",
      "Storyboard Concept Art",
      "4K Deliverable Package",
    ],
    content: [
      "Before a camera rig is assembled or a location secured, the success of a campaign film is determined in the treatment phase.",
      "We collaborate closely with brand leaders to identify the core emotional archetype. Are we evoking quiet reverence, nocturnal mystery, or kinetic rebellion?",
      "Once that core frequency is established, every department—costume, lighting, lens choice, and sound—operates in harmonious alignment.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];
