import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
import { useSceneStore } from '../store.js';

export default function GeigerCounter({ controlsRef }) {
  const { scene } = useGLTF('/scene.gltf');
  // Get the initial position and the setter
  const geigerPosition = useSceneStore((state) => state.geigerPosition);
  const setGeigerPosition = useSceneStore((state) => state.setGeigerPosition);
  
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
      
      currentPos.y = geigerPosition[1];
      
      // ADD THIS LINE TO FIND THE VAT:
      console.log(`SURVEY: X=${currentPos.x.toFixed(2)}, Z=${currentPos.z.toFixed(2)}`);

      setGeigerPosition([
        currentPos.x,
        currentPos.y,
        currentPos.z,
      ]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // We no longer need to set position here, just log
    console.log("GeigerCounter: Drag ENDED.");
  };

  return (
    <DragControls
      onDragStart={() => {
        console.log("GeigerCounter: Drag STARTED.");
        setIsDragging(true);
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      makeDefault
    >
      <group ref={modelRef} position={geigerPosition}>
        <primitive object={scene} />
      </group>
    </DragControls>
  );
}