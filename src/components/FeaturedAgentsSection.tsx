import React from "react";
import { Brain, Check, X } from "lucide-react";
import { motion } from "motion/react";

const comparisonRows: {
  label: string;
  chatbot: string;
  agent: string;
  agentPositive: boolean;
}[] = [
  {
    label: "Core action",
    chatbot: "Answers questions",
    agent: "Reasons, decides, acts",
    agentPositive: true,
  },
  {
    label: "Memory",
    chatbot: "Forgets between sessions",
    agent: "Persistent, per-user, across sessions",
    agentPositive: true,
  },
  {
    label: "Tools",
    chatbot: "None (text only)",
    agent: "34 built-in + 100+ integrations + MCP",
    agentPositive: true,
  },
  {
    label: "Knowledge",
    chatbot: "Generic training data",
    agent: "Your projects, files, URLs, videos",
    agentPositive: true,
  },
  {
    label: "Can trigger work",
    chatbot: "No",
    agent: "Yes — runs automations and project actions",
    agentPositive: true,
  },
  {
    label: "Shareable",
    chatbot: "Rarely",
    agent: "One public link, embeddable anywhere",
    agentPositive: true,
  },
];

export const FeaturedAgentsSection: React.FC = () => {
  return (
    <div id="featured-agents" className="w-full relative z-10 scroll-mt-28">
      <div className="flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto flex flex-col gap-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
            Meet 2XceL's Most Powerful AI Agents
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light text-balance max-w-2xl mx-auto">
            Intelligent assistants that think, learn, remember context, and take autonomous action alongside your team. These featured agents represent the best of what's possible with AI augmentation — they don't just respond to commands, they understand your work, anticipate needs, and proactively help you accomplish goals. Deploy one to experience how an AI teammate can transform productivity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center flex flex-col gap-2"
        >
          <p className="text-white text-base sm:text-lg font-semibold leading-relaxed text-balance">
            The difference from a chatbot is the verb. A chatbot answers. An agent reasons, decides, and acts.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light text-balance max-w-2xl mx-auto">
            2XceL agents turn raw AI capability into something that does work — research, support, lead qualification, content drafting — instead of just replying. They run on 15+ frontier models from OpenAI, Anthropic, Google, and open-weight providers, with Auto mode picking the best one for each request.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto w-full glass rounded-3xl border border-white/10 bg-black/30 overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] border-b border-white/10">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 flex items-center justify-center gap-2 border-l border-white/5">
              <span className="text-gray-400 font-bold text-base uppercase tracking-wider">Chatbot</span>
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-center gap-2 border-l border-brand-orange/20 bg-brand-orange/[0.06]">
              <Brain size={16} className="text-brand-orange shrink-0" />
              <span className="text-brand-orange font-bold text-base uppercase tracking-wider">2XceL Agent</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] ${
                i !== comparisonRows.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="p-4 sm:p-5 flex items-center">
                <span className="text-white font-bold text-base">{row.label}</span>
              </div>
              <div className="p-4 sm:p-5 flex items-start sm:items-center justify-center border-l border-white/5">
                <span className="text-gray-500 text-base text-center leading-snug">{row.chatbot}</span>
              </div>
              <div className="p-4 sm:p-5 flex items-start sm:items-center justify-center gap-1.5 border-l border-brand-orange/10 bg-brand-orange/[0.03]">
                <Check size={16} className="text-brand-orange shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-gray-200 text-base text-center leading-snug font-medium">{row.agent}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto text-center text-balance"
        >
          This is the same shift the rest of the industry is racing toward in 2026: agents that complete jobs, not just chat. 2XceL's advantage is that the agent lives inside your workspace, so its memory, tools, and execution are already connected on day one.
        </motion.p>

      </div>
    </div>
  );
};
