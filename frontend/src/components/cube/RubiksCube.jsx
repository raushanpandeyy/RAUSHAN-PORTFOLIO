import { memo, useMemo, useRef, useEffect, useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#bbf7d0", "#fecaca", "#bfdbfe", "#fef08a"];

function faceMultiColor(face, x, y, z) {
  const idx = (
    face === "px" ? (y + 1) * 3 + (z + 1) :
    face === "nx" ? (y + 1) * 3 + (z + 1) :
    face === "py" ? (x + 1) * 3 + (z + 1) :
    face === "ny" ? (x + 1) * 3 + (z + 1) :
    face === "pz" ? (x + 1) * 3 + (y + 1) :
    (x + 1) * 3 + (y + 1)
  ) % COLORS.length;
  return COLORS[idx];
}

const FACE_MARKS = [
  { text: "RP", position: [0, 0, 1.98], rotation: [0, 0, 0], color: "#ffffff", size: 0.34 },
  { text: "LIVE", position: [1.98, 0, 0], rotation: [0, Math.PI / 2, 0], color: "#ffffff", size: 0.2 },
  { text: "</>", position: [-1.98, 0, 0], rotation: [0, -Math.PI / 2, 0], color: "#ffffff", size: 0.24 },
  { text: "CV", position: [0, 1.98, 0], rotation: [-Math.PI / 2, 0, 0], color: "#ffffff", size: 0.24 },
  { text: "AI", position: [0, -1.98, 0], rotation: [Math.PI / 2, 0, 0], color: "#ffffff", size: 0.24 },
  { text: "SIGNAL", position: [0, 0, -1.98], rotation: [0, Math.PI, 0], color: "#ffffff", size: 0.14 },
];

function cubieMaterials(x, y, z) {
  const innerSeed = Math.abs(x * 17 + y * 31 + z * 7);
  return [
    x === 1 ? faceMultiColor("px", x, y, z) : COLORS[(innerSeed) % 4],
    x === -1 ? faceMultiColor("nx", x, y, z) : COLORS[(innerSeed + 1) % 4],
    y === 1 ? faceMultiColor("py", x, y, z) : COLORS[(innerSeed + 2) % 4],
    y === -1 ? faceMultiColor("ny", x, y, z) : COLORS[(innerSeed + 3) % 4],
    z === 1 ? faceMultiColor("pz", x, y, z) : COLORS[(innerSeed) % 4],
    z === -1 ? faceMultiColor("nz", x, y, z) : COLORS[(innerSeed + 1) % 4],
  ];
}

function Cubie({ x, y, z, activated, exploded }) {
  const ref = useRef();
  const velocity = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.2,
    (Math.random() - 0.5) * 0.2,
    (Math.random() - 0.5) * 0.2
  ));
  const rotSpeed = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.12,
    (Math.random() - 0.5) * 0.12,
    (Math.random() - 0.5) * 0.12
  ));
  const opacity = useRef(1);

  const materials = useMemo(
    () =>
      cubieMaterials(x, y, z).map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color,
            roughness: 0.05,
            metalness: 0.7,
            envMapIntensity: 3.5,
            transparent: true,
            opacity: 1,
            emissive: color,
            emissiveIntensity: 0.08,
          }),
      ),
    [x, y, z],
  );

  useFrame(() => {
    if (!ref.current) return;
    if (exploded) {
      ref.current.position.x += velocity.current.x;
      ref.current.position.y += velocity.current.y;
      ref.current.position.z += velocity.current.z;
      ref.current.rotation.x += rotSpeed.current.x;
      ref.current.rotation.y += rotSpeed.current.y;
      ref.current.rotation.z += rotSpeed.current.z;
      velocity.current.multiplyScalar(0.98);
      opacity.current -= 0.003;
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = Math.max(0, opacity.current);
        }
      });
    } else if (activated) {
      const spread = 1.38;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.64 * spread, 0.07);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.64 * spread, 0.07);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, z * 0.64 * spread, 0.07);
    } else {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.64, 0.07);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.64, 0.07);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, z * 0.64, 0.07);
    }
  });

  return <RoundedBox ref={ref} args={[0.58, 0.58, 0.58]} radius={0.055} smoothness={6} position={[x * 0.64, y * 0.64, z * 0.64]} material={materials} />;
}

function RubiksCube({ activated, onActivate, reducedMotion }) {
  const group = useRef();
  const dragging = useRef(false);
  const lastPointer = useRef([0, 0]);
  const [hasExploded, setHasExploded] = useState(false);

  const cubies = useMemo(() => {
    const data = [];
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          data.push({ x, y, z, key: `${x}${y}${z}` });
        }
      }
    }
    return data;
  }, []);

  useEffect(() => {
    if (activated && !hasExploded) {
      setHasExploded(true);
    }
  }, [activated, hasExploded]);

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    if (activated) {
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 0.72, 0.06));
    } else {
      if (!dragging.current) {
        group.current.rotation.y += reducedMotion ? 0.002 : 0.006;
        group.current.rotation.x += (Math.sin(t * 0.55) * 0.14 + mouse.y * 0.22 - group.current.rotation.x) * 0.035;
        group.current.rotation.z += (mouse.x * 0.1 - group.current.rotation.z) * 0.035;
      }
      group.current.position.y = Math.sin(t * 1.05) * 0.13;
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 1, 0.045));
    }
  });

  return (
    <group
      ref={group}
      onClick={onActivate}
      onPointerDown={(event) => {
        event.stopPropagation();
        dragging.current = true;
        lastPointer.current = [event.clientX, event.clientY];
      }}
      onPointerMove={(event) => {
        if (!dragging.current || !group.current) return;
        event.stopPropagation();
        const [lastX, lastY] = lastPointer.current;
        group.current.rotation.y += (event.clientX - lastX) * 0.01;
        group.current.rotation.x += (event.clientY - lastY) * 0.01;
        lastPointer.current = [event.clientX, event.clientY];
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
        document.body.style.cursor = "auto";
      }}
      onPointerOver={() => (document.body.style.cursor = "grab")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {cubies.map(({ key, x, y, z }) => (
        <Cubie key={key} x={x} y={y} z={z} activated={activated} exploded={hasExploded} />
      ))}
      {!activated &&
        FACE_MARKS.map((mark) => (
          <Text
            key={mark.text}
            position={mark.position}
            rotation={mark.rotation}
            fontSize={mark.size}
            color={mark.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.006}
            outlineColor="#ffffff"
          >
            {mark.text}
          </Text>
        ))}
      {!activated && (
        <Text position={[0, -1.65, 0]} fontSize={0.16} color="#067a7a" anchorX="center" anchorY="middle">
          Click to Explore
        </Text>
      )}
    </group>
  );
}

export default memo(RubiksCube);
