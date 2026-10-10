import React from 'react';
import { Zap, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const PowerSection: React.FC = () => {
  const researchDomains = [
    {
      title: 'Advanced Combustion Systems',
      desc: 'Researching high-efficiency combustion chambers, optimized direct injection, and thermal efficiency under modern sustainable fuels.',
    },
    {
      title: 'Electric Drive & Motor Generators',
      desc: 'Developing high-torque electric motor generator units engineered for seamless power delivery and rapid kinetic energy recovery.',
    },
    {
      title: 'Motorsport Energy Storage',
      desc: 'Engineering high-voltage battery modules, thermal cooling solutions, and rapid charge-discharge management for competition environments.',
    },
    {
      title: 'Power Electronics & Inverters',
      desc: 'Compact solid-state inverter architectures designed to minimize electrical conversion losses, heat build-up, and packaging volume.',
    },
    {
      title: 'Sustainable & Synthetic Fuels',
      desc: 'Evaluating non-fossil synthetic fuels and renewable energy carriers to support environmentally responsible high-performance motorsport.',
    },
    {
      title: 'Dynamic Energy Management',
      desc: 'Software algorithms optimizing energy recovery under braking and targeted electric deployment across acceleration zones.',
    },
  ];

  return (
    <section id="power" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>06. Propulsion & Energy</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">HYDRA Power</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Long-Term Powertrain Research Programme
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA POWER is a dedicated research programme exploring modern hybrid powertrain architecture,
          combining advanced combustion efficiency, electric drive systems, high-performance energy storage,
          and sustainable fuels for competition.
        </p>
      </div>

      {/* Hero Powertrain Lab Image Showcase */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 mb-16">
        <div className="relative h-80 sm:h-[450px]">
          <img
            src="/src/assets/images/hydra_powertrain_lab_1791515735508.jpg"
            alt="HYDRA Powertrain Test Bench Architecture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-mono text-red-400 uppercase tracking-wider block mb-1">
                Engineering Test Bench
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                HYDRA Hybrid Powertrain Architecture
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-sans">
                Research framework integrating thermal combustion design, electric motor-generator systems,
                high-voltage battery packaging, and dyno-based validation.
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-400 shrink-0">
              Integrated Hybrid Propulsion Focus
            </div>
          </div>
        </div>
      </div>

      {/* 6 Research Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {researchDomains.map((domain, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                <span className="text-red-500 font-bold">PILLAR 0{idx + 1}</span>
                <span className="uppercase">RESEARCH FOCUS</span>
              </div>
              <h4 className="text-base font-display font-bold text-white uppercase tracking-wide mb-2">
                {domain.title}
              </h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {domain.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Candor Disclaimer Box */}
      <div className="p-7 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs font-sans text-zinc-400 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <strong className="text-zinc-200 uppercase tracking-wider font-mono block">
            Honest Status Disclosure & Programme Scope
          </strong>
          <p className="leading-relaxed">
            The long-term ambition of HYDRA POWER includes developing an independent Formula 1 power unit programme.
            However, HYDRA explicitly clarifies that <strong>no functioning HYDRA Formula 1 power unit currently exists</strong>, nor has any engine been manufactured, homologated, or submitted for approval.
          </p>
          <p className="leading-relaxed">
            Realisation of this programme is an ambitious long-term research vision contingent upon thorough technical feasibility studies, strategic capital investment, specialized engineering personnel, and dedicated test facilities.
          </p>
        </div>
      </div>
    </section>
  );
};
