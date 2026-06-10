import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoveredType, setHoveredType] = useState<'default' | 'orange' | 'blue' | 'white'>('default');

  // Motion values for the cursor physical location
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trail spring physics parameters
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if user is on a touch device
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    if (touchQuery.addEventListener) {
      touchQuery.addEventListener('change', handleTouchChange);
    }

    if (touchQuery.matches) return;

    // Apply global style to mock the standard cursor
    const style = document.createElement('style');
    style.innerHTML = `
      body, a, button, [role="button"], select, input, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic Element Hover Delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, .interactive');
      if (interactiveEl) {
        setIsHovered(true);
        
        // Contextual color feedback matching 2XceL's Frosted Glass theme
        if (interactiveEl.classList.contains('hover-orange') || interactiveEl.innerHTML.toLowerCase().includes('orange')) {
          setHoveredType('orange');
        } else if (interactiveEl.classList.contains('hover-blue')) {
          setHoveredType('blue');
        } else if (interactiveEl.classList.contains('bg-[#DEDBC8]') || interactiveEl.classList.contains('text-black')) {
          setHoveredType('white');
        } else {
          setHoveredType('default');
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (touchQuery.removeEventListener) {
        touchQuery.removeEventListener('change', handleTouchChange);
      }
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Visual state mappings for cursor outer halo
  let cursorColorClass = 'border-white/40 bg-white/5';
  if (isHovered) {
    if (hoveredType === 'orange') {
      cursorColorClass = 'border-brand-orange bg-brand-orange/10';
    } else if (hoveredType === 'blue') {
      cursorColorClass = 'border-brand-blue bg-brand-blue/10';
    } else if (hoveredType === 'white') {
      cursorColorClass = 'border-white bg-[#DEDBC8]/20';
    } else {
      cursorColorClass = 'border-[#DEDBC8] bg-white/10';
    }
  }

  const cursorScale = isClicking ? 0.75 : isHovered ? 1.8 : 1;
  const innerDotScale = isClicking ? 1.4 : isHovered ? 0.5 : 1;

  return (
    <>
      {/* Dynamic Outer Ring with custom Spring lag feel */}
      <motion.div
        className={`fixed top-0 left-0 w-12 h-12 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] transition-colors duration-300 ${cursorColorClass}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorScale,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      />

      {/* Synchronous Inner Dot for precise targeting */}
      <motion.div
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference ${
          isHovered ? 'bg-[#E65C2B]' : 'bg-[#DEDBC8]'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: innerDotScale,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      />
    </>
  );
};
