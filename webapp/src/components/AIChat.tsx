import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, X, Send, Loader2, Bot, User as UserIcon, BookOpen, PlayCircle } from "lucide-react";
import { aiChat } from "@/lib/ai.functions";
import { recipes, videos } from "@/lib/mock-data";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "As-tu une recette de pizza ?",
  "Quelle recette contient du poulet ?",
  "Comment nettoyer mon TM7 ?",
  "Convertis cette recette au Thermomix : …",
];

function parseReferences(text: string) {
  // Find [RECETTE id:xxx] / [VIDEO id:xxx]
  const refs: { type: "recipe" | "video"; id: string; title: string }[] = [];
  const re = /\[(RECETTE|VIDEO)\s+id:([a-z0-9-]+)\]/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1].toUpperCase() === "RECETTE") {
      const r = recipes.find((x) => x.id === m![2]);
      if (r && !refs.find((x) => x.id === r.id))
        refs.push({ type: "recipe", id: r.id, title: r.title });
    } else {
      const v = videos.find((x) => x.id === m![2]);
      if (v && !refs.find((x) => x.id === v.id))
        refs.push({ type: "video", id: v.id, title: v.title });
    }
  }
  return refs;
}

function cleanContent(text: string) {
  return text.replace(/\s*\[(RECETTE|VIDEO)\s+id:[a-z0-9-]+\]/gi, "").trim();
}

function FormattedMessage({ content }: { content: string }) {
  // Light markdown: **bold**, ### title, lists
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("### "))
          return (
            <div key={i} className="font-display text-base mt-2 text-foreground">
              {line.slice(4)}
            </div>
          );
        if (line.startsWith("## "))
          return (
            <div key={i} className="font-display text-lg mt-2 text-foreground">
              {line.slice(3)}
            </div>
          );
        const bullet = /^(\s*[-*]\s+|\s*\d+\.\s+)/.exec(line);
        const renderInline = (s: string) =>
          s.split(/(\*\*[^*]+\*\*)/g).map((p, k) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={k} className="font-semibold">
                {p.slice(2, -2)}
              </strong>
            ) : (
              <span key={k}>{p}</span>
            ),
          );
        if (bullet)
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-primary mt-0.5">•</span>
              <span>{renderInline(line.replace(/^(\s*[-*]\s+|\s*\d+\.\s+)/, ""))}</span>
            </div>
          );
        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Bonjour 🌸 Je suis l'assistante IA de Lys. Pose-moi une question sur une recette, une astuce TM7 ou colle-moi une recette à convertir au Thermomix.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await aiChat({
        data: { messages: next.map(({ role, content }) => ({ role, content })) },
      });
      if (res.ok) {
        setMessages([...next, { role: "assistant", content: res.content }]);
      } else {
        setMessages([
          ...next,
          { role: "assistant", content: `😔 ${res.error}` },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "😔 Je n'ai pas pu joindre l'assistance. Vérifie ta connexion et réessaie.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir l'assistante IA"
        className="fixed z-40 bottom-44 right-4 md:right-[calc(50%-12rem)] w-13 h-13 rounded-full bg-gradient-gold text-foreground shadow-rose flex items-center justify-center hover:scale-105 transition"
        style={{ width: 52, height: 52 }}
      >
        <Sparkles className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          IA
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md h-[85vh] md:h-[640px] bg-background rounded-t-3xl md:rounded-3xl shadow-rose flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-luxe text-primary-foreground px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">
                  Assistante IA
                </div>
                <div className="font-display text-lg leading-tight">Perle, l'IA de Lys</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-background/20 backdrop-blur flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-secondary/30">
              {messages.map((m, i) => {
                const refs = m.role === "assistant" ? parseReferences(m.content) : [];
                const clean = m.role === "assistant" ? cleanContent(m.content) : m.content;
                return (
                  <div
                    key={i}
                    className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-luxe text-primary-foreground flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                        m.role === "user"
                          ? "bg-gradient-luxe text-primary-foreground rounded-tr-sm"
                          : "bg-card border border-border text-foreground rounded-tl-sm"
                      }`}
                    >
                      {m.role === "user" ? (
                        <p className="text-[13.5px] whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <FormattedMessage content={clean} />
                      )}
                      {refs.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-border/60 space-y-1.5">
                          {refs.map((r) =>
                            r.type === "recipe" ? (
                              <Link
                                key={r.id}
                                to="/app/recipes/$recipeId"
                                params={{ recipeId: r.id }}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 text-[12px] text-primary font-medium bg-secondary/60 hover:bg-secondary rounded-xl px-2.5 py-1.5"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span className="truncate">{r.title}</span>
                              </Link>
                            ) : (
                              <Link
                                key={r.id}
                                to="/app/videos/$videoId"
                                params={{ videoId: r.id }}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 text-[12px] text-primary font-medium bg-secondary/60 hover:bg-secondary rounded-xl px-2.5 py-1.5"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span className="truncate">{r.title}</span>
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                    {m.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                        <UserIcon className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-luxe text-primary-foreground flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    L'assistante réfléchit…
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-background border-t border-border">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] bg-secondary text-foreground/80 px-2.5 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="bg-background border-t border-border p-3 flex items-end gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Écris ta question ou colle une recette…"
                className="flex-1 bg-card border border-border rounded-2xl px-3.5 py-2.5 text-[13.5px] resize-none max-h-32 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-full bg-gradient-luxe text-primary-foreground shadow-rose flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
