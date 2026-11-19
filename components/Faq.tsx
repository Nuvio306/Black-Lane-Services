// components/Faq.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "./Reveal";
import "./faq.css"; // App Router: import here. Pages Router: move this import to _app.tsx.

const ease = [0.16, 1, 0.3, 1] as const;

// House policies and guidelines, curated for absolute clarity and refinement.
const faqs = [
  {
    id: "booking",
    tag: "Reservations",
    q: "How far in advance should I book?",
    a: "We recommend booking as early as possible, especially for weddings, special events, and busy dates. For regular rides, 48 hours' notice is preferred. Last-minute requests are always welcome, subject to availability.",
  },
  {
    id: "inclusions",
    tag: "What's Included",
    q: "What's included with my reservation?",
    a: "Every booking includes a professional chauffeur and a clean, comfortable vehicle. Any additional costs, such as tolls and gratuities, will be clearly explained so you know what to expect.",
  },
  {
    id: "minimums",
    tag: "Booking Duration",
    q: "Is there a minimum booking time?",
    a: "Yes. Our standard limousine service has a 3-hour minimum, while SUV reservations require a 4-hour minimum.",
  },
  {
    id: "cancellation",
    tag: "Changes & Cancellations",
    q: "Can I change or cancel my reservation?",
    a: "Yes. You can make changes or cancel your reservation up to 72 hours before your scheduled pickup. Please contact us and we'll be happy to help.",
  },
];

/* ── Live New York time — the desk against which questions are asked ── */
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

export function Faq() {
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
    [reduce ? "0%" : "-3%", reduce ? "0%" : "3%"]
  );

  const draw = (delay: number, axis: "scaleX" | "scaleY") => ({
    initial: reduce ? (false as const) : { [axis]: 0 },
    whileInView: { [axis]: 1 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 1.2, delay, ease },
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
      id="faq"
      aria-labelledby="faq-title"
      className="faq-vip section relative isolate scroll-mt-20 overflow-hidden border-t border-[#D4AF78]/20"
    >
      {/* ── ATMOSPHERE: steel night warming back to the hearth ──── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="fq-glow-a absolute -right-[10%] -top-[12%] h-[60vw] w-[60vw] rounded-full blur-[90px] sm:h-[42vw] sm:w-[42vw]" />
        <div className="fq-glow-b absolute -bottom-[14%] -left-[8%] h-[55vw] w-[55vw] rounded-full blur-[100px] sm:h-[40vw] sm:w-[40vw]" />
      </div>

      <div className="wrap relative z-10">
        {/* ── CINEMATIC PLATE: the question, posed in the dark ──── */}
        <Reveal className="on-photo relative isolate flex min-h-[420px] aspect-[3/4] items-end overflow-hidden bg-[#0B0A08] sm:aspect-[11/5] sm:min-h-0">
          {/* Photograph — parallax band, slow burn, night grade */}
          <motion.div
            style={{ y: yImage }}
            className="absolute inset-x-0 -inset-y-[5%] z-0"
          >
            <div className="fq-drift absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/faq-band.jpg"
                alt="A man in a suit with a glass of whisky in the dark rear seat of a chauffeured car"
                width={2400}
                height={1600}
                loading="lazy"
                draggable={false}
                className="grade absolute inset-0 h-full w-full object-cover object-[50%_18%]"
                style={{
                  filter: "brightness(0.62) contrast(1.1) saturate(0.85)",
                }}
              />
            </div>
          </motion.div>

          {/* Deep scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, #060606 4%, rgba(6,6,6,0.78) 42%, rgba(6,6,6,0.22) 70%, rgba(6,6,6,0.48) 100%)",
            }}
          />

          {/* Colour grade: amber whisky light, candle gold */}
          <div
            aria-hidden="true"
            className="fq-bandglow-a pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
          />
          <div
            aria-hidden="true"
            className="fq-bandglow-b pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
          />

          {/* Gold frame — drawn line by line on arrival */}
          <div
            className="pointer-events-none absolute z-[4]"
            style={{ inset: "clamp(0.75rem, 2.5vw, 1.5rem)" }}
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
              className="absolute -left-px -top-px h-5 w-5 border-l border-t border-[#D4AF78]/80 sm:h-6 sm:w-6"
              {...appear(0.85)}
            />
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-px -right-px h-5 w-5 border-b border-r border-[#D4AF78]/80 sm:h-6 sm:w-6"
              {...appear(0.85)}
            />
            <motion.span
              aria-hidden="true"
              className="absolute -right-[3px] -top-[3px] h-[7px] w-[7px] rotate-45 border border-[#D4AF78] bg-[#060606]"
              {...appear(1)}
            />

            {/* The desk is open — live, on the frame itself */}
            <motion.div
              className="absolute left-3.5 right-3.5 top-2.5 flex items-center justify-between gap-3 pr-4 sm:left-6 sm:right-6 sm:top-4 sm:pr-0"
              {...appear(1.05)}
            >
              <span
                role="timer"
                aria-live="off"
                aria-label="New York local time"
                className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.24em] text-[#F5F3EE]/65 sm:gap-2.5 sm:tracking-[0.28em]"
              >
                NYC
                <span className="text-[0.64rem] tracking-[0.18em] text-[#D4AF78] tabular-nums sm:text-[0.66rem] sm:tracking-[0.2em]">
                  {time ?? "––:––:––"}
                </span>
              </span>
            </motion.div>
          </div>

          {/* Vertical plate label */}
          <motion.div
            className="pointer-events-none absolute right-[0.8rem] top-1/2 z-[5] hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
            {...appear(1.1)}
          >
            <span aria-hidden="true" className="h-8 w-px bg-[#D4AF78]/30" />
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#D4AF78]/65 [writing-mode:vertical-rl]">
              House Protocol
            </span>
            <span aria-hidden="true" className="h-8 w-px bg-[#D4AF78]/30" />
          </motion.div>

          {/* Heading + standfirst, laid over the dark lower part */}
          <div className="relative z-10 flex w-full flex-col gap-5 p-5 pt-14 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-12 sm:pt-12">
            <div>
              <div className="mb-3 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20 sm:w-12" />
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-[#D4AF78] sm:text-[0.72rem] sm:tracking-[0.34em]">
                  Good to Know
                </span>
              </div>

              <h2
                id="faq-title"
                className="t-display t-display-lg text-[#F5F3EE]"
              >
                Your questions,
                <br className="hidden sm:block" />{" "}
                <em className="fq-gold-text italic">answered.</em>
              </h2>
            </div>

            <p className="max-w-[26rem] border-l border-[#D4AF78]/25 pl-4 text-[0.875rem] leading-[1.7] text-[#F5F3EE]/75 sm:pl-6 sm:text-[0.95rem] sm:leading-[1.8] sm:text-[#F5F3EE]/70">
              Everything you need to know before your ride. From booking and
              pricing to special requests, we&apos;re here to make every step
              simple.
            </p>
          </div>
        </Reveal>

        {/* ── EDITORIAL Q&A: engraved plates, all answers in the open ── */}
        <dl className="mt-10 grid gap-x-8 gap-y-8 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
          {faqs.map((f, i) => (
            <Reveal
              key={f.q}
              delay={i * 0.08}
              className="fq-card group relative overflow-hidden border-t border-[#D4AF78]/30 pt-6 sm:pt-8"
            >
              <span aria-hidden="true" className="fq-card-line" />
              <span aria-hidden="true" className="fq-card-ghost fq-serif">
                0{i + 1}
              </span>

              <div
                id={`faq-${f.id}`}
                className="flex scroll-mt-24 items-center justify-between gap-2 sm:scroll-mt-28"
              >
                <span className="flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                  <span className="fq-card-num text-[0.65rem] uppercase tracking-[0.3em]">
                    0{i + 1}
                  </span>
                  <span className="fq-label text-[#F5F3EE]/55 sm:text-[#F5F3EE]/45">
                    {f.tag}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="fq-card-diamond inline-block h-[5px] w-[5px] shrink-0 rotate-45 border border-[#D4AF78]"
                />
              </div>

              <dt className="t-display t-display-sm mt-3 text-[#F5F3EE] sm:mt-4">
                {f.q}
              </dt>

              <dd className="text-body mt-3 text-[0.9rem] leading-relaxed text-[#F5F3EE]/75 transition-colors duration-700 group-hover:text-[#F5F3EE]/90 sm:mt-4 sm:text-base sm:text-[#F5F3EE]/70">
                {f.a}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* ── FILM GRAIN ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="fq-grain pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
      />
    </section>
  );
}