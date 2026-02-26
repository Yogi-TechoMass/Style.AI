import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  User, 
  Sparkles, 
  Image as ImageIcon, 
  ShoppingBag, 
  X,
  Plus,
  ChevronRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getStylistResponse } from '../services/geminiService';
import { ChatMessage, FashionItem } from '../types';

const ChatbotPage = () => {
  const location = useLocation();
  const { image: contextImage, result: contextResult } = location.state || {};
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: contextImage 
        ? `I see you've uploaded a beautiful **${contextResult?.detectedItem?.category}**. How can I help you style it today?`
        : "Hello! I'm your VOGUE.AI personal stylist. Upload an outfit or ask me any fashion question to get started."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getStylistResponse(userMessage, contextImage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-8">
      {/* Left: Chat Window */}
      <div className="flex-grow flex flex-col glass-card border-white/5 overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-luxury-beige rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-luxury-black" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">AI Stylist</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-luxury-white/40 font-bold">Online & Ready</span>
              </div>
            </div>
          </div>
          {contextImage && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <img src={contextImage} alt="Context" className="w-8 h-8 rounded-md object-cover" />
              <span className="text-xs font-medium text-luxury-white/60">Active Context</span>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-8 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={`msg-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
                msg.role === 'user' ? 'border-white/10 bg-white/5' : 'border-luxury-beige/20 bg-luxury-beige/10'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-luxury-beige" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-luxury-beige text-luxury-black font-medium rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                <div className={`prose prose-invert prose-sm max-w-none ${msg.role === 'user' ? 'text-luxury-black' : ''}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-luxury-beige/20 bg-luxury-beige/10">
                <Sparkles className="w-5 h-5 text-luxury-beige animate-pulse" />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-luxury-beige rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-luxury-beige rounded-full animate-bounce delay-150" />
                  <div className="w-1.5 h-1.5 bg-luxury-beige rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-white/2">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about styling, matching items, or fashion trends..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-luxury-beige/50 transition-colors"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-2 bottom-2 w-12 bg-luxury-beige text-luxury-black rounded-xl flex items-center justify-center hover:bg-luxury-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-center text-luxury-white/20 uppercase tracking-widest font-bold">
            Powered by VOGUE.AI Neural Engine
          </p>
        </div>
      </div>

      {/* Right: Suggested Items / Context (Desktop Only) */}
      <div className="hidden lg:flex flex-col gap-6 w-80">
        <div className="glass-card p-6 border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-luxury-beige" />
            Suggested for You
          </h3>
          <div className="space-y-4">
            {contextResult?.recommendations?.map((item: FashionItem, idx: number) => (
              <div key={`rec-${idx}-${item.name}`} className="flex gap-4 group cursor-pointer">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold truncate">{item.name}</p>
                  <p className="text-[10px] text-luxury-white/40 uppercase">{item.store}</p>
                  <p className="text-xs text-luxury-beige font-bold mt-1">{item.price}</p>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-luxury-white/20 group-hover:text-luxury-beige" />
                </div>
              </div>
            ))}
            {!contextResult && (
              <div className="text-center py-8">
                <p className="text-xs text-luxury-white/20 italic">No items suggested yet. Ask for recommendations!</p>
              </div>
            )}
          </div>
          <button className="w-full mt-6 btn-outline py-2 text-xs">View Full Collection</button>
        </div>

        <div className="glass-card p-6 border-white/5 bg-luxury-beige/5">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-luxury-beige" />
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Match this', 'Formal looks', 'Casual vibes', 'Accessories'].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(tag)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-beige hover:text-luxury-black transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
