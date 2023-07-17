import React, { Ref, useEffect, useRef } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import {
  DoubleSide,
  Euler,
  FrontSide,
  Group,
  MeshStandardMaterial,
  SRGBColorSpace,
  Texture,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber/dist/declarations/src/three-types";
import anime from "animejs";

import { BackgroundSphere } from "../../../components/BackgroundSphere";

export interface IFrameProps extends GroupProps {
  name: string;
  author: string;
  bg?: [number, number, number];
  width?: number;
  height?: number;
  children: JSX.Element;
  id: number;
  active?: boolean;
  hidden?: boolean;

  onClick?(): void;
}

export const Card: React.FC<IFrameProps> = ({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  active,
  hidden,
  onClick,
  ...props
}: IFrameProps) => {
  const portal: Ref<PortalMaterialType> = useRef<PortalMaterialType>(null);
  const ref: Ref<Group> = useRef<Group>(new Group());
  const cardBack: Texture = useTexture(
    "/src/assets/textures/card_fallback.png"
  ).clone();
  cardBack.colorSpace = SRGBColorSpace;

  //#region "Animations"
  useEffect(() => {
    //for active state
    if (active) {
      anime({
        targets: [(ref.current as Group).scale],
        x: 2,
        y: 2,
        z: 2,
        duration: 400,
        easing: "linear",
      });
    } else {
      anime({
        targets: [(ref.current as Group).scale],
        x: 1,
        y: 1,
        z: 1,
        duration: 400,
        easing: "linear",
      });
    }
    //for hidden
    if (hidden) {
      anime({
        targets: [(ref.current as Group).rotation],
        y: Math.PI / 2,
        duration: 400,
        easing: "easeInCubic",
        complete: () => {
          ref.current!.lookAt(ref.current!.position.clone().multiplyScalar(2));
        },
      });
    } else {
      (ref.current as Group).rotation.y = 0;
    }
  });
  //#endregion "My Region"

  //#region "Flying Frame Animation"
  useFrame((delta) => {
    if (!ref.current) return;
    const t = delta.clock.getElapsedTime();

    if (!active) {
      ref.current.rotation.set(
        Math.cos(t / 4) / 100,
        Math.sin(t / 20) / 8,
        0 - (1 + Math.sin(t / 3)) / 50
      );
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    } else {
      ref.current.rotation.set(0, 0, 0);
      ref.current.position.y = 0;
    }

    ref.current.lookAt(new Vector3(0, 0, 0));
  });
  //#endregion "Flying Frame Animation"

  return (
    <group ref={ref} {...props}>
      <Text
        fontSize={0.3}
        anchorY="top"
        anchorX="right"
        lineHeight={0.8}
        position={[-0.375, 0.715, -0.01]}
        rotation={new Euler(0, -Math.PI, 0)}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        fontSize={0.1}
        anchorX="right"
        position={[-0.4, -0.659, -0.01]}
        rotation={new Euler(0, -Math.PI, 0)}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, -0.01]}
        material-toneMapped={false}
        rotation={new Euler(0, -Math.PI, 0)}
      >
        {author}
      </Text>
      <mesh>
        <RoundedBox
          rotation={new Euler(0, -Math.PI, 0)}
          args={[width, height, 0]}
          radius={0.02}
          visible={!hidden}
        >
          <MeshPortalMaterial ref={portal} side={FrontSide}>
            <BackgroundSphere radius={30} color={bg!} />
            {children}
          </MeshPortalMaterial>
        </RoundedBox>

        <RoundedBox
          rotation={new Euler(0, -Math.PI, 0)}
          args={[width, height, 0]}
          radius={0.02}
          visible={hidden}
          material={new MeshStandardMaterial({ map: cardBack })}
        />

        <RoundedBox
          rotation={new Euler(0, -Math.PI, 0)}
          args={[width, height, 0]}
          radius={0.005}
          position={new Vector3(0, 0, 0.025)}
        >
          <ambientLight intensity={0.4} />
          <meshStandardMaterial map={cardBack} side={DoubleSide} />
        </RoundedBox>
      </mesh>
    </group>
  );
};
