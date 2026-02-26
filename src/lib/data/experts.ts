import { createServiceClient } from "@/lib/supabase/server";
import type { ExpertWithUser } from "@/lib/db/types";

export async function getExpertsPreview(limit: number): Promise<ExpertWithUser[]> {
  try {
    const supabase = await createServiceClient();
  const { data: experts, error } = await supabase
    .from("experts")
    .select("*")
    .eq("featured", true)
    .order("user_id", { ascending: true })
    .limit(limit);

  if (error) return [];
  if (!experts?.length) {
    const { data: anyExperts } = await supabase
      .from("experts")
      .select("*")
      .order("user_id", { ascending: true })
      .limit(limit);
    if (!anyExperts?.length) return [];
    return enrichExperts(anyExperts, supabase);
  }
  return enrichExperts(experts, supabase);
  } catch {
    return [];
  }
}

async function enrichExperts(
  experts: { user_id: string; [k: string]: unknown }[],
  supabase: Awaited<ReturnType<typeof createServiceClient>>
): Promise<ExpertWithUser[]> {
  const userIds = experts.map((e) => e.user_id);
  const [usersRes, profilesRes] = await Promise.all([
    supabase.from("users").select("*").in("id", userIds),
    supabase.from("profiles").select("*").in("user_id", userIds),
  ]);
  const users = (usersRes.data ?? []) as { id: string; name: string | null; avatar_url: string | null }[];
  const profiles = (profilesRes.data ?? []) as { user_id: string; headline: string | null }[];
  const userMap = new Map(users.map((u) => [u.id, u]));
  const profileMap = new Map(profiles.map((p) => [p.user_id, p]));

  return experts.map((e) => ({
    ...e,
    user: userMap.get(e.user_id) ?? null,
    profile: profileMap.get(e.user_id) ?? null,
  })) as ExpertWithUser[];
}

export async function getExpertsList(filters?: {
  industry?: string;
  expertise?: string;
  featured?: boolean;
}): Promise<ExpertWithUser[]> {
  try {
    const supabase = await createServiceClient();
    let q = supabase.from("experts").select("*");
    if (filters?.featured != null) q = q.eq("featured", filters.featured);
    if (filters?.industry)
      q = q.contains("industries", [filters.industry]);
    if (filters?.expertise)
      q = q.contains("expertise", [filters.expertise]);
    const { data: experts, error } = await q.order("user_id", { ascending: true });
    if (error) return [];
    return enrichExperts(experts ?? [], supabase);
  } catch {
    return [];
  }
}

export async function getExpertById(id: string): Promise<ExpertWithUser | null> {
  try {
    const supabase = await createServiceClient();
    const { data: expert, error } = await supabase
      .from("experts")
      .select("*")
      .eq("user_id", id)
      .single();
    if (error || !expert) return null;
    const [enriched] = await enrichExperts([expert], supabase);
    if (!enriched) return null;
    // Normalizar para evitar props no serializables o columnas faltantes
    return {
      ...enriched,
      calendly_url: enriched.calendly_url ?? null,
    } as ExpertWithUser;
  } catch {
    return null;
  }
}
