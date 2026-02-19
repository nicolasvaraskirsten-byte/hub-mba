import { notFound } from "next/navigation";
import { getExpertById } from "@/lib/data/experts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookingForm } from "./_components/BookingForm";
import { Linkedin, MapPin, Globe } from "lucide-react";

export default async function ExpertProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expert = await getExpertById(id);
  if (!expert) notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl shrink-0">
                <AvatarFallback className="rounded-2xl bg-hub-accent/20 text-hub-accent text-2xl">
                  {(expert.user?.name ?? "E").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold">{expert.user?.name}</h1>
                <p className="text-muted-foreground">
                  {expert.profile?.headline}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(expert.expertise ?? []).map((e) => (
                    <Badge key={e} variant="secondary">
                      {e}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  {expert.profile?.company && (
                    <span>{expert.profile.company}</span>
                  )}
                  {expert.profile?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {expert.profile.location}
                    </span>
                  )}
                  {(expert.languages ?? []).length > 0 && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {(expert.languages ?? []).join(", ")}
                    </span>
                  )}
                  {expert.profile?.linkedin_url && (
                    <a
                      href={expert.profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-hub-accent hover:underline"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {expert.profile?.bio && (
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{expert.profile.bio}</p>
                </div>
              )}
              {expert.years_experience && (
                <p className="text-sm text-muted-foreground mt-4">
                  {expert.years_experience}+ años de experiencia
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 min-w-0">
          <Card className="rounded-2xl shadow-sm lg:sticky lg:top-24">
            <CardHeader>
              <h2 className="font-semibold">Agendar sesión</h2>
              <p className="text-sm text-muted-foreground">
                Solicita una reunión con {expert.user?.name?.split(" ")[0] ?? "el experto"}.
              </p>
            </CardHeader>
            <CardContent>
              <BookingForm expertUserId={expert.user_id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
