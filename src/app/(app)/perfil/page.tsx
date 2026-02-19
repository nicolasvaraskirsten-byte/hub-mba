import { requireSession } from "@/lib/auth-utils";
import { getProfileByUserId } from "@/lib/data/profile";
import { ProfileForm } from "./_components/ProfileForm";

export default async function PerfilPage() {
  const session = await requireSession();
  const profile = await getProfileByUserId(session.user.id!);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Mi perfil
      </h1>
      <p className="text-muted-foreground mt-2">
        Completa o edita tu perfil para que otros miembros te encuentren.
      </p>
      <div className="mt-8 max-w-2xl">
        <ProfileForm
          userId={session.user.id!}
          initialData={{
            headline: profile?.headline ?? "",
            bio: profile?.bio ?? "",
            linkedin_url: profile?.linkedin_url ?? "",
            company: profile?.company ?? "",
            industry: profile?.industry ?? "",
            location: profile?.location ?? "",
            interests: profile?.interests ?? [],
            goals: profile?.goals ?? [],
            public: profile?.public ?? false,
          }}
        />
      </div>
    </div>
  );
}
