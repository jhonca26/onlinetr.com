import { useState } from 'react';
import { ChatMessage, TarotCard } from '../types/tarot';
import { MessageSquare, Send } from 'lucide-react';

interface Props {
  selectedCards: TarotCard[];
  onCallRequest: () => void;
}

export const Chat: React.FC<Props> = ({ selectedCards, onCallRequest }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'tarotist',
      content: '¡Bienvenido/a a tu lectura de tarot! He percibido una energía muy especial en las cartas que has seleccionado. ¿Hay alguna pregunta específica que te gustaría hacer sobre tu situación?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    
    // Simular respuesta del tarotista
    setTimeout(() => {
      const tarotistResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tarotist',
        content: `Observo que las cartas ${selectedCards.map(card => card.name).join(', ')} están revelando una situación compleja en tu vida. Percibo una energía bloqueada que podría estar relacionada con un mal de ojo. ¿Te gustaría profundizar en una consulta personalizada para explorar mejor tu situación?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, tarotistResponse]);
    }, 1500);

    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-purple-900/30 rounded-lg backdrop-blur-sm overflow-hidden">
      <div className="p-4 bg-purple-800/50">
        <h3 className="text-lg font-medium text-purple-100 mb-4">Tu Lectura de Tarot</h3>
        <div className="flex justify-start gap-2 md:gap-4 overflow-x-auto pb-4">
          {selectedCards.map((card, index) => (
            <div 
              key={`chat-card-${card.id}-${index}`} 
              className="relative w-20 h-28 md:w-24 md:h-36 flex-shrink-0"
            >
              <div className="w-full h-full rounded-lg overflow-hidden border border-gold/50 shadow-lg">
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-0 right-0 text-center">
                <span className="text-[10px] md:text-xs font-serif text-purple-200 bg-purple-900/80 px-2 py-0.5 rounded-full inline-block">
                  {card.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[60vh] md:h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-xs p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/40 text-purple-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-purple-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            className="flex-1 px-4 py-2 rounded-md border-purple-300 bg-purple-900/20 text-purple-100 placeholder-purple-300"
            placeholder="Escribe tu pregunta..."
          />
          <button
            onClick={() => sendMessage(input)}
            className="p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        
        <button
          onClick={onCallRequest}
          className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare size={20} />
          Consulta Personalizada con Tarotista
        </button>
      </div>
    </div>
  );
};