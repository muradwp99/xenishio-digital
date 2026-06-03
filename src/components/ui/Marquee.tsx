/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface MarqueeProps {
  items: string[];
  speed?: 'slow' | 'medium' | 'fast';
}

export default function Marquee({ items, speed = 'medium' }: MarqueeProps) {
  const speedDurations = {
    slow: 40,
    medium: 25,
    fast: 15
  };

  const duration = speedDurations[speed];

  // Repeat items to ensure smooth wrap boundaries
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-surface border-y border-border-custom py-6 overflow-hidden flex select-none relative z-20">
      {/* Decorative Blur Edge overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{
          ease: 'linear',
          duration: duration,
          repeat: Infinity
        }}
        className="flex whitespace-nowrap gap-12 shrink-0 pr-12"
      >
        {doubledItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-xs font-display font-medium text-text-muted hover:text-accent-lime transition-colors duration-200 uppercase tracking-widest cursor-default">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
