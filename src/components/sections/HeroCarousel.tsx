"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Imágenes por defecto: personas en mentoría/trabajo en equipo (Unsplash). Para usar fotos propias, pasa `slides` con rutas a /hero/hero-1.jpg etc. en public/ */
const DEFAULT_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    alt: "Equipo trabajando en conjunto",
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
    alt: "Reunión de trabajo y mentoría",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    alt: "Personas colaborando en proyecto",
  },
];

const ROTATE_MS = 5000;

export function HeroCarousel({
  slides = DEFAULT_SLIDES,
  className = "",
}: {
  slides?: { src: string; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className={`relative z-0 w-full h-full overflow-hidden ${className}`}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 1 : 0,
          }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
            unoptimized={!slide.src.includes("unsplash.com")}
          />
          {/* Overlay oscuro para que título y botones tengan contraste */}
          <div className="absolute inset-0 bg-black/55" aria-hidden />
        </div>
      ))}
      {count > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2] flex gap-2"
          aria-label="Diapositivas del carrusel"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
