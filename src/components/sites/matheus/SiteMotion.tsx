"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function SiteMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();
    // Tells the boot script's safety timer that motion took over the hidden start states.
    document.documentElement.setAttribute("data-motion-ready", "");
    if (reduce) document.documentElement.removeAttribute("data-motion");
    const cleanups: Array<() => void> = [];
    const bar = root.querySelector<HTMLElement>("[data-site-bar]");
    const onScroll = (y: number) => {
      if (bar) bar.dataset.stuck = y > 24 ? "1" : "0";
      root.dataset.far = y > 900 ? "1" : "0";
    };

    let lenis: Lenis | null = null;
    if (reduce) {
      const handler = () => onScroll(window.scrollY);
      window.addEventListener("scroll", handler, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", handler));
    } else {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", (l: Lenis) => {
        ScrollTrigger.update();
        onScroll(l.scroll);
      });
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => gsap.ticker.remove(tick));
    }

    // In-page anchors: land the section content just under the bar, then flash the target.
    const barH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
    let flashTimer = 0;
    const onAnchor = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "";
      const target = hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target || !lenis) return;
      event.preventDefault();
      if (hash === "#top") {
        lenis.scrollTo(0);
        return;
      }
      const padTop = parseFloat(getComputedStyle(target).paddingTop) || 0;
      lenis.scrollTo(target.getBoundingClientRect().top + lenis.animatedScroll + padTop - barH - 12);
      window.clearTimeout(flashTimer);
      target.removeAttribute("data-flash");
      void target.offsetWidth;
      target.setAttribute("data-flash", "1");
      flashTimer = window.setTimeout(() => target.removeAttribute("data-flash"), 2100);
    };
    // Delegated so the portaled mobile drawer links are covered too.
    document.addEventListener("click", onAnchor);
    cleanups.push(() => {
      window.clearTimeout(flashTimer);
      document.removeEventListener("click", onAnchor);
    });

    // Hero: pointer spotlight plus drifting grid/glow parallax.
    if (!reduce && hasFinePointer()) {
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const light = root.querySelector<HTMLElement>("[data-hero-light]");
      const lines = root.querySelector<HTMLElement>("[data-hero-lines]");
      const glow = root.querySelector<HTMLElement>("[data-hero-glow]");
      if (hero && light) {
        const pointer = { x: 0, y: 0 };
        const eased = { x: 0, y: 0 };
        let seen = false;
        let raf = 0;
        let driftX = 0;
        let driftY = 0;
        let last = performance.now();
        const onMove = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const rect = hero.getBoundingClientRect();
          if (e.clientY > rect.bottom) {
            light.dataset.on = "0";
            return;
          }
          pointer.x = e.clientX - rect.left;
          pointer.y = e.clientY - rect.top;
          if (!seen) {
            eased.x = pointer.x;
            eased.y = pointer.y;
            seen = true;
          }
          light.dataset.on = "1";
        };
        const frame = () => {
          eased.x += (pointer.x - eased.x) * 0.11;
          eased.y += (pointer.y - eased.y) * 0.11;
          light.style.setProperty("--sx", `${eased.x.toFixed(1)}px`);
          light.style.setProperty("--sy", `${eased.y.toFixed(1)}px`);
          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          const phase = (now / 1000) * 0.09;
          driftX = (driftX + 44 * Math.cos(phase) * dt) % 88;
          driftY = (driftY + 44 * Math.sin(phase) * dt) % 88;
          let lx = 0;
          let ly = 0;
          let gx = 0;
          let gy = 0;
          if (seen) {
            const rect = hero.getBoundingClientRect();
            const rx = eased.x / Math.max(rect.width, 1) - 0.5;
            const ry = eased.y / Math.max(rect.height, 1) - 0.5;
            lx = -(46 * rx);
            ly = -(30 * ry);
            gx = 26 * rx;
            gy = 16 * ry;
          }
          if (lines) lines.style.transform = `translate3d(${(lx + driftX).toFixed(1)}px, ${(ly + driftY).toFixed(1)}px, 0)`;
          if (glow) glow.style.translate = `${(gx + 18 * Math.cos(phase)).toFixed(1)}px ${(gy + 12 * Math.sin(phase)).toFixed(1)}px`;
          raf = requestAnimationFrame(frame);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        raf = requestAnimationFrame(frame);
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove);
          cancelAnimationFrame(raf);
        });
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // gsap.matchMedia only runs the callback when at least one condition matches, so list both.
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
        if (context.conditions?.reduce) return;
        // Start states are painted by CSS under html[data-motion] (see motion.css), so every tween is an explicit fromTo.
        if (root.querySelector("[data-hero]")) {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .fromTo("[data-hero-grid]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1 }, 0)
            .fromTo('[data-intro="eyebrow"]', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.1)
            .fromTo(".name__line > span", { y: 0, yPercent: 108 }, { yPercent: 0, duration: 0.95, stagger: 0.08 }, 0.15)
            .fromTo(".word > span", { y: 0, yPercent: 105 }, { yPercent: 0, duration: 0.7, stagger: 0.035 }, 0.5)
            .fromTo('[data-intro="actions"]', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.95)
            .fromTo('[data-intro="stats"]', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 1.05);
          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
            const end = parseFloat(el.dataset.count ?? "0");
            const counter = { v: 0 };
            el.textContent = "0";
            intro.to(
              counter,
              { v: end, duration: 1.1, ease: "power2.out", onUpdate: () => { el.textContent = counter.v.toFixed(0); } },
              1.1,
            );
          });
          if (!hasFinePointer()) gsap.to("[data-hero-lines]", { x: 88, y: 88, duration: 9, ease: "none", repeat: -1 });
          gsap.to("[data-hero-glow]", { scale: 1.12, duration: 13, ease: "sine.inOut", repeat: -1, yoyo: true, transformOrigin: "50% 20%" });
          gsap.to("[data-hero-inner]", {
            yPercent: -12,
            autoAlpha: 0.25,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
          });
        }
        // Any other masked text (e.g. the /work page titles) rises on load with the hero's name timing.
        const masks = root.querySelectorAll(".mask > span");
        if (masks.length) {
          gsap.fromTo(masks, { y: 0, yPercent: 105 }, { yPercent: 0, duration: 0.95, stagger: 0.08, ease: "power3.out", delay: 0.1 });
        }
        // Once revealed, hand the element back to CSS so hover transforms keep working.
        const settle = (targets: ArrayLike<Element>) => {
          Array.from(targets).forEach((el) => el.classList.add("is-revealed"));
          gsap.set(targets, { clearProps: "transform,opacity,visibility" });
        };
        // Small items: children of a [data-reveal-group] enter together once the group reaches 70% of the viewport.
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll(".reveal-item");
          gsap.fromTo(
            items,
            { y: 12, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.025,
              onComplete: () => settle(items),
              scrollTrigger: { trigger: group, start: "top 70%", once: true },
            },
          );
        });
        // Blocks: any .reveal fades up once at 88%; siblings entering together are staggered.
        // The offset comes from the --reveal-y custom property (28px by default).
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: (_, el: Element) => parseFloat(getComputedStyle(el).getPropertyValue("--reveal-y")) || 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.09, overwrite: true, onComplete: () => settle(batch) },
            ),
        });
        const items = gsap.utils.toArray<HTMLElement>("[data-xp-item]");
        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job, index) => {
          const activate = () => items.forEach((item, i) => { item.dataset.on = i === index ? "1" : "0"; });
          ScrollTrigger.create({ trigger: job, start: "top 55%", end: "bottom 55%", onEnter: activate, onEnterBack: activate });
        });
        if (root.querySelector("[data-closer]")) {
          gsap.to("[data-closer-field]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: "[data-closer]", start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      lenis?.destroy();
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} className="site" data-scroll-page="">
      {children}
    </div>
  );
}
