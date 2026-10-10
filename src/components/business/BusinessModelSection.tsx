import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { BusinessStage } from '../../types';

export const BusinessModelSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');

  const stages: BusinessStage[] = [
    {
      id: 'stage-1',
      stepNumber: '01',
      title: 'Racing',
      category: 'TRACK OPERATIONS',
      description:
        'HYDRA racing entries in competitive single-seater categories subject equipment to real-world operational stress, competitive friction, and changing circuit environments.',
      input: 'Driver talent, competitive chassis, and operational team deployment',
      output: 'High-frequency physical telemetry, tyre degradation data, and dynamic race feedback',
    },
    {
      id: 'stage-2',
      stepNumber: '02',
      title: 'Real-World Data',
      category: 'ACQUISITION',
      description:
        'Sensor telemetry, CAN-bus logging, high-speed suspension potentiometers, aerodynamic pitot tubes, and GPS telemetry ingested into unified time-series databases.',
      input: 'Raw sensor feeds from on-track competitive runs and test sessions',
      output: 'Calibrated, synchronized datasets for engineering analysis and simulation',
    },
    {
      id: 'stage-3',
      stepNumber: '03',
      title: 'Research & Development',
      category: 'CORE DISCOVERY',
      description:
        'Specialist aerodynamicists, mathematicians, and powertrain engineers interrogate anomalies, correlate virtual models against real track runs, and synthesize breakthrough solutions.',
      input: 'Clean telemetry datasets and physical track debriefs',
      output: 'Validated mathematical formulas, CAD redesigns, and predictive setup algorithms',
    },
    {
      id: 'stage-4',
      stepNumber: '04',
      title: 'Engineering + AI/Tech + Powertrain',
      category: 'TRI-PILLAR SYNTHESIS',
      description:
        'The three technical arms construct physical upgrades: CFD aero improvements (Engineering), AI strategy software (Technology), and hybrid energy management (Power).',
      input: 'Validated R&D hypotheses and test specifications',
      output: 'Physical aero updates, software platforms, and hybrid test-bench models',
    },
    {
      id: 'stage-5',
      stepNumber: '05',
      title: 'Products & Services',
      category: 'COMMERCIALISATION',
      description:
        'Proprietary tools developed for the race team are packaged into commercial engineering SaaS, telemetry analytics subscriptions, and technical consulting for mobility clients.',
      input: 'Proven in-house racing software and vehicle dynamics tooling',
      output: 'B2B software subscriptions, simulation licensing, and specialized consulting',
    },
    {
      id: 'stage-6',
      stepNumber: '06',
      title: 'Media & Brand Growth',
      category: 'AUDIENCE & ACTIVATION',
      description:
        'HYDRA Media captures the raw journey of deep technical development, building an international fan and engineering audience through documentary-style transparency.',
      input: 'Real engineering milestones, race weekend narratives, and simulator insights',
      output: 'High-engagement digital following, sponsor value delivery, and cultural footprint',
    },
    {
      id: 'stage-7',
      stepNumber: '07',
      title: 'Sponsors, Partners & Customers',
      category: 'COMMERCIAL ECOSYSTEM',
      description:
        'High-calibre technology partners, commercial sponsors, and enterprise software customers align with HYDRA to showcase performance, compute capabilities, and brand synergy.',
      input: 'Brand reach, technical excellence, and visible competition progress',
      output: 'Corporate sponsorships, technology hardware grants, and software enterprise contracts',
    },
    {
      id: 'stage-8',
      stepNumber: '08',
      title: 'Revenue & Reinvestment',
      category: 'CAPITAL CYCLE',
      description:
        'Commercial returns from software licensing, sponsorships, and consulting are systematically re-injected into advanced powertrain dynos, elite engineering talent, and racing entries.',
      input: 'Multi-stream revenue flow and partner capital',
      output: 'Expanded racing programmes, deeper powertrain R&D, and higher competitive velocity',
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <section id="business-model" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>03. Commercial Strategy</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Interactive Business Loop</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          The Self-Sustaining Engineering Flywheel
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA is engineered not as a speculative sporting vanity project, but as a compounding technology business.
          Every lap driven generates data; data fuels IP; IP generates revenue; revenue funds further racing and innovation.
        </p>
      </div>

      {/* Main Interactive Diagram Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Interactive Stages Selector / Flow */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2 flex items-center justify-between border-b border-zinc-800">
            <span>Cycle Sequence</span>
            <span className="text-red-500">Select any stage to inspect inputs/outputs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {stages.map((stage, idx) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-zinc-900 border-red-600 text-white shadow-md shadow-red-950/20'
                      : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {stage.stepNumber}
                    </span>
                    <div>
                      <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                        {stage.category}
                      </div>
                      <div className="text-sm font-display font-semibold text-white tracking-wide">
                        {stage.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-red-500 translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Stage Inspection Card */}
        <div className="lg:col-span-5 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-8 sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
            <span className="text-red-500 font-bold uppercase">
              STAGE {currentStage.stepNumber} / 08
            </span>
            <span className="text-zinc-400 tracking-wider">
              {currentStage.category}
            </span>
          </div>

          <div className="pt-6">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-4">
              {currentStage.title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              {currentStage.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-850">
              <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs">
                <span className="font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Required Operational Input:
                </span>
                <span className="text-zinc-200 font-sans">
                  {currentStage.input}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs">
                <span className="font-mono text-red-400 uppercase tracking-wider block mb-1">
                  Generated Downstream Output:
                </span>
                <span className="text-zinc-200 font-sans">
                  {currentStage.output}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-850 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Next Iteration Link:</span>
              <span className="text-zinc-200 flex items-center gap-1 font-semibold">
                Continuous Closed Loop <RefreshCw className="w-3.5 h-3.5 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
