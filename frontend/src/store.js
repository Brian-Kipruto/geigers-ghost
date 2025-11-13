import { create } from 'zustand';

/**
 * Zustand store to manage the state of our 3D scene.
 */
export const useSceneStore = create((set) => ({
  // Initial positions
  geigerPosition: [0, 0, 0], // Let's start them at the world origin
  shieldPosition: [1.5, 0, 0],

  // Functions to update the positions
  setGeigerPosition: (newPos) => set({ geigerPosition: newPos }),
  setShieldPosition: (newPos) => set({ shieldPosition: newPos }),
  clicksPerSecond: 0,
  setClicksPerSecond: (clicks) => set({ clicksPerSecond: clicks }),
}));