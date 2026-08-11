import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { GlowBorderCard } from "./ui/GlowBorderCard";
import { useServiceSelect } from "../hooks/useServiceSelect";

interface Tier {
  id: string;
  name: string;
  subtitle: string;
  monthly: number;
  tagline: string;
  contentOutput: string;
  distribution: string;
  productionStack: string[];
  systemManagement: string[];
  recommended?: boolean;
}

const ANNUAL_DISCOUNT = 0.25;

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Brand Presence Engine",
    monthly: 499,
    tagline: "For small businesses that want to show up everywhere, consistently, without having to do it themselves.",
    contentOutput: "3 Short-Form Video Reels / week (~12–14 videos/mo)",
    distribution: "Up to 3 channels (IG Reels, TikTok, YouTube Shorts) = 36–42 posts/mo",
    productionStack: [
      "Custom Brand Aesthetic (fonts, colors, logo watermark)",
      "Dynamic Motion Graphics & HD AI Visuals",
      "Engaging On-Screen Captions & Trending Audio Selection",
      "Conversion-focused SEO Captions & Targeted Hashtag Packs",
    ],
    systemManagement: [
      "Automated Content Calendar & Approval Dashboard",
      "Monthly Content Performance Summary",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Organic Lead & Authority Accelerator",
    monthly: 999,
    tagline: "For brands ready to go all-in on short-form video  more engagement, more inbound, without burning out your team.",
    contentOutput: "5 Short-Form Video Reels / week (~20–22 videos/mo)",
    distribution: "Up to 5 channels (IG, TikTok, YouTube Shorts, FB Reels, LinkedIn) = 100+ posts/mo",
    recommended: true,
    productionStack: [
      "Cinematic B-Roll & HD AI Video Generation",
      "Custom Branded Graphic Overlays & Hooks",
      "Advanced On-Screen Kinetic Typography",
      "Optimized Direct-Response Copywriting (CTAs for lead capture)",
    ],
    systemManagement: [
      "Dedicated Brand Style Bible Integration (voice, tone, assets)",
      "Priority Scheduling & Optimized Peak-Time Publishing",
      "Bi-Weekly Performance & Strategy Reports",
    ],
  },
  {
    id: "enterprise",
    name: "Pro / Enterprise",
    subtitle: "Automated Brand Authority & Digital Twin System",
    monthly: 1999,
    tagline: "A full-funnel content engine built around your own AI avatar, so you build founder authority without ever stepping in front of a camera.",
    contentOutput: "7 Days/Week Heavy Distribution (30+ core video assets/mo)",
    distribution: "Ubiquitous Multi-Channel (IG, TikTok, YouTube Shorts, FB, LinkedIn, X) = 150–180+ posts/mo",
    productionStack: [
      "Custom AI Brand Avatar / Digital Twin (hyper-realistic talking head, flawless lip-sync)",
      "Voice Cloning / Custom Voice Synthesis Integration",
      "Studio-Grade Motion Design, Sound FX, & Visual Hook Testing",
      "Full-Funnel Content Mix (educational, promotional, storytelling, viral hooks)",
    ],
    systemManagement: [
      "Dedicated Account Strategy & Priority Workflow Queue",
      "Weekly Analytics, Hook Performance Audits, & Iterative Strategy Adjustments",
      "Direct Call-to-Action / Lead Magnet Funnel Integration",
    ],
  },
];

const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

const priceLabel = (tier: Tier, billing: "monthly" | "yearly"): string => {
  const price = billing === "yearly" ? tier.monthly * (1 - ANNUAL_DISCOUNT) : tier.monthly;
  return `${fmt(price)}/mo`;
};

interface SocialMediaTiersProps {
  setServiceInterested: (val: string) => void;
}

const FEATURES_PREVIEW_COUNT = 2;

const TierCardContent: React.FC<{ tier: Tier; billing: "monthly" | "yearly"; isSelected: boolean; onSelect: () => void }> = ({
  tier,
  billing,
  isSelected,
  onSelect,
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleProductionStack = showAllFeatures ? tier.productionStack : tier.productionStack.slice(0, FEATURES_PREVIEW_COUNT);
  const visibleSystemManagement = showAllFeatures ? tier.systemManagement : tier.systemManagement.slice(0, FEATURES_PREVIEW_COUNT);
  const hiddenCount =
    (tier.productionStack.length - visibleProductionStack.length) +
    (tier.systemManagement.length - visibleSystemManagement.length);

  return (
  <div className="h-full flex flex-col items-center gap-6 p-8 text-center">
    <div className="flex flex-col items-center gap-3">
      <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-3 py-1 shrink-0 ${tier.recommended ? "" : "invisible"}`}>
        <Sparkles size={13} />
        Recommended
      </span>
      <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue min-h-[82px] flex items-center">{tier.subtitle}</p>
    </div>

    <p className="text-gray-400 text-base leading-relaxed max-w-[280px] mx-auto min-h-[171px] flex items-center">{tier.tagline}</p>

    <div className="flex items-end justify-center gap-2">
      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
        {priceLabel(tier, billing)}
      </span>
      {billing === "yearly" && (
        <span className="text-sm text-gray-500 font-mono pb-1.5">billed annually</span>
      )}
    </div>

    <div className="h-px w-full bg-white/10" />

    <div className="flex flex-col gap-2 text-base sm:text-lg text-gray-200 mx-auto w-full max-w-[280px]">
      <div className="flex items-start gap-2.5 text-left">
        <Check size={18} className="text-brand-orange shrink-0 mt-0.5" />
        <span className="font-semibold">{tier.contentOutput}</span>
      </div>
      <div className="flex items-start gap-2.5 text-left">
        <Check size={18} className="text-brand-orange shrink-0 mt-0.5" />
        <span className="font-semibold">{tier.distribution}</span>
      </div>
    </div>

    <div className="flex flex-col items-center gap-4 flex-1 w-full">
      <div className="flex flex-col gap-2.5 w-full max-w-[280px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Production & Creative Stack</p>
        <ul className="flex flex-col gap-2.5">
          {visibleProductionStack.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-base text-gray-300 leading-snug text-left">
              <Check size={17} className="text-brand-blue shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-[280px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 text-center">System & Management</p>
        <ul className="flex flex-col gap-2.5">
          {visibleSystemManagement.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-base text-gray-300 leading-snug text-left">
              <Check size={17} className="text-brand-blue shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAllFeatures(true);
          }}
          className="text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors cursor-pointer"
        >
          +{hiddenCount} more features
        </button>
      )}
      {showAllFeatures && (tier.productionStack.length + tier.systemManagement.length) > FEATURES_PREVIEW_COUNT * 2 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAllFeatures(false);
          }}
          className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          Show less
        </button>
      )}
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`w-full h-12 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer ${
        isSelected
          ? "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20"
          : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
      }`}
    >
      Get Started
    </button>
  </div>
  );
};

export const SocialMediaTiers: React.FC<SocialMediaTiersProps> = ({ setServiceInterested }) => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedTier, setSelectedTier] = useState<string>(
    tiers.find((t) => t.recommended)?.id ?? tiers[0].id
  );

  const selectService = useServiceSelect(setServiceInterested);
  const handleSelect = (tier: Tier) => {
    setSelectedTier(tier.id);
    selectService(
      `Social Media Content & Distribution Engine: ${tier.name} (${billing === "yearly" ? "annual" : "monthly"})`
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 mb-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Consistent Branding</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            All tiers run on the same system. Your brand aestheticfonts, colors, logo, overlaysstays identical across every platform and every post.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Automatic Production</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Videos render automatically with your custom graphics. Motion design, captions, music, hooksall generated and applied to your exact specs.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Smart Scheduling</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Everything publishes on schedule. Pick your posting times per platform, per week. No manual uploads. No late posts. No guesswork.
          </p>
        </div>
      </div>

      <div className="text-center flex flex-col gap-4 mb-8">
        <p className="text-gray-400 text-base leading-relaxed max-w-3xl mx-auto">
          Choose your tier and get started. Monthly or yearly billing available.
        </p>

        {/* Monthly / Yearly toggle */}
        <div className="mx-auto mt-2 flex items-center gap-1 bg-black/40 border border-white/10 rounded-full p-1">
          {(["monthly", "yearly"] as const).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBilling(cycle)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
                billing === cycle ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {billing === cycle && (
                <motion.div
                  layoutId="billing-toggle-bg"
                  className="absolute inset-0 bg-brand-orange rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cycle === "monthly" ? "Monthly" : "Yearly"}</span>
              {cycle === "yearly" && (
                <span className="relative z-10 bg-white/15 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  SAVE 25%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-stretch">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <GlowBorderCard key={tier.id} active={isSelected} onClick={() => setSelectedTier(tier.id)}>
              <TierCardContent tier={tier} billing={billing} isSelected={isSelected} onSelect={() => handleSelect(tier)} />
            </GlowBorderCard>
          );
        })}
      </div>

      <p className="text-gray-500 text-xs sm:text-sm font-light text-center">Minimum $2,500/month commitment • Custom pricing available based on scope</p>
    </div>
  );
};
