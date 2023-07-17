import { GroupProps } from "@react-three/fiber/dist/declarations/src/three-types";
import { Vector2 } from "three";

export interface CustomGroupProps extends GroupProps {
  uv?: Vector2;
}
