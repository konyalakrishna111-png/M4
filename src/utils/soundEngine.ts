class SoundEngine {
  private ctx: AudioContext | null = null;
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public startEngineSound() {
    this.initContext();
    if (!this.ctx || this.isRunning) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc2 = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();
      this.filterNode = this.ctx.createBiquadFilter();

      // Low frequency rumble (Inline-6 idle sound simulation)
      this.engineOsc1.type = 'sawtooth';
      this.engineOsc1.frequency.setValueAtTime(45, this.ctx.currentTime); // 45 Hz deep engine pulse

      this.engineOsc2.type = 'triangle';
      this.engineOsc2.frequency.setValueAtTime(90, this.ctx.currentTime); // Harmonic twin turbo hum

      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);

      this.engineOsc1.connect(this.filterNode);
      this.engineOsc2.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.engineOsc1.start();
      this.engineOsc2.start();
      this.isRunning = true;
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  public stopEngineSound() {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          this.engineOsc1?.stop();
          this.engineOsc2?.stop();
          this.engineOsc1?.disconnect();
          this.engineOsc2?.disconnect();
          this.isRunning = false;
        } catch {}
      }, 500);
    }
  }

  public playClickSound() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  public revEngine() {
    this.initContext();
    if (!this.ctx || !this.isRunning || !this.engineOsc1 || !this.engineOsc2) return;

    const now = this.ctx.currentTime;
    // Simulate throttle rev
    this.engineOsc1.frequency.exponentialRampToValueAtTime(140, now + 0.6);
    this.engineOsc1.frequency.exponentialRampToValueAtTime(50, now + 1.8);

    this.engineOsc2.frequency.exponentialRampToValueAtTime(280, now + 0.6);
    this.engineOsc2.frequency.exponentialRampToValueAtTime(100, now + 1.8);
  }
}

export const soundEngine = new SoundEngine();
