import { Group, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

import { useCarousel } from "./hooks/use-carousel";
import { Card, IFrameProps } from "./components/Card";
import { CarouselButtons } from "./components/CarouselButtons";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import { useUserState } from "../../hooks/useUserState";

const RADIUS = 2;
const DISTANCE = 0.9;
const ANIMATION_TIME = 600;

const Carousel: React.FC<{ initialCards: IFrameProps[] }> = ({
  initialCards,
}) => {
  const { selectedIndex, handlePrevious, handleNext, handleCardClick } =
    useCarousel(initialCards);
  const { login } = useUserState();
  const carouselRef = useRef<Group>(null);
  const orbitRef = useRef<OrbitControlsType>(null);
  const totalCards = initialCards.length;

  //set tween animations by using effect
  useEffect(() => {
    if (carouselRef.current && orbitRef.current) {
      const activeCard = carouselRef.current.children[selectedIndex];
      if (activeCard) {
        const activeCardPosition = new Vector3();
        activeCard.getWorldPosition(activeCardPosition);

        const orbitControls = orbitRef.current;
        const camera = orbitControls.object;
        const customRadius = RADIUS + 5;

        // Calculate the position of the camera around the carousel
        const theta = (2 * Math.PI * selectedIndex) / totalCards;
        const x = Math.cos(theta) * customRadius;
        const z = Math.sin(theta) * customRadius;
        const cameraPosition = new Vector3(x, 0, z);

        anime({
          targets: camera.position,
          x: x,
          y: cameraPosition.y,
          z: z,
          duration: ANIMATION_TIME,
          easing: "easeInOutQuad",
          complete: () => {
            camera.lookAt(activeCardPosition);
            orbitControls.target.copy(activeCardPosition);
            orbitControls.update();
          },
        });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      <CarouselButtons
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.2}
        target={carouselRef.current ? carouselRef.current.position : undefined}
      />
      <group ref={carouselRef}>
        {initialCards.map((props, index) => {
          const isActive = index === selectedIndex;
          const angle = (2 * Math.PI * index) / totalCards;
          const x = Math.cos(angle) * (RADIUS + DISTANCE * (isActive ? 0 : 1));
          const z = Math.sin(angle) * (RADIUS + DISTANCE * (isActive ? 0 : 1));
          return (
            <Card
              onPointerDown={(e) => {
                e.stopPropagation();
                handleCardClick(index);
              }}
              key={props.id}
              {...props}
              position={[x, 0, z]}
              active={index === selectedIndex}
              hidden={login}
              onPointerEnter={() => {}}
              onPointerMove={() => {}}
              onPointerUp={() => {}}
            />
          );
        })}
      </group>
    </>
  );
};
export default Carousel;
