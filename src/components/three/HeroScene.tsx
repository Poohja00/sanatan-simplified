"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import OrbitalSystem from "./OrbitalSystem";
import { heroScrollState } from "@/lib/heroScrollState";

const BASE_RADIUS = 8.6;
const ORBIT_SPEED = 0.028; // full revolution ~224s — a product-film drift, not a spin
const FLOOR_Y = -4.05;

/**
 * The camera does all the "reacting" — it orbits slowly on its own, drifts
 * with the cursor (parallax, not object-chasing), and dollies in on scroll.
 * The orbital object never moves toward the viewer; that separation is what
 * keeps this feeling filmed rather than like a game object tracking the mouse.
 */
function CameraRig() {
  const { camera, pointer } = useThree();
  const angle = useRef(0.35);
  const smoothedPointer = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    angle.current += ORBIT_SPEED * delta;

    smoothedPointer.current.x += (pointer.x - smoothedPointer.current.x) * 0.03;
    smoothedPointer.current.y += (pointer.y - smoothedPointer.current.y) * 0.03;

    const scroll = heroScrollState.progress;
    const radius = BASE_RADIUS - scroll * 2.2;
    const heightDrift = 1.2 - scroll * 0.7;

    const parallaxX = smoothedPointer.current.x * 0.55;
    const parallaxY = smoothedPointer.current.y * 0.3;

    camera.position.x = Math.sin(angle.current) * radius + parallaxX;
    camera.position.z = Math.cos(angle.current) * radius;
    camera.position.y = heightDrift + parallaxY;

    camera.lookAt(0, -0.15, 0);
  });

  return null;
}

function Atmosphere() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.Fog("#0b0908", 7.5, 16);
    return () => {
      scene.fog = null;
    };
  }, [scene]);
  return null;
}

/** Dark stone/metal plinth, built in tiers like a real museum instrument
 * base, with a glowing gold ring at the floor line. */
function Pedestal() {
  return (
    <group position={[0, -3.55, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.55, 1.8, 0.32, 48]} />
        <meshStandardMaterial color="#171210" metalness={0.6} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.19, 0]}>
        <torusGeometry args={[1.42, 0.014, 8, 64]} />
        <meshStandardMaterial color="#c6a66b" metalness={0.92} roughness={0.2} emissive="#a9853f" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, -0.24, 0]} receiveShadow>
        <cylinderGeometry args={[2.05, 2.3, 0.16, 48]} />
        <meshStandardMaterial color="#120e0c" metalness={0.4} roughness={0.65} />
      </mesh>
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <cylinderGeometry args={[2.55, 2.75, 0.14, 48]} />
        <meshStandardMaterial color="#0e0b09" metalness={0.35} roughness={0.75} />
      </mesh>
      {/* glowing base ring, flush with the ground */}
      <mesh position={[0, -0.495, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.52, 64]} />
        <meshBasicMaterial color="#e8a94e" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/** A large dark floor for grounding — a flat matte material, not a real
 * reflection pass. MeshReflectorMaterial's second render was the single
 * most expensive thing in this scene; a plain material reads as "polished
 * dark stone" well enough without doubling the draw calls. */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#0a0706" metalness={0.3} roughness={0.75} />
    </mesh>
  );
}

/** Two faint distant columns — just enough architectural suggestion for
 * depth, never bright or detailed enough to read as a literal building. */
function DistantColumns() {
  return (
    <group>
      {[-6.5, 6.5].map((x) => (
        <mesh key={x} position={[x, 0.5, -7]}>
          <cylinderGeometry args={[0.16, 0.2, 7, 10]} />
          <meshStandardMaterial color="#0f0c0a" metalness={0.2} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ dense = true }: { dense?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 1.2, BASE_RADIUS], fov: 38 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: "high-performance",
      }}
      shadows={dense}
      performance={{ min: 0.4 }}
    >
      <color attach="background" args={["#0b0908"]} />
      <Atmosphere />
      <ambientLight intensity={0.3} color="#4a3d2e" />
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.5}
        color="#f0d9a8"
        castShadow={dense}
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-6, 1.5, -4]} intensity={0.35} color="#5b6a86" />
      <directionalLight position={[0, -3, 2]} intensity={0.12} color="#c6a66b" />

      <DistantColumns />
      {dense && <Floor />}

      <Suspense fallback={null}>
        <group position={[0, -0.5, 0]}>
          <OrbitalSystem dense={dense} />
        </group>
        <Pedestal />
      </Suspense>

      <CameraRig />

      {dense && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
            intensity={0.45}
            radius={0.5}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
