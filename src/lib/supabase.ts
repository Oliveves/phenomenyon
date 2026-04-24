import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn("[supabase] Missing env vars. Waitlist submit will fail.")
}

export const supabase = createClient(url ?? "", anonKey ?? "")

export type WaitlistSource = "home" | "silk-wave-detail"

export async function submitWaitlist(email: string, source: WaitlistSource) {
  const { error } = await supabase.from("waitlist").insert({ email, source })
  if (error) {
    if (error.code === "23505") return { ok: true as const, duplicate: true }
    return { ok: false as const, error: error.message }
  }
  return { ok: true as const, duplicate: false }
}
