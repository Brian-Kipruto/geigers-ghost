import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Vignette, Scanline, Bloom } from '@react-three/postprocessing';

// Components
import LabScene from './components/LabScene'; 
import GeigerCounter from './components/GeigerCounter';
import LeadBrick from './components/LeadBrick';
import { PhysicsEngine } from './components/PhysicsEngine';
import { AudioPlayer } from './components/AudioPlayer';
import { Dust } from './components/Dust';
import RadiationMonitor from './components/RadiationMonitor';
import TutorialOverlay from './components/TutorialOverlay';

// --- NEW HELPER: Logs Camera Position to Console ---
function CameraLogger() {
  useFrame((state) => {
    const { x, y, z } = state.camera.position;
    // Logs nicely formatted array for easy copy-pasting
    console.log(`CAMERA POS: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`);
  });
  return null;
}

function FlickeringLight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5 + Math.random() * 0.2;
    }
  });
  return (
    <pointLight ref={lightRef} position={[2, 3, 1]} intensity={2} distance={10} decay={2} castShadow />
  );
}

export default function App() {
  const controlsRef = useRef();

  return (
    <>
      <RadiationMonitor />
      <TutorialOverlay />
      

      {/* Once you find your perfect angle in the console, 
          COPY the values and PASTE them into the 'position' prop below!
      */}
      <Canvas shadows camera={{ position: [2.5, 1.6, 4.0], fov: 60 }} fog={['#000000', 2, 12]}>
        
        {/* --- ACTIVATE LOGGER --- */}
        <CameraLogger />

        <ambientLight intensity={0.15} />
        <FlickeringLight />
        
        <LabScene />
        
        <GeigerCounter controlsRef={controlsRef} />
        <LeadBrick controlsRef={controlsRef} />
        
        <OrbitControls 
           ref={controlsRef}
           minDistance={2}
           maxDistance={7}
           maxPolarAngle={Math.PI / 2} 
        />
        <PhysicsEngine /> 
        <AudioPlayer />
        <Dust />
        
        <EffectComposer>
          <Scanline density={1.5} opacity={0.1} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
          <Bloom intensity={0.5} luminanceThreshold={0.4} />
        </EffectComposer>
      </Canvas>
    </>
  );
}