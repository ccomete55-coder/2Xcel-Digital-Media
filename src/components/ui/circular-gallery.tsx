import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
  /** Optional video source. When set, the panel auto-plays this (muted, looping)
   *  instead of the still image. `photo.url` is used as the poster/fallback. */
  video?: string;
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.18, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    // Live pause flag read inside the rAF loop (avoids stale closures)
    const pausedRef = useRef(false);
    useEffect(() => { pausedRef.current = isPaused || activeItem !== null; }, [isPaused, activeItem]);

    // Core Web Vitals: only play the panel videos while the gallery is on-screen.
    // Off-screen, pause them all to save CPU, battery, and network.
    const stageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const el = stageRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting;
          el.querySelectorAll('video').forEach((v) => {
            if (visible) { v.play?.().catch(() => {}); }
            else { v.pause?.(); }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Responsive screen-size tracking
    const [screenSize, setScreenSize] = useState({ width: 300, height: 400, radius: 600 });

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          // Mobile
          setScreenSize({ width: 150, height: 210, radius: 240 });
        } else if (width < 1024) {
          // Tablet
          setScreenSize({ width: 220, height: 300, radius: 380 });
        } else {
          // Desktop
          setScreenSize({ width: 300, height: 400, radius: radius });
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [radius]);

    // Continuous auto-rotation — pauses on hover or when a video is open.
    // Respects the user's reduced-motion preference.
    useEffect(() => {
      const prefersReduced = typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const autoRotate = () => {
        if (!pausedRef.current) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    // Close the lightbox on Escape
    useEffect(() => {
      if (!activeItem) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveItem(null); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [activeItem]);

    const anglePerItem = 360 / items.length;
    
    return (
      <>
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        {...props}
      >
        <div
          ref={stageRef}
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={`${i}-${item.common}`}
                role="group"
                aria-label={item.common}
                className="absolute transition-all duration-300"
                style={{
                  width: `${screenSize.width}px`,
                  height: `${screenSize.height}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${screenSize.radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${screenSize.width / 2}px`,
                  marginTop: `-${screenSize.height / 2}px`,
                  opacity: opacity,
                }}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-lg",
                    item.video && "cursor-pointer hover:border-brand-orange/50"
                  )}
                  onClick={item.video ? () => setActiveItem(item) : undefined}
                  role={item.video ? "button" : undefined}
                  tabIndex={item.video ? 0 : undefined}
                  onKeyDown={item.video ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveItem(item); } } : undefined}
                  aria-label={item.video ? `Play ${item.common} with sound` : undefined}
                >
                  {item.video ? (
                    <video
                      src={item.video}
                      poster={item.photo.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={item.photo.text}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                  ) : (
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Play-with-sound badge (video panels only) */}
                  {item.video && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-brand-orange/80 transition-all duration-300 shadow-xl">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Text labels styled perfectly for consistent readability and theme matching */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 text-white z-10 flex flex-col gap-1">
                    <h2 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight group-hover:text-brand-orange transition-colors">
                      {item.common}
                    </h2>
                    <em className="text-[11px] sm:text-xs italic text-gray-300 font-light block">
                      {item.binomial}
                    </em>
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-brand-orange uppercase font-semibold mt-1">
                      {item.video ? 'Ad by' : 'Photo by'} {item.photo.by}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox player — click a video panel to watch full-size with sound */}
      {activeItem && activeItem.video && createPortal(
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.common} — video player`}
        >
          <button
            onClick={() => setActiveItem(null)}
            aria-label="Close video"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-orange border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeItem.video}
              poster={activeItem.photo.url || undefined}
              controls
              autoPlay
              loop
              playsInline
              className="w-full rounded-2xl shadow-2xl border border-white/10 bg-black max-h-[78vh]"
            />
            <div className="flex flex-col gap-0.5 px-1">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{activeItem.common}</h3>
              <em className="text-xs sm:text-sm italic text-gray-300 font-light">{activeItem.binomial}</em>
              <p className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-semibold mt-1">
                Ad by {activeItem.photo.by}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
      </>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
