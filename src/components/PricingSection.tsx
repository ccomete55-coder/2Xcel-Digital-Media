import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export interface PricingSectionProps {
  setServiceInterested: (val: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ setServiceInterested }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <div id="pricing" className="w-full relative z-10 scroll-mt-28">
      <div className="flex flex-col gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col gap-3"
        >
          <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] font-bold">
            // Strategic Growth Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Transparent Operational Pricing
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
            Quality structures deserve clean pricing anchors. Filter out static approaches and select the target workspace model engineered for your brand expansion.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-6"
        >
          
          {/* Tier 1: Base Blueprints */}
          <motion.div 
            variants={cardVariants}
            className="glass rounded-[2rem] p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/10 transition-all duration-500 group"
          >
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-1.5 min-h-[85px] justify-end">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest font-bold">Tier 01 // Baseline self-start</span>
                <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">Base Workspace Blueprints</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6 min-h-[72px] justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white tracking-wide sm:text-5xl">COMPLIMENTARY</span>
                </div>
                <span className="text-[11px] text-gray-450 font-mono uppercase tracking-wider">Requires Email Opt-In Handshake</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-400 font-light pt-2">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Manual-input base templates for 11 core workspace agents</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Standard markdown instructions files for local customization</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Unbranded deployment links for cloud environments</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Access to periodic blueprint releases & guidelines</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setServiceInterested("Tier 1: Complimentary Workspace Blueprints");
                const element = document.getElementById("inquiries");
                if (element) {
                   element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="w-full text-center py-3 bg-white/5 hover:bg-brand-orange text-white hover:text-white transition-all duration-300 rounded-xl border border-white/10 hover:border-brand-orange text-xs font-mono font-bold uppercase tracking-widest cursor-pointer mt-8"
            >
              Get Complimentary Access
            </button>
          </motion.div>

          {/* Tier 2: Core Growth & Implementation */}
          <motion.div 
            variants={cardVariants}
            className="glass rounded-[2rem] p-8 border-2 border-brand-orange/40 bg-black/50 flex flex-col justify-between shadow-brand-orange/5 shadow-2xl relative hover:border-brand-orange transition-all duration-500 group"
          >
            <div className="absolute top-0 right-6 bg-brand-orange text-white text-[8px] uppercase tracking-widest font-mono font-bold px-4 py-1.5 rounded-b-xl shadow-lg border-l border-r border-b border-white/10">
              Recommended For Growth
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5 min-h-[85px] justify-end">
                <span className="text-[10px] font-mono uppercase text-brand-orange tracking-widest font-bold">Tier 02 // Core integration</span>
                <h3 className="text-2xl font-black text-white">Core Growth & Implementation</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6 min-h-[72px] justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-450 text-sm font-mono mr-1">Starting At</span>
                  <span className="text-5xl font-black text-white">$2,500</span>
                </div>
                <span className="text-[11px] text-brand-orange/80 font-mono uppercase tracking-wider font-semibold">Initial Strategic Deployment</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light pt-2">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Custom prompt configuration built for your unique business metrics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Full pre-loading of a secure corporate proprietary knowledge base</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Up to 3 high-impact short-form cinematic AI-generated video assets</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Full system diagnostics & unbranded dashboard deployment configuration</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setServiceInterested("Tier 2: Core Growth & Implementation");
                const element = document.getElementById("inquiries");
                if (element) {
                   element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="w-full text-center py-3 bg-brand-orange hover:bg-brand-orange/95 text-white transition-all duration-300 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-lg shadow-brand-orange/10 cursor-pointer mt-8"
            >
              Deploy Core Growth
            </button>
          </motion.div>

          {/* Tier 3: Full Enterprise Infrastructure */}
          <motion.div 
            variants={cardVariants}
            className="glass rounded-[2rem] p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/10 transition-all duration-500 group"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5 min-h-[85px] justify-end">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest font-bold">Tier 03 // Ultimate Infrastructure</span>
                <h3 className="text-2xl font-black text-white group-hover:text-[#2B8ED9] transition-colors">Full Enterprise Infrastructure</h3>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-6 min-h-[72px] justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">CUSTOM</span>
                </div>
                <span className="text-[11px] text-gray-450 font-mono uppercase tracking-wider">Typical Projects: $15k - $35k+</span>
              </div>
              <ul className="flex flex-col gap-3 text-xs text-gray-400 font-light pt-2">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Premium custom web design with automated backend marketing hooks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Complete multi-agent cloud-workspace orchestration (Intelligent Syncs)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Real-time logistics inventory audits & lead routing configurations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Full high-end cinematic AI video advertising campaigns</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setServiceInterested("Tier 3: Full Enterprise Infrastructure");
                const element = document.getElementById("inquiries");
                if (element) {
                   element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="w-full text-center py-3 bg-white/5 hover:bg-brand-orange text-white hover:text-white transition-all duration-300 rounded-xl border border-white/10 hover:border-brand-orange text-xs font-mono font-bold uppercase tracking-widest cursor-pointer mt-8"
            >
              Request Enterprise Consultation
            </button>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};
