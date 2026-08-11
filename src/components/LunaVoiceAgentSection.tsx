import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, PhoneOutgoing, MessageSquareText, Check, Sparkles } from "lucide-react";
import { GlowBorderCard } from "./ui/GlowBorderCard";
import { useServiceSelect } from "../hooks/useServiceSelect";

interface VoiceAgent {
  id: string;
  name: string;
  brandName?: string;
  icon: React.ReactNode;
  accent: string;
  price: number;
  monthlyPrice: number;
  monthlyIncludes: string;
  tagline: string;
  features: string[];
}

// Hybrid pricing: setup fee covers the custom build, monthly retainer covers
// infrastructure (LLM inference, STT/TTS, telephony), minute allocation, and
// active monitoring/maintenance  the recurring costs a flat one-time fee
// doesn't account for.
const agents: VoiceAgent[] = [
  {
    id: "inbound",
    name: "Inbound Voice Agent",
    icon: <Phone size={20} className="text-brand-orange" />,
    accent: "#E65C2B",
    price: 2000,
    monthlyPrice: 297,
    monthlyIncludes: "500 min/mo included, then $0.25/min · 24/7 uptime monitoring, calendar sync & SMS routing",
    tagline: "Answers every call, 24/7",
    features: [
      "24/7 phone intake, live lead qualification",
      "Real-time calendar booking mid-call",
      "Instant post-call SMS routing",
      "Multilingual, remembers returning callers",
    ],
  },
  {
    id: "outbound",
    name: "Outbound Sales Agent",
    icon: <PhoneOutgoing size={20} className="text-brand-blue" />,
    accent: "#2B8ED9",
    price: 2500,
    monthlyPrice: 497,
    monthlyIncludes: "1,000 min/mo included · multi-zone pipeline auto-refill & concurrency line upkeep",
    tagline: "Dials 10 leads at once, 24/7",
    features: [
      "10x concurrent call speed",
      "Zero-downtime pipeline auto-refill",
      "\"Follow-the-sun\" global time-zone dialing",
      "Multilingual with deal-stage memory",
    ],
  },
  {
    id: "hybrid",
    name: "Website Hybrid Voice/Chat Agent",
    icon: <MessageSquareText size={20} className="text-[#32D74B]" />,
    accent: "#32D74B",
    price: 1000,
    monthlyPrice: 197,
    monthlyIncludes: "Widget hosting, persistent tracking & continuous LLM context optimization",
    tagline: "Text or voice, right on your site",
    features: [
      "On-screen widget: text chat or WebRTC voice call",
      "Fully multilingual for international traffic",
      "Persistent tracking resumes past conversations",
      "Embeddable anywhere via custom JS widget",
    ],
  },
];

const TOTAL_PRICE = agents.reduce((sum, a) => sum + a.price, 0);
const TOTAL_MONTHLY = agents.reduce((sum, a) => sum + a.monthlyPrice, 0);
const BUNDLE_DISCOUNT = 0.25;
const BUNDLE_PRICE = Math.round(TOTAL_PRICE * (1 - BUNDLE_DISCOUNT));
const BUNDLE_MONTHLY = Math.round(TOTAL_MONTHLY * (1 - BUNDLE_DISCOUNT));
const BUNDLE_SAVINGS = TOTAL_PRICE - BUNDLE_PRICE;
const BUNDLE_MONTHLY_SAVINGS = TOTAL_MONTHLY - BUNDLE_MONTHLY;

interface LunaVoiceAgentSectionProps {
  setServiceInterested: (val: string) => void;
}

export const LunaVoiceAgentSection: React.FC<LunaVoiceAgentSectionProps> = ({ setServiceInterested }) => {
  const [mode, setMode] = useState<"individual" | "bundle">("individual");
  const [selectedAgent, setSelectedAgent] = useState<string>(agents[0].id);

  const selectService = useServiceSelect(setServiceInterested);

  const handleSelectAgent = (agent: VoiceAgent) => {
    setSelectedAgent(agent.id);
    selectService(agent.brandName ? `${agent.name} (${agent.brandName})` : agent.name);
  };

  const handleSelectBundle = () => {
    selectService("AI Voice & Chat Agent Suite: Inbound + Outbound + Website Hybrid (bundle)");
  };

  return (
    <div className="w-full relative z-10 flex flex-col gap-10">
      <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
        {/* Left: Inbound */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Answers Every Call</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            24/7 inbound voice agent that qualifies leads in real time, books calendar slots mid-call, and routes qualified prospects directly to your CRM. Never miss an opportunity.
          </p>
        </div>

        {/* Middle: Outbound */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Dials Your Leads</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Concurrent outbound agent that dials 10 leads simultaneously, qualifies at scale, and keeps your pipeline moving. Works across time zones with memory of past conversations.
          </p>
        </div>

        {/* Right: Website */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-white">Lives on Your Site</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Hybrid voice/chat widget embedded directly on your website. Visitors text or call. Agent handles inquiry instantly. Full CRM integration. One click setup.
          </p>
        </div>
      </div>

      <div className="text-center flex flex-col gap-4">
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-left">
          All powered by 2XceL's proprietary voice engine, enterprise telephony infrastructure, and seamless CRM webhooks. Setup includes complete custom build. Monthly retainer covers optimization, hosting, minute allotment, and monitoringthink of it as hiring a digital employee who never sleeps.
        </p>

        {/* Individual / Bundle toggle */}
        <div className="mx-auto mt-2 flex items-center gap-1 bg-black/40 border border-white/10 rounded-full p-1">
          {(["individual", "bundle"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
                mode === m ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {mode === m && (
                <motion.div
                  layoutId="voice-agent-toggle-bg"
                  className="absolute inset-0 bg-brand-orange rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m === "individual" ? "Individual" : "Bundle All Three"}</span>
              {m === "bundle" && (
                <span className="relative z-10 bg-white/15 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  SAVE 25%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-stretch"
      >
        {agents.map((agent) => {
          const isGlowing = mode === "bundle" || selectedAgent === agent.id;

          const cardBody = (
            <div className="h-full flex flex-col gap-5 p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
                  {agent.icon}
                </div>
                {mode === "bundle" && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-2.5 py-1 shrink-0">
                    <Sparkles size={11} />
                    In Bundle
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-bold text-xl leading-tight">
                  {agent.name}{" "}
                  {agent.brandName && (
                    <span className="text-gray-500 font-medium">({agent.brandName})</span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{agent.tagline}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-end gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ${agent.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 font-mono pb-1">one-time setup</span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-lg font-bold text-brand-orange tracking-tight">
                    +${agent.monthlyPrice}
                  </span>
                  <span className="text-xs text-gray-500 font-mono pb-0.5">/mo retainer</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug">{agent.monthlyIncludes}</p>
              </div>

              <div className="h-px bg-white/10" />

              <ul className="flex flex-col gap-2.5 flex-1">
                {agent.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-300 leading-snug">
                    <Check size={14} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {mode === "individual" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAgent(agent);
                  }}
                  className={`w-full h-11 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isGlowing
                      ? "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/15"
                  }`}
                >
                  Get Started
                </button>
              )}
            </div>
          );

          return (
            <GlowBorderCard
              key={agent.id}
              active={isGlowing}
              onClick={() => mode === "individual" && setSelectedAgent(agent.id)}
            >
              {cardBody}
            </GlowBorderCard>
          );
        })}
      </motion.div>

      {mode === "bundle" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto w-full card-surface rounded-2xl border border-brand-orange/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">
              Full Suite  All Three Agents
            </span>
            <div className="flex items-end gap-3">
              <span className="text-lg text-gray-500 line-through font-mono">${TOTAL_PRICE.toLocaleString()}</span>
              <span className="text-4xl font-black text-white tracking-tight">${BUNDLE_PRICE.toLocaleString()}</span>
              <span className="text-xs text-gray-500 font-mono pb-1">setup</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-sm text-gray-500 line-through font-mono">${TOTAL_MONTHLY.toLocaleString()}/mo</span>
              <span className="text-xl font-bold text-brand-orange tracking-tight">${BUNDLE_MONTHLY.toLocaleString()}/mo</span>
              <span className="text-xs text-gray-500 font-mono pb-0.5">retainer</span>
            </div>
            <span className="text-sm text-gray-500">
              Save ${BUNDLE_SAVINGS.toLocaleString()} setup + ${BUNDLE_MONTHLY_SAVINGS}/mo (25%) versus buying separately
            </span>
          </div>
          <button
            type="button"
            onClick={handleSelectBundle}
            className="shrink-0 w-full sm:w-auto px-9 py-4 rounded-xl text-base font-bold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange/90 hover:scale-105 text-white shadow-lg shadow-brand-orange/20 transition-all duration-300 cursor-pointer"
          >
            Get The Full Suite
          </button>
        </motion.div>
      )}

      <p className="text-gray-500 text-xs sm:text-sm font-light text-center">Minimum $2,500/month commitment • Custom pricing available based on scope</p>
    </div>
  );
};
