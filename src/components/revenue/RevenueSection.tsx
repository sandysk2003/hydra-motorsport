import React from 'react';
import {
  Code2,
  Share2,
  Wrench,
  Megaphone,
  Network,
  GraduationCap,
  Clapperboard,
  Zap,
  Info
} from 'lucide-react';
import { RevenueStream } from '../../types';

export const RevenueSection: React.FC = () => {
  const streams: RevenueStream[] = [
    {
      id: 'rev-1',
      title: 'AI & Motorsport Software Subscriptions',
      category: 'SAAS PLATFORM',
      description:
        'Recurring subscriptions to HYDRA predictive strategy engines, vehicle setup solvers, and synthetic telemetry visualizers for privateer teams and trackday enthusiasts.',
      timeline: 'Near-to-medium term development',
      governance: 'Software licensing agreement · No equity or team IP transfer',
    },
    {
      id: 'rev-2',
      title: 'Technology Licensing & Data Services',
      category: 'ENTERPRISE LICENSING',
      description:
        'Licensing proprietary mathematical models, damper dyno correlation algorithms, and edge-telemetry compression protocols to automotive OEM clients.',
      timeline: 'Medium-term corporate contracts',
      governance: 'Commercial intellectual property license with defined scope',
    },
    {
      id: 'rev-3',
      title: 'Engineering & Simulation Services',
      category: 'CONSULTING SERVICES',
      description:
        'Bespoke vehicle dynamics consulting, full-vehicle CFD aerodynamic optimization, and structural finite-element analysis executed by HYDRA engineering specialists.',
      timeline: 'Near-term service contracts',
      governance: 'Fee-for-service consulting agreement',
    },
    {
      id: 'rev-4',
      title: 'Commercial Sponsorships',
      category: 'BRAND PARTNERSHIPS',
      description:
        'Global brand visibility across race team liveries, race suits, transporter logistics, digital broadcasts, and paddock hospitality access.',
      timeline: 'Aligned with racing championship entries',
      governance: 'Commercial sponsorship agreement · Does not confer equity or corporate ownership',
    },
    {
      id: 'rev-5',
      title: 'Technical Partnerships',
      category: 'CO-DEVELOPMENT',
      description:
        'Strategic collaboration with computing hardware providers, sensor fabricators, composite manufacturers, and cloud computing infrastructure providers.',
      timeline: 'Ongoing bilateral co-development',
      governance: 'Technical collaboration contract with reciprocal capability exchange',
    },
    {
      id: 'rev-6',
      title: 'Driver Development & Academy Fees',
      category: 'ACADEMY PROGRAMMES',
      description:
        'Tuition and evaluation fees for emerging drivers undergoing high-fidelity dynamic simulator coaching, data telemetry debriefs, and fitness conditioning.',
      timeline: 'Medium-term academy rollout',
      governance: 'Academy enrolment & coaching services agreement',
    },
    {
      id: 'rev-7',
      title: 'Media Production & Content Monetisation',
      category: 'MEDIA ASSETS',
      description:
        'Monetisation of digital engineering docu-series, technical explainers, commercial production fees for sponsor activations, and broadcast syndication.',
      timeline: 'Immediate digital channel inception',
      governance: 'Media broadcast, advertising, and syndication contracts',
    },
    {
      id: 'rev-8',
      title: 'Future Powertrain Services & Tech',
      category: 'POWERTRAIN COMMERCIALISATION',
      description:
        'Long-term engineering services around high-voltage motorsport battery packaging, dyno testing, and sustainable drop-in fuel optimization for customer racing programmes.',
      timeline: 'Long-term research horizon',
      governance: 'Specialized powertrain engineering and supply agreements',
    },
  ];

  return (
    <section id="revenue" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>09. Business Architecture</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Eight Revenue Channels</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Diversified Commercial Revenue Streams
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA is designed to avoid dependency on a single volatile sponsor budget.
          A diversified revenue architecture spans high-margin software SaaS, engineering services,
          commercial sponsorships, and proprietary intellectual property licensing.
        </p>
      </div>

      {/* 8 Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {streams.map((stream, idx) => (
          <div
            key={stream.id}
            className="p-6 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-850 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                <span className="text-red-500 font-bold">STREAM 0{idx + 1}</span>
                <span className="uppercase">{stream.category}</span>
              </div>
              <h3 className="text-base font-display font-bold text-white uppercase tracking-tight mb-2">
                {stream.title}
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
                {stream.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-850 space-y-1.5 text-[11px] font-mono">
              <div className="text-zinc-400">
                <span className="text-zinc-400">HORIZON:</span> {stream.timeline}
              </div>
              <div className="text-zinc-400">
                <span className="text-zinc-400">STRUCTURE:</span> {stream.governance}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Governance & Distinction Notice */}
      <div className="p-7 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs font-sans text-zinc-400 flex items-start gap-4">
        <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <strong className="text-zinc-200 uppercase tracking-wider font-mono block">
            Commercial Distinction & Governance Notice
          </strong>
          <p className="leading-relaxed">
            The activation and availability of each prospective revenue stream depends on HYDRA's future development trajectory,
            client acquisition, technical readiness, executed commercial agreements, and regulatory approvals.
          </p>
          <p className="leading-relaxed">
            HYDRA strictly maintains the legal and structural distinction between commercial sponsors, technical collaborators, equipment suppliers, and equity investors:
            <strong> Commercial sponsorship does not confer equity ownership, management control, or proprietary IP title in HYDRA MOTORSPORT.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};
