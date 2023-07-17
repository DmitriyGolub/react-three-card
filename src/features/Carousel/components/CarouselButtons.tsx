import React from "react";
import { Html } from "@react-three/drei";
import "./button.css";

interface CarouselButtonsProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

export const CarouselButtons: React.FC<CarouselButtonsProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <>
      <Html
        fullscreen={true}
        style={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: "translateX(100%)",
        }}
      >
        <button
          onClick={handlePrevious}
          className="button-container"
          style={{
            transform: "translateX(-110%) translateY(-90%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            transform="rotate(90 0 0)"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </button>
      </Html>
      <Html
        fullscreen={true}
        style={{
          position: "fixed",
          top: "50%",
          left: 0,
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={handleNext}
          className="button-container"
          style={{
            transform: "translateX(10%) translateY(-90%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            transform="rotate(-90 0 0)"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </button>
      </Html>
    </>
  );
};
