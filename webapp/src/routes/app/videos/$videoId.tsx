import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Heart,
  Share2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { videos, FIRST_STEPS_VIDEO_ID } from "@/lib/mock-data";
import { useHistory, formatSeconds } from "@/lib/local-store";

export const Route = createFileRoute("/app/videos/$videoId")({
  component: VideoDetail,
  notFoundComponent: () => (
    <MobileShell hideNav>
      <div className="p-8 text-center">Vidéo introuvable.</div>
    </MobileShell>
  ),
});

function parseDuration(s: string): number {
  const m = s.match(/(\d+)\s*min/);
  return m ? parseInt(m[1], 10) * 60 : 600;
}

function VideoDetail() {
  const { videoId } = Route.useParams();
  const video = videos.find((v) => v.id === videoId);
  if (!video) throw notFound();
  const similar = videos.filter((v) => v.id !== video.id).slice(0, 4);
  const isFirstSteps = video.id === FIRST_STEPS_VIDEO_ID;

  const { get, upsert } = useHistory();
  const stored = get(video.id);
  const totalSec = parseDuration(video.duration);
  const initialSec = stored?.positionSec ?? 0;
  const [position, setPosition] = useState(initialSec);
  const [playing, setPlaying] = useState(false);
  const tick = useRef<number | null>(null);

  useEffect(() => {
    setPosition(stored?.positionSec ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.id]);

  // Simulated playback for mocked player (non Vimeo)
  useEffect(() => {
    if (!playing || isFirstSteps) return;
    tick.current = window.setInterval(() => {
      setPosition((p) => {
        const next = Math.min(p + 1, totalSec);
        if (next >= totalSec) setPlaying(false);
        return next;
      });
    }, 1000);
    return () => {
      if (tick.current) window.clearInterval(tick.current);
    };
  }, [playing, totalSec, isFirstSteps]);

  // Persist progress
  useEffect(() => {
    if (position === 0 && !stored) return;
    upsert({
      videoId: video.id,
      title: video.title,
      image: video.image,
      category: video.category,
      duration: video.duration,
      positionSec: position,
      totalSec,
      progress: Math.round((position / totalSec) * 100),
      updatedAt: Date.now(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const progress = Math.round((position / totalSec) * 100);

  return (
    <MobileShell>
      {/* Player */}
      {isFirstSteps ? (
        <div className="relative aspect-video bg-foreground">
          <iframe
            src="https://player.vimeo.com/video/1095621493"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title={video.title}
          />
          <Link
            to="/app/tutorials"
            className="absolute top-5 left-5 w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="relative aspect-video bg-foreground">
          <img
            src={video.image}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            width={1024}
            height={576}
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
          <Link
            to="/app/tutorials"
            className="absolute top-5 left-5 w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="absolute top-5 right-5 bg-background/95 backdrop-blur text-[10px] font-medium px-3 py-1.5 rounded-full">
            Lecteur privé
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-16 h-16 rounded-full bg-gradient-luxe text-primary-foreground flex items-center justify-center shadow-rose hover:scale-105 transition"
            >
              {playing ? (
                <Pause className="w-7 h-7" fill="currentColor" />
              ) : (
                <Play className="w-7 h-7 ml-1" fill="currentColor" />
              )}
            </button>
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <input
              type="range"
              min={0}
              max={totalSec}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Position"
            />
            <div className="flex justify-between text-[10px] text-primary-foreground mt-1 font-medium">
              <span>{formatSeconds(position)}</span>
              <span>{video.duration}</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 pt-5 pb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
          {video.category}
        </div>
        <h1 className="font-display text-2xl font-medium mt-1 leading-tight">{video.title}</h1>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {video.duration}
          </span>
          <span>·</span>
          <span>HD 1080p</span>
        </div>

        {stored && stored.positionSec > 5 && !isFirstSteps && (
          <div className="mt-3 bg-secondary rounded-xl p-3 flex items-center gap-2 text-xs">
            <RotateCcw className="w-3.5 h-3.5 text-primary" />
            <span className="flex-1">
              Reprise à <strong>{formatSeconds(stored.positionSec)}</strong> ({progress}%)
            </span>
            <button
              onClick={() => setPosition(0)}
              className="text-primary font-medium"
            >
              Recommencer
            </button>
          </div>
        )}

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{video.description}</p>

        <div className="grid grid-cols-3 gap-2 mt-5">
          <ActionBtn icon={<Download className="w-4 h-4" />} label="Guide PDF" />
          <ActionBtn icon={<Heart className="w-4 h-4" />} label="Favoris" />
          <ActionBtn icon={<Share2 className="w-4 h-4" />} label="Partager" />
        </div>

        <h2 className="font-display text-lg font-semibold mt-8 mb-3">Vidéos similaires</h2>
        <div className="space-y-3">
          {similar.map((v) => (
            <Link
              key={v.id}
              to="/app/videos/$videoId"
              params={{ videoId: v.id }}
              className="flex gap-3 bg-card border border-border rounded-2xl p-2 shadow-card"
            >
              <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={112}
                  height={80}
                />
                <div className="absolute inset-0 bg-gradient-overlay" />
                <Play
                  className="absolute inset-0 m-auto w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <div className="text-[10px] uppercase tracking-wider text-primary font-medium">
                  {v.category}
                </div>
                <div className="text-sm font-medium leading-snug mt-0.5 line-clamp-2">
                  {v.title}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">{v.duration}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-1 hover:bg-secondary transition shadow-card">
      <span className="text-primary">{icon}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
