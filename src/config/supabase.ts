export const SUPABASE_CONFIG = {
  url: (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || "",
  anonKey:
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || "",
};

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}
