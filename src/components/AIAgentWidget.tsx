"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Truck, X, Send, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { CONTACT_EMAIL } from "@/i18n";
import ChatMessageText, { stripMarkdown } from "./ChatMessageText";
import { KenteBand } from "./AfricanPatterns";

interface AIAgentWidgetProps {
  dict: any;
  lang: "fr" | "en";
}

type ChatMessage = { sender: "user" | "bot"; text: string };

const noopSubscribe = () => () => {};

export default function AIAgentWidget({ dict, lang }: AIAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: dict.ai.welcome },
  ]);

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  // Browser capability: false during server render, real value once hydrated.
  const micSupported = useSyncExternalStore(
    noopSubscribe,
    () =>
      Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) &&
      typeof window.speechSynthesis !== "undefined",
    () => false
  );
  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef<any>(null);
  const speechLang = lang === "fr" ? "fr-FR" : "en-US";

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stripMarkdown(text));
    utterance.lang = speechLang;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (rawMsg: string) => {
    const userMsg = rawMsg.trim();
    if (!userMsg || isLoading) return;

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
        const fallback = `${dict.ai.errorReply} ${CONTACT_EMAIL}.`;
        setMessages((prev) => [...prev, { sender: "bot", text: fallback }]);
        speak(fallback);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
        speak(data.reply);
      }
    } catch {
      const fallback = `${dict.ai.connectionError} ${CONTACT_EMAIL}.`;
      setMessages((prev) => [...prev, { sender: "bot", text: fallback }]);
      speak(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const handleMicClick = () => {
    if (!micSupported) {
      setVoiceError(dict.ai.micUnsupported);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setVoiceError("");

    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = speechLang;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);

      const last = event.results[event.results.length - 1];
      if (last.isFinal) {
        sendMessage(transcript);
      }
    };

    recognition.onerror = () => {
      setVoiceError(dict.ai.micError);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const toggleVoice = () => {
    setVoiceEnabled((prev) => {
      if (prev) window.speechSynthesis?.cancel();
      return !prev;
    });
  };

  const handleClose = () => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <style>{`
        @keyframes chatbotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .chatbot-float { animation: chatbotFloat 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chatbot-float { animation: none; }
        }
      `}</style>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={dict.ai.openLabel}
          className="chatbot-float flex items-center gap-2 bg-gradient-to-r from-sahamaOrange to-sahamaYellow text-darkBg font-semibold px-4 py-3 rounded-full shadow-2xl shadow-sahamaOrange/30 ring-2 ring-darkBg hover:scale-105 transition-all"
        >
          <Truck size={22} />
          <span className="hidden sm:inline">Sahama AI</span>
          <Sparkles size={16} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-cardBg border border-zinc-800 rounded-2xl shadow-2xl flex flex-col h-[480px] overflow-hidden">
          {/* Flag stripe accent */}
          <KenteBand className="h-1.5 shrink-0" />

          {/* Header */}
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Truck className="text-sahamaOrange" size={20} />
              <span>{dict.ai.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleVoice}
                title={voiceEnabled ? dict.ai.muteTitle : dict.ai.unmuteTitle}
                aria-label={voiceEnabled ? dict.ai.muteTitle : dict.ai.unmuteTitle}
                className={`transition ${
                  isSpeaking ? "text-sahamaYellow animate-pulse" : voiceEnabled ? "text-gray-300" : "text-gray-600"
                } hover:text-white`}
              >
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={handleClose} aria-label={dict.ai.closeLabel} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
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
                  {msg.sender === "bot" ? <ChatMessageText text={msg.text} /> : msg.text}
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
          {voiceError && <p className="text-red-400 text-[11px] px-3 pt-2">{voiceError}</p>}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? dict.ai.listeningLabel : dict.ai.placeholder}
              aria-label={dict.ai.placeholder}
              disabled={isLoading}
              className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sahamaOrange disabled:opacity-50"
            />
            {micSupported && (
              <button
                onClick={handleMicClick}
                disabled={isLoading}
                title={dict.ai.micTitle}
                aria-label={dict.ai.micTitle}
                className={`p-2 rounded-lg transition disabled:opacity-50 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-black border border-zinc-800 text-gray-300 hover:text-white"
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={isLoading}
              aria-label={dict.ai.sendLabel}
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
