import React, { Ref, useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import {
  DoubleSide,
  Euler,
  FrontSide,
  Group,
  SRGBColorSpace,
  Texture,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber/dist/declarations/src/three-types";
import { CardState } from "../types/cardState";
import anime from "animejs";
import { BackgroundSphere } from "../../../components/BackgroundSphere";

export interface IFrameProps extends GroupProps {
  name: string;
  author: string;
  bg?: [number, number, number];
  width?: number;
  height?: number;
  children: JSX.Element;
  state?: CardState;
}

export const Card: React.FC<IFrameProps> = ({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  state = CardState.Idle,
  ...props
}) => {
  const portal: Ref<PortalMaterialType> = useRef<PortalMaterialType>(null);
  const ref: Ref<Group> = useRef<Group>(new Group());
  const cardBack: Texture = useTexture(
    "/src/assets/textures/card_fallback.png"
  ).clone();

  cardBack.colorSpace = SRGBColorSpace;
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useEffect(() => {
    if (state === CardState.Active) {
      anime({
        targets: [(ref.current as Group).scale],
        x: 2,
        y: 2,
        z: 2,
        duration: 400,
        easing: "easeInCubic",
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
  });

  useFrame((delta) => {
    if (!ref.current) return;

    const t = delta.clock.getElapsedTime();

    ref.current.rotation.set(
      Math.cos(t / 4) / 100,
      Math.sin(t / 20) / 8,
      0 - (1 + Math.sin(t / 3)) / 50
    );
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;

    ref.current.lookAt(new Vector3(0, 0, 0));
  });
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
      <mesh
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation("/item/" + e.object.name)
        )}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <RoundedBox
          rotation={new Euler(0, -Math.PI, 0)}
          args={[width, height, 0]}
          radius={0.02}
        >
          <MeshPortalMaterial
            ref={portal}
            events={params?.id === id}
            side={FrontSide}
          >
            <BackgroundSphere radius={120} color={bg!} />
            {children}
          </MeshPortalMaterial>
        </RoundedBox>

        <RoundedBox
          rotation={new Euler(0, -Math.PI, 0)}
          args={[width, height, 0]}
          radius={0.005}
          position={new Vector3(0, 0, 0.03)}
        >
          <ambientLight intensity={0.5} />
          <meshStandardMaterial map={cardBack} side={DoubleSide} />
        </RoundedBox>
      </mesh>
    </group>
  );
};
