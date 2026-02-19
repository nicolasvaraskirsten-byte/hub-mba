import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createServiceClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/db/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const supabase = await createServiceClient();
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();
        if (!existing) {
          const { error } = await supabase.from("users").insert({
            id: crypto.randomUUID(),
            name: user.name ?? undefined,
            email: user.email,
            role: "participant",
            avatar_url: user.image ?? undefined,
          });
          if (error) console.error("Error creating user:", error);
        } else {
          await supabase
            .from("users")
            .update({
              name: user.name ?? undefined,
              avatar_url: user.image ?? undefined,
              updated_at: new Date().toISOString(),
            })
            .eq("email", user.email);
        }
      } catch (e) {
        console.error("SignIn DB error:", e);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
        try {
          const supabase = await createServiceClient();
          const { data } = await supabase
            .from("users")
            .select("id, role")
            .eq("email", user.email)
            .single();
          if (data) {
            token.id = data.id;
            token.role = data.role as UserRole;
          }
        } catch { /* use token without id/role */ }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id ?? token.sub;
        (session.user as { role?: UserRole }).role = token.role ?? "participant";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
  interface User {
    id?: string;
  }
  interface Session {
    user: User & { id?: string; role?: UserRole };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
