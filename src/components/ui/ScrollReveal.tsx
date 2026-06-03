/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number; // in seconds
  duration?: number; // in seconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  triggerOnce?: boolean;
  [key: string]: any;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  triggerOnce = true,
}: ScrollRevealProps) {
  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return { origin: { opacity: 0, y: 30 }, enter: { opacity: 1, y: 0 } };
      case 'down':
        return { origin: { opacity: 0, y: -30 }, enter: { opacity: 1, y: 0 } };
      case 'left':
        return { origin: { opacity: 0, x: 30 }, enter: { opacity: 1, x: 0 } };
      case 'right':
        return { origin: { opacity: 0, x: -30 }, enter: { opacity: 1, x: 0 } };
      case 'none':
      default:
        return { origin: { opacity: 0 }, enter: { opacity: 1 } };
    }
  };

  const variants = getDirectionVariants();

  return (
    <motion.div
      initial={variants.origin}
      whileInView={variants.enter}
      viewport={{ once: triggerOnce, margin: '-80px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 1, 0.5, 1], // Custom fast-out cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
