import React from "react";
import { ShieldCheck, Clock, FileText } from "lucide-react";
import { motion } from "motion/react";
import { PricingCalculator } from "./PricingCalculator";

export interface PricingSectionProps {
  setServiceInterested: (val: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ setServiceInterested }) => {
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
            Build Your Own Plan
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Pick the services and AI agents you need. No contracts, no hidden fees — see your price update live as you build.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full"
        >
          <PricingCalculator setServiceInterested={setServiceInterested} />
        </motion.div>

        {/* Trust / risk-reversal bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4 items-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-300 bg-black/30 border border-white/5 rounded-2xl px-6 py-5 max-w-3xl mx-auto">
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-orange" /> No contracts, cancel anytime</span>
            <span className="hidden sm:block w-px h-5 bg-white/10" />
            <span className="flex items-center gap-2"><Clock size={18} className="text-brand-orange" /> Most setups live in 2–4 weeks</span>
            <span className="hidden sm:block w-px h-5 bg-white/10" />
            <span className="flex items-center gap-2"><FileText size={18} className="text-brand-orange" /> Free 30-min call, no obligation</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
