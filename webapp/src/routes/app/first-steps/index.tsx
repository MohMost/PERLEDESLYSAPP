import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, MessageCircle, Sparkles, Clock, Lock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { welcomeMessage, FIRST_STEPS_VIDEO_ID, videos } from "@/lib/mock-data";

export const Route = createFileRoute("/app/first-steps/")({
  head: () => ({ meta: [{ title: "Mes premiers pas — PERLEDESLYS" }] }),
  component: FirstSteps,
});

function FirstSteps() {
  const video = videos.find((v) => v.id === FIRST_STEPS_VIDEO_ID)!;

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
            Catégorie exclusive
          </div>
          <h1 className="font-display text-2xl font-medium tracking-tight">
            Mes premiers pas
          </h1>
        </div>
      </header>

      {/* Vidéo intégrée */}
      <div className="mx-5 mt-4 rounded-3xl overflow-hidden shadow-rose bg-foreground">
        <div className="relative aspect-video">
          <iframe
            src="https://player.vimeo.com/video/1095621493"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title={video.title}
          />
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3" /> {video.duration}
          <span>·</span>
          <Lock className="w-3 h-3" /> Vidéo privée intégrée
        </div>
        <h2 className="font-display text-xl mt-2 leading-tight">
          {video.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {video.description}
        </p>
      </div>

      {/* Message de Lys */}
      <div className="mx-5 mt-6 rounded-3xl overflow-hidden">
        <div className="bg-gradient-luxe text-primary-foreground p-5">
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-90">
            Mot de Lys
          </div>
          <div className="font-italiana text-2xl mt-1">
            {welcomeMessage.subject}
          </div>
        </div>
        <div className="bg-card border border-border border-t-0 p-5 text-sm whitespace-pre-line leading-relaxed text-foreground/90">
          {welcomeMessage.body}
        </div>
      </div>

      {/* Étapes recommandées */}
      <section className="px-5 mt-7">
        <h3 className="font-display text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Vos prochaines étapes
        </h3>
        <ol className="space-y-2">
          {[
            "Regardez la vidéo en entier, idéalement TM7 à proximité.",
            "Lancez une première recette simple (ex : Baghrir ou Thé à la menthe).",
            "Notez vos questions au fur et à mesure avec le bouton note.",
            "Envoyez-moi votre retour écrit pour que je m'assure que tout va bien.",
          ].map((s, i) => (
            <li
              key={i}
              className="flex gap-3 bg-card border border-border rounded-2xl p-3 shadow-card"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-luxe text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                {i + 1}
              </div>
              <div className="text-sm leading-snug pt-0.5">{s}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Actions */}
      <div className="px-5 mt-6 grid grid-cols-2 gap-3">
        <button className="bg-card border border-border rounded-2xl py-4 flex flex-col items-center gap-1 shadow-card">
          <Heart className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium">Ajouter aux favoris</span>
        </button>
        <button className="bg-gradient-luxe text-primary-foreground rounded-2xl py-4 flex flex-col items-center gap-1 shadow-rose">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-semibold">Envoyer mon retour</span>
        </button>
      </div>

      <div className="h-10" />
    </MobileShell>
  );
}
