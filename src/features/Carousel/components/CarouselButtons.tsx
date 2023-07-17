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
    <Html>
      <div
        className={"current-button-container"}
        style={{
          transform: "translateX(50%)",
          zIndex: 2,
        }}
      >
        <button
          onClick={handlePrevious}
          className="current-button"
          style={{
            transform: "translateX(-25%) translateY(125%)",
            rotate: "90deg",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // transform="rotate(90 0 0)"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </button>
      </div>
      <div
        className={"current-button-container"}
        style={{
          transform: "translateX(-50%)",
          zIndex: "1",
        }}
      >
        <button
          onClick={handleNext}
          className="current-button"
          style={{
            transform: "translateX(25%) translateY(25%)",
            rotate: "-90deg",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // transform="rotate(-90 0 0)"
          >
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </button>
      </div>
    </Html>
  );
};
