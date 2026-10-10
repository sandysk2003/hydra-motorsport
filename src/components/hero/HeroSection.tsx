import React from 'react';
import { ArrowDown, ChevronRight, ShieldCheck, Cpu, Gauge } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onPartnerClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 max-w-7xl mx-auto z-10 pointer-events-none"
    >
      {/* Top spacer */}
      <div />

      {/* Main Center Content */}
      <div className="max-w-3xl my-auto pointer-events-auto">
        {/* Brand Kicker */}
        <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
          <span className="text-red-500 font-bold">2026 ARCHITECTURE</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>INDEPENDENT VENTURE</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>PRE-INCORPORATION</span>
        </div>

        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.05] uppercase mb-4 text-balance">
          HYDRA <span className="text-red-600">MOTORSPORT</span>
        </h1>

        {/* Tagline */}
        <div className="text-lg sm:text-2xl font-display font-semibold tracking-wider text-zinc-300 uppercase mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>RACING</span>
          <span className="text-red-600 font-light">/</span>
          <span>ENGINEERING</span>
          <span className="text-red-600 font-light">/</span>
          <span>TECHNOLOGY</span>
        </div>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-2xl mb-8 font-normal">
          An independent motorsport venture being developed around racing, engineering,
          data-driven technology and long-term powertrain innovation.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-all shadow-lg hover:shadow-red-600/30 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore HYDRA</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onPartnerClick}
            className="px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-wider rounded-md transition-all backdrop-blur-sm cursor-pointer"
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* Bottom Technical Status Bar (Clean unboxed text, no pills) */}
      <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-zinc-800/80 pointer-events-auto text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-red-500" />
            <span className="text-zinc-300">Vehicle Platform:</span>
            <span className="text-zinc-400">2026 Open-Wheel Specification</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300">Powertrain Vector:</span>
            <span className="text-zinc-400">Hybrid Architecture & Sustainable Fuels</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300">Research Focus:</span>
            <span className="text-zinc-400">Aerodynamics & AI Race Analytics</span>
          </div>
        </div>

        {/* Scroll down prompt */}
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group text-xs uppercase tracking-wider font-sans font-medium"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
