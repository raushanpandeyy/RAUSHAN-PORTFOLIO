import { memo, useRef, useEffect } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NAV_COLORS = ["#ff9ec7", "#7dd3fc", "#86efac", "#ffffff", "#c4b5fd", "#fef08a"];

const CUBE_Y = 0;

function MiniCube({ item, index, active, onSelect, visible }) {
  const ref = useRef();
  const labelRef = useRef();
  const groupRef = useRef();
  const targetX = (index - 2.5) * 1.5;
  const rolling = useRef(false);
  const color = NAV_COLORS[index % NAV_COLORS.length];
  const prevVisible = useRef(visible);

  useEffect(() => {
    if (visible && !prevVisible.current) {
      groupRef.current.position.x = 0;
      rolling.current = true;
    }
    prevVisible.current = visible;
  }, [visible]);

  useFrame(({ clock }) => {
    if (!ref.current || !groupRef.current) return;

    if (rolling.current) {
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.045;
      ref.current.rotation.x += 0.18;
      ref.current.rotation.z += 0.1;
      ref.current.rotation.y += 0.12;
      ref.current.position.y = CUBE_Y + Math.abs(Math.sin(clock.elapsedTime * 5 + index * 2)) * 0.7;
      if (Math.abs(groupRef.current.position.x - targetX) < 0.015) {
        groupRef.current.position.x = targetX;
        rolling.current = false;
      }
      return;
    }

    const pulse = active ? (Math.sin(clock.elapsedTime * 3.2) + 1) * 0.5 : 0;
    ref.current.rotation.x += active ? 0.014 : 0.005;
    ref.current.rotation.y += active ? 0.022 : 0.008;
    ref.current.position.y = CUBE_Y + Math.sin(clock.elapsedTime * 1.7 + index) * (active ? 0.055 : 0.025);
    ref.current.scale.setScalar(active ? 0.85 + pulse * 0.05 : 0.7);
    ref.current.material.emissiveIntensity = active ? 0.75 + pulse * 0.55 : 0.15;
    if (labelRef.current) labelRef.current.material.opacity = active ? 1 : 0.72;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={() => onSelect(item.id)} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "auto")}>
      <mesh position={[0, CUBE_Y, 0]}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <RoundedBox ref={ref} args={[0.7, 0.7, 0.7]} radius={0.1} smoothness={5} position={[0, CUBE_Y, 0]}>
        <meshStandardMaterial
          color={active ? color : "#ffffff"}
          metalness={0.48}
          roughness={0.12}
          envMapIntensity={1.7}
          emissive={active ? new THREE.Color(color) : new THREE.Color(color)}
          emissiveIntensity={active ? 0.65 : 0.18}
        />
      </RoundedBox>
      <Text ref={labelRef} position={[0, CUBE_Y - 0.6, 0.04]} fontSize={0.18} fontWeight="bold" color={active ? "#06343d" : "#0f6670"} anchorX="center" anchorY="middle">
        {item.label}
      </Text>
    </group>
  );
}

function CubeNav3D({ items, activeSection, onSelect, visible }) {
  const group = useRef();
  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, visible ? 0 : 0.8, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, visible ? -0.08 : -0.35, 0.04);
  });

  return (
    <group ref={group} position={[0, 0.8, 0]}>
      {items.map((item, index) => (
        <MiniCube key={item.id} item={item} index={index} active={activeSection === item.id} onSelect={onSelect} visible={visible} />
      ))}
    </group>
  );
}

export default memo(CubeNav3D);
