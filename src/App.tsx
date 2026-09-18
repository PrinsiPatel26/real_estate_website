import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomCTA } from './components/MobileBottomCTA';
import { EnquiryModal } from './components/EnquiryModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { WhyChauhan } from './pages/WhyChauhan';
import { Location } from './pages/Location';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { Reviews } from './pages/Reviews';
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
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#111111] pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-0">
      
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-[#c9a227] focus:px-4 focus:py-2 focus:text-[0.7rem] focus:uppercase focus:tracking-[0.2em] focus:text-[#111111]">
        
        Skip to content
      </a>

      <Navbar transparentOnTop={isHome} onEnquire={() => setEnquiryOpen(true)} />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/properties" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/properties/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/why-chauhan" element={<WhyChauhan />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/legal/:doc" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <WhatsAppButton />
      <MobileBottomCTA />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>);

}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>);

}