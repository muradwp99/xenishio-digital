/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth trailing lag effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch inputs to prevent rendering double pointers on phones
    const detectTouch = () => {
      const touchEnabled =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchEnabled);
      if (!touchEnabled) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    detectTouch();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Watch for hovering clickable items to trigger scaling animations
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-scale');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Trailing Ring */}
      <motion.div
        id="custom-cursor-ring"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          borderColor: isHovered ? 'var(--color-accent-lime)' : '#ffffff',
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.2 }}
        className="fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      />

      {/* Inner Immediate Core Dot */}
      <motion.div
        id="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-lime rounded-full pointer-events-none z-[9999] hidden lg:block"
      />
    </>
  );
}
