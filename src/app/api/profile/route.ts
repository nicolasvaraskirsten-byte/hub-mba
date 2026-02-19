import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const bodySchema = z.object({
  headline: z.string().optional(),
  bio: z.string().optional(),
  linkedin_url: z.string().url().nullable().optional(),
  company: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  interests: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
  public: z.boolean().optional(),
});

export async function PUT(req: Request) {
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
  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: session.user.id,
      headline: body.headline ?? null,
      bio: body.bio ?? null,
      linkedin_url: body.linkedin_url ?? null,
      company: body.company ?? null,
      industry: body.industry ?? null,
      location: body.location ?? null,
      interests: body.interests ?? [],
      goals: body.goals ?? [],
      public: body.public ?? false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) {
    console.error("Profile upsert error:", error);
    return NextResponse.json(
      { error: error.message ?? "Error al guardar" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
