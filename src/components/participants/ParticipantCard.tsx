import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/db/types";
import type { ParticipantWithProfile } from "@/lib/data/participants";

export function ParticipantCard({
  user,
  profile,
}: {
  user: ParticipantWithProfile;
  profile: Profile;
}) {
  return (
    <Card className="h-full rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-14 w-14 rounded-xl shrink-0">
          <AvatarFallback className="rounded-xl bg-muted">
            {(user.name ?? user.email ?? "U").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{user.name ?? "Participante"}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {profile.headline ?? profile.industry}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {(profile.goals ?? []).slice(0, 3).map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
