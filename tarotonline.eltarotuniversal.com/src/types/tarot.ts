export interface TarotCard {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  question: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tarotist';
  content: string;
  timestamp: Date;
}