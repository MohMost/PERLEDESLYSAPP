import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Radio,
  Sparkles,
  Bell,
  Palette,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { events, type AppEvent } from "@/lib/mock-data";

export const Route = createFileRoute("/app/calendar/")({
  head: () => ({ meta: [{ title: "Calendrier — PERLEDESLYS" }] }),
  component: CalendarPage,
});

type View = "jour" | "semaine" | "mois" | "année";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const iso = (d: Date) => d.toISOString().slice(0, 10);
const typeColor = (t: AppEvent["type"]) =>
  t === "live"
    ? "bg-primary"
    : t === "atelier"
      ? "bg-accent"
      : t === "publication"
        ? "bg-rose-deep"
        : "bg-gold";

const typeIcon = (t: AppEvent["type"]) => {
  switch (t) {
    case "live":
      return Radio;
    case "atelier":
      return Palette;
    case "publication":
      return Sparkles;
    default:
      return Bell;
  }
};

function CalendarPage() {
  const [view, setView] = useState<View>("mois");
  const [cursor, setCursor] = useState(new Date());

  const eventsByDate = events.reduce<Record<string, AppEvent[]>>((acc, e) => {
    (acc[e.date] ||= []).push(e);
    return acc;
  }, {});

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-2xl font-medium tracking-tight">
          Calendrier
        </h1>
      </header>

      {/* Tabs vue */}
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar px-5">
        {(["jour", "semaine", "mois", "année"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium capitalize transition ${
              view === v
                ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                : "bg-card border border-border text-foreground/70"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="px-5 mt-4 flex items-center justify-between">
        <button
          onClick={() => {
            const d = new Date(cursor);
            if (view === "année") d.setFullYear(d.getFullYear() - 1);
            else if (view === "mois") d.setMonth(d.getMonth() - 1);
            else if (view === "semaine") d.setDate(d.getDate() - 7);
            else d.setDate(d.getDate() - 1);
            setCursor(d);
          }}
          className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-display text-lg">
          {view === "année"
            ? cursor.getFullYear()
            : view === "mois"
              ? `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`
              : view === "semaine"
                ? `Semaine du ${weekStart(cursor).getDate()} ${MONTHS[weekStart(cursor).getMonth()]}`
                : cursor.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
        </div>
        <button
          onClick={() => {
            const d = new Date(cursor);
            if (view === "année") d.setFullYear(d.getFullYear() + 1);
            else if (view === "mois") d.setMonth(d.getMonth() + 1);
            else if (view === "semaine") d.setDate(d.getDate() + 7);
            else d.setDate(d.getDate() + 1);
            setCursor(d);
          }}
          className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 mt-4">
        {view === "mois" && <MonthGrid cursor={cursor} eventsByDate={eventsByDate} onSelect={(d) => { setCursor(d); setView("jour"); }} />}
        {view === "semaine" && <WeekList cursor={cursor} eventsByDate={eventsByDate} />}
        {view === "jour" && <DayList date={cursor} eventsByDate={eventsByDate} />}
        {view === "année" && <YearGrid cursor={cursor} eventsByDate={eventsByDate} onSelect={(d) => { setCursor(d); setView("mois"); }} />}
      </div>

      {/* Légende */}
      <div className="px-5 mt-6 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
        <Legend color="bg-primary" label="Live" />
        <Legend color="bg-accent" label="Atelier" />
        <Legend color="bg-rose-deep" label="Publication" />
        <Legend color="bg-gold" label="Rappel" />
      </div>

      <div className="h-10" />
    </MobileShell>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function weekStart(d: Date) {
  const day = (d.getDay() + 6) % 7;
  const r = new Date(d);
  r.setDate(d.getDate() - day);
  r.setHours(0, 0, 0, 0);
  return r;
}

function MonthGrid({
  cursor,
  eventsByDate,
  onSelect,
}: {
  cursor: Date;
  eventsByDate: Record<string, AppEvent[]>;
  onSelect: (d: Date) => void;
}) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(
    cursor.getFullYear(),
    cursor.getMonth() + 1,
    0,
  ).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
  const todayIso = iso(new Date());

  return (
    <>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-[9px] uppercase tracking-wider text-muted-foreground py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const dayIso = iso(d);
          const dayEvents = eventsByDate[dayIso] ?? [];
          const isToday = dayIso === todayIso;
          return (
            <button
              key={i}
              onClick={() => onSelect(d)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-start py-1 px-0.5 transition ${
                isToday
                  ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                  : dayEvents.length
                    ? "bg-secondary"
                    : "bg-card border border-border"
              }`}
            >
              <span className="text-xs font-semibold">{d.getDate()}</span>
              <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                {dayEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className={`w-1 h-1 rounded-full ${typeColor(e.type)}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function WeekList({
  cursor,
  eventsByDate,
}: {
  cursor: Date;
  eventsByDate: Record<string, AppEvent[]>;
}) {
  const start = weekStart(cursor);
  return (
    <div className="space-y-2">
      {Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const list = eventsByDate[iso(d)] ?? [];
        return (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-3 shadow-card"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {DAYS[i]} {d.getDate()} {MONTHS[d.getMonth()].slice(0, 4)}.
            </div>
            {list.length === 0 ? (
              <div className="text-xs text-muted-foreground mt-1">
                Aucun évènement
              </div>
            ) : (
              <div className="mt-2 space-y-1.5">
                {list.map((e) => (
                  <EventRow key={e.id} e={e} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DayList({
  date,
  eventsByDate,
}: {
  date: Date;
  eventsByDate: Record<string, AppEvent[]>;
}) {
  const list = eventsByDate[iso(date)] ?? [];
  if (list.length === 0)
    return (
      <div className="text-center text-sm text-muted-foreground bg-card border border-border rounded-2xl p-8">
        Pas d'évènement ce jour.
      </div>
    );
  return (
    <div className="space-y-2">
      {list.map((e) => (
        <EventRow key={e.id} e={e} big />
      ))}
    </div>
  );
}

function YearGrid({
  cursor,
  eventsByDate,
  onSelect,
}: {
  cursor: Date;
  eventsByDate: Record<string, AppEvent[]>;
  onSelect: (d: Date) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {MONTHS.map((m, idx) => {
        const count = Object.entries(eventsByDate).filter(([k]) => {
          const d = new Date(k);
          return (
            d.getFullYear() === cursor.getFullYear() && d.getMonth() === idx
          );
        }).length;
        return (
          <button
            key={m}
            onClick={() => onSelect(new Date(cursor.getFullYear(), idx, 1))}
            className="bg-card border border-border rounded-2xl p-3 text-left shadow-card hover:shadow-rose transition"
          >
            <div className="font-display text-sm">{m}</div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {count} évènement{count !== 1 ? "s" : ""}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function EventRow({ e, big }: { e: AppEvent; big?: boolean }) {
  const Icon = typeIcon(e.type);
  return (
    <div
      className={`flex gap-2 items-start ${
        big ? "bg-card border border-border rounded-2xl p-4 shadow-card" : ""
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg ${typeColor(e.type)} flex items-center justify-center text-primary-foreground shrink-0`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium leading-tight">{e.title}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">
          {e.time}
          {e.description ? ` · ${e.description}` : ""}
        </div>
      </div>
    </div>
  );
}
