import { createBrowserClient } from "@supabase/ssr"

const getSupabaseBrowserClient = () => {
  if (typeof window === "undefined") {
    throw new Error("Supabase browser client can only be used in the browser")
  }

  // Store the client on the window object to survive hot reloads
  if (!(window as any).__supabase) {
    ;(window as any).__supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  return (window as any).__supabase
}

export function createClient() {
  return getSupabaseBrowserClient()
}
