"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { nav } from "./content";

const noopSubscribe = () => () => {};

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-drawer", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.removeAttribute("data-drawer");
    };
  }, [open]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="burger"
        aria-expanded={open}
        aria-controls="site-drawer"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden />
        <span aria-hidden />
        <span aria-hidden />
      </button>
      {mounted
        ? createPortal(
            // Portaled out of the bar: its backdrop-filter would otherwise contain the fixed drawer.
            <div className="site drawer__root" data-open={open ? "1" : "0"}>
              <button type="button" className="drawer__scrim" tabIndex={-1} aria-hidden onClick={() => setOpen(false)} />
              <div id="site-drawer" className="drawer" ref={drawerRef} inert={!open}>
                <nav aria-label="Seções">
                  {nav.map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
