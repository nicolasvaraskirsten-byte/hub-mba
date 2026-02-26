"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { CalendlyModal } from "./CalendlyModal";

export interface ExpertCalendlyCardProps {
  calendlyUrl: string | null;
  expertName?: string | null;
}

/**
 * Si calendlyUrl existe: botón "Agendar sesión" que abre modal con iframe Calendly.
 * Si no: mensaje "Agenda próximamente disponible".
 */
export function ExpertCalendlyCard({
  calendlyUrl,
  expertName,
}: ExpertCalendlyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (calendlyUrl) {
    return (
      <>
        <Button
          type="button"
          className="w-full bg-hub-pink text-hub-pink-foreground hover:bg-hub-pink/90 min-h-[44px]"
          onClick={() => setModalOpen(true)}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Agendar sesión
        </Button>
        <CalendlyModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          calendlyUrl={calendlyUrl}
          expertName={expertName ?? undefined}
        />
      </>
    );
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Agenda próximamente disponible
    </p>
  );
}
