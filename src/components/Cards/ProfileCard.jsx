import React from 'react';

export default function ProfileCard() {
  return (
    <div className="glass rounded-3xl h-full w-full overflow-hidden relative group transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Profile Picture */}
      <img
        src="/mine_pic.webp"
        alt="Rajveer Profile"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80';
        }}
      />

      {/* Vignette Overlay (Always visible) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Dark overlay to match style */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* Gradient Reveal Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15 pointer-events-none" />

      {/* Overlay label */}
      <div className="absolute bottom-4 left-6 z-20">
        <p className="font-syne text-xs uppercase tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 inline-block">
          Rajveer Zala
        </p>
      </div>

    </div>
  );
}
