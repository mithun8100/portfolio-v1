import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, Send, X, Bot, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add default initial welcome messages
    setMessages([
      {
        id: 'w1',
        role: 'model',
        content: `Hi! I'm Mithun's interactive AI assistant. Ask me questions about my Core Java backend architecture, RESTful API connections, Multi-AZ 3-tier AWS deployments, or timeline details! How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'm_' + Math.random().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      // Structure previous chat history for correct Gemini API routing
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.content, chatHistory })
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: 'm_' + Math.random().toString(),
          role: 'model',
          content: data.text || 'I missed that. Please try asking again!',
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error('Chat failed');
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: 'm_err',
        role: 'model',
        content: 'Failed to synchronize with Gemini API server nodes. Fallback rule matched: Please fill in the Contact Form below to request info straight from Mithun!',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher badge */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-4 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 shadow-xl shadow-teal-500/10 cursor-pointer text-[#0B0F19] hover:scale-110 active:scale-95 duration-200 hover:rotate-2 focus:outline-none flex items-center gap-2 group border border-teal-400"
        aria-label="Open AI chatbot avatar dialog"
      >
        <MessageSquare className="w-5.5 h-5.5 group-hover:rotate-6 transition-transform" />
        <span className="text-xs font-bold leading-none select-none tracking-wider font-sans">CHAT WITH AI</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-400 border border-[#0B0F19] animate-ping" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-300 border border-[#0B0F19]" />
      </button>

      {/* Expanded sidebar dialog panel */}
      {open && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-end p-0 md:p-6 animate-fade-in">
          <div
            className="w-full md:w-[480px] h-full md:h-[600px] flex flex-col rounded-none md:rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-white/5 bg-neutral-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-lg text-[#0B0F19]">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                    Mithun&apos;s AI Avatar
                  </h3>
                  <span className="font-mono text-[9px] text-teal-400 tracking-wider">
                    ⚡ GEMINI-2.0-FLASH ACTIVE
                  </span>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body messages list */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans bg-neutral-950/20" ref={scrollRef}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed border ${
                      m.role === 'user'
                        ? 'bg-gradient-to-tr from-teal-500/10 to-indigo-600/10 text-white border-teal-500/20'
                        : 'bg-neutral-900 text-neutral-200 border-white/5'
                    }`}
                  >
                    {m.role === 'model' && (
                      <div className="flex items-center gap-1.5 pb-2 font-mono text-[9px] font-semibold text-teal-400">
                        <Bot className="w-3.5 h-3.5" />
                        <span>MITHUN_AI_WIDGET:</span>
                      </div>
                    )}
                    <span className="whitespace-pre-line">{m.content}</span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-4 bg-neutral-900 text-neutral-400 border border-white/5 text-xs animate-pulse flex items-center gap-2.5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" />
                    </div>
                    <span className="font-mono text-[10px]">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-neutral-950/60 flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything: Core Java, AWS architecture, resume ..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-xs md:text-sm duration-150"
              />
              <button
                type="submit"
                disabled={!prompt.trim() || loading}
                className="p-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:brightness-110 active:scale-95 disabled:opacity-50 text-[#0B0F19] rounded-xl flex items-center justify-center cursor-pointer transition-all border border-teal-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
