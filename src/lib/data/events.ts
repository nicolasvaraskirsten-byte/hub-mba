import { createServiceClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/db/types";

/** Eventos que aún no terminan: end_at es null o end_at >= ahora (incluye en curso y futuros). */
export async function getEventsPreview(limit: number): Promise<Event[]> {
  try {
    const supabase = await createServiceClient();
    const now = new Date();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_at", { ascending: true })
      .limit(50);
    if (error) return [];
    const events = (data ?? []) as Event[];
    const notEnded = events.filter(
      (e) => !e.end_at || new Date(e.end_at) >= now
    );
    return notEnded.slice(0, limit);
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

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data as Event;
  } catch {
    return null;
  }
}
