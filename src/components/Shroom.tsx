import { Ref, useRef } from "react";
import {
  Group,
  Mesh,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  Vector3,
} from "three";

import { Environment, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { CustomGroupProps } from "../types/types";

type GLTFResult = GLTF & {
  nodes: {
    SM_Env_Mushroom_Small_01: Mesh;
  };
};

export function Shroom(props: CustomGroupProps) {
  const group: Ref<Group> = useRef<Group>(null);
  const colorMap: Texture = useTexture(
    "/src/assets/textures/Dungeons_Texture_01_A.png"
  ).clone();

  colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(1, 1);
  if (props.uv) {
    colorMap.repeat.set(props.uv.x, props.uv.y);
  }
  colorMap.flipY = false;
  colorMap.colorSpace = SRGBColorSpace;
  colorMap.needsUpdate = true;

  const { nodes } = useGLTF(
    "/src/assets/gltf/SM_Env_Mushroom_Small_01.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 5, 10]}
        castShadow
      />
      <Environment preset="city" />
      <group name="Root_Scene">
        <group name="RootNode">
          <mesh
            name="SM_Env_Mushroom_Small_01"
            castShadow
            receiveShadow
            geometry={nodes.SM_Env_Mushroom_Small_01.geometry}
            scale={new Vector3(1, 1, 1).multiplyScalar(45)}
            position={new Vector3(0, -0.5, -0.1)}
          >
            <meshStandardMaterial map={colorMap} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/src/assets/gltf/SM_Env_Mushroom_Small_01.gltf");
