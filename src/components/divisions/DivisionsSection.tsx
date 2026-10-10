import React, { useState } from 'react';
import { Flag, Cpu, Wrench, Zap, GraduationCap, Video, ChevronRight, Check } from 'lucide-react';

interface DivisionData {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  scope: string[];
  plannedHorizon: string;
  developmentGoals: string[];
}

export const DivisionsSection: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>('racing');

  const divisions: DivisionData[] = [
    {
      id: 'racing',
      name: 'HYDRA RACING',
      icon: Flag,
      tagline: 'Single-Seater Progression to Formula 1',
      description:
        'The operational competition arm intended to establish HYDRA-owned racing teams across tiered single-seater championships, capturing live competitive telemetry and proving engineering solutions on track.',
      scope: [
        'National & International Karting programmes',
        'Formula Regional European Championship (FREC)',
        'FIA Formula 3 Championship team development',
        'FIA Formula 2 Championship progression',
        'Long-term Formula 1 constructor ambition',
      ],
      plannedHorizon: 'Multi-stage phased expansion (Karting to F1)',
      developmentGoals: [
        'Establish proprietary racing team infrastructure',
        'Source elite engineering crew and race mechanics',
        'Comply with FIA homologation and sporting criteria',
      ],
    },
    {
      id: 'technology',
      name: 'HYDRA TECHNOLOGY',
      icon: Cpu,
      tagline: 'AI Race Analytics & Simulation Software',
      description:
        'Advanced software engineering lab building algorithms for vehicle setup optimization, predictive race strategy, tyre thermal degradation modeling, and synthetic telemetry replay.',
      scope: [
        'AI-driven real-time race strategy engines',
        'High-frequency telemetry analysis suites',
        'Hardware-in-the-loop (HIL) simulation physics',
        'Tyre thermo-mechanical degradation modeling',
        'Driver biometric and cognitive performance analysis',
      ],
      plannedHorizon: 'Proprietary IP creation & Software licensing',
      developmentGoals: [
        'Deploy deterministic simulation mathematical models',
        'Build cloud telemetry analytics infrastructure',
        'Commercialise SaaS engineering tooling for customer teams',
      ],
    },
    {
      id: 'engineering',
      name: 'HYDRA ENGINEERING',
      icon: Wrench,
      tagline: 'Aerodynamics, CFD & Vehicle Dynamics',
      description:
        'Mechanical design and physical optimization division targeting aerodynamic efficiency, carbon-composite chassis stiffness, multi-link suspension kinematics, and thermal heat exchanger packaging.',
      scope: [
        'Computational Fluid Dynamics (CFD) aerodynamic development',
        'Carbon-composite monocoque tub structural analysis',
        'Kinematic suspension geometry & pushrod/pullrod tuning',
        'Thermal cooling architecture and brake ducting',
        'Advanced additive manufacturing & titanium alloy prototyping',
      ],
      plannedHorizon: 'Physical prototyping & wind tunnel research',
      developmentGoals: [
        'Develop correlation between CFD and track data',
        'Optimize ground-effect floor aerodynamic balance',
        'Establish precision manufacturing supply chain agreements',
      ],
    },
    {
      id: 'power',
      name: 'HYDRA POWER',
      icon: Zap,
      tagline: 'Hybrid Powertrain & Energy Systems R&D',
      description:
        'Long-term powertrain research programme exploring high-efficiency combustion architecture, electric drive units, advanced motorsport energy storage, and sustainable fuel solutions.',
      scope: [
        'Advanced combustion thermal efficiency',
        'Motorsport energy storage and battery modules',
        'High-performance electric motor generator systems',
        'Intelligent energy recovery and deployment algorithms',
        'Sustainable and renewable synthetic fuels',
      ],
      plannedHorizon: 'Long-term research & dyno validation programme',
      developmentGoals: [
        'Conduct feasibility studies for proprietary powertrain integration',
        'Establish research partnerships with specialist engineering labs',
        'Formulate roadmaps for future independent power unit development',
      ],
    },
    {
      id: 'academy',
      name: 'HYDRA ACADEMY',
      icon: GraduationCap,
      tagline: 'Driver Evaluation & Simulation Training',
      description:
        'Comprehensive driver discovery, cognitive development, physical training, and full-motion simulator preparation dedicated to preparing emerging talent for single-seater formula racing.',
      scope: [
        'High-fidelity dynamic motion simulator coaching',
        'G-force conditioning and cognitive reflex training',
        'Telemetry feedback debriefs with race engineers',
        'Junior karting talent identification programmes',
        'Media and sponsor representation coaching',
      ],
      plannedHorizon: 'Talent pipeline for HYDRA racing outfits',
      developmentGoals: [
        'Commission bespoke formula simulator cockpit rigs',
        'Standardise driver data benchmarking frameworks',
        'Nurture home-grown driving talent towards F3 and F2 seats',
      ],
    },
    {
      id: 'media',
      name: 'HYDRA MEDIA',
      icon: Video,
      tagline: 'Motorsport Content & Technical Storytelling',
      description:
        'Digital content and broadcast studio bringing fans and partners behind the scenes of deep engineering, aerodynamic development, race weekends, and technology breakthroughs.',
      scope: [
        'High-production documentary series & engineering explainers',
        'Interactive digital media and telemetry visualizers',
        'Technical journalism demystifying motorsport physics',
        'Commercial sponsor activation campaigns and digital assets',
        'Live stream broadcast production for test sessions',
      ],
      plannedHorizon: 'Global audience engagement & brand equity',
      developmentGoals: [
        'Produce transparent engineering educational content',
        'Build direct digital community following around HYDRA',
        'Provide sponsor return-on-investment through premium storytelling',
      ],
    },
  ];

  const current = divisions.find((d) => d.id === selectedDivision) || divisions[0];

  return (
    <section id="divisions" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>02. Architecture</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Six Core Divisions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Engineering Capability Across Every Motorsport Discipline
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA is structured around six specialized divisions designed to work in synergy.
          Each unit addresses a critical requirement of modern top-tier motorsport, from trackside racecraft
          to deep powertrain laboratory research.
        </p>
      </div>

      {/* Grid of 6 Divisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {divisions.map((div) => {
          const IconComponent = div.icon;
          const isSelected = selectedDivision === div.id;

          return (
            <div
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`p-7 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/90 border-red-600/70 shadow-lg shadow-red-950/20'
                  : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase">
                    PLANNED DIVISION
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white tracking-tight uppercase mb-1">
                  {div.name}
                </h3>
                <p className="text-xs text-red-400 font-mono mb-3">
                  {div.tagline}
                </p>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-6">
                  {div.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">
                  {div.scope.length} Research Domains
                </span>
                <span
                  className={`flex items-center gap-1 font-medium ${
                    isSelected ? 'text-red-400' : 'text-zinc-400'
                  }`}
                >
                  {isSelected ? 'Inspecting' : 'Details'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Division Deep-Dive Panel */}
      <div className="bg-zinc-950/85 backdrop-blur-md border border-zinc-800 rounded-xl p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
              <span className="text-red-500 font-bold uppercase">{current.name}</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>TECHNICAL SPECIFICATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              {current.tagline}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-400 block text-[11px]">TIMELINE:</span>
              <span className="text-zinc-200">{current.plannedHorizon}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider">
              Division Mandate
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {current.description}
            </p>
            <div className="pt-4">
              <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Key Formation Milestones
              </h5>
              <div className="space-y-2">
                {current.developmentGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-4">
              Active Scope & Technical Pillars
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.scope.map((domain, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 font-sans flex items-start gap-2.5"
                >
                  <span className="font-mono text-zinc-400 shrink-0">0{idx + 1}</span>
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory & Honesty Footnote */}
        <div className="mt-8 pt-6 border-t border-zinc-850 flex items-center gap-3 text-xs text-zinc-400 font-sans">
          <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
          <span>
            <strong>Operational Status:</strong> HYDRA divisions are planned operational entities currently under technical development. Commercial facilities, team homologation, and competition entries will be commissioned upon required regulatory approvals and funding stages.
          </span>
        </div>
      </div>
    </section>
  );
};
