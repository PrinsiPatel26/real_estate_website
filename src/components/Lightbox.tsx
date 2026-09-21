import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import type { GalleryImage } from '../types/project';
import { LUX } from './Reveal';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const reduce = useReducedMotion();
  const isOpen = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    setZoomed(false);
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    setZoomed(false);
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) {
      setZoomed(false);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {isOpen && current ?
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Project gallery"
        className="fixed inset-0 z-[60] flex flex-col bg-ink-900/97"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.2, ease: LUX }}>
        
          <div className="flex items-center justify-between border-b border-gold/15 px-4 py-3 sm:px-6">
            <p className="text-[0.65rem] uppercase tracking-micro text-gold">
              {(index ?? 0) + 1} / {images.length}
            </p>
            <div className="flex items-center gap-2">
              <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              className="flex h-10 w-10 items-center justify-center border border-gold/25 text-gold transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
              
                {zoomed ?
              <ZoomOutIcon className="h-4 w-4" aria-hidden="true" /> :

              <ZoomInIcon className="h-4 w-4" aria-hidden="true" />
              }
              </button>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              autoFocus
              className="flex h-10 w-10 items-center justify-center border border-gold/25 text-paper transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
            <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: LUX }}
            onClick={() => setZoomed((value) => !value)}
            className={`select-none object-contain transition-transform duration-200 ease-lux ${
            zoomed ?
            'max-h-none max-w-none scale-150 cursor-zoom-out' :
            'max-h-full max-w-full cursor-zoom-in'}`
            } />
          
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-gold/15 px-4 py-4 sm:px-6">
            <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/25 text-paper transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
            
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="min-w-0 flex-1 text-center text-xs leading-relaxed text-paper/55">{current.alt}</p>
            <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/25 text-paper transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
            
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div> :
      null}
    </AnimatePresence>);

}

/** Masonry-style gallery that opens into the lightbox. Swipeable rail on mobile. */
export function ProjectGallery({ images }: {images: GalleryImage[];}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="mobile-card-rail gap-3 pb-2 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:snap-none lg:gap-4">
        {images.map((image, index) =>
        <li
          key={image.src + index}
          className={`w-[78%] shrink-0 snap-start sm:w-auto ${
          index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`
          }>
          
            <button
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative block h-full w-full overflow-hidden"
            aria-label={`Open image ${index + 1}: ${image.alt}`}>
            
              <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-300 ease-lux group-hover:scale-[1.05] ${
              index === 0 ? 'aspect-[4/3] sm:h-full' : 'aspect-[4/3]'}`
              } />
            
              <span
              aria-hidden="true"
              className="absolute inset-0 border border-transparent bg-ink-900/10 transition-colors duration-200 ease-lux group-hover:border-gold/50" />
            
            </button>
          </li>
        )}
      </ul>
      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex} />
      
    </>);

}