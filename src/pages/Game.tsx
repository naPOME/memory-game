import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
// Import the context
import { VictoryScreen } from '../components/VictoryScreen';
import imageData from '../Data/ImageData.json'; // Import the JSON data
import { useImageCategory } from '../Context/ImageCategory';
interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const Game = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const { font } = useTheme();
  const { imageCategory, resetGame } = useImageCategory(); // Consume the context

  // Generate cards based on the selected category
  useEffect(() => {
    const images = imageData[imageCategory as keyof typeof imageData]; // Get images for the selected category
    const cardPairs = [...images, ...images].map((image, index) => ({
      id: index,
      image,
      matched: false,
    }));
    const shuffledCards = shuffleArray(cardPairs); 
    setCards(shuffledCards);
  }, [imageCategory]);

  
  const shuffleArray = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowVictoryScreen(true);
    }
  }, [cards]);

  
  const handleCardClick = (card: Card) => {
    if (disabled || card.matched || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisabled(true);

      if (firstCard.image === card.image) {

        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        
        setMatchedCards([firstCard.id, card.id]);
        
        setTimeout(() => setMatchedCards([]), 500);
        resetTurn();
      } else {
        // No match
        setTimeout(() => resetTurn(), 1000);
      }
    }
  };

  
  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  
  const handleRestart = () => {
    const images = imageData[imageCategory as keyof typeof imageData]; 
    const cardPairs = [...images, ...images].map((image, index) => ({
      id: index,
      image,
      matched: false,
    }));
    const shuffledCards = shuffleArray(cardPairs); // Shuffle the cards
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setShowVictoryScreen(false);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen font-${font} bg-background p-4`}>
      <h1 className="text-4xl font-bold text-primary mb-6">Memory Game</h1>
      <div className="grid gap-4 grid-cols-2">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`card w-32 h-20 cursor-pointer rounded-lg shadow-md transition-transform transform-style-preserve-3d ${
              card === firstCard || card === secondCard || card.matched ? 'flipped' : ''
            } ${matchedCards.includes(card.id) ? 'animate-pulse' : ''}`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-background border border-b-2 border-accent rounded-lg flex items-center justify-center backface-hidden">
                <span className="text-xl font-bold text-primary">?</span>
              </div>
              <div className="card-back absolute w-full h-full bg-white rounded-lg flex items-center justify-center backface-hidden transform rotate-y-180">
                <img
                  src={card.image}
                  alt="Card"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Victory Screen when all cards are matched */}
      {showVictoryScreen && <VictoryScreen onRestart={handleRestart} />}
    </div>
  );
};

export default Game;