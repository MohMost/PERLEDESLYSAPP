import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play, Trash2, History as HistoryIcon, Clock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useHistory, formatSeconds } from "@/lib/local-store";

export const Route = createFileRoute("/app/history/")({
  head: () => ({ meta: [{ title: "Historique — PERLEDESLYS" }] }),
  component: History,
});

function History() {
  const { history, clear, remove } = useHistory();

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app/profile" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-medium tracking-tight">
            Historique
          </h1>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Reprenez où vous vous étiez arrêtée
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={clear}
            className="text-[11px] text-destructive flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Vider
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="mx-5 mt-10 text-center bg-card border border-border rounded-3xl p-10 shadow-card">
          <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center text-primary mb-3">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <div className="font-display text-lg">Aucun visionnage encore</div>
          <p className="text-sm text-muted-foreground mt-1">
            Vos vidéos consultées s'afficheront ici, avec le temps de reprise.
          </p>
        </div>
      ) : (
        <div className="px-5 mt-4 space-y-3">
          {history.map((h) => (
            <div
              key={h.videoId}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
            >
              <Link
                to="/app/videos/$videoId"
                params={{ videoId: h.videoId }}
                className="flex gap-3 p-2"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={h.image}
                    alt={h.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay" />
                  <Play
                    className="absolute inset-0 m-auto w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${h.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="text-[10px] uppercase tracking-wider text-primary font-medium">
                    {h.category}
                  </div>
                  <div className="text-sm font-medium leading-snug mt-0.5 line-clamp-2">
                    {h.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Reprendre à {formatSeconds(h.positionSec)} / {h.duration}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => remove(h.videoId)}
                className="w-full text-[11px] text-muted-foreground border-t border-border py-2 flex items-center justify-center gap-1 hover:bg-secondary"
              >
                <Trash2 className="w-3 h-3" /> Retirer de l'historique
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="h-10" />
    </MobileShell>
  );
}
