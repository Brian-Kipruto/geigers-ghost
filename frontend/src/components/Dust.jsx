import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Dust() {
  const ref = useRef();
  const count = 5000; // Number of dust particles

  // Create the random positions for the particles
  const positions = useMemo(() => {
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      particles[i * 3] = (Math.random() - 0.5) * 10; // x
      particles[i * 3 + 1] = Math.random() * 5;      // y
      particles[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return particles;
  }, [count]);

  // Animate the particles
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02; // Slowly rotate the cloud
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.01} 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
      />
    </points>
  );
}