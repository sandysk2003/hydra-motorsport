import React from 'react';
import { Cpu, Megaphone, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

interface PartnersSectionProps {
  onSelectPathway: (pathway: string) => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ onSelectPathway }) => {
  const pathways = [
    {
      id: 'technical',
      name: 'Technical Partnerships',
      icon: Cpu,
      summary:
        'Engineering, high-performance computing, simulation software, advanced sensors, carbon-composite materials, and powertrain test bench research.',
      benefits: [
        'Real-world validation of advanced software and telemetry hardware on track',
        'Co-development of bespoke IP and motorsport engineering benchmarks',
        'Direct collaboration with race engineers and dynamic data specialists',
        'Showcase of mission-critical compute reliability in extreme conditions',
      ],
      idealFor: 'Tech firms, cloud providers, semiconductor vendors, sensor manufacturers, and engineering laboratories.',
      cta: 'Explore Technical Collaboration',
    },
    {
      id: 'commercial',
      name: 'Commercial Sponsorship',
      icon: Megaphone,
      summary:
        'High-impact international brand visibility, digital storytelling, content integration, trackside activation, and long-term motorsport alignment.',
      benefits: [
        'Global brand exposure on race car liveries, drivers, and team equipment',
        'Bespoke technical storytelling campaigns produced by HYDRA Media',
        'Executive paddock hospitality and exclusive engineering access',
        'Association with cutting-edge engineering, speed, and innovation',
      ],
      idealFor: 'Global consumer brands, enterprise technology leaders, energy firms, and premium lifestyle organizations.',
      cta: 'Explore Commercial Sponsorship',
    },
    {
      id: 'strategic',
      name: 'Strategic Investment',
      icon: TrendingUp,
      summary:
        'Long-term capital formation and structured investment arrangements to fund team infrastructure, technology development, and powertrain facilities.',
      benefits: [
        'Participation in a high-barrier, tech-anchored motorsport business',
        'Direct exposure to proprietary software IP and engineering asset growth',
        'Structured governance and formal shareholder representation',
        'Long-term upside from eventual Formula 1 constructor progression',
      ],
      idealFor: 'Accredited institutional investors, family offices, and sports/technology private equity groups.',
      cta: 'Request Investment Overview',
    },
  ];

  return (
    <section id="partners" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>10. Collaboration</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Three Engagement Pathways</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Partner With HYDRA At The Ground Floor
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          Building an enduring motorsport organisation requires alignment across technical capability,
          commercial reach, and strategic capital. We invite aligned organisations to participate through three transparent frameworks.
        </p>
      </div>

      {/* 3 Pathway Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {pathways.map((path) => {
          const IconComp = path.icon;
          return (
            <div
              key={path.id}
              className="p-8 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight mb-3">
                  {path.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
                  {path.summary}
                </p>

                <div className="space-y-4 pt-4 border-t border-zinc-850 mb-6">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Strategic Value Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    {path.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs text-zinc-400 mb-6">
                  <strong className="text-zinc-300 block font-mono uppercase text-[11px] mb-1">
                    Profile:
                  </strong>
                  {path.idealFor}
                </div>

                <button
                  onClick={() => onSelectPathway(path.name)}
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-red-600/60 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{path.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Relationship Statement */}
      <div className="p-7 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs font-sans text-zinc-400 flex items-start gap-4">
        <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <strong className="text-zinc-200 uppercase tracking-wider font-mono block">
            Commercial Integrity Policy
          </strong>
          <p className="leading-relaxed">
            In accordance with our commitment to transparency, HYDRA does not display speculative corporate logos or claim unconfirmed affiliations.
            We do not publish fabricated funding totals, phantom sponsors, or unexecuted contracts.
            All partnership dialogues are conducted directly under bilateral non-disclosure and formal agreements.
          </p>
        </div>
      </div>
    </section>
  );
};
