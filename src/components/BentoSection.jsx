import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import WallpaperCard from './Cards/WallpaperCard';
import IntroCard from './Cards/IntroCard';
import ToolsCard from './Cards/ToolsCard';
import ProfileCard from './Cards/ProfileCard';
import VideoCard from './Cards/VideoCard';
import MusicPlayerCard from './Cards/MusicPlayerCard';

gsap.registerPlugin(ScrollTrigger);

export default function BentoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.bento-card');
    
    // Set initial state to prevent flash of unstyled content
    gsap.set(cards, { opacity: 0, y: 60 });

    // Staggered entry animation using ScrollTrigger.batch
    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 85%',
      once: true
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-black py-20 px-6 md:px-16 lg:px-24 flex flex-col justify-center overflow-hidden z-20"
      id="about"
    >
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-syne text-xs uppercase tracking-widest text-blue-500 mb-2 font-semibold">
            About Me
          </p>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            A Glimpse into my World
          </h2>
        </div>

        {/* Bento Grid (12-column layout on desktop, stacked on mobile) */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)] md:grid-rows-[repeat(4,210px)] w-full">
          
          {/* Card 1: Wallpaper Gallery (5 cols, 2 rows) */}
          <div className="bento-card col-span-12 md:col-span-5 md:row-span-2 h-[320px] md:h-auto">
            <WallpaperCard />
          </div>

          {/* Card 2: Intro Card (7 cols, 2 rows) */}
          <div className="bento-card col-span-12 md:col-span-7 md:row-span-2 h-[320px] md:h-auto">
            <IntroCard />
          </div>

          {/* Card 3: Tools Marquee (6 cols, 1 row) */}
          <div className="bento-card col-span-12 md:col-span-6 md:row-span-1 h-[180px] md:h-auto">
            <ToolsCard />
          </div>

          {/* Card 4: Profile Picture (2 cols, 2 rows) */}
          <div className="bento-card col-span-12 sm:col-span-5 md:col-span-2 md:row-span-2 h-[380px] md:h-auto">
            <ProfileCard />
          </div>

          {/* Card 5: Video Card (4 cols, 2 rows) */}
          <div className="bento-card col-span-12 sm:col-span-7 md:col-span-4 md:row-span-2 h-[380px] md:h-auto">
            <VideoCard />
          </div>

          {/* Card 6: Music Player (6 cols, 1 row) */}
          <div className="bento-card col-span-12 md:col-span-6 md:row-span-1 h-[180px] md:h-auto">
            <MusicPlayerCard />
          </div>

        </div>
      </div>
    </section>
  );
}
