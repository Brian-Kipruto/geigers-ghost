import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Vignette, Scanline, Bloom } from '@react-three/postprocessing';

// Import our new scene
import LabScene from './components/LabScene'; 

import GeigerCounter from './components/GeigerCounter';
import LeadBrick from './components/LeadBrick';
import { PhysicsEngine } from './components/PhysicsEngine';
import { AudioPlayer } from './components/AudioPlayer';
import { Dust } from './components/Dust'; // We're keeping the dust!

// We can keep the flickering light to add to the spookiness
function FlickeringLight() {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });
  // Let's move the light to be inside the lab
  return (
    <pointLight ref={lightRef} position={[0, 2.5, 0]} intensity={2} castShadow />
  );
}

export default function App() {
  const controlsRef = useRef();

  return (
    // Add black fog to make it spooky
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }} fog={['#000000', 3, 15]}>
      
      {/* --- SCENE --- */}
      <ambientLight intensity={0.1} /> {/* Keep it dark */}
      <FlickeringLight />
      
      {/* --- DELETE THE OLD FLOOR MESH --- */}
      
      {/* --- ADD THE NEW LAB SCENE --- */}
      <LabScene />
      
      {/* --- PROPS (These will now be at [0,0,0]) --- */}
      <GeigerCounter controlsRef={controlsRef} />
      <LeadBrick controlsRef={controlsRef} />
      
      {/* --- HELPERS --- */}
      <OrbitControls ref={controlsRef} />
      
      {/* --- INVISIBLE ENGINES --- */}
      <PhysicsEngine /> 
      <AudioPlayer />
      <Dust /> {/* Keep the dust for atmosphere! */}
      
      {/* --- POST-PROCESSING --- */}
      <EffectComposer>
        <Scanline density={1.5} opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <Bloom 
          intensity={0.4} // Glow from the green vats
          luminanceThreshold={0.5} 
        />
      </EffectComposer>
    </Canvas>
  );
}