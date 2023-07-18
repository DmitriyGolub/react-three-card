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
import { lerp, randFloat, randInt } from "three/src/math/MathUtils";

import { BackgroundSphere } from "../../../components/BackgroundSphere";
import cardBackTexture from "textures/card_fallback.png";

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
  const cardBack: Texture = useTexture(cardBackTexture).clone();
  cardBack.colorSpace = SRGBColorSpace;

  //#region "Animations"
  useEffect(() => {
    //for active state
    if (active) {
      anime.remove((ref.current as Group).scale);

      anime({
        targets: [(ref.current as Group).scale],
        x: 1.75,
        y: 1.75,
        z: 1.75,
        duration: 600,
        easing: "linear",
      });
    } else {
      anime.remove((ref.current as Group).scale);

      anime({
        targets: [(ref.current as Group).scale],
        x: 1,
        y: 1,
        z: 1,
        duration: 600,
        easing: "linear",
      });

      console.log("useEffect");
    }
  }, [active]);
  //#endregion "My Region"

  //#region "Flying Frame Animation"
  const xAngle = randInt(-10, 10);
  const yAngle = randInt(-100, 100);
  const angleXMod = randInt(1, 100);
  const randomHeight = randInt(5, 10);
  const randomMultiplication = randFloat(1, 5);
  const maxHeight = randFloat(-1, 2);
  const preRotation = (t: number) =>
    new Euler(
      Math.cos(t / xAngle) / angleXMod,
      Math.sin(t / yAngle) / 0.1,
      0 - (maxHeight - Math.sin(t / randomMultiplication)) / 50
    );
  useFrame((rootState) => {
    if (!ref.current) return;
    const t = rootState.clock.getElapsedTime();

    if (!active) {
      ref.current.rotation.copy(preRotation(t));
      ref.current.position.y = (maxHeight + Math.sin(t / 1.5)) / randomHeight;
    } else {
      const targetPosition = [0, 0.1, 0];
      const targetRotation = [0, 0, 0];

      ref.current.rotation.set(
        lerp(ref.current.rotation.x, targetRotation[0], t),
        lerp(ref.current.rotation.y, targetRotation[1], t),
        lerp(ref.current.rotation.z, targetRotation[2], t)
      );

      ref.current.position.y = lerp(
        ref.current.position.y,
        targetPosition[1],
        0.1
      );
    }

    ref.current.lookAt(new Vector3(0, 0.1, 0));
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
