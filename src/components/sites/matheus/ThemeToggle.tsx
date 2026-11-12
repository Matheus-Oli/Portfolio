"use client";

import { useSyncExternalStore } from "react";
import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY } from "./theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return document.documentElement.dataset.theme ?? LIGHT_THEME;
}

function setTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  listeners.forEach((listener) => listener());
}

const iconProps = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

const sun = (
  <svg {...iconProps} strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </svg>
);

const moon = (
  <svg {...iconProps} strokeLinejoin="round">
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
  </svg>
);

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => LIGHT_THEME);
  const dark = theme === DARK_THEME;
  const label = dark ? "Mudar para o tema claro" : "Mudar para o tema escuro";

  return (
    <button
      type="button"
      className="themepick"
      onClick={() => setTheme(dark ? LIGHT_THEME : DARK_THEME)}
      aria-label={label}
      title={label}
    >
      {dark ? moon : sun}
    </button>
  );
}
