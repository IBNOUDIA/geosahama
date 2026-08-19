"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface AIAgentWidgetProps {
  dict: any;
}

export default function AIAgentWidget({ dict }: AIAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: dict.ai.welcome },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      let reply = "Merci pour votre message. Je suis l'agent Sahama IA. Je peux vous informer sur nos services de géolocalisation en Afrique de l'Ouest ou le suivi d'épuration à Montréal.";
      if (userMsg.toLowerCase().includes("contact") || userMsg.toLowerCase().includes("email")) {
        reply = "Vous pouvez contacter directement M. Souleymane Diallo à l'adresse : Souleymane.Diallo@sahama-services.com";
      } else if (userMsg.toLowerCase().includes("montreal") || userMsg.toLowerCase().includes("epuration")) {
        reply = "À Montréal, Sahama Services déploie une technologie de suivi écologique couvrant le processus complet d'épuration, de la prévention jusqu'à l'enfouissement.";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
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
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={dict.ai.placeholder}
              className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sahamaOrange"
            />
            <button
              onClick={handleSend}
              className="bg-sahamaOrange hover:bg-sahamaOrange/90 text-black p-2 rounded-lg transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
