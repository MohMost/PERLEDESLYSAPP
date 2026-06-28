import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Radio, Calendar, Clock, PlayCircle, Bell } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { lives } from "@/lib/mock-data";

export const Route = createFileRoute("/app/lives/")({
  head: () => ({ meta: [{ title: "Lives privés — PERLEDESLYS" }] }),
  component: LivesPage,
});

function LivesPage() {
  const [tab, setTab] = useState<"upcoming" | "replays">("upcoming");
  const upcoming = lives.filter((l) => l.status === "À venir");
  const replays = lives.filter((l) => l.status === "Replay");
  const list = tab === "upcoming" ? upcoming : replays;

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Lives privés</h1>
          <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
            Rendez-vous exclusifs avec Lys
          </div>
        </div>
      </header>

      {/* Next live featured */}
      {upcoming[0] && (
        <div className="mx-5 mt-5 relative rounded-3xl overflow-hidden shadow-rose">
          <img
            src={upcoming[0].image}
            alt={upcoming[0].title}
            className="w-full h-56 object-cover"
            loading="lazy"
            width={800}
            height={448}
          />
          <div className="absolute inset-0 bg-gradient-rose-overlay" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-primary-foreground">
            <div className="flex items-center gap-1.5 self-start bg-background/95 text-foreground px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Prochain live
              </span>
            </div>
            <div>
              <div className="font-display text-2xl leading-tight">{upcoming[0].title}</div>
              <p className="text-xs opacity-90 mt-1.5">{upcoming[0].description}</p>
              <div className="flex items-center gap-3 mt-3 text-[11px] opacity-95">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {upcoming[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {upcoming[0].time}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-background text-foreground rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" />
                  Rejoindre le live
                </button>
                <button className="bg-background/20 backdrop-blur text-primary-foreground rounded-full px-4 py-2 text-xs font-medium flex items-center gap-1.5 border border-background/30">
                  <Bell className="w-4 h-4" />
                  Me rappeler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 mx-5 grid grid-cols-2 gap-2 bg-secondary/60 p-1 rounded-2xl">
        <button
          onClick={() => setTab("upcoming")}
          className={`py-2.5 rounded-xl text-xs font-medium transition ${
            tab === "upcoming" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
          }`}
        >
          À venir ({upcoming.length})
        </button>
        <button
          onClick={() => setTab("replays")}
          className={`py-2.5 rounded-xl text-xs font-medium transition ${
            tab === "replays" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
          }`}
        >
          Replays ({replays.length})
        </button>
      </div>

      <div className="space-y-3 px-5 mt-5">
        {list.map((l) => (
          <div
            key={l.id}
            className="flex gap-3 bg-card rounded-2xl p-3 border border-border shadow-card"
          >
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <img
                src={l.image}
                alt={l.title}
                className="w-full h-full object-cover"
                loading="lazy"
                width={96}
                height={96}
              />
              <div className="absolute inset-0 bg-gradient-overlay" />
              {l.status === "Replay" && (
                <PlayCircle
                  className="absolute inset-0 m-auto w-7 h-7 text-primary-foreground"
                  fill="currentColor"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                    l.status === "Replay"
                      ? "bg-secondary text-foreground"
                      : "bg-gradient-luxe text-primary-foreground"
                  }`}
                >
                  {l.status}
                </span>
                <span className="text-[10px] text-muted-foreground">{l.platform}</span>
              </div>
              <div className="text-sm font-medium mt-1.5 leading-snug line-clamp-2">
                {l.title}
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                <Calendar className="w-3 h-3" /> {l.date}
                <span>·</span>
                <Clock className="w-3 h-3" /> {l.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
