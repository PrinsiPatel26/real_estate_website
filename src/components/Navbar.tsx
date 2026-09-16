import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MenuIcon, XIcon, PhoneIcon, MessageCircleIcon } from 'lucide-react';
import { brand, navigation, whatsappLink, callLink } from '../data/brand';
import { LUX } from './Reveal';
import { NavbarProjectSearch } from './NavbarProjectSearch';

interface NavbarProps {
  /** Home has a full-bleed hero, so the bar starts transparent there only. */
  transparentOnTop?: boolean;
}

export function Navbar({ transparentOnTop = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || !transparentOnTop || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-lux ${
      solid ? 'border-b border-gold/15 bg-ink-900/95 backdrop-blur-sm' : 'bg-transparent'}`
      }>
      
      <div className="mx-auto flex h-[72px] max-w-shell items-center justify-between gap-4 px-5 sm:h-[78px] lg:h-[82px] lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${brand.name} — home`}>
          <span className="flex h-12 items-center justify-center rounded-sm bg-ink-900 px-2 ring-1 ring-gold/25 sm:h-14 lg:h-16">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-full w-auto max-w-[132px] object-contain sm:max-w-[158px] lg:max-w-[180px]" />
            
          </span>
          <span className="hidden xs:block">
            <span className="block font-display text-[1rem] leading-tight text-paper">
              Chauhans Realtors
            </span>
            <span className="block text-[0.52rem] uppercase tracking-micro text-gold/70">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                className={({ isActive }) =>
                `group relative block py-2 text-[0.7rem] uppercase tracking-micro transition-colors duration-150 ease-lux ${
                isActive ? 'text-gold-bright' : 'text-paper/70 hover:text-paper'}`

                }>
                
                  {({ isActive }) =>
                <>
                      {item.label}
                      <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-[width] duration-200 ease-lux ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'}`
                    } />
                  
                    </>
                }
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Chauhans Realtors on WhatsApp"
            className="flex h-10 w-10 items-center justify-center border border-gold/30 text-gold transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
            
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <NavbarProjectSearch onNavigate={() => setOpen(false)} />
          <Link
            to="/contact"
            className="hidden h-10 items-center border border-gold bg-gold px-5 text-[0.68rem] uppercase tracking-micro text-ink-900 transition-colors duration-150 ease-lux hover:bg-gold-bright sm:flex">
            
            Enquire Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center border border-gold/30 text-paper transition-colors duration-150 ease-lux hover:border-gold lg:hidden">
            
            {open ? <XIcon className="h-4 w-4" aria-hidden="true" /> : <MenuIcon className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ?
        <motion.div
          id="mobile-menu"
          initial={reduce ? undefined : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: LUX }}
          className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-gold/15 bg-ink-900 lg:hidden">
          
            <nav aria-label="Mobile" className="px-5 pb-8 pt-4">
              <ul className="divide-y divide-gold/10">
                {navigation.map((item) =>
              <li key={item.to}>
                    <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                  `block py-4 font-display text-xl ${isActive ? 'text-gold-bright' : 'text-paper/85'}`
                  }>
                  
                      {item.label}
                    </NavLink>
                  </li>
              )}
              </ul>
              <div className="mt-6 grid gap-3">
                <Link
                to="/contact"
                className="flex h-12 items-center justify-center bg-gold text-[0.7rem] uppercase tracking-micro text-ink-900">
                
                  Enquire Now
                </Link>
                <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 border border-gold/40 text-[0.7rem] uppercase tracking-micro text-gold">
                
                  <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
                <a
                href={callLink(brand.founder.phone)}
                className="flex h-12 items-center justify-center gap-2 border border-paper/15 text-[0.7rem] uppercase tracking-micro text-paper/80">
                
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  {brand.founder.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div> :
        null}
      </AnimatePresence>
    </header>);

}