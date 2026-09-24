export type ProjectCategory =
  | "ENTERTAINMENT"
  | "DOCUMENTARY"
  | "MUSIC"
  | "CORPORATE"
  | "CULTURAL"
  | "COMMERCIAL"
  | "FASHION"
  | "BRAND"
  | "ART";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  story?: string;
  heroImage: string;
  heroVideo?: string;
  gallery: string[];
  services: string[];
  credits: ProjectCredit[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  imagePlaceholder: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  category: "Behind The Scenes" | "Director's Notes" | "Campaigns" | "Cinematography" | "Culture";
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: string;
  featured?: boolean;
  pullQuote?: string;
  cameraSpecs?: string[];
}
