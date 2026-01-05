
import React, { useState } from 'react';
import { Lock, Send, Users, Shield } from 'lucide-react';
import { ChatMessage } from '../types';

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: 'u1', senderName: 'GearHead', text: 'Anyone going to the track day on Saturday?', timestamp: '12:05 PM', isEncrypted: true },
  { id: '2', senderId: 'u2', senderName: 'TurboTina', text: 'Count me in! Just finished my stage 2 tune.', timestamp: '12:07 PM', isEncrypted: true },
  { id: '3', senderId: 'u3', senderName: 'DealerDon', text: 'I have some Pirelli slicks on sale if anyone needs them.', timestamp: '12:10 PM', isEncrypted: true },
];

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Me',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] py-6">
      <div className="bg-slate-900 dark:bg-black rounded-t-2xl p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-bold">Lounge Chat</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-300">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30 text-green-400 text-xs font-medium">
          <Lock size={12} />
          ENCRYPTED
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 flex items-center gap-1">
            <Shield size={10} />
            Drivecore Guard Active
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{msg.senderName}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{msg.timestamp}</span>
            </div>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.senderId === 'me' 
              ? 'bg-brand-600 text-white rounded-tr-none' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 rounded-b-2xl border-x border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-2 dark:text-white dark:placeholder-slate-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-brand-600 text-white rounded-lg flex items-center justify-center hover:bg-brand-700 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
