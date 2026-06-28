import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Flame,
  Users,
  PlayCircle,
  Heart,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { recipes } from "@/lib/mock-data";

export const Route = createFileRoute("/app/recipes/$recipeId")({
  component: RecipeDetail,
  notFoundComponent: () => (
    <MobileShell hideNav>
      <div className="p-8 text-center">Recette introuvable.</div>
    </MobileShell>
  ),
});

function RecipeDetail() {
  const { recipeId } = Route.useParams();
  const recipe = recipes.find((r) => r.id === recipeId);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [fav, setFav] = useState(false);
  if (!recipe) throw notFound();

  return (
    <MobileShell>
      {/* Hero image */}
      <div className="relative h-[55vh]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <Link
          to="/app/recipes"
          className="absolute top-6 left-5 w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="absolute top-6 right-5 flex gap-2">
          <button
            onClick={() => setFav(!fav)}
            className="w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 ${fav ? "text-primary" : ""}`}
              fill={fav ? "currentColor" : "none"}
            />
          </button>
          <button className="w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-6 left-5 right-5 text-primary-foreground">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-90">{recipe.category}</div>
          <h1 className="font-display text-3xl font-medium leading-tight mt-1.5">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Content card */}
      <div className="relative -mt-6 bg-background rounded-t-[2rem] px-5 pt-6 pb-8">
        <div className="grid grid-cols-3 gap-2 bg-card border border-border rounded-2xl p-3 shadow-card">
          <Stat icon={<Clock className="w-4 h-4" />} label="Temps" value={recipe.time} />
          <Stat icon={<Flame className="w-4 h-4" />} label="Difficulté" value={recipe.difficulty} />
          <Stat
            icon={<Users className="w-4 h-4" />}
            label="Portions"
            value={`${recipe.portions}`}
          />
        </div>

        <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{recipe.description}</p>

        {/* Cookidoo CTA */}
        <a
          href={recipe.cookidooUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 bg-gradient-luxe text-primary-foreground rounded-2xl p-4 flex items-center gap-3 shadow-rose"
        >
          <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center backdrop-blur">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">Ouvrir sur</div>
            <div className="font-medium text-sm">Cookidoo · Thermomix TM7</div>
          </div>
          <div className="text-xs font-medium bg-background/20 px-3 py-1.5 rounded-full backdrop-blur">
            Lancer
          </div>
        </a>

        {/* Ingredients */}
        <h2 className="font-display text-xl font-semibold mt-7 mb-3">Ingrédients</h2>
        <div className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <button
              key={i}
              onClick={() => setChecked({ ...checked, [i]: !checked[i] })}
              className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 text-left hover:bg-secondary transition"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                  checked[i] ? "bg-primary border-primary" : "border-border"
                }`}
              >
                {checked[i] && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span
                className={`flex-1 text-sm ${
                  checked[i] ? "line-through text-muted-foreground" : ""
                }`}
              >
                {ing.label}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{ing.qty}</span>
            </button>
          ))}
        </div>

        {/* Steps */}
        <h2 className="font-display text-xl font-semibold mt-7 mb-3">
          Étapes au Thermomix TM7
        </h2>
        <ol className="space-y-3">
          {recipe.steps.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 bg-card border border-border rounded-2xl p-4 shadow-card"
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-luxe text-primary-foreground flex items-center justify-center font-semibold text-xs">
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>

        <button className="w-full mt-7 bg-foreground text-background rounded-2xl py-4 flex items-center justify-center gap-2 font-medium shadow-card">
          <PlayCircle className="w-5 h-5" />
          Voir le tutoriel vidéo
        </button>
      </div>
    </MobileShell>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center text-primary">{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}
