import { getParticipantsList } from "@/lib/data/participants";
import { ParticipantCard } from "@/components/participants/ParticipantCard";

export async function ParticipantsTab() {
  const participants = await getParticipantsList();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {participants.length === 0 ? (
        <div className="col-span-full rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            No hay participantes con perfil público.
          </p>
        </div>
      ) : (
        participants.map((p) => (
          <ParticipantCard key={p.id} user={p} profile={p.profile!} />
        ))
      )}
    </div>
  );
}
