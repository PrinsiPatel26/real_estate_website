import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { WhyChauhans } from './pages/WhyChauhans';
import { Location } from './pages/Location';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isProjectDetail = pathname.startsWith('/projects/');

  return (
    <div
      className={
      'flex min-h-screen w-full flex-col bg-ink-900 ' + (
      isProjectDetail ? 'pb-16 sm:pb-0' : '')
      }>
      
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-[0.7rem] focus:uppercase focus:tracking-micro focus:text-ink-900">
        
        Skip to content
      </a>

      <Navbar transparentOnTop={isHome} />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/why-chauhans" element={<WhyChauhans />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/:doc" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Lifted on project pages so it never collides with the sticky mobile CTA bar. */}
      <WhatsAppButton raised={isProjectDetail} />
    </div>);

}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>);

}