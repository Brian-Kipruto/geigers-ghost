import { create } from 'zustand';

/**
 * Zustand store to manage the state of our 3D scene.
 */
export const useSceneStore = create((set) => ({
  // Initial positions
  geigerPosition: [0, -0.5, 0], // x, y, z
  shieldPosition: [1.5, -0.5, 0], // x, y, z

  // Functions to update the positions
  setGeigerPosition: (newPos) => set({ geigerPosition: newPos }),
  setShieldPosition: (newPos) => set({ shieldPosition: newPos }),
}));