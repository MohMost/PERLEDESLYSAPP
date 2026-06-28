import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Lock, Heart } from "lucide-react";
import heroImg from "@/assets/perle-hero.jpg";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PERLEDESLYS — Espace privé Thermomix TM7" },
      {
        name: "description",
        content:
          "L'espace privé de Lys, votre conseillère Thermomix : recettes algériennes exclusives, tutoriels TM7, lives et astuces.",
      },
      { property: "og:title", content: "PERLEDESLYS" },
      {
        property: "og:description",
        content: "La touche algérienne du Thermomix TM7.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <MobileShell hideNav>
      <div className="relative min-h-screen flex flex-col bg-gradient-cream">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-7 pb-2 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-luxe flex items-center justify-center shadow-rose">
              <span className="font-italiana text-primary-foreground text-lg">P</span>
            </div>
            <div className="leading-tight">
              <div className="font-italiana text-base tracking-[0.2em]">PERLEDESLYS</div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-primary/80 font-medium">
                Espace privé
              </div>
            </div>
          </div>
          <Link
            to="/login"
            className="text-xs font-medium text-foreground/70 hover:text-primary tracking-wide"
          >
            Connexion
          </Link>
        </header>

        {/* Hero image */}
        <div className="relative px-5 mt-3">
          <div className="relative rounded-[2rem] overflow-hidden shadow-rose aspect-[4/5]">
            <img
              src={heroImg}
              alt="Univers PERLEDESLYS"
              className="w-full h-full object-cover"
              width={1024}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-rose-overlay" />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/95 backdrop-blur px-3 py-1.5 rounded-full">
              <Lock className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-medium">Accès cliente uniquement</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] opacity-90">
                <Sparkles className="w-3 h-3" /> Édition Thermomix TM7
              </div>
              <div className="font-italiana text-3xl mt-1.5 leading-tight">
                Bienvenue dans
                <br />
                votre écrin culinaire.
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-7 pb-6 flex-1 flex flex-col">
          <h1 className="font-display text-[2.6rem] leading-[1] tracking-tight">
            La touche
            <br />
            <span className="italic text-primary font-italiana">algérienne</span>
            <br />
            du Thermomix.
          </h1>
          <p className="mt-4 text-muted-foreground text-[14px] leading-relaxed">
            Recettes signatures, lives privés et tutoriels exclusifs autour de votre TM7,
            créés avec amour par Lys — votre conseillère Thermomix.
          </p>

          <div className="mt-auto pt-8 space-y-3">
            <Link
              to="/login"
              className="w-full bg-gradient-luxe text-primary-foreground rounded-2xl py-4 px-6 flex items-center justify-between shadow-rose hover:opacity-95 transition group"
            >
              <span className="font-medium tracking-wide">Accéder à mon espace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/login"
              className="w-full border border-primary/30 bg-card rounded-2xl py-4 px-6 flex items-center justify-center font-medium hover:bg-secondary transition text-foreground/80"
            >
              J'ai reçu une invitation
            </Link>
            <p className="text-center text-[11px] text-muted-foreground pt-2 flex items-center justify-center gap-1.5">
              <Heart className="w-3 h-3 text-primary" fill="currentColor" />
              Réservé aux clientes Thermomix de Lys
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
