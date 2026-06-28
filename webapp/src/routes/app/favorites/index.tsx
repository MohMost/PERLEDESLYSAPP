import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Clock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { recipes } from "@/lib/mock-data";

export const Route = createFileRoute("/app/favorites/")({
  head: () => ({ meta: [{ title: "Favoris — PERLEDESLYS" }] }),
  component: Favorites,
});

function Favorites() {
  const favs = recipes.slice(0, 6);
  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app/profile" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Mes favoris</h1>
          <div className="text-[11px] text-muted-foreground tracking-wider uppercase">
            {favs.length} recettes enregistrées
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 px-5 mt-5">
        {favs.map((r) => (
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
              <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/95 backdrop-blur flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              </button>
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium leading-snug line-clamp-2">{r.title}</div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <Clock className="w-2.5 h-2.5" />
                {r.time}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
