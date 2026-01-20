import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase(): Promise<SupabaseClient> {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return supabaseInstance;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string;
  link: string | null;
  featured: boolean;
  created_at: string;
};

export type ContactLead = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: boolean;
  ip: string;
  city: string;
  country: string;
  timezone: string;
  system: string;
};
