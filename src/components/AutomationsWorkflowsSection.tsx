import React from "react";
import { Check, Workflow } from "lucide-react";
import { useServiceSelect } from "../hooks/useServiceSelect";

interface DeliverableGroup {
  title: string;
  points: string[];
}

const deliverables: DeliverableGroup[] = [
  {
    title: "1. Full-Stack Workflow Architecture (n8n & Custom Logic)",
    points: [
      "Deep-dive audit of current manual processes, data handoffs, and software tools.",
      "Custom-built automated pipelines utilizing n8n and advanced custom logic to connect your tech stack seamlessly.",
      "End-to-end integration across your CRM, marketing backend, billing systems, and internal communication channels.",
    ],
  },
  {
    title: "2. Unified Pipeline Consolidation",
    points: [
      "Elimination of fragmented third-party bots and disconnected software silos into a single source of truth.",
      "Standardized data routing ensuring information flows cleanly between apps without duplication or data loss.",
    ],
  },
  {
    title: "3. Real-Time Trigger-and-Response Event Tracking",
    points: [
      "Instantaneous, event-driven workflows that execute tasks the moment a user takes action (e.g., lead capture, form submission, status update).",
      "Real-time monitoring and alert systems to catch errors, failed API calls, or dropped tasks before they impact operations.",
    ],
  },
  {
    title: "4. Complete Team Hand-Off & Execution Documentation",
    points: [
      "Comprehensive Standard Operating Procedures (SOPs) and visual architecture diagrams detailing how the workflows operate.",
      "Full administrative handover, ensuring your team has total clarity and control over the new infrastructure.",
    ],
  },
];

interface AutomationsWorkflowsSectionProps {
  setServiceInterested: (val: string) => void;
}

export const AutomationsWorkflowsSection: React.FC<AutomationsWorkflowsSectionProps> = ({ setServiceInterested }) => {
  const selectService = useServiceSelect(setServiceInterested);
  const handleSelect = () => {
    selectService("Automations & Workflows (Implementation)");
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Automations &amp; Workflows
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          Businesses looking to eliminate manual bottlenecks, sync disparate software apps, and scale internal operations without adding administrative headcount.
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full card-surface rounded-2xl border border-white/10 p-7 sm:p-10 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
            <Workflow size={20} className="text-brand-orange" />
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

        <div className="flex flex-col items-center gap-6 rounded-xl border border-brand-orange/30 bg-brand-orange/[0.06] p-6">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-mono font-bold">
              Implementation
            </span>
            <span className="text-3xl font-black text-white tracking-tight">$4,500</span>
          </div>
          <button
            type="button"
            onClick={handleSelect}
            className="w-full sm:w-auto px-9 py-4 rounded-xl text-base font-bold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange/90 hover:scale-105 text-white shadow-lg shadow-brand-orange/20 transition-all duration-300 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
