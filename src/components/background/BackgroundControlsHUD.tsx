import React, { useState } from 'react';
import { Layers, Wind, Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface BackgroundControlsHUDProps {
  wireframeMode: boolean;
  onToggleWireframe: () => void;
  aeroTrailsEnabled: boolean;
  onToggleAeroTrails: () => void;
  trailDensity: 'subtle' | 'dense' | 'off';
  onChangeTrailDensity: (density: 'subtle' | 'dense' | 'off') => void;
}

export const BackgroundControlsHUD: React.FC<BackgroundControlsHUDProps> = ({
  wireframeMode,
  onToggleWireframe,
  aeroTrailsEnabled,
  onToggleAeroTrails,
  trailDensity,
  onChangeTrailDensity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  const toggleAudio = () => {
    if (audioActive) {
      soundEngine.stopAmbiance();
      setAudioActive(false);
    } else {
      const ok = soundEngine.startAmbiance();
      if (ok) {
        soundEngine.triggerChirp();
        setAudioActive(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Control Pod */}
      {isOpen && (
        <div className="mb-3 p-3.5 bg-zinc-950/85 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl w-64 text-xs font-mono transition-all">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80">
            <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-sans font-medium">Hyperdrive Visuals</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 px-1 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Wireframe CAD toggle */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                CAD Wireframe
              </span>
              <button
                onClick={onToggleWireframe}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  wireframeMode
                    ? 'bg-red-600/90 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {wireframeMode ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            {/* Aero Streamlines */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-zinc-400" />
                Aero Streamlines
              </span>
              <button
                onClick={onToggleAeroTrails}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  aeroTrailsEnabled
                    ? 'bg-red-600/90 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {aeroTrailsEnabled ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            {/* Particle Density */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                Trail Density
              </span>
              <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
                {(['subtle', 'dense', 'off'] as const).map((density) => (
                  <button
                    key={density}
                    onClick={() => onChangeTrailDensity(density)}
                    className={`px-1.5 py-0.5 rounded text-[10px] capitalize cursor-pointer transition-colors ${
                      trailDensity === density
                        ? 'bg-zinc-700 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Ambiance Synthesizer */}
            <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
              <span className="text-zinc-300 flex items-center gap-1.5">
                {audioActive ? (
                  <Volume2 className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                )}
                Acoustic Field
              </span>
              <button
                onClick={toggleAudio}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  audioActive
                    ? 'bg-red-600/90 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {audioActive ? 'ON' : 'MUTED'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleAudio}
          title={audioActive ? 'Mute Ambiance' : 'Enable Ambiance'}
          className="p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white backdrop-blur-md shadow-lg transition-all cursor-pointer"
        >
          {audioActive ? (
            <Volume2 className="w-4 h-4 text-red-500" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/85 hover:bg-zinc-900 border border-zinc-800 text-zinc-200 backdrop-blur-md shadow-lg hover:border-zinc-700 transition-all cursor-pointer text-xs font-mono font-medium"
        >
          <Eye className="w-3.5 h-3.5 text-red-500" />
          <span>VIEWPORT CONTROLS</span>
        </button>
      </div>
    </div>
  );
};
