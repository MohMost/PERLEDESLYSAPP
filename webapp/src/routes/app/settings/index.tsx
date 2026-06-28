import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Save, Bell, Moon, Mail } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { user } from "@/lib/mock-data";
import { useSettings } from "@/lib/local-store";

export const Route = createFileRoute("/app/settings/")({
  head: () => ({ meta: [{ title: "Paramètres — PERLEDESLYS" }] }),
  component: Settings,
});

function Settings() {
  const [settings, setSettings] = useSettings({
    name: user.name,
    firstName: user.firstName,
    email: user.email,
    phone: user.phone,
    notifications: true,
    darkTheme: false,
    newsletter: true,
  });
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app/profile" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-2xl font-medium tracking-tight">
          Paramètres
        </h1>
      </header>

      <SectionTitle>Informations personnelles</SectionTitle>
      <div className="mx-5 bg-card border border-border rounded-2xl p-4 space-y-3 shadow-card">
        <Field
          label="Prénom"
          value={draft.firstName}
          onChange={(v) => setDraft({ ...draft, firstName: v })}
        />
        <Field
          label="Nom complet"
          value={draft.name}
          onChange={(v) => setDraft({ ...draft, name: v })}
        />
        <Field
          label="Email"
          type="email"
          value={draft.email}
          onChange={(v) => setDraft({ ...draft, email: v })}
        />
        <Field
          label="Téléphone"
          value={draft.phone}
          onChange={(v) => setDraft({ ...draft, phone: v })}
        />
      </div>

      <SectionTitle>Préférences</SectionTitle>
      <div className="mx-5 bg-card border border-border rounded-2xl divide-y divide-border shadow-card">
        <Toggle
          icon={<Bell className="w-4 h-4" />}
          label="Notifications push"
          desc="Recevoir les annonces de lives et nouvelles recettes"
          checked={draft.notifications}
          onChange={(v) => setDraft({ ...draft, notifications: v })}
        />
        <Toggle
          icon={<Moon className="w-4 h-4" />}
          label="Thème sombre"
          checked={draft.darkTheme}
          onChange={(v) => setDraft({ ...draft, darkTheme: v })}
        />
        <Toggle
          icon={<Mail className="w-4 h-4" />}
          label="Newsletter hebdomadaire"
          checked={draft.newsletter}
          onChange={(v) => setDraft({ ...draft, newsletter: v })}
        />
      </div>

      <SectionTitle>Sécurité</SectionTitle>
      <div className="mx-5 bg-card border border-border rounded-2xl shadow-card">
        <button className="w-full text-left px-4 py-3.5 text-sm font-medium">
          Changer mon mot de passe
        </button>
      </div>

      <button
        onClick={save}
        className="mx-5 mt-7 w-[calc(100%-2.5rem)] bg-gradient-luxe text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold shadow-rose"
      >
        <Save className="w-4 h-4" />
        {saved ? "Enregistré ✓" : "Enregistrer les modifications"}
      </button>

      <div className="h-10" />
    </MobileShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-5 mt-7 mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
      {children}
    </h2>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function Toggle({
  icon,
  label,
  desc,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full p-0.5 transition ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-background transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
