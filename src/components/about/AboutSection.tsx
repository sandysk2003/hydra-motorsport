import React from 'react';
import { ArrowRight, Flame, Layers, Network, Activity } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const operatingSteps = [
    { label: 'Racing', desc: 'Real-world track conditions and dynamic vehicle stress' },
    { label: 'Data', desc: 'Continuous telemetry capture and multi-sensor acquisition' },
    { label: 'Research & Dev', desc: 'Mathematical modeling, CFD simulation, and analysis' },
    { label: 'Engineering', desc: 'Aerodynamic, chassis, and powertrain physical refinements' },
    { label: 'Technology', desc: 'Software platforms, simulation algorithms, setup engines' },
    { label: 'Products', desc: 'Commercial engineering tooling, IP, and licensing' },
    { label: 'Commercial Growth', desc: 'Sponsorships, customer contracts, and IP revenues' },
    { label: 'Reinvestment', desc: 'Capital fed back into elite racing and deep engineering' },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>01. Foundation</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Operating Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          The Convergence of Competition and Deep Engineering
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA MOTORSPORT is an independent motorsport venture in development, built around the
          direct relationship between competitive racing, real-world data, engineering discipline,
          technology commercialisation, and powertrain innovation.
        </p>
      </div>

      {/* 2-Column Split: Mission Narrative + Long-term Vision Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        <div className="lg:col-span-7 bg-zinc-950/70 backdrop-blur-md border border-zinc-800/80 rounded-xl p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
              A Unified Feedback Loop Between Track and Lab
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Traditional motorsport treats racing as pure entertainment or marketing expense.
              HYDRA approaches motorsport as an accelerated physical incubator: competitive racing generates
              unforgiving high-stress datasets that cannot be replicated in isolated computer simulations alone.
            </p>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              By controlling both the racing pipeline and the technology development, performance insights
              discovered on circuit directly inform software tools, powertrain efficiency breakthroughs, and vehicle
              dynamics systems. Commercial licensing of these technologies funds further racing, closing the loop.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-850 flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-red-500 font-bold uppercase">Pre-Incorporation Note</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Intended operational architecture currently under strategic formation</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-xl p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-display font-semibold text-white uppercase tracking-wider mb-3">
              The Long-Term Vision
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              To develop an elite independent motorsport organisation with proprietary racing teams,
              in-house high-performance computing, advanced vehicle engineering facilities, and a long-term
              Formula 1 constructor and powertrain programme.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Target Horizon:</span>
              <span className="text-zinc-200">2026 – 2035 Phased Scaling</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Ownership Model:</span>
              <span className="text-zinc-200">100% Independent Venture</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Primary Objective:</span>
              <span className="text-zinc-200">Self-Sustaining Engineering IP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Concept Loop Diagram */}
      <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-1">
              Operating Cycle Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              The HYDRA Value Multiplier
            </h3>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Sequential continuous feedback
          </div>
        </div>

        {/* Desktop Step Flow */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {operatingSteps.map((step, idx) => (
            <div
              key={step.label}
              className="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span>STEP 0{idx + 1}</span>
                  {idx < operatingSteps.length - 1 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <span className="text-red-500">↻ REPEAT</span>
                  )}
                </div>
                <h4 className="text-base font-display font-semibold text-white uppercase tracking-wide mb-1.5">
                  {step.label}
                </h4>
                <p className="text-xs text-zinc-400 leading-normal font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Vertical Flow */}
        <div className="lg:hidden space-y-3">
          {operatingSteps.map((step, idx) => (
            <div
              key={step.label}
              className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-xs font-bold text-red-500 shrink-0">
                0{idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-display font-semibold text-white uppercase">
                  {step.label}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-zinc-850 flex items-center gap-3 text-xs text-zinc-400 font-sans">
          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
          <span>
            <strong>Formal Notice:</strong> This operating concept describes the intended business model and strategic design of HYDRA MOTORSPORT. It represents planned development goals, not a claim of current operational scale or finalized race entries.
          </span>
        </div>
      </div>
    </section>
  );
};
