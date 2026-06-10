import React from "react";
import { motion, Variants } from "motion/react";

export type IconAnimationType = "pulse" | "float" | "spin" | "wiggle" | "bounce" | "pop" | "glow" | "none";

export interface AnimatedIconWrapperProps {
  children: React.ReactNode;
  animation?: IconAnimationType;
  trigger?: "always" | "hover" | "view";
  className?: string;
}

/**
 * AnimatedIconWrapper gives standard Lucide icons customized, high-polish,
 * fluid motions (pulse, float, wiggle, spin, bounce, spring pop) that trigger
 * either infinitely, on parent hover, or when scrolled into view.
 */
export const AnimatedIconWrapper: React.FC<AnimatedIconWrapperProps> = ({
  children,
  animation = "pop",
  trigger = "hover",
  className = "",
}) => {
  // Define variants matching parent hover propagation
  const iconVariants: Variants = {
    initial: {
      scale: 1,
      rotate: 0,
      y: 0,
      filter: "drop-shadow(0px 0px 0px rgba(230, 92, 43, 0))",
    },
    // Hover states (propagates automatically from parent whileHover="hover")
    hover: {
      scale: animation === "pop" ? 1.18 : animation === "glow" ? 1.05 : 1,
      rotate:
        animation === "spin"
          ? 360
          : animation === "wiggle"
          ? [0, -15, 12, -8, 4, 0]
          : 0,
      y: animation === "bounce" ? [0, -8, 0, -3, 0] : 0,
      filter:
        animation === "glow"
          ? [
              "drop-shadow(0 0 1px rgba(230, 92, 43, 0.1))",
              "drop-shadow(0 0 8px rgba(230, 92, 43, 0.6))",
              "drop-shadow(0 0 1px rgba(230, 92, 43, 0.1))",
            ]
          : "drop-shadow(0px 0px 0px rgba(230, 92, 43, 0))",
      transition: {
        rotate: animation === "spin" ? { duration: 0.8, ease: "easeInOut" } : { duration: 0.6 },
        y: animation === "bounce" ? { duration: 0.6, ease: "easeInOut" } : {},
        scale: { type: "spring", stiffness: 350, damping: 15 },
        filter: { duration: 1, repeat: Infinity },
      },
    },
    // View animations
    view: {
      scale: [0.8, 1.1, 1],
      transition: { type: "spring", stiffness: 300, damping: 18 },
    },
  };

  // Infinite looping animations
  const getLoopingProps = () => {
    if (trigger !== "always") return {};

    switch (animation) {
      case "pulse":
        return {
          animate: {
            scale: [1, 1.08, 1],
            opacity: [0.85, 1, 0.85],
          },
          transition: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          },
        };
      case "float":
        return {
          animate: {
            y: [0, -6, 0],
          },
          transition: {
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          },
        };
      case "glow":
        return {
          animate: {
            filter: [
              "drop-shadow(0 0 2px rgba(230, 92, 43, 0.2))",
              "drop-shadow(0 0 10px rgba(230, 92, 43, 0.75))",
              "drop-shadow(0 0 2px rgba(230, 92, 43, 0.2))",
            ],
          },
          transition: {
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          },
        };
      case "spin":
        return {
          animate: {
            rotate: 360,
          },
          transition: {
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          },
        };
      default:
        return {};
    }
  };

  const isAlways = trigger === "always";
  const isView = trigger === "view";

  return (
    <motion.div
      variants={!isAlways ? iconVariants : undefined}
      initial={!isAlways ? "initial" : undefined}
      whileInView={isView ? "view" : undefined}
      viewport={isView ? { once: true, margin: "-50px" } : undefined}
      className={`inline-flex items-center justify-center ${className}`}
      {...getLoopingProps()}
    >
      {children}
    </motion.div>
  );
};
