import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '../store.js';
import * as Tone from 'tone';

// --- Create our Synthesized Geiger Click ---
const noise = new Tone.Noise("white");
const envelope = new Tone.AmplitudeEnvelope({
  attack: 0.001,
  decay: 0.04,
  sustain: 0,
  release: 0,
}).toDestination();

noise.connect(envelope);
noise.start();

export function AudioPlayer() {
  const clicksPerSecond = useSceneStore((state) => state.clicksPerSecond);

  useEffect(() => {
    const startAudio = async () => {
      await Tone.start();
    };
    startAudio();
  }, []);

  useFrame((state, delta) => {
    const lambda = clicksPerSecond;
    
    // If we have 0 clicks, do nothing
    if (lambda <= 0) return;

    // --- POISSON PROCESS SIMULATION ---
    // Instead of a timer, we calculate the probability of a click occurring 
    // during this specific frame slice (delta).
    // Probability P = 1 - e^(-lambda * delta)
    // For small (lambda * delta), this is approx equal to (lambda * delta).
    
    const probability = 1 - Math.exp(-lambda * delta);
    
    if (Math.random() < probability) {
      // Trigger the click!
      // We vary the velocity (volume) slightly for more realism
      const velocity = 0.8 + Math.random() * 0.4;
      envelope.triggerAttackRelease("32n", "+0", velocity);
    }
  });

  return null;
}