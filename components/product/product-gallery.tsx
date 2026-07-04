"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryImages = images.length > 0 ? images : ["/products/monitor-ultrawide.svg"];

  const goToPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  }, [galleryImages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-elevated">
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryImages[selectedIndex]}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={galleryImages[selectedIndex]}
              alt={`${title} — imagem ${selectedIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ver imagem ${index + 1}`}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-colors",
              selectedIndex === index
                ? "border-accent ring-2 ring-accent/30"
                : "border-border hover:border-muted",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
