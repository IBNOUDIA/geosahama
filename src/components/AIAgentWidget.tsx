"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

interface AIAgentWidgetProps {
  dict: any;
}

type ChatMessage = { sender: "user" | "bot"; text: string };

export default function AIAgentWidget({ dict }: AIAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: dict.ai.welcome },
  ]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const history = messages.map((m) => ({
      role: (m.sender === "user" ? "user" : "model") as "user" | "model",
      text: m.text,
    }));

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Désolé, je ne peux pas répondre pour le moment. Contactez-nous directement à Souleymane.Diallo@sahama-services.com.",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Une erreur de connexion est survenue. Contactez-nous à Souleymane.Diallo@sahama-services.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sahamaOrange to-sahamaYellow text-black font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all"
        >
          <Bot size={22} />
          <span className="hidden sm:inline">Sahama AI</span>
          <Sparkles size={16} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-cardBg border border-zinc-800 rounded-2xl shadow-2xl flex flex-col h-[480px] overflow-hidden">
          {/* Header */}
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Bot className="text-sahamaOrange" size={20} />
              <span>{dict.ai.title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-sahamaOrange text-black font-medium"
                      : "bg-zinc-800 text-gray-200 border border-zinc-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-gray-400 border border-zinc-700 px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span>...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={dict.ai.placeholder}
              disabled={isLoading}
              className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sahamaOrange disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-sahamaOrange hover:bg-sahamaOrange/90 text-black p-2 rounded-lg transition disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
