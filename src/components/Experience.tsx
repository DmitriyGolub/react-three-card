import { OrbitControls } from "@react-three/drei";
import { IFrameProps } from "../features/Carousel/components/CardFrame";
import { Shroom } from "./Shroom";
import { Crypt } from "./Crypt";
import { Vector2 } from "three";
import Carousel from "../features/Carousel/Carousel";

export const currentCard: IFrameProps[] = [
  {
    id: 1,
    name: "Card 1",
    author: "Author 1",
    bg: [0.1, 0.1, 0],
    children: <Shroom />,
  },
  {
    id: 2,
    name: "Card 2",
    author: "Author 2",
    bg: [0, 0.8, 1],
    children: <Shroom uv={new Vector2(0.8, 1.3)} />,
  },
  {
    id: 3,
    name: "Card 3",
    author: "Author 3",
    bg: [1, 0.1, 0],
    children: <Crypt uv={new Vector2(0.7, 0.9)} />,
  },
  {
    id: 4,
    name: "Card 4",
    author: "Author 4",
    bg: [0, 0.2, 0.2],
    children: <Crypt uv={new Vector2(0.7, 0.9)} />,
  },
  {
    id: 5,
    name: "Card 5",
    author: "Author 5",
    bg: [1, 0.3, 1],
    children: <Crypt uv={new Vector2(0.5, 0.9)} />,
  },
  {
    id: 6,
    name: "Card 6",
    author: "Author 6",
    bg: [0, 0.2, 0.2],
    children: <Shroom uv={new Vector2(0.3, 0.9)} />,
  },
  {
    id: 7,
    name: "Card 7",
    author: "Author 7",
    bg: [0, 0, 0],
    children: <Crypt uv={new Vector2(0.7, 0.9)} />,
  },
  {
    id: 8,
    name: "Card 8",
    author: "Author 8",
    bg: [0.05, 0.9, 0],
    children: <Crypt uv={new Vector2(0.3, 0.9)} />,
  },
  {
    id: 9,
    name: "Card 9",
    author: "Author 9",
    bg: [0.1, 0.1, 0.1],
    children: <Crypt uv={new Vector2(0.5, 0.3)} />,
  },
];
export const Experience = () => {
  return (
    <>
      <Carousel initialCards={currentCard} />
      {/*<Carousel initialCards={currentCard} />*/}
      <OrbitControls />
    </>
  );
};
