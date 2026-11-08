"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, User } from "lucide-react";

interface HeroProps {
  onOpenCallback: () => void;
}

export function Hero({ onOpenCallback }: HeroProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#101D35]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value Proposition & Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Simple Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162646] border border-[#1E335B]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-text-secondary">
                {siteConfig.availability}
              </span>
            </div>

            {/* Professional Designation & Headline */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-dusk font-medium">
                {siteConfig.role}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.2]">
                {siteConfig.headline}
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              {siteConfig.supportingCopy}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenCallback}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-white bg-sunset hover:bg-sunset-hover transition-colors shadow-sm"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-text-primary bg-[#162646] hover:bg-[#1C3159] border border-[#1E335B] hover:border-dusk/40 transition-colors"
              >
                <span>View My Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Portrait Photograph Presentation */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden bg-[#162646] border border-[#1E335B] aspect-[4/5] shadow-card">
                {!photoError && siteConfig.photo.src ? (
                  <Image
                    src={siteConfig.photo.src}
                    alt={siteConfig.photo.alt}
                    fill
                    className="object-cover object-center"
                    onError={() => setPhotoError(true)}
                    priority
                  />
                ) : (
                  /* Elegant, Minimalist Fallback Placeholder */
                  <div className="w-full h-full p-8 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#162646] to-[#121F38]">
                    <div className="w-full flex justify-end">
                      <span className="text-[11px] text-text-muted font-mono tracking-wide">
                        PORTRAIT
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="w-20 h-20 rounded-full bg-[#101D35] border border-[#1E335B] mx-auto flex items-center justify-center text-dusk">
                        <User className="w-8 h-8 opacity-80" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-medium text-text-primary">
                          {siteConfig.name}
                        </div>
                        <p className="text-xs text-text-secondary">
                          {siteConfig.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted border-t border-[#1E335B] w-full pt-4">
                      {siteConfig.location}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
