import React from 'react';
import { Reveal, GoldLine } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  lines: string[];
  align?: 'left' | 'center';
  id?: string;
  level?: 'h1' | 'h2';
  children?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  lines,
  align = 'left',
  id,
  level = 'h2',
  children
}: SectionHeadingProps) {
  const Heading = level;
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ?
      <Reveal>
          <p className="eyebrow text-[#c9a227]">{eyebrow}</p>
        </Reveal> :
      null}
      <Reveal delay={0.05}>
        <GoldLine className={`mt-5 ${isCenter ? 'mx-auto' : ''}`} width="3.5rem" />
      </Reveal>
      <Reveal delay={0.08}>
        <Heading
          id={id}
          className="mt-6 font-display text-[2.2rem] font-light leading-[1.02] tracking-[-0.03em] text-[#111111] sm:text-[2.9rem] lg:text-[3.5rem]">
          
          {lines.map((line, index) =>
          <span key={line} className="block">
              {index === lines.length - 1 && lines.length > 1 ?
            <span className="text-[#c9a227]">{line}</span> :

            line
            }
            </span>
          )}
        </Heading>
      </Reveal>
      {children ?
      <Reveal delay={0.12}>
          <div className="mt-6 text-[0.95rem] leading-relaxed text-[#666666]">{children}</div>
        </Reveal> :
      null}
    </div>);

}