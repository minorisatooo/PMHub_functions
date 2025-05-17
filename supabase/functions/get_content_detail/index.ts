import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const url = new URL(req.url)
  const contentId = url.searchParams.get("id")

  if (!contentId) {
    return new Response("Missing content ID", { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  )

  // contents + mediums
  const { data: content, error: contentError } = await supabase
    .from("contents")
    .select(`
      id,
      title,
      duration,
      url,
      pm_level_hint,
      created_at,
      content_mediums (
        name
      )
    `)
    .eq("id", contentId)
    .single()

  if (contentError || !content) {
    return new Response(JSON.stringify({ error: contentError }), { status: 404 })
  }

  // categories JOIN
  const { data: categories } = await supabase
    .from("content_category_links")
    .select("content_id, category:content_categories(name)")
    .eq("content_id", contentId)

  return new Response(
    JSON.stringify({
      ...content,
      categories: categories?.map(c => c.category.name) ?? []
    }),
    { status: 200 }
  )
})
