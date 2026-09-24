import { ServiceItem } from "./types";

export const services: ServiceDivision[] = [
  {
    id: "film-cinema-production",
    number: "01",
    title: "Film & Cinema Production",
    category: "MOTION PICTURES & NARRATIVE",
    tagline: "Feature film cinematography, documentaries, and auteur-grade music video direction.",
    description:
      "Crafted to the exacting standards of international cinema. From narrative feature films and compelling documentaries to high-concept music video production, we direct moving images with cinematic depth and emotional resonance.",
    capabilities: [
      "Feature Film Cinematography",
      "Short Films & Documentaries",
      "Music Video Direction & Production",
      "Film Directing & Producing",
    ],
    imagePlaceholder: "/services/film-cinema.jpg",
  },
  {
    id: "commercial-brand-production",
    number: "02",
    title: "Commercial & Brand Production",
    category: "CAMPAIGNS & BRAND STORYTELLING",
    tagline: "Broadcast TV commercials, digital ads, and luxury fashion & beauty campaigns.",
    description:
      "We architect high-impact brand campaign films and commercial narratives for discerning brands, translating corporate vision and product artistry into unforgettable motion pictures.",
    capabilities: [
      "TV Commercials & Digital Ads",
      "Brand Films & Corporate Stories",
      "Fashion & Beauty Campaigns",
      "Product Commercials",
    ],
    imagePlaceholder: "/brand/hero-mockup-gold.png",
    videoUrl: "/services/commercial-brand.MOV",
  },
  {
    id: "luxury-event-cinema",
    number: "03",
    title: "Luxury Event Cinema",
    category: "LEGACY CELEBRATIONS & NOCTURNE",
    tagline: "Century Legacy wedding films, nightlife cinematography, and multi-cam live production.",
    description:
      "Transforming once-in-a-lifetime celebrations into timeless cinematic heirlooms. We capture bespoke weddings, high-society galas, and immersive nightlife with refined discretion and cinematic flair.",
    capabilities: [
      "Century Legacy Wedding Films",
      "Luxury Event Coverage",
      "After Dark — Nightlife & Lounge Cinematography",
      "Live Event Multi-Cam Production",
    ],
    imagePlaceholder: "/services/luxury-event.jpg",
  },
  {
    id: "century-post-lab",
    number: "04",
    title: "The Century Post Lab",
    category: "POST-PRODUCTION & FINISHING",
    tagline: "Film-grade DaVinci color grading, story cutting, sound design, and 4K mastering.",
    description:
      "Our dedicated post-production lab brings every frame to master perfection. Precision narrative cutting, bespoke soundscapes, motion graphics, and multi-format delivery tailored to global broadcast and mobile cinema.",
    capabilities: [
      "Cinematic Editing & Story Cutting",
      "Film-Grade Color Grading (DaVinci Resolve)",
      "Sound Design & Score Mixing",
      "Motion Graphics & Visual Effects",
      "Trailer & Teaser Cuts",
      "4K Mastering & Multi-Format Delivery (16:9, 9:16, 1:1)",
    ],
    imagePlaceholder: "/services/post-lab.jpg",
  },
  {
    id: "aerial-specialized",
    number: "05",
    title: "Aerial & Specialized",
    category: "OPTICS & FLIGHT CINEMA",
    tagline: "Licensed 4K/6K drone cinematography, high-speed capture, and studio lighting.",
    description:
      "Expanding the physical boundaries of cinema. Utilizing certified high-altitude drone systems, high-frame-rate slow-motion cameras, and specialized lighting setups for complex location environments.",
    capabilities: [
      "Licensed Drone Cinematography (4K/6K)",
      "Slow Motion & High-Speed Capture",
      "Studio & Location Lighting Setup",
    ],
    imagePlaceholder: "/brand/hero-mockup-gold.png",
    videoUrl: "/services/aerial-specialized.MOV",
  },
  {
    id: "photography-division",
    number: "06",
    title: "Photography Division",
    category: "EDITORIAL STILLS & CAMPAIGNS",
    tagline: "Stunning editorial, commercial, fashion, and lifestyle photography.",
    description:
      "High-fashion editorial stills and commercial photography that complement our motion picture work, capturing light and human character with sculptural poise.",
    capabilities: [
      "Editorial & Commercial Photography",
      "Fashion & Lifestyle Shoots",
    ],
    imagePlaceholder: "/services/photography.jpg",
    videoUrl: "/services/photography.MOV",
  },
  {
    id: "production-support",
    number: "07",
    title: "Production Support",
    category: "INFRASTRUCTURE & LOGISTICS",
    tagline: "Creative direction, concept development, location scouting, casting, and crew hire.",
    description:
      "Full-scale production infrastructure for visiting international crews and domestic productions. We provide comprehensive creative leadership, top-tier cinema equipment rental, and vetted technical personnel.",
    capabilities: [
      "Creative Direction & Concept Development",
      "Location Scouting & Casting",
      "Equipment Rental & Crew Hire",
    ],
    imagePlaceholder: "/services/production-support.jpg",
  },
];

export interface ServiceDivision {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  imagePlaceholder: string;
  videoUrl?: string;
}
