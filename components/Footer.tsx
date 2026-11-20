// components/Footer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { Reveal } from "./Reveal";
import "./footer.css"; // App Router: import here. Pages Router: move this import to _app.tsx.

const ease = [0.16, 1, 0.3, 1] as const;

const areas = ["NYC", "New Jersey", "Long Island", "Connecticut", "Upstate New York"];

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

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const time = useNyTime();

  /* Scroll depth — the seal settles, the founding year rises */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const yGhost = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["-50%", "-50%"] : ["-46%", "-54%"]
  );
  const yMark = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["3%", "-3%"]
  );

  /* Cursor atmosphere — motion values, zero re-renders per move */
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${smx}% ${smy}%, rgba(212,175,120,0.07), transparent 60%)`;

  const draw = (delay: number, axis: "scaleX" | "scaleY") => ({
    initial: reduce ? (false as const) : { [axis]: 0 },
    whileInView: { [axis]: 1 },
    viewport: { once: true, margin: "-8%" },
    transition: { duration: 1.3, delay, ease },
  });

  const appear = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-8%" },
    transition: { duration: 1, delay, ease },
  });

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer
      ref={ref}
      className="footer-vip relative isolate overflow-hidden border-t border-[#D4AF78]/20 pb-[max(3rem,env(safe-area-inset-bottom))] pt-24 text-[#F5F3EE]/70"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      onMouseLeave={() => {
        mx.set(50);
        my.set(50);
      }}
    >
      {/* ── ATMOSPHERE: one candle in the void ──────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="ft-glow-a absolute left-1/2 top-[38%] h-[46vw] w-[46vw] -translate-x-1/2 rounded-full blur-[100px]" />
        <div className="ft-glow-b absolute -bottom-[20%] -right-[10%] h-[40vw] w-[40vw] rounded-full blur-[100px]" />
      </div>

      <div className="wrap relative z-10">
        {/* ── THE HOUSE DIRECTORY ───────────────────────────────── */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr_0.9fr] lg:gap-8">

          {/* Brand */}
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20" />
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D4AF78]">
                Black Lane Services
              </span>
            </div>
            <p className="max-w-[22rem] text-[1rem] font-light leading-relaxed text-[#F5F3EE]/80">
              Private chauffeured limousine service for Tri State Area. By appointment only.
            </p>
            <p className="ft-label mt-8 flex items-center gap-3 text-[#F5F3EE]/45">
              <Diamond /> Est. 2026 <Diamond />
            </p>
          </Reveal>

          {/* Explore */}
          <Reveal delay={0.06}>
            <nav aria-label="Footer">
              <p className="ft-label mb-6 text-[#D4AF78]/80">Explore</p>
              <ul className="flex flex-col gap-1">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="group inline-flex min-h-10 items-center text-[0.9375rem] text-[#F5F3EE]/70 transition-all duration-500 hover:text-[#D4AF78]"
                    >
                      <span className="mr-0 h-px w-0 bg-[#D4AF78] transition-all duration-500 group-hover:mr-2 group-hover:w-4" />
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* The Concierge */}
          <Reveal delay={0.12}>
            <p className="ft-label mb-6 text-[#D4AF78]/80">The Concierge</p>
            <ul className="flex flex-col gap-2 text-[0.9375rem]">
              <li>
                <a
                  href={site.phoneHref}
                  className="ft-serif inline-flex min-h-10 items-center text-[1.6rem] font-light tabular text-[#F5F3EE] transition-colors duration-500 hover:text-[#D4AF78]"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center break-all transition-colors duration-500 hover:text-[#D4AF78]"
                >
                  {site.email}
                </a>
              </li>
              <li className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#D4AF78]/10 pt-5 text-[0.6rem] uppercase tracking-[0.28em] text-[#F5F3EE]/55">
                <span aria-hidden="true" className="ft-pulse h-1.5 w-1.5 rounded-full bg-[#8FBF8A]" />
                On duty
              </li>
            </ul>
          </Reveal>

          {/* Service Area */}
          <Reveal delay={0.18}>
            <p className="ft-label mb-6 text-[#D4AF78]/80">Service Area</p>
            <ul className="flex flex-col gap-2 text-[0.9375rem] text-[#F5F3EE]/60">
              {areas.map((a) => (
                <li
                  key={a}
                  className="group inline-flex min-h-8 items-center gap-3 transition-colors duration-500 hover:text-[#F5F3EE]/90"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-[5px] w-[5px] rotate-45 border border-[#D4AF78]/40 transition-all duration-500 group-hover:border-[#D4AF78] group-hover:bg-[#D4AF78]/30"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── THE SEAL: the monumental wordmark, framed ─────────── */}
        <Reveal delay={0.1} className="relative mt-28 overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[#D4AF78]/30 to-transparent"
            {...draw(0.1, "scaleX")}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-right bg-gradient-to-r from-transparent via-[#D4AF78]/30 to-transparent"
            {...draw(0.25, "scaleX")}
          />

          {/* Candle halo */}
          <div
            aria-hidden="true"
            className="ft-halo pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2"
          />

          {/* Seal frame — drawn line by line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ inset: "clamp(0.75rem, 2.5vw, 1.75rem)" }}
          >
            <motion.span className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D4AF78]/40 to-[#D4AF78]/15" {...draw(0.35, "scaleX")} />
            <motion.span className="absolute right-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#D4AF78]/35 to-transparent" {...draw(0.5, "scaleY")} />
            <motion.span className="absolute bottom-0 left-0 h-px w-full origin-right bg-gradient-to-l from-transparent via-[#D4AF78]/35 to-[#D4AF78]/15" {...draw(0.65, "scaleX")} />
            <motion.span className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-gradient-to-t from-[#D4AF78]/30 to-transparent" {...draw(0.8, "scaleY")} />
            <motion.span className="absolute -left-px -top-px h-6 w-6 border-l border-t border-[#D4AF78]/70" {...appear(1)} />
            <motion.span className="absolute -bottom-px -right-px h-6 w-6 border-b border-r border-[#D4AF78]/70" {...appear(1)} />
            <motion.span className="absolute -right-[3px] -top-[3px] h-[7px] w-[7px] rotate-45 border border-[#D4AF78] bg-[#030303]" {...appear(1.15)} />
          </div>

          <motion.div style={{ y: yMark }} className="relative px-6 py-16 text-center sm:px-12">
            <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-[#D4AF78]/60">
              VIP Service
            </p>
            <div className="ft-serif text-[clamp(2.5rem,8vw,7rem)] font-light tracking-tight text-[#F5F3EE]">
              <Wordmark />
            </div>
            <p className="ft-label mt-8 flex items-center justify-center gap-3 text-[#F5F3EE]/45">
              <Diamond />  Affordable Prices <Diamond /> 
            </p>
          </motion.div>
        </Reveal>

        {/* ── COLOPHON ──────────────────────────────────────────── */}
        <Reveal
          delay={0.15}
          className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-[#D4AF78]/10 pt-8 text-[0.72rem] uppercase tracking-[0.15em] text-[#F5F3EE]/50 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Black Lane Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p>By Appointment Only</p>
            <span aria-hidden="true" className="h-3 w-px bg-[#D4AF78]/20" />
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="group ml-2 inline-flex min-h-10 items-center gap-3 text-[#D4AF78]/70 transition-colors duration-500 hover:text-[#D4AF78]"
            >
              <span className="tracking-[0.25em]">Top</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#D4AF78]/30 transition-all duration-500 group-hover:border-[#D4AF78] group-hover:bg-[#D4AF78]/10">
                <ArrowUp
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5"
                />
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Cursor spotlight wash */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{ background: spotlight }}
      />

      {/* ── FILM GRAIN ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="ft-grain pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
      />
    </footer>
  );
}

function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[5px] w-[5px] rotate-45 border border-[#D4AF78]/60 ${className}`}
    />
  );
}