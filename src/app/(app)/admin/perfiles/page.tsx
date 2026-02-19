import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { ToggleProfilePublic } from "./_components/ToggleProfilePublic";

export default async function AdminPerfilesPage() {
  let profiles: { user_id: string; headline: string | null; public: boolean }[] = [];
  let users: { id: string; name: string | null; email: string }[] = [];
  try {
    const supabase = await createServiceClient();
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false });
    profiles = profilesData ?? [];
    const userIds = profiles.map((p) => p.user_id);
    if (userIds.length) {
      const { data: usersData } = await supabase
        .from("users")
        .select("id, name, email")
        .in("id", userIds);
      users = usersData ?? [];
    }
  } catch {
    // Sin Supabase: listas vacías
  }
  const userMap = new Map(users.map((u) => [u.id, u]));
  const withUsers = profiles.map((p) => ({
    ...p,
    user_name: userMap.get(p.user_id)?.name,
    user_email: userMap.get(p.user_id)?.email,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver al admin
      </Link>
      <h1 className="text-2xl font-bold">Aprobar perfiles</h1>
      <p className="text-muted-foreground mt-1">
        Activa o desactiva la visibilidad en el directorio de participantes.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-medium">Usuario</th>
              <th className="text-left py-3 font-medium">Headline</th>
              <th className="text-left py-3 font-medium">Público</th>
            </tr>
          </thead>
          <tbody>
            {withUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No hay perfiles aún.
                </td>
              </tr>
            ) : (
              (withUsers as { user_id: string; headline: string | null; public: boolean; user_name: string | null; user_email: string }[]).map((p) => (
                <tr key={p.user_id} className="border-b">
                  <td className="py-3">
                    <p className="font-medium">{p.user_name ?? "—"}</p>
                    <p className="text-muted-foreground">{p.user_email}</p>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.headline ?? "—"}</td>
                  <td className="py-3">
                    <ToggleProfilePublic userId={p.user_id} current={p.public} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
