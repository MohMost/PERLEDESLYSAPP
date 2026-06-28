import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowLeft, BookOpen, PlayCircle, FileText, HelpCircle, Clock, Sparkles } from "lucide-react";
import { z } from "zod";
import { MobileShell } from "@/components/MobileShell";
import { recipes, videos, articles, faqItems } from "@/lib/mock-data";

const SearchParams = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/app/search/")({
  head: () => ({ meta: [{ title: "Recherche — PERLEDESLYS" }] }),
  validateSearch: SearchParams,
  component: SearchPage,
});

type Tab = "all" | "recipes" | "videos" | "articles" | "faq";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function SearchPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [tab, setTab] = useState<Tab>("all");

  const results = useMemo(() => {
    const needle = norm(q.trim());
    if (!needle)
      return { recipes: [], videos: [], articles: [], faq: [] as typeof faqItems };
    return {
      recipes: recipes.filter((r) =>
        [r.title, r.category, r.description, ...r.ingredients.map((i) => i.label)]
          .map(norm)
          .some((t) => t.includes(needle)),
      ),
      videos: videos.filter((v) =>
        [v.title, v.category, v.description].map(norm).some((t) => t.includes(needle)),
      ),
      articles: articles.filter((a) =>
        [a.title, a.category, a.excerpt].map(norm).some((t) => t.includes(needle)),
      ),
      faq: faqItems.filter((f) => [f.q, f.a].map(norm).some((t) => t.includes(needle))),
    };
  }, [q]);

  const total =
    results.recipes.length +
    results.videos.length +
    results.articles.length +
    results.faq.length;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "Tout", count: total },
    { id: "recipes", label: "Recettes", count: results.recipes.length },
    { id: "videos", label: "Vidéos", count: results.videos.length },
    { id: "articles", label: "Articles", count: results.articles.length },
    { id: "faq", label: "FAQ", count: results.faq.length },
  ];

  const showRecipes = tab === "all" || tab === "recipes";
  const showVideos = tab === "all" || tab === "videos";
  const showArticles = tab === "all" || tab === "articles";
  const showFaq = tab === "all" || tab === "faq";

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link
          to="/app"
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Recherche
          </div>
          <h1 className="font-display text-2xl leading-tight">Trouver dans l'app</h1>
        </div>
      </header>

      <div className="px-5 mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Recettes, vidéos, FAQ…"
            className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {q.trim() && (
        <div className="px-5 mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition ${
                tab === t.id
                  ? "bg-gradient-luxe text-primary-foreground border-transparent shadow-rose"
                  : "bg-card border-border text-foreground/80"
              }`}
            >
              {t.label}
              <span className="ml-1.5 opacity-70">{t.count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="px-5 mt-5 space-y-5">
        {!q.trim() && (
          <div className="bg-card border border-border rounded-3xl p-5 text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto" />
            <div className="font-display text-lg mt-2">Que cherches-tu ?</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recettes, ingrédients, tutoriels TM7, articles, FAQ…
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {["poulet", "couscous", "ramadan", "nettoyage", "varoma"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="text-[11px] bg-secondary px-2.5 py-1 rounded-full"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {q.trim() && total === 0 && (
          <div className="bg-card border border-border rounded-3xl p-6 text-center">
            <div className="font-display text-lg">Aucun résultat</div>
            <p className="text-xs text-muted-foreground mt-1">
              Demande à l'assistante IA de te proposer une recette compatible TM7 ✨
            </p>
          </div>
        )}

        {showRecipes && results.recipes.length > 0 && (
          <ResultSection title="Recettes" icon={<BookOpen className="w-4 h-4" />}>
            <div className="space-y-2.5">
              {results.recipes.map((r) => (
                <Link
                  key={r.id}
                  to="/app/recipes/$recipeId"
                  params={{ recipeId: r.id }}
                  className="flex gap-3 bg-card rounded-2xl p-2.5 border border-border"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                      {r.category}
                    </div>
                    <div className="text-sm font-medium leading-snug line-clamp-2 mt-0.5">
                      {r.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {r.time} · {r.difficulty}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ResultSection>
        )}

        {showVideos && results.videos.length > 0 && (
          <ResultSection title="Vidéos & tutoriels" icon={<PlayCircle className="w-4 h-4" />}>
            <div className="space-y-2.5">
              {results.videos.map((v) => (
                <Link
                  key={v.id}
                  to="/app/videos/$videoId"
                  params={{ videoId: v.id }}
                  className="flex gap-3 bg-card rounded-2xl p-2.5 border border-border"
                >
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                      {v.category}
                    </div>
                    <div className="text-sm font-medium leading-snug line-clamp-2 mt-0.5">
                      {v.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{v.duration}</div>
                  </div>
                </Link>
              ))}
            </div>
          </ResultSection>
        )}

        {showArticles && results.articles.length > 0 && (
          <ResultSection title="Articles & astuces" icon={<FileText className="w-4 h-4" />}>
            <div className="space-y-2.5">
              {results.articles.map((a) => (
                <div
                  key={a.id}
                  className="flex gap-3 bg-card rounded-2xl p-2.5 border border-border"
                >
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                      {a.category}
                    </div>
                    <div className="text-sm font-medium leading-snug line-clamp-2 mt-0.5">
                      {a.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {a.readTime} de lecture
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ResultSection>
        )}

        {showFaq && results.faq.length > 0 && (
          <ResultSection title="FAQ" icon={<HelpCircle className="w-4 h-4" />}>
            <div className="space-y-2.5">
              {results.faq.map((f, i) => (
                <Link
                  key={i}
                  to="/app/faq"
                  className="block bg-card rounded-2xl p-3 border border-border"
                >
                  <div className="text-sm font-medium">{f.q}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{f.a}</div>
                </Link>
              ))}
            </div>
          </ResultSection>
        )}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}

function ResultSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-primary">{icon}</span>
        <h2 className="font-display text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
