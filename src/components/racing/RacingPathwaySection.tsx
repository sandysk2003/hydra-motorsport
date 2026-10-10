import React from 'react';
import { Flag, Trophy, ShieldAlert, Award, ChevronRight } from 'lucide-react';

interface TierData {
  tier: string;
  name: string;
  regulation: string;
  chassisEngine: string;
  roleInHydra: string;
  entryMilestones: string[];
}

export const RacingPathwaySection: React.FC = () => {
  const pathwayTiers: TierData[] = [
    {
      tier: 'STEP 01',
      name: 'National & European Karting',
      regulation: 'CIK-FIA KZ / OK-Junior',
      chassisEngine: 'Direct-drive & Shifter 125cc karting packages',
      roleInHydra: 'Grassroots driver scouting, race mechanics apprenticeship, and baseline telemetry correlation.',
      entryMilestones: [
        'Junior driver talent assessment protocols',
        'Mobile trackside data logging rigs',
        'Podium contention in premier European karting series',
      ],
    },
    {
      tier: 'STEP 02',
      name: 'Formula Regional European (FREC)',
      regulation: 'FIA Certified Regional F3 Regulations',
      chassisEngine: 'Tatuus F3 T-318 with 270hp Alpine/Renault turbo',
      roleInHydra: 'Transition to full single-seater downforce aero, multi-link kinematics, and advanced race strategy.',
      entryMilestones: [
        'Acquisition of team entry slot & transporter logistics',
        'Recruitment of Chief Race Engineer & Data Analyst',
        'In-house damper dyno and setup testing facility',
      ],
    },
    {
      tier: 'STEP 03',
      name: 'FIA Formula 3 Championship',
      regulation: 'Official FIA F1 Support Championship',
      chassisEngine: 'Dallara F3 bespoke monocoque with 380hp Mecachrome V6',
      roleInHydra: 'High-visibility international competition on Formula 1 Grand Prix weekends; high-downforce racing.',
      entryMilestones: [
        'FIA team tender application and commercial guarantees',
        'Tyre thermal management optimization with Pirelli compounds',
        'Integration of HYDRA Academy drivers into main seats',
      ],
    },
    {
      tier: 'STEP 04',
      name: 'FIA Formula 2 Championship',
      regulation: 'Premier FIA Feeder Series',
      chassisEngine: 'Dallara 2024 spec with 620hp Turbo V6 & Ground Effect',
      roleInHydra: 'Direct proving ground for carbon-brake systems, pit stop execution, and strategy under high degradation.',
      entryMilestones: [
        'Formation of 30+ dedicated trackside operational crew',
        'Super Licence points scoring capability for drivers',
        'Refined telemetry integration with HYDRA Technology lab',
      ],
    },
    {
      tier: 'STEP 05',
      name: 'Formula 1 Constructor Ambition',
      regulation: 'FIA Formula 1 World Championship',
      chassisEngine: 'Proprietary HYDRA chassis & independent hybrid power unit programme',
      roleInHydra: 'The ultimate pinnacle: independent constructor status, proprietary chassis, and full factory power unit.',
      entryMilestones: [
        'Submission of formal FIA Expression of Interest / Team entry',
        'Capitalization of state-of-the-art wind tunnel & CFD supercomputer',
        'Strict compliance with FIA Financial Regulations & Cost Cap',
      ],
    },
  ];

  return (
    <section id="racing" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>04. Sporting Pathway</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Long-Term Ambition</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          The Phased Single-Seater Ladder to Formula 1
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          HYDRA intends to build and field its own racing operations progressively through the established
          global single-seater pyramid. Each step proves technical competence, cultivates team personnel,
          and validates engineering methodologies under real race conditions.
        </p>
      </div>

      {/* Pathway Cards */}
      <div className="space-y-4 mb-16">
        {pathwayTiers.map((tier, idx) => (
          <div
            key={tier.name}
            className="p-6 sm:p-8 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-850 hover:border-zinc-700 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-red-500 uppercase">
                    {tier.tier}
                  </span>
                  <span aria-hidden="true" className="text-zinc-700">·</span>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    {tier.regulation}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Platform: {tier.chassisEngine}
                </p>
              </div>

              <div className="lg:col-span-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                  Strategic Objective:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {tier.roleInHydra}
                </p>
              </div>

              <div className="lg:col-span-4 bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80 text-xs">
                <span className="font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Prerequisites & Milestones:
                </span>
                <ul className="space-y-1 text-zinc-300 font-sans">
                  {tier.entryMilestones.map((ms, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candor and Compliance Notice */}
      <div className="p-6 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs font-sans text-zinc-400 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-zinc-200 uppercase tracking-wider font-mono block mb-1">
            Regulatory Candor & Competition Notice
          </strong>
          <p className="leading-relaxed">
            HYDRA MOTORSPORT makes no claim of having already secured championship entries, racing licences,
            or FIA Formula 1 team status. Participation in each tier remains strictly contingent upon formal tender
            approvals by championship governing bodies, entry requirements, regulatory compliance, specialist personnel recruitment,
            demonstrated competitive viability, and adequate long-term capital formation.
          </p>
        </div>
      </div>
    </section>
  );
};
