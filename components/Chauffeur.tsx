// components/Chauffeur.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import "./chauffeur.css"; // App Router: import here. Pages Router: move this import to _app.tsx.

const ease = [0.16, 1, 0.3, 1] as const;

const standards = [
  {
    title: "Professional & Trusted",
    body: "TLC-licensed, background-checked chauffeurs committed to your safety, comfort, and a great experience.",
  },
  {
    title: "Respectful & Discreet",
    body: "Enjoy a private, comfortable ride with friendly service and respect for your personal space.",
  },
  {
    title: "Comfort Comes First",
    body: "A clean, well-kept cabin and thoughtful details help make every ride relaxing from start to finish.",
  },
];

/* ── Live New York time — the dispatch desk never closes ─────────── */
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

// Full-bleed cinematic photo with the heading and promises laid over its dark lower part.
export function Chauffeur() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const time = useNyTime();

  /* Scroll depth — the photograph sinks, the watermark rises */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImage = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? "0%" : "-4%", reduce ? "0%" : "4%"]
  );

  const draw = (delay: number, axis: "scaleX" | "scaleY") => ({
    initial: reduce ? (false as const) : { [axis]: 0 },
    whileInView: { [axis]: 1 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 1.3, delay, ease },
  });

  const appear = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section
      ref={ref}
      id="chauffeur"
      aria-labelledby="chauffeur-title"
      className="chauffeur-vip on-photo relative isolate flex min-h-[min(100dvh,56rem)] scroll-mt-20 items-end overflow-hidden border-t border-[#D4AF78]/20"
    >
      {/* ── PHOTOGRAPH: parallax band, slow burn, night grade ───── */}
      <motion.div
        style={{ y: yImage }}
        className="absolute inset-x-0 -inset-y-[6%] z-0"
      >
        <div className="ch-drift absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/chauffeur-band.jpg"
            alt="A chauffeur holding the rear door of a black limousine at night"
            width={2400}
            height={1350}
            loading="lazy"
            draggable={false}
            className="grade absolute inset-0 h-full w-full object-cover object-[65%_25%] sm:object-center"
            style={{ filter: "brightness(0.62) contrast(1.1) saturate(0.85)" }}
          />
        </div>
      </motion.div>

      {/* Deep cinematic scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, #060606 4%, rgba(6,6,6,0.86) 38%, rgba(6,6,6,0.32) 66%, rgba(6,6,6,0.48) 100%)",
        }}
      />

      {/* Colour grade: steel night above, candle gold below */}
      <div
        aria-hidden="true"
        className="ch-glow-a pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="ch-glow-b pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen"
      />

      {/* ── THE MATTE: a gallery frame, drawn on arrival ────────── */}
      <div
        className="pointer-events-none absolute z-[5]"
        style={{
          top: "clamp(2.25rem, 6vh, 6rem)",
          left: "clamp(0.875rem, 3vw, 2.5rem)",
          right: "clamp(0.875rem, 3vw, 2.5rem)",
          bottom: "clamp(0.875rem, 3vw, 2.5rem)",
        }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D4AF78]/55 to-[#D4AF78]/25"
          {...draw(0.15, "scaleX")}
        />
        <motion.span
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#D4AF78]/45 via-[#D4AF78]/15 to-transparent"
          {...draw(0.3, "scaleY")}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-right bg-gradient-to-l from-transparent via-[#D4AF78]/40 to-[#D4AF78]/20"
          {...draw(0.45, "scaleX")}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-gradient-to-t from-[#D4AF78]/35 to-transparent"
          {...draw(0.6, "scaleY")}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -left-px -top-px h-6 w-6 border-l border-t border-[#D4AF78] sm:h-8 sm:w-8"
          {...appear(0.9)}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-px -right-px h-6 w-6 border-b border-r border-[#D4AF78] sm:h-8 sm:w-8"
          {...appear(0.9)}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -right-[3px] -top-[3px] h-[7px] w-[7px] rotate-45 border border-[#D4AF78] bg-[#060606]"
          {...appear(1.05)}
        />
      </div>

      {/* ── CONTENT: laid over the dark lower part ──────────────── */}
      <div className="wrap relative z-10 w-full pb-[clamp(2.5rem,7vh,6rem)] pt-24 sm:pt-32 lg:pt-40">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <Reveal>
            {/* Gold eyebrow */}
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20 sm:w-12" />
              <span className="text-[0.65rem] uppercase tracking-[0.26em] text-[#D4AF78] sm:text-[0.72rem] sm:tracking-[0.34em]">
                Your Ride, Our Priority
              </span>
            </div>

            <h2
              id="chauffeur-title"
              className="t-display t-display-xl max-w-[14ch] text-[#F5F3EE]"
            >
              Sit back.
              <br />
              <em className="ch-gold-text italic">We&apos;ll take it from here.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="lg:pb-1">
            {/* The house maxim */}
            <figure className="relative max-w-[28rem] border-l border-[#D4AF78]/25 pl-4 sm:pl-7">
              <span
                aria-hidden="true"
                className="ch-serif pointer-events-none absolute -left-2 -top-5 select-none text-[3.25rem] leading-none text-[#D4AF78]/30 sm:-left-3 sm:-top-7 sm:text-[4.5rem]"
              >
                &ldquo;
              </span>
              <blockquote className="ch-serif text-[1.15rem] font-light italic leading-[1.5] text-[#F5F3EE]/85 sm:text-[1.45rem]">
                True luxury is never rushed; it is felt in the quiet perfection
                of arrival.
              </blockquote>
              <figcaption className="ch-label mt-3 text-[#D4AF78]/75 sm:mt-4 sm:text-[#D4AF78]/70">
                &mdash; The Executive Mandate
              </figcaption>
            </figure>

            {/* The invitation */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-9 sm:gap-6">
              <a href="#reserve" className="ch-btn ch-btn-primary">
                Reserve your experience
              </a>
              <a href="#fleet" className="ch-btn ch-btn-quiet group">
                Explore the fleet
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── THE THREE PROMISES: engraved plates ───────────────── */}
        <ul className="mt-10 grid gap-7 md:mt-16 md:grid-cols-3 md:gap-12">
          {standards.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={0.1 + i * 0.08}
              className="ch-standard group relative overflow-hidden border-t border-[#D4AF78]/30 pt-6 md:pt-8"
            >
              <span aria-hidden="true" className="ch-standard-line" />
              <span
                aria-hidden="true"
                className="ch-standard-ghost ch-serif pointer-events-none select-none"
              >
                0{i + 1}
              </span>

              <div className="ch-standard-inner relative">
                <div className="flex items-center justify-between">
                  <span className="ch-standard-num text-[0.65rem] uppercase tracking-[0.3em]">
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ch-standard-diamond inline-block h-[5px] w-[5px] rotate-45 border border-[#D4AF78]"
                  />
                </div>

                <h3 className="t-display t-display-sm mt-3 text-[#F5F3EE] sm:mt-4">
                  {s.title}
                </h3>

                <p className="text-body mt-2.5 text-[0.9rem] text-[#F5F3EE]/75 transition-colors duration-700 group-hover:text-[#F5F3EE]/90 sm:mt-3 sm:text-base sm:text-[#F5F3EE]/70">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* ── FILM GRAIN ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="ch-grain pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
      />
    </section>
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