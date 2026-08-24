import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';

export default function Contact3D() {
  const sphereRef = useRef();
  const icoRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(t / 4);
      sphereRef.current.rotation.y = Math.sin(t / 4);
    }
    if (icoRef.current) {
      icoRef.current.rotation.y += 0.005;
      icoRef.current.rotation.x += 0.005;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[2, 0, -2]}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={1.2}>
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3} position={[-3, -1, -3]}>
        <Icosahedron ref={icoRef} args={[1, 0]} scale={1.5}>
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            roughness={0.1}
            metalness={0.5}
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5} position={[0, 2, -4]}>
         <Sphere args={[0.5, 32, 32]} scale={0.8}>
          <meshStandardMaterial
            color="#4ade80"
            roughness={0.3}
            metalness={0.8}
            emissive="#4ade80"
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
          />
        </Sphere>
      </Float>
    </>
  );
}
