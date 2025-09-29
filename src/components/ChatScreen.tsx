import React, { useState } from 'react';
import { Send, Heart, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de salud DocIA. Puedo ayudarte con información médica, sugerir hospitales cercanos según tus síntomas, y recomendarte remedios naturales. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Tengo dolor de cabeza desde esta mañana',
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Entiendo que tienes dolor de cabeza. Para ayudarte mejor, ¿podrías decirme:\n\n• ¿Qué tan intenso es del 1 al 10?\n• ¿Es pulsátil o constante?\n• ¿Tienes otros síntomas como náuseas o sensibilidad a la luz?\n\nMientras tanto, puedo sugerirte:\n🏥 Hospital General (2.5 km) - Neurología\n🌿 Manzanilla - Para relajación y alivio',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '4',
      text: 'Es como un 6 de intensidad y tengo un poco de náuseas',
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: '5',
      text: 'Basándome en tus síntomas, te recomiendo:\n\n🏥 **Hospitales cercanos:**\n• Hospital Viedma (1.8 km) - Neurología 24h\n• Hospital General (2.5 km) - Emergencias\n\n🌿 **Remedios naturales:**\n• Té de jengibre para las náuseas\n• Compresas frías en la frente\n• Descanso en lugar oscuro\n\nSi el dolor persiste o empeora, te recomiendo acudir al hospital. ¿Te ayudo a ver la ubicación de algún hospital?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate intelligent bot response
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = newMessage.toLowerCase();
      
      if (lowerMessage.includes('dolor') || lowerMessage.includes('duele')) {
        botResponse = '🩺 Para el dolor que describes, te sugiero:\n\n🏥 **Hospitales cercanos:**\n• Hospital Viedma (1.8 km) - Emergencias 24h\n• Clínica Especializada (3.2 km) - Consultas\n\n🌿 **Remedios naturales:**\n• Manzanilla para relajación\n• Compresas frías/calientes según el tipo de dolor\n\n¿Quieres que te muestre la ubicación de algún hospital?';
      } else if (lowerMessage.includes('fiebre') || lowerMessage.includes('temperatura')) {
        botResponse = '🌡️ Para la fiebre, es importante:\n\n🏥 **Atención médica:**\n• Hospital General (2.5 km) - Emergencias\n• Si es >38.5°C, busca atención inmediata\n\n🌿 **Remedios naturales:**\n• Eucalipto para bajar temperatura\n• Hidratación constante\n• Reposo\n\n¿Necesitas direcciones al hospital más cercano?';
      } else if (lowerMessage.includes('estómago') || lowerMessage.includes('digestión')) {
        botResponse = '🍃 Para problemas digestivos:\n\n🌿 **Medicina natural:**\n• Manzanilla - Antiinflamatoria digestiva\n• Jengibre - Para náuseas y digestión\n\n🏥 **Si persiste:**\n• Hospital General - Gastroenterología\n\n¿Te ayudo con más información sobre estos remedios naturales?';
      } else {
        botResponse = 'Entiendo tu consulta. Basándome en tu ubicación, estos son los hospitales más cercanos:\n\n🏥 **Hospital Viedma** (1.8 km)\n🏥 **Hospital General** (2.5 km)\n\nTambién puedo recomendarte remedios naturales. ¿Podrías ser más específico sobre tus síntomas para ayudarte mejor?';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 fill-current" />
          <Activity className="w-4 h-4" />
        </div>
        <span className="font-semibold">DocIA</span>
        <div className="ml-auto text-xs bg-blue-400 px-2 py-1 rounded">
          30
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {message.sender === 'bot' && (
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      <Heart className="w-3 h-3 fill-current" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with actions */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center justify-center space-x-6 mb-3 text-xs text-gray-500">
          <button className="flex items-center space-x-1">
            <span>🤖</span>
            <span>What is MedigatPT?</span>
          </button>
          <button className="flex items-center space-x-1">
            <span>🔒</span>
            <span>Privacy</span>
          </button>
          <button className="flex items-center space-x-1">
            <span>❓</span>
            <span>FAQs</span>
          </button>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-full border-gray-300"
          />
          <Button
            type="submit"
            size="sm"
            className="rounded-full w-10 h-10 bg-blue-500 hover:bg-blue-600 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};