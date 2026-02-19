"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Unirme al Hub</h1>
          <p className="text-muted-foreground text-sm">
            Inicia sesión con tu cuenta de Google para acceder al HUB Innovación y Emprendimiento.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            type="button"
            className="w-full bg-cta text-white hover:bg-cta/90"
            onClick={() => signIn("google", { callbackUrl: "/perfil" })}
          >
            Continuar con Google
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Al continuar, aceptas formar parte de la comunidad MBA UC.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
