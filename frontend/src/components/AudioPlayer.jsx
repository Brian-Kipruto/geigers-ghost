import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '../store.js';
import * as Tone from 'tone';

// --- Create our Synthesized Geiger Click ---

// 1. A white noise source
const noise = new Tone.Noise("white");

// 2. An "envelope" to shape the noise into a "click"
// It has a very fast attack and decay
const envelope = new Tone.AmplitudeEnvelope({
  attack: 0.001,
  decay: 0.04,
  sustain: 0,
  release: 0,
}).toDestination();

// 3. Connect the noise to the envelope
noise.connect(envelope);

// 4. Start the noise (it's silent until the envelope opens)
noise.start();

// ------------------------------------------

export function AudioPlayer() {
  const timeSinceLastClick = useRef(0);
  const clicksPerSecond = useSceneStore((state) => state.clicksPerSecond);

  // We still need this to "unlock" the audio on the first click
  useEffect(() => {
    const startAudio = async () => {
      await Tone.start();
    };
    startAudio();
  }, []);

  useFrame((state, delta) => {
    const clicks = clicksPerSecond;
    
    if (clicks <= 0) {
      timeSinceLastClick.current = 0;
      return;
    }

    // Calculate the delay + a tiny bit of randomness
    const randomJitter = Math.random() * 0.1 - 0.05;
    const delay = 1.0 / clicks + randomJitter;
    
    timeSinceLastClick.current += delta;

    if (timeSinceLastClick.current > delay) {
      // --- Play our synthesized click ---
      // We trigger the envelope to open and close very quickly
      envelope.triggerAttackRelease("64n"); // "64n" = a 64th note
      
      timeSinceLastClick.current = 0; // Reset the counter
    }
  });

  return null; // This component is invisible
}