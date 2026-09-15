import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { brand, whatsappLink, callLink } from '../data/brand';
import { heroContent } from '../data/site';
import { HERO_IMAGE } from '../data/projects';
import { LUX } from './Reveal';

const CTA_HEIGHT = { height: '3.25rem' };

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink-900 pb-10 pt-28 sm:pb-14">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={reduce ? undefined : { scale: 1.04 }}
        animate={reduce ? undefined : { scale: 1.14 }}
        transition={{ duration: 26, ease: 'linear' }}>
        
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-900/72" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3"
        style={{ background: 'linear-gradient(to top, #0A0A0A 8%, rgba(10,10,10,0.15) 100%)' }} />
      

      <div className="mx-auto w-full max-w-shell px-5 lg:px-10">
        <motion.p
          className="eyebrow text-gold"
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: LUX }}>
          
          {heroContent.eyebrow}
        </motion.p>

        <motion.span
          aria-hidden="true"
          className="mt-5 block h-px bg-gold"
          initial={reduce ? undefined : { width: 0 }}
          animate={reduce ? undefined : { width: '5rem' }}
          transition={{ duration: 0.3, delay: 0.1, ease: LUX }} />
        

        <h1 className="mt-7 font-display text-[2.4rem] font-light leading-[1.02] tracking-tight text-paper sm:text-[3.6rem] lg:text-[5rem]">
          {heroContent.headingLines.map((line, index) =>
          <span key={line} className="block overflow-hidden">
              <motion.span
              className="block"
              initial={reduce ? undefined : { y: '110%' }}
              animate={reduce ? undefined : { y: '0%' }}
              transition={{ duration: 0.3, delay: 0.14 + index * 0.07, ease: LUX }}>
              
                {index === heroContent.headingLines.length - 1 ?
              <span className="italic text-gold-bright">{line}</span> :

              line
              }
              </motion.span>
            </span>
          )}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-[0.95rem] leading-relaxed text-paper/70 sm:text-base"
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
            className="group flex items-center justify-center gap-2 bg-gold px-7 text-[0.7rem] uppercase tracking-micro text-ink-900 transition-colors duration-150 ease-lux hover:bg-gold-bright"
            style={CTA_HEIGHT}>
            
            Explore Projects
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-lux group-hover:translate-x-1"
              aria-hidden="true" />
            
          </Link>
          <a
            href={callLink(brand.founder.phone)}
            className="flex items-center justify-center gap-2 border border-paper/25 px-7 text-[0.7rem] uppercase tracking-micro text-paper transition-colors duration-150 ease-lux hover:border-gold hover:text-gold-bright"
            style={CTA_HEIGHT}>
            
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            Talk to an Expert
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-gold/40 px-7 text-[0.7rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900"
            style={CTA_HEIGHT}>
            
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>);

}