/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animateGlow?: boolean;
  [key: string]: any;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  animateGlow = false,
  className = '',
  ...props
}: ButtonProps) {
  // Styles based on dark/lime design theme
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold tracking-tight rounded-lg transition-all duration-300 pointer-events-auto';
  
  const variantStyles = {
    primary: 'bg-accent-lime text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    secondary: 'bg-accent-blue text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    outline: 'border border-border-custom text-text-main hover:border-accent-lime hover:text-white bg-transparent hover:bg-accent-lime/5',
    ghost: 'text-text-main hover:text-accent-lime hover:bg-white/5 bg-transparent',
    danger: 'bg-accent-orange text-white hover:bg-white hover:text-black'
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${animateGlow && variant === 'primary' ? 'animate-pulse' : ''} ${loading ? 'opacity-80 cursor-wait' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>
      )}

      <span>{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </motion.button>
  );
}
