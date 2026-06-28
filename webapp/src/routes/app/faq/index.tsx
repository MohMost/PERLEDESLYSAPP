import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, HelpCircle, Mail } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { faqItems } from "@/lib/mock-data";

export const Route = createFileRoute("/app/faq/")({
  head: () => ({ meta: [{ title: "FAQ — PERLEDESLYS" }] }),
  component: Faq,
});

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <Link to="/app/profile" className="p-2 -ml-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">
            Foire aux questions
          </h1>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Tout ce que vous voulez savoir
          </div>
        </div>
      </header>

      <div className="mx-5 mt-4 bg-gradient-luxe text-primary-foreground rounded-3xl p-4 flex items-center gap-3 shadow-rose">
        <HelpCircle className="w-8 h-8 shrink-0" />
        <div>
          <div className="font-italiana text-lg leading-tight">
            Une question reste sans réponse ?
          </div>
          <div className="text-[11px] opacity-90 mt-0.5">
            Écrivez-moi directement, je vous réponds dans la journée.
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-2">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
              >
                <span className="text-sm font-medium leading-snug pr-2">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-primary shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <a
        href="mailto:contact@perledelys.fr"
        className="mx-5 mt-6 flex items-center justify-center gap-2 bg-card border border-border rounded-2xl py-4 text-sm font-medium shadow-card"
      >
        <Mail className="w-4 h-4 text-primary" />
        contact@perledelys.fr
      </a>

      <div className="h-10" />
    </MobileShell>
  );
}
