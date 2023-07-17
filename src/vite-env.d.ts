/// <reference types="vite/client" />

import { JSX as DreiJSX } from "@react-three/drei";

declare namespace JSX {
  interface IntrinsicElements extends DreiJSX.IntrinsicElements {}
}
