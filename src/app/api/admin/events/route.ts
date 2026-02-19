import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const bodySchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  start_at: z.string().datetime().nullable().optional(),
  end_at: z.string().datetime().nullable().optional(),
  location: z.string().nullable().optional(),
  link: z.string().url().nullable().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  if (!body.start_at) {
    return NextResponse.json({ error: "start_at requerido" }, { status: 400 });
  }
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("events")
    .insert({
      title: body.title,
      description: body.description ?? null,
      start_at: body.start_at,
      end_at: body.end_at ?? null,
      location: body.location ?? null,
      link: body.link ?? null,
      tags: [],
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
