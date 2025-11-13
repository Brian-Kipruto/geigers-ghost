import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
import { useSceneStore } from '../store.js';

export default function GeigerCounter({ controlsRef }) {
  const { scene } = useGLTF('/scene.gltf');
  const { geigerPosition, setGeigerPosition } = useSceneStore();
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
      modelRef.current.position.y = geigerPosition[1];
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (modelRef.current) {
      console.log("GeigerCounter: Drag ENDED. New pos:", modelRef.current.position);
      setGeigerPosition([
        modelRef.current.position.x,
        modelRef.current.position.y,
        modelRef.current.position.z,
      ]);
    } else {
      console.error("GeigerCounter: modelRef is not set!");
    }
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