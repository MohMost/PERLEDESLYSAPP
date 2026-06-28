import { createFileRoute, Link } from "@tanstack/react-router";
import { Link as RLink } from "@tanstack/react-router";
import {
  Search,
  Bell,
  ChevronRight,
  Play,
  Clock,
  Flame,
  BookOpen,
  Radio,
  Sparkles,
  ExternalLink,
  Compass,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { MiniCalendar } from "@/components/MiniCalendar";
import { recipes, videos, articles, lives, user, founderInfo } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Accueil — PERLEDESLYS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const continueWatching = videos.filter((v) => v.progress).slice(0, 3);
  const newRecipes = recipes.filter((r) => r.isNew);
  const popularRecipes = recipes.slice(0, 6);
  const nextLive = lives.find((l) => l.status === "À venir");
  const featured = recipes[0];

  return (
    <MobileShell>
      {/* Header */}
      <header className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
          />
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Marhba
            </div>
            <div className="font-display text-lg font-medium leading-tight">
              {user.firstName}
            </div>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-primary" />
        </button>
      </header>

      {/* Search */}
      <div className="px-5 mt-4">
        <Link
          to="/app/search"
          className="relative block"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <div className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm text-muted-foreground">
            Rechercher une recette, un tutoriel TM7…
          </div>
        </Link>
      </div>

      {/* Live banner */}
      {nextLive && (
        <Link
          to="/app/lives"
          className="mx-5 mt-5 block relative rounded-3xl overflow-hidden shadow-rose"
        >
          <img
            src={nextLive.image}
            alt={nextLive.title}
            className="w-full h-32 object-cover"
            loading="lazy"
            width={800}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-rose-overlay" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between text-primary-foreground">
            <div className="flex items-center gap-1.5 self-start bg-background/95 text-foreground px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Prochain live
              </span>
            </div>
            <div>
              <div className="text-[11px] opacity-90 uppercase tracking-wider">
                {nextLive.date} · {nextLive.time}
              </div>
              <div className="font-display text-base mt-0.5 leading-tight">{nextLive.title}</div>
            </div>
          </div>
        </Link>
      )}

      {/* Mini calendrier de la semaine */}
      <MiniCalendar />

      {/* Mes premiers pas — catégorie phare */}
      <Section title="Mes premiers pas">
        <div className="px-5">
          <Link
            to="/app/first-steps"
            className="block relative rounded-3xl overflow-hidden shadow-rose"
          >
            <div className="bg-gradient-luxe text-primary-foreground p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-background/20 backdrop-blur flex items-center justify-center shrink-0">
                <Compass className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">
                  Pour bien démarrer
                </div>
                <div className="font-display text-xl leading-tight mt-0.5">
                  Mes premiers pas avec le TM7
                </div>
                <div className="text-[11px] opacity-90 mt-1 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" fill="currentColor" /> Vidéo 35 min
                  </span>
                  <span>·</span>
                  <span>Mot de Lys inclus</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 opacity-80" />
            </div>
          </Link>
        </div>
      </Section>

      {/* Featured recipe */}
      <Section title="Recette signature" href="/app/recipes">

        <div className="px-5">
          <RLink
            to="/app/recipes/$recipeId"
            params={{ recipeId: featured.id }}
            className="relative block rounded-3xl overflow-hidden shadow-rose aspect-[16/10]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-overlay" />
            {featured.isNew && (
              <div className="absolute top-3 left-3 bg-gradient-gold text-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                ✨ Nouveau
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">
                {featured.category}
              </div>
              <h3 className="font-display text-2xl mt-0.5 leading-tight">{featured.title}</h3>
              <div className="flex items-center gap-3 mt-2 text-[11px] opacity-95">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.time}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3" /> {featured.difficulty}
                </span>
                <span className="flex items-center gap-1 ml-auto bg-background/95 text-foreground px-2 py-0.5 rounded-full">
                  <ExternalLink className="w-3 h-3" /> Cookidoo
                </span>
              </div>
            </div>
          </RLink>
        </div>
      </Section>

      {/* Continue watching */}
      {continueWatching.length > 0 && (
        <Section title="Reprendre la formation" href="/app/tutorials">
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
            {continueWatching.map((v) => (
              <RLink
                key={v.id}
                to="/app/videos/$videoId"
                params={{ videoId: v.id }}
                className="shrink-0 w-64 group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-card">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={400}
                    height={225}
                  />
                  <div className="absolute inset-0 bg-gradient-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow-rose">
                      <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" />
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
                  <div className="text-sm font-medium leading-snug line-clamp-2 mt-0.5">
                    {v.title}
                  </div>
                </div>
              </RLink>
            ))}
          </div>
        </Section>
      )}

      {/* New recipes */}
      {newRecipes.length > 0 && (
        <Section title="Nouveautés de la semaine" href="/app/recipes">
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
            {newRecipes.map((r) => (
              <RLink
                key={r.id}
                to="/app/recipes/$recipeId"
                params={{ recipeId: r.id }}
                className="shrink-0 w-44"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={300}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-overlay" />
                  <div className="absolute top-2 left-2 bg-gradient-gold text-foreground text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full">
                    Nouveau
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-primary-foreground">
                    <div className="text-[9px] uppercase tracking-wider opacity-80">
                      {r.category}
                    </div>
                    <div className="text-xs font-medium mt-0.5 line-clamp-2 leading-tight">
                      {r.title}
                    </div>
                  </div>
                </div>
              </RLink>
            ))}
          </div>
        </Section>
      )}

      {/* Quick access tiles */}
      <Section title="Votre univers TM7">
        <div className="grid grid-cols-2 gap-3 px-5">
          <Link
            to="/app/tutorials"
            className="bg-gradient-luxe text-primary-foreground rounded-2xl p-4 aspect-square flex flex-col justify-between shadow-rose"
          >
            <Play className="w-6 h-6" />
            <div>
              <div className="font-display text-lg leading-tight">Tutoriels</div>
              <div className="text-[10px] opacity-90 mt-0.5">{videos.length} vidéos TM7</div>
            </div>
          </Link>
          <Link
            to="/app/tips"
            className="bg-card border border-border rounded-2xl p-4 aspect-square flex flex-col justify-between shadow-card"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <div className="font-display text-lg leading-tight">Astuces</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Conseils & batch cooking
              </div>
            </div>
          </Link>
        </div>
      </Section>

      {/* Popular recipes */}
      <Section title="Recettes populaires" href="/app/recipes">
        <div className="grid grid-cols-2 gap-3 px-5">
          {popularRecipes.map((r) => (
            <RLink
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
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium leading-snug line-clamp-2">{r.title}</div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {r.time}
                  </span>
                  <span>·</span>
                  <span>{r.difficulty}</span>
                </div>
              </div>
            </RLink>
          ))}
        </div>
      </Section>

      {/* Founder card */}
      <Section title="Votre conseillère">
        <div className="mx-5 bg-gradient-luxe text-primary-foreground rounded-3xl p-5 shadow-rose flex items-center gap-4">
          <img
            src={founderInfo.avatar}
            alt={founderInfo.name}
            className="w-16 h-16 rounded-full ring-2 ring-background/40 object-cover"
            loading="lazy"
            width={64}
            height={64}
          />
          <div className="flex-1 min-w-0">
            <div className="font-italiana text-xl tracking-wide">{founderInfo.fullName}</div>
            <p className="text-[11px] opacity-90 mt-1 leading-snug">{founderInfo.bio}</p>
          </div>
        </div>
      </Section>

      {/* Articles */}
      <Section title="Astuces & conseils" href="/app/tips">
        <div className="space-y-3 px-5">
          {articles.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="flex gap-3 bg-card rounded-2xl p-3 border border-border shadow-card"
            >
              <img
                src={a.image}
                alt={a.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
                loading="lazy"
                width={80}
                height={80}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                  {a.category}
                </div>
                <div className="text-sm font-medium mt-0.5 leading-snug line-clamp-2">
                  {a.title}
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                  {a.readTime} de lecture
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-6" />
    </MobileShell>
  );
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="font-display text-xl font-medium tracking-tight">{title}</h2>
        {href && (
          <Link to={href} className="text-xs text-primary font-medium flex items-center gap-0.5">
            Tout voir <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
