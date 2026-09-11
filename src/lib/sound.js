// Bumblebee Web Audio API Sound Synthesizer
// Generates high-fidelity signature BUZZ ALERT with continuous alarm loop until dismissed.

let audioCtx = null;
let buzzIntervalId = null;
let isBuzzingActive = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a single urgent burst sequence of the Bumblebee Buzz
 */
function playBuzzPulse() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, now);
    masterGain.connect(ctx.destination);

    // 2-Burst urgent sawtooth & square frequency drop
    for (let burst = 0; burst < 2; burst++) {
      const burstStart = now + burst * 0.22;

      // Primary Sawtooth Oscillator (390Hz -> 250Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(390, burstStart);
      osc1.frequency.exponentialRampToValueAtTime(250, burstStart + 0.16);

      // Secondary Square Oscillator for piercing urgency (195Hz -> 125Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(195, burstStart);
      osc2.frequency.exponentialRampToValueAtTime(125, burstStart + 0.16);

      // Lowpass Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1900, burstStart);

      // Burst Envelope
      const burstGain = ctx.createGain();
      burstGain.gain.setValueAtTime(0.0, burstStart);
      burstGain.gain.linearRampToValueAtTime(0.85, burstStart + 0.02);
      burstGain.gain.exponentialRampToValueAtTime(0.001, burstStart + 0.18);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(burstGain);
      burstGain.connect(masterGain);

      osc1.start(burstStart);
      osc1.stop(burstStart + 0.19);
      osc2.start(burstStart);
      osc2.stop(burstStart + 0.19);
    }

    // Trigger haptic vibration on mobile if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([200, 80, 200, 80, 300]);
    }
  } catch (err) {
    console.warn("Could not play synthesized Buzz Alert:", err);
  }
}

/**
 * Starts continuous Buzz Alert looping until user explicitly silences/turns it off
 */
export function startContinuousBuzzAlert() {
  if (isBuzzingActive) return;
  isBuzzingActive = true;

  // Immediate first pulse
  playBuzzPulse();

  // Continuous loop every 900ms
  buzzIntervalId = setInterval(() => {
    if (isBuzzingActive) {
      playBuzzPulse();
    } else {
      clearInterval(buzzIntervalId);
    }
  }, 900);
}

/**
 * Stops and silences the continuous Buzz Alert immediately
 */
export function stopContinuousBuzzAlert() {
  isBuzzingActive = false;
  if (buzzIntervalId) {
    clearInterval(buzzIntervalId);
    buzzIntervalId = null;
  }
}

/**
 * Convenience toggle or trigger
 */
export function playBuzzAlert() {
  startContinuousBuzzAlert();
}

/**
 * Checks if continuous buzzer is active
 */
export function isBuzzActive() {
  return isBuzzingActive;
}

/**
 * Plays Recovery / Resolution Chime:
 * A bright, reassuring harmonic major triad indicating service health restored.
 */
export function playRecoverySound() {
  stopContinuousBuzzAlert();
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    freqs.forEach((freq, idx) => {
      const startTime = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch (err) {
    console.warn("Could not play recovery chime:", err);
  }
}

/**
 * Plays subtle tactile click for UI buttons
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {}
}
