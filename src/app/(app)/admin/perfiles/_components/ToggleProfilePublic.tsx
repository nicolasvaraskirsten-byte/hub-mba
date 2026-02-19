"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ToggleProfilePublic({
  userId,
  current,
}: {
  userId: string;
  current: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(current);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile-visibility", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, public: !value }),
      });
      if (!res.ok) throw new Error("Error");
      setValue(!value);
      toast.success(value ? "Perfil oculto" : "Perfil público");
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={value ? "default" : "outline"}
      size="sm"
      onClick={toggle}
      disabled={loading}
    >
      {value ? "Público" : "Oculto"}
    </Button>
  );
}
