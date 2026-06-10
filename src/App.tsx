import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowRight, Check, Zap, TrendingUp, Bot, Brain, Globe, Quote, ShieldCheck, HelpCircle, Sparkles, Send, Mail, User, Landmark, MessageSquare, Settings, Calendar, Clock, MapPin, Phone, Briefcase, Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { AnimatedIconWrapper, IconAnimationType } from './components/ui/AnimatedIcon';
import { CogIcon } from './components/ui/CogIcon';
import { BotIcon } from './components/ui/BotIcon';
import { WaypointsIcon } from './components/ui/WaypointsIcon';
import { ActivityIcon } from './components/ui/ActivityIcon';
import { CustomCursor } from './components/CustomCursor';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import { CinematicFooter } from './components/ui/motion-footer';
import { BlueprintsSection } from './components/BlueprintsSection';
import { PricingSection } from './components/PricingSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { Toggle } from './components/ui/toggle';
import InteractiveSelector from './components/ui/interactive-selector';

// ==========================================
// SHARED ANIMATION COMPONENTS
// ==========================================

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

const WordsPullUp: React.FC<WordsPullUpProps> = ({ text, className = '', showAsterisk = false }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const words = text.split(' ');

  return (
    <span ref={containerRef} className="inline-flex flex-wrap">
      {words.map((word, idx) => {
        const isLast = idx === words.length - 1;
        return (
          <span key={idx} className="relative overflow-hidden inline-block mr-[0.2em] pt-4 pb-4 -mt-4 -mb-4">
            <motion.span
              className={`inline-block ${className}`}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ color: '#E1E0CC' }}
            >
              {word}
              {isLast && showAsterisk && (
                <span className="absolute top-[-0.15em] -right-[0.35em] text-[0.31em] font-light text-brand-orange">
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
}

const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({ segments, containerClassName = '' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Pre-split segments into complete words to retain proper staggered index timing values
  let globalWordIndex = 0;

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(' ');
        return (
          <span key={segIdx} className="inline-flex flex-wrap">
            {words.map((word, wordIdx) => {
              const currentIdx = globalWordIndex;
              globalWordIndex++;
              return (
                <span key={wordIdx} className="relative overflow-hidden inline-block mr-[0.25em] pt-4 pb-4 -mt-4 -mb-4">
                  <motion.span
                    className={`inline-block ${segment.className || ''}`}
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: 0 } : { y: "110%" }}
                    transition={{
                      duration: 0.8,
                      delay: currentIdx * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

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
// BLOG / INSIGHTS DATA ARCHITECTURE
// ==========================================

const blogPosts = [
  {
    id: 11,
    title: "The Ultimate Business Build: 8 Powerful Features We Integrate into Every Website",
    category: "Featured Insight",
    readTime: "8 min read",
    date: "Jun 05, 2026",
    excerpt: "An in-depth look at our comprehensive custom website setups that combine sales funnels, integrated email sequences, student portals, and automated calendars into a single system.",
    content: "Many online businesses are held back by a messy patchwork of third-party systems. They pay for a separate website builder, an email marketing app, a booking calendar subscription, and another platform just to host their client course or community. This is expensive, complex, and prone to breaking.\n\nWe build custom, all-in-one digital environments that integrate all these features seamlessly under a single roof. Let's explore the key features we integrate into our website builds:\n\n1. High-Converting Sales Funnels\nOur integrated sales funnel technology supports simple, intuitive visual building, easy A/B split testing, one-click upsells, order bumps, and custom countdown timers. You can launch opt-in funnels, high-ticket sales pipelines, or webinar layouts using professionally optimized structures to maximize visual clarity and revenue.\n\n2. Integrated Email Marketing\nYour email subscriber list lives directly inside your website and sales funnels, saving you valuable time. You can easily manage segmentations, run broadcast newsletters, and trigger automated follow-up sequences. With your list connected directly to your products, customer purchases automatically apply tags and trigger delivery sequences without delayed third-party setups.\n\n3. Built-In Affiliate Programs\nBuild an army of advocates to promote and sell your products or services for you. Our built-in affiliate center allows you to set custom commission structures, issue tracked referral links, monitor client sign-ups in real time, and process reward payouts directly, all in-house without external middleware fees.\n\n4. Professional Online Courses\nShare your expertise and build recurring income stream with elegant student portals. Support high-resolution video modules, downloadable PDFs, gradual drip content schedules, section locks, and student progress metrics, keeping lessons beautifully hosted under your main business domain.\n\n5. Absolute Marketing Automation\nSave time and grow with minimal friction. Our rule-based automation engines use basic triggers, conditions, and actions to link your website pages. Instantly tag prospective clients, enroll paying students, send product emails, and coordinate sales pipelines seamlessly without third-party integrations.\n\n6. Built-In Booking Services\nNo more external calendar subscriptions. Our native scheduler lets clients view live availability, book slots, and receive immediate email reminders. It also captures partial deposits or full payments during booking, linking your calendar straight to your active sales systems.\n\n7. Gated Online Communities\nFoster a highly loyal following by launching fully integrated social spaces. Create complimentary or premium member-only forums with posts, custom threads, and comments. Gated community access syncs right with your funnel checkouts, letting you reward buyers with lifetime membership.\n\n8. Isolated Multi-Client Sub-Accounts\nDesigned specifically for teams and agencies managing multiple clients or regional offices. Every sub-account runs as a completely separated sandbox with its own independent templates, funnels, lists, and pages, letting you switch contexts instantly from one centralized management board.\n\nReady to transform your digital presence, eliminate expensive software subscriptions, and deploy a fully unified sales system? Connect with our specialist team today to design your custom business-focused workspace."
  },
  {
    id: 10,
    title: "The ROI of Premium Digital Presentation in Luxury Markets",
    category: "Digital Media",
    readTime: "4 min read",
    date: "May 25, 2026",
    excerpt: "How premium imagery, high-resolution media, and custom layout styling justify premium price structures for high-end clientele.",
    content: "Selling high-value products or consulting packages requires premium packaging. If your website is built on generic templates or displays low-quality visuals, elite customers will look elsewhere, even if your service is superior.\n\nInvesting in top-tier digital presentation is about justifying premium pricing. By styling your pages with high-resolution digital media and clean, customized interfaces, you signal exceptional quality. Your digital assets should establish authority, turning your website into an elite showroom where premium prices are naturally expected and welcomed."
  },
  {
    id: 9,
    title: "Streamlining Client Onboarding for Maximum First-Day Retention",
    category: "Business Strategy",
    readTime: "5 min read",
    date: "May 10, 2026",
    excerpt: "Why a frictionless first-touch experience sets the foundation for high-value, long-term customer relationships.",
    content: "The very first hour a client works with you is the most influential moment of the partnership. If they encounter confusing spreadsheets or delayed introductory emails, buyers remorse can instantly kick in.\n\nBy automating onboarding steps—such as delivery of welcome packs, portal login setup, and direct schedule booking—you make sure your clients receive an instant, professional welcome. This level of immediate response sets clear professional boundaries, lowers client churn, and ensures they start the engagement feeling enthusiastic about your business."
  },
  {
    id: 8,
    title: "How Multi-Channel Marketing Keeps Your Brand Center Stage",
    category: "Digital Media",
    readTime: "4 min read",
    date: "Apr 28, 2026",
    excerpt: "Understand the practical benefit of maintaining cohesive visual messaging across all customer touchpoints.",
    content: "Attracting customers requires appearing consistently wherever they spend time. If your brand looks professional on social media but outdated on your website, prospective buyers will hesitate.\n\nWe focus on creating multi-channel visual harmony. By distributing unified, high-quality digital assets across your website, advertisements, and email communications, we make sure your business builds a strong reputation. Consistent presentation reinforces trust, makes your marketing instantly recognizable, and solidifies your market presence."
  },
  {
    id: 1,
    title: "How Automated Marketing Campaigns Turn Casual Scrollers into Customers",
    category: "Business Strategy",
    readTime: "5 min read",
    date: "Apr 14, 2026",
    excerpt: "Why pairing high-end digital media with smart automation allows brands to scale marketing campaigns without expanding head count.",
    content: "Modern marketing is moving too fast for traditional agency cycles. Waiting weeks for design approvals and paying high creative fees can stall a brand's momentum. We believe the future lies in combining high-end media creation directly with smart delivery workflows.\n\nBy integrating asset production right into your customer touchpoints, your brand can serve highly relevant, professional visuals to different audience segments automatically. This means your promotions remain fresh, highly converting, and completely tailored, all while reducing manual operations to near zero."
  },
  {
    id: 2,
    title: "Ensuring Your Business Appears First in Next-Generation AI Search Results",
    category: "Business Strategy",
    readTime: "4 min read",
    date: "Mar 22, 2026",
    excerpt: "How structuring your website's content helps AI recommenders and modern search engines display your key offerings directly to prospective buyers.",
    content: "Traditional search engines are changing rapidly. Today's customers are turning to AI answers and voice search to find nearby businesses, compare options, and make purchasing decisions on the spot. If your website is not organized for these systems, your business is virtually invisible.\n\nWe build clean, search-friendly structures into every custom website design. By organizing your products, reviews, and event specifications behind the scenes, we make it simple for AI platforms to understand and recommend your brand first. This ensures high-intent buyers find your pricing, service availability, and company expertise immediately without digging through pages of search results."
  },
  {
    id: 3,
    title: "Unlocking Client Growth Without Exploding Your Software Subscriptions",
    category: "Operations",
    readTime: "5 min read",
    date: "Mar 08, 2026",
    excerpt: "Save budget and bypass platform lock-in by using custom-designed, fully integrated workspaces built directly for your team's needs.",
    content: "Software-as-a-Service subscriptions can quickly add up, eating away at your company's margins with monthly per-user fees and forced upgrades. Many growing businesses find themselves paying for dozens of disjointed tools that don’t even talk to each other.\n\nInstead of tying your team to restrictive subscriptions, we construct custom workspaces that consolidate all your operational tools in one place. This approach eliminates the friction of licensing fees, keeps your team inside a single unified system, and lets you grow your client roster without worrying about ballooning software bills."
  },
  {
    id: 4,
    title: "Scaling Personalized Customer Media to Boost E-commerce Sales",
    category: "Digital Media",
    readTime: "6 min read",
    date: "Feb 24, 2026",
    excerpt: "How automated media systems help online brands show customer-relevant visuals that drive double-digit engagement.",
    content: "Imagine a potential client viewing an item on your store, and instantly seeing a polished, highly relevant presentation of that product tailored to their specific lifestyle or regional interests. That level of customization is how elite brands build instant trust.\n\nWe connect your core product directory directly to responsive publishing systems. When customer interest is caught, our setups automatically coordinate and display high-end, customized media matching those specific buyer preferences. The outcome is highly personalized engagement, leading to stronger brand loyalty and a significant climb in conversion rates."
  },
  {
    id: 5,
    title: "How High-Performance Digital Media Slashes Advertising Production Costs",
    category: "Digital Media",
    readTime: "4 min read",
    date: "Feb 10, 2026",
    excerpt: "An analysis of how replacing traditional physical shoots with high-end digital styling saves time and maximizes marketing margins.",
    content: "Organizing traditional marketing photoshoots is a logistical headache. Booking studios, renting equipment, employing models, and arranging shipping can cost thousands of dollars before a single asset is verified.\n\nBy leveraging next-generation digital styling environments, we create lifelike product presentations and model showcase images with flawless visual accuracy. Our clients experience an average 84% reduction in creative production costs, allowing them to reinvest their capital into direct advertising and customer acquisition instead of logistics."
  },
  {
    id: 6,
    title: "How to Connect High-Intent Web Leads to Bookings in Under 30 Seconds",
    category: "Automation",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    excerpt: "How to connect high-intent customer inquiries straight to your booking schedules in under thirty seconds without manual delays.",
    content: "Responding quickly is the single most critical factor in turning an interested lead into a customer. If a high-intent inquiry comes in and waits even an hour for a reply, the connection is lost.\n\nWe construct instant-response systems that accept new inquiries, qualify their needs, and coordinate client meetings automatically. By removing manual delays, you guarantee an immediate, professional first impression and connect premium prospects to direct solutions within 30 seconds."
  },
  {
    id: 7,
    title: "Consolidating Your Operations: Inside Our Unified Business Growth Portals",
    category: "Business Strategy",
    readTime: "4 min read",
    date: "Jan 12, 2026",
    excerpt: "How bringing team tasks, client communications, and campaign tracking into a single hub eliminates daily workflow noise.",
    content: "Toggling back and forth between messaging apps, task lists, and file trackers wastes valuable productive hours every week. When your team's workflow is scattered, details slip through the cracks, and business growth stalls.\n\nWe designed our custom growth portals to bring everything under a single, elegant dashboard. Teams can track inquiries, organize marketing campaign progress, access digital assets, and update schedules in real time. Providing a single source of truth coordinates your staff, reassures your partners, and establishes a secure and scalable architecture for your business operation."
  }
];

// ==========================================
// CORE APPLICATION SYSTEM LAYOUT
// ==========================================

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

  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string>("/The Enchanted Closet-Lace Cuff Jean.mp4");
  const [isMuted, setIsMuted] = useState<boolean>(true);
  
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
  const slotRef = useRef<HTMLSpanElement>(null);
  const [slotCoords, setSlotCoords] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, 
    y: 41 
  });

  useEffect(() => {
    const updateCoords = () => {
      if (slotRef.current) {
        const rect = slotRef.current.getBoundingClientRect();
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
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<number | null>(null);

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

  const aboutParagraphText = "We recognized that most websites are just static brochures. We changed the game by blending cinematic media with AI-powered sales technology. Our mission is to provide businesses with a digital presence that doesn't just look elite but works 24/7—using backend marketing logic and smart automation to hit the sales targets that traditional agencies miss.";
  const characters = aboutParagraphText.split('');

  // Feature Cards Content Architecture matching 2XceL Digital Media Strategy Tip
  const cardEntranceVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: custom * 0.12,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const servicesData: {
    id: string;
    title: string;
    subtitle: string;
    num: string;
    icon: React.ReactNode;
    animation: IconAnimationType;
    description: string;
    list: string[];
  }[] = [
    {
      id: "custom-web-design",
      title: "Custom Web Design",
      subtitle: "Backend Marketing Logic",
      num: "01",
      icon: <CogIcon className="text-brand-orange" size={24} />,
      animation: "none",
      description: "We build premium, custom websites engineered to establish your brand's elite market authority, deliver a flawless client experience, and run automated lead-capture systems on autopilot to maximize sales.",
      list: [
        "Dominant Google search positioning",
        "Automated funnel to capture high-value clients",
        "Instant-loading pages to prevent lost prospects",
        "Clean, direct tracking of pipeline growth"
      ]
    },
    {
      id: "ai-sales-agents",
      title: "24/7 Autonomous AI Sales Agents",
      subtitle: "Configured For Sales Goals",
      num: "02",
      icon: <BotIcon className="text-brand-blue" size={24} />,
      animation: "none",
      description: "Intelligent systems customized around your precise offerings and standard replies, built to engage visitors immediately and autonomously guide them to schedule meetings to hit target KPI indicators.",
      list: [
        "Adaptive conversational logic",
        "Dynamic pipeline coordination",
        "Automated booking schedule integrations",
        "Unbranded database synchronization"
      ]
    },
    {
      id: "next-gen-media",
      title: "Next-Generation Digital Media",
      subtitle: "High-End AI Video",
      num: "03",
      icon: <WaypointsIcon className="text-white" size={24} />,
      animation: "none",
      description: "High-production-value video assets, cinematic image models, and ultra-crisp motion animations designed to eliminate physical shoot constraints and captivate executive-level audiences.",
      list: [
        "Cinematic prompt-driven video assets",
        "Apparel showcasing on virtual models",
        "Zero physical stage constraints",
        "Premium aesthetic asset library"
      ]
    },
    {
      id: "strategic-marketing-plans",
      title: "Strategic Marketing Plans",
      subtitle: "Targeted Audience Campaigns",
      num: "04",
      icon: <ActivityIcon className="text-[#32D74B]" size={24} />,
      animation: "none",
      description: "Strategic acquisition and marketing blueprints aligned with your sales goals, delivering data-driven campaigns leveraging our media assets to capture high-value corporate partners.",
      list: [
        "ROI-focused acquisition funnels",
        "High-SEO content strategy mapping",
        "Dynamic target audience segmentation",
        "Continuous performance optimization"
      ]
    }
  ];

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

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstNameInput || !emailInput || !phoneInput || !industryInput || !serviceInterested) return;
    setIsSimulating(true);
    setSimStep(1);
    
    setTimeout(() => {
      setSimStep(2);
      setTimeout(() => {
        setSimStep(3);
        setTimeout(() => {
          setIsSimulating(false);
          setIsSubmitted(true);
        }, 1200);
      }, 1000);
    }, 900);
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

  return (
    <div className="bg-[#0B0E14] min-h-screen selection:bg-brand-orange selection:text-white relative overflow-hidden" style={{ color: '#DEDBC8' }}>
      
      {/* Custom Circular Magnetic Cursor Trail */}
      <CustomCursor />
      
      {/* Dynamic Background Noise & Spotlights */}
      <div className="absolute inset-0 radial-noise pointer-events-none opacity-40 z-0"></div>
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] gradient-glow pointer-events-none opacity-60 z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] gradient-glow-orange pointer-events-none opacity-40 z-0"></div>
 
      {/* Cinematic Flying Brand Portal Logo */}
      <div 
        className="fixed z-[60] pointer-events-none select-none font-sans uppercase text-white flex flex-col items-center text-center"
        style={{
          left: runningX,
          top: runningY,
          transform: `translate(calc(-50% * ${ease}), -50%)`,
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
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E55B2B] animate-pulse"></div>
              <span ref={slotRef} className="text-xs font-black tracking-[0.2em] uppercase text-slate-800 dark:text-white select-none">
                <span className="text-[#E55B2B]">2</span>
                <span className="text-[#229AD6]">X</span>
                <span className="text-slate-800 dark:text-white">ceL</span>
              </span>
            </div>

            {/* Right side controls with Toggle and Hamburger */}
            <div className="flex items-center gap-3">
              <Toggle
                variant="outline"
                className="group size-8 flex items-center justify-center rounded-full border border-slate-300/30 dark:border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-slate-800 dark:text-white transition-colors"
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
                  { label: "Matrix", href: "#what-we-do" },
                  { label: "Web Design", href: "#custom-web-design" },
                  { label: "AI Blueprints", href: "#blueprints" },
                  { label: "Digital Media", href: "#media-section" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Blog", href: "#blog" },
                ].map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-800 dark:text-white hover:text-brand-orange uppercase font-bold text-xs tracking-[0.15em] transition-colors py-2 border-b border-white/5 last:border-b-0"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#inquiries"
                  onClick={() => setIsMenuOpen(false)}
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
              href="#what-we-do"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              Matrix
            </a>
            <a
              href="#custom-web-design"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              Web Design
            </a>
            <a
              href="#blueprints"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              AI Blueprints
            </a>
            
            <div 
              className="flex items-center gap-1.5 px-1.5 transition-opacity duration-300"
              style={{ opacity: ease > 0.1 ? ease : 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E55B2B] animate-pulse"></div>
              <span ref={slotRef} className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-slate-800 dark:text-white select-none">
                <span className="text-[#E55B2B]">2</span>
                <span className="text-[#229AD6]">X</span>
                <span className="text-slate-800 dark:text-white">ceL</span>
              </span>
            </div>

            <a
              href="#media-section"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              Digital Media
            </a>
            <a
              href="#pricing"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              Pricing
            </a>
            <a
              href="#blog"
              className="tracking-[0.12em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-white cursor-pointer px-1.5 py-1"
            >
              Blog
            </a>

            {/* Premium Interactive Theme Toggle */}
            <Toggle
              variant="outline"
              className="group size-8 flex items-center justify-center rounded-full border border-slate-300/30 dark:border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-slate-800 dark:text-white transition-all duration-300"
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
              className="tracking-[0.12em] uppercase font-bold text-brand-orange hover:opacity-100 transition-opacity duration-300 cursor-pointer px-3 py-1.5 bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/25 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-sm"
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      {/* Cinematic Responsive Scroll Expansion Gateway */}
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={
          mediaType === 'video'
            ? 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1'
            : 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop'
        }
        posterSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc={
          mediaType === 'video'
            ? 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS'
            : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop'
        }
        textBlend
        onProgressChange={setScrollProgress}
      >
        <div className="w-full">
          
          {/* SECTION 1: OUR STORY (MISSION STATEMENT) */}
          <section ref={aboutSectionRef} id="our-story" className="pt-24 pb-12 px-4 md:px-8 w-full flex items-center justify-center relative z-10 scroll-mt-28">
            <div className="w-full max-w-6xl glass rounded-[2.5rem] p-8 md:p-14 lg:p-16 text-center flex flex-col gap-6 relative overflow-hidden backdrop-blur-md shadow-3xl bg-black/25 border border-white/5">
              
              <div className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[10px] sm:text-xs font-bold">
                // Our core philosophy
              </div>

              <div className="flex justify-center text-center">
                <WordsPullUpMultiStyle 
                  segments={[
                    { text: "The Mission Behind", className: "text-white font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2" },
                    { text: " 2XceL Digital Media", className: "text-brand-orange font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2" }
                  ]}
                />
              </div>

              <div className="flex flex-col gap-6 max-w-4xl mx-auto border-t border-white/5 pt-8">
                {[
                  "Led by Executive Director Christian Cométe, 2XceL Digital Media was founded on a simple truth: media without marketing is invisible, and marketing without automation is inefficient.",
                  "We equip brands for the Agentic Web by blending engineered backend technical automation with elite creative media, giving mid-market businesses and rising entrepreneurs the modern infrastructure they need to outpace the competition."
                ].map((sentence, sIdx) => (
                  <motion.p
                    key={sIdx}
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: sIdx * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#E1E0CC]/90 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide leading-relaxed"
                  >
                    {sentence}
                  </motion.p>
                ))}
              </div>

            </div>
          </section>
          
          {/* SECTION 2: WHAT WE DO */}
          <section id="what-we-do" className="py-16 md:py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
              
              <div className="text-center max-w-4xl mx-auto flex flex-col gap-5 mt-10">
                <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5 justify-center">
                  <AnimatedIconWrapper animation="glow" trigger="always">
                    <Zap size={12} className="text-brand-orange animate-pulse" /> 
                  </AnimatedIconWrapper>
                  Elite Digital Production & Growth Automation Matrix
                </span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
                >
                  Digital Media Production & Marketing Strategy | 2XceL Digital Media
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal"
                >
                  We don’t just create—we automate. Our team produces high-impact digital media assets and backs them with a custom-built, AI-ready marketing infrastructure. From custom web design featuring marketing built directly into the backend to intelligent AI Sales Bots trained to push toward your target sales goals, we build the revenue engines your business needs to scale.
                </motion.p>
              </div>

              {/* Two-by-two square grid for production capabilities to prevent clipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
                {servicesData.map((service, idx) => (
                  <FeatureCardWrapper key={service.id} index={idx} variants={cardEntranceVariants}>
                    <div id={service.id} className="w-full h-full glass rounded-[2.5rem] p-8 sm:p-10 xl:p-12 flex flex-col justify-between group transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15 shadow-2xl border border-white/5 min-h-[440px] md:min-h-[460px] scroll-mt-28">
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center shadow-lg shrink-0">
                              <AnimatedIconWrapper animation={service.animation} trigger="hover">
                                {service.icon}
                              </AnimatedIconWrapper>
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-orange transition-colors duration-300 leading-tight">
                                {service.title}
                              </h3>
                              <p className="text-xs text-brand-orange/80 font-mono tracking-wider font-semibold">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-gray-500 font-bold bg-white/5 px-3 py-1 rounded-md border border-white/5 shrink-0">
                            {service.num}
                          </span>
                        </div>
                        
                        {service.description && (
                          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal mt-1">
                            {service.description}
                          </p>
                        )}

                        <ul className="flex flex-col gap-2 pt-2">
                          {service.list.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-snug">
                              <span className="mt-1 text-brand-orange flex-shrink-0">
                                <Check size={11} className="text-brand-orange stroke-[3]" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-6">
                        <a href="#inquiries" className="text-xs font-semibold tracking-wider uppercase text-brand-orange group-hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5">
                          Configure Engine
                        </a>
                        <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-400 border border-white/10 group-hover:border-white/20 group-hover:text-white shadow-md">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </FeatureCardWrapper>
                ))}
              </div>

            </div>
          </section>

          {/* SECTION A: CUSTOM WEB DESIGN */}
          <section id="custom-web-design" className="py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-4xl mx-auto flex flex-col gap-5"
              >
                <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5 justify-center">
                  <AnimatedIconWrapper animation="spin" trigger="always">
                    <Globe size={12} className="text-brand-orange" /> 
                  </AnimatedIconWrapper>
                  Engineering High-Conversion Frontends
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Custom Web Design with Marketing Backend Architecture
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
                  Traditional business websites sit passively on the web like printed brochures. We engineer hand-coded, high-performance web frontends backed by real-time analytics, unbranded lead triggers, and automated database campaign conduits to convert visitors instantly.
                </p>
              </motion.div>

              {/* INTERACTIVE FULL-WIDTH ACCORDION */}
              <div id="interactive-demo" className="flex flex-col gap-6 items-center mt-12 w-full">
                <div className="text-center max-w-2xl flex flex-col gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-orange font-bold">
                    // Live Demo Portal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                    Custom Web Projects Portfolio
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    Explore our high-performance client deployments live. Click on any panel to smoothly expand the project view and access live interactive platforms.
                  </p>
                </div>

                <div className="w-full glass border border-white/5 bg-zinc-950/40 rounded-[2rem] p-4 sm:p-6 relative overflow-hidden shadow-2xl">
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
          <section id="media-section" className="pt-24 pb-12 px-4 md:px-8 w-full relative z-10 border-t border-[#1F2937]/50 bg-black/40 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
              
              <CaseStudiesSection 
                activeVideoSrc={activeVideoSrc}
                setActiveVideoSrc={setActiveVideoSrc}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                getVideoSrc={getVideoSrc}
              />

            </div>
          </section>

          {/* SECTION 2C: AI WORKSPACE BLUEPRINTS SECTION (The Lead Funnel) */}
          <section id="blueprints" className="pt-12 pb-24 px-4 md:px-8 w-full relative z-10 bg-[#080B10]/20 border-t border-white/5 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <BlueprintsSection 
                setServiceInterested={setServiceInterested}
              />
            </div>
          </section>

          {/* SECTION D: STRATEGIC MARKETING PLANS & PRICING */}
          <PricingSection setServiceInterested={setServiceInterested} />

          <div className="hidden">
            <section id="pricing-old" className="py-24 px-4 md:px-8 w-full relative z-10 border-t border-white/5 scroll-mt-28 bg-[#04060a]/40">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
                  <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] font-bold">
                    // Direct starting qualifiers
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white animate-reveal">
                    Transparent Operational Pricing
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                    Quality structures deserve clean pricing anchors. Filter out static approaches and select the target workspace model engineered for your brand expansion.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-6">
                
                {/* Tier 1: Base Blueprints */}
                <div className="glass rounded-[2rem] p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/10 transition-all duration-500 group">
                  <div className="flex flex-col gap-6">
                     <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest font-bold">Tier 01 // Baseline self-start</span>
                      <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">Base Workspace Blueprints</h3>
                    </div>
                    <div className="flex items-baseline gap-1 border-b border-white/5 pb-6">
                      <span className="text-4xl font-black text-white tracking-wide sm:text-5xl">COMPLIMENTARY</span>
                      <span className="text-xs text-gray-500 font-mono uppercase tracking-wider pl-1 font-semibold">Requires Email Opt-In</span>
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
                </div>

                {/* Tier 2: Core Growth & Implementation */}
                <div className="glass rounded-[2rem] p-8 border-2 border-brand-orange/40 bg-black/50 flex flex-col justify-between shadow-brand-orange/5 shadow-2xl relative hover:border-brand-orange transition-all duration-500 group">
                  <div className="absolute top-0 right-6 bg-brand-orange text-white text-[8px] uppercase tracking-widest font-mono font-bold px-4 py-1.5 rounded-b-xl shadow-lg border-l border-r border-b border-white/10">
                    Recommended For Growth
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono uppercase text-brand-orange tracking-widest font-bold">Tier 02 // Core integration</span>
                      <h3 className="text-2xl font-black text-white">Core Growth & Implementation</h3>
                    </div>
                    <div className="flex items-baseline gap-1 border-b border-white/5 pb-6">
                      <span className="text-gray-400 text-sm font-mono mr-1">Starting At</span>
                      <span className="text-5xl font-black text-white">$2,500</span>
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
                </div>

                {/* Tier 3: Full Enterprise Infrastructure */}
                <div className="glass rounded-[2rem] p-8 border border-white/5 bg-black/40 flex flex-col justify-between shadow-2xl relative hover:border-white/10 transition-all duration-500 group">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest font-bold">Tier 03 // Ultimate Infrastructure</span>
                      <h3 className="text-2xl font-black text-white group-hover:text-[#2B8ED9] transition-colors">Full Enterprise Infrastructure</h3>
                    </div>
                    <div className="flex items-baseline gap-1 border-b border-white/5 pb-6">
                      <span className="text-5xl font-black text-white">CUSTOM</span>
                      <span className="text-xs text-gray-500 font-mono uppercase tracking-wider pl-1 font-semibold">Typical Projects: $15k - $35k+</span>
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
                </div>

              </div>

            </div>
          </section>
          </div>

          {/* SECTION 4: INDUSTRY INSIGHTS (BLOG) */}
          <section id="blog" className="py-20 px-4 md:px-8 w-full relative z-10 bg-black/40 border-t border-white/5 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              
              <div className="text-center max-w-4xl mx-auto flex flex-col gap-5">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] font-bold inline-block"
                >
                  // Industry-Leading Insights
                </motion.span>
                <div className="flex justify-center text-center">
                  <WordsPullUpMultiStyle 
                    segments={[
                      { text: "2XceL Digital Media Blog:", className: "text-brand-orange font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl" },
                      { text: " AI, Automation & Creative Media", className: "text-white font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl" }
                    ]}
                  />
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-3xl mx-auto"
                >
                  Stay ahead of the curve. Dive into deep strategic breakdowns covering backend technical automation, hyper-realistic content scaling, and autonomous transaction synchronizations.
                </motion.p>
              </div>

              {/* Symmetrical 3-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post, postIdx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: postIdx * 0.12 }}
                    onClick={() => setSelectedBlogPost(post.id)}
                    className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between shadow-lg cursor-pointer hover:bg-white/[0.04] hover:border-brand-orange/30 group transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-4 pb-3 border-b border-white/5">
                        <span className="text-brand-orange font-bold uppercase tracking-wider bg-brand-orange/10 px-2.5 py-0.5 rounded-full border border-brand-orange/15">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-extrabold text-white group-hover:text-brand-orange transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                      <span className="text-[11px] font-mono text-gray-500">{post.date}</span>
                      <span className="text-xs font-bold text-brand-orange inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                        Read Insight <ArrowRight size={13} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>

          {/* SECTION 4: CLIENT REVIEWS */}
          <section id="reviews" className="py-20 px-4 md:px-8 w-full relative z-10 bg-[#080B10]/40 border-t border-[#FFFFFF]/5 scroll-mt-28">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto flex flex-col gap-3"
              >
                <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] font-bold">
                  // Validated performance
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  2XceL Digital Media Reviews: Success with AI & Automation
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                  Read reviews from business owners who have transformed their operations, upgraded their brand presence, and scaled their reach using our media and marketing systems. See the real-world impact of deploying custom websites that handle lead generation, answer complex inquiries, and automate workflows 24/7.
                </p>
              </motion.div>

              {/* Reviews GRID Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Testimonial 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover="hover"
                  transition={{ duration: 0.6, delay: 0.0, ease: "easeOut" }}
                  className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between shadow-lg hover:bg-white/[0.04] transition-all duration-300 relative"
                >
                  <div className="absolute top-4 right-6 text-white/5 select-none pointer-events-none">
                    <AnimatedIconWrapper animation="wiggle" trigger="hover">
                      <Quote size={80} />
                    </AnimatedIconWrapper>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 text-brand-orange">
                      {"★★★★★".split("").map((c, i) => <span key={i}>{c}</span>)}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal italic relative z-10">
                      “Our old site was pretty but entirely dead—maybe one email contact form every other month. 2XceL built an elite custom layout and plugged in their AI Sales Assistant. On the first weekend, the assistant scheduled 9 high-ticket bookings automatically. Game changer.”
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-5 mt-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-900/30 border border-brand-orange/40 flex items-center justify-center font-bold text-brand-orange font-mono">
                      JH
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Jonathan Vance</div>
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Founder, Vance Luxury Properties</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover="hover"
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between shadow-lg hover:bg-white/[0.04] transition-all duration-300 relative"
                >
                  <div className="absolute top-4 right-6 text-white/5 select-none pointer-events-none">
                    <AnimatedIconWrapper animation="wiggle" trigger="hover">
                      <Quote size={80} />
                    </AnimatedIconWrapper>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 text-brand-orange">
                      {"★★★★★".split("").map((c, i) => <span key={i}>{c}</span>)}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal italic relative z-10">
                      “The speed of response is how you close deals today. 2XceL’s backend architecture answers customer specs within 30 seconds. Clients are fully qualified, scheduled, and mapped before my sales executives even log on in the morning.”
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-5 mt-6">
                    <div className="w-10 h-10 rounded-xl bg-indigo-900/30 border border-brand-blue/40 flex items-center justify-center font-bold text-brand-blue font-mono">
                      SD
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Sarah D’Acosta</div>
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">VP Growth, Helix Biosystems</div>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover="hover"
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between shadow-lg hover:bg-white/[0.04] transition-all duration-300 relative"
                >
                  <div className="absolute top-4 right-6 text-white/5 select-none pointer-events-none">
                    <AnimatedIconWrapper animation="wiggle" trigger="hover">
                      <Quote size={80} />
                    </AnimatedIconWrapper>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 text-brand-orange">
                      {"★★★★★".split("").map((c, i) => <span key={i}>{c}</span>)}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal italic relative z-10">
                      “We were highly skeptical about AI chat looking robotic, but 2XceL proved us completely wrong. The custom knowledge system they configured has pristine accuracy. It has generated $240k in brand-new pipeline value in just 60 days.”
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-5 mt-6">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 bg-opacity-70 border border-white/10 flex items-center justify-center font-bold text-white font-mono">
                      RM
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Ray Monaghan</div>
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Partner, Aetheria Media Group</div>
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>
          </section>

          {/* SECTION 5: LET'S WORK TOGETHER (The Closing CTA & Interactive Calculation form) */}
          <section id="inquiries" className="py-20 px-4 md:px-8 w-full relative z-10 scroll-mt-28">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto glass rounded-[2.5rem] border border-white/10 p-8 md:p-14 shadow-3xl text-center relative overflow-hidden"
            >
              <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-brand-orange/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[10px] font-bold">
                  // Engine calibration
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                  Deploy Your AI Sales Engine with 2XceL Digital Media
                </h2>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                  Stop settling for a static website that just sits there. It’s time for a custom build with built-in marketing logic and an AI sales agent dedicated to your growth. Ready to secure your pipeline and hit your next sales milestone? Let’s build your system today.
                </p>

                {/* Submitting form framework */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmission} className="bg-black/35 p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col gap-6 text-left relative mt-4 shadow-xl">
                    
                    {/* Required Intake Parameters: Row Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* First Name Field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <User size={12} />
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <span className="text-[#a3a3a3] font-mono text-[10px]">//</span>
                          </div>
                          <input 
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
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Mail size={12} />
                          Work Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Mail size={14} className="opacity-60" />
                          </div>
                          <input 
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
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Phone size={12} />
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Phone size={14} className="opacity-60" />
                          </div>
                          <input 
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
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold flex items-center gap-1.5">
                          <Briefcase size={12} />
                          Industry *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Briefcase size={14} className="opacity-60" />
                          </div>
                          <input 
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
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                          Service Interested In *
                        </label>
                        <select 
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
                          {(serviceInterested.startsWith("Free Import:") || serviceInterested.startsWith("Complimentary Import:")) && (
                            <option value={serviceInterested}>{serviceInterested}</option>
                          )}
                        </select>
                      </div>

                      {/* Challenge custom selector */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-mono tracking-widest text-brand-orange font-bold">
                          What is your primary conversion challenge? *
                        </label>
                        <select 
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
                    <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={isSimulating}
                        className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm tracking-wider uppercase px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 w-full animate-none"
                      >
                        {isSimulating ? (
                          <>
                            <Settings className="animate-spin" size={16} />
                            Calibrating Conversion Engine...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Calculate ROI & Proceed to Live Scheduler
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-gray-500 text-center font-mono uppercase tracking-widest">
                        // ALL FIELD VALUES ARE ENCRYPTED SECURELY IN-HOUSE COGNITIVE SALES INTEL
                      </p>
                    </div>

                    {/* Simulation loader stream HUD */}
                    {isSimulating && (
                      <div className="mt-2 bg-[#080B10] border border-white/5 rounded-xl p-4 font-mono text-xs flex flex-col gap-2.5 shadow-inner">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                          <span className="text-gray-400 font-bold">2XceL Lead Engine Compiler:</span>
                        </div>
                        <div className="text-gray-400 flex flex-col gap-1">
                          <p className={simStep >= 1 ? "text-brand-orange font-semibold" : "opacity-40"}>
                            {simStep >= 1 ? "✓ [0.2s] Mapping targeted conversion benchmarks for your industry..." : "○ Waiting to map metrics..."}
                          </p>
                          <p className={simStep >= 2 ? "text-brand-blue font-semibold" : "opacity-40"}>
                            {simStep >= 2 ? `✓ [0.8s] Aligning ${serviceInterested} pipelines with ${industryInput} parameters...` : "○ Waiting to configure voice model..."}
                          </p>
                          <p className={simStep >= 3 ? "text-emerald-400 font-semibold text-xs animate-pulse" : "opacity-40"}>
                            {simStep >= 3 ? "⚙ [1.5s] System calibration validated. Structuring Zoom strategy parameters..." : "○ Waiting for diagnostics trigger..."}
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
                      Report Generated
                    </div>

                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck size={26} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Calibration Complete!</h4>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest text-[#DEDBC8]">Awaiting call booking for: {firstNameInput}</p>
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
                        ✨ <strong className="text-white">Awesome, {firstNameInput}!</strong> To deliver a world-class, custom visual preview and interactive blueprint, we need to gather standard details about your lead routing and operations. <strong className="text-white">Our in-house design and engineering team builds every line of code on-site</strong> to fit your exact business goals—we do not outsource. Let's lock in a 1-Hour Zoom Strategy Session below.
                      </p>
                    </div>

                    {/* Interactive Zoom Call Calendar Scheduling System with real Google Maps wrapper */}
                    <div className="border-t border-white/5 pt-6">
                      <h5 className="text-sm uppercase font-mono tracking-widest text-[#E65C2B] font-bold mb-4 flex items-center gap-1.5">
                        <Calendar size={14} />
                        Choose a Zoom Strategy Call Date & Time *
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
                              Select Available Eastern Time Slot:
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
                          <div className="pt-2 border-t border-white/5 mt-2">
                            {!isBooked ? (
                              <button
                                key="book-btn"
                                type="button"
                                onClick={() => {
                                  setIsBookingLoading(true);
                                  setTimeout(() => {
                                    setIsBookingLoading(false);
                                    setIsBooked(true);
                                  }, 1100);
                                }}
                                disabled={isBookingLoading}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                              >
                                {isBookingLoading ? (
                                  <>
                                    <Settings className="animate-spin" size={14} />
                                    Reserving Slot on Server...
                                  </>
                                ) : (
                                  <>
                                    <Calendar size={13} />
                                    Book Zoom Call: {selectedDate} @ {selectedTime}
                                  </>
                                )}
                              </button>
                            ) : (
                              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-center flex flex-col gap-1 shadow-inner">
                                <span className="font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
                                  <ShieldCheck size={14} />
                                  ✓ Booking Securely Confirmed!
                                </span>
                                <p className="text-[10px] text-gray-300 font-mono">
                                  Your 1-hour session is reserved for: {selectedDate} at {selectedTime} EST.
                                </p>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* RIGHT: Elegant Google Map with custom styled filters (5 columns) */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                          <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 font-bold flex items-center gap-1.5">
                            <MapPin size={11} className="text-[#E65C2B]" />
                            Our Austin, Texas Flagship Studio
                          </span>
                          
                          {/* Real Google Maps with grayscale invert filters representing true corporate elite styling */}
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[155px] bg-[#080B10] shadow-md group">
                            <iframe 
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13762.8427779373976!2d-97.74596392348505!3d30.27315100767119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b506a03e1b7b%3A0xc3f8e561491ba637!2sCapitol%20Tower%2C%20206%20E%209th%20St%2C%20Austin%2C%20TX%2078701!5e0!3m2!1sen!2sus!4v1717822941014!5m2!1sen!2sus" 
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
                            <p>Capitol Tower, 206 E 9th St,</p>
                            <p>Austin, TX 78701</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom confirmation details feedback */}
                    <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-gray-400">
                      <div>
                        {isBooked ? (
                          <span className="text-emerald-400 font-bold">✓ CHECK YOUR INBOX: Confirmation link dispatched to {emailInput}</span>
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
              className="glass p-6 sm:p-8 md:p-10 rounded-[2rem] border border-white/10 w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl bg-[#0B0E14]"
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
              
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-6 pb-4 border-b border-white/5">
                {post.title}
              </h3>
              
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed font-light space-y-4 whitespace-pre-wrap font-sans">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
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
    </div>
  );
}

// Custom wrapper element to clean up individual list visibility checks cleanly
const FeatureCardWrapper = ({ children, index, variants }: { children: React.ReactNode; index: number; variants: any; key?: React.Key }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={variants}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};
