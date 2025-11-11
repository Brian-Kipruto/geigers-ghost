import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
// import { useThree } from '@react-three/fiber'; // <-- 1. DELETE THIS
import { useSceneStore } from '../store.js';

// 2. ACCEPT THE PROP
export default function GeigerCounter({ controlsRef }) {
  const { scene } = useGLTF('/scene.gltf');
  const { geigerPosition, setGeigerPosition } = useSceneStore();
  // const controls = useThree((state) => state.controls); // <-- 3. DELETE THIS
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    // 4. USE THE PROP-BASED REF
    if (controlsRef.current) {
      controlsRef.current.enabled = !isDragging;
    }
    // 5. ADD 'controlsRef' TO DEPENDENCY ARRAY
  }, [isDragging, controlsRef]); 

  const handleDrag = (e) => {
    e.object.position.y = geigerPosition[1];
    setGeigerPosition([
      e.object.position.x,
      e.object.position.y,
      e.object.position.z,
    ]);
  };

  return (
    <DragControls
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onDrag={handleDrag}
      makeDefault
    >
      <group ref={modelRef} position={geigerPosition}>
        <primitive object={scene} />
      </group>
    </DragControls>
  );
}