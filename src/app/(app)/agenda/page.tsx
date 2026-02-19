import { requireSession } from "@/lib/auth-utils";
import { getBookingsForUser } from "@/lib/data/bookings";
import { AgendaList } from "./_components/AgendaList";

export default async function AgendaPage() {
  const session = await requireSession();
  const bookings = await getBookingsForUser(session.user.id!);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Mi agenda
      </h1>
      <p className="text-muted-foreground mt-2">
        Solicitudes enviadas y sesiones confirmadas.
      </p>
      <AgendaList bookings={bookings} currentUserId={session.user.id!} />
    </div>
  );
}
