/**
 * HolographicObjects.jsx
 * 
 * Drop-in React component — works in Next.js, Vite, CRA, etc.
 * 
 * Install deps first:
 *   npm install three @react-three/fiber @react-three/drei
 * 
 * Usage:
 *   import HolographicObjects from './HolographicObjects';
 *   <HolographicObjects />
 */

"use client"; // Next.js App Router — safe to remove for Pages Router / Vite

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Holographic / iridescent material ─────────────────────────────── */
function HoloMaterial({ baseColor = "#2233ff", emissive = "#0011aa" }) {
  return (
    <meshPhysicalMaterial
      color={baseColor}
      emissive={emissive}
      emissiveIntensity={0.3}
      metalness={1}
      roughness={0.05}
      reflectivity={1}
      clearcoat={1}
      clearcoatRoughness={0}
      iridescence={1}
      iridescenceIOR={2.2}
      iridescenceThicknessRange={[100, 800]}
      envMapIntensity={3}
    />
  );
}

/* ─── Torus ──────────────────────────────────────────────────────────── */
function Torus({ position }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.4;
    mesh.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} castShadow>
        <torusGeometry args={[1, 0.38, 64, 128]} />
        <HoloMaterial baseColor="#1133ee" emissive="#0022bb" />
      </mesh>
    </Float>
  );
}

/* ─── Cylinder (short tube) ──────────────────────────────────────────── */
function Cylinder({ position }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.3;
    mesh.current.rotation.z += delta * 0.2;
  });
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} castShadow>
        {/* openEnded so you can see the hollow interior */}
        <cylinderGeometry args={[0.55, 0.55, 0.9, 64, 1, true]} />
        <HoloMaterial baseColor="#3355ff" emissive="#112299" />
      </mesh>
    </Float>
  );
}

/* ─── Cube ───────────────────────────────────────────────────────────── */
function Cube({ position }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.x += delta * 0.15;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={mesh} position={position} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        {/* Cube gets a more colorful iridescence — pink/blue shift */}
        <meshPhysicalMaterial
          color="#4422ff"
          emissive="#220088"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.04}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          iridescence={1}
          iridescenceIOR={2.8}
          iridescenceThicknessRange={[200, 1200]}
          envMapIntensity={4}
        />
      </mesh>
    </Float>
  );
}

/* ─── Scene ──────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Environment gives us free HDR reflections — backgroundBlurriness ensures only reflections not background shows */}
      <Environment preset="city" background={false} />

      {/* Subtle ambient */}
      <ambientLight intensity={0.4} />

      {/* Key light from top-left */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={2.5}
        color="#aaccff"
        castShadow
      />

      {/* Rim light from right — deep cyan */}
      <pointLight position={[5, 1, -3]} intensity={4} color="#00B4FF" />

      {/* Fill light bottom — teal accent */}
      <pointLight position={[0, -4, 2]} intensity={2} color="#00D4B8" />

      {/* Objects — positions mirror the image layout */}
      <Torus   position={[-1.2,  1.6, 0]} />
      <Cylinder position={[ 1.6,  0.3, 0]} />
      <Cube    position={[-1.4, -1.5, 0]} />

      {/* Mouse-drag orbit */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function HolographicObjects({
  width  = "100%",
  height = "520px",
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: "transparent",
        overflow: "visible",
        cursor: "grab",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          alpha: true,
        }}
        onCreated={({ scene, gl }) => {
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   USAGE EXAMPLES
   ─────────────────────────────────────────────────────────────────────

   // Default — fills its parent, 520 px tall
   <HolographicObjects />

   // Custom size
   <HolographicObjects width="800px" height="600px" />

   // Tailwind className
   <HolographicObjects className="w-full h-[60vh] rounded-2xl shadow-2xl" />

   // Full-screen hero
   <HolographicObjects width="100vw" height="100vh" />

   INTERACTION
   • Drag  → rotate freely (OrbitControls)
   • Scroll → zoom in / out
   • Idle   → gentle auto-rotation

   DEPENDENCIES
   npm install three @react-three/fiber @react-three/drei
   ──────────────────────────────────────────────────────────────────── */
