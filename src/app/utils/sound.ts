// Sound effects utility for TyrooAI
// Uses Web Audio API to generate pleasant sounds

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('tyroo-sound') !== 'false';
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tyroo-sound', String(this.enabled));
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Success sound - pleasant ascending chime
  playSuccess() {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // First note
      this.playNote(ctx, 523.25, now, 0.1); // C5
      // Second note
      this.playNote(ctx, 659.25, now + 0.1, 0.1); // E5
      // Third note
      this.playNote(ctx, 783.99, now + 0.2, 0.15); // G5
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  }

  // Click sound - subtle
  playClick() {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      this.playNote(ctx, 800, now, 0.05, 'sine', 0.1);
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  }

  // Celebration sound - party time!
  playCelebration() {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        this.playNote(ctx, freq, now + i * 0.08, 0.12);
      });
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  }

  private playNote(
    ctx: AudioContext,
    frequency: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.15
  ) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }
}

export const soundManager = new SoundManager();
