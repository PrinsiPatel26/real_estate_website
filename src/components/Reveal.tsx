import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: 'div' | 'section' | 'li' | 'article';
}

export const LUX = [0.23, 1, 0.32, 1] as const;

const offset: Record<Direction, {x: number;y: number;}> = {
  up: { x: 0, y: 24 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 }
};

export function Reveal({ children, className, delay = 0, direction = 'up', as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const from = offset[direction];

  if (reduce) return <Component className={className}>{children}</Component>;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: from.x, y: from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay, ease: LUX }}>
      
      {children}
    </Component>);

}

/** Thin gold rule that draws itself into view — the recurring section divider. */
export function GoldLine({ className = '', width = '4rem' }: {className?: string;width?: string;}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left bg-gold ${className}`}
      style={{ width }}
      initial={reduce ? undefined : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: LUX }} />);


}