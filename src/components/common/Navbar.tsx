import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-zinc-800/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark with official emblem */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 text-white"
          >
            <img
              src="/src/assets/images/hydra_logo_official.jpg"
              alt="HYDRA Motorsport Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-red-600/70 shadow-lg group-hover:scale-105 group-hover:ring-red-500 transition-all shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-black tracking-widest text-lg sm:text-xl text-white group-hover:text-red-500 transition-colors uppercase">
              HYDRA <span className="text-red-600">MOTORSPORT</span>
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button
              onClick={() => scrollTo('about')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'about' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo('divisions')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'divisions' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Divisions
            </button>
            <button
              onClick={() => scrollTo('business-model')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'business-model' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Business Loop
            </button>
            <button
              onClick={() => scrollTo('racing')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'racing' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Racing Pathway
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'technology' || activeSection === 'power' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Engineering & Power
            </button>
            <button
              onClick={() => scrollTo('partners')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'partners' ? 'text-white border-b border-red-500 pb-0.5' : 'text-zinc-400'
              }`}
            >
              Partnerships
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-800">
              Site Navigation
            </div>
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About HYDRA' },
              { id: 'divisions', label: '6 Divisions' },
              { id: 'business-model', label: 'Business Model' },
              { id: 'racing', label: 'Racing Pathway' },
              { id: 'technology', label: 'Engineering & Technology' },
              { id: 'power', label: 'HYDRA Power' },
              { id: 'academy', label: 'Academy & Media' },
              { id: 'ambition', label: 'Long-Term Ambition' },
              { id: 'revenue', label: 'Revenue Streams' },
              { id: 'partners', label: 'Partners & Investors' },
              { id: 'founder', label: 'Founder & Vision' },
              { id: 'contact', label: 'Contact & Enquiries' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-2 text-lg font-medium text-zinc-300 hover:text-white hover:translate-x-1 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-center rounded-md text-sm uppercase tracking-wider"
            >
              Enquire & Partner
            </button>
          </div>
        </div>
      )}
    </>
  );
};
