"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles, Line, Html } from "@react-three/drei";
import { heroScrollState } from "@/lib/heroScrollState";

type RingSpec = {
  radius: number;
  tilt: [number, number, number]; // inclination of this orbital plane
  speed: number;
  planetSize: number;
  planetColor: string;
  emissive: string;
  startAngle: number;
  name: string;
  meaning: string;
};

// Mostly warm gold/bronze, with one or two cool dark accents (matching the
// reference) so it doesn't read as a monochrome toy. Named for the
// Navagraha (the nine Vedic planets), so hovering teaches something real
// rather than labeling a generic "Planet 2".
const RINGS: RingSpec[] = [
  { radius: 1.55, tilt: [1.05, 0.12, 0.04], speed: 0.09, planetSize: 0.065, planetColor: "#d9bd85", emissive: "#a9853f", startAngle: 0.4, name: "Chandra — Moon", meaning: "Your emotions, mind, and inner world." },
  { radius: 2.05, tilt: [1.22, -0.22, 0.2], speed: -0.062, planetSize: 0.05, planetColor: "#2e3648", emissive: "#12151e", startAngle: 2.3, name: "Budha — Mercury", meaning: "Communication, intellect, and adaptability." },
  { radius: 2.55, tilt: [0.92, 0.3, -0.15], speed: 0.045, planetSize: 0.06, planetColor: "#c6a66b", emissive: "#8a6a2f", startAngle: 4.1, name: "Shukra — Venus", meaning: "Love, beauty, and what you find pleasurable." },
  { radius: 3.0, tilt: [1.18, -0.08, -0.28], speed: -0.033, planetSize: 0.04, planetColor: "#7a4a35", emissive: "#3a2013", startAngle: 5.4, name: "Mangala — Mars", meaning: "Drive, courage, and how you take action." },
  { radius: 3.4, tilt: [1.0, 0.18, 0.35], speed: 0.024, planetSize: 0.055, planetColor: "#b89a63", emissive: "#7a5c2c", startAngle: 1.6, name: "Guru — Jupiter", meaning: "Wisdom, growth, and good fortune." },
];

function Ring({ spec }: { spec: RingSpec }) {
  const planetGroup = useRef<THREE.Group>(null);
  const angleRef = useRef(spec.startAngle);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angleRef.current += spec.speed * delta;
    if (planetGroup.current) {
      planetGroup.current.position.set(
        Math.cos(angleRef.current) * spec.radius,
        0,
        Math.sin(angleRef.current) * spec.radius
      );
    }
  });

  return (
    <group rotation={spec.tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <torusGeometry args={[spec.radius, 0.009, 8, 72]} />
        <meshStandardMaterial
          color="#c6a66b"
          metalness={0.92}
          roughness={0.2}
          emissive="#7a5c2c"
          emissiveIntensity={0.16}
        />
      </mesh>
      <group ref={planetGroup}>
        <mesh
          castShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[spec.planetSize, 18, 18]} />
          <meshStandardMaterial
            color={spec.planetColor}
            metalness={0.5}
            roughness={0.35}
            emissive={hovered ? spec.planetColor : spec.emissive}
            emissiveIntensity={hovered ? 1.1 : 0.2}
          />
        </mesh>
        {hovered && (
          <Html distanceFactor={9} center style={{ pointerEvents: "none" }}>
            <div className="whitespace-nowrap rounded-sm border border-[#c6a66b55] bg-[#0b0908ee] px-3.5 py-2 text-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              <div className="font-serif text-[13px] text-[#f4eee4]">{spec.name}</div>
              <div className="mt-0.5 text-[10px] text-[#b8ab97]">{spec.meaning}</div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

function Sun() {
  const core = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.04;
  });
  return (
    <>
      <mesh ref={core} castShadow>
        <sphereGeometry args={[0.55, 40, 40]} />
        <meshStandardMaterial
          color="#c9873a"
          emissive="#e8a94e"
          emissiveIntensity={0.9}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>
      {/* soft corona shell — reads as atmosphere, bloom does the rest */}
      <mesh scale={1.35}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#e8a94e" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh scale={1.75}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#e8a94e" transparent opacity={0.035} depthWrite={false} />
      </mesh>
      {/* no castShadow here — a point light's shadow is a 6-face cubemap
          render, by far the most expensive shadow type available; the
          directional light already covers the "sun-lit" look */}
      <pointLight color="#e8a94e" intensity={4.5} distance={7} decay={2} />
    </>
  );
}

/** The thin vertical axis line with a small dot at the top, echoing the logo mark. */
function AxisSpindle() {
  const points = useMemo(
    (): [number, number, number][] => [[0, -0.1, 0], [0, 3.9, 0]],
    []
  );
  return (
    <group>
      <Line points={points} color="#c6a66b" transparent opacity={0.2} lineWidth={1} />
      <mesh position={[0, 3.9, 0]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#c6a66b" emissive="#c6a66b" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function OrbitalSystem({ dense = true }: { dense?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const autoAngle = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    // continuous self-rotation, independent of camera/cursor...
    autoAngle.current += delta * 0.026;
    // ...plus a scroll-linked turn, so the instrument visibly responds as
    // the hero scrolls past, on top of its own constant drift
    group.current.rotation.y = autoAngle.current + heroScrollState.progress * 1.1;
  });

  const rings = dense ? RINGS : RINGS.slice(0, 3);

  return (
    <group ref={group}>
      <Sun />
      <AxisSpindle />
      {rings.map((r, i) => (
        <Ring key={i} spec={r} />
      ))}
      {dense && (
        <Sparkles count={22} scale={9} size={1} speed={0.06} color="#e6d6b0" opacity={0.16} />
      )}
    </group>
  );
}
