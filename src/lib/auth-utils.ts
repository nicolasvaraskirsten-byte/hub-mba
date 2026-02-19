import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) redirect("/auth/signin");
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== "admin") redirect("/");
  return session;
}

export function isAdmin(role: string | undefined) {
  return role === "admin";
}

export function isExpert(role: string | undefined) {
  return role === "expert" || role === "admin";
}
