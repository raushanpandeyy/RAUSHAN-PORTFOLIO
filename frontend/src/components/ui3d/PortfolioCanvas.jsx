import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Float, PerformanceMonitor } from "@react-three/drei";
import FloatingParticles from "./FloatingParticles";
import SceneLights from "./SceneLights";
import RubiksCube from "../cube/RubiksCube";

export default function PortfolioCanvas({ activated, onActivate, onDeclinePerformance, reducedMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0.45, 6.1], fov: 44 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
    >
      <PerformanceMonitor onDecline={onDeclinePerformance} />
      <Suspense fallback={null}>
        <SceneLights />
        <FloatingParticles count={reducedMotion ? 1500 : activated ? 4000 : 5000} />
        {activated ? (
          <RubiksCube activated={activated} onActivate={onActivate} reducedMotion={reducedMotion} />
        ) : (
          <Float speed={1.25} rotationIntensity={0.22} floatIntensity={0.24}>
            <RubiksCube activated={activated} onActivate={onActivate} reducedMotion={reducedMotion} />
          </Float>
        )}
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
