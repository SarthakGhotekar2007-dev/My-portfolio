import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const meshRef = useRef();
  const particlesRef = useRef();

  // Create particles
  const timeRef = useRef(0);
  const particlesCount = 50;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = t * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Main Core */}
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#0B1020"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
      
      {/* Glowing Inner Core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.3} />
      </Sphere>

      {/* Outer wireframe for extra techy feel */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8B5CF6" wireframe opacity={0.15} transparent />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#4F8CFF" transparent opacity={0.6} sizeAttenuation />
      </points>
      
      {/* Orbiting distinct nodes */}
      <OrbitingNode radius={2.2} speed={0.5} color="#22D3EE" offset={0} />
      <OrbitingNode radius={1.8} speed={-0.3} color="#8B5CF6" offset={Math.PI} />
    </Float>
  );
}

function OrbitingNode({ radius, speed, color, offset }) {
  const ref = useRef();
  const timeRef = useRef(0);
  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.5;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
