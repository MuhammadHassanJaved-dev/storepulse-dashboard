"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Send, Smile, Paperclip } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CONVERSATIONS, MESSAGES } from "@/constants/mock-data";
import { Conversation, ChatMessage } from "@/types";
import { cn } from "@/lib/utils";

function ConversationRow({ conv, active, onClick }: {
  conv: Conversation; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
        active
          ? "bg-brand-primary/10 border border-brand-primary/20"
          : "hover:bg-surface2/60 border border-transparent"
      )}
    >
      <div className="relative shrink-0">
        <Avatar name={conv.name} color={conv.avatarColor} size={40} />
        {conv.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-sm truncate">{conv.name}</p>
          <span className="text-[11px] text-muted shrink-0">{conv.lastMessageTime}</span>
        </div>
        <p className="text-xs text-muted truncate mt-0.5">{conv.lastMessage}</p>
      </div>
      {conv.unread > 0 && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
          {conv.unread}
        </span>
      )}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl rounded-bl-sm bg-surface2 w-fit">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function MessagesPage() {
  const [activeId, setActiveId] = React.useState(CONVERSATIONS[0].id);
  const [query, setQuery] = React.useState("");
  const [showChat, setShowChat] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [msgs, setMsgs] = React.useState<ChatMessage[]>(MESSAGES);
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const active = CONVERSATIONS.find(c => c.id === activeId)!;
  const filteredConvs = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  const thread = msgs.filter(m => m.conversationId === activeId);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread.length, typing]);

  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, {
      id: `m${Date.now()}`, conversationId: activeId,
      sender: "me", text: draft.trim(), time: "Now",
    }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {
        id: `m${Date.now() + 1}`, conversationId: activeId,
        sender: "them", text: "Got it! Thanks for reaching out 👍", time: "Now",
      }]);
    }, 1600);
  };

  return (
    /* Full viewport height minus the navbar (~64px) and page padding */
    <div className="h-[calc(100dvh-80px)] min-h-[480px]">
      <Card className="p-0 overflow-hidden h-full">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full divide-x divide-border">

          {/* ── Conversation list ── */}
          <div className={cn("flex flex-col h-full overflow-hidden", showChat ? "hidden md:flex" : "flex")}>
            <div className="p-3 border-b border-border shrink-0">
              <p className="font-display font-semibold text-sm mb-2.5 px-1">Messages</p>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <Input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search conversations…" className="pl-9 h-9 text-sm" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {filteredConvs.map(c => (
                <ConversationRow key={c.id} conv={c} active={c.id === activeId}
                  onClick={() => { setActiveId(c.id); setShowChat(true); }} />
              ))}
            </div>
          </div>

          {/* ── Chat panel ── */}
          <div className={cn("flex flex-col h-full overflow-hidden", showChat ? "flex" : "hidden md:flex")}>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-border shrink-0">
              <button
                onClick={() => setShowChat(false)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:bg-surface2 focus-ring shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="relative shrink-0">
                <Avatar name={active.name} color={active.avatarColor} size={36} />
                {active.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{active.name}</p>
                <p className="text-xs text-muted">{active.online ? "Online now" : "Offline"}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
              <AnimatePresence initial={false}>
                {thread.map(m => (
                  <motion.div key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[80%] sm:max-w-[68%] rounded-2xl px-3.5 py-2.5 text-sm",
                      m.sender === "me"
                        ? "bg-brand-gradient text-white rounded-br-sm"
                        : "bg-surface2 border border-border rounded-bl-sm"
                    )}>
                      <p className="leading-relaxed">{m.text}</p>
                      <p className={cn("text-[10px] mt-1",
                        m.sender === "me" ? "text-white/65" : "text-muted")}>
                        {m.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="p-3 border-t border-border flex items-center gap-2 shrink-0">
              <button className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-surface2 focus-ring">
                <Paperclip className="h-[18px] w-[18px]" />
              </button>
              <button className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-surface2 focus-ring">
                <Smile className="h-[18px] w-[18px]" />
              </button>
              <Input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Type a message…"
                className="flex-1 h-9 text-sm"
              />
              <button
                onClick={send}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow hover:brightness-110 transition-all focus-ring"
                aria-label="Send"
              >
                <Send className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
