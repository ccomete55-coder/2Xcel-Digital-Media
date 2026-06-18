import React from "react";
import { Check, ShieldCheck, Clock, FileText } from "lucide-react";
import { motion } from "motion/react";

export interface PricingSectionProps {
  setServiceInterested: (val: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ setServiceInterested }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } },
  };

  const goToInquiry = (service: string) => {
    setServiceInterested(service);
    const el = document.getElementById("inquiries");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div id="pricing" className="w-full relative z-10 scroll-mt-28">
      <div className="flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto flex flex-col gap-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Start free, scale when you're ready. No contracts, no hidden fees — every plan is built to pay for itself in booked clients.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-6"
        >

          {/* Tier 1 — Free Blueprints */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/15 transition-all duration-500 group"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-mono uppercase text-gray-400 tracking-widest font-bold">Tier 01 · Start free</span>
                <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">Free Blueprints</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6">
                <span className="text-4xl font-black text-white tracking-tight">Free</span>
                <span className="text-sm text-gray-400">Just drop your email — no card needed.</span>
              </div>
              <ul className="flex flex-col gap-3 text-gray-300">
                {[
                  "Ready-to-use templates for 11 AI workspace agents",
                  "Simple setup instructions you can customize",
                  "One-click import links for your cloud workspace",
                  "New blueprints added regularly",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => goToInquiry("Tier 1: Complimentary Workspace Blueprints")}
              className="w-full text-center py-3.5 bg-white/5 hover:bg-brand-orange text-white transition-all duration-300 rounded-xl border border-white/10 hover:border-brand-orange text-sm font-bold uppercase tracking-wider cursor-pointer mt-8"
            >
              Get the free blueprints
            </button>
          </motion.div>

          {/* Tier 2 — Core Growth (highlighted) */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-8 border-2 border-brand-orange/50 bg-black/50 flex flex-col justify-between shadow-brand-orange/10 shadow-2xl relative hover:border-brand-orange transition-all duration-500 lg:scale-105 lg:-my-2 z-10"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              Most popular
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-mono uppercase text-brand-orange tracking-widest font-bold">Tier 02 · Done for you</span>
                <h3 className="text-2xl font-black text-white">Core Growth Setup</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-400">from</span>
                  <span className="text-5xl font-black text-white">$2,500</span>
                </div>
                <span className="text-sm text-brand-orange/90 font-semibold">One-time setup</span>
              </div>
              <ul className="flex flex-col gap-3 text-gray-200">
                {[
                  "AI sales agent configured around your business",
                  "Your knowledge loaded in so it answers like you",
                  "Up to 3 short cinematic AI video ads",
                  "Full setup, testing, and a dashboard to track it",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => goToInquiry("Tier 2: Core Growth & Implementation")}
              className="w-full text-center py-3.5 bg-brand-orange hover:bg-brand-orange/90 text-white transition-all duration-300 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/20 cursor-pointer mt-8"
            >
              Start with Core Growth
            </button>
          </motion.div>

          {/* Tier 3 — Full Build */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/15 transition-all duration-500 group"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-mono uppercase text-gray-400 tracking-widest font-bold">Tier 03 · Full build</span>
                <h3 className="text-2xl font-black text-white group-hover:text-[#2B8ED9] transition-colors">Full Build</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6">
                <span className="text-4xl font-black text-white tracking-tight">Custom</span>
                <span className="text-sm text-gray-400">Most projects run $15k–$35k+</span>
              </div>
              <ul className="flex flex-col gap-3 text-gray-300">
                {[
                  "Custom website with built-in marketing automation",
                  "Complete multi-agent workspace, fully connected",
                  "Automated lead routing and real-time inventory syncs",
                  "Full cinematic AI ad campaign",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => goToInquiry("Tier 3: Full Enterprise Infrastructure")}
              className="w-full text-center py-3.5 bg-white/5 hover:bg-brand-orange text-white transition-all duration-300 rounded-xl border border-white/10 hover:border-brand-orange text-sm font-bold uppercase tracking-wider cursor-pointer mt-8"
            >
              Book a consultation
            </button>
          </motion.div>

        </motion.div>

        {/* Trust / risk-reversal bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-300 bg-black/30 border border-white/5 rounded-2xl px-6 py-5 max-w-3xl mx-auto"
        >
          <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-orange" /> No contracts, cancel anytime</span>
          <span className="hidden sm:block w-px h-5 bg-white/10" />
          <span className="flex items-center gap-2"><Clock size={18} className="text-brand-orange" /> Most setups live in 2–4 weeks</span>
          <span className="hidden sm:block w-px h-5 bg-white/10" />
          <span className="flex items-center gap-2"><FileText size={18} className="text-brand-orange" /> Free 30-min call, no obligation</span>
        </motion.div>

      </div>
    </div>
  );
};
