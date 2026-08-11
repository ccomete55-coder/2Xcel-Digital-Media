import React from "react";
import { Check, Compass } from "lucide-react";
import { useServiceSelect } from "../hooks/useServiceSelect";

interface DeliverableGroup {
  title: string;
  points: string[];
}

const deliverables: DeliverableGroup[] = [
  {
    title: "1. Comprehensive Go-To-Market (GTM) Roadmap",
    points: [
      "Deep-dive market and competitor positioning analysis to identify high-margin whitespace.",
      "Multi-channel acquisition strategy mapped directly to your ideal customer profile (ICP).",
      "Channel-specific playbooks for scaling paid media, organic reach, and outbound funnels.",
    ],
  },
  {
    title: "2. Offer Structuring & Value Architecture",
    points: [
      "Complete teardown and rebuild of your core offers, pricing tiers, and product suite.",
      "Development of high-converting front-end lead magnets, core offers, and high-ticket backend upsells.",
      "Messaging matrix and value proposition engineering designed to eliminate price resistance.",
    ],
  },
  {
    title: "3. Funnel Telemetry & Attribution Tracking Setup",
    points: [
      "Full-stack tracking audit to ensure zero data leakage across your web properties and ad platforms.",
      "Implementation of clear attribution models so you know precisely which channels drive profitable ROI.",
      "Centralized KPI dashboard setup to monitor lead velocity, conversion rates, and customer acquisition cost (CAC).",
    ],
  },
  {
    title: "4. 90-Day Execution SOPs & Team Hand-off",
    points: [
      "Step-by-step Standard Operating Procedures (SOPs) for internal teams or agency partners to execute the strategy.",
      "Phased 90-day implementation calendar breaking down weekly milestones, testing schedules, and campaign rollouts.",
      "Ongoing strategic oversight and optimization frameworks (included with the Fractional CMO retainer option).",
    ],
  },
];

interface EnterpriseStrategySectionProps {
  setServiceInterested: (val: string) => void;
}

export const EnterpriseStrategySection: React.FC<EnterpriseStrategySectionProps> = ({ setServiceInterested }) => {
  const selectService = useServiceSelect(setServiceInterested);
  const handleSelect = (option: string) => {
    selectService(`Enterprise Marketing Strategy & Offer Architecture (${option})`);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Enterprise Marketing Strategy &amp; Offer Architecture
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Established businesses looking to completely overhaul their market positioning, streamline customer acquisition, and scale their offer ecosystem without the overhead of a full-time executive team.
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full card-surface rounded-2xl border border-white/10 p-7 sm:p-10 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
            <Compass size={20} className="text-brand-orange" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Detailed Deliverables &amp; Scope of Work
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {deliverables.map((group) => (
            <div key={group.title} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-white font-bold text-lg leading-snug">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-300 leading-snug">
                    <Check size={15} className="text-brand-orange shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10" />

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-6 text-center">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-mono font-bold">
              One-Time Blueprint
            </span>
            <span className="text-3xl font-black text-white tracking-tight">$7,500</span>
            <button
              type="button"
              onClick={() => handleSelect("One-Time Blueprint")}
              className="w-full h-11 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20"
            >
              Get Started
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/[0.06] p-6 text-center">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-mono font-bold">
              Fractional CMO Retainer
            </span>
            <span className="text-3xl font-black text-white tracking-tight">$7,500<span className="text-lg text-gray-400">/mo</span></span>
            <button
              type="button"
              onClick={() => handleSelect("Fractional CMO Retainer")}
              className="w-full h-11 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
