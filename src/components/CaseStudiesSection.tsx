import React, { useState, useRef, useEffect } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import { motion } from "motion/react";
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
  // --- Real AI ad creatives (added one at a time) ---
  {
    common: 'Make Your Money Move',
    binomial: 'EQ Bank · Digital Banking',
    video: '/videos/eq-bank-ad.mp4',
    photo: {
      url: '',
      text: 'EQ Bank AI-generated advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Every Metric, One View',
    binomial: 'Metricool · Social Analytics',
    video: '/videos/metricool-ad.mp4',
    photo: {
      url: '',
      text: 'Metricool AI-generated advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'The Ultimate Driving Machine',
    binomial: 'BMW · Automotive',
    video: '/videos/bmw-ad.mp4',
    photo: {
      url: '',
      text: 'BMW AI-generated advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'One Platform to Run It All',
    binomial: 'HighLevel · CRM Platform',
    video: '/videos/highlevel-ad.mp4',
    photo: {
      url: '',
      text: 'HighLevel AI-generated advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Pretty in Pink',
    binomial: 'The Enchanted Closet · Fashion',
    video: '/videos/enchanted-closet-pink-dress-ad.mp4',
    photo: {
      url: '',
      text: 'The Enchanted Closet pink dress advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Unlock the World',
    binomial: 'Atlas Key · Travel Club',
    video: '/videos/atlas-key-ad.mp4',
    photo: {
      url: '',
      text: 'Atlas Key travel club advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Lace Meets Denim',
    binomial: 'The Enchanted Closet · Fashion',
    video: '/videos/enchanted-closet-lace-cuff-jean-ad.mp4',
    photo: {
      url: '',
      text: 'The Enchanted Closet lace cuff jean advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Agents That Get It Done',
    binomial: 'Taskade · AI Workflows',
    video: '/videos/taskade-ad.mp4',
    photo: {
      url: '',
      text: 'Taskade AI agents and automation advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Bomber Season',
    binomial: 'The Enchanted Closet · Fashion',
    video: '/videos/enchanted-closet-pink-bomber-ad.mp4',
    photo: {
      url: '',
      text: 'The Enchanted Closet pink bomber advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
    }
  },
  {
    common: 'Banking Built for Business',
    binomial: 'EQ Bank · Business',
    video: '/videos/eq-bank-business-ad.mp4',
    photo: {
      url: '',
      text: 'EQ Bank Business Account advertisement',
      pos: 'center',
      by: '2XceL Digital Media'
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

        {/* Featured Case Study: Circular 3D Gallery Interactive Viewport */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <div className="relative w-full flex flex-col items-center justify-center overflow-hidden px-6 sm:px-12 py-12 sm:py-16">
            <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] pointer-events-none" />

            {/* Titles and Controls Overlay */}
            <div className="text-center z-20 max-w-3xl mx-auto flex flex-col gap-3 relative">
              <h2 className="text-3xl sm:text-[2.75rem] font-black text-white leading-tight tracking-tight">
                Curated Custom Ad Portfolio
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-light font-sans max-w-xl mx-auto">
                A rotating reel of real ad creatives we've produced. Hover to pause — click any spot to watch it full-size with sound.
              </p>
            </div>

            {/* 3D Gallery Viewport */}
            <div className="w-full h-[58vh] relative flex items-center justify-center mt-6 overflow-visible">
              <CircularGallery items={galleryData} radius={500} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
