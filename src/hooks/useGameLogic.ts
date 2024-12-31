import { useState, useEffect, useRef } from 'react';
import { shuffleArray } from '../utill/Shuffle';
import imageData from '../Data/ImageData.json';

interface CardType {
  id: number;
  image: string;
  matched: boolean;
}

const useGameLogic = (
  selectedLevel: string,
  imageCategory: string,
  startTimer: () => void,
  incrementMoves: () => void,
  incrementScore: () => void
) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const prevImageCategory = useRef(imageCategory);

  const getCardCount = () => {
    switch (selectedLevel) {
      case 'easy':
        return 12;
      case 'medium':
        return 24;
      case 'hard':
        return 36;
      default:
        return 12;
    }
  };

  const initializeGame = () => {
    const images = imageData[imageCategory as keyof typeof imageData];
    const cardCount = getCardCount();
    const selectedImages = images.slice(0, cardCount / 2);
    const cardPairs = [...selectedImages, ...selectedImages].map((image, index) => ({
      id: index,
      image,
      matched: false,
    }));
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setMatchedCards([]);
  };

  const handleCardClick = (card: CardType) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
      startTimer(); // Start the timer when the first card is clicked
    } else {
      setSecondCard(card);
      setDisabled(true);
      incrementMoves(); // Increment moves when a second card is clicked

      if (firstCard.image === card.image) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        incrementScore(); // Increment score when a match is found
        setMatchedCards([firstCard.id, card.id]);
        setTimeout(() => setMatchedCards([]), 500);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    initializeGame();
  }, [selectedLevel, imageCategory]);

  useEffect(() => {
    if (prevImageCategory.current !== imageCategory) {
      initializeGame();
      prevImageCategory.current = imageCategory;
    }
  }, [imageCategory]);

  return {
    cards,
    firstCard,
    secondCard,
    disabled,
    handleCardClick,
    initializeGame,
  };
};

export default useGameLogic;