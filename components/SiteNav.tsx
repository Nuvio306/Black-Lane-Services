// components/SiteNav.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Wordmark } from "./Wordmark";
import { nav, site } from "@/lib/site";
import "./sitenav.css"; // App Router: import here. Pages Router: move this import to _app.tsx.

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Live New York time — the desk never closes ──────────────────── */
function useNyTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const reduce = useReducedMotion();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const time = useNyTime();

  // Nav turns solid once the top sentinel leaves the viewport.
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Lock body scroll, trap focus, and manage Escape when the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const inner = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);
      const list = [menuBtn.current, ...inner].filter(Boolean) as HTMLElement[];
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !list.includes(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  const draw = (delay: number, axis: "scaleX" | "scaleY") => ({
    initial: reduce ? (false as const) : { [axis]: 0 },
    animate: { [axis]: 1 },
    transition: { duration: 1, delay, ease },
  });

  const appear = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay, ease },
  });

  const menuItems = [...nav, { href: "#reserve", label: "Reserve" }];

  return (
    <>
      <header
        className={`sitenav-vip fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          solid && !open
            ? "border-[#D4AF78]/20 bg-[#080706]/90 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md"
            : `border-transparent bg-transparent ${open ? "" : "on-photo"}`
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="wrap grid h-[var(--nav-h)] grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Menu Trigger */}
          <div>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group inline-flex min-h-11 items-center gap-3 px-2 text-[#F5F3EE] transition-colors duration-500 hover:text-[#D4AF78]"
            >
              {open ? (
                <X size={20} weight="light" aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-90" />
              ) : (
                <List size={20} weight="light" aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-90" />
              )}
              <span className="hidden text-[0.8125rem] uppercase tracking-[0.2em] sm:inline">
                {open ? "Close" : "Menu"}
              </span>
              <span className="sr-only sm:hidden">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>

          {/* Center: Wordmark */}
          <a
            href="#top"
            aria-label="Black Lane Services, back to top"
            className="inline-flex min-h-11 items-center justify-center px-2 text-[#F5F3EE] transition-opacity duration-500 hover:opacity-80"
          >
            <Wordmark />
          </a>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-4 sm:gap-6">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2.5 text-[0.8125rem] uppercase tracking-[0.15em] text-[#F5F3EE]/60 transition-colors duration-500 hover:text-[#D4AF78] lg:inline-flex tabular"
            >
              <span aria-hidden="true" className="sn-pulse h-1.5 w-1.5 rounded-full bg-[#8FBF8A]" />
              {site.phoneDisplay}
            </a>
            <a
              href="#reserve"
              className="btn btn-primary !min-h-10 !px-6 !py-2 !text-[0.75rem] !tracking-[0.2em] hidden sm:inline-flex"
            >
              Reserve
            </a>
          </div>
        </div>
      </header>

      {/* Mobile / Full Screen Menu Overlay — the salon door */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="sitemenu-vip fixed inset-0 z-40 overflow-y-auto overscroll-contain"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >


            {/* Architectural framing — drawn as the door opens */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed z-[1] hidden sm:block"
              style={{ inset: "clamp(1rem, 3vw, 2rem)" }}
            >
              <motion.span className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D4AF78]/45 to-[#D4AF78]/15" {...draw(0.15, "scaleX")} />
              <motion.span className="absolute right-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#D4AF78]/40 to-transparent" {...draw(0.3, "scaleY")} />
              <motion.span className="absolute bottom-0 left-0 h-px w-full origin-right bg-gradient-to-l from-transparent via-[#D4AF78]/40 to-[#D4AF78]/15" {...draw(0.45, "scaleX")} />
              <motion.span className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-gradient-to-t from-[#D4AF78]/35 to-transparent" {...draw(0.6, "scaleY")} />
              <motion.span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-[#D4AF78]/70" {...appear(0.7)} />
              <motion.span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-[#D4AF78]/70" {...appear(0.7)} />
              <motion.span className="absolute -right-[3px] -top-[3px] h-[7px] w-[7px] rotate-45 border border-[#D4AF78] bg-[#060606]" {...appear(0.85)} />
            </div>

            <nav aria-label="Primary" className="wrap relative z-10 flex min-h-[100dvh] flex-col justify-center gap-16 pb-12 pt-28">
              {/* Main Navigation Links */}
              <ul className="flex flex-col gap-3">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease }}
                  >
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="sn-menu-link group relative inline-flex items-baseline py-2 text-[clamp(2.25rem,5.5vw,3.75rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#F5F3EE]/80 transition-colors duration-500 hover:text-[#D4AF78]"
                    >
                      <span className="sn-serif relative inline-block transition-transform duration-500 group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Contact / Concierge Details */}
              <motion.div
                className="grid gap-8 border-t border-[#D4AF78]/20 pt-10 sm:grid-cols-3"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                <div>
                  <p className="sn-label mb-3 text-[#D4AF78]/70">Telephone</p>
                  <a
                    href={site.phoneHref}
                    className="sn-serif block text-[1.35rem] font-light text-[#F5F3EE] transition-colors duration-500 hover:text-[#D4AF78] tabular"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="sn-label mb-3 text-[#D4AF78]/70">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="block break-words text-[1.125rem] font-light text-[#F5F3EE] transition-colors duration-500 hover:text-[#D4AF78]"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="sn-label mb-3 text-[#D4AF78]/70">Concierge Hours</p>
                  <p className="text-[1.125rem] font-light text-[#F5F3EE]/80">{site.hours}</p>
                </div>
              </motion.div>

              {/* Status + closing note */}
              <motion.div
                className="flex flex-col gap-4 border-t border-[#D4AF78]/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.62, ease }}
              >
                <p className="sn-label flex items-center gap-3 text-[#F5F3EE]/40">
                  By Appointment Only
                </p>
              </motion.div>
            </nav>

            {/* Film grain */}
            <div
              aria-hidden="true"
              className="sn-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}