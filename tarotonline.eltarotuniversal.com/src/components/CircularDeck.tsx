import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TarotCard } from '../types/tarot';

interface Props {
  cards: TarotCard[];
  onSelect: (card: TarotCard) => void;
  selectedCount: number;
}

export const CircularDeck: React.FC<Props> = ({ cards, onSelect, selectedCount }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCount < 3 && !selectedCards.includes(card.id)) {
      setSelectedCards([...selectedCards, card.id]);
      onSelect(card);
    }
  };

  return (
    <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] mx-auto">
      {/* Cartas seleccionadas en el centro */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 md:gap-4 z-50">
        {selectedCards.map((id, index) => {
          const card = cards.find(c => c.id === id);
          if (!card) return null;
          
          return (
            <motion.div
              key={`selected-${id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-28 md:w-32 md:h-48 rounded-lg overflow-hidden shadow-2xl border-2 border-gold"
            >
              <img 
                src={card.image} 
                alt={card.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 md:p-2">
                <p className="text-[10px] md:text-xs text-white text-center font-serif">{card.name}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Círculo de cartas */}
      <AnimatePresence>
        {cards.map((card, index) => {
          const angle = (index * 360) / cards.length;
          const radius = window.innerWidth < 768 ? 125 : 250; // Ajuste responsive del radio
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          const isSelected = selectedCards.includes(card.id);

          if (isSelected) return null;

          return (
            <motion.div
              key={`card-${card.id}`}
              className="absolute w-16 h-24 md:w-24 md:h-36"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                perspective: '1000px'
              }}
            >
              <motion.div
                className="card-container relative w-full h-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleCardSelect(card)}
              >
                <div className="card-face absolute w-full h-full rounded-lg overflow-hidden border-2 border-gold shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                    <span className="text-gold opacity-70 text-base md:text-xl">✧</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};