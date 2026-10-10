import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-900 bg-black/90 py-16 px-6 sm:px-8 z-10 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-900">
        <div className="flex items-center gap-3.5">
          <img
            src="/src/assets/images/hydra_logo_official.jpg"
            alt="HYDRA Motorsport Official Emblem"
            className="w-10 h-10 rounded-full object-cover ring-1 ring-red-600/70 shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="font-display font-black tracking-widest text-xl text-white uppercase mb-0.5">
              HYDRA <span className="text-red-600">MOTORSPORT</span>
            </div>
            <div className="font-mono text-zinc-400 tracking-wider uppercase text-[11px]">
              RACING. ENGINEERING. TECHNOLOGY.
            </div>
          </div>
        </div>

        {/* Clean text navigation links */}
        <div className="flex flex-wrap items-center gap-6 text-zinc-400 font-sans font-medium">
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <button
            onClick={() => scrollTo('divisions')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Divisions
          </button>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <button
            onClick={() => scrollTo('business-model')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Business Model
          </button>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <button
            onClick={() => scrollTo('partners')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Partnerships
          </button>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 font-mono text-[11px]">
        <div>
          © 2026 HYDRA MOTORSPORT. All rights reserved.
        </div>
        <div className="text-zinc-400">
          Pre-incorporation development project.
        </div>
      </div>
    </footer>
  );
};
