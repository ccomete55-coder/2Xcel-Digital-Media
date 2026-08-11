import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowRight, Check, Zap, TrendingUp, Bot, Brain, Globe, Quote, ShieldCheck, HelpCircle, Sparkles, Send, Mail, User, Landmark, MessageSquare, Settings, Calendar, Clock, MapPin, Phone, Briefcase, Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import { CinematicFooter } from './components/ui/motion-footer';
import { FeaturedAgentsSection } from './components/FeaturedAgentsSection';
import { LunaVoiceAgentSection } from './components/LunaVoiceAgentSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { SocialMediaTiers } from './components/SocialMediaTiers';
import { AdVideoProductionSection } from './components/AdVideoProductionSection';
import { EnterpriseStrategySection } from './components/EnterpriseStrategySection';
import { AutomationsWorkflowsSection } from './components/AutomationsWorkflowsSection';
import { Toggle } from './components/ui/toggle';
import InteractiveSelector from './components/ui/interactive-selector';
import { Eyebrow } from './components/ui/Eyebrow';
import { VoiceConcierge } from './components/VoiceConcierge';
import ShapeGrid from './components/ShapeGrid';
import { blogPosts } from './data/blogPosts';
import { IconDock } from './components/ui/icon-dock';

interface AnimatedLetterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ char, index, total, progress }) => {
  const charProgress = index / total;
  const start = charProgress - 0.1;
  const end = charProgress + 0.05;
  
  // Safe limits bound output scaling arrays
  const opacity = useTransform(
    progress, 
    [Math.max(0, start), Math.min(1, end)], 
    [0.2, 1]
  );

  return <motion.span style={{ opacity }}>{char}</motion.span>;
};

// ==========================================
// ANIMATED STAT COUNTER
// ==========================================

interface AnimatedStatProps {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accentColor?: string;
  decimals?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
  numericValue,
  prefix = '',
  suffix = '',
  label,
  accentColor = '#E55B2B',
  decimals = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(eased * numericValue);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, numericValue]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center">
      <div
        className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight leading-none tabular-nums"
        style={{ color: accentColor }}
      >
        {prefix}{formatted}{suffix}
      </div>
      <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400 mt-0.5">
        {label}
      </div>
    </div>
  );
};

// ==========================================
// CORE APPLICATION SYSTEM LAYOUT
// ==========================================

// Fixed dropdown values in the "Service Interested In" selector — anything
// outside this set (e.g. a specific pricing tier or add-on card) gets
// injected as its own <option> so the select actually shows what was picked.
const KNOWN_SERVICE_OPTIONS = new Set([
  "Custom Web Design with Marketing Backend",
  "24/7 AI Sales Assistant Integration",
  "Cinematic Media Production",
  "Full-Suite Digital Brand Engine",
  "Tier 1: Complimentary Workspace Blueprints",
  "Tier 2: Core Growth & Implementation",
  "Tier 3: Full Enterprise Infrastructure",
]);

export default function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // #page-root has overflow-hidden purely to contain decorative background
  // elements — it must never scroll internally. But scrollIntoView() calls
  // (used throughout the site for nav/CTA clicks) can make the browser treat
  // it as a scrollable ancestor and nudge its internal scrollTop off 0, which
  // desyncs the footer's clip-path reveal from the real window scroll
  // position and clips the footer content away near the bottom of the page.
  useEffect(() => {
    const root = document.getElementById('page-root');
    if (!root) return;
    const resetInternalScroll = () => {
      if (root.scrollTop !== 0) root.scrollTop = 0;
      if (root.scrollLeft !== 0) root.scrollLeft = 0;
    };
    root.addEventListener('scroll', resetInternalScroll, { passive: true });
    return () => root.removeEventListener('scroll', resetInternalScroll);
  }, []);

  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [heroForceExpanded, setHeroForceExpanded] = useState<boolean>(false);

  // Nav links must work even before the hero's scroll-jack animation has
  // played out — force it to its expanded state first so it stops fighting
  // the anchor jump, then scroll to the target section.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setHeroForceExpanded(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };
  const [activeVideoSrc, setActiveVideoSrc] = useState<string>("/The Enchanted Closet-Lace Cuff Jean.mp4");
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isHeroMuted, setIsHeroMuted] = useState<boolean>(true);
  
  const getVideoSrc = (path: string) => {
    if (path === "/The Enchanted Closet-Lace Cuff Jean.mp4") {
      return "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-posing-with-a-chic-white-blazer-34394-large.mp4";
    }
    if (path === "/Enchanted Closet AD.mp4") {
      return "https://assets.mixkit.co/videos/preview/mixkit-charming-woman-wearing-a-beautiful-white-dress-34404-large.mp4";
    }
    if (path === "/Enchanted Closet product AD.mp4") {
      return "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-beautiful-white-dress-and-walking-in-slow-motion-34399-large.mp4";
    }
    return path;
  };

  const [activeBlueprintTab, setActiveBlueprintTab] = useState<string>("All");
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const mobileSlotRef = useRef<HTMLSpanElement>(null);
  const desktopSlotRef = useRef<HTMLSpanElement>(null);
  const [slotCoords, setSlotCoords] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: 41
  });

  useEffect(() => {
    const updateCoords = () => {
      const activeRef = isMobile ? mobileSlotRef.current : desktopSlotRef.current;
      if (activeRef) {
        const rect = activeRef.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setSlotCoords({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      }
    };
    
    updateCoords();
    
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords, { passive: true });
    
    const timers = [
      setTimeout(updateCoords, 50),
      setTimeout(updateCoords, 150),
      setTimeout(updateCoords, 300),
      setTimeout(updateCoords, 600),
      setTimeout(updateCoords, 1000),
    ];
    
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
      timers.forEach(clearTimeout);
    };
  }, []);


  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionIds = ['custom-web-design', 'media-section', 'blueprints', 'pricing', 'blog'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Floating agency interactive state variables
  const [activeObjection, setActiveObjection] = useState<number>(0);
  
  // Custom interactive CTA state variables (required form fields)
  const [targetLeads, setTargetLeads] = useState<number>(80);
  const [mainChallenge, setMainChallenge] = useState<string>("Static website generates zero interest");
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [industryInput, setIndustryInput] = useState<string>("");
  const [serviceInterested, setServiceInterested] = useState<string>("Custom Web Design with Marketing Backend");
  
  const [formError, setFormError] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<number | null>(null);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);
  // Newest post leads as a featured hero; the rest fill the grid below.
  const sortedBlogPosts = [...blogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const featuredPost = sortedBlogPosts[0];
  const remainingBlogPosts = sortedBlogPosts.slice(1);
  const visibleBlogPosts = showAllBlogPosts ? remainingBlogPosts : remainingBlogPosts.slice(0, 6);

  const getSubmitLabel = (service: string): string => {
    if (service.includes('AI Sales')) return 'Book my AI sales agent setup';
    if (service.includes('Web Design')) return 'Book my web design call';
    if (service.includes('Cinematic Media')) return 'Book my media production call';
    if (service.includes('Full-Suite')) return 'Book my full-suite call';
    if (service.includes('Tier 1')) return 'Get my free blueprints';
    if (service.includes('Tier 2')) return 'Start with Core Growth';
    if (service.includes('Tier 3')) return 'Book an enterprise consult';
    if (service.includes('Import')) return 'Claim my free import';
    return 'Get my plan & book a call';
  };

  // Zoom Lead Magnet Calendar Booking States
  const [selectedDate, setSelectedDate] = useState<string>("Mon, Jun 15");
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [isBookingLoading, setIsBookingLoading] = useState<boolean>(false);

  // Scroll Tracking engine configuration starting at the What We Do section
  const { scrollYProgress } = useScroll({
    target: aboutSectionRef,
    offset: ['start 0.8', 'end 0.2']
  });

  // Global page scroll progress (0→1) for the top progress bar
  const { scrollYProgress: pageScrollProgress } = useScroll();

  const aboutParagraphText = "We recognized that most websites are just static brochures. We changed the game by blending cinematic media with AI-powered sales technology. Our mission is to provide businesses with a digital presence that doesn't just look elite but works 24/7—using backend marketing logic and smart automation to hit the sales targets that traditional agencies miss.";
  const characters = aboutParagraphText.split('');


  const objections = [
    {
      icon: <Brain className="text-brand-orange" size={18} />,
      title: "Robotic Sounding?",
      short: "Won't an AI Sales Assistant sound robotic?",
      full: "“We have all interacted with low-grade chat scripts. Won't an AI sales assistant sound stale, frustrate high-ticket corporate clients, and damage our premium brand's reputation?”",
      agentPhrase: "Absolutely not. Our AI Sales Assistants do not run on static keywords. Utilizing next-generation cognitive models, they adapt dynamically, parsing complex client intents, matching your exact brand tone with conversational elegance, and guiding users with professional confidence. They interact like an elite virtual executive."
    },
    {
      icon: <HelpCircle className="text-brand-blue" size={18} />,
      title: "Custom Operations?",
      short: "Can it handle custom operations?",
      full: "“Our enterprise model is highly custom. Every customer has unique questions. How can an automated system possibly answer highly specific operational inquiries correctly?”",
      agentPhrase: "We ingest your entire corporate database into a secure offline knowledge system—including rate sheets, project parameters, technical specs, and standard reply files. This lets your customized AI Sales Assistant address complex technical requests with absolute precision, and immediately escalate booking options to your human team only when highly qualified."
    },
    {
      icon: <ShieldCheck className="text-[#334c82]" size={18} />,
      title: "Hard Integration?",
      short: "Is integration complex?",
      full: "“Our departments rely heavily on HubSpot, Salesforce, Slack, and Calendly. Is integrating an automated system a difficult developer chore that will disrupt our core teams?”",
      agentPhrase: "Integration takes less than an hour. We design the backend interface plug-and-play. Your AI Sales Assistant connects natively with CRM stacks, custom databases, and active communication networks, channeling fully validated leads and booked appointments straight to your executive pipeline without asking you to change your workflow."
    },
    {
      icon: <TrendingUp className="text-emerald-500" size={18} />,
      title: "Real Conversions?",
      short: "Does it actually generate sales?",
      full: "“We are skeptical of vanity metrics. Do automated widgets actually drive high-ticket conversions and corporate sales, or is this just another flashy gimmick?”",
      agentPhrase: "Static contact forms convert at an average of 1.8%—essentially sitting there like a printed brochure. Our live-qualifying dialogs regularly hit upward of 14.5% conversion rates. We engage visitors instantly at peak buying interest, converting late-night browsing into real scheduled appointments on autopilot."
    }
  ];

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate, show a clear message, and focus the first field that needs attention.
    const focusField = (id: string) => document.getElementById(id)?.focus();
    if (!firstNameInput.trim()) {
      setFormError('Please add your first name so we know who we’re talking to.');
      focusField('form-first-name');
      return;
    }
    if (!emailInput.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setFormError('That email doesn’t look right — mind double-checking it?');
      focusField('form-email');
      return;
    }
    if (!phoneInput.trim()) {
      setFormError('Please add a phone number so we can reach you.');
      focusField('form-phone');
      return;
    }
    if (!industryInput.trim()) {
      setFormError('Let us know your industry so we can tailor your plan.');
      focusField('form-industry');
      return;
    }
    setFormError('');
    setIsSimulating(true);
    setSimStep(1);

    try {
      const response = await fetch('https://hermes.2xcel.net/webhook/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstNameInput.trim(),
          email: emailInput.trim(),
          phone: phoneInput.trim(),
          industry: industryInput.trim(),
          serviceInterested: serviceInterested || undefined,
        }),
      });

      setTimeout(() => {
        setSimStep(2);
        setTimeout(() => {
          setSimStep(3);
          setTimeout(() => {
            setIsSimulating(false);
            if (response.ok) {
              setIsSubmitted(true);
            } else {
              setFormError('Something went wrong submitting your details. Please try again.');
            }
          }, 1200);
        }, 1000);
      }, 900);
    } catch (err) {
      console.error('Form submission error:', err);
      setIsSimulating(false);
      setFormError('Connection error. Please check your internet and try again.');
    }
  };

  // Floating animated logo interpolator matching 2XceL's aesthetic
  const p = Math.min(scrollProgress / 0.7, 1);
  const ease = p * p * (3 - 2 * p); // smooth cubic easement
  // Responsive starting values
  const startFontSize = isMobile ? "16vw" : "11.5vw"; // Balanced display heading size
  const startY = isMobile ? "81vh" : "74vh";         // Dropped lower to sit elegantly in the viewport near the bottom
  const startX = isMobile ? "4.5vw" : "3.5vw";        // Moved closer to the left edge for a cleaner corner alignment
  
  const runningFontSize = `calc(${startFontSize} * ${1 - ease} + 11px * ${ease})`;
  const runningY = `calc(${startY} * ${1 - ease} + ${slotCoords.y}px * ${ease})`;
  const runningX = `calc(${startX} * ${1 - ease} + ${slotCoords.x}px * ${ease})`;
  const runningTracking = `${-0.07 * (1 - ease) + 0.2 * ease}em`;
  // Crossfade handoff between the flying logo and the static nav-pill logo —
  // only one is ever visible at a time, so they never overlap into a "doubled" look
  const navHandoffStart = 0.85;
  const navLogoOpacity = ease <= navHandoffStart ? 0 : Math.min(1, (ease - navHandoffStart) / (1 - navHandoffStart));
  const flyingLogoOpacity = 1 - navLogoOpacity;

  return (
    <div id="page-root" className="bg-[#0B0E14] min-h-screen selection:bg-brand-orange selection:text-white relative overflow-clip" style={{ color: '#DEDBC8' }}>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[210] origin-left"
        style={{
          scaleX: pageScrollProgress,
          background: 'linear-gradient(90deg, #E55B2B 0%, #229AD6 100%)',
        }}
      />

      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#custom-web-design"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:bg-brand-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Primary page heading — keyword-rich, visually hidden so the animated hero wordmark stays the visual focal point */}
      <h1 className="sr-only">
        2XceL Digital Media — AI-Powered Custom Web Design, 24/7 AI Sales Agents, Marketing Automation &amp; Cinematic Ad Production
      </h1>

      {/* Custom Circular Magnetic Cursor Trail */}
      <CustomCursor />

      {/* ShapeGrid Hexagon Side Borders */}
      <div
        className="fixed inset-0 w-full h-screen z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <ShapeGrid
          shape="hexagon"
          direction="up"
          speed={0.15}
          borderColor="#E55B2B"
          hoverFillColor="#229AD6"
          squareSize={50}
          hoverTrailAmount={2}
        />
      </div>

      {/* Dynamic Background Noise & Spotlights */}
      <div className="absolute inset-0 radial-noise pointer-events-none opacity-40 z-0"></div>
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] gradient-glow pointer-events-none opacity-60 z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] gradient-glow-orange pointer-events-none opacity-40 z-0"></div>
 
      {/* Cinematic Flying Brand Portal Logo */}
      <div
        aria-hidden="true"
        className="fixed z-[60] pointer-events-none select-none font-sans uppercase text-white flex flex-col items-center text-center"
        style={{
          left: runningX,
          top: runningY,
          transform: `translate(calc(-50% * ${ease}), -50%)`,
          opacity: flyingLogoOpacity,
        }}
      >
        <div
          className="font-sans font-extrabold flex items-start leading-[0.85] justify-center relative"
          style={{
            fontSize: `clamp(11px, ${runningFontSize}, 22vw)`,
            letterSpacing: runningTracking,
            textShadow: "0 15px 45px rgba(0,0,0,0.95), 0 8px 24px rgba(229, 91, 43, 0.4), 0 30px 90px rgba(34, 154, 214, 0.25)",
          }}
        >
          <span className="flex">
            <span className="text-[#E55B2B]">2</span>
            <span className="text-[#229AD6]">X</span>
            <span className="text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]">ceL</span>
          </span>
        </div>
        
        {/* Subtitle brand accent fading out early on scroll, styled with moderate letter spacing and increased size */}
        <div 
          className="font-sans uppercase font-extrabold text-white select-none text-center"
          style={{
            opacity: Math.max(0, 1 - ease * 2.5),
            transform: `translateY(calc(12px * ${1 - ease})) scale(${1 - ease * 0.2})`,
            fontSize: isMobile ? `calc(${runningFontSize} * 0.23)` : `calc(${runningFontSize} * 0.15)`, 
            letterSpacing: "0.22em",
            marginTop: "1.2vw",
            display: ease > 0.4 ? 'none' : 'block',
            whiteSpace: "nowrap",
            textShadow: "0 4px 14px rgba(0,0,0,0.95)"
          }}
        >
          Digital Media
        </div>
 
        {/* Tagline from the logo to make it elite and authentic */}
        <div 
          className="font-mono uppercase font-semibold text-gray-400 select-none text-center"
          style={{
            opacity: Math.max(0, 1 - ease * 3),
            transform: `translateY(calc(16px * ${1 - ease})) scale(${1 - ease * 0.2})`,
            fontSize: isMobile ? `calc(${runningFontSize} * 0.11)` : `calc(${runningFontSize} * 0.08)`, 
            letterSpacing: "0.3em",
            marginTop: "0.8vw",
            display: ease > 0.4 ? 'none' : 'block',
            whiteSpace: "nowrap",
            textShadow: "0 2px 10px rgba(0,0,0,0.95)"
          }}
        >
          <span className="text-[#E55B2B]">Strategy</span> <span className="text-[#229AD6]">|</span> <span className="text-[#229AD6]">Automation</span> <span className="text-[#229AD6]">|</span> <span className="text-white">Growth</span>
        </div>
      </div>

      {/* Floating Pill Navbar with Interactive Media Toggle - RESPONSIVE ENHANCEMENT */}
      <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 flex justify-center">
        {isMobile ? (
          <div className="w-full max-w-lg flex items-center justify-between glass rounded-full px-6 py-3.5 shadow-2xl backdrop-blur-md border border-white/10 relative">
            {/* Left side brand slot */}
            <div className="flex items-center gap-1.5" style={{ opacity: navLogoOpacity }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E55B2B] animate-pulse"></div>
              <span ref={mobileSlotRef} className="text-xs font-black tracking-[0.2em] uppercase text-slate-800 dark:text-white select-none">
                <span className="text-[#E55B2B]">2</span>
                <span className="text-[#229AD6]">X</span>
                <span className="text-slate-800 dark:text-white">ceL</span>
              </span>
            </div>

            {/* Right side controls with Toggle and Hamburger */}
            <div className="flex items-center gap-3">
              <Toggle
                variant="outline"
                className="group size-11 flex items-center justify-center rounded-full border border-slate-300/30 dark:border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-slate-800 dark:text-white transition-colors"
                pressed={theme === "dark"}
                onPressedChange={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <Moon
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 text-[#229AD6]"
                />
                <Sun
                  size={14}
                  strokeWidth={2}
                  className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 text-[#E55B2B]"
                />
              </Toggle>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-850 dark:text-white hover:text-brand-orange transition-colors duration-200 z-[70] cursor-pointer p-0.5 focus:outline-none"
                aria-label="Toggle Navigation Menu"
                id="hamburger-btn"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

             {/* Drawer menu under active clicks */}
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-16 left-0 right-0 bg-[#0B0E14]/95 dark:bg-[#0B0E14]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-3xl z-40 flex flex-col gap-4 text-center"
              >
                {[
                  { label: "Web Design", href: "#custom-web-design" },
                  { label: "Digital Media", href: "#media-section" },
                  { label: "AI Blueprints", href: "#blueprints" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Blog", href: "#blog" },
                ].map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { setIsMenuOpen(false); handleNavClick(e, item.href); }}
                    className="text-slate-800 dark:text-white hover:text-brand-orange uppercase font-bold text-xs tracking-[0.15em] transition-colors py-2 border-b border-white/5 last:border-b-0"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#inquiries"
                  onClick={(e) => { setIsMenuOpen(false); handleNavClick(e, '#inquiries'); }}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs tracking-[0.15em] uppercase px-5 py-3 rounded-full mt-2 transition-all block duration-300 shadow-md"
                >
                  Contact
                </a>
              </motion.div>
            )}
          </div>
        ) : (
          <nav className="glass rounded-full px-6 sm:px-8 py-3 flex items-center justify-center gap-2 sm:gap-4 shadow-2xl backdrop-blur-md border border-white/10 text-xs font-semibold">
            <a
              href="#custom-web-design"
              onClick={(e) => handleNavClick(e, '#custom-web-design')}
              className={`tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer px-1.5 py-1 ${activeSection === 'custom-web-design' ? 'text-brand-orange opacity-100' : 'text-slate-800 dark:text-white opacity-75 hover:opacity-100'}`}
            >
              Web Design
            </a>
            <a
              href="#media-section"
              onClick={(e) => handleNavClick(e, '#media-section')}
              className={`tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer px-1.5 py-1 ${activeSection === 'media-section' ? 'text-brand-orange opacity-100' : 'text-slate-800 dark:text-white opacity-75 hover:opacity-100'}`}
            >
              Digital Media
            </a>

            <div
              className="flex items-center gap-1.5 px-1.5 transition-opacity duration-300"
              style={{ opacity: navLogoOpacity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E55B2B] animate-pulse"></div>
              <span ref={desktopSlotRef} className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-slate-800 dark:text-white select-none">
                <span className="text-[#E55B2B]">2</span>
                <span className="text-[#229AD6]">X</span>
                <span className="text-slate-800 dark:text-white">ceL</span>
              </span>
            </div>

            <a
              href="#blueprints"
              onClick={(e) => handleNavClick(e, '#blueprints')}
              className={`tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer px-1.5 py-1 ${activeSection === 'blueprints' ? 'text-brand-orange opacity-100' : 'text-slate-800 dark:text-white opacity-75 hover:opacity-100'}`}
            >
              AI Blueprints
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className={`tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer px-1.5 py-1 ${activeSection === 'pricing' ? 'text-brand-orange opacity-100' : 'text-slate-800 dark:text-white opacity-75 hover:opacity-100'}`}
            >
              Pricing
            </a>
            <a
              href="#blog"
              onClick={(e) => handleNavClick(e, '#blog')}
              className={`tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer px-1.5 py-1 ${activeSection === 'blog' ? 'text-brand-orange opacity-100' : 'text-slate-800 dark:text-white opacity-75 hover:opacity-100'}`}
            >
              Blog
            </a>

            {/* Premium Interactive Theme Toggle */}
            <Toggle
              variant="outline"
              className="group size-11 flex items-center justify-center rounded-full border border-slate-300/30 dark:border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-slate-800 dark:text-white transition-all duration-300"
              pressed={theme === "dark"}
              onPressedChange={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Moon
                size={14}
                strokeWidth={2}
                className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 text-[#229AD6]"
              />
              <Sun
                size={14}
                strokeWidth={2}
                className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 text-[#E55B2B]"
              />
            </Toggle>

            <a
              href="#inquiries"
              onClick={(e) => handleNavClick(e, '#inquiries')}
              className="tracking-[0.12em] uppercase font-bold text-brand-orange hover:opacity-100 transition-opacity duration-300 cursor-pointer px-3 py-1.5 bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/25 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-sm"
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      {/* Icon Dock — gig sites & socials, sits just under the pill navbar */}
      <div className="fixed top-20 sm:top-24 left-0 right-0 z-[45] w-full flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <IconDock />
        </div>
      </div>

      {/* Cinematic Responsive Scroll Expansion Gateway */}
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={
          mediaType === 'video'
            ? '/hero-video.mp4'
            : '/hero-image.webp'
        }
        posterSrc="/hero-image.webp"
        bgImageSrc="/hero-image.webp"
        textBlend
        onProgressChange={setScrollProgress}
        forceExpanded={heroForceExpanded}
        isMuted={isHeroMuted}
        onToggleMute={() => setIsHeroMuted((prev) => !prev)}
      >
        <div className="w-full">
          
          {/* SECTION 1: OUR STORY (MISSION STATEMENT) */}
          <section ref={aboutSectionRef} id="our-story" className="pt-24 pb-12 px-4 md:px-8 w-full flex items-center justify-center relative z-10 scroll-mt-28">
            <div className="w-full max-w-4xl glass rounded-3xl p-8 md:p-14 lg:p-16 flex flex-col gap-8 relative overflow-hidden backdrop-blur-md shadow-3xl bg-black/25 border border-white/5 text-center">

              {/* TITLE */}
              <div className="flex flex-col justify-center">
                <h2 className="text-white font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl mb-2">The Mission Behind</h2>
                <h2 className="text-brand-orange font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl">2XceL Digital Media</h2>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-6 justify-center">
                {[
                  "2XceL Digital Media was founded on a simple truth: media without marketing is invisible, and marketing without automation is inefficient.",
                  "We equip brands for the Agentic Web by blending engineered backend technical automation with elite creative media, giving mid-market businesses and rising entrepreneurs the modern infrastructure they need to outpace the competition."
                ].map((sentence, sIdx) => (
                  <motion.p
                    key={sIdx}
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: sIdx * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#46647d] dark:text-[#94a3b8] text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed"
                  >
                    {sentence}
                  </motion.p>
                ))}
              </div>

            </div>
          </section>

          {/* SECTION A: CUSTOM WEB DESIGN */}
          <section id="custom-web-design" className="py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28 ">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-4xl mx-auto flex flex-col gap-5"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Custom Web Design with Marketing Backend Architecture
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
                  Traditional business websites sit passively on the web like printed brochures. We hand-code every frontend in raw HTML, CSS, and JavaScript — zero WordPress, zero page-builder bloat — so it loads instantly and ranks the way Google rewards. Behind it, we wire in a full proprietary CRM backend: contact tags that fire automatically on every visitor action, email and SMS follow-up sequences that run themselves, custom domain routing, and white-labeled client portals your customers log into under your own brand. It's not a brochure — it's a lead-conversion machine with a marketing department built into the code.
                </p>
                <p className="text-brand-orange/90 font-mono text-sm sm:text-base font-bold tracking-wide">
                  Starts from $3,500+ base setup (one-time)
                </p>
              </motion.div>

              {/* INTERACTIVE FULL-WIDTH ACCORDION */}
              <div id="interactive-demo" className="flex flex-col gap-6 items-center mt-12 w-full">
                <div className="text-center max-w-2xl flex flex-col gap-2 mb-2">
                  <h3 className="text-xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Custom Web Projects Portfolio
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                    Explore our high-performance client deployments live. Click on any panel to smoothly expand the project view and access live interactive platforms.
                  </p>
                </div>

                <div className="w-full glass border border-white/5 bg-zinc-950/40 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-4 right-6 text-[9px] font-mono uppercase tracking-widest text-[#32D74B] flex items-center gap-1.5 z-30">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#32D74B] animate-pulse" />
                    Live Sandbox Active
                  </div>
                  
                  {/* Live Component Instance - Full Width! */}
                  <InteractiveSelector />
                </div>
              </div>

            </div>
          </section>

          {/* SECTION C: THE MEDIA SECTION */}
          <section id="media-section" className="border-t border-white/5 pt-24 pb-12 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

              <CaseStudiesSection
                activeVideoSrc={activeVideoSrc}
                setActiveVideoSrc={setActiveVideoSrc}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                getVideoSrc={getVideoSrc}
              />

              <SocialMediaTiers setServiceInterested={setServiceInterested} />

              <AdVideoProductionSection setServiceInterested={setServiceInterested} />

            </div>
          </section>

          {/* SECTION 2B-2: FEATURED AI AGENTS (Chatbot vs Agent Positioning) */}
          <section id="featured-agents" className="border-t border-white/5 pt-12 pb-12 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <FeaturedAgentsSection />
              <LunaVoiceAgentSection setServiceInterested={setServiceInterested} />
            </div>
          </section>

          {/* SECTION 3B: ENTERPRISE MARKETING STRATEGY & OFFER ARCHITECTURE */}
          <section id="enterprise-strategy" className="border-t border-white/5 py-12 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <EnterpriseStrategySection setServiceInterested={setServiceInterested} />
            </div>
          </section>

          {/* SECTION 3B: AD MANAGEMENT & OPTIMIZATION */}
          <section id="ad-management" className="border-t border-white/5 py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Ad Management & Optimization
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-light">
                  Hand off campaign management, performance optimization, and platform scaling. We monitor spend, test creative angles, optimize bids, audit performance daily, and scale winners across Meta, Google, TikTok, and YouTube — all under a transparent, performance-aligned pricing model.
                </p>
              </div>

              <div className="glass rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden backdrop-blur-md shadow-3xl bg-black/25 border border-white/5 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-bold text-2xl leading-tight">Ongoing Campaign Retainer</h3>
                  <p className="text-gray-400 text-base leading-relaxed">Dedicated account management + real-time optimization</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$500</span>
                  <span className="text-lg text-gray-400 font-light">/month + 12% of managed ad spend</span>
                </div>

                <div className="h-px bg-white/10" />

                <ul className="flex flex-col gap-3">
                  {[
                    "Daily campaign monitoring & performance audits",
                    "Real-time bid optimization & budget allocation",
                    "A/B testing creative angles & audience segments",
                    "Weekly performance reports & insights",
                    "Platform scaling across Meta, Google, TikTok, YouTube",
                    "Spend cap management & ROI tracking",
                    "Creative recommendation & rotation strategy"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <Check size={18} className="text-brand-orange shrink-0 mt-1" />
                      <span className="text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-px bg-white/10" />

                <button
                  type="button"
                  onClick={() => selectService?.('Ad Management & Optimization ($500 + 12% spend)')}
                  className="w-full h-11 rounded-xl text-sm font-bold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Get Started
                </button>

                <p className="text-xs text-gray-500 text-center font-mono">
                  Minimum 3-month commitment. No setup fees. Transparent spend tracking via shared dashboard.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3C: AUTOMATIONS & WORKFLOWS */}
          <section id="automations-workflows" className="border-t border-white/5 py-12 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <AutomationsWorkflowsSection setServiceInterested={setServiceInterested} />
            </div>
          </section>

          {/* SECTION 4: INDUSTRY INSIGHTS (BLOG) */}
          <section id="blog" className="py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              
              <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">
                <div className="flex justify-center text-center flex-wrap gap-2">
                  <span className="text-brand-orange font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">The 2XceL</span>
                  <span className="text-white font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">Insights Lab</span>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-3xl mx-auto"
                >
                  Deep breakdowns on automation, AI sales infrastructure, and cinematic content strategy — from the team building it.
                </motion.p>
              </div>

              {/* Featured — newest post, larger card above the grid */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedBlogPost(featuredPost.id)}
                  className="relative overflow-hidden rounded-2xl bg-[#0d1219] border border-white/10 cursor-pointer group hover:border-brand-orange/40 hover:bg-[#10161f] transition-all duration-300 shadow-xl"
                >
                  {/* Editorial accent bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-brand-orange/60 to-[#2B8ED9]" />

                  <div className="grid md:grid-cols-5">
                    {/* Left accent panel */}
                    <div className="md:col-span-2 relative p-8 flex flex-col justify-between gap-6 bg-gradient-to-br from-brand-orange/15 via-transparent to-[#2B8ED9]/10 border-b md:border-b-0 md:border-r border-white/5">
                      <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-max shadow-lg">
                        <Sparkles size={13} /> Latest
                      </span>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">{featuredPost.category}</span>
                        <div className="flex items-center gap-3 text-sm font-mono text-gray-500">
                          <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredPost.readTime}</span>
                          <span className="opacity-40">·</span>
                          <span>{featuredPost.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right content */}
                    <div className="md:col-span-3 p-8 flex flex-col justify-between gap-5">
                      <div>
                        <h3 className="text-5xl sm:text-3xl font-extrabold text-white group-hover:text-brand-orange transition-colors duration-200 leading-tight tracking-tight mb-4 line-clamp-3">
                          {featuredPost.title}
                        </h3>
                        <p className="text-base text-gray-300 leading-relaxed line-clamp-4">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      <span className="text-base font-bold text-brand-orange inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                        Read the full insight <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Symmetrical 3-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleBlogPosts.map((post, postIdx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: postIdx * 0.12 }}
                    onClick={() => setSelectedBlogPost(post.id)}
                    className="relative overflow-hidden rounded-2xl bg-[#0d1219] border border-white/10 flex flex-col cursor-pointer group hover:border-brand-orange/40 hover:bg-[#10161f] transition-all duration-300 shadow-lg"
                  >
                    {/* Editorial accent bar — distinct from the site's glass cards */}
                    <div className="h-1 w-full bg-gradient-to-r from-brand-orange via-brand-orange/60 to-[#2B8ED9]" />

                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm font-mono text-gray-500">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-white group-hover:text-brand-orange transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-3">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between  pt-4">
                        <span className="text-sm font-mono text-gray-500">{post.date}</span>
                        <span className="text-sm font-bold text-brand-orange inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-200">
                          Read <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!showAllBlogPosts && remainingBlogPosts.length > 6 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowAllBlogPosts(true)}
                    className="glass border border-white/10 hover:border-brand-orange/40 text-gray-400 hover:text-white px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    View All Insights ({remainingBlogPosts.length - 6} more)
                  </button>
                </div>
              )}

            </div>
          </section>

          {/* SECTION 5: LET'S WORK TOGETHER (The Closing CTA & Interactive Calculation form) */}
          <section id="inquiries" className="py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto glass rounded-3xl border border-white/10 p-8 md:p-14 shadow-3xl text-center relative overflow-hidden"
            >
              <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-brand-orange/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                  Build Your AI Sales System with 2XceL Digital Media
                </h2>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                  Stop settling for a static website that just sits there. It's time for a custom build with built-in marketing logic and an AI sales agent dedicated to your growth. Ready to secure your pipeline and hit your next sales milestone? Let's build your system today.
                </p>

                {/* Submitting form framework */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmission} className="bg-black/35 p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col gap-6 text-left relative mt-4 shadow-xl">
                    
                    {/* Required Intake Parameters: Row Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* First Name Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-first-name" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <User size={12} />
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <span className="text-[#a3a3a3] font-mono text-[10px]">//</span>
                          </div>
                          <input
                            id="form-first-name"
                            type="text"
                            required
                            placeholder="e.g. John"
                            value={firstNameInput}
                            onChange={(e) => setFirstNameInput(e.target.value)}
                            className="bg-[#080B10] border border-white/10 rounded-xl pl-10 pr-4 py-3 w-full text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors font-medium placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Work Email Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-email" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Mail size={12} />
                          Work Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Mail size={14} className="opacity-60" />
                          </div>
                          <input
                            id="form-email"
                            type="email"
                            required
                            placeholder="you@yourcompany.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="bg-[#080B10] border border-white/10 rounded-xl pl-10 pr-4 py-3 w-full text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors font-medium placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Phone Number Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-phone" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Phone size={12} />
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Phone size={14} className="opacity-60" />
                          </div>
                          <input
                            id="form-phone"
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            className="bg-[#080B10] border border-white/10 rounded-xl pl-10 pr-4 py-3 w-full text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors font-medium placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Industry Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-industry" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Briefcase size={12} />
                          Industry *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Briefcase size={14} className="opacity-60" />
                          </div>
                          <input
                            id="form-industry"
                            type="text"
                            required
                            placeholder="e.g. Real Estate, SaaS, Ecommerce"
                            value={industryInput}
                            onChange={(e) => setIndustryInput(e.target.value)}
                            className="bg-[#080B10] border border-white/10 rounded-xl pl-10 pr-4 py-3 w-full text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors font-medium placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Service Interested In Selector */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-service" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                          Service Interested In *
                        </label>
                        <select
                          id="form-service"
                          value={serviceInterested}
                          onChange={(e) => setServiceInterested(e.target.value)}
                          className="w-full bg-[#080B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors cursor-pointer font-medium"
                        >
                          <option value="Custom Web Design with Marketing Backend">Custom Web Design & Marketing Backend</option>
                          <option value="24/7 AI Sales Assistant Integration">24/7 AI Sales Assistant Integration</option>
                          <option value="Cinematic Media Production">Cinematic Media Production</option>
                          <option value="Full-Suite Digital Brand Engine">Full-Suite Digital Brand Engine (All Services)</option>
                          <option value="Tier 1: Complimentary Workspace Blueprints">Tier 1: Complimentary Workspace Blueprints</option>
                          <option value="Tier 2: Core Growth & Implementation">Tier 2: Core Growth & Implementation ($2,500)</option>
                          <option value="Tier 3: Full Enterprise Infrastructure">Tier 3: Full Enterprise Infrastructure (Custom)</option>
                          {!KNOWN_SERVICE_OPTIONS.has(serviceInterested) && (
                            <option value={serviceInterested}>{serviceInterested}</option>
                          )}
                        </select>
                      </div>

                      {/* Challenge custom selector */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-challenge" className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                          What is your primary conversion challenge? *
                        </label>
                        <select
                          id="form-challenge"
                          value={mainChallenge}
                          onChange={(e) => setMainChallenge(e.target.value)}
                          className="w-full bg-[#080B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange/50 transition-colors cursor-pointer font-medium"
                        >
                          <option value="Static Website generates no interest">Static website generates zero interest or traffic action</option>
                          <option value="Our team receives too many manual spam queries">Our team receives too many manual / unqualified spam inquiries</option>
                          <option value="Response times are too high and leads drop off">Response times are too high and hot leads drop off overnight</option>
                          <option value="Need full-funnel automation to scale faster">Need full-funnel sales automation & high-impact branding to scale</option>
                        </select>
                      </div>

                    </div>

                    {/* Leads targets slide multiplier */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                          Estimated Monthly Leads Target:
                        </label>
                        <span className="text-sm font-bold text-white bg-brand-orange/20 border border-brand-orange/30 px-3 py-0.5 rounded-full font-mono">
                          {targetLeads} leads/mo
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        step="10"
                        value={targetLeads} 
                        onChange={(e) => setTargetLeads(Number(e.target.value))}
                        className="w-full accent-brand-orange bg-[#080B10] h-2 rounded-lg cursor-pointer border border-white/5"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-1">
                        <span>10 Leads</span>
                        <span>Avg Pipeline Rate: {(targetLeads * 145).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0})}/mo</span>
                        <span>500 Leads</span>
                      </div>
                    </div>

                    {/* Submission CTA block */}
                    <div className="flex flex-col gap-3 pt-3 ">
                      {formError && (
                        <p role="alert" aria-live="polite" className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 font-medium">
                          {formError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={isSimulating}
                        className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm tracking-wider uppercase px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 w-full animate-none"
                      >
                        {isSimulating ? (
                          <>
                            <Settings className="animate-spin" size={16} />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            {getSubmitLabel(serviceInterested)}
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-gray-500 text-center font-mono uppercase tracking-widest">
                        Your information is encrypted and never shared with third parties.
                      </p>
                    </div>

                    {/* Simulation loader stream HUD */}
                    {isSimulating && (
                      <div className="mt-2 bg-[#080B10] border border-white/5 rounded-xl p-4 font-mono text-xs flex flex-col gap-2.5 shadow-inner">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                          <span className="text-gray-400 font-bold">Sending your details to 2XceL</span>
                        </div>
                        <div className="text-gray-400 flex flex-col gap-1">
                          <p className={simStep >= 1 ? "text-brand-orange font-semibold" : "opacity-40"}>
                            {simStep >= 1 ? "✓ Got your info" : "○ Sending your info…"}
                          </p>
                          <p className={simStep >= 2 ? "text-brand-blue font-semibold" : "opacity-40"}>
                            {simStep >= 2 ? `✓ Matching you with the right ${serviceInterested} plan` : "○ Matching you to the right plan…"}
                          </p>
                          <p className={simStep >= 3 ? "text-emerald-400 font-semibold text-xs animate-pulse" : "opacity-40"}>
                            {simStep >= 3 ? "✓ Setting up your strategy call" : "○ Preparing your booking…"}
                          </p>
                        </div>
                      </div>
                    )}

                  </form>
                ) : (
                  // Custom success metrics dashboard & calendars scheduling magnet
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/40 p-6 md:p-8 rounded-3xl border border-emerald-500/20 text-left mt-6 shadow-2xl relative"
                  >
                    <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest font-bold">
Received
                    </div>

                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck size={26} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">You're all set, {firstNameInput}!</h4>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest text-[#DEDBC8]">Last step: pick a time for your strategy call below.</p>
                      </div>
                    </div>

                    {/* Step 1: Real-Time Custom ROI projection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#080B10]/80 p-5 rounded-2xl border border-white/5 mb-6">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-mono">Monthly Target Leads Stream</div>
                        <div className="text-3xl font-black text-brand-orange">+{targetLeads} leads</div>
                        <p className="text-[10px] text-gray-400 leading-normal mt-1 font-light">With our interactive AI Sales systems, target conversations regularly convert at over 14% to scheduled sales meetings.</p>
                      </div>
                      <div className="border-l border-white/5 pl-0 sm:pl-4 mt-4 sm:mt-0">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-mono">Estimated Pipeline Opportunity Gain</div>
                        <div className="text-3xl font-black text-brand-blue">
                          {((targetLeads * 145) * 12).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0})}/yr
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal mt-1 font-light">Calculated assuming avg proposal value with 2XceL backend lead routers.</p>
                      </div>
                    </div>

                    {/* High Impact Personalized Message addressing the "partners / how can we layout without understanding" issue */}
                    <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-5 mb-6">
                      <p className="text-sm font-light text-gray-200 leading-relaxed">
                        ✨ <strong className="text-white">Awesome, {firstNameInput}!</strong> To deliver a world-class, custom visual preview and interactive blueprint, we need to gather standard details about your lead routing and operations. <strong className="text-white">Our in-house design and engineering team builds every line of code on-site</strong> to fit your exact business goals—we do not outsource. Let's lock in a 1-Hour Google Meet Strategy Session below.
                      </p>
                    </div>

                    {/* Interactive Zoom Call Calendar Scheduling System with real Google Maps wrapper */}
                    <div className=" pt-6">
                      <h5 className="text-sm uppercase font-mono tracking-widest text-[#E65C2B] font-bold mb-4 flex items-center gap-1.5">
                        <Calendar size={14} />
                        Choose a Google Meet Strategy Call Date & Time *
                      </h5>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* LEFT: Calendar view (7 columns) */}
                        <div className="lg:col-span-7 bg-[#080B10] border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col gap-4">
                          
                          {/* Calendar date grid */}
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-bold block mb-2">
                              Select Date (Available next 5 Days):
                            </span>
                            <div className="grid grid-cols-5 gap-1.5">
                              {[
                                { label: "Mon", day: "15", display: "Mon, Jun 15" },
                                { label: "Tue", day: "16", display: "Tue, Jun 16" },
                                { label: "Wed", day: "17", display: "Wed, Jun 17" },
                                { label: "Thu", day: "18", display: "Thu, Jun 18" },
                                { label: "Fri", day: "19", display: "Fri, Jun 19" }
                              ].map((item) => {
                                const isSelected = selectedDate === item.display;
                                return (
                                  <button
                                    key={item.day}
                                    type="button"
                                    onClick={() => setSelectedDate(item.display)}
                                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-0.5 border transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/15"
                                        : "bg-black/40 border-white/5 text-gray-400 hover:border-white/15 hover:text-white"
                                    }`}
                                  >
                                    <span className="text-[9px] uppercase font-mono opacity-80">{item.label}</span>
                                    <span className="text-sm font-bold font-mono">{item.day}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Time grid */}
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-bold block mb-2 flex items-center gap-1">
                              <Clock size={10} />
                              Select Available Mountain Time Slot:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {["09:00 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"].map((t) => {
                                const isSelected = selectedTime === t;
                                return (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setSelectedTime(t)}
                                    className={`py-2 rounded-lg text-xs font-mono font-bold cursor-pointer border transition-colors ${
                                      isSelected
                                        ? "bg-[#2B8ED9] border-[#2B8ED9] text-white shadow-md shadow-brand-blue/15"
                                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                                    }`}
                                  >
                                    {t}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Lead Booking Action */}
                          <div className="pt-2  mt-2">
                            {!isBooked ? (
                              <button
                                key="book-btn"
                                type="button"
                                onClick={async () => {
                                  setIsBookingLoading(true);
                                  try {
                                    const bookingRes = await fetch('https://hermes.2xcel.net/api/book-meeting', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                        firstName: firstNameInput.trim(),
                                        email: emailInput.trim(),
                                        phone: phoneInput.trim(),
                                        industry: industryInput.trim(),
                                        selectedDate,
                                        selectedTime,
                                        serviceInterested,
                                      }),
                                    });

                                    if (!bookingRes.ok) {
                                      throw new Error('Failed to create calendar event');
                                    }

                                    const bookingData = await bookingRes.json();

                                    await fetch('https://hermes.2xcel.net/api/lead', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                        firstName: firstNameInput.trim(),
                                        email: emailInput.trim(),
                                        phone: phoneInput.trim(),
                                        industry: industryInput.trim(),
                                        serviceInterested,
                                        googleMeetLink: bookingData.meetLink || '',
                                        meetingTime: `${selectedDate} at ${selectedTime} MST`,
                                      }),
                                    });

                                    setIsBookingLoading(false);
                                    setIsBooked(true);
                                  } catch (err) {
                                    console.error('Booking error:', err);
                                    setIsBookingLoading(false);
                                    setFormError('Failed to create booking. Please try again.');
                                  }
                                }}
                                disabled={isBookingLoading}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                              >
                                {isBookingLoading ? (
                                  <>
                                    <Settings className="animate-spin" size={14} />
                                    Creating Google Meet & Calendar...
                                  </>
                                ) : (
                                  <>
                                    <Calendar size={13} />
                                    Book Google Meet Call: {selectedDate} @ {selectedTime}
                                  </>
                                )}
                              </button>
                            ) : (
                              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-center flex flex-col gap-2 shadow-inner">
                                <span className="font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
                                  <ShieldCheck size={14} />
                                  ✓ Booking Securely Confirmed!
                                </span>
                                <p className="text-[10px] text-gray-300 font-mono">
                                  Your 1-hour session is reserved for: {selectedDate} at {selectedTime} MST.
                                </p>
                                <p className="text-[9px] text-emerald-300 font-mono">
                                  Google Meet link & calendar invite sent to {firstNameInput}
                                </p>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* RIGHT: Elegant Google Map with custom styled filters (5 columns) */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                          <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-bold flex items-center gap-1.5">
                            <MapPin size={11} className="text-[#E65C2B]" />
                            Our Red Deer, Alberta Studio
                          </span>

                          {/* Real Google Maps with grayscale invert filters representing true corporate elite styling */}
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[155px] bg-[#080B10] shadow-md group">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.7123456789!2d-113.8112!3d52.2681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sRed%20Deer%2C%20Alberta!2sCanada!5e0!3m2!1sen!2sus!4v1717822941014!5m2!1sen!2sus"
                              className="w-full h-full border-0 grayscale invert opacity-60 group-hover:opacity-85 transition-opacity"
                              allowFullScreen={false}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            ></iframe>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0E14] to-transparent p-2.5 pt-6 pointer-events-none">
                              <span className="text-[9px] font-mono font-bold text-white bg-[#E65C2B]/90 px-1.5 py-0.5 rounded uppercase">2XceL HQ</span>
                            </div>
                          </div>

                          <div className="text-[11px] text-gray-400 font-mono flex flex-col gap-1 leading-normal">
                            <p className="font-bold text-white">2XceL Studio (On-Site Team)</p>
                            <p>Red Deer, Alberta</p>
                            <p>Canada</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom confirmation details feedback */}
                    <div className="mt-6 pt-5  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-gray-400">
                      <div>
                        {isBooked ? (
                          <span className="text-emerald-400 font-bold">✓ CHECK YOUR INBOX: Google Meet link + calendar invite sent to {firstNameInput}</span>
                        ) : (
                          <span>* Strategy session agenda will focus on customized {serviceInterested} workflows.</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setIsBooked(false);
                        }}
                        className="text-xs text-brand-orange hover:underline font-mono uppercase tracking-wider font-bold"
                      >
                        &larr; Re-calibrate custom parameters
                      </button>
                    </div>

                  </motion.div>
                )}

              </div>

            </motion.div>
          </section>

          {/* FOOTER HOOK INSET ACCENT FOOTPRINT - REMOVED FOR DYNAMIC REVEAL */}
        </div>
      </ScrollExpandMedia>

      {/* Blog Post Detail Elegant Overlay Modal */}
      {selectedBlogPost !== null && (() => {
        const post = blogPosts.find(p => p.id === selectedBlogPost);
        if (!post) return null;
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop click close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedBlogPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Body Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="glass p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl bg-[#0B0E14]"
            >
              <button 
                onClick={() => setSelectedBlogPost(null)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center border border-white/10 text-gray-400 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
              
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400 mb-4">
                <span className="text-brand-orange font-bold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                  {post.category}
                </span>
                <span className="text-gray-600">|</span>
                <span>{post.date}</span>
                <span className="text-gray-600">|</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.readTime}
                </span>
              </div>
              
              <h3 className="text-5xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-6 pb-4 border-b border-white/5">
                {post.title}
              </h3>
              
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed font-light space-y-4 whitespace-pre-wrap font-sans">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6  flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E65C2B] font-bold">2XceL Systems Lab</span>
                </div>
                <button 
                  onClick={() => setSelectedBlogPost(null)}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Close Insight
                </button>
              </div>
            </motion.div>
          </div>
        );
      })()}

      <CinematicFooter />

      {/* White-label voice concierge (Lumen) — only renders when configured */}
      <VoiceConcierge />
    </div>
  );
}

