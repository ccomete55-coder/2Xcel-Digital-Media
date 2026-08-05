import React from "react";

interface GlowBorderCardProps {
  /** Shows the spinning brand-gradient border (selected/recommended state). */
  active: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Highlighted-card wrapper reused across pricing/tier grids (SocialMediaTiers,
 * LunaVoiceAgentSection, AdVideoProductionSection): a spinning conic-gradient
 * border in the brand colors when `active`, a plain glass card otherwise.
 */
export const GlowBorderCard: React.FC<GlowBorderCardProps> = ({ active, onClick, className = "", children }) => {
  const cursor = onClick ? "cursor-pointer" : "";

  if (!active) {
    return (
      <div
        onClick={onClick}
        className={`glass rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 h-full ${cursor} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl p-[2px] overflow-hidden shadow-2xl h-full ${cursor} ${className}`}
    >
      <div
        className="absolute -inset-[150%] animate-spin"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-brand-orange) 18%, var(--color-brand-blue) 45%, transparent 65%)",
          animationDuration: "4s",
        }}
      />
      <div className="relative rounded-2xl bg-brand-obsidian h-full">{children}</div>
    </div>
  );
};
