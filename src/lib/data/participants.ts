import { createServiceClient } from "@/lib/supabase/server";
import type { User, Profile } from "@/lib/db/types";

export interface ParticipantWithProfile {
  id: string;
  name: string | null;
  email: string;
  avatar_url: string | null;
  profile: Profile | null;
}

export async function getParticipantsList(): Promise<ParticipantWithProfile[]> {
  try {
    const supabase = await createServiceClient();
    const { data: profiles, error: pError } = await supabase
    .from("profiles")
    .select("*")
    .eq("public", true);
  if (pError || !profiles?.length) return [];
  const userIds = (profiles as { user_id: string }[]).map((p) => p.user_id);
  const { data: users, error: uError } = await supabase
    .from("users")
    .select("id, name, email, avatar_url")
    .in("id", userIds)
    .eq("role", "participant");
  if (uError || !users?.length) return [];
  const profileMap = new Map(
    (profiles as Profile[]).map((p) => [p.user_id, p])
  );
  return (users as User[]).map((u) => ({
    ...u,
    profile: profileMap.get(u.id) ?? null,
  })) as ParticipantWithProfile[];
  } catch {
    return [];
  }
}
