import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import AcademicsSection from './components/AcademicsSection';
import BentoSection from './components/BentoSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Integrate Lenis RAF with GSAP ticker
    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTriggers
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Scrollable sections */}
      <HeroSection />
      <AcademicsSection />
      <BentoSection />
    </main>
  );
}

export default App;
