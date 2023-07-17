import { Card, IFrameProps } from "./components/CardFrame";
import { Group, Vector3 } from "three";
import React, { useEffect, useRef } from "react";
import { CarouselButtons } from "./components/CarouselButtons";
import { CardState } from "./types/cardState";
import { OrbitControls } from "@react-three/drei";
import anime from "animejs";
import { useCarousel } from "./hooks/use-carousel";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

const Carousel: React.FC<{ initialCards: IFrameProps[] }> = ({
  initialCards,
}) => {
  const { cards, selectedIndex, handlePrevious, handleNext, handleCardClick } =
    useCarousel(initialCards);

  const carouselRef = useRef<Group>(null);
  const orbitRef = useRef<OrbitControlsType>(null);
  const radius = 2;
  const distance = 0.9;
  const totalCards = cards.length;
  const timeToLerp = 400;

  useEffect(() => {
    if (carouselRef.current && orbitRef.current) {
      const activeCard = carouselRef.current.children[selectedIndex];
      if (activeCard) {
        const activeCardPosition = new Vector3();
        activeCard.getWorldPosition(activeCardPosition);

        const orbitControls = orbitRef.current;
        const camera = orbitControls.object;
        const customRadius = radius + 5;

        // Calculate the position of the camera around the carousel
        const theta = (2 * Math.PI * selectedIndex) / totalCards;
        const x = Math.cos(theta) * customRadius;
        const z = Math.sin(theta) * customRadius;
        const cameraPosition = new Vector3(x, 0, z);

        anime({
          targets: camera.position,
          x: x,
          y: cameraPosition.y,
          z: cameraPosition.z,
          duration: timeToLerp,
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
          const x = Math.cos(angle) * (radius + distance * (isActive ? 0 : 1));
          const z = Math.sin(angle) * (radius + distance * (isActive ? 0 : 1));

          return (
            <Card
              onPointerDown={(e) => {
                e.stopPropagation();
                handleCardClick(index);
              }}
              key={props.id}
              {...props}
              position={[x, 0, z]}
              state={isActive ? CardState.Active : CardState.Idle}
            />
          );
        })}
      </group>
    </>
  );
};
export default Carousel;
