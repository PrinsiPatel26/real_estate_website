import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon } from 'lucide-react';
import { brand, callLink } from '../data/brand';
import { heroContent } from '../data/site';
import { HERO_IMAGE } from '../data/projects';
import { LUX } from './Reveal';

const CTA_HEIGHT = { height: '3.25rem' };

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#050505] pb-10 pt-28 sm:pb-14">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        initial={reduce ? undefined : { scale: 1.04 }}
        animate={reduce ? undefined : { scale: 1.12 }}
        transition={{ duration: 26, ease: 'linear' }}>
        
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover object-center" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#050505]/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.42) 100%), linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 100%)'
        }} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.18) 100%)' }} />
      

      <div className="mx-auto w-full max-w-shell px-5 lg:px-10">
        <motion.p
          className="eyebrow text-[#d4af37]"
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: LUX }}>
          
          {heroContent.eyebrow}
        </motion.p>

        <motion.span
          aria-hidden="true"
          className="mt-5 block h-px bg-[#d4af37]"
          initial={reduce ? undefined : { width: 0 }}
          animate={reduce ? undefined : { width: '5rem' }}
          transition={{ duration: 0.3, delay: 0.1, ease: LUX }} />
        

        <h1 className="mt-7 max-w-4xl font-display text-[2.6rem] font-light leading-[0.98] tracking-[-0.04em] text-[#ffffff] sm:text-[4rem] lg:text-[5.4rem]">
          {heroContent.headingLines.map((line, index) =>
          <span key={line} className="block overflow-hidden">
              <motion.span
              className="block"
              initial={reduce ? undefined : { y: '110%' }}
              animate={reduce ? undefined : { y: '0%' }}
              transition={{ duration: 0.3, delay: 0.14 + index * 0.07, ease: LUX }}>
              
                {index === heroContent.headingLines.length - 1 ?
              <span className="italic text-[#d4af37]">{line}</span> :

              line
              }
              </motion.span>
            </span>
          )}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-[0.95rem] leading-relaxed text-white/75 sm:text-base"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.36, ease: LUX }}>
          
          {heroContent.supporting}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.44, ease: LUX }}>
          
          <Link
            to="/projects"
            className="group flex items-center justify-center gap-2 bg-[#d4af37] px-7 text-[0.7rem] uppercase tracking-[0.2em] text-[#111111] transition-colors duration-150 ease-lux hover:bg-[#e5c45a]"
            style={CTA_HEIGHT}>
            
            Explore Projects
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-lux group-hover:translate-x-1"
              aria-hidden="true" />
            
          </Link>
          <a
            href={callLink(brand.founder.phone)}
            className="flex items-center justify-center gap-2 border border-white/25 bg-[#050505]/30 px-7 text-[0.7rem] uppercase tracking-[0.2em] text-white transition-colors duration-150 ease-lux hover:border-[#d4af37] hover:text-[#d4af37]"
            style={CTA_HEIGHT}>
            
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            Talk to an Expert
          </a>
        </motion.div>
      </div>
    </section>);

}