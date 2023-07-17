import { Ref, useRef } from "react";
import {
  Euler,
  Group,
  Mesh,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  Vector3,
} from "three";

import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { CustomGroupProps } from "../types/types";

import dungeonTexture from "textures/Dungeons_Texture_01_A.png";
import gltfCrypt from "gltf/crypt.gltf";

type GLTFResult = GLTF & {
  nodes: {
    SM_Env_Entrance_Crypt_03: Mesh;
  };
};

export function Crypt(props: CustomGroupProps) {
  console.log(gltfCrypt);
  const group: Ref<Group> = useRef<Group>(null);
  const colorMap: Texture = useTexture(dungeonTexture).clone();

  colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(1, 1);

  if (props.uv) {
    colorMap.repeat.set(props.uv.x, props.uv.y);
  }
  colorMap.flipY = false;
  colorMap.colorSpace = SRGBColorSpace;
  colorMap.needsUpdate = true;

  const { nodes } = useGLTF(gltfCrypt) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 5, 10]}
      />
      <group name="Root_Scene">
        <group name="RootNode">
          <mesh
            name="SM_Env_Entrance_Crypt_03"
            geometry={nodes.SM_Env_Entrance_Crypt_03.geometry}
            scale={new Vector3(25, 25, 25)}
            position={new Vector3(0, -0.5, -0.1)}
            rotation={new Euler(0, -0.3, 0)}
          >
            <meshStandardMaterial map={colorMap} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(gltfCrypt);
