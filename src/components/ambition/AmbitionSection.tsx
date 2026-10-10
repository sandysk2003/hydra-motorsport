import React from 'react';
import { Target, Compass, Sparkles, ChevronRight } from 'lucide-react';

interface AmbitionSectionProps {
  onPartnerClick: () => void;
}

export const AmbitionSection: React.FC<AmbitionSectionProps> = ({ onPartnerClick }) => {
  return (
    <section id="ambition" className="relative py-32 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Cinematic Ambient Backdrop Container */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 sm:p-14 lg:p-20 shadow-2xl">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Kicker */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-6">
            <span>08. Long-Term Ambition</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400">Strategic Horizon</span>
          </div>

          {/* Master Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.08] mb-8 text-balance">
            BUILT TO RACE. DESIGNED TO ENGINEER. DRIVEN TO INNOVATE.
          </h2>

          {/* Narrative */}
          <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal mb-10 max-w-3xl">
            <p>
              The definitive long-term goal of HYDRA MOTORSPORT is to establish an enduring, independent motorsport institution.
              We envision a self-sufficient ecosystem operating its own championship racing teams, commanding in-house computational
              engineering and aerodynamic facilities, commercialising enterprise-grade mobility software, and ultimately competing
              as a full-works Formula 1 constructor with an in-house power unit programme.
            </p>
            <p>
              We present this openly as our guiding vision: an ambitious, multi-decade roadmap that demands uncompromising discipline,
              scientific rigor, world-class personnel, and strategic partnership. It is a planned developmental journey that will be
              earned step-by-step on circuit asphalt and dyno test benches.
            </p>
          </div>

          {/* 3 Core Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 pb-10 border-t border-b border-zinc-850 mb-10">
            <div>
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-1">
                Tenet 01
              </span>
              <h3 className="text-base font-display font-bold text-white uppercase mb-2">
                Independent Ownership
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Retaining engineering autonomy and pure technological focus without bureaucratic compromise.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-1">
                Tenet 02
              </span>
              <h3 className="text-base font-display font-bold text-white uppercase mb-2">
                Scientific Integrity
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Every component, claim, and strategy grounded in empirical physics and validated mathematical correlation.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-1">
                Tenet 03
              </span>
              <h3 className="text-base font-display font-bold text-white uppercase mb-2">
                Commercial Reinvestment
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Generating tangible IP revenues to fund sustainable, long-term racing and deep powertrain discovery.
              </p>
            </div>
          </div>

          {/* Action Call */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onPartnerClick}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-red-600/30"
            >
              <span>Explore Partnership Opportunities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400">
              Pre-incorporation strategic formation · Non-guaranteed outcome
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
