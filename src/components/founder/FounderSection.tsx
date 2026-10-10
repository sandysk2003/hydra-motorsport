import React from 'react';
import { Compass, Shield, Target } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500">
              <span>11. Leadership</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Governance</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight mb-2">
                Sandy SK
              </h2>
              <div className="text-sm sm:text-base font-mono text-zinc-400 tracking-wider uppercase">
                Founder <span className="text-red-500 font-bold">•</span> Chairman <span className="text-red-500 font-bold">•</span> Driver
              </div>
            </div>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-normal pt-2">
              <p>
                Sandy SK serves as the founder and strategic architect behind HYDRA MOTORSPORT,
                guiding the venture's long-term vision, technological architecture, and sporting objectives.
              </p>
              <p>
                Combining direct cockpit perspective with a systemic approach to vehicle dynamics,
                Sandy leads the strategic mission to bridge the gap between trackside competition and commercial engineering.
                His mandate focuses on assembling world-class aerodynamicists, race engineers, and software architects
                committed to building an enduring independent motorsport enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-850">
              <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xs font-mono text-red-500 block mb-1">MANDATE 01</span>
                <span className="text-sm font-display font-semibold text-white block">Strategic Architecture</span>
                <span className="text-xs text-zinc-400 mt-1 block">Establishing long-term team formation and capital structure</span>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xs font-mono text-red-500 block mb-1">MANDATE 02</span>
                <span className="text-sm font-display font-semibold text-white block">Cockpit Correlation</span>
                <span className="text-xs text-zinc-400 mt-1 block">Uniting subjective driver feel with objective sensor data</span>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xs font-mono text-red-500 block mb-1">MANDATE 03</span>
                <span className="text-sm font-display font-semibold text-white block">Engineering Culture</span>
                <span className="text-xs text-zinc-400 mt-1 block">Fostering relentless empiricism and continuous improvement</span>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Statement Card */}
          <div className="lg:col-span-4 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 rounded-xl border border-zinc-800 space-y-6">
            <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <Compass className="w-5 h-5" />
            </div>

            <blockquote className="text-base font-display italic text-zinc-200 leading-snug">
              "We are not here to build a transient racing entry. We are here to create an enduring engineering institution where racing validates technology, and technology sustains racing."
            </blockquote>

            <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
              <div className="text-white font-semibold">HYDRA MOTORSPORT FOUNDING OFFICE</div>
              <div>Pre-Incorporation Venture Leadership</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
