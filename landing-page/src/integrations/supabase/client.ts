import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// URL sem barra no final (ex: https://xxx.supabase.co)
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "[Supabase] Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env ou nas variáveis do Vercel."
  );
}

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storage: localStorage,
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : (null as unknown as ReturnType<typeof createClient<Database>>);
