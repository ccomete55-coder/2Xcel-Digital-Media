import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Zap,
  Database,
  Wrench,
  BookOpen,
  PlayCircle,
  Share2,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const purchaseFeed: { name: string; location: string; agent: string }[] = [
  { name: "Sarah K.", location: "Toronto, Canada", agent: "Sales Agent" },
  { name: "Marcus T.", location: "Austin, TX", agent: "Customer Support Agent" },
  { name: "Priya R.", location: "London, UK", agent: "Lead Qualification Agent" },
  { name: "Diego M.", location: "São Paulo, Brazil", agent: "Marketing Agent" },
  { name: "Liam O.", location: "Sydney, Australia", agent: "IT & Dev Agent" },
  { name: "Chris B.", location: "Vancouver, Canada", agent: "Operations Agent" },
  { name: "Emma W.", location: "Manchester, UK", agent: "Customer Support Agent" },
  { name: "Lucas F.", location: "Berlin, Germany", agent: "Sales Agent" },
  { name: "Isabella C.", location: "Mexico City, Mexico", agent: "Marketing Agent" },
  { name: "Noah P.", location: "Amsterdam, Netherlands", agent: "IT & Dev Agent" },
  { name: "Olivia G.", location: "Dublin, Ireland", agent: "Finance Agent" },
  { name: "Mateus A.", location: "Lisbon, Portugal", agent: "Operations Agent" },
  { name: "Grace N.", location: "Auckland, New Zealand", agent: "HR Agent" },
  { name: "Ethan D.", location: "Chicago, IL", agent: "Lead Qualification Agent" },
  { name: "Camila R.", location: "Buenos Aires, Argentina", agent: "Sales Agent" },
  { name: "Thabo M.", location: "Cape Town, South Africa", agent: "Customer Support Agent" },
  { name: "Sofia L.", location: "Madrid, Spain", agent: "Marketing Agent" },
  { name: "James H.", location: "Denver, CO", agent: "Finance Agent" },
  { name: "Amara O.", location: "Lagos, Nigeria", agent: "Operations Agent" },
  { name: "Charlotte B.", location: "Melbourne, Australia", agent: "IT & Dev Agent" },
];

const comparisonRows: {
  label: string;
  chatbot: string;
  agent: string;
  icon: React.ElementType;
}[] = [
  {
    label: "Core action",
    chatbot: "Answers questions",
    agent: "Reasons, decides, acts",
    icon: Zap,
  },
  {
    label: "Memory",
    chatbot: "Forgets between sessions",
    agent: "Persistent, per-user, across sessions",
    icon: Database,
  },
  {
    label: "Tools",
    chatbot: "None (text only)",
    agent: "34 built-in + 100+ integrations + MCP",
    icon: Wrench,
  },
  {
    label: "Knowledge",
    chatbot: "Generic training data",
    agent: "Your projects, files, URLs, videos",
    icon: BookOpen,
  },
  {
    label: "Can trigger work",
    chatbot: "No",
    agent: "Yes — runs automations and project actions",
    icon: PlayCircle,
  },
  {
    label: "Shareable",
    chatbot: "Rarely",
    agent: "One public link, embeddable anywhere",
    icon: Share2,
  },
];

const clashParticles = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 70 + (i % 3) * 45;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist * 0.6,
    size: 3 + (i % 3) * 2,
    blue: i % 2 === 0,
  };
});

type ClashPhase = "waiting" | "clash" | "impact" | "settled";

export const FeaturedAgentsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bursts, setBursts] = useState<{ id: number; row: number }[]>([]);
  const [actionCount, setActionCount] = useState(2481);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);
  const [phase, setPhase] = useState<ClashPhase>("waiting");
  const burstId = React.useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const clashTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const settled = phase === "settled";
  const clashing = phase === "clash" || phase === "impact";

  const runClash = useCallback(() => {
    clashTimeouts.current.forEach(clearTimeout);
    clashTimeouts.current = [];
    setPhase("clash");
    clashTimeouts.current.push(setTimeout(() => setPhase("impact"), 550));
    clashTimeouts.current.push(setTimeout(() => setPhase("settled"), 1300));
  }, []);

  // The pinned hero keeps this section geometrically "in view" while it is
  // still covered, so IntersectionObserver fires far too early. Instead we
  // watch scroll and only start the clash once the card is on screen AND not
  // occluded by the fixed hero (elementFromPoint must hit the card itself).
  useEffect(() => {
    if (phase !== "waiting") return;
    if (prefersReducedMotion) {
      setPhase("settled");
      return;
    }
    let fired = false;
    const check = () => {
      if (fired) return;
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const vw = window.innerWidth || 0;
      if (!(r.height > 0 && r.top < vh * 0.75 && r.bottom > vh * 0.25)) return;
      const cx = Math.min(Math.max(r.left + r.width / 2, 0), vw - 1);
      const cy = Math.min(Math.max(r.top + Math.min(r.height / 2, vh / 2), 0), vh - 1);
      const topEl = document.elementFromPoint(cx, cy);
      if (topEl && !el.contains(topEl)) return;
      fired = true;
      cleanup();
      runClash();
    };
    // Poll as well as listening to scroll: the page mixes native and
    // virtual scrolling, so scroll events alone are unreliable here.
    const interval = setInterval(check, 400);
    const onScroll = () => requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
    };
    check();
    return cleanup;
  }, [phase, prefersReducedMotion, runClash]);

  useEffect(() => {
    return () => clashTimeouts.current.forEach(clearTimeout);
  }, []);

  // Preload the VS display font so it's ready before the emblem mounts mid-animation.
  // Retries because the Google Fonts stylesheet may not be parsed when this first runs.
  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    let attempts = 0;
    const tryLoad = () => {
      if (cancelled || attempts++ > 20) return;
      document.fonts
        .load("70px 'Bruno Ace SC'")
        .then((faces) => {
          if (!cancelled && faces.length === 0) setTimeout(tryLoad, 500);
        })
        .catch(() => {
          if (!cancelled) setTimeout(tryLoad, 500);
        });
    };
    tryLoad();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setNotifVisible(true);
      hideTimeout = setTimeout(() => {
        setNotifVisible(false);
        const nextGap = 8000 + Math.random() * 6000;
        showTimeout = setTimeout(() => {
          setNotifIndex((i) => (i + 1) % purchaseFeed.length);
          cycle();
        }, nextGap);
      }, 5000);
    };

    const initialDelay = setTimeout(cycle, 4000);
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleAgentClick = (row: number) => {
    const id = burstId.current++;
    setBursts((b) => [...b, { id, row }]);
    setActionCount((c) => c + 1);
    setTimeout(() => {
      setBursts((b) => b.filter((burst) => burst.id !== id));
    }, 700);
  };

  return (
    <div id="featured-agents" className="w-full relative z-10 scroll-mt-28">
      {/* Invisible glyphs keep the VS font requested from first paint */}
      <span
        aria-hidden
        className="absolute opacity-0 pointer-events-none select-none"
        style={{ fontFamily: "'Bruno Ace SC', sans-serif" }}
      >
        VS
      </span>
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

        {/* Comparison Diagram — fire vs ice clash */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          animate={
            phase === "impact"
              ? { x: [0, -9, 8, -6, 5, -2, 0], rotate: [0, -0.6, 0.5, -0.3, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto w-full glass rounded-3xl border border-white/10 bg-black/30 overflow-hidden p-5 sm:p-8 lg:p-9"
        >
          {/* Split color washes — ice left, fire right */}
          {(phase === "impact" || settled) && (
            <>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ originX: 1 }}
                className="absolute inset-y-0 left-0 w-1/2 z-0 pointer-events-none bg-gradient-to-l from-sky-400/[0.10] via-sky-400/[0.04] to-transparent"
              />
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="absolute inset-y-0 right-0 w-1/2 z-0 pointer-events-none bg-gradient-to-r from-brand-orange/[0.12] via-brand-orange/[0.05] to-transparent"
              />
              {/* Seam of light down the middle */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                  originY: 0.08,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.04))",
                  boxShadow:
                    "-6px 0 18px rgba(56,189,248,0.25), 6px 0 18px rgba(255,107,53,0.28)",
                }}
                className="clash-seam absolute left-1/2 top-0 bottom-0 w-px -ml-px z-0 pointer-events-none"
              />
            </>
          )}

          {/* Header — fight card marquee */}
          <div
            className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center mb-5 sm:mb-7 min-h-[4.5rem] sm:min-h-[5rem] [container-type:inline-size]"
            style={{ fontFamily: "'Bruno Ace SC', 'Impact', sans-serif" }}
          >
            <motion.span
              initial={false}
              animate={phase === "waiting" ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="justify-self-end whitespace-nowrap uppercase leading-none text-[min(70px,4.5cqw)]"
            >
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 40%, #0ea5e9 75%, #075985 100%)",
                  padding: "0.06em 0.05em",
                  filter: "drop-shadow(0 0 10px rgba(56,189,248,0.35))",
                }}
              >
                Chatbot
              </span>
            </motion.span>

            {/* spacer reserves the VS slot so the labels hug it */}
            <div className="w-[110px] sm:w-[130px]" />

            {/* VS emblem — lands on impact, click to replay */}
            {(phase === "impact" || settled) && (
              <motion.button
                initial={{ scale: 0, rotate: -14 }}
                animate={{ scale: [0, 1.4, 1], rotate: [-14, 6, 0] }}
                transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => settled && runClash()}
                aria-label="Replay the clash"
                title="Replay"
                style={{ x: "-50%", y: "-50%", fontFamily: "'Bruno Ace SC', 'Impact', sans-serif", fontSize: 70 }}
                className="absolute left-1/2 top-1/2 z-20 leading-none cursor-pointer select-none flex items-center"
              >
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 35%, #0ea5e9 70%, #075985 100%)",
                    WebkitTextStroke: "1px rgba(224,242,254,0.3)",
                    transform: "rotate(-8deg) translateY(-2px)",
                    padding: "0.1em 0.02em 0.14em 0.1em",
                    filter:
                      "drop-shadow(0 0 12px rgba(56,189,248,0.6)) drop-shadow(0 3px 2px rgba(0,0,0,0.65))",
                  }}
                >
                  V
                </span>
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #ffedd5 0%, #ffb168 30%, #ff6b35 65%, #c2410c 100%)",
                    WebkitTextStroke: "1px rgba(255,237,213,0.3)",
                    transform: "rotate(7deg) translateY(3px)",
                    padding: "0.1em 0.1em 0.14em 0.02em",
                    marginLeft: "-0.06em",
                    filter:
                      "drop-shadow(0 0 12px rgba(255,107,53,0.65)) drop-shadow(0 3px 2px rgba(0,0,0,0.65))",
                  }}
                >
                  S
                </span>
              </motion.button>
            )}

            {/* Colliding fists */}
            {clashing && (
              <>
                <motion.div
                  initial={{ x: "-48vw", opacity: 1 }}
                  animate={
                    phase === "clash"
                      ? { x: 0, opacity: 1 }
                      : { x: -34, opacity: 0 }
                  }
                  transition={
                    phase === "clash"
                      ? { duration: 0.55, ease: [0.7, 0, 1, 0.6] }
                      : { duration: 0.35, ease: "easeOut" }
                  }
                  style={{ left: "50%", marginLeft: "-4.5rem", marginTop: "-2.25rem" }}
                  className="absolute top-1/2 z-20 w-[4.5rem] h-[4.5rem] flex items-center justify-center pointer-events-none select-none"
                >
                  <div className="absolute top-1/2 right-full h-3 w-[40vw] -translate-y-1/2 bg-gradient-to-l from-sky-400/70 to-transparent blur-[6px]" />
                  <span
                    className="text-5xl sm:text-6xl"
                    style={{
                      filter:
                        "grayscale(1) brightness(1.15) sepia(1) hue-rotate(170deg) saturate(4) drop-shadow(0 0 18px rgba(56,189,248,0.8))",
                    }}
                  >
                    🤜
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: "48vw", opacity: 1 }}
                  animate={
                    phase === "clash"
                      ? { x: 0, opacity: 1 }
                      : { x: 34, opacity: 0 }
                  }
                  transition={
                    phase === "clash"
                      ? { duration: 0.55, ease: [0.7, 0, 1, 0.6] }
                      : { duration: 0.35, ease: "easeOut" }
                  }
                  style={{ left: "50%", marginTop: "-2.25rem" }}
                  className="absolute top-1/2 z-20 w-[4.5rem] h-[4.5rem] flex items-center justify-center pointer-events-none select-none"
                >
                  <div className="absolute top-1/2 left-full h-3 w-[40vw] -translate-y-1/2 bg-gradient-to-r from-brand-orange/70 to-transparent blur-[6px]" />
                  <span
                    className="text-5xl sm:text-6xl"
                    style={{
                      filter:
                        "sepia(1) hue-rotate(-15deg) saturate(4) brightness(1.05) drop-shadow(0 0 18px rgba(255,107,53,0.85))",
                    }}
                  >
                    🤛
                  </span>
                </motion.div>
              </>
            )}

            {/* Shockwave rings + sparks at the impact point */}
            {phase === "impact" && (
              <div className="absolute left-1/2 top-1/2 z-10 pointer-events-none">
                <motion.span
                  initial={{ scale: 0.3, opacity: 0.9 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute -left-10 -top-10 w-20 h-20 rounded-full border-4 border-sky-300/70"
                />
                <motion.span
                  initial={{ scale: 0.3, opacity: 0.9 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
                  className="absolute -left-10 -top-10 w-20 h-20 rounded-full border-4 border-brand-orange/70"
                />
                {clashParticles.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className={`absolute rounded-full ${p.blue ? "bg-sky-300" : "bg-brand-orange"}`}
                    style={{
                      width: p.size,
                      height: p.size,
                      marginLeft: -p.size / 2,
                      marginTop: -p.size / 2,
                    }}
                  />
                ))}
              </div>
            )}

            <motion.span
              initial={false}
              animate={phase === "waiting" ? { opacity: 0, x: 40 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="justify-self-start whitespace-nowrap uppercase leading-none text-[min(70px,4.5cqw)]"
            >
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #ffedd5 0%, #ffb168 30%, #ff6b35 65%, #c2410c 100%)",
                  padding: "0.06em 0.05em",
                  filter: "drop-shadow(0 0 10px rgba(255,107,53,0.4))",
                }}
              >
                2XceL Agent
              </span>
            </motion.span>
          </div>

          <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2">
            {comparisonRows.map((row, i) => {
              const Icon = row.icon;
              const isHovered = hoveredIndex === i;
              const rowBursts = bursts.filter((b) => b.row === i);

              return (
                <motion.div
                  key={row.label}
                  initial={false}
                  animate={settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{
                    duration: 0.45,
                    delay: settled ? 0.15 + i * 0.08 : 0,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex((h) => (h === i ? null : h))}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3 rounded-2xl px-2 py-2 sm:px-3 sm:py-2.5 cursor-pointer transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  {/* Chatbot node — ice side */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 1 : 0.75,
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center gap-2.5 sm:gap-3 justify-self-end text-right"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sky-100/80 font-semibold text-base sm:text-lg">{row.label}</span>
                      <span className="text-slate-400 text-sm sm:text-base leading-snug truncate sm:whitespace-normal">
                        {row.chatbot}
                      </span>
                    </div>
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isHovered ? "border-sky-300/40 bg-sky-400/15" : "border-sky-400/20 bg-sky-400/[0.06]"
                      }`}
                    >
                      <Icon size={19} className="text-sky-300/80" />
                    </div>
                  </motion.div>

                  {/* Center connector */}
                  <div className="relative w-6 sm:w-10 h-5 flex items-center justify-center">
                    <div
                      className={`absolute inset-y-1/2 left-0 right-0 h-px transition-colors duration-300 ${
                        isHovered ? "bg-brand-orange/50" : "bg-white/10"
                      }`}
                    />
                    <motion.div
                      animate={
                        isHovered
                          ? { x: [-6, 6], opacity: [0, 1, 0] }
                          : { x: 0, opacity: 0.35 }
                      }
                      transition={
                        isHovered
                          ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.3 }
                      }
                      className="relative z-10"
                    >
                      <ArrowRight
                        size={12}
                        className={isHovered ? "text-brand-orange" : "text-gray-600"}
                      />
                    </motion.div>
                  </div>

                  {/* Agent node — fire side */}
                  <motion.div
                    onClick={() => handleAgentClick(i)}
                    animate={{
                      scale: isHovered ? 1.03 : 1,
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative flex items-center gap-2.5 sm:gap-3"
                  >
                    <motion.div
                      animate={{
                        boxShadow: isHovered
                          ? [
                              "0 0 0px 0px rgba(255,107,53,0.4)",
                              "0 0 16px 4px rgba(255,107,53,0.5)",
                              "0 0 0px 0px rgba(255,107,53,0.4)",
                            ]
                          : [
                              "0 0 0px 0px rgba(255,107,53,0)",
                              "0 0 8px 1px rgba(255,107,53,0.25)",
                              "0 0 0px 0px rgba(255,107,53,0)",
                            ],
                      }}
                      transition={{ duration: isHovered ? 1 : 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-brand-orange/30 bg-brand-orange/[0.08] flex items-center justify-center shrink-0"
                    >
                      <Icon size={19} className="text-brand-orange" />

                      {/* click burst ripples */}
                      <AnimatePresence>
                        {rowBursts.map((b) => (
                          <motion.span
                            key={b.id}
                            initial={{ opacity: 0.6, scale: 0.6 }}
                            animate={{ opacity: 0, scale: 2.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full border-2 border-brand-orange pointer-events-none"
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white font-semibold text-base sm:text-lg">{row.label}</span>
                      <span className="text-gray-300 text-sm sm:text-base leading-snug truncate sm:whitespace-normal">
                        {row.agent}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Live activity ticker */}
          <motion.div
            initial={false}
            animate={settled ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: settled ? 0.7 : 0 }}
            className="relative z-10 mt-6 sm:mt-8 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
            </span>
            <span className="text-gray-400">
              Live: agents have completed{" "}
              <motion.span
                key={actionCount}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-white font-semibold tabular-nums"
              >
                {actionCount.toLocaleString()}
              </motion.span>{" "}
              actions today
            </span>
          </motion.div>

          {/* Impact flash */}
          {phase === "impact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.4, times: [0, 0.25, 1] }}
              style={{
                background:
                  "radial-gradient(circle at 50% 14%, rgba(255,255,255,0.9), rgba(255,255,255,0.25) 40%, transparent 70%)",
              }}
              className="absolute inset-0 z-30 pointer-events-none"
            />
          )}

          {/* Live purchase notification */}
          <AnimatePresence>
            {notifVisible && (
              <motion.div
                key={notifIndex}
                initial={{ opacity: 0, y: 16, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="clash-toast absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)] max-w-[calc(100%-2rem)]"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-brand-orange" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-xs sm:text-sm font-semibold leading-snug truncate">
                    {purchaseFeed[notifIndex].name} just deployed the{" "}
                    <span className="text-brand-orange">{purchaseFeed[notifIndex].agent}</span>
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="shrink-0" />
                    {purchaseFeed[notifIndex].location} · just now
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
