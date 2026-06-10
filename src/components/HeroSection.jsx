import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, ChevronDown, Mouse, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const BATCH_SIZE = 30;
const padZero = (num) => String(num).padStart(4, '0');

// Simple lerp for smooth panel transitions
function panelFade(progress, inStart, inEnd, outStart, outEnd) {
  if (progress < inStart || progress > outEnd) return 0;
  if (progress >= inEnd && progress <= outStart) return 1;
  if (progress < inEnd) return (progress - inStart) / (inEnd - inStart);
  return 1 - (progress - outStart) / (outEnd - outStart);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [firstBatchLoaded, setFirstBatchLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const imagesRef = useRef([]);
  const frameObj = useRef({ index: 1 });

  // Refs for direct DOM manipulation (no React re-renders)
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const mindsetRef = useRef(null);
  const beyondRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Frame preloading
  useEffect(() => {
    let active = true;
    const folder = window.innerWidth < 768 ? 'frames-mobile' : 'frames';
    imagesRef.current = [];

    const preloadImage = (i) => new Promise((resolve) => {
      const img = new Image();
      img.src = `/${folder}/frame_${padZero(i)}.webp?v=1`;
      img.onload = () => { if (active) imagesRef.current[i] = img; resolve(true); };
      img.onerror = () => resolve(false);
    });

    (async () => {
      let loaded = 0;
      const first = [];
      for (let i = 1; i <= BATCH_SIZE; i++) {
        first.push(preloadImage(i).then(ok => { if (ok) { loaded++; setLoadingProgress(Math.round(loaded / BATCH_SIZE * 100)); } }));
      }
      await Promise.all(first);
      if (active) { setFirstBatchLoaded(true); drawFrame(1); }

      for (const b of [{ s: 31, e: 60 }, { s: 61, e: 90 }, { s: 91, e: 120 }]) {
        if (!active) break;
        await new Promise(r => setTimeout(r, 100));
        const p = [];
        for (let i = b.s; i <= b.e; i++) p.push(preloadImage(i));
        await Promise.all(p);
      }
    })();

    return () => { active = false; };
  }, [isMobile]);

  // Canvas drawing
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[index];
    if (!img) {
      for (let i = index - 1; i >= 1; i--) { if (imagesRef.current[i]) { img = imagesRef.current[i]; break; } }
      if (!img) for (let i = index + 1; i <= TOTAL_FRAMES; i++) { if (imagesRef.current[i]) { img = imagesRef.current[i]; break; } }
    }
    if (!img || !img.complete) return;

    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const ir = iw / ih, cr = cw / ch;
    let dw = cw, dh = ch, ox = 0, oy = 0;
    if (ir > cr) { dw = ch * ir; ox = (cw - dw) / 2; }
    else { dh = cw / ir; oy = (ch - dh) / 2; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  // Canvas resize
  useEffect(() => {
    const c = canvasRef.current;
    if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
    let lw = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lw) {
        lw = window.innerWidth;
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          drawFrame(Math.round(frameObj.current.index));
        }
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  // MAIN ANIMATION LOOP — runs on every frame via rAF
  // Reads the container's bounding rect to compute scroll progress
  // Directly manipulates DOM styles for panels + draws video frames
  useEffect(() => {
    if (!firstBatchLoaded) return;
    drawFrame(1);

    let running = true;

    const tick = () => {
      if (!running) return;

      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollable));

        // Video frame (1 to 120 across full scroll)
        const frame = Math.round(1 + progress * (TOTAL_FRAMES - 1));
        if (frame !== Math.round(frameObj.current.index)) {
          frameObj.current.index = frame;
          drawFrame(frame);
        }

        // Panel visibility — direct DOM style writes
        // Page 1 (0%–25%): Hero visible, fades out 18%→25%
        // Page 2 (25%–50%): About Me fades in 25%→32%, visible, fades out 43%→50%
        // Page 3 (50%–75%): My Mindset fades in 50%→57%, visible, fades out 68%→75%
        // Page 4 (75%–100%): Beyond Tech fades in 75%→82%, visible, fades out 93%→100%

        const heroOp = progress <= 0.18 ? 1 : progress >= 0.25 ? 0 : 1 - (progress - 0.18) / 0.07;
        const aboutOp = panelFade(progress, 0.25, 0.32, 0.43, 0.50);
        const mindsetOp = panelFade(progress, 0.50, 0.57, 0.68, 0.75);
        const beyondOp = panelFade(progress, 0.75, 0.82, 0.93, 1.0);

        if (heroRef.current) {
          heroRef.current.style.opacity = heroOp;
          heroRef.current.style.transform = `translateY(${(1 - heroOp) * -30}px)`;
          heroRef.current.style.pointerEvents = heroOp > 0.1 ? 'auto' : 'none';
        }
        if (aboutRef.current) {
          aboutRef.current.style.opacity = aboutOp;
          aboutRef.current.style.transform = `translateY(${(1 - aboutOp) * 40}px)`;
          aboutRef.current.style.pointerEvents = aboutOp > 0.1 ? 'auto' : 'none';
        }
        if (mindsetRef.current) {
          mindsetRef.current.style.opacity = mindsetOp;
          mindsetRef.current.style.transform = `translateY(${(1 - mindsetOp) * 40}px)`;
          mindsetRef.current.style.pointerEvents = mindsetOp > 0.1 ? 'auto' : 'none';
        }
        if (beyondRef.current) {
          beyondRef.current.style.opacity = beyondOp;
          beyondRef.current.style.transform = `translateY(${(1 - beyondOp) * 40}px)`;
          beyondRef.current.style.pointerEvents = beyondOp > 0.1 ? 'auto' : 'none';
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { running = false; };
  }, [firstBatchLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Sticky viewport — stays pinned for 4 pages of scroll */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10">

        {/* Loading poster */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-20 ${
            firstBatchLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${isMobile ? '/video-poster-mobile.webp' : '/video-poster.webp'})` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="font-syne text-xl text-white tracking-widest uppercase">
              Loading {loadingProgress}%
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative w-full h-full saturate-[1.25]">
          <canvas ref={canvasRef} className="block w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 z-10 pointer-events-none" />
        </div>

        {/* ═══ HERO PANEL ═══ */}
        <div ref={heroRef} className="absolute inset-0 z-30 flex flex-col justify-between p-4 min-[375px]:p-6 md:p-16 select-none">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col items-start gap-2">
              <div className="font-syne text-2xl font-bold tracking-tighter text-white">R. ZALA</div>
              <a
                href="/Rajveesinh_Zala_Resume.pdf"
                download="Rajveesinh_Zala_Resume.pdf"
                className="font-syne text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white text-white/70 hover:text-black px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-black/10 active:scale-[0.97] pointer-events-auto cursor-pointer"
              >
                <Download size={10} />
                Download Resume
              </a>
            </div>
            <div className="flex flex-col items-center gap-4 pointer-events-auto bg-black/25 backdrop-blur-sm p-4 rounded-full border border-white/5">
              <a href="https://www.linkedin.com/in/rajveersinh-zala/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://github.com/rajveerzala67?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300" aria-label="GitHub"><Github size={20} /></a>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col">
              <p className="font-syne text-xs uppercase tracking-widest text-blue-500 mb-2 font-semibold">Full-Stack Developer</p>
              <h1 className="font-syne text-[6.2vw] min-[375px]:text-[7.2vw] min-[410px]:text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tighter uppercase leading-none">Rajveersinh<br />Zala</h1>
            </div>
            <div className="flex flex-col items-start md:items-end max-w-sm md:text-right">
              <p className="font-satoshi text-sm md:text-base text-white/80 leading-relaxed mb-6">Pursuing technical depth in software engineering, crafting high-performance systems, and building interactive web experiences.</p>
              <div className="flex items-center gap-2 text-white/40">
                <span className="font-syne text-xs uppercase tracking-widest">Scroll to Read Story</span>
                <div className="animate-bounce">{isMobile ? <ChevronDown size={16} /> : <Mouse size={16} />}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ ABOUT ME PANEL ═══ */}
        <div ref={aboutRef} className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-16" style={{ opacity: 0, pointerEvents: 'none' }}>
          <div className="glass max-w-3xl w-full p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 select-none">
            <span className="font-syne text-xs uppercase tracking-widest text-blue-400 mb-2 block font-semibold">About Me</span>
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold mb-4 text-white uppercase tracking-tight leading-tight">Turning Ideas Into Digital Experiences</h2>
            <div className="font-satoshi text-xs sm:text-sm md:text-base text-white/70 space-y-4 leading-relaxed">
              <p>Hello! I'm <strong className="text-white">Rajveersinh Zala</strong>, a Computer Engineering student with a strong passion for technology, problem-solving, and continuous learning. For me, programming is about understanding problems, designing solutions, and creating products that make a positive impact.</p>
              <p>My journey began with curiosity about websites, applications, and the systems powering them. Over time, that curiosity evolved into a genuine passion for software development and emerging technologies.</p>
              <p>Alongside my academic studies, I actively invest time in self-learning and practical skill development to stay updated with modern development practices and industry trends.</p>
            </div>
          </div>
        </div>

        {/* ═══ MY MINDSET PANEL ═══ */}
        <div ref={mindsetRef} className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-16" style={{ opacity: 0, pointerEvents: 'none' }}>
          <div className="glass max-w-3xl w-full p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 select-none">
            <span className="font-syne text-xs uppercase tracking-widest text-blue-400 mb-2 block font-semibold">My Mindset</span>
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold mb-4 text-white uppercase tracking-tight leading-tight">Growth, Discipline & Challenges</h2>
            <div className="font-satoshi text-xs sm:text-sm md:text-base text-white/70 space-y-4 leading-relaxed">
              <p>I believe that growth comes from consistency, discipline, and a willingness to embrace challenges. Technology evolves rapidly, and staying relevant requires continuous learning and adaptation.</p>
              <p>Whether it is improving efficiency, enhancing user experiences, or simplifying complex processes, software has the power to create meaningful change. Being part of that process is what inspires me.</p>
              <p>I approach every challenge with curiosity. Rather than focusing solely on finding answers, I enjoy understanding the reasoning behind solutions and exploring different approaches to problem-solving.</p>
            </div>
          </div>
        </div>

        {/* ═══ BEYOND TECHNOLOGY PANEL ═══ */}
        <div ref={beyondRef} className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-16" style={{ opacity: 0, pointerEvents: 'none' }}>
          <div className="glass max-w-3xl w-full p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 select-none">
            <span className="font-syne text-xs uppercase tracking-widest text-blue-400 mb-2 block font-semibold">Beyond Technology</span>
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold mb-4 text-white uppercase tracking-tight leading-tight">Looking Ahead</h2>
            <div className="font-satoshi text-xs sm:text-sm md:text-base text-white/70 space-y-4 leading-relaxed">
              <p>While technology is a significant part of my life, I also value balance and personal development. I believe that maintaining discipline, staying physically active, and developing strong habits are essential for long-term success.</p>
              <p>My vision is to continuously grow as a technology professional while building a strong foundation of knowledge, communication, adaptability, and leadership.</p>
              <p className="border-t border-white/10 pt-4 font-syne text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wide text-center">"Great things are built through passion, persistence, and continuous learning."</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
