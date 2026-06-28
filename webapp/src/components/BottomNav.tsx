import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, PlayCircle, Radio, User } from "lucide-react";

const items: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/app", label: "Accueil", icon: Home, exact: true },
  { to: "/app/recipes", label: "Recettes", icon: BookOpen },
  { to: "/app/tutorials", label: "Vidéos", icon: PlayCircle },
  { to: "/app/lives", label: "Lives", icon: Radio },
  { to: "/app/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-3 pb-3 pt-2">
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-rose flex items-center justify-around py-2 px-2">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all"
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  active
                    ? "bg-gradient-luxe text-primary-foreground shadow-rose"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              </div>
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
