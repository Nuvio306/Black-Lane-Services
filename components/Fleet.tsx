// components/Fleet.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { fleet, type Vehicle, type VehicleId } from "@/lib/data";
import { selectVehicle } from "@/lib/events";
import { Reveal } from "./Reveal";
import "./fleet.css";

const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;

const OCCASIONS = [
  "Weddings",
  "Black-Tie Evenings",
  "Airport Transfers",
  "Corporate Travel",
  "Proms & Formals",
  "City Tours",
] as const;

const GALLERY_IMAGES = [
  {
    src: "/images/suburban-int-2.jpg",
    alt: "Third-row seating and ambient lighting",
    label: "Interior · 01",
  },
  {
    src: "/images/suburban-ext-1.jpg",
    alt: "Front three-quarter view",
    label: "Exterior · 01",
  },
  {
    src: "/images/suburban-ext-2.jpg",
    alt: "Rear profile",
    label: "Exterior · 02",
  },
] as const;

export function Fleet() {
  const [active, setActive] = useState<VehicleId>("suburban");
  const [gallerySlide, setGallerySlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yImages = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? "0%" : "-3%", shouldReduceMotion ? "0%" : "3%"]
  );

  const currentIndex = Math.max(0, fleet.findIndex((v) => v.id === active));
  const current = fleet[currentIndex];
  const safeGallerySlide = gallerySlide % GALLERY_IMAGES.length;

  const handlePrevVehicle = () => {
    const prevIdx = (currentIndex - 1 + fleet.length) % fleet.length;
    setActive(fleet[prevIdx].id);
  };

  const handleNextVehicle = () => {
    const nextIdx = (currentIndex + 1) % fleet.length;
    setActive(fleet[nextIdx].id);
  };

  const handlePrevGallery = () => {
    setGallerySlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const handleNextGallery = () => {
    setGallerySlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length
    );
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex]);

  const activeGalleryPhoto = GALLERY_IMAGES[safeGallerySlide];
  const lightboxPhoto =
    lightboxIndex !== null
      ? GALLERY_IMAGES[lightboxIndex % GALLERY_IMAGES.length]
      : null;

  return (
    <>
      <section
        ref={sectionRef}
        id="fleet"
        aria-labelledby="fleet-title"
        className="section fleet-vip relative isolate overflow-hidden border-t border-[#D4AF78]/20"
      >
        <div className="wrap relative z-10">
          {/* Header */}
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20" />
                <span className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D4AF78]">
                  The Fleet
                </span>
              </div>
              <h2
                id="fleet-title"
                className="t-display t-display-lg mt-6 text-[#F5F3EE]"
              >
                Travel in comfort,
                <br />
                <em className="fl-gold-text italic">arrive in style.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="lg:pb-2">
              <p className="t-lead border-l border-[#D4AF78]/25 pl-6 text-[#F5F3EE]/70">
                Clean, comfortable vehicles and professional chauffeurs. Everything you need for a smooth, stylish ride at a price you&apos;ll love.
              </p>
              <p className="fl-label mt-6 flex flex-wrap items-center gap-3 pl-6 text-[#F5F3EE]/50">
                Luxury Vehicles <Diamond /> Professional Chauffeurs <Diamond /> Great Value
              </p>
            </Reveal>
          </div>

          {/* Occasions marquee */}
          <Reveal delay={0.15} className="fl-marquee mt-16 py-4">
            <div className="fl-marquee-track">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex items-center gap-10 pr-10"
                >
                  {OCCASIONS.map((occasion) => (
                    <span
                      key={occasion}
                      className="fl-label flex items-center gap-10 whitespace-nowrap text-[#F5F3EE]"
                    >
                      {occasion} <Diamond />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Desktop viewing rail */}
          <div className="mt-12 hidden items-end justify-between gap-8 lg:flex">
            <div className="flex items-baseline gap-5">
              <span className="fl-label text-[#F5F3EE]/50">Now viewing</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASE_CUSTOM }}
                  className="fl-serif text-[1.35rem] font-medium italic text-[#D4AF78]"
                >
                  {current?.name}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-6">
              <div
                role="group"
                aria-label="Choose a vehicle to view"
                className="flex items-center"
              >
                {fleet.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActive(v.id)}
                    aria-pressed={v.id === active}
                    aria-label={`View ${v.name}`}
                    className="group px-1.5 py-3 focus-visible:outline-offset-2"
                  >
                    <span
                      className={`block h-[2px] transition-all duration-500 ${
                        v.id === active
                          ? "w-14 bg-[#D4AF78]"
                          : "w-9 bg-[#D4AF78]/25 group-hover:bg-[#D4AF78]/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[0.72rem] tracking-[0.25em] text-[#F5F3EE]/60 tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")}{" "}
                <span className="text-[#F5F3EE]/30">
                  / {String(fleet.length).padStart(2, "0")}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop gallery */}
          <motion.div
            className="relative mt-8 hidden min-h-[max(36rem,min(78vh,52rem))] gap-3 lg:flex"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_CUSTOM }}
          >
            {fleet.map((v, i) => {
              const isActive = v.id === active;
              return (
                <article
                  key={v.id}
                  data-active={isActive}
                  onMouseEnter={() => setActive(v.id)}
                  className="fl-panel group relative isolate min-w-0 overflow-hidden bg-[#0B0A08] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ flexGrow: isActive ? 4.2 : 1, flexBasis: 0 }}
                >
                  <motion.div style={{ y: yImages }} className="absolute inset-x-0 -inset-y-[6%]">
                    <div className="fl-drift absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.image}
                        alt={v.alt}
                        width={1600}
                        height={1067}
                        draggable={false}
                        className={`grade absolute inset-0 h-full w-full object-cover transition-[transform,opacity,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "scale-100 opacity-100" : "scale-105 opacity-45"
                        }`}
                        style={{
                          filter: isActive
                            ? "brightness(0.85) contrast(1.08) saturate(0.9)"
                            : "brightness(0.6) contrast(1.1) saturate(0.7)",
                        }}
                      />
                    </div>
                  </motion.div>

                  <div aria-hidden="true" className="fl-scrim absolute inset-0" />
                  <PlateFrame index={i} name={v.name} />

                  <button
                    type="button"
                    onClick={() => setActive(v.id)}
                    onFocus={() => setActive(v.id)}
                    aria-expanded={isActive}
                    aria-controls={`fleet-${v.id}`}
                    className="absolute inset-0 z-20 text-left focus-visible:outline-offset-[-6px]"
                  >
                    <span className="sr-only">Show {v.name}</span>
                  </button>

                  <div
                    className={`absolute inset-x-0 bottom-0 z-30 p-8 xl:p-10 ${
                      isActive ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                  >
                    <div className="fl-info">
                      <h3 className="t-display t-display-md whitespace-nowrap text-[#F5F3EE]">
                        {v.name}
                      </h3>

                      <div
                        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div
                          id={`fleet-${v.id}`}
                          inert={!isActive}
                          className={`min-h-0 overflow-hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? "translate-y-0 opacity-100 delay-200"
                              : "translate-y-3 opacity-0"
                          }`}
                        >
                          <VehicleDetails vehicle={v} compact />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>

          {/* Mobile & tablet slideshow */}
          {current && (
            <div className="mt-12 lg:hidden">
              <div className="mb-5 flex items-center gap-4">
                <span className="fl-label text-[#D4AF78]">
                  Nº 0{currentIndex + 1} / 0{fleet.length}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-[#D4AF78]/15" />
                <Diamond />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden bg-[#0B0A08]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE_CUSTOM }}
                    className="fl-drift absolute inset-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.image}
                      alt={current.alt}
                      width={1600}
                      height={1200}
                      draggable={false}
                      className="grade h-full w-full object-cover"
                      style={{
                        filter: "brightness(0.85) contrast(1.08) saturate(0.9)",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,6,6,0.55), transparent 45%)",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-[#D4AF78]/40" />
                <div aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-[#D4AF78]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b border-r border-[#D4AF78]" />

                <div
                  aria-hidden="true"
                  className="fl-ghostnum fl-ghostnum-static fl-serif pointer-events-none absolute left-4 top-3 select-none leading-none"
                >
                  0{currentIndex + 1}
                </div>

                {/* Slideshow controls — only when multiple vehicles exist */}
                {fleet.length > 1 && (
                  <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevVehicle}
                      aria-label="Previous vehicle"
                      className="flex h-10 w-10 items-center justify-center border border-[#D4AF78]/40 bg-[#0B0A08]/80 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-2 bg-[#0B0A08]/75 px-3 py-1.5 backdrop-blur-sm">
                      {fleet.map((v, idx) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setActive(v.id)}
                          aria-label={`Slide ${idx + 1}: ${v.name}`}
                          aria-current={v.id === active}
                          className={`h-1.5 transition-all duration-300 ${
                            v.id === active
                              ? "w-6 bg-[#D4AF78]"
                              : "w-1.5 bg-[#D4AF78]/35"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextVehicle}
                      aria-label="Next vehicle"
                      className="flex h-10 w-10 items-center justify-center border border-[#D4AF78]/40 bg-[#0B0A08]/80 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASE_CUSTOM }}
                >
                  <h3 className="t-display t-display-sm mt-8 text-[#F5F3EE]">
                    {current.name}
                  </h3>
                  <VehicleDetails vehicle={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          className="fl-grain pointer-events-none absolute inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
        />
      </section>

      {current && (
        <section
          id="fleet-gallery"
          aria-labelledby="gallery-title"
          className="section fleet-vip relative isolate overflow-hidden border-t border-[#D4AF78]/20"
        >
          <div className="wrap relative z-10">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-[#D4AF78] to-[#D4AF78]/20" />
                <span className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D4AF78]">
                  Step Inside
                </span>
              </div>
              <h2 id="gallery-title" className="t-display t-display-lg mt-6 text-[#F5F3EE]">
                Inside the <em className="fl-gold-text italic">{current.name}</em>
              </h2>
            </Reveal>

            {/* Mobile slideshow for interior/exterior gallery */}
            <div className="mt-12 md:hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0B0A08]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.button
                    key={activeGalleryPhoto.src}
                    type="button"
                    onClick={() => setLightboxIndex(safeGallerySlide)}
                    aria-label={`Open carousel on ${activeGalleryPhoto.label}`}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASE_CUSTOM }}
                    className="fl-gallery-item group relative block h-full w-full cursor-pointer text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeGalleryPhoto.src}
                      alt={activeGalleryPhoto.alt}
                      width={1200}
                      height={900}
                      draggable={false}
                      className="h-full w-full object-cover"
                      style={{ filter: "brightness(0.88) contrast(1.06) saturate(0.9)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 border border-[#D4AF78]/35"
                    />
                  </motion.button>
                </AnimatePresence>

                <span className="fl-label pointer-events-none absolute left-3 top-3 bg-[#0B0A08]/75 px-2.5 py-1 text-[#D4AF78] backdrop-blur-sm">
                  {activeGalleryPhoto.label}
                </span>

                <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevGallery}
                    aria-label="Previous photo"
                    className="flex h-10 w-10 items-center justify-center border border-[#D4AF78]/40 bg-[#0B0A08]/80 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                  </button>

                  <div className="flex items-center gap-2 bg-[#0B0A08]/75 px-3 py-1.5 backdrop-blur-sm">
                    {GALLERY_IMAGES.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setGallerySlide(idx)}
                        aria-label={`Photo ${idx + 1}: ${img.label}`}
                        aria-current={idx === safeGallerySlide}
                        className={`h-1.5 transition-all duration-300 ${
                          idx === safeGallerySlide
                            ? "w-6 bg-[#D4AF78]"
                            : "w-1.5 bg-[#D4AF78]/35"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextGallery}
                    aria-label="Next photo"
                    className="flex h-10 w-10 items-center justify-center border border-[#D4AF78]/40 bg-[#0B0A08]/80 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                  >
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tablet & desktop asymmetric 3-photo grid (1 wide feature + 2 side-by-side) */}
            <div className="mt-12 hidden gap-3 md:grid md:grid-cols-2">
              {GALLERY_IMAGES.map((img, idx) => {
                const isLead = idx === 0;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`View ${img.label}: ${img.alt}`}
                    className={`fl-gallery-item group relative block w-full cursor-pointer overflow-hidden bg-[#0B0A08] text-left ${
                      isLead ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={isLead ? 1600 : 1200}
                      height={isLead ? 900 : 900}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      style={{ filter: "brightness(0.88) contrast(1.06) saturate(0.9)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 border border-[#D4AF78]/25 transition-colors duration-500 group-hover:border-[#D4AF78]/60"
                    />
                    <span className="fl-label absolute bottom-3 left-3 text-[#D4AF78]">
                      {img.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Gallery footer: catchphrase + rectangular button */}
            <Reveal
              delay={0.15}
              className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#D4AF78]/20 pt-8 sm:flex-row sm:items-center"
            >
              <p className="fl-serif text-lg italic text-[#F5F3EE]/75 sm:text-xl">
                Every detail curated for <span className="text-[#D4AF78]">unhurried comfort</span> — from the first mile to the final arrival.
              </p>

              <div className="flex shrink-0 flex-wrap items-center gap-6">
                <a
                  href="#reserve"
                  onClick={() => selectVehicle(current.id)}
                  className="btn btn-primary !rounded-none"
                >
                  Reserve your ride now
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery lightbox carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current?.name ?? "Vehicle"} photo carousel`}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: EASE_CUSTOM }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060606]/92 p-4 backdrop-blur-md sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-5xl flex-col gap-4 border border-[#D4AF78]/35 bg-[#0B0A08] p-4 sm:p-6"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 border-b border-[#D4AF78]/20 pb-3">
                <div className="flex items-center gap-3">
                  <span className="fl-label text-[#D4AF78]">
                    {lightboxPhoto.label}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-[#F5F3EE]/50 tabular-nums">
                    {String((lightboxIndex % GALLERY_IMAGES.length) + 1).padStart(2, "0")} /{" "}
                    {String(GALLERY_IMAGES.length).padStart(2, "0")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close carousel"
                  className="flex h-10 w-10 items-center justify-center border border-[#D4AF78]/35 text-[#D4AF78] transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Slide stage */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060606]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lightboxPhoto.src}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_CUSTOM }}
                    className="h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={lightboxPhoto.src}
                      alt={lightboxPhoto.alt}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  aria-label="Previous gallery image"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#D4AF78]/45 bg-[#0B0A08]/85 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleNextLightbox}
                  aria-label="Next gallery image"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#D4AF78]/45 bg-[#0B0A08]/85 text-[#D4AF78] backdrop-blur-sm transition-colors hover:border-[#D4AF78] hover:bg-[#D4AF78] hover:text-[#0B0A08]"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Caption & indicator strip */}
              <div className="flex flex-col items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                <p className="text-sm text-[#F5F3EE]/75">{lightboxPhoto.alt}</p>

                <div className="flex items-center gap-2">
                  {GALLERY_IMAGES.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Go to ${img.label}`}
                      aria-current={idx === lightboxIndex % GALLERY_IMAGES.length}
                      className={`h-2 transition-all duration-300 ${
                        idx === lightboxIndex % GALLERY_IMAGES.length
                          ? "w-7 bg-[#D4AF78]"
                          : "w-2 bg-[#D4AF78]/30 hover:bg-[#D4AF78]/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PlateFrame({ index, name }: { index: number; name: string }) {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 z-30">
        <span className="fl-line fl-line-t" />
        <span className="fl-line fl-line-r" />
        <span className="fl-line fl-line-b" />
        <span className="fl-line fl-line-l" />
        <span className="fl-corner fl-corner-tl" />
        <span className="fl-corner fl-corner-br" />
        <span className="fl-diamond" />
      </div>

      <div
        aria-hidden="true"
        className="fl-ghostnum fl-serif pointer-events-none absolute left-7 top-5 z-20 select-none leading-none"
      >
        0{index + 1}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-6 z-40 flex flex-col items-center gap-3"
      >
        <span className="fl-numline h-8 w-px" />
        <span className="fl-num text-[0.62rem] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Nº 0{index + 1}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="fl-vname pointer-events-none absolute bottom-8 left-6 z-30"
      >
        <span className="block rotate-180 text-[0.8rem] uppercase tracking-[0.28em] text-[#F5F3EE]/70 [writing-mode:vertical-rl]">
          {name}
        </span>
      </div>
    </>
  );
}

function VehicleDetails({
  vehicle,
  compact = false,
}: {
  vehicle: Vehicle;
  compact?: boolean;
}) {
  return (
    <>
      <p
        className={
          compact
            ? "text-body mt-3 max-w-[26rem] text-[#F5F3EE]/80"
            : "mt-4 max-w-[30rem] text-[0.95rem] leading-[1.75] text-[#F5F3EE]/70"
        }
      >
        {vehicle.note}
      </p>

      <dl className={compact ? "mt-5 flex gap-8" : "mt-6"}>
        <Spec label="Guest Capacity" value={String(vehicle.passengers)} />
      </dl>

      <a
        href="#reserve"
        onClick={() => selectVehicle(vehicle.id)}
        className="link-mono fl-reserve group/link relative z-30 mt-6 inline-flex min-h-11 items-center gap-2 text-[#D4AF78] hover:text-[#E4C491]"
      >
        Reserve this vehicle
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-500 group-hover/link:translate-x-1"
        />
      </a>
    </>
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

function Spec({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="t-caption fl-label text-[#F5F3EE]/55">{label}</dt>
      <dd className="t-figure mt-1 text-xl font-light text-[#F5F3EE] sm:text-2xl">
        {value}
      </dd>
    </div>
  );
}