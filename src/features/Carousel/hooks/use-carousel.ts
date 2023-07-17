import { useState } from "react";
import { IFrameProps } from "../components/Card";

export const useCarousel = (initialCards: IFrameProps[]) => {
  const [cards] = useState(initialCards);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    const previousIndex = (selectedIndex - 1 + cards.length) % cards.length;
    setSelectedIndex(previousIndex);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % cards.length;
    setSelectedIndex(nextIndex);
  };

  const handleCardClick = (index: number) => {
    initialCards.map((card) => {
      if (index === selectedIndex) card.active = true;
    });
    setSelectedIndex(index);
  };

  return {
    cards,
    selectedIndex,
    handlePrevious,
    handleNext,
    handleCardClick,
  };
};
