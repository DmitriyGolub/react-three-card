import { Sphere, useTexture } from "@react-three/drei";
import {
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Texture,
} from "three";
import { MeshProps } from "@react-three/fiber";
import { useRef } from "react";

export interface BackgroundSphereProps extends MeshProps {
  radius: number;
  color: [number, number, number];
}

export const BackgroundSphere = (props: BackgroundSphereProps) => {
  const ref = useRef<Mesh>(null);
  const cardBack: Texture = useTexture(
    "/src/assets/textures/blue_skybox.png"
  ).clone();
  cardBack.colorSpace = SRGBColorSpace;

  const material = new MeshStandardMaterial({
    color: new Color()
      .setRGB(props.color[0], props.color[1], props.color[2])
      .convertLinearToSRGB(),
    map: cardBack,
    side: DoubleSide,
  });

  return (
    <mesh ref={ref}>
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 5, 10]}
        castShadow
      />
      <Sphere args={[props.radius, 64]} material={material}></Sphere>
    </mesh>
  );
};
