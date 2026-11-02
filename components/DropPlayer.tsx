// components/DropPlayer.tsx
"use client";

import { useState, useRef } from "react";

interface DropPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
}

export default function DropPlayer({ src, title, subtitle }: DropPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Text Info */}
        <div>
          <h3 className="text-white font-bold text-lg">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={handleEnded} 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}