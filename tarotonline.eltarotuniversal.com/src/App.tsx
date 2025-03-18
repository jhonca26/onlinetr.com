import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularDeck } from './components/CircularDeck';
import { UserForm } from './components/UserForm';
import { Chat } from './components/Chat';
import { TarotCard, UserData } from './types/tarot';
import { majorArcana } from './data/majorArcana';
import { Sparkles } from 'lucide-react';

function App() {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleUserSubmit = (data: UserData) => {
    setUserData(data);
    setShowChat(true);
  };

  const handleCallRequest = async () => {
    console.log('Llamada solicitada aaaaaaaaaaa',userData);
    const backendURL = `http://localhost:3001/api/transito?phone=${userData?.phone}`;

    try {
      const response = await fetch(backendURL, {
        method: 'POST', // Usamos GET ya que el endpoint en Express es GET.
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      // Aquí puedes actualizar el estado o realizar otras acciones según la respuesta.
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
    

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-purple-100">
      <header className="py-8 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tarotoo
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-2 text-lg md:text-xl text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="text-purple-400" />
          <span>Descubre tu destino</span>
          <Sparkles className="text-purple-400" />
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!userData ? (
            <motion.div
              key="selection-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedCards.length < 3 ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl mb-4">Selecciona 3 cartas del tarot</h2>
                    <p className="text-purple-300">
                      Cartas elegidas: {selectedCards.length} de 3
                    </p>
                  </div>
                  <CircularDeck
                    cards={majorArcana}
                    onSelect={handleCardSelect}
                    selectedCount={selectedCards.length}
                  />
                </>
              ) : (
                <motion.div
                  key="form-phase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl mb-6">¡Excelente elección!</h2>
                  </div>
                  <div className="flex justify-center gap-4 md:gap-6 mb-8 overflow-x-auto px-4 py-2">
                    {selectedCards.map((card, index) => (
                      <motion.div
                        key={`selected-${card.id}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-24 md:w-32 h-36 md:h-48 flex-shrink-0"
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-gold">
                          <img 
                            src={card.image} 
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-6 left-0 right-0 text-center">
                          <p className="text-xs md:text-sm font-serif text-purple-200 bg-purple-900/80 px-3 py-1 rounded-full inline-block shadow-lg">
                            {card.name}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center mb-8">
                    <p className="text-purple-300 mb-4">
                      Para recibir tu lectura, por favor completa tus datos:
                    </p>
                  </div>
                  <UserForm onSubmit={handleUserSubmit} />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="chat-phase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Chat
                selectedCards={selectedCards}
                onCallRequest={handleCallRequest}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-4 text-purple-300 text-sm">
        <p>© 2024 Tarotoo - Lectura de Tarot Online</p>
      </footer>
    </div>
  );
}

export default App;