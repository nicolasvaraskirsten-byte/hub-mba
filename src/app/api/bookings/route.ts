import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const bodySchema = z.object({
  expert_user_id: z.string().uuid(),
  start_at: z.string().datetime(),
  end_at: z.string().datetime(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const supabase = await createServiceClient();
  const { data: expert } = await supabase
    .from("experts")
    .select("user_id")
    .eq("user_id", body.expert_user_id)
    .single();
  if (!expert) {
    return NextResponse.json({ error: "Experto no encontrado" }, { status: 404 });
  }
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      requester_user_id: session.user.id,
      expert_user_id: body.expert_user_id,
      status: "requested",
      start_at: body.start_at,
      end_at: body.end_at,
      notes: body.notes ?? null,
    })
    .select()
    .single();
  if (error) {
    console.error("Booking insert error:", error);
    return NextResponse.json(
      { error: error.message ?? "Error al crear solicitud" },
      { status: 500 }
    );
  }
  return NextResponse.json(booking);
}
