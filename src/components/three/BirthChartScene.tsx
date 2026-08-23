"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const GEM_COLORS = ["#c6a66b", "#3d4a63", "#8a2f2a", "#c6a66b", "#6b6259", "#c6a66b"];

function ChartDisc() {
  const group = useRef<THREE.Group>(null);

  const spokeLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      lines.push([
        [Math.cos(a) * 0.55, 0.021, Math.sin(a) * 0.55],
        [Math.cos(a) * 2.05, 0.021, Math.sin(a) * 2.05],
      ]);
    }
    return lines;
  }, []);

  const gems = useMemo(() => {
    return GEM_COLORS.map((color, i) => {
      const a = (i / GEM_COLORS.length) * Math.PI * 2 + 0.4;
      const r = 1.15 + (i % 3) * 0.35;
      return { color, x: Math.cos(a) * r, z: Math.sin(a) * r };
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group}>
      {/* the disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.2, 2.3, 0.1, 96]} />
        <meshStandardMaterial color="#171210" metalness={0.55} roughness={0.55} />
      </mesh>

      {/* concentric rings, etched */}
      {[0.9, 1.5, 2.05].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[r - 0.006, r + 0.006, 128]} />
          <meshStandardMaterial color="#c6a66b" metalness={0.8} roughness={0.3} emissive="#8a6a2f" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* radial spokes (house divisions) */}
      {spokeLines.map((pts, i) => (
        <Line key={i} points={pts} color="#c6a66b" transparent opacity={0.5} lineWidth={1} />
      ))}

      {/* gem-toned planet markers */}
      {gems.map((g, i) => (
        <mesh key={i} position={[g.x, 0.06, g.z]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color={g.color} metalness={0.7} roughness={0.25} emissive={g.color} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function BirthChartScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [3.2, 3.0, 5.5], fov: 38 }} gl={{ alpha: true }}>
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.4} color="#4a3d2e" />
      <directionalLight position={[4, 5, 3]} intensity={1.3} color="#e8c98a" />
      <directionalLight position={[-4, 1, -2]} intensity={0.4} color="#5b6a86" />
      <Suspense fallback={null}>
        <ChartDisc />
      </Suspense>
    </Canvas>
  );
}
