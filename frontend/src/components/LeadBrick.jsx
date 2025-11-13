import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
import { useSceneStore } from '../store.js';

export default function LeadBrick({ controlsRef }) {
  const { scene } = useGLTF('/brick/brick.glb'); // <-- Make sure this path is correct!
  const { shieldPosition, setShieldPosition } = useSceneStore();
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

  const handleDrag = (e) => {
    if (modelRef.current) {
      modelRef.current.position.y = shieldPosition[1];
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (modelRef.current) {
      console.log("LeadBrick: Drag ENDED. New pos:", modelRef.current.position);
      setShieldPosition([
        modelRef.current.position.x,
        modelRef.current.position.y,
        modelRef.current.position.z,
      ]);
    } else {
      console.error("LeadBrick: modelRef is not set!");
    }
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
        <primitive object={scene} />
      </group>
    </DragControls>
  );
}