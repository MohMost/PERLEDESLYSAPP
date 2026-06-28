import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Connexion — PERLEDESLYS" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "invite">("login");
  const [email, setEmail] = useState("yasmine.b@email.com");
  const [password, setPassword] = useState("••••••••");
  const [code, setCode] = useState("PDL-7821-LYS");

  return (
    <MobileShell hideNav>
      <div className="min-h-screen flex flex-col px-6 pt-6 pb-10 bg-gradient-cream">
        <Link to="/" className="self-start p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mt-4 flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-full bg-gradient-luxe flex items-center justify-center shadow-rose">
            <span className="font-italiana text-primary-foreground text-xl">P</span>
          </div>
          <div className="leading-tight">
            <div className="font-italiana text-base tracking-[0.2em]">PERLEDESLYS</div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-primary/80">
              Espace privé
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="font-display text-[2.2rem] leading-tight tracking-tight">
            Bon retour
            <br />
            <span className="italic font-italiana text-primary">parmi nous.</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Retrouvez vos recettes, lives et tutoriels TM7 exclusifs.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2 bg-secondary/60 p-1 rounded-2xl">
          <button
            onClick={() => setTab("login")}
            className={`py-2.5 rounded-xl text-xs font-medium transition ${
              tab === "login" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
            }`}
          >
            Identifiants
          </button>
          <button
            onClick={() => setTab("invite")}
            className={`py-2.5 rounded-xl text-xs font-medium transition ${
              tab === "invite" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
            }`}
          >
            Code d'invitation
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/app" });
          }}
        >
          {tab === "login" ? (
            <>
              <label className="block">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                  Email
                </span>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                  Mot de passe
                </span>
                <div className="mt-1.5 relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>
              </label>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary font-medium">
                  Mot de passe oublié ?
                </button>
              </div>
            </>
          ) : (
            <label className="block">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                Code d'invitation privée
              </span>
              <div className="mt-1.5 relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm tracking-widest font-medium focus:outline-none focus:border-primary transition"
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Le code unique que Lys vous a transmis personnellement.
              </p>
            </label>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-luxe text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-medium shadow-rose hover:opacity-95 transition"
          >
            Entrer dans mon espace
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-auto pt-8">
          Vous êtes cliente Thermomix et n'avez pas encore d'accès ?
          <br />
          <button className="text-primary font-medium mt-1">
            Demander une invitation à Lys
          </button>
        </p>
      </div>
    </MobileShell>
  );
}
