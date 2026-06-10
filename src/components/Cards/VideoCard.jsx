import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoCard() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 0.15; // Set volume to 15% to avoid loud audio irritation
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="glass rounded-3xl h-full w-full overflow-hidden relative group transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Autoplay Looping Video */}
      <video
        ref={videoRef}
        src="/f1car.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback video if the f1car.mp4 fails to load
          e.target.src = 'https://assets.mixkit.co/videos/preview/mixkit-car-chase-in-a-futuristic-city-43026-large.mp4';
        }}
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />

      {/* Card Header Label */}
      <div className="absolute top-4 left-6 z-20">
        <span className="font-syne text-xs uppercase tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          Vibes
        </span>
      </div>

      {/* Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-6 z-20 p-3 bg-black/40 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 shadow-md hover:scale-105"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

    </div>
  );
}
