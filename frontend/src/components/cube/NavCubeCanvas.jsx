import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import CubeNav3D from "./CubeNav3D";

export default function NavCubeCanvas({ navItems, activeSection, onSelect, activated }) {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (activated) {
      const timer = setTimeout(() => setNavVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [activated]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "150px",
        zIndex: 50,
        pointerEvents: navVisible ? "auto" : "none",
        opacity: navVisible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 22, near: 1, far: 20 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.9} />
          <CubeNav3D items={navItems} activeSection={activeSection} onSelect={onSelect} visible={navVisible} />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
