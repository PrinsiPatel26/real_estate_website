import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Building2Icon,
  ChartNoAxesCombinedIcon,
  HandshakeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon } from
'lucide-react';
import { whyChauhan } from '../data/site';
import { useCmsData } from '../cms/CmsDataContext';
import { getProjectCard } from '../utils/projectMedia';
import { GoldLine, LUX, Reveal } from './Reveal';

const benefitIcons = [
ShieldCheckIcon,
Building2Icon,
UserRoundCheckIcon,
ChartNoAxesCombinedIcon,
MapPinIcon,
HandshakeIcon];

export function WhyChooseUs() {
  const { projects } = useCmsData();
  const reduce = useReducedMotion();

  return (
    <section
      id="why-chauhan"
      aria-labelledby="why-heading"
      className="border-y border-[#e8e6e0] bg-[#f8f8f6] py-16 text-[#111111] sm:py-20 lg:py-24">

      <div className="mx-auto grid max-w-[1300px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <Reveal>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a24d]">Why Choose Chauhan Realtors</p>
            <GoldLine className="mt-5 bg-[#c9a24d]" width="3.5rem" />
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="why-heading" className="mt-6 max-w-xl font-display text-[2.35rem] font-light leading-[1.02] text-[#111111] sm:text-[3rem] lg:text-[3.45rem]">
              Why Choose
              <span className="block text-[#c9a24d]">Chauhan Realtors?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-[0.95rem] leading-[1.75] text-[#555555] sm:text-base">
              We work with a small number of projects at a time so that every recommendation is
              informed, every claim is checked and every buyer is looked after personally.
            </p>
          </Reveal>

          <ol className="mt-8 space-y-0 sm:mt-10">
            {whyChauhan.map((item, index) => {
              const Icon = benefitIcons[index];
              return (
                <Reveal as="li" key={item.title} delay={0.14 + index * 0.08}>
                  <div className="group flex gap-4 border-b border-[#e7e3d8] py-5 first:border-t sm:gap-5 sm:py-6">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a24d] transition-transform duration-200 ease-lux group-hover:translate-x-1 group-hover:text-[#a98232]"
                      strokeWidth={1.7}
                      aria-hidden="true" />
                    <div>
                      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#151515] transition-colors duration-200 ease-lux group-hover:text-[#a98232] sm:text-[0.74rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-[#666666] sm:text-[0.9rem]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>);
            })}
          </ol>
        </div>

        <motion.figure
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          initial={reduce ? undefined : { opacity: 0, scale: 1.04 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: LUX }}>
          <div className="absolute -right-3 -top-3 h-20 w-20 border-r border-t border-[#c9a24d]/60 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28" aria-hidden="true" />
          <div className="overflow-hidden rounded-[0_76px_76px_76px] border border-[#c9a24d]/60 bg-white p-1.5 shadow-[0_20px_55px_rgba(17,17,17,0.12)] sm:rounded-[0_110px_110px_110px] sm:p-2">
            <img
              src={getProjectCard(projects[0])}
              alt={`${projects[0]?.name || 'Project'} image`}
              loading="lazy"
              className="h-[330px] w-full rounded-[0_68px_68px_68px] object-cover object-center transition-transform duration-700 ease-lux hover:scale-[1.02] sm:h-[460px] sm:rounded-[0_102px_102px_102px] lg:h-[560px]" />
          </div>
        </motion.figure>
      </div>
    </section>);

}