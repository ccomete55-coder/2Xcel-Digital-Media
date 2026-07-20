import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check, Sparkles, ChevronDown,
  Headphones, TrendingUp, FileText, Receipt, Users, Package, Code, Building2,
  RefreshCcw, UserPlus, Send, Calendar, Megaphone, Search, ShieldCheck, PiggyBank,
  SmilePlus, GraduationCap, Workflow, CheckCircle, Bug, Activity, Scale, HeartPulse, Plane,
} from "lucide-react";
import { CogIcon } from "./ui/CogIcon";
import { WaypointsIcon } from "./ui/WaypointsIcon";
import { ActivityIcon } from "./ui/ActivityIcon";

interface HoverVideoRowProps {
  videoSrc?: string;
  posterSrc: string;
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const HoverVideoRow: React.FC<HoverVideoRowProps> = ({ videoSrc, posterSrc, selected, onClick, children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative w-full h-[150px] rounded-2xl overflow-hidden border transition-all duration-300 text-left cursor-pointer group ${
        selected
          ? "border-brand-orange ring-2 ring-brand-orange ring-offset-2 ring-offset-black"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          poster={posterSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={posterSrc}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />
      {selected && (
        <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center shadow-lg">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}
      <div className="relative z-10 h-full flex items-center gap-4 px-5 sm:px-6">
        {children}
      </div>
    </button>
  );
};

export interface PricingCalculatorProps {
  setServiceInterested: (val: string) => void;
}

interface CoreService {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  icon: React.ReactNode;
  accent: string;
  included: string[];
}

interface AgentItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  icon: React.ReactNode;
  videoSrc?: string;
  posterSrc?: string;
}

interface AgentCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  image: string;
  videoSrc?: string;
  agents: AgentItem[];
}

const coreServices: CoreService[] = [
  {
    id: "web-design",
    title: "Custom Web Design",
    subtitle: "A site built to sell, not just look nice",
    price: 3500,
    priceLabel: "from $3,500",
    icon: <CogIcon className="text-brand-orange" size={22} />,
    accent: "#E55B2B",
    included: [
      "Rank high on Google search",
      "Capture leads automatically",
      "Lightning-fast load speeds",
      "Track every sale & visitor",
    ],
  },
  {
    id: "ai-video",
    title: "AI Video & Creative Content",
    subtitle: "Cinematic ads without the shoot",
    price: 1500,
    priceLabel: "from $1,500",
    icon: <WaypointsIcon className="text-white" size={22} />,
    accent: "#DEDBC8",
    included: [
      "AI-generated product videos",
      "Professional photos & ads",
      "Custom branded content",
      "Social media ready assets",
    ],
  },
  {
    id: "marketing",
    title: "Done-For-You Marketing",
    subtitle: "Strategy, ads, and audience targeting",
    price: 2000,
    priceLabel: "from $2,000/mo",
    icon: <ActivityIcon className="text-[#32D74B]" size={22} />,
    accent: "#32D74B",
    included: [
      "Custom marketing strategy",
      "Ad campaigns that convert",
      "Audience research & targeting",
      "Monthly performance reports",
    ],
  },
];

const AGENT_PRICE = 350;

const agentCategories: AgentCategory[] = [
  {
    id: "customer-support",
    label: "Customer Support",
    icon: <Headphones size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    agents: [
      { id: "cs-support", title: "Echo Customer Support Agent", desc: "Automates responses to FAQs and handles customer inquiries 24/7.", price: AGENT_PRICE, icon: <Headphones size={18} className="text-brand-blue" />, posterSrc: "/agents/echo-customer-support-agent.png" },
      { id: "cs-refund", title: "AI Refund Processing Agent", desc: "Manages refund requests and updates customer accounts automatically.", price: AGENT_PRICE, icon: <RefreshCcw size={18} className="text-brand-blue" /> },
      { id: "cs-onboarding", title: "AI Onboarding Assistant", desc: "Guides new customers through onboarding with personalized support.", price: AGENT_PRICE, icon: <UserPlus size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: <TrendingUp size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    agents: [
      { id: "sales-qualification", title: "AI Sales Qualification Agent", desc: "Qualifies leads by analyzing customer data and engagement.", price: AGENT_PRICE, icon: <TrendingUp size={18} className="text-brand-blue" /> },
      { id: "sales-followup", title: "AI Follow-Up Agent", desc: "Sends follow-up emails and reminders to potential customers.", price: AGENT_PRICE, icon: <Send size={18} className="text-brand-blue" /> },
      { id: "sales-scheduler", title: "AI Meeting Scheduler", desc: "Automatically schedules meetings based on availability and preferences.", price: AGENT_PRICE, icon: <Calendar size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "marketing-agents",
    label: "Marketing",
    icon: <FileText size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    agents: [
      { id: "mkt-content", title: "AI Content Creation Agent", desc: "Generates blog posts, social media content, and marketing emails.", price: AGENT_PRICE, icon: <FileText size={18} className="text-brand-blue" /> },
      { id: "mkt-ad", title: "AI Ad Optimization Agent", desc: "Analyzes ad performance and adjusts campaigns for better ROI.", price: AGENT_PRICE, icon: <Megaphone size={18} className="text-brand-blue" /> },
      { id: "mkt-research", title: "AI Market Research Agent", desc: "Conducts competitive analysis and gathers market insights.", price: AGENT_PRICE, icon: <Search size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: <Receipt size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop",
    agents: [
      { id: "fin-expense", title: "AI Expense Management Agent", desc: "Automates expense report generation and approval processes.", price: AGENT_PRICE, icon: <Receipt size={18} className="text-brand-blue" /> },
      { id: "fin-compliance", title: "AI Compliance Monitoring Agent", desc: "Ensures financial transactions comply with regulations.", price: AGENT_PRICE, icon: <ShieldCheck size={18} className="text-brand-blue" /> },
      { id: "fin-budget", title: "AI Budgeting Assistant", desc: "Helps businesses create and manage budgets based on historical data.", price: AGENT_PRICE, icon: <PiggyBank size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: <Users size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=800&auto=format&fit=crop",
    agents: [
      { id: "hr-recruitment", title: "AI Recruitment Agent", desc: "Screens resumes and matches candidates to job descriptions.", price: AGENT_PRICE, icon: <Users size={18} className="text-brand-blue" /> },
      { id: "hr-engagement", title: "AI Employee Engagement Agent", desc: "Surveys employees and analyzes feedback to improve workplace culture.", price: AGENT_PRICE, icon: <SmilePlus size={18} className="text-brand-blue" /> },
      { id: "hr-training", title: "AI Training Coordinator", desc: "Manages employee training schedules and tracks progress.", price: AGENT_PRICE, icon: <GraduationCap size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: <Package size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    agents: [
      { id: "ops-inventory", title: "AI Inventory Management Agent", desc: "Monitors stock levels and automates reordering processes.", price: AGENT_PRICE, icon: <Package size={18} className="text-brand-blue" /> },
      { id: "ops-workflow", title: "AI Workflow Automation Agent", desc: "Streamlines internal processes by automating repetitive tasks.", price: AGENT_PRICE, icon: <Workflow size={18} className="text-brand-blue" /> },
      { id: "ops-quality", title: "AI Quality Control Agent", desc: "Inspects products and services for compliance with quality standards.", price: AGENT_PRICE, icon: <CheckCircle size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "it-dev",
    label: "IT & Dev",
    icon: <Code size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    agents: [
      { id: "it-codereview", title: "AI Code Review Agent", desc: "Analyzes code for errors and suggests improvements.", price: AGENT_PRICE, icon: <Code size={18} className="text-brand-blue" /> },
      { id: "it-bugtracking", title: "AI Bug Tracking Agent", desc: "Identifies and logs software bugs for development teams.", price: AGENT_PRICE, icon: <Bug size={18} className="text-brand-blue" /> },
      { id: "it-monitoring", title: "AI System Monitoring Agent", desc: "Monitors IT systems for performance issues and alerts IT staff.", price: AGENT_PRICE, icon: <Activity size={18} className="text-brand-blue" /> },
    ],
  },
  {
    id: "specialized",
    label: "Specialized",
    icon: <Building2 size={24} className="text-white" />,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    agents: [
      { id: "spec-realestate", title: "AI Real Estate Analysis Agent", desc: "Analyzes property values and market trends for real estate investors.", price: AGENT_PRICE, icon: <Building2 size={18} className="text-brand-blue" /> },
      { id: "spec-legal", title: "AI Legal Document Review Agent", desc: "Reviews contracts and legal documents for compliance and risks.", price: AGENT_PRICE, icon: <Scale size={18} className="text-brand-blue" /> },
      { id: "spec-healthcare", title: "AI Healthcare Assistant", desc: "Manages patient appointments and provides health information.", price: AGENT_PRICE, icon: <HeartPulse size={18} className="text-brand-blue" /> },
      { id: "spec-travel", title: "AI Travel Planning Agent", desc: "Organizes travel itineraries and bookings based on user preferences.", price: AGENT_PRICE, icon: <Plane size={18} className="text-brand-blue" /> },
    ],
  },
];

const allAgents: AgentItem[] = agentCategories.flatMap((c) => c.agents);
const AGENT_SUM = allAgents.reduce((sum, a) => sum + a.price, 0);
const BUNDLE_PRICE = 4999;
const BUNDLE_SAVINGS = AGENT_SUM - BUNDLE_PRICE;

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ setServiceInterested }) => {
  const [selectedCore, setSelectedCore] = useState<Set<string>>(new Set());
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCore = (id: string) => {
    setSelectedCore((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategoryExpanded = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectFullPack = () => {
    setSelectedAgents(new Set(allAgents.map((a) => a.id)));
    setExpandedCategories(new Set(agentCategories.map((c) => c.id)));
  };

  const isFullPack = selectedAgents.size === allAgents.length;

  const { coreTotal, agentTotal, total, hasMonthly } = useMemo(() => {
    let cTotal = 0;
    let monthly = false;
    coreServices.forEach((s) => {
      if (selectedCore.has(s.id)) {
        cTotal += s.price;
        if (s.id === "marketing") monthly = true;
      }
    });

    const aTotal = isFullPack
      ? BUNDLE_PRICE
      : allAgents.reduce((sum, a) => (selectedAgents.has(a.id) ? sum + a.price : sum), 0);

    return { coreTotal: cTotal, agentTotal: aTotal, total: cTotal + aTotal, hasMonthly: monthly };
  }, [selectedCore, selectedAgents, isFullPack]);

  const summaryParts = useMemo(() => {
    const parts: string[] = [];
    coreServices.forEach((s) => {
      if (selectedCore.has(s.id)) parts.push(s.title);
    });
    if (isFullPack) {
      parts.push("Full 25-Agent Pack");
    } else {
      allAgents.forEach((a) => {
        if (selectedAgents.has(a.id)) parts.push(a.title);
      });
    }
    return parts;
  }, [selectedCore, selectedAgents, isFullPack]);

  const totalSelectedCount = selectedCore.size + selectedAgents.size;

  const summaryDisplay =
    summaryParts.length > 3
      ? `${summaryParts.slice(0, 3).join(", ")} +${summaryParts.length - 3} more`
      : summaryParts.join(", ");

  const handleGetQuote = () => {
    const label =
      summaryParts.length > 0
        ? `Custom Quote: ${summaryParts.join(" + ")}`
        : "Custom Quote Request";
    setServiceInterested(label);
    const el = document.getElementById("inquiries");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* STEP 1: Core Services */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-brand-orange text-sm font-black flex items-center justify-center shrink-0">
            1
          </span>
          <h3 className="text-white font-bold text-base sm:text-lg uppercase tracking-wider">Choose Your Core Services</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {coreServices.map((service) => {
            const isActive = selectedCore.has(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleCore(service.id)}
                className={`text-left glass rounded-2xl p-6 border transition-all duration-300 flex flex-col gap-5 relative cursor-pointer ${
                  isActive
                    ? "border-brand-orange/70 bg-white/[0.06] shadow-[0_0_30px_-6px_rgba(230,92,43,0.35)]"
                    : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: isActive ? `${service.accent}1A` : "rgba(0,0,0,0.5)",
                        borderColor: isActive ? `${service.accent}66` : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-2xl leading-tight">{service.title}</h4>
                      <span className="text-gray-400 text-base mt-1 block">{service.subtitle}</span>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? "bg-brand-orange border-brand-orange" : "border-white/20"
                    }`}
                  >
                    {isActive && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </div>

                <ul className="flex flex-col gap-2 border-t border-white/5 pt-4">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-gray-400 leading-snug">
                      <Check size={15} className="text-brand-orange/70 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <span className="text-brand-orange/90 font-mono text-sm font-bold tracking-wide mt-auto pt-1">
                  {service.priceLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: AI Agent Pack — 8 categories, 25 agents */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-blue text-sm font-black flex items-center justify-center shrink-0">
              2
            </span>
            <h3 className="text-white font-bold text-base sm:text-lg uppercase tracking-wider">Build Your AI Agent Pack</h3>
          </div>
          <button
            type="button"
            onClick={selectFullPack}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isFullPack
                ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                : "bg-white/5 text-gray-300 border border-white/10 hover:border-brand-blue/50 hover:text-white"
            }`}
          >
            <Sparkles size={16} />
            Select All 25 Agents — Save ${BUNDLE_SAVINGS.toLocaleString()}
          </button>
        </div>

        {/* Video-background category rows — each expands to reveal its own video agent rows */}
        <div className="flex flex-col gap-3">
          {agentCategories.map((cat) => {
            const isExpanded = expandedCategories.has(cat.id);
            const selectedInCat = cat.agents.filter((a) => selectedAgents.has(a.id)).length;
            return (
              <div key={cat.id} className="flex flex-col gap-3">
                <HoverVideoRow
                  videoSrc={cat.videoSrc}
                  posterSrc={cat.image}
                  selected={selectedInCat === cat.agents.length}
                  onClick={() => toggleCategoryExpanded(cat.id)}
                >
                  <div className="w-11 h-11 rounded-lg bg-black/50 border border-white/20 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-brand-blue font-bold text-lg sm:text-xl leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {cat.label}
                    </h4>
                    <p className="text-brand-blue/80 text-base mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {cat.agents.length} agents · ${AGENT_PRICE.toLocaleString()} each
                      {selectedInCat > 0 && <span className="font-semibold"> · {selectedInCat} selected</span>}
                    </p>
                  </div>
                  <ChevronDown
                    size={22}
                    className={`text-brand-blue shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </HoverVideoRow>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3 pl-4 sm:pl-6 border-l-2 border-brand-blue/20">
                        {cat.agents.map((agent) => {
                          const isActive = selectedAgents.has(agent.id);
                          return (
                            <HoverVideoRow
                              key={agent.id}
                              videoSrc={agent.videoSrc}
                              posterSrc={agent.posterSrc || cat.image}
                              selected={isActive}
                              onClick={() => toggleAgent(agent.id)}
                            >
                              <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/20 flex items-center justify-center shrink-0">
                                {agent.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-brand-blue font-bold text-base sm:text-lg leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                                  {agent.title}
                                </h5>
                                <p className="text-brand-blue/80 text-sm sm:text-base mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                                  {agent.desc}
                                </p>
                              </div>
                              <span className="text-brand-blue font-mono text-base font-bold shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                                ${agent.price.toLocaleString()}
                              </span>
                            </HoverVideoRow>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {isFullPack && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-sm text-brand-blue font-semibold bg-brand-blue/10 border border-brand-blue/30 rounded-xl px-5 py-3"
            >
              <Sparkles size={16} />
              Full pack applied — ${AGENT_SUM.toLocaleString()} bundled down to ${BUNDLE_PRICE.toLocaleString()}, you save ${BUNDLE_SAVINGS.toLocaleString()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUMMARY BAR */}
      <motion.div
        layout
        className="glass rounded-3xl border border-white/10 bg-black/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">
            Your estimate
          </span>
          <AnimatePresence mode="wait">
            {total === 0 ? (
              <motion.span
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-2xl sm:text-3xl font-black text-gray-500"
              >
                Pick what you need
              </motion.span>
            ) : (
              <motion.span
                key="total"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-5xl sm:text-6xl font-black text-white tracking-tight"
              >
                ${total.toLocaleString()}
                {hasMonthly && <span className="text-lg text-gray-400 font-semibold"> +/mo</span>}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="text-sm text-gray-500">
            {totalSelectedCount === 0
              ? "Select services and/or agents above"
              : `${summaryDisplay} — final price confirmed on your free call`}
          </span>
        </div>
        <button
          onClick={handleGetQuote}
          disabled={totalSelectedCount === 0}
          className={`shrink-0 px-9 py-4 rounded-xl text-base font-bold uppercase tracking-wider transition-all duration-300 ${
            totalSelectedCount === 0
              ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
              : "bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20 cursor-pointer"
          }`}
        >
          Get This Quote
        </button>
      </motion.div>
    </div>
  );
};
