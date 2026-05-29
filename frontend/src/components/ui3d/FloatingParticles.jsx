import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingParticles({ count = 520 }) {
  const points = useRef();
  const particleColors = ["#0a4a5c", "#0d5e6e", "#06343d", "#0b6b7a", "#023047", "#0c4a6e", "#1a3a4a"];
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      data[i * 3 + 2] = radius * Math.cos(phi);
    }
    return data;
  }, [count]);
  const colors = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const color = new THREE.Color(particleColors[i % particleColors.length]);
      data[i * 3] = color.r;
      data[i * 3 + 1] = color.g;
      data[i * 3 + 2] = color.b;
    }
    return data;
  }, [count]);

  useFrame(({ clock, mouse }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.025 + mouse.x * 0.05;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.035 + mouse.y * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default memo(FloatingParticles);
