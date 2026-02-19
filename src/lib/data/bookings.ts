import { createServiceClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/db/types";

export interface BookingWithParties {
  id: string;
  requester_user_id: string;
  expert_user_id: string;
  status: string;
  start_at: string;
  end_at: string;
  notes: string | null;
  meet_link: string | null;
  created_at: string;
  requester?: { name: string | null; email: string } | null;
  expert?: { name: string | null; headline?: string | null } | null;
}

export async function getBookingsForUser(
  userId: string
): Promise<BookingWithParties[]> {
  try {
    const supabase = await createServiceClient();
    const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`requester_user_id.eq.${userId},expert_user_id.eq.${userId}`)
    .order("start_at", { ascending: false });
  if (error) return [];
  const allUserIds = new Set<string>();
  (bookings ?? []).forEach((b: Booking) => {
    allUserIds.add(b.requester_user_id);
    allUserIds.add(b.expert_user_id);
  });
  const ids = Array.from(allUserIds);
  const [usersRes, profilesRes] = await Promise.all([
    supabase.from("users").select("id, name, email").in("id", ids),
    supabase.from("profiles").select("user_id, headline").in("user_id", ids),
  ]);
  const users = (usersRes.data ?? []) as { id: string; name: string | null; email: string }[];
  const profiles = (profilesRes.data ?? []) as { user_id: string; headline: string | null }[];
  const userMap = new Map(users.map((u) => [u.id, u]));
  const profileMap = new Map(profiles.map((p) => [p.user_id, p]));

  return (bookings ?? []).map((b: Booking) => {
    const expertUser = userMap.get(b.expert_user_id);
    const expertData =
      b.expert_user_id === userId
        ? undefined
        : expertUser
          ? { ...expertUser, headline: profileMap.get(b.expert_user_id)?.headline }
          : null;
    return {
      ...b,
      requester:
        b.requester_user_id === userId
          ? undefined
          : userMap.get(b.requester_user_id) ?? null,
      expert: expertData,
    };
  }) as BookingWithParties[];
  } catch {
    return [];
  }
}
