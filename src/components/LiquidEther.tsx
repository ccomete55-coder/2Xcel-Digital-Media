import React, { useEffect, useRef } from 'react';

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  color0?: string;
  color1?: string;
  color2?: string;
}

export const LiquidEther: React.FC<LiquidEtherProps> = ({
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  mouseForce = 32,
  cursorSize = 75,
  isViscous = true,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 22,
  resolution = 0.3,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.35,
  autoIntensity = 1.4,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  color0 = '#E55B2B',
  color1 = '#229AD6',
  color2 = '#DEDBC8',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; color: string }>>([]);
  const animationRef = useRef<number>();
  const autoTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const palette = [color0, color1, color2];

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(width * height * resolution * 0.001);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    initializeParticles();

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Auto demo movement
    let autoTime = 0;
    const autoDemo_ = () => {
      if (autoDemo) {
        autoTime += autoSpeed * 0.016; // Assuming 60fps
        const x = Math.sin(autoTime) * width * 0.3 + width * 0.5;
        const y = Math.cos(autoTime * 0.7) * height * 0.3 + height * 0.5;
        mouseRef.current = { x, y };
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#0B0E14';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      autoDemo_();

      // Update particles
      particlesRef.current.forEach((particle) => {
        // Apply mouse force
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cursorSize) {
          const force = (1 - dist / cursorSize) * mouseForce;
          particle.vx += (dx / dist) * force * 0.1;
          particle.vy += (dy / dist) * force * 0.1;
        }

        // Apply viscosity
        if (isViscous) {
          particle.vx *= (100 - viscous) / 100;
          particle.vy *= (100 - viscous) / 100;
        } else {
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce or wrap
        if (isBounce) {
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
          particle.y = Math.max(0, Math.min(height, particle.y));
        } else {
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Draw cursor circle
      ctx.strokeStyle = palette[0];
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, cursorSize, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Auto resume after interaction
    if (autoDemo) {
      const resetAuto = () => {
        clearTimeout(autoTimeoutRef.current);
        autoTimeoutRef.current = setTimeout(() => {
          autoTime = 0;
        }, autoResumeDelay);
      };

      canvas.addEventListener('mousemove', resetAuto);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mousemove', resetAuto);
        cancelAnimationFrame(animationRef.current!);
      };
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current!);
    };
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    color0,
    color1,
    color2,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      style={{
        width: '100%',
        height: 600,
        display: 'block',
        borderRadius: '12px',
      }}
    />
  );
};

export default LiquidEther;
