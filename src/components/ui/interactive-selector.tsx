"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaLaptopCode, 
  FaShoppingCart, 
  FaChartLine, 
  FaHeartbeat, 
  FaGraduationCap,
  FaLeaf,
  FaUsers,
  FaGlobe,
  FaMusic
} from 'react-icons/fa';

export interface OptionItem {
  title: string;
  description: string;
  image: string;
  video?: string;
  icon: React.ReactNode;
  url: string;
}

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  // Custom Web Project Portfolio Data with videos pointing to the public folder directory
  const options: OptionItem[] = [
    {
      title: "The Enchanted Closet",
      description: "Ladies Clothing Destination - E-Commerce Store",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      video: "/videos/enchanted-closet-bg.mp4",
      icon: <span className="text-white"><FaShoppingCart size={24} /></span>,
      url: "https://theenchantedcloset.ca/"
    },
    {
      title: "The Conscious Collective",
      description: "Strategic HR Consulting & Workplace Culture Advisory",
      image: "/conscious-collective-placeholder.svg",
      video: "/videos/conscious-collective-bg.mp4",
      icon: <span className="text-white"><FaLeaf size={24} /></span>,
      url: "https://theconsciouscollective.ca/"
    },
    {
      title: "Atlas Key Co.",
      description: "Exclusive Membership Discount Travel Club",
      image: "/Atlas-Key-co.png",
      video: "/videos/Atlas Key .mp4",
      icon: <span className="text-white"><FaGlobe size={24} /></span>,
      url: "https://www.atlaskey.ca/"
    },
    {
      title: "Ampcrew",
      description: "Music clipping site & marketplace for musicians and fans to connect",
      image: "/ampcrew-placeholder.svg",
      video: "/Ampcrew-Phoenix.mp4",
      icon: <span className="text-white"><FaMusic size={24} /></span>,
      url: "#"
    },
    {
      title: "Engineering Portfolio",
      description: "Interactive high-performance 3D portfolio assets",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-designer-with-creative-team-talking-and-working-42240-large.mp4",
      icon: <span className="text-white"><FaLaptopCode size={24} /></span>,
      url: "https://example.com/developer-portfolio"
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-transparent font-sans text-white py-4 relative"> 
      
      {/* Options Container with Responsive Stacking (flex-col on mobile, flex-row on md) */}
      <div className="options flex flex-col md:flex-row w-full max-w-full min-h-[500px] md:h-[450px] mx-0 items-stretch overflow-hidden relative rounded-xl border border-zinc-800/80 bg-zinc-950/40">
        {options.map((option, index) => {
          const isSelected = activeIndex === index;
          return (
            <div
              key={index}
              className={`option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out`}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) 
                  ? 'translate(0)' 
                  : 'translateY(40px)',
                minWidth: '60px',
                minHeight: '60px',
                margin: 0,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isSelected ? '#ff3e00' : 'rgba(255, 255, 255, 0.05)',
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: isSelected 
                  ? '0 20px 60px rgba(0,0,0,0.85), inset 0 0 40px rgba(255,62,0,0.15)' 
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: isSelected ? '6 1 0%' : '1 1 0%',
                zIndex: isSelected ? 10 : 1,
                willChange: 'flex-grow, box-shadow, height, width'
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Auto-playing background video when partition is expanded */}
              {isSelected && option.video && (
                <video
                  key={`video-${index}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover animate-fadeIn z-0"
                  style={{ mixBlendMode: 'normal' }}
                >
                  <source src={option.video} type="video/mp4" />
                </video>
              )}

              {/* Shadow overlay gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 z-10"
                style={{ opacity: isSelected ? 0.92 : 0.5 }}
              />
              
              {/* Component content info banner */}
              <div className="label absolute left-0 right-0 bottom-4 flex flex-col md:flex-row md:items-center justify-start z-20 px-4 md:px-5 gap-3 w-full">
                <div className={`icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-zinc-900/95 backdrop-blur-md shadow-md border ${isSelected ? 'border-brand-orange text-brand-orange scale-110' : 'border-zinc-700 text-white'} flex-shrink-0 transition-all duration-300`}>
                  {option.icon}
                </div>
                <div className="info text-white overflow-hidden flex-grow">
                  <div 
                    className="main font-bold text-base md:text-lg transition-all duration-700 ease-in-out truncate tracking-tight text-white"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'translateX(0)' : 'translateX(15px)'
                    }}
                  >
                    {option.title}
                  </div>
                  <div 
                    className="sub text-[11px] md:text-xs text-zinc-300/90 transition-all duration-700 ease-in-out truncate font-light"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'translateX(0)' : 'translateX(15px)'
                    }}
                  >
                    {option.description}
                  </div>
                </div>

                {/* Interaction Actions */}
                {isSelected && (
                  <div className="pointer-events-auto mt-2 md:mt-0 flex-shrink-0 animate-fadeInTop delay-300">
                    {/* Launch Window Button */}
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-brand-orange hover:bg-brand-orange/90 hover:scale-105 text-white rounded-lg text-xs font-mono font-bold tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-lg shadow-brand-orange/20 border border-brand-orange/30 active:scale-95"
                    >
                      Launch Live App ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveSelector;
