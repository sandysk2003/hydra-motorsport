/**
 * Subtle Web Audio API ambient synthesizer for HYDRA MOTORSPORT.
 * Generates restrained low-frequency harmonic drone and telemetry tick feedback.
 */

class HydraSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscDrone1: OscillatorNode | null = null;
  private oscDrone2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported
    }
  }

  public startAmbiance(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) return true;

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 2.5); // Very quiet and tasteful

      // Low pass filter for warmth
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      // Low hum 55Hz (A1)
      this.oscDrone1 = this.ctx.createOscillator();
      this.oscDrone1.type = 'sawtooth';
      this.oscDrone1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Sub-harmonic 27.5Hz (A0)
      this.oscDrone2 = this.ctx.createOscillator();
      this.oscDrone2.type = 'sine';
      this.oscDrone2.frequency.setValueAtTime(27.5, this.ctx.currentTime);

      this.oscDrone1.connect(this.filter);
      this.oscDrone2.connect(this.filter);
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.oscDrone1.start();
      this.oscDrone2.start();
      this.isRunning = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopAmbiance() {
    if (!this.ctx || !this.isRunning || !this.masterGain) return;
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        if (this.oscDrone1) {
          try { this.oscDrone1.stop(); this.oscDrone1.disconnect(); } catch {}
          this.oscDrone1 = null;
        }
        if (this.oscDrone2) {
          try { this.oscDrone2.stop(); this.oscDrone2.disconnect(); } catch {}
          this.oscDrone2 = null;
        }
        this.isRunning = false;
      }, 1300);
    } catch {
      this.isRunning = false;
    }
  }

  public triggerChirp() {
    if (!this.ctx || !this.isRunning) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }
}

export const soundEngine = new HydraSoundEngine();
