import { create } from 'zustand';

export const useSceneStore = create((set) => ({
  // ... (Keep existing positions) ...
  geigerPosition: [-2.3, 1.3, 0], 
  shieldPosition: [7.4, 1.75, 0],
  
  // TUTORIAL STATE
  // 0: Welcome, 1: Controls, 2: Inverse Square, 3: Shielding, 4: Free Play
  tutorialStep: 0,
  setTutorialStep: (step) => set({ tutorialStep: step }),

  setGeigerPosition: (newPos) => set({ geigerPosition: newPos }),
  setShieldPosition: (newPos) => set({ shieldPosition: newPos }),
  clicksPerSecond: 0,
  setClicksPerSecond: (clicks) => set({ clicksPerSecond: clicks }),
}));