import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { videos } from "@/lib/mock-data";

export const Route = createFileRoute("/app/tutorials/")({
  head: () => ({ meta: [{ title: "Vidéos TM7 — PERLEDESLYS" }] }),
  component: TutorialsList,
});

const tabs = ["Tout", "Mes premiers pas", "Premier démarrage", "Tutoriel TM7", "Recette vidéo", "Astuces"];

function TutorialsList() {
  const [tab, setTab] = useState("Tout");
  const filtered = videos.filter((v) => tab === "Tout" || v.category === tab);

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Vidéos</h1>
          <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
            Formations exclusives Thermomix TM7
          </div>
        </div>
      </header>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
              tab === t
                ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                : "bg-card border border-border text-foreground/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4 px-5 mt-5">
        {filtered.map((v) => (
          <Link
            key={v.id}
            to="/app/videos/$videoId"
            params={{ videoId: v.id }}
            className="block"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-card">
              <img
                src={v.image}
                alt={v.title}
                className="w-full h-full object-cover"
                loading="lazy"
                width={600}
                height={338}
              />
              <div className="absolute inset-0 bg-gradient-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow-rose">
                  <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-background/95 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {v.duration}
              </div>
              {v.progress && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30">
                  <div className="h-full bg-primary" style={{ width: `${v.progress}%` }} />
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                {v.category}
              </div>
              <div className="text-sm font-medium leading-snug mt-0.5">{v.title}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {v.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
