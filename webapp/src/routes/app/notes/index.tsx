import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, StickyNote, Trash2, ExternalLink } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useNotes } from "@/lib/local-store";

export const Route = createFileRoute("/app/notes/")({
  head: () => ({ meta: [{ title: "Mes notes — PERLEDESLYS" }] }),
  component: NotesPage,
});

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NotesPage() {
  const { notes, remove } = useNotes();

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app/profile" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">
            Mes notes
          </h1>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
            {notes.length} note{notes.length > 1 ? "s" : ""}
          </div>
        </div>
      </header>

      {notes.length === 0 ? (
        <div className="mx-5 mt-10 text-center bg-card border border-border rounded-3xl p-10 shadow-card">
          <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center text-primary mb-3">
            <StickyNote className="w-6 h-6" />
          </div>
          <div className="font-display text-lg">Vos notes apparaîtront ici</div>
          <p className="text-sm text-muted-foreground mt-1">
            Touchez le bouton flottant en bas à droite pour créer votre première
            note.
          </p>
        </div>
      ) : (
        <div className="px-5 mt-4 space-y-3">
          {notes.map((n) => (
            <div
              key={n.id}
              className="bg-card border border-border rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                <span className="text-primary font-medium">
                  {formatDate(n.createdAt)}
                </span>
                <button
                  onClick={() => remove(n.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap leading-relaxed">
                {n.text}
              </p>
              <a
                href={n.contextHref}
                className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary font-medium"
              >
                <ExternalLink className="w-3 h-3" /> {n.contextLabel}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="h-10" />
    </MobileShell>
  );
}
