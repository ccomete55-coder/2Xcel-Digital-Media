import React, { useState } from "react";
import {
  Headphones, RefreshCcw, UserPlus, TrendingUp, Send, Calendar,
  FileText, Megaphone, Search, Receipt, ShieldCheck, PiggyBank,
  Users, SmilePlus, GraduationCap, Package, Workflow, CheckCircle,
  Code, Bug, Activity, Building2, Scale, HeartPulse, Plane,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedIconWrapper, IconAnimationType } from "./ui/AnimatedIcon";
import { Eyebrow } from "./ui/Eyebrow";

export interface BlueprintsSectionProps {
  setServiceInterested: (val: string) => void;
}

export const BlueprintsSection: React.FC<BlueprintsSectionProps> = ({ setServiceInterested }) => {
  const [activeBlueprintTab, setActiveBlueprintTab] = useState("Customer Support");

  const blueprintsData: {
    id: number;
    name: string;
    category: string;
    icon: React.ReactNode;
    animation: IconAnimationType;
    flagship: boolean;
    description: string;
    bannerImage?: string;
    bannerVideo?: string;
  }[] = [
    // Customer Support Agents
    {
      id: 1,
      name: "Echo Customer Support Agent",
      category: "Customer Support",
      icon: <Headphones className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: true,
      description: "Flagship voice agent that resolves customer inquiries and escalations in real time, 24/7.",
      bannerImage: "/agents/echo-customer-support-agent.png"
    },
    {
      id: 2,
      name: "AI Refund Processing Agent",
      category: "Customer Support",
      icon: <RefreshCcw className="text-brand-blue" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Manages refund requests and updates customer accounts automatically."
    },
    {
      id: 3,
      name: "AI Onboarding Assistant",
      category: "Customer Support",
      icon: <UserPlus className="text-[#2B8ED9]" size={20} />,
      animation: "pop",
      flagship: false,
      description: "Guides new customers through the onboarding process with personalized support."
    },
    // Sales Agents
    {
      id: 4,
      name: "AI Sales Qualification Agent",
      category: "Sales",
      icon: <TrendingUp className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: true,
      description: "Flagship model that qualifies leads by analyzing customer data and engagement."
    },
    {
      id: 5,
      name: "AI Follow-Up Agent",
      category: "Sales",
      icon: <Send className="text-white" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Sends follow-up emails and reminders to potential customers."
    },
    {
      id: 6,
      name: "AI Meeting Scheduler",
      category: "Sales",
      icon: <Calendar className="text-brand-blue" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Automatically schedules meetings based on availability and preferences."
    },
    // Marketing Agents
    {
      id: 7,
      name: "AI Content Creation Agent",
      category: "Marketing",
      icon: <FileText className="text-brand-orange" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Generates blog posts, social media content, and marketing emails."
    },
    {
      id: 8,
      name: "AI Ad Optimization Agent",
      category: "Marketing",
      icon: <Megaphone className="text-brand-blue" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Analyzes ad performance and adjusts campaigns for better ROI."
    },
    {
      id: 9,
      name: "AI Market Research Agent",
      category: "Marketing",
      icon: <Search className="text-white" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Conducts competitive analysis and gathers market insights."
    },
    // Finance Agents
    {
      id: 10,
      name: "AI Expense Management Agent",
      category: "Finance",
      icon: <Receipt className="text-brand-orange" size={20} />,
      animation: "pop",
      flagship: false,
      description: "Automates expense report generation and approval processes."
    },
    {
      id: 11,
      name: "AI Compliance Monitoring Agent",
      category: "Finance",
      icon: <ShieldCheck className="text-[#334c82]" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Ensures financial transactions comply with regulations."
    },
    {
      id: 12,
      name: "AI Budgeting Assistant",
      category: "Finance",
      icon: <PiggyBank className="text-brand-blue" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Helps businesses create and manage budgets based on historical data."
    },
    // Human Resources Agents
    {
      id: 13,
      name: "AI Recruitment Agent",
      category: "HR",
      icon: <Users className="text-brand-orange" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Screens resumes and matches candidates to job descriptions."
    },
    {
      id: 14,
      name: "AI Employee Engagement Agent",
      category: "HR",
      icon: <SmilePlus className="text-brand-blue" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Surveys employees and analyzes feedback to improve workplace culture."
    },
    {
      id: 15,
      name: "AI Training Coordinator",
      category: "HR",
      icon: <GraduationCap className="text-white" size={20} />,
      animation: "pop",
      flagship: false,
      description: "Manages employee training schedules and tracks progress."
    },
    // Operations Agents
    {
      id: 16,
      name: "AI Inventory Management Agent",
      category: "Operations",
      icon: <Package className="text-brand-orange" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Monitors stock levels and automates reordering processes."
    },
    {
      id: 17,
      name: "AI Workflow Automation Agent",
      category: "Operations",
      icon: <Workflow className="text-brand-blue" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Streamlines internal processes by automating repetitive tasks."
    },
    {
      id: 18,
      name: "AI Quality Control Agent",
      category: "Operations",
      icon: <CheckCircle className="text-[#334c82]" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Inspects products and services for compliance with quality standards."
    },
    // IT and Development Agents
    {
      id: 19,
      name: "AI Code Review Agent",
      category: "IT & Dev",
      icon: <Code className="text-brand-orange" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Analyzes code for errors and suggests improvements."
    },
    {
      id: 20,
      name: "AI Bug Tracking Agent",
      category: "IT & Dev",
      icon: <Bug className="text-brand-blue" size={20} />,
      animation: "bounce",
      flagship: false,
      description: "Identifies and logs software bugs for development teams."
    },
    {
      id: 21,
      name: "AI System Monitoring Agent",
      category: "IT & Dev",
      icon: <Activity className="text-white" size={20} />,
      animation: "pulse",
      flagship: false,
      description: "Monitors IT systems for performance issues and alerts IT staff."
    },
    // Specialized Agents
    {
      id: 22,
      name: "AI Real Estate Analysis Agent",
      category: "Specialized",
      icon: <Building2 className="text-brand-orange" size={20} />,
      animation: "pop",
      flagship: false,
      description: "Analyzes property values and market trends for real estate investors."
    },
    {
      id: 23,
      name: "AI Legal Document Review Agent",
      category: "Specialized",
      icon: <Scale className="text-[#334c82]" size={20} />,
      animation: "spin",
      flagship: false,
      description: "Reviews contracts and legal documents for compliance and risks."
    },
    {
      id: 24,
      name: "AI Healthcare Assistant",
      category: "Specialized",
      icon: <HeartPulse className="text-brand-blue" size={20} />,
      animation: "glow",
      flagship: false,
      description: "Manages patient appointments and provides health information."
    },
    {
      id: 25,
      name: "AI Travel Planning Agent",
      category: "Specialized",
      icon: <Plane className="text-white" size={20} />,
      animation: "wiggle",
      flagship: false,
      description: "Organizes travel itineraries and bookings based on user preferences."
    },
  ];

  const categoryOrder = ["Customer Support", "Sales", "Marketing", "Finance", "HR", "Operations", "IT & Dev", "Specialized"];

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Prebuilt AI Workplace Agents & Operational Blueprints
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Try any of our {blueprintsData.length} ready-to-use agents free — just drop your name, email, and phone to get the base template. Want it trained on your business? That's where our custom builds come in.
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
          {categoryOrder.map((cat) => (
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

        {/* Deploy Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <button
            onClick={() => {
              const element = document.getElementById("inquiries");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-brand-orange to-orange-500 text-white hover:opacity-90 transition-all duration-300 rounded-xl shadow-md shadow-brand-orange/25 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Deploy Free Base Model &rarr;
          </button>
        </motion.div>

        {/* Blueprint Cards Grid — grouped by category, header shown once per group */}
        <div className="flex flex-col gap-10 relative z-10">
          <AnimatePresence mode="popLayout">
            {categoryOrder
              .filter(cat => activeBlueprintTab === cat)
              .map((cat) => {
                const agentsInCategory = blueprintsData.filter(agent => agent.category === cat);
                if (agentsInCategory.length === 0) return null;
                return (
                  <motion.div
                    key={cat}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-widest font-mono font-bold text-brand-orange">
                        {cat}
                      </span>
                      <span className="h-px flex-1 bg-white/5" />
                    </div>

                    <motion.div
                      variants={cardContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {agentsInCategory.map((agent) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover="hover"
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          key={agent.id}
                          className="glass rounded-xl p-4 border border-white/5 bg-black/30 hover:border-brand-orange/40 transition-all duration-500 flex flex-col justify-between group h-full hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                        >
                          {agent.flagship && (
                            <div className="absolute top-0 right-0 bg-brand-orange text-white text-[8px] uppercase tracking-widest font-mono font-bold px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 shadow-lg z-10">
                              Flagship Template
                            </div>
                          )}
                          {(agent.bannerVideo || agent.bannerImage) && (
                            <div className="-m-4 mb-4 rounded-t-xl overflow-hidden aspect-[21/9]">
                              {agent.bannerVideo ? (
                                <video
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  poster={agent.bannerImage}
                                  src={agent.bannerVideo}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={agent.bannerImage}
                                  alt={agent.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          )}
                          <div>
                            <div className="w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 group-hover:border-brand-orange/20 transition-colors mb-4">
                              <AnimatedIconWrapper animation={agent.animation} trigger="hover">
                                {agent.icon}
                              </AnimatedIconWrapper>
                            </div>
                            <h4 className="text-2xl font-black text-white mb-2 leading-snug tracking-tight antialiased group-hover:text-brand-orange transition-colors">
                              {agent.name}
                            </h4>
                            <p className="text-base text-gray-400 leading-relaxed font-normal mb-6">
                              {agent.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
