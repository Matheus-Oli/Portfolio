"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Screenshot gallery: a native horizontal scroller with mandatory snap (so touch/swipe and
 * trackpads work as-is). Arrows and dots only drive scrollTo; the index follows the scroll position.
 */
export function Shots({ images, name }: { images: string[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (track) setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  const go = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(target, images.length - 1));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [images.length],
  );

  return (
    <div className="shots">
      <div className="shots__track" ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <div key={src} className="shots__slide">
            <Image
              src={src}
              alt={many ? `${name} — captura de tela ${i + 1} de ${images.length}` : `${name} — captura de tela`}
              width={1920}
              height={1080}
              sizes="(max-width: 1180px) 100vw, 1180px"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      {many ? (
        <div className="shots__bar">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Captura anterior">
            <span aria-hidden>←</span>
          </button>
          <div className="shots__dots">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className="shots__dot"
                aria-label={`Captura ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <span className="shots__count">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Próxima captura"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
