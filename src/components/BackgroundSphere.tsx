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
  // cardBack.wrapT = RepeatWrapping;
  // cardBack.wrapS = RepeatWrapping;
  // cardBack.repeat.set(4, 4);

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
      <Sphere args={[props.radius, 64]} material={material}>
        {/*<Environment resolution={512}>*/}
        {/*    /!* Ceiling *!/*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, -9]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, -6]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, -3]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, 0]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, 3]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, 6]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-x={Math.PI / 2}*/}
        {/*        position={[0, 4, 9]}*/}
        {/*        scale={[10, 1, 1]}*/}
        {/*    />*/}
        {/*    /!* Sides *!/*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-y={Math.PI / 2}*/}
        {/*        position={[-50, 2, 0]}*/}
        {/*        scale={[100, 2, 1]}*/}
        {/*    />*/}
        {/*    <Lightformer*/}
        {/*        intensity={2}*/}
        {/*        rotation-y={-Math.PI / 2}*/}
        {/*        position={[50, 2, 0]}*/}
        {/*        scale={[100, 2, 1]}*/}
        {/*    />*/}
        {/*    /!* Key *!/*/}
        {/*    <Lightformer*/}
        {/*        form="ring"*/}
        {/*        color="red"*/}
        {/*        intensity={10}*/}
        {/*        scale={2}*/}
        {/*        position={[10, 5, 10]}*/}
        {/*        onUpdate={(self) => self.lookAt(0, 0, 0)}*/}
        {/*    />*/}
        {/*</Environment>*/}
        {/*<Effects />*/}
      </Sphere>
    </mesh>
  );
};
