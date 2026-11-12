"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      el.classList.add("on");
      const target = e.target as Element;
      const precise = target.closest(".chip,a,input,textarea");
      const big = !precise && target.closest("button");
      el.classList.toggle("precise", !!precise);
      el.classList.toggle("big", !!big);
    };
    const onLeave = () => el.classList.remove("on");
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    let raf = 0;
    const frame = () => {
      x += (targetX - x) * 0.35;
      y += (targetY - y) * 0.35;
      el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} id="cursor" aria-hidden />;
}
