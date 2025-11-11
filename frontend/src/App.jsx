import { useRef } from 'react'; // <-- 1. IMPORT useRef
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GeigerCounter from './components/GeigerCounter';
import LeadBrick from './components/LeadBrick';

// ... (FlickeringLight function is unchanged) ...
function FlickeringLight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });
  return (
    <pointLight ref={lightRef} position={[0, 3, 0]} intensity={2} castShadow />
  );
}

/**
 * The main 3D scene.
 */
export default function App() {
  const controlsRef = useRef(); // <-- 2. CREATE THE REF

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <FlickeringLight />

      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8a8989ff" />
      </mesh>

      {/* 3. PASS THE REF AS A PROP */}
      <GeigerCounter controlsRef={controlsRef} />
      <LeadBrick controlsRef={controlsRef} />

      {/* 4. ASSIGN THE REF TO ORBITCONTROLS */}
      <OrbitControls ref={controlsRef} />
      
      <axesHelper args={[1]} />
    </Canvas>
  );
}