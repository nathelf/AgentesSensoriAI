import { Play } from "lucide-react";

interface AudioMessageProps {
  duration: string;
  transcript: string;
}

export function AudioMessage({ duration, transcript }: AudioMessageProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl px-3 py-2.5">
        <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 hover:bg-primary/30 transition-colors">
          <Play className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" strokeWidth={0} />
        </button>
        <div className="flex items-center gap-[3px] flex-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-primary/50 waveform-bar"
              style={{
                height: `${4 + Math.sin(i * 0.7) * 8 + Math.random() * 6}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground flex-shrink-0">{duration}</span>
      </div>
      <p className="text-[10px] text-muted-foreground/70 italic">
        🔊 Áudio gerado automaticamente (Transcrição: "{transcript}")
      </p>
    </div>
  );
}
