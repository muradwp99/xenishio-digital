/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'lime' | 'blue' | 'green' | 'orange' | 'outline';
  className?: string;
  [key: string]: any;
}

export default function Badge({
  children,
  variant = 'outline',
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wider uppercase';
  
  const variantStyles = {
    lime: 'bg-accent-lime/10 border border-accent-lime/30 text-accent-lime',
    blue: 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue',
    green: 'bg-brand-green/10 border border-brand-green/30 text-brand-green',
    orange: 'bg-accent-orange/10 border border-accent-orange/30 text-accent-orange',
    outline: 'border border-border-custom bg-surface text-text-muted hover:border-text-muted transition-colors duration-300'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
