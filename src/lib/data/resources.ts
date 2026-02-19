import { createServiceClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/db/types";

export async function getResourcesList(limit = 50): Promise<Resource[]> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as Resource[];
  } catch {
    return [];
  }
}
