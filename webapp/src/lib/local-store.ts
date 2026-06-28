import { useEffect, useState, useCallback } from "react";

const isBrowser = typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("pdl-store", { detail: { key } }));
  } catch {
    /* ignore */
  }
}

function useStore<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => setValue(read(key, fallback)), [key]);
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === key) setValue(read(key, fallback));
    };
    window.addEventListener("pdl-store", onChange);
    window.addEventListener("storage", () => setValue(read(key, fallback)));
    return () => window.removeEventListener("pdl-store", onChange);
  }, [key]);
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        write(key, v);
        return v;
      });
    },
    [key],
  );
  return [value, update] as const;
}

/* ---------- Notes ---------- */
export type Note = {
  id: string;
  text: string;
  createdAt: number;
  contextLabel: string; // ex: "Vidéo : Mes premiers pas"
  contextHref: string; // ex: "/app/videos/premiers-pas-tm7"
};

export function useNotes() {
  const [notes, setNotes] = useStore<Note[]>("pdl.notes", []);
  const add = (n: Omit<Note, "id" | "createdAt">) =>
    setNotes((p) => [
      { ...n, id: crypto.randomUUID(), createdAt: Date.now() },
      ...p,
    ]);
  const remove = (id: string) => setNotes((p) => p.filter((n) => n.id !== id));
  return { notes, add, remove };
}

/* ---------- Historique de visionnage ---------- */
export type HistoryEntry = {
  videoId: string;
  title: string;
  image: string;
  category: string;
  duration: string; // affichage
  progress: number; // 0-100
  positionSec: number; // secondes
  totalSec: number;
  updatedAt: number;
};

export function useHistory() {
  const [history, setHistory] = useStore<HistoryEntry[]>("pdl.history", []);
  const upsert = (e: HistoryEntry) =>
    setHistory((p) => {
      const filtered = p.filter((x) => x.videoId !== e.videoId);
      return [e, ...filtered].slice(0, 50);
    });
  const get = (videoId: string) =>
    history.find((h) => h.videoId === videoId);
  const clear = () => setHistory([]);
  const remove = (videoId: string) =>
    setHistory((p) => p.filter((h) => h.videoId !== videoId));
  return { history, upsert, get, clear, remove };
}

/* ---------- Settings ---------- */
export type UserSettings = {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  notifications: boolean;
  darkTheme: boolean;
  newsletter: boolean;
};

export function useSettings(initial: UserSettings) {
  const [settings, setSettings] = useStore<UserSettings>(
    "pdl.settings",
    initial,
  );
  return [settings, setSettings] as const;
}

export function formatSeconds(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
