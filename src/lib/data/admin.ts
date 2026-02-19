import { createServiceClient } from "@/lib/supabase/server";

export async function getAdminMetrics() {
  try {
    const supabase = await createServiceClient();
    const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const iso = weekAgo.toISOString();

  const [
    { count: newMembersWeek },
    { count: bookingsRequested },
    { count: bookingsAccepted },
    { count: expertsCount },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }).gte("created_at", iso),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "requested"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "accepted"),
    supabase.from("experts").select("*", { count: "exact", head: true }),
  ]);

  return {
    newMembersWeek: newMembersWeek ?? 0,
    bookingsRequested: bookingsRequested ?? 0,
    bookingsAccepted: bookingsAccepted ?? 0,
    expertsCount: expertsCount ?? 0,
  };
  } catch {
    return {
      newMembersWeek: 0,
      bookingsRequested: 0,
      bookingsAccepted: 0,
      expertsCount: 0,
    };
  }
}
