import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, VolumeX, Volume2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedIconWrapper } from "./ui/AnimatedIcon";
import { CircularGallery, GalleryItem } from "./ui/circular-gallery";

// --- Integrated 2XceL AI Ad Data Structure ---
const accordionItems = [
  {
    id: 1,
    title: 'Lace Cuff Jean Showcase',
    mediaUrl: 'The Enchanted Closet-Lace Cuff Jean.mp4',
    type: 'video',
  },
  {
    id: 2,
    title: 'Enchanted Closet Ad Campaign',
    mediaUrl: 'Enchanted Closet AD.mp4',
    type: 'video',
  },
  {
    id: 3,
    title: 'Product Focus Blueprint',
    mediaUrl: 'Enchanted Closet product AD.mp4',
    type: 'video',
  },
  {
    id: 4,
    title: 'Autonomous Client Experience',
    mediaUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
    type: 'image',
  },
  {
    id: 5,
    title: 'Predictive Sales Tracking',
    mediaUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    type: 'image',
  },
];

const galleryData: GalleryItem[] = [
  {
    common: 'Lace Cuff Jean Showcase',
    binomial: 'Client: The Enchanted Closet',
    photo: {
      url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80',
      text: 'Lace Cuff Jean Showcase styling',
      pos: '50% 30%',
      by: '2XceL Creative Studio'
    }
  },
  {
    common: 'Enchanted Closet Campaign',
    binomial: 'Client: The Enchanted Closet',
    photo: {
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80',
      text: 'Enchanted Closet luxury wear campaign',
      pos: 'center',
      by: '2XceL Autonomous Engine'
    }
  },
  {
    common: 'Product Focus Blueprint',
    binomial: 'Client: The Enchanted Closet',
    photo: {
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80',
      text: 'Product Detail Spotlight focusing on fabric details',
      pos: '50% 40%',
      by: '2XceL Render Farm'
    }
  },
  {
    common: 'EcoLux Residence Launch',
    binomial: 'Client: EcoLux Properties',
    photo: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
      text: 'EcoLux Residences ultra-luxury presentation portfolio',
      pos: 'center',
      by: '2XceL Production Crew'
    }
  },
  {
    common: 'EcoLux Interior Spotlight',
    binomial: 'Client: EcoLux Properties',
    photo: {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&auto=format&fit=crop&q=80',
      text: 'Premium interior dynamic ad portfolio reel',
      pos: 'center',
      by: '2XceL Cinematic Drone'
    }
  },
  {
    common: 'Aether Cyber-Tech Ad',
    binomial: 'Client: Aether Apparel',
    photo: {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80',
      text: 'Aether Cyber-Wear dynamic model showcase',
      pos: '50% 20%',
      by: '2XceL AI Generation'
    }
  },
  {
    common: 'Novus Skin Serum',
    binomial: 'Client: Novus Cosmetics',
    photo: {
      url: 'https://images.unsplash.com/photo-1608248597481-496100c8c83a?w=900&auto=format&fit=crop&q=80',
      text: 'Novus luxury dynamic liquid cosmetics serum focus',
      pos: 'center',
      by: '2XceL Product Photography'
    }
  },
  {
    common: 'Zenith Watch Narrative',
    binomial: 'Client: Zenith Watch Co.',
    photo: {
      url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&auto=format&fit=crop&q=80',
      text: 'Zenith prestige watch lifestyle advertisement campaign',
      pos: 'center',
      by: '2XceL Macro Lab'
    }
  },
  {
    common: 'Veloce Electric Supercar',
    binomial: 'Client: Veloce Performance',
    photo: {
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&auto=format&fit=crop&q=80',
      text: 'Veloce high-production electric vehicle virtual studio render',
      pos: 'center',
      by: '2XceL Motion Rig'
    }
  },
  {
    common: 'Apex Kinetic Ad Drive',
    binomial: 'Client: Apex Wear',
    photo: {
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80',
      text: 'Apex premium athletic gear performance spot',
      pos: 'center',
      by: '2XceL High-Speed Cam'
    }
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
  getVideoSrc: (path: string) => string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter, getVideoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Sync video play state to the active accordion element
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          console.log("Autoplay blocked prior to user gesture interaction");
        });
      } else {
        videoRef.current.pause();
        setIsMuted(true); // Force mute when panel collapses to prevent background noise
      }
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent structural accordion shifts
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const getResolvedSrc = (mediaUrl: string) => {
    if (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')) {
      return mediaUrl;
    }
    const path = mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`;
    return getVideoSrc(path);
  };

  return (
    <div
      className={`
        relative h-[500px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out glass shrink-0
        ${isActive ? 'w-[280px] sm:w-[450px] md:w-[500px]' : 'w-[60px] sm:w-[70px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Media Engine Node */}
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={getResolvedSrc(item.mediaUrl)}
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={getResolvedSrc(item.mediaUrl)}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Dark overlay for clean typography contrast */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300"></div>

      {/* Audio Engine Interface Controls */}
      {item.type === 'video' && isActive && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Core Typography Captions */}
      <span
        className={`
          absolute text-[#E1E0CC] font-sans font-medium tracking-wide whitespace-nowrap
          transition-all duration-500 ease-in-out z-10
          ${
            isActive
              ? 'bottom-8 left-6 text-base sm:text-xl rotate-0 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm'
              : 'bottom-28 left-1/2 -translate-x-1/2 rotate-90 text-xs sm:text-sm opacity-60'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export interface CaseStudiesSectionProps {
  activeVideoSrc: string;
  setActiveVideoSrc: (src: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  getVideoSrc: (path: string) => string;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  activeVideoSrc,
  setActiveVideoSrc,
  isMuted,
  setIsMuted,
  getVideoSrc
}) => {
  return (
    <div id="case-studies" className="w-full relative z-10">
      <div className="flex flex-col gap-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto flex flex-col gap-4 pb-8 border-b border-white/5 w-full"
        >
          <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[9px] sm:text-[10px] font-bold">
            // Performance Validation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            2XceL Digital Media Case Studies: AI-Driven Results
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-light">
            Explore how our combination of elite digital media and automated sales technology delivers measurable ROI. See how we help our clients replace manual tasks with intelligent systems that convert visitors into partners around the clock.
          </p>
        </motion.div>

        {/* Featured Case Study: Circular 3D Gallery Interactive Viewport */}
        <div className="relative w-full rounded-[2rem] border border-white/5 overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl" style={{ height: '180vh' }}>
          {/* Sticky container */}
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 sm:p-12">
            <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] pointer-events-none" />
            
            {/* Titles and Controls Overlay */}
            <div className="text-center z-20 mb-6 max-w-3xl mx-auto flex flex-col gap-3 relative">
              <span className="text-brand-orange uppercase tracking-[0.3em] font-mono text-[10px] font-bold inline-flex items-center gap-1.5 bg-brand-orange/10 px-3.5 py-1 rounded-full w-max border border-brand-orange/20 mx-auto">
                <AnimatedIconWrapper animation="glow" trigger="always">
                  <Sparkles size={11} className="text-brand-orange animate-pulse" />
                </AnimatedIconWrapper>
                Featured Interactive Experience
              </span>
              <h2 className="text-3xl sm:text-[2.75rem] font-black text-white leading-tight tracking-tight">
                Curated Custom Ad Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light font-sans max-w-xl mx-auto">
                Scroll the page to rotate our state-of-the-art interactive 3D database showcasing extreme high-fidelity digital assets, custom ad campaigns, and intelligent brand designs.
              </p>
            </div>

            {/* 3D Gallery Viewport */}
            <div className="w-full h-[55vh] relative flex items-center justify-center mt-20 sm:mt-28 md:mt-36 overflow-visible">
              <CircularGallery items={galleryData} radius={500} />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 font-mono text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest text-center">
              <span className="animate-pulse">↓ Keep Scrolling to Rotate or Explore More Downward ↓</span>
            </div>
          </div>
        </div>

        {/* Additional case studies grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Case 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 flex flex-col group h-full"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop" 
                alt="EcoLux Case Study" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <span className="absolute bottom-4 left-6 bg-brand-orange text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">
                Real estate + AI Sales Assistant
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-5">
              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-white">EcoLux Residences Portfolio</h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                  Integrated high-production cinematic reels with our 24/7 qualifying AI concierge, streamlining premium rental pipelines on autopilot.
                </p>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 mt-2">
                  <span className="text-2xl font-black text-brand-orange">+214%</span>
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider font-bold text-gray-400">
                    Qualified Bookings generated
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs sm:text-sm font-mono text-gray-500">
                <span>CLIENT FEEDBACK</span>
                <span className="text-brand-orange font-bold">5.0 ★ Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Case 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="glass rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 flex flex-col group h-full"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" 
                alt="Aetheria Case Study" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <span className="absolute bottom-4 left-6 bg-brand-orange text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">
                SaaS funnel automation
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-5">
              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-white">Aetheria Cloud Labs Engagements</h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                  Combined sharp modular branding layout assets with intelligent sales intent mapping models directly in their client scheduling backend.
                </p>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 mt-2">
                  <span className="text-2xl font-black text-brand-orange">$1.2M+</span>
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider font-bold text-gray-400">
                    Automated Pipeline created
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs sm:text-sm font-mono text-gray-500">
                <span>INTEGRATED HUB</span>
                <span className="text-brand-orange font-bold">38s Avg Response</span>
              </div>
            </div>
          </motion.div>

          {/* Case 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="glass rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 flex flex-col group h-full"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" 
                alt="Medical Case Study" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <span className="absolute bottom-4 left-6 bg-brand-orange text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">
                Direct lead routing
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-5">
              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-white">Helix BioSciences Diagnostics</h4>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                  Created highly compliant healthcare inquiries capture framework backed by automated cognitive triage matrices for clinical specialists.
                </p>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 mt-2">
                  <span className="text-2xl font-black text-brand-orange">89%</span>
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider font-bold text-gray-400">
                    Shorter Inquiry Cycle Times
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs sm:text-sm font-mono text-gray-500">
                <span>NATIVE FLOW</span>
                <span className="text-brand-orange font-bold">HIPAA Compliant</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
