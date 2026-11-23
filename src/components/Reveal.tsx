import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Flies in from the LEFT - Re-animates every time when scrolled into view (once: false)
export const FlyInLeft: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ x: -70, opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Flies in from the RIGHT - Re-animates every time when scrolled into view (once: false)
export const FlyInRight: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ x: 70, opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Flies in from the BOTTOM (Slide & Spring Up)
export const FlyInUp: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Zoom & Scale in with smooth entrance
export const FlyInScale: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Mask reveal for Section Headings
export const RevealHeading: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Staggered card entrance - Re-animates when scrolling up or down
interface RevealCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export const RevealCard: React.FC<RevealCardProps> = ({ children, className = '', index = 0 }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;

  // Alternate left/right/up based on index
  const direction = index % 3 === 0 ? { x: -45, y: 25 } : index % 3 === 1 ? { x: 45, y: 25 } : { x: 0, y: 40 };

  return (
    <motion.div
      initial={{ ...direction, opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ x: 0, y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 4) * 0.06,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
