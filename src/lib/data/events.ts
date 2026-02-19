import { createServiceClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/db/types";

export async function getEventsPreview(limit: number): Promise<Event[]> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as Event[];
  } catch {
    return [];
  }
}

export async function getEventsList(limit = 50): Promise<Event[]> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as Event[];
  } catch {
    return [];
  }
}
