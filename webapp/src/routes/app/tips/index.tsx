import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { articles } from "@/lib/mock-data";

export const Route = createFileRoute("/app/tips/")({
  head: () => ({ meta: [{ title: "Astuces & conseils — PERLEDESLYS" }] }),
  component: TipsPage,
});

const cats = ["Tout", "Ramadan", "Organisation", "Entretien", "Astuces", "Techniques", "Inspiration"];

function TipsPage() {
  const [cat, setCat] = useState("Tout");
  const list = articles.filter((a) => cat === "Tout" || a.category === cat);

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Astuces & conseils</h1>
          <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
            Le carnet de Lys
          </div>
        </div>
      </header>

      {/* Hero quote */}
      <div className="mx-5 mt-4 bg-gradient-luxe text-primary-foreground rounded-3xl p-5 shadow-rose relative overflow-hidden">
        <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10" />
        <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">Le mot de Lys</div>
        <p className="font-italiana text-xl mt-2 leading-snug">
          « Cuisiner, c'est offrir de l'amour. Et le faire au TM7, c'est se libérer du temps pour
          les siens. »
        </p>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
              cat === c
                ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                : "bg-card border border-border text-foreground/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5 mt-5">
        {list.map((a) => (
          <div
            key={a.id}
            className="flex gap-3 bg-card rounded-2xl p-3 border border-border shadow-card"
          >
            <img
              src={a.image}
              alt={a.title}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
              loading="lazy"
              width={96}
              height={96}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                {a.category}
              </div>
              <div className="text-sm font-medium mt-0.5 leading-snug line-clamp-2">
                {a.title}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-snug">
                {a.excerpt}
              </p>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
                <BookOpen className="w-3 h-3" /> {a.readTime} de lecture
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
