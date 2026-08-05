import React from "react";
import { Check, Sparkles } from "lucide-react";
import { GlowBorderCard } from "./ui/GlowBorderCard";
import { useServiceSelect } from "../hooks/useServiceSelect";

interface AdVideoTier {
  id: string;
  name: string;
  bestFor: string;
  included: string[];
  priceLabel: string;
  recommended?: boolean;
}

const tiers: AdVideoTier[] = [
  {
    id: "starter",
    name: "Starter Social Ad Pack",
    bestFor: "Testing new angles, rapid product launches, or basic social promotions.",
    included: [
      "1 Hero Ad (up to 60s)",
      "2 Vertical Cutdowns (Reels/TikTok/Shorts)",
      "Professional editing, color grading & captions",
      "1 round of revisions",
    ],
    priceLabel: "$1,950",
  },
  {
    id: "growth",
    name: "Growth Campaign Pack",
    bestFor: "Brands ready to scale multi-channel acquisition across Meta, TikTok, and YouTube.",
    included: [
      "2 Hero Ads (up to 90s each)",
      "5 Performance Cutdowns / Hooks",
      "Advanced sound design & dynamic captions",
      "Scriptwriting & visual concept guidance",
      "2 rounds of revisions",
    ],
    priceLabel: "$4,500",
    recommended: true,
  },
  {
    id: "cinematic",
    name: "Cinematic Brand Commercial",
    bestFor: "High-impact brand awareness, top-of-funnel campaigns, or premium positioning.",
    included: [
      "Full cinematic hero film (2–3 minutes)",
      "6–10 short-form social optimization edits",
      "End-to-end creative direction & storyboarding",
      "Professional voiceover & custom motion graphics",
      "Multi-location or advanced studio setup",
    ],
    priceLabel: "$12,500",
  },
];

const addOns: { label: string; price: string; desc: string }[] = [
  {
    label: "Monthly Ad Creative Retainer",
    price: "$4,500/mo",
    desc: "A fresh batch of 6 optimized variations and hooks every month to combat ad fatigue.",
  },
  {
    label: "UGC Creator Integration",
    price: "$500 per block",
    desc: "Sourcing and coordinating creator-style raw footage to blend organically into paid social feeds.",
  },
  {
    label: "Rush Delivery",
    price: "$400",
    desc: "3-day turnaround on any package.",
  },
];

interface AdVideoProductionSectionProps {
  setServiceInterested: (val: string) => void;
}

export const AdVideoProductionSection: React.FC<AdVideoProductionSectionProps> = ({ setServiceInterested }) => {
  const selectService = useServiceSelect(setServiceInterested);
  const handleSelect = (tier: AdVideoTier) => {
    selectService(`Ad Video Production: ${tier.name} (${tier.priceLabel})`);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Ad Video Production
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Standalone AI-produced ad videos, sold separately from the social content engine above  from single-launch hero ads to full cinematic brand commercials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-stretch">
        {tiers.map((tier) => {
          const cardBody = (
            <div className="h-full flex flex-col gap-5 p-7">
              <div className="flex items-center justify-between gap-3 min-h-[26px]">
                {tier.recommended && (
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-2.5 py-1 shrink-0">
                    <Sparkles size={13} />
                    Most Popular
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-white font-bold text-2xl leading-tight">{tier.name}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{tier.bestFor}</p>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {tier.priceLabel}
              </div>

              <div className="h-px bg-white/10" />

              <ul className="flex flex-col gap-2.5 flex-1">
                {tier.included.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-300 leading-snug">
                    <Check size={16} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleSelect(tier)}
                className={`w-full h-11 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer ${
                  tier.recommended
                    ? "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                }`}
              >
                Get Started
              </button>
            </div>
          );

          return (
            <GlowBorderCard key={tier.id} active={Boolean(tier.recommended)}>
              {cardBody}
            </GlowBorderCard>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto w-full card-surface rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col gap-6">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold text-center">
          A La Carte Add-Ons &amp; Retainers
        </span>
        <div className="grid sm:grid-cols-3 gap-6">
          {addOns.map((addOn) => (
            <div key={addOn.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-white font-bold text-lg leading-tight">{addOn.label}</span>
              </div>
              <span className="text-brand-orange font-bold text-lg tracking-tight">{addOn.price}</span>
              <p className="text-gray-400 text-sm leading-relaxed">{addOn.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
