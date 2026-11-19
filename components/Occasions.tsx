// components/Occasions.tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "./Reveal";
import "./occasions.css";

type Tile = {
  id: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  kicker: string;
  tint: string;
  caption: string;
};

const tiles: Tile[] = [
  {
    id: "weddings",
    title: "Weddings & Ceremonies",
    body: "Make your special day even more memorable with a comfortable, stylish ride for you and your loved ones.",
    image: "/images/occ-weddings.jpg",
    alt: "A bride and groom raising glasses under a limousine's starlight ceiling",
    width: 1300,
    height: 1598,
    kicker: "Your Special Day",
    tint: "#C99A8E",
    caption: "Arrive in style on your wedding day",
  },
  {
    id: "airport",
    title: "Airport Transfers & Aviation",
    body: "Skip the hassle of getting to and from the airport. Sit back, relax, and let us take care of the ride.",
    image: "/images/occ-airport.jpg",
    alt: "An executive limousine waiting on the tarmac beside a private jet",
    width: 1300,
    height: 1598,
    kicker: "Your Journey Starts Here",
    tint: "#8EA8C9",
    caption: "Reliable rides to and from the airport",
  },
  {
    id: "business",
    title: "Business & Corporate",
    body: "Get to meetings, events, and business appointments comfortably and on time. Enjoy a smooth ride while we take care of the road.",
    image: "/images/occ-business.jpg",
    alt: "A businesswoman on a call in the leather rear seat of a chauffeured car",
    width: 1400,
    height: 875,
    kicker: "Business Travel",
    tint: "#8FA6C4",
    caption: "Professional rides for your busy schedule",
  },
  {
    id: "nights",
    title: "Private Soirées",
    body: "From dinner dates to birthday celebrations, enjoy the night without worrying about the ride. Sit back, relax, and have fun.",
    image: "/images/occ-nights.jpg",
    alt: "Inside a stretch limousine: leather bench seating, a lit bar and a starlight ceiling",
    width: 1400,
    height: 875,
    kicker: "Your Night, Your Way",
    tint: "#E0A458",
    caption: "Good nights start with a great ride",
  },
];

function TileCard({
  tile,
  index = 0,
}: {
  tile: Tile;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? "0%" : "-4%", shouldReduceMotion ? "0%" : "4%"]
  );

  return (
    <article
      ref={ref}
      id={`occasion-${tile.id}`}
      aria-labelledby={`occasion-${tile.id}-title`}
      className="oc-tile on-photo group relative flex min-h-[26rem] cursor-default flex-col overflow-hidden bg-[#0B0A08] sm:min-h-[30rem] lg:min-h-[34rem]"
    >
      {/* Photograph container */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-x-0 -inset-y-[10%] h-[120%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tile.image}
            alt={tile.alt}
            width={tile.width}
            height={tile.height}
            loading="lazy"
            draggable={false}
            className="grade oc-img absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(6,6,6,0.96)_0%,rgba(6,6,6,0.68)_52%,rgba(6,6,6,0.22)_78%,rgba(6,6,6,0.35)_100%)] sm:bg-[linear-gradient(to_top,rgba(6,6,6,0.95)_0%,rgba(6,6,6,0.52)_50%,rgba(6,6,6,0.15)_75%,rgba(6,6,6,0.3)_100%)]"
      />

      {/* Engraved plate number */}
      <div
        aria-hidden="true"
        className="oc-ghostnum oc-serif pointer-events-none absolute left-5 top-4 z-20 select-none leading-none sm:left-7 sm:top-5"
      >
        0{index + 1}
      </div>

      {/* Gold frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 z-30 sm:inset-3"
      >
        <span className="oc-line oc-line-t" />
        <span className="oc-line oc-line-r" />
        <span className="oc-line oc-line-b" />
        <span className="oc-line oc-line-l" />
        <span className="oc-corner oc-corner-tl" />
        <span className="oc-corner oc-corner-br" />
        <span className="oc-diamond" />
      </div>

      {/* Vertical catalogue label */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-5 z-30 flex flex-col items-center gap-2.5 sm:right-5 sm:top-6 sm:gap-3"
      >
        <span className="oc-numline h-6 w-px sm:h-8" />
        <span className="oc-num text-[0.6rem] uppercase tracking-[0.28em] [writing-mode:vertical-rl] sm:text-[0.62rem] sm:tracking-[0.3em]">
          Nº 0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="pointer-events-none relative z-30 mt-auto min-w-0 p-6 pr-12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 sm:p-10">
        <div
          className="h-px w-8 transition-all duration-700 group-hover:w-16"
          style={{
            background: `linear-gradient(90deg, #D4AF78, ${tile.tint})`,
          }}
        />

        <p
          className="oc-label mt-3.5 flex items-center gap-2 sm:mt-4"
          style={{ color: tile.tint }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-[5px] w-[5px] shrink-0 rotate-45 border"
            style={{ borderColor: tile.tint }}
          />
          <span>{tile.kicker}</span>
        </p>

        <h3
          id={`occasion-${tile.id}-title`}
          className="t-display t-display-md mt-2 break-words text-[#F5F3EE]"
        >
          {tile.title}
        </h3>

        <p className="text-body mt-2.5 max-w-[28rem] text-sm leading-relaxed text-[#F5F3EE]/80 transition-colors duration-700 group-hover:text-[#F5F3EE]/95 sm:mt-3 sm:text-base">
          {tile.body}
        </p>

        <div className="mt-4 text-[0.68rem] italic uppercase tracking-[0.22em] text-[#D4AF78]/90 opacity-100 transition-all duration-700 sm:mt-5 sm:text-[0.7rem] sm:tracking-[0.25em] lg:opacity-0 lg:group-hover:opacity-100">
          {tile.caption}
        </div>
      </div>
    </article>
  );
}

export function Occasions() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="occasions"
      aria-labelledby="occasions-title"
      className="section occasions-vip relative isolate scroll-mt-20 overflow-hidden border-t border-[#D4AF78]/20"
    >
      <div className="wrap relative z-10">
        {/* HEADER */}
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal className="min-w-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20 sm:w-12" />
              <span className="text-[0.68rem] uppercase tracking-[0.28em] text-[#D4AF78] sm:text-[0.72rem] sm:tracking-[0.34em]">
                Curated Engagements
              </span>
            </div>
            <h2
              id="occasions-title"
              className="t-display t-display-lg mt-4 text-[#F5F3EE] sm:mt-6"
            >
              From everyday plans,
              <br />
              <em className="oc-gold-text italic">to unforgettable nights.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:pb-2">
            <p className="t-lead border-l border-[#D4AF78]/25 pl-4 text-[#F5F3EE]/70 sm:pl-6">
              From dinner dates to special celebrations, enjoy a comfortable ride, professional service, and a stylish arrival every time.
            </p>
            <p className="oc-label mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 pl-4 text-[#F5F3EE]/50 sm:mt-6 sm:pl-6">
              <span>Professional Chauffeurs</span>
              <Diamond />
              <span>Comfort &amp; Style</span>
              <Diamond />
              <span>Great Value</span>
            </p>
          </Reveal>
        </div>

        {/* 2x2 BALANCED GRID FOR 4 TILES */}
        <div className="mt-9 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={0.1 + i * 0.08} className="min-w-0">
              <TileCard tile={t} index={i} />
            </Reveal>
          ))}
        </div>

        {/* CONCIERGE FOOTER */}
        <Reveal className="mt-10 flex flex-col gap-4 border-t border-[#D4AF78]/10 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-8">
          <p className="text-xs leading-relaxed text-[#F5F3EE]/60 sm:text-[0.8rem]">
            Every engagement includes a uniformed personal chauffeur, a clean vehicle, and an uncompromising standard of care.
          </p>
          <a
            href="#reserve"
            className="oc-cta group inline-flex min-h-11 shrink-0 items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-[#D4AF78] transition-colors duration-300 hover:text-[#E4C491] sm:tracking-[0.28em]"
          >
            <span>Curate your evening</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="oc-grain pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
      />
    </section>
  );
}

function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[5px] w-[5px] shrink-0 rotate-45 border border-[#D4AF78]/60 ${className}`}
    />
  );
}