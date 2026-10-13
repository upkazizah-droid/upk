/**
 * Web Audio API procedural sound synthesizer
 * Features thrilling sound effects and an upbeat energetic background electronic melody (BGM)
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private step: number = 0;

  private initCtx() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext may be restricted in sandbox iframe
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.pauseBgm();
    } else {
      this.startBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isBgmActive(): boolean {
    return this.bgmPlaying && !this.isMuted;
  }

  // Upbeat, catchy electronic music sequence (128 BPM energetic synthwave / action loop)
  public startBgm() {
    if (this.isMuted || this.bgmPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.bgmPlaying = true;

      // 128 BPM -> 16th note interval = 60 / (128 * 4) = 0.117s (~117ms)
      const sixteenthTime = 117;

      // Bass notes sequence (Frequencies in Hz) - A minor upbeat groove (Am - F - C - G)
      const bassSeq = [
        110, 110, 220, 110, 110, 164.8, 220, 110, // A2 groove
        87.3, 87.3, 174.6, 87.3, 87.3, 130.8, 174.6, 87.3, // F2 groove
        130.8, 130.8, 261.6, 130.8, 130.8, 196, 261.6, 130.8, // C3 groove
        98, 98, 196, 98, 98, 146.8, 196, 123.5 // G2 groove
      ];

      // Catchy melody lead notes (pentatonic lead riff)
      const melodySeq: (number | null)[] = [
        440, null, 523.25, null, 659.25, 523.25, null, 440,
        null, 659.25, 587.33, null, 523.25, null, 440, null,
        523.25, null, 659.25, null, 783.99, null, 659.25, null,
        880, null, 783.99, null, 659.25, 587.33, 523.25, null
      ];

      this.step = 0;
      this.bgmInterval = window.setInterval(() => {
        if (!this.bgmPlaying || this.isMuted || !this.ctx) return;

        const now = this.ctx.currentTime;
        const currentStep = this.step % 32;

        // Play Bass pulse
        const bassFreq = bassSeq[currentStep];
        if (bassFreq) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(bassFreq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, now);
          filter.frequency.exponentialRampToValueAtTime(180, now + 0.1);

          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.11);
        }

        // Play Hi-hat rhythm every even step
        if (currentStep % 2 === 0) {
          const noiseOsc = this.ctx.createOscillator();
          const noiseGain = this.ctx.createGain();
          noiseOsc.type = 'triangle';
          noiseOsc.frequency.setValueAtTime(4000, now);

          noiseGain.gain.setValueAtTime(0.015, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

          noiseOsc.connect(noiseGain);
          noiseGain.connect(this.ctx.destination);
          noiseOsc.start(now);
          noiseOsc.stop(now + 0.045);
        }

        // Play Melody lead riff
        const leadFreq = melodySeq[currentStep];
        if (leadFreq) {
          const leadOsc = this.ctx.createOscillator();
          const leadGain = this.ctx.createGain();

          leadOsc.type = 'sine';
          leadOsc.frequency.setValueAtTime(leadFreq, now);

          leadGain.gain.setValueAtTime(0.04, now);
          leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

          leadOsc.connect(leadGain);
          leadGain.connect(this.ctx.destination);

          leadOsc.start(now);
          leadOsc.stop(now + 0.19);
        }

        this.step++;
      }, sixteenthTime);
    } catch {}
  }

  public pauseBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.bgmPlaying) {
      this.pauseBgm();
    } else {
      this.isMuted = false;
      this.startBgm();
    }
    return this.bgmPlaying;
  }

  // Heartbeat thump for tense moments
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(60, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.15);

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);
    } catch {}
  }

  // Digital countdown tick
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // Dramatic decision made / selection click
  public playSelection() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  // Correct choice harmonic chime
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.42);
      });
    } catch {}
  }

  // Dangerous / wrong choice buzzer
  public playWarning() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [180, 192].forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 0.8, now + 0.35);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      });
    } catch {}
  }

  // Celebratory victory fanfare for digital badge
  public playBadgeFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.28, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.65);
      });
    } catch {}
  }
}

export const soundManager = new SoundController();
