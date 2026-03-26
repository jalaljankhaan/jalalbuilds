/**
 * Supabase Database schema for jalalbuilds.
 * Matches tables: blog_posts, contact_messages, contact_packages, projects, testimonials, newsletter_subscribers.
 * Regenerate via `npx supabase gen types typescript` and paste output to stay in sync.
 */
export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description: string | null;
          url: string | null;
          tags: string[];
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          description?: string | null;
          url?: string | null;
          tags?: string[];
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          description?: string | null;
          url?: string | null;
          tags?: string[];
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
      };
      contact_packages: {
        Row: {
          id: string;
          label: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description: string | null;
          url: string | null;
          tags: string[];
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          description?: string | null;
          url?: string | null;
          tags?: string[];
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          description?: string | null;
          url?: string | null;
          tags?: string[];
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string | null;
          quote: string;
          order_index: number;
          is_visible: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          company?: string | null;
          quote: string;
          order_index?: number;
          is_visible?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          company?: string | null;
          quote?: string;
          order_index?: number;
          is_visible?: boolean;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
