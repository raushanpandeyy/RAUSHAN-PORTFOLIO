import { Environment, Lightformer } from "@react-three/drei";

export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.68} />
      <directionalLight position={[4, 5, 5]} intensity={1.9} color="#ffffff" />
      <pointLight position={[-3.4, 1.8, 3.2]} intensity={3.3} color="#06b6d4" distance={8} />
      <pointLight position={[3.8, -1.4, 2.6]} intensity={2.9} color="#12d6c5" distance={7} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 3, 4]} scale={[6, 2, 1]} color="#dff9fb" />
        <Lightformer intensity={1.8} position={[4, 0, -2]} scale={[2, 4, 1]} color="#12d6c5" />
      </Environment>
    </>
  );
}
