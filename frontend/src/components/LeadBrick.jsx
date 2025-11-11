import { useRef, useEffect, useState } from 'react';
import { useGLTF, DragControls } from '@react-three/drei';
import { useSceneStore } from '../store.js';

export default function LeadBrick({ controlsRef }) {
  const { scene } = useGLTF('/brick/brick.glb');
  const { shieldPosition, setShieldPosition } = useSceneStore();
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
    if (controlsRef.current) {
      controlsRef.current.enabled = !isDragging;
    }
  }, [isDragging, controlsRef]);

  const handleDrag = (e) => {
    e.object.position.y = shieldPosition[1];
    setShieldPosition([
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
      <group ref={modelRef} position={shieldPosition}>
        <primitive object={scene} />
      </group>
    </DragControls>
  );
}
