import React, { useState } from 'react';
import {
  Cpu,
  Activity,
  Wind,
  Terminal,
  UserCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { TechnicalModule } from '../../types';

export const EngineeringTechSection: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>('aero');

  const processCycle = [
    { step: '01', title: 'Observe', desc: 'Identify physical behaviours and thermal anomalies under live conditions.' },
    { step: '02', title: 'Measure', desc: 'Quantify strain, pitch, roll, air pressure, and torque through calibrated sensors.' },
    { step: '03', title: 'Analyse', desc: 'Isolate correlations between setup variations and lap degradation rates.' },
    { step: '04', title: 'Simulate', desc: 'Replay scenarios across multi-body physics and CFD boundary conditions.' },
    { step: '05', title: 'Develop', desc: 'Design structural refinements, revised wing profiles, or algorithm updates.' },
    { step: '06', title: 'Test', desc: 'Validate prototype components on 7-post test rigs and track test sessions.' },
    { step: '07', title: 'Improve', desc: 'Deploy verified upgrades into race spec and close the engineering loop.' },
  ];

  const modules: TechnicalModule[] = [
    {
      id: 'aero',
      title: 'Aerodynamics & Vehicle Dynamics',
      category: 'CFD & SURFACE OPTIMIZATION',
      summary:
        'Focusing on 2026 ground-effect regulations: vortex management, front wing cascade separation, underfloor venturi throat profiling, and active drag reduction geometry.',
      methodology:
        'Coupling transient lattice Boltzmann CFD with full-scale wind tunnel testing to maximize downforce-to-drag efficiency without triggering porpoising or aerodynamic stall.',
      keyDisciplines: [
        'Boundary layer transition control',
        'Floor edge vortex sealing',
        'Diffuser expansion ratio tuning',
        'Brake caliper thermal ducting',
      ],
      metricsContext: 'Targeting balanced aerodynamic center-of-pressure across high and low-speed yaw angles.',
    },
    {
      id: 'ai-analytics',
      title: 'AI Race Analytics & Strategy',
      category: 'PROBABILISTIC MODELING',
      summary:
        'Predictive engines evaluating millions of race outcome permutations: undercut/overcut windows, competitor tyre graining, safety car probabilities, and dynamic pace targeting.',
      methodology:
        'Monte Carlo simulations blended with neural networks trained on historical circuit weather trends, track grip evolution curves, and compound degradation physics.',
      keyDisciplines: [
        'Optimal pit window calculation',
        'Competitor pace trajectory forecasting',
        'Safety car risk index modeling',
        'Real-time delta lap pace optimization',
      ],
      metricsContext: 'Algorithmic strategy calculation updating per sector to recommend risk-adjusted pit decisions.',
    },
    {
      id: 'telemetry',
      title: 'High-Frequency Telemetry Analysis',
      category: 'TIME-SERIES INGESTION',
      summary:
        'Sub-millisecond data logging of suspension potentiometers, wheel speed slip ratios, tyre carcass temperatures, steering torque feedback, and downforce pressure taps.',
      methodology:
        'Synchronised CAN-bus logging with edge compression allowing rapid burst transmission to trackside engineering servers and remote operations rooms.',
      keyDisciplines: [
        'Fast Fourier Transform (FFT) vibration analysis',
        'Tyre slip angle vs lateral grip mapping',
        'Suspension heave and roll mode decomposition',
        'Ride height laser triangulation',
      ],
      metricsContext: 'Architected for reliable real-time ingestion across all chassis and powertrain sensors.',
    },
    {
      id: 'simulation',
      title: 'Simulation & Vehicle Performance',
      category: 'HARDWARE-IN-THE-LOOP',
      summary:
        'Multi-degree-of-freedom non-linear vehicle dynamics simulation pairing digital chassis models with physical driver inputs on dynamic motion platforms.',
      methodology:
        'Real-time numerical solvers computing tyre thermo-elastic contact patches, aerodynamic map lookups, and suspension deflection at 1,000 Hz frequencies.',
      keyDisciplines: [
        'Pacejka tyre model parameter identification',
        'Full vehicle yaw-rate response simulation',
        'Kerb strike transient structural response',
        'Virtual setup sweeps ahead of race weekends',
      ],
      metricsContext: 'Designed to enable setup optimization before the race car touches physical circuit asphalt.',
    },
    {
      id: 'software',
      title: 'Engineering Software & Optimization',
      category: 'COMPUTATIONAL TOOLS',
      summary:
        'Bespoke desktop and cloud software suites built for race engineers: automated setup calculators, differential lock map generators, and ballast distribution optimizers.',
      methodology:
        'High-performance compiled C++ numerical backends exposed via modern web interfaces for instantaneous cross-team collaboration between track and factory.',
      keyDisciplines: [
        'Automatic parameter solver algorithms',
        'Aerodynamic balance map interpolation',
        'Gearbox ratio step optimization',
        'Track grip evolution modeling',
      ],
      metricsContext: 'Streamlining hundreds of setup decisions into intuitive engineering dashboards.',
    },
    {
      id: 'driver',
      title: 'Driver Performance & Biometrics',
      category: 'HUMAN-MACHINE INTERACTION',
      summary:
        'Deep analysis of driver pedal modulation, steering application smoothness, apex speed commitment, eye-tracking focus points, and heart rate variability under peak G-forces.',
      methodology:
        'Comparing telemetry traces between driver laps to identify micro-second throttle hesitation, brake release trailing technique, and steering angle micro-corrections.',
      keyDisciplines: [
        'Brake pedal trace ramp and trail-off analysis',
        'Steering smoothness and micro-correction indices',
        'Cognitive load monitoring under mental fatigue',
        'Visual fixation and apex sighting analysis',
      ],
      metricsContext: 'Translating subjective driver cockpit sensations into objective quantitative feedback.',
    },
    {
      id: 'powertrain-model',
      title: 'Powertrain Modeling & Energy Management',
      category: 'HYBRID SYSTEM DEPLOYMENT',
      summary:
        'Simulation of thermal combustion efficiency, electric motor kinetic recovery, and energy storage balancing over full race distances.',
      methodology:
        'Optimization algorithms determining lap-by-lap electrical energy harvesting and strategic power deployment across acceleration zones.',
      keyDisciplines: [
        'Energy balance management',
        'Combustion thermal response',
        'Inverter thermal cooling optimization',
        'Fuel efficiency and delivery optimization',
      ],
      metricsContext: 'Balancing electrical and thermal energy delivery to maximize continuous performance without depleting battery reserves.',
    },
  ];

  const currentModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  return (
    <section id="technology" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>05. Engineering Discipline</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Scientific Method</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Data-Driven Precision Over Speculation
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          In modern motorsport, intuition without validation loses races. HYDRA follows an uncompromising
          7-step development loop designed to systematically transform physical track anomalies into predictable, repeatable performance gains.
        </p>
      </div>

      {/* 7-Step Development Loop Process */}
      <div className="mb-20 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-850">
          <div>
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-1">
              Methodology Blueprint
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              Observe → Measure → Analyse → Simulate → Develop → Test → Improve
            </h3>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Iterative Engineering Standard
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {processCycle.map((item, idx) => (
            <div
              key={item.step}
              className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-red-500 block mb-2">
                  {item.step}
                </span>
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Technical Modules Grid + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Module Picker */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-800">
            Core Engineering Panels (7 Domains)
          </div>
          {modules.map((mod) => {
            const isSelected = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`w-full p-4 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-red-600 text-white shadow-md'
                    : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">
                    {mod.category}
                  </span>
                  <span className="text-sm font-display font-semibold text-white tracking-wide">
                    {mod.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-red-500 translate-x-1' : 'text-zinc-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="lg:col-span-7 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-8">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
            <span className="text-red-500 font-bold uppercase">
              {currentModule.category}
            </span>
            <span className="text-zinc-400 uppercase">
              Illustrative Architecture
            </span>
          </div>

          <div className="pt-6">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-3">
              {currentModule.title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              {currentModule.summary}
            </p>

            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 mb-6">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                Scientific Methodology:
              </span>
              <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                {currentModule.methodology}
              </p>
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Key Focus Disciplines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {currentModule.keyDisciplines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30 text-xs font-sans text-red-200">
              <strong className="font-mono uppercase text-red-400 block mb-1">
                Context & Objectives:
              </strong>
              {currentModule.metricsContext}
            </div>
          </div>
        </div>
      </div>

      {/* Aerodynamics Showcase Card with High-Res Image */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 h-72 sm:h-96 relative overflow-hidden">
            <img
              src="/src/assets/images/hydra_f1_car_aero_1791515722400.jpg"
              alt="HYDRA 2026 Aerodynamics & Suspension Detail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#050507]/20 to-[#050507]" />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest">
              Physical Prototype Research
            </div>
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              2026 Aerodynamic Surface Modeling
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Studying multi-element front wing endplates, exposed carbon wishbone air-wake conditioning,
              and low-drag vortex tunnels tailored to future FIA regulations.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-400">
              Illustrative engineering study · Non-homologated development concept
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
