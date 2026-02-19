import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ExpertWithUser } from "@/lib/db/types";

export function ExpertCard({ expert }: { expert: ExpertWithUser }) {
  return (
    <Link href={`/expertos/${expert.user_id}`}>
      <Card className="h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-cta/30">
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar className="h-14 w-14 rounded-xl shrink-0">
            <AvatarFallback className="rounded-xl bg-hub-accent/20 text-hub-accent">
              {(expert.user?.name ?? "E").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{expert.user?.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {expert.profile?.headline ?? expert.expertise?.[0]}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {(expert.expertise ?? []).slice(0, 3).map((e) => (
                <Badge key={e} variant="secondary" className="text-xs">
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
