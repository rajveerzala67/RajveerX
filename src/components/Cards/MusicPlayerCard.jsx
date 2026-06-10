import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayerCard() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  
  // Initialize audio ref
  useEffect(() => {
    audioRef.current = new Audio("/i ain't worried.mp3");
    audioRef.current.loop = true;

    // Track audio events
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play failed:', err);
      });
    }
  };

  // Handle clicking on progress bar
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    audio.currentTime = clickPercentage * audio.duration;
    setProgress(clickPercentage * 100);
  };

  // Generate 16 music visualizer bars
  const renderVisualizer = () => {
    const bars = [];
    for (let i = 0; i < 16; i++) {
      // Choose animation sequence based on bar index
      const animType = (i % 3) + 1; // 1, 2, or 3
      const animationClass = isPlaying ? `animate-music-bar-${animType}` : '';
      
      bars.push(
        <div
          key={i}
          className={`w-[3px] bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ${animationClass}`}
          style={{
            height: isPlaying ? undefined : '4px',
            animationDelay: isPlaying ? `${i * 0.05}s` : undefined
          }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="glass rounded-3xl h-full w-full p-6 flex items-center relative overflow-hidden group transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Blurred Album Art Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url('/songpic.webp')` }}
      />

      {/* Main Layout */}
      <div className="relative z-10 w-full flex items-center gap-6">
        
        {/* Album Art with Hover Play Button */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group/art shadow-lg">
          <img
            src="/songpic.webp"
            alt="Album Art"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=150&q=80';
            }}
          />
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover/art:opacity-100 transition-opacity duration-300"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Info + Visualizer + Controls */}
        <div className="flex-1 flex flex-col justify-between h-full min-w-0">
          
          {/* Metadata & Music Visualizer */}
          <div className="flex justify-between items-start mb-2 gap-4">
            <div className="min-w-0">
              <h3 className="font-syne text-sm font-bold text-white tracking-tight truncate">
                I Ain't Worried
              </h3>
              <p className="font-satoshi text-xs text-white/50 truncate">
                OneRepublic
              </p>
            </div>
            
            {/* Visualizer bars */}
            <div className="flex items-end gap-[3px] h-8 pt-2">
              {renderVisualizer()}
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div 
            onClick={handleProgressClick}
            className="w-full h-1 bg-white/10 rounded-full mb-3 cursor-pointer relative group/progress"
          >
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Playhead dot on hover */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex justify-between items-center text-white/40">
            <span className="font-satoshi text-[10px] tabular-nums">
              {currentTime}
            </span>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="p-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-full transition-all duration-300"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <span className="font-satoshi text-[10px] tabular-nums">
              {duration}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
