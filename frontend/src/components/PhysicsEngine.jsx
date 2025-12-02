import { useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import { useSceneStore } from '../store.js';

// How often to call the API (in seconds)
const FETCH_INTERVAL = 0.05; // Poll 10 times per second

export function PhysicsEngine() {
  const setClicksPerSecond = useSceneStore((state) => state.setClicksPerSecond);
  const lastFetchTime = useRef(0);

  useFrame((state, delta) => {
    lastFetchTime.current += delta;

    // Only run the fetch logic if enough time has passed
    if (lastFetchTime.current < FETCH_INTERVAL) {
      return; // Not time yet
    }
    
    lastFetchTime.current = 0; // Reset timer

    // Get the latest state directly from the store
    const { geigerPosition, shieldPosition } = useSceneStore.getState();

    const [geigerX, geigerY, geigerZ] = geigerPosition;
    const [shieldX, shieldY, shieldZ] = shieldPosition;

    const url = `http://127.0.0.1:8000/api/activity?counter_x=${geigerX}&counter_y=${geigerY}&counter_z=${geigerZ}&shield_x=${shieldX}&shield_y=${shieldY}&shield_z=${shieldZ}`;

    // Use promise-based fetch with .catch() to avoid syntax errors
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          // Don't throw, just stop
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setClicksPerSecond(data.clicks_per_second);
        }
      })
      .catch((error) => {
        // Silence errors to prevent console spam
        // console.error("PhysicsEngine: Failed to fetch data:", error);
      });
  });

  return null;
}