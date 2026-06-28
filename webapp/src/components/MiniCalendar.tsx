import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, Radio, Sparkles, Bell, Palette } from "lucide-react";
import { events, type AppEvent } from "@/lib/mock-data";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function startOfWeek(d: Date) {
  const day = (d.getDay() + 6) % 7; // lundi=0
  const r = new Date(d);
  r.setDate(d.getDate() - day);
  r.setHours(0, 0, 0, 0);
  return r;
}

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

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

export function MiniCalendar() {
  const today = new Date();
  const start = startOfWeek(today);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const todayIso = iso(today);

  const eventsByDate = events.reduce<Record<string, AppEvent[]>>((acc, e) => {
    (acc[e.date] ||= []).push(e);
    return acc;
  }, {});

  const weekEvents = week
    .flatMap((d) => eventsByDate[iso(d)] ?? [])
    .slice(0, 3);

  return (
    <Link
      to="/app/calendar"
      className="mx-5 mt-3 block bg-card border border-border rounded-3xl p-4 shadow-card hover:shadow-rose transition"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-luxe text-primary-foreground flex items-center justify-center">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display text-lg leading-none">Ma semaine</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
              Lives & ateliers
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {week.map((d, i) => {
          const dayIso = iso(d);
          const isToday = dayIso === todayIso;
          const has = (eventsByDate[dayIso] ?? []).length > 0;
          return (
            <div
              key={dayIso}
              className={`flex flex-col items-center py-2 rounded-xl text-center transition ${
                isToday
                  ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                  : has
                    ? "bg-secondary"
                    : ""
              }`}
            >
              <div className="text-[9px] uppercase tracking-wider opacity-80">
                {DAYS[i]}
              </div>
              <div className="text-sm font-semibold mt-0.5">{d.getDate()}</div>
              <div
                className={`w-1 h-1 rounded-full mt-1 ${
                  has
                    ? isToday
                      ? "bg-background"
                      : "bg-primary"
                    : "bg-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>

      {weekEvents.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {weekEvents.map((e) => {
            const Icon = typeIcon(e.type);
            return (
              <div
                key={e.id}
                className="flex items-center gap-2 text-[11px] text-foreground/80"
              >
                <Icon className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate flex-1">{e.title}</span>
                <span className="text-muted-foreground shrink-0">
                  {e.time}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Link>
  );
}
