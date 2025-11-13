import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function LabScene() {
  const { scene } = useGLTF('/lab_scene.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}
