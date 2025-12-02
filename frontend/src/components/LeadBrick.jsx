import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
import { useSceneStore } from '../store.js';

export default function LeadBrick({ controlsRef }) {
  const { scene } = useGLTF('/brick/brick.glb'); // Path from your original file
  // Get the initial position and the setter
  const shieldPosition = useSceneStore((state) => state.shieldPosition);
  const setShieldPosition = useSceneStore((state) => state.setShieldPosition);
  
  const controls = controlsRef;
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
  }, [scene]);

  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (controls.current) {
      controls.current.enabled = !isDragging;
    }
  }, [isDragging, controls]);

  // Update the store on *every* drag movement
const handleDrag = () => {
    if (modelRef.current) {
      const currentPos = modelRef.current.position;
      
      // FIX: Constrain Y to the current store value (0.85), not 0
      // We read the initial Y from the store, so it stays on the table
      currentPos.y = geigerPosition[1]; 
      
      setGeigerPosition([
        currentPos.x,
        currentPos.y, // This ensures it doesn't drop to the floor
        currentPos.z,
      ]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // We no longer need to set position here, just log
    console.log("LeadBrick: Drag ENDED.");
  };

  return (
    <DragControls
      onDragStart={() => {
        console.log("LeadBrick: Drag STARTED.");
        setIsDragging(true);
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      makeDefault
    >
      <group ref={modelRef} position={shieldPosition}>
        <primitive 
          object={scene} 
          rotation={[0, Math.PI / 1,0]} 
        />
      </group>
    </DragControls>
  );
}