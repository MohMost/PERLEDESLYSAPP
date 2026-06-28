import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { recipes } from "@/lib/mock-data";

export const Route = createFileRoute("/app/recipes/")({
  head: () => ({ meta: [{ title: "Recettes — PERLEDESLYS" }] }),
  component: RecipesList,
});

const categories = [
  "Tout",
  "Plats algériens",
  "Couscous",
  "Rechta",
  "Tajines",
  "Pâtisseries",
  "Baghrir",
  "Boissons",
  "Ramadan",
  "Recettes rapides",
];

function RecipesList() {
  const [active, setActive] = useState("Tout");
  const [q, setQ] = useState("");
  const filtered = recipes.filter(
    (r) =>
      (active === "Tout" || r.category === active) &&
      r.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Recettes</h1>
          <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
            La touche algérienne au TM7
          </div>
        </div>
      </header>

      <div className="px-5 mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une recette..."
            className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
              active === c
                ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                : "bg-card border border-border text-foreground/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 mt-5">
        {filtered.map((r) => (
          <Link
            key={r.id}
            to="/app/recipes/$recipeId"
            params={{ recipeId: r.id }}
            className="group"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-card">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
                loading="lazy"
                width={300}
                height={300}
              />
              <div className="absolute top-2 left-2 bg-background/95 text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full">
                {r.category}
              </div>
              {r.isNew && (
                <div className="absolute top-2 right-2 bg-gradient-gold text-foreground text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> New
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium leading-snug line-clamp-2">{r.title}</div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {r.time}
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  {r.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10 px-6">
          Aucune recette ne correspond à votre recherche.
        </div>
      )}
      <div className="h-6" />
    </MobileShell>
  );
}
