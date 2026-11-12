import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "./content";
import { Cursor } from "./Cursor";
import { SiteMotion } from "./SiteMotion";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Chrome for the reading pages (/work, /work/[slug]): fixed bar with a back link, theme toggle and CTA.
 * Shares SiteMotion with the home: Lenis smooth scroll, .mask title reveal and .reveal fade-ups.
 */
export function DocShell({ back, children }: { back: { href: string; label: string }; children: ReactNode }) {
  return (
    <>
      <Cursor />
      <SiteMotion>
        <header className="bar" data-site-bar="">
          <Link className="mark" aria-label="Início" href="/">
            {profile.initials}
          </Link>
          <Link className="bar__back" href={back.href}>
            <span aria-hidden>←</span>
            <span className="bar__backlabel">{back.label}</span>
          </Link>
          <ThemeToggle />
          <a className="bar__cta" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
            <span className="long"> ↗</span>
          </a>
        </header>
        <main>{children}</main>
      </SiteMotion>
    </>
  );
}

export function DocFoot({ back }: { back: { href: string; label: string } }) {
  return (
    <footer className="doc__foot reveal reveal--sm">
      <Link className="doc__footlink" href={back.href}>
        <span aria-hidden>←</span> {back.label}
      </Link>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </footer>
  );
}
