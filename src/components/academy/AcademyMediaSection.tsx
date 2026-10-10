import React from 'react';
import { GraduationCap, Video, Users, Sparkles, Tv, Target, HeartHandshake } from 'lucide-react';

export const AcademyMediaSection: React.FC = () => {
  return (
    <section id="academy" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>07. Talent & Audience</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Human Capital & Culture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Developing Elite Drivers & Demystifying Deep Engineering
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          Hardware and algorithms only succeed when paired with exceptional human capability.
          HYDRA ACADEMY prepares emerging drivers for the cognitive rigours of modern single-seaters,
          while HYDRA MEDIA invites the world to witness every stage of development.
        </p>
      </div>

      {/* 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* HYDRA ACADEMY */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src="/src/assets/images/hydra_driver_academy_1791515748706.jpg"
                alt="HYDRA Professional Racing Simulator Cockpit"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-zinc-700 rounded text-[11px] font-mono text-white uppercase tracking-wider">
                  Driver Development Hub
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>HYDRA ACADEMY</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-3">
                Precision Cognitive & Simulator Preparation
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans mb-6">
                Bridging the gap from competitive karting to high-downforce single-seaters requires intense cognitive preparation.
                Our planned curriculum couples hardware-in-the-loop dynamic simulators with physiological stamina conditioning.
              </p>

              <div className="space-y-3 pt-4 border-t border-zinc-850">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <Target className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Bespoke Full-Motion Simulators:</strong>
                    <span>Curved visual rigs and hydraulic pedal feedback replicating formula steering torque loads.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <Target className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Engineering Telemetry Debriefs:</strong>
                    <span>Drivers learn to read brake pressure delta curves and communicate precise technical feedback to race engineers.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <Target className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">G-Force Conditioning:</strong>
                    <span>Neck strengthening, vestibular balance, and reaction speed conditioning under physiological fatigue.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/40 border-t border-zinc-850 text-xs font-mono text-zinc-400">
            Intended driver preparation programme under curriculum development.
          </div>
        </div>

        {/* HYDRA MEDIA */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between">
          <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                <Video className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-wider mb-2">
                <Tv className="w-4 h-4" />
                <span>HYDRA MEDIA</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-4">
                Technical Storytelling & Global Sponsor Activation
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans mb-6">
                Modern motorsport audiences crave genuine insight rather than sanitized PR.
                HYDRA MEDIA is conceived as an editorial broadcast production arm that captures the engineering triumphs,
                the heartbreak of mechanical setbacks, and the scientific realities of car development.
              </p>

              <div className="space-y-4 pt-4 border-t border-zinc-850">
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
                  <h4 className="font-display font-semibold text-white uppercase tracking-wide mb-1">
                    Docu-Series & Engineering Explainers
                  </h4>
                  <p className="text-zinc-300">
                    High-definition breakdown of aerodynamics, CFD vortex breakdown, tyre graining, and dyno runs demystified for motorsport enthusiasts.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
                  <h4 className="font-display font-semibold text-white uppercase tracking-wide mb-1">
                    Driver Journey Documentaries
                  </h4>
                  <p className="text-zinc-300">
                    Chronicles following junior drivers through the emotional and physical intensity of karting grids and feeder series.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
                  <h4 className="font-display font-semibold text-white uppercase tracking-wide mb-1">
                    Partner & Sponsor Integration
                  </h4>
                  <p className="text-zinc-300">
                    Authentic storytelling showcasing technical partner hardware, cloud infrastructure, and components in active track usage.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-850 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Audience Strategy:</span>
              <span className="text-zinc-200">Global Digital Broadcast & Open Journalism</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
