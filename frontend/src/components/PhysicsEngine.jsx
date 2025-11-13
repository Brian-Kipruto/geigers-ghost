import { useEffect } from 'react';
import { useSceneStore } from '../store.js';

export function PhysicsEngine() {
  // --- THIS IS THE FIX ---
  // We subscribe to the primitive values (numbers), not the array.
  // The component will *only* re-render if one of these 6 numbers changes.
  const geigerX = useSceneStore((state) => state.geigerPosition[0]);
  const geigerY = useSceneStore((state) => state.geigerPosition[1]);
  const geigerZ = useSceneStore((state) => state.geigerPosition[2]);
  const shieldX = useSceneStore((state) => state.shieldPosition[0]);
  const shieldY = useSceneStore((state) => state.shieldPosition[1]);
  const shieldZ = useSceneStore((state) => state.shieldPosition[2]);
  const setClicksPerSecond = useSceneStore((state) => state.setClicksPerSecond);
  // --- END OF FIX ---

  // This hook will now *only* run when one of the 6 coordinates changes.
  useEffect(() => {
    console.log('PhysicsEngine: Position changed. Fetching new data...');
    
    const fetchActivity = async () => {
      // We use the selected values here
      const url = `http://127.0.0.1:8000/api/activity?counter_x=${geigerX}&counter_y=${geigerY}&counter_z=${geigerZ}&shield_x=${shieldX}&shield_y=${shieldY}&shield_z=${shieldZ}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        console.log('PhysicsEngine: Received new data:', data);
        setClicksPerSecond(data.clicks_per_second);

      } catch (error) {
        console.error("PhysicsEngine: Failed to fetch data:", error);
      }
    };

    fetchActivity();
  }, [geigerX, geigerY, geigerZ, shieldX, shieldY, shieldZ]);

  return null; // This component is invisible
}