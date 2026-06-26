"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const MODEL = "openai/gpt-oss-120b:free";

export default function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesRef = useRef<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSentTextRef = useRef("");

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for the "open-digital-twin" custom event dispatched from Hero
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-digital-twin", handleOpen);
    return () => window.removeEventListener("open-digital-twin", handleOpen);
  }, []);

  const send = useCallback(async (options?: {
    textOverride?: string;
    historyOverride?: Message[];
    reuseExistingUser?: boolean;
  }) => {
    const text =
      options?.textOverride !== undefined ? options.textOverride : input.trim();
    if (!text || streaming) return;
    setInput("");
    lastSentTextRef.current = text;

    const currentModel = MODEL;
    const assistantMsg: Message = { role: "assistant", content: "" };

    let historyMessages: Message[];
    if (options?.reuseExistingUser) {
      historyMessages = options.historyOverride ?? messagesRef.current;
      if (historyMessages.at(-1)?.role !== "user") return;
      setMessages([...historyMessages, assistantMsg]);
    } else {
      const userMsg: Message = { role: "user", content: text };
      historyMessages = [...messagesRef.current, userMsg];
      setMessages([...historyMessages, assistantMsg]);
    }

    setStreaming(true);

    try {
      const history = historyMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, model: currentModel }),
      });

      if (!res.ok) {
        const errorMessage =
          res.status === 429
            ? "You're sending messages quickly — try again in a moment."
            : "Request failed. Please try again.";
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: errorMessage, isError: true },
        ]);
        setStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: last.content + chunk };
          }
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Network error. Check your connection and try again.", isError: true },
      ]);
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }, [input, streaming]);

  const retry = () => {
    const currentMessages = messagesRef.current;
    const sanitizedHistory =
      currentMessages.at(-1)?.role === "assistant" && currentMessages.at(-1)?.isError
        ? currentMessages.slice(0, -1)
        : currentMessages;
    const lastUserMessage = sanitizedHistory.at(-1);

    if (lastUserMessage?.role !== "user") return;

    send({
      textOverride: lastUserMessage.content,
      historyOverride: sanitizedHistory,
      reuseExistingUser: true,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!open && (
          <span className="animate-pulse rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300 backdrop-blur-sm">
            Ask my Digital Twin
          </span>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-400/40 active:scale-95"
          aria-label={open ? "Close chat" : "Chat with Digital Twin"}
        >
          {open ? (
            <X size={24} />
          ) : (
            <span className="text-base font-bold tracking-wide">JDL</span>
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[min(380px,calc(100vw-3rem))] flex-col rounded-xl border border-white/[0.08] bg-[#0f1115] shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-[10px] font-bold tracking-wide text-white">
                JDL
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Digital Twin
                </h3>
                <p className="text-xs text-white/40">
                  Ask anything about my career
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex h-[400px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="mt-8 flex flex-col items-center gap-5 text-center text-sm text-white/30">
                <div>
                  <p className="mb-1 font-semibold text-white/50">
                    Jesus M. De Leon — Digital Twin
                  </p>
                  <p className="max-w-[300px]">
                    {"I'm an AI built on Jesus's real résumé and work history — ask me anything, and I'll answer in his voice, with sources."}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "What roles are you looking for?",
                    "What's your salary range?",
                    "What's your experience with dbt?",
                    "What do you do outside of work?",
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => send({ textOverride: chip })}
                      disabled={streaming}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white/80 disabled:opacity-40"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500/20 text-white"
                    : msg.isError
                    ? "mr-auto bg-red-500/15 text-red-200 border border-red-500/25"
                    : "mr-auto bg-white/[0.04] text-white/80"
                }`}
              >
                {msg.content ||
                  (streaming && i === messages.length - 1 && "…")}
                {msg.isError && !streaming && (
                  <button
                    onClick={retry}
                    className="mt-2 flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
                  >
                    <RefreshCw size={12} />
                    Retry
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-white/[0.08] px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              disabled={streaming}
              className="flex-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-white/25 focus:border-blue-400/40 disabled:opacity-50"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || streaming}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 text-white transition-colors hover:bg-blue-400 disabled:opacity-40"
            >
              {streaming ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
