"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendlyUrl: string;
  expertName?: string;
}

/**
 * Modal con iframe de Calendly embebido. Fondo blur, centrado, responsive.
 */
export function CalendlyModal({
  open,
  onOpenChange,
  calendlyUrl,
  expertName,
}: CalendlyModalProps) {
  const title = expertName
    ? `Agendar sesión con ${expertName}`
    : "Agendar sesión";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] w-full max-w-3xl gap-0 overflow-hidden bg-background p-0 sm:rounded-lg [&>button]:right-2 [&>button]:top-2 [&>button]:z-10 [&>button]:bg-background [&>button]:opacity-100"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex h-[70vh] min-h-[400px] w-full flex-col sm:h-[700px]">
          <iframe
            title={title}
            src={calendlyUrl}
            width="100%"
            height="100%"
            className="min-h-[400px] flex-1 border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
