import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { NotesFAB } from "./NotesFAB";
import { AIChat } from "./AIChat";

export function MobileShell({ children, hideNav }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-background relative pb-28">
        {children}
        {!hideNav && <AIChat />}
        {!hideNav && <NotesFAB />}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
