export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          role: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      site_settings: {
        Row: {
          id: string
          site_name: string | null
          site_description: string | null
          logo_url: string | null
          favicon_url: string | null
          email: string | null
          phone: string | null
          whatsapp: string | null
          address: string | null
          footer_tagline: string | null
          instagram_url: string | null
          facebook_url: string | null
          youtube_url: string | null
          tiktok_url: string | null
          linkedin_url: string | null
          seo_title: string | null
          seo_description: string | null
          seo_image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          site_name?: string | null
          site_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          email?: string | null
          phone?: string | null
          whatsapp?: string | null
          address?: string | null
          footer_tagline?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          tiktok_url?: string | null
          linkedin_url?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          site_name?: string | null
          site_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          email?: string | null
          phone?: string | null
          whatsapp?: string | null
          address?: string | null
          footer_tagline?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          tiktok_url?: string | null
          linkedin_url?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          status: string | null
          seo_title: string | null
          seo_description: string | null
          seo_image_url: string | null
          content: Json | null
          created_at: string | null
          updated_at: string | null
          published_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image_url?: string | null
          content?: Json | null
          created_at?: string | null
          updated_at?: string | null
          published_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image_url?: string | null
          content?: Json | null
          created_at?: string | null
          updated_at?: string | null
          published_at?: string | null
        }
      }
      media: {
        Row: {
          id: string
          filename: string | null
          original_filename: string | null
          media_type: string | null
          mime_type: string | null
          file_size: number | null
          provider: string | null
          provider_asset_id: string | null
          provider_url: string | null
          thumbnail_url: string | null
          playback_url: string | null
          duration_seconds: number | null
          width: number | null
          height: number | null
          status: string | null
          alt_text: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          filename?: string | null
          original_filename?: string | null
          media_type?: string | null
          mime_type?: string | null
          file_size?: number | null
          provider?: string | null
          provider_asset_id?: string | null
          provider_url?: string | null
          thumbnail_url?: string | null
          playback_url?: string | null
          duration_seconds?: number | null
          width?: number | null
          height?: number | null
          status?: string | null
          alt_text?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          filename?: string | null
          original_filename?: string | null
          media_type?: string | null
          mime_type?: string | null
          file_size?: number | null
          provider?: string | null
          provider_asset_id?: string | null
          provider_url?: string | null
          thumbnail_url?: string | null
          playback_url?: string | null
          duration_seconds?: number | null
          width?: number | null
          height?: number | null
          status?: string | null
          alt_text?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          client_name: string | null
          category: string | null
          year: number | null
          location: string | null
          short_description: string | null
          description: string | null
          featured: boolean | null
          status: string | null
          cover_media_id: string | null
          hero_media_id: string | null
          seo_title: string | null
          seo_description: string | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
          published_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          client_name?: string | null
          category?: string | null
          year?: number | null
          location?: string | null
          short_description?: string | null
          description?: string | null
          featured?: boolean | null
          status?: string | null
          cover_media_id?: string | null
          hero_media_id?: string | null
          seo_title?: string | null
          seo_description?: string | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          published_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          client_name?: string | null
          category?: string | null
          year?: number | null
          location?: string | null
          short_description?: string | null
          description?: string | null
          featured?: boolean | null
          status?: string | null
          cover_media_id?: string | null
          hero_media_id?: string | null
          seo_title?: string | null
          seo_description?: string | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          published_at?: string | null
        }
      }
      project_media: {
        Row: {
          id: string
          project_id: string | null
          media_id: string | null
          media_type: string | null
          sort_order: number | null
          caption: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          media_id?: string | null
          media_type?: string | null
          sort_order?: number | null
          caption?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          media_id?: string | null
          media_type?: string | null
          sort_order?: number | null
          caption?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string | null
          description: string | null
          icon: string | null
          cover_media_id: string | null
          featured: boolean | null
          sort_order: number | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          short_description?: string | null
          description?: string | null
          icon?: string | null
          cover_media_id?: string | null
          featured?: boolean | null
          sort_order?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          short_description?: string | null
          description?: string | null
          icon?: string | null
          cover_media_id?: string | null
          featured?: boolean | null
          sort_order?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      service_items: {
        Row: {
          id: string
          service_id: string | null
          title: string
          description: string | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          service_id?: string | null
          title: string
          description?: string | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          service_id?: string | null
          title?: string
          description?: string | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      journal_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: Json | null
          cover_media_id: string | null
          author_name: string | null
          status: string | null
          featured: boolean | null
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content?: Json | null
          cover_media_id?: string | null
          author_name?: string | null
          status?: string | null
          featured?: boolean | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: Json | null
          cover_media_id?: string | null
          author_name?: string | null
          status?: string | null
          featured?: boolean | null
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          reference_code: string | null
          name: string
          email: string
          phone: string | null
          company: string | null
          service: string | null
          project_name: string | null
          preferred_date: string | null
          location: string | null
          budget: string | null
          message: string | null
          status: string | null
          admin_notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          reference_code?: string | null
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service?: string | null
          project_name?: string | null
          preferred_date?: string | null
          location?: string | null
          budget?: string | null
          message?: string | null
          status?: string | null
          admin_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          reference_code?: string | null
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service?: string | null
          project_name?: string | null
          preferred_date?: string | null
          location?: string | null
          budget?: string | null
          message?: string | null
          status?: string | null
          admin_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
