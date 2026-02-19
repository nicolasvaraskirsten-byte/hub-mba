import { createServiceClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/db/types";

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error || !data) return null;
    return data as Profile;
  } catch {
    return null;
  }
}
