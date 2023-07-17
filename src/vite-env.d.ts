/// <reference types="vite/client" />
declare module "*.gltf";
declare module "*.jpg";
declare module "*.png";

import { JSX as DreiJSX } from "@react-three/drei";

declare namespace JSX {
  interface IntrinsicElements extends DreiJSX.IntrinsicElements {}
}
