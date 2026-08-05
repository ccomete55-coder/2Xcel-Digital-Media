import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code, Cpu, Film, Share2 } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  tags?: string[];
  ctaText?: string;
  icon?: React.ReactNode;
}

export interface InteractiveImageAccordionProps {
  items?: AccordionItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  onItemSelect?: (item: AccordionItem) => void;
}

const defaultItems: AccordionItem[] = [
  {
    id: 'development',
    title: 'Custom Web Design',
    subtitle: 'Hand-Coded Next-Gen Frontends',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    description: 'We code ultra-fast WebGL-infused, high-converting interfaces using clean semantic HTML, custom speed optimizations, and SEO frameworks, ensuring your business ranks first and loads instantly.',
    tags: ['Next.js', 'Tailwind', 'WebGL', 'SEO Ready'],
    icon: <Code className="text-brand-orange" size={20} />,
    ctaText: 'Explore Frontend Architecture'
  },
  {
    id: 'marketing',
    title: 'Marketing Automation',
    subtitle: 'High-Conversion Funnels & Backends',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    description: 'Stop relying on slow third-party plugins. Our integrated backends power automated email workflows, native booking, lead captures, and affiliate tracking seamlessly in a centralized workspace.',
    tags: ['Database SDK', 'Email Flows', 'Analytics', 'Funnels'],
    icon: <Share2 className="text-brand-blue" size={20} />,
    ctaText: 'Unlock Growth Architecture'
  },
  {
    id: 'ai-bot',
    title: 'AI Conversational Assistant',
    subtitle: 'Instant Chat-to-Meeting Pipeline',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
    description: 'Fully customized conversational agents trained on your offerings. They autonomously interact with inbound visual triggers, answer support questions, and guide prospects directly onto your calendar.',
    tags: ['Gemini', 'Conversational', 'KPI Optimizers', '24/7 Agent'],
    icon: <Cpu className="text-white" size={20} />,
    ctaText: 'Deploy AI Sales Bot'
  },
  {
    id: 'media',
    title: 'Cinematic Media Production',
    subtitle: 'Elite Prompt-to-Video Pipelines',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    description: 'Eradicate expensive filming schedules. We generate high-end, visual media, interactive custom assets, and cinematic mockups tailored to capture attention and impress Fortune 500 decision-makers.',
    tags: ['Sora-Ready', 'Brand Identity', 'Lottie Design', '4K Rendering'],
    icon: <Film className="text-[#32D74B]" size={20} />,
    ctaText: 'Review Creative Assets'
  }
];

export const InteractiveImageAccordion = ({
  items = defaultItems,
  orientation = 'horizontal',
  className = '',
  onItemSelect
}: InteractiveImageAccordionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <div className={`w-full ${className}`}>
      <div 
        className={`flex ${
          orientation === 'horizontal' ? 'flex-col lg:flex-row' : 'flex-col'
        } gap-4 h-[650px] sm:h-[600px] lg:h-[520px] w-full transition-all duration-500`}
      >
        {items.map((item, index) => {
          const isActive = displayIndex === index;
          
          return (
            <motion.div
              key={item.id}
              onClick={() => {
                setActiveIndex(index);
                if (onItemSelect) onItemSelect(item);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 transition-all duration-300 group"
              animate={{
                flexGrow: isActive ? 6 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 26,
              }}
              style={{
                background: '#04070a',
                height: orientation === 'vertical' ? (isActive ? '250px' : '80px') : '100%',
              }}
            >
              {/* Background Image with elegant overlay */}
              <div className="absolute inset-0 z-0 h-full w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover transition-all duration-1000 ${
                    isActive ? 'scale-105 filter saturate-100 brightness-[0.4]' : 'scale-100 filter saturate-50 brightness-[0.2] group-hover:brightness-[0.3]'
                  }`}
                />
                {/* Visual Gradient Masking */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-90' : 'opacity-70'
                  }`} 
                />
              </div>

              {/* Card Main Info Structure */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 h-full">
                
                {/* Top content - Header/Category */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${
                      isActive 
                        ? 'bg-brand-orange/20 border-brand-orange/30 text-brand-orange shadow-lg scale-110' 
                        : 'bg-black/40 border-white/10 text-white/65 group-hover:text-white group-hover:border-white/20'
                    }`}>
                      {item.icon || <Sparkles size={16} />}
                    </div>
                    {/* Collapsed label */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`${isActive ? 'block' : 'hidden md:hidden'} font-mono uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold text-brand-orange inline-flex items-center gap-1.5`}
                    >
                      {item.subtitle}
                    </motion.div>
                  </div>

                  {/* Vertical numbering icon */}
                  <div className="font-mono text-sm font-bold text-white/20 select-none group-hover:text-white/40 transition-colors">
                    {`0${index + 1}`}
                  </div>
                </div>

                {/* Bottom contents */}
                <div className="flex flex-col gap-3">
                  {/* Title heading */}
                  <h3 className={`text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight transition-all duration-300 ${
                    !isActive ? 'lg:-rotate-90 lg:origin-left lg:absolute lg:bottom-12 lg:left-14 lg:whitespace-nowrap lg:mt-0' : ''
                  }`}>
                    {item.title}
                  </h3>

                  {/* Dynamic expanded details section */}
                  <div className={`${isActive ? 'block' : 'hidden'} flex flex-col gap-4 mt-1`}>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light max-w-xl">
                      {item.description}
                    </p>

                    {/* Tag bubbles */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-white/5 border border-white/10 hover:border-brand-orange/20 text-gray-300 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA Handshake */}
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Scroll to inquiries
                        const inquiries = document.getElementById('inquiries');
                        if (inquiries) {
                          inquiries.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-orange mt-2 w-max group/btn cursor-pointer"
                    >
                      <span>{item.ctaText || 'Get Started Now'}</span>
                      <ArrowRight size={14} className="text-brand-orange group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
