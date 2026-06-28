import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  LogOut,
  Mail,
  ShoppingBag,
  Heart,
  KeyRound,
  HelpCircle,
  Settings as SettingsIcon,
  History as HistoryIcon,
  StickyNote,
  Compass,
  CalendarDays,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/app/profile/")({
  head: () => ({ meta: [{ title: "Profil — PERLEDESLYS" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-2xl font-medium tracking-tight">Mon espace</h1>
      </header>

      {/* User card */}
      <div className="mx-5 mt-4 bg-gradient-luxe text-primary-foreground rounded-3xl p-5 shadow-rose flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full ring-4 ring-background/40 object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="font-italiana text-xl tracking-wide leading-tight">{user.name}</div>
          <div className="text-[11px] opacity-90 mt-0.5">
            Cliente PERLEDESLYS · depuis {user.memberSince}
          </div>
          <div className="text-[10px] opacity-80 mt-1 flex items-center gap-1">
            <KeyRound className="w-3 h-3" /> Code privé · {user.invitation}
          </div>
        </div>
      </div>

      {/* Quick access grid */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <Tile to="/app/favorites" icon={<Heart className="w-5 h-5" fill="currentColor" />} title="Favoris" subtitle="6 enregistrées" />
        <Tile to="/app/history" icon={<HistoryIcon className="w-5 h-5" />} title="Historique" subtitle="Reprendre" />
        <Tile to="/app/notes" icon={<StickyNote className="w-5 h-5" />} title="Mes notes" subtitle="Toutes mes idées" />
        <Tile to="/app/first-steps" icon={<Compass className="w-5 h-5" />} title="Premiers pas" subtitle="TM7 — 35 min" />
      </div>

      <SectionTitle>Mon compte</SectionTitle>
      <div className="mx-5 bg-card border border-border rounded-2xl divide-y divide-border shadow-card">
        <Row to="/app/settings" icon={<SettingsIcon className="w-4 h-4" />} label="Paramètres" value="Nom, email, préférences" />
        <Row to="/app/calendar" icon={<CalendarDays className="w-4 h-4" />} label="Calendrier" value="Lives & ateliers" />
        <Row to="/app/history" icon={<HistoryIcon className="w-4 h-4" />} label="Historique de visionnage" value="Reprendre où vous étiez" />
        <Row to="/app/notes" icon={<StickyNote className="w-4 h-4" />} label="Mes notes" value="Vos prises de notes" />
      </div>

      {/* Purchases */}
      <SectionTitle>Mon Thermomix</SectionTitle>
      <div className="mx-5 space-y-3">
        {user.products.map((p) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-2xl p-3 flex items-center gap-3 shadow-card"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-16 h-16 rounded-xl object-cover"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{p.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <ShoppingBag className="w-3 h-3" /> Acheté le {p.purchasedAt}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      <SectionTitle>Support</SectionTitle>
      <div className="mx-5 bg-card border border-border rounded-2xl divide-y divide-border shadow-card">
        <Row to="/app/faq" icon={<HelpCircle className="w-4 h-4" />} label="FAQ" value="Toutes les réponses" />
        <Row to="/app/settings" icon={<Mail className="w-4 h-4" />} label="Newsletter" value="Gérer mes préférences" />
      </div>

      <button
        onClick={() => navigate({ to: "/" })}
        className="mx-5 mt-7 w-[calc(100%-2.5rem)] bg-card border border-border rounded-2xl py-4 flex items-center justify-center gap-2 text-destructive font-medium hover:bg-secondary transition"
      >
        <LogOut className="w-4 h-4" /> Se déconnecter
      </button>

      <div className="text-center text-[10px] text-muted-foreground mt-4 font-italiana tracking-[0.3em]">
        PERLEDESLYS · v1.0
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}

function Tile({ to, icon, title, subtitle }: { to: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Link
      to={to}
      className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-col gap-2"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-luxe text-primary-foreground flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-medium text-sm leading-tight">{title}</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-5 mt-7 mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
      {children}
    </h2>
  );
}

function Row({
  to,
  icon,
  label,
  value,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </Link>
  );
}

