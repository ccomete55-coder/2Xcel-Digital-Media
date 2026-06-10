import React, { useState } from "react";
import { TrendingUp, Brain, Zap, User, Send, Clock, Settings, Globe, Sparkles, Check, Bot, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedIconWrapper, IconAnimationType } from "./ui/AnimatedIcon";

export interface BlueprintsSectionProps {
  setServiceInterested: (val: string) => void;
}

export const BlueprintsSection: React.FC<BlueprintsSectionProps> = ({ setServiceInterested }) => {
  const [activeBlueprintTab, setActiveBlueprintTab] = useState("All");

  const blueprintsData: {
    id: number;
    name: string;
    category: string;
    icon: React.ReactNode;
    animation: IconAnimationType;
    flagship: boolean;
    description: string;
  }[] = [
    {
      id: 1,
      name: "Autonomous Strategic Planning Assistant Agent",
      category: "Executive Growth",
      icon: <TrendingUp className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: true,
      description: "Flagship model designed for advanced market trend analysis and executive reporting. Automatically aggregates data blocks logic."
    },
    {
      id: 2,
      name: "Scope of Work (SOW) & Proposal Generator",
      category: "Executive Growth",
      icon: <Brain className="text-brand-blue" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Instantly translate client constraints and bullet points into fully formatted, professional business SOW documents."
    },
    {
      id: 3,
      name: "Instant Lead Triage Agent",
      category: "Sales & Lead Gen",
      icon: <Zap className="text-brand-orange" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Monitors primary lead capture channels and routes high-intent corporate inquiries straight to scheduler within 30 seconds."
    },
    {
      id: 4,
      name: "Customer Onboarding Orchestrator",
      category: "Sales & Lead Gen",
      icon: <User className="text-[#2B8ED9]" size={20} />,
      animation: "pop",
      flagship: false,
      description: "Coordinates workspace handshakes, client intake requirements, and system directory files when agreement is processed."
    },
    {
      id: 5,
      name: "Cold Outreach Personalization Agent",
      category: "Sales & Lead Gen",
      icon: <Send className="text-white" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Scrapes professional intent indicators and formats highly tailored, 100% copyright-safe custom business introduction briefs."
    },
    {
      id: 6,
      name: "Meeting-to-Action Item Processor",
      category: "Operations",
      icon: <Clock className="text-brand-orange" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Extracts action requirements from raw session layouts and maps them directly into workflow owner grids automatically."
    },
    {
      id: 7,
      name: "Standard Operating Procedure (SOP) Architect",
      category: "Operations",
      icon: <Settings className="text-[#334c82]" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Converts chaotic functional steps into clean, error-bounded corporate instruction sets to maintain absolute operational consistency."
    },
    {
      id: 8,
      name: "Social Media Monitoring for Content Ideas",
      category: "Marketing & Media",
      icon: <MessageSquare className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Elevate your content creation game effortlessly with our powerful Social Media Monitoring Automation, expertly designed to generate fresh, trend-driven ideas in real-time!"
    },
    {
      id: 9,
      name: "Content Curation for Weekly Digests",
      category: "Marketing & Media",
      icon: <Sparkles className="text-brand-blue" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Transform your weekly digests with our powerful content curation automation, ensuring you always deliver timely, relevant, and high-quality insights with zero hassle!"
    },
    {
      id: 10,
      name: "Automated Competitor Analysis",
      category: "Marketing & Media",
      icon: <TrendingUp className="text-white" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Unleash unparalleled market intelligence with our Automated Competitor Analysis—the cutting-edge solution that transforms raw data into actionable insights, elevating your business strategy to new heights effortlessly"
    },
    {
      id: 11,
      name: "Automated Ad Performance Reports",
      category: "Marketing & Media",
      icon: <Zap className="text-brand-orange" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Unlock unparalleled marketing insights with our Automated Ad Performance Reports, delivering data-driven decisions at lightning speed, saving you time and maximizing ROI."
    },
    {
      id: 12,
      name: "Real-Time Inventory & Stock Audit Agent",
      category: "Logistics",
      icon: <Bot className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Executes continuous stock level auditing and automates supply queue matching the absolute split-second a sale completes."
    }
  ];

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <div id="blueprints" className="w-full relative z-10 scroll-mt-28">
      <div className="flex flex-col gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col gap-3"
        >
          <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] font-bold">
            // Scale-ready operational templates
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Prebuilt AI Workplace Agents & Operational Blueprints
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
            Deploy a curated library of 12 pre-configured business agents designed for seamless cloud-workspace import via an unbranded system deployment link. Remove manual friction at scale.
          </p>
        </motion.div>

        {/* Custom Interactive Blueprint Tab Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2.5 p-1.5 bg-black/20 rounded-full border border-white/5 max-w-4xl mx-auto"
        >
          {[
            "All", "Executive Growth", "Sales & Lead Gen", "Operations", "Marketing & Media", "Logistics"
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveBlueprintTab(cat)}
              className={`px-4.5 py-2 text-[10.5px] font-mono uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                activeBlueprintTab === cat
                  ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/10 font-bold"
                  : "bg-transparent text-gray-450 border-transparent hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blueprint Cards Grid */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {blueprintsData
              .filter(agent => activeBlueprintTab === "All" || agent.category === activeBlueprintTab)
              .map((agent) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover="hover"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={agent.id}
                  className="glass rounded-xl p-6 border border-white/5 bg-black/30 hover:border-brand-orange/40 transition-all duration-500 flex flex-col justify-between group h-full hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                >
                  {agent.flagship && (
                    <div className="absolute top-0 right-0 bg-brand-orange text-white text-[8px] uppercase tracking-widest font-mono font-bold px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 shadow-lg">
                      Flagship Template
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 group-hover:border-brand-orange/20 transition-colors">
                        <AnimatedIconWrapper animation={agent.animation} trigger="hover">
                          {agent.icon}
                        </AnimatedIconWrapper>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500">
                        {agent.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mb-2 leading-snug tracking-tight antialiased group-hover:text-brand-orange transition-colors">
                      {agent.name}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal mb-6">
                      {agent.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setServiceInterested(`Complimentary Import: ${agent.name}`);
                      const element = document.getElementById("inquiries");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="w-full text-center py-3 px-4 bg-gradient-to-r from-brand-orange to-orange-500 text-white hover:opacity-90 transition-all duration-300 rounded-xl shadow-md shadow-brand-orange/25 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Deploy Free Base Model &rarr;
                  </button>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};
