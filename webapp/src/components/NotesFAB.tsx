import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { StickyNote, X, Check } from "lucide-react";
import { useNotes } from "@/lib/local-store";
import { recipes, videos, lives } from "@/lib/mock-data";

function getContext(pathname: string): { label: string; href: string } {
  if (pathname.startsWith("/app/videos/")) {
    const id = pathname.split("/").pop()!;
    const v = videos.find((x) => x.id === id);
    return { label: `Vidéo · ${v?.title ?? id}`, href: pathname };
  }
  if (pathname.startsWith("/app/recipes/")) {
    const id = pathname.split("/").pop()!;
    const r = recipes.find((x) => x.id === id);
    if (r) return { label: `Recette · ${r.title}`, href: pathname };
  }
  if (pathname === "/app/first-steps")
    return { label: "Mes premiers pas", href: "/app/first-steps" };
  if (pathname.startsWith("/app/lives")) {
    const live = lives[0];
    return { label: `Lives · ${live?.title ?? ""}`, href: "/app/lives" };
  }
  if (pathname.startsWith("/app/recipes"))
    return { label: "Recettes", href: "/app/recipes" };
  if (pathname.startsWith("/app/tutorials"))
    return { label: "Vidéos TM7", href: "/app/tutorials" };
  if (pathname.startsWith("/app/calendar"))
    return { label: "Calendrier", href: "/app/calendar" };
  if (pathname.startsWith("/app/history"))
    return { label: "Historique", href: "/app/history" };
  if (pathname.startsWith("/app/notes"))
    return { label: "Mes notes", href: "/app/notes" };
  return { label: "Accueil", href: "/app" };
}

export function NotesFAB() {
  const location = useLocation();
  const ctx = getContext(location.pathname);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const { add } = useNotes();

  useEffect(() => {
    if (!open) {
      setText("");
      setSaved(false);
    }
  }, [open]);

  // Hide on notes list itself
  const hidden = location.pathname === "/app/notes";

  return (
    <>
      {!hidden && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Prendre une note"
          className="fixed z-40 bottom-24 right-4 md:right-[calc(50%-12rem)] w-13 h-13 rounded-full bg-gradient-luxe text-primary-foreground shadow-rose flex items-center justify-center hover:scale-105 transition"
          style={{ width: 52, height: 52 }}
        >
          <StickyNote className="w-5 h-5" />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md bg-background rounded-t-3xl md:rounded-3xl p-5 shadow-rose animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
                  Nouvelle note
                </div>
                <h3 className="font-display text-xl">Vos pensées du moment</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] bg-secondary text-foreground/80 rounded-xl px-3 py-2 mb-3">
              Contexte : <span className="font-medium">{ctx.label}</span>
            </div>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Écrivez votre note ici…"
              className="w-full h-40 bg-card border border-border rounded-2xl p-4 text-sm resize-none focus:outline-none focus:border-primary"
            />
            <div className="flex gap-2 mt-3">
              <Link
                to="/app/notes"
                className="flex-1 text-center bg-card border border-border rounded-2xl py-3 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Voir mes notes
              </Link>
              <button
                disabled={!text.trim()}
                onClick={() => {
                  add({
                    text: text.trim(),
                    contextLabel: ctx.label,
                    contextHref: ctx.href,
                  });
                  setSaved(true);
                  setTimeout(() => setOpen(false), 700);
                }}
                className="flex-1 bg-gradient-luxe text-primary-foreground rounded-2xl py-3 text-sm font-semibold shadow-rose disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saved ? <Check className="w-4 h-4" /> : null}
                {saved ? "Enregistrée" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
