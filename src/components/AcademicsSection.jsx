import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, Award, X, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AcademicsSection() {
  const containerRef = useRef(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.academics-card');
    
    gsap.set(cards, { opacity: 0, y: 50 });

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      start: 'top 85%',
      once: true
    });
  }, []);

  // Control body scroll when certificate is showing
  useEffect(() => {
    if (showCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCertificate]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-black py-20 px-6 md:px-16 lg:px-24 flex flex-col justify-center overflow-hidden z-20 border-b border-white/5"
      id="academics"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-syne text-xs uppercase tracking-widest text-blue-500 mb-2 font-semibold">
            Academics & Experience
          </p>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Education & Internship
          </h2>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Academics */}
          <div className="academics-card glass rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-white/10 hover:shadow-blue-500/5 transition-all duration-500">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                  <GraduationCap size={24} />
                </div>
                <h3 className="font-syne text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                  My Academics
                </h3>
              </div>

              {/* Institution & Degree */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-syne text-base sm:text-lg font-bold text-white leading-tight">
                      Silver Oak University
                    </h4>
                    <p className="font-satoshi text-xs sm:text-sm text-white/50 mt-1">
                      Bachelor of Technology (B.Tech) in Computer Engineering
                    </p>
                  </div>
                  <img 
                    src="https://silveroakuni.ac.in/assets/images/logo/sou-l.svg" 
                    alt="Silver Oak University Logo" 
                    className="h-10 sm:h-12 w-auto object-contain bg-white/5 p-1.5 rounded-xl border border-white/15 flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className="font-satoshi text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 flex items-center gap-1.5">
                    <Calendar size={12} className="text-blue-400" />
                    2023 - 2027
                  </span>
                  <span className="font-satoshi text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 flex items-center gap-1.5 shadow-md shadow-blue-500/10">
                    <Award size={12} className="text-blue-400" />
                    CGPA: 8.33
                  </span>
                </div>
              </div>

              {/* Highlight Points */}
              <ul className="font-satoshi text-xs sm:text-sm text-white/70 space-y-3 leading-relaxed border-t border-white/5 pt-6 list-none">
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Pursuing Bachelor of Technology (B.Tech) in Computer Engineering at Silver Oak University (2023-2027).</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Currently maintaining a CGPA of <strong className="text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">8.33</strong>, demonstrating consistent academic performance and dedication to learning.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Built a strong foundation in <strong className="text-white font-medium">Programming, Data Structures, Database Management Systems</strong>, and <strong className="text-white font-medium">Software Engineering</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Studied core subjects including <strong className="text-white font-medium">Computer Networks, Cybersecurity, Cloud Computing</strong>, and <strong className="text-white font-medium">Web Technologies</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Applied theoretical concepts through <strong className="text-white font-medium">practical projects, laboratory work</strong>, and <strong className="text-white font-medium">full-stack web development</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-blue-500 select-none">•</span>
                  <span>Continuously enhancing technical skills through <strong className="text-white font-medium">online courses, self-learning</strong>, and <strong className="text-white font-medium">hands-on project development</strong>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Internship */}
          <div className="academics-card glass rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-white/10 hover:shadow-blue-500/5 transition-all duration-500">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-syne text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                  Internship Experience
                </h3>
              </div>

              {/* Company & Role */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-syne text-base sm:text-lg font-bold text-white leading-tight">
                      Lemtoj Infotech
                    </h4>
                    <p className="font-satoshi text-xs sm:text-sm text-white/50 mt-1">
                      Jr. React Developer
                    </p>
                  </div>
                  <img 
                    src="https://lemtojinfotech.com/assets/front/img/header_logo_17555211841691251018.png" 
                    alt="Lemtoj Infotech Logo" 
                    className="h-8 sm:h-10 w-auto object-contain bg-white/5 p-1.5 rounded-xl border border-white/15 flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className="font-satoshi text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 flex items-center gap-1.5">
                    <Calendar size={12} className="text-cyan-400" />
                    Jun 2025 - Jul 2025
                  </span>
                </div>
              </div>

              {/* Highlight Points */}
              <ul className="font-satoshi text-xs sm:text-sm text-white/70 space-y-3 leading-relaxed border-t border-white/5 pt-6 list-none">
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Completed an Internship at Lemtoj Info.Tech as a Jr. React Developer, gaining practical experience in modern frontend development.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Developed and customized reusable React components to build responsive and interactive user interfaces.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Worked with <strong className="text-white font-medium">JSX, Hooks, Props, State Management</strong>, and <strong className="text-white font-medium">Component-Based Architecture</strong> in real-world projects.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Collaborated with the development team to implement UI features and improve application performance.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Enhanced skills in <strong className="text-white font-medium">JavaScript, React.js, API Integration</strong>, and <strong className="text-white font-medium">Responsive Web Design</strong> through hands-on development.</span>
                </li>
                <li className="flex items-start gap-2.5 text-left">
                  <span className="text-cyan-500 select-none">•</span>
                  <span>Gained industry exposure to professional development workflows, debugging, version control, and best coding practices.</span>
                </li>
              </ul>
            </div>

            {/* Certificate Preview Section */}
            <div className="mt-6 border-t border-white/5 pt-6">
              <h5 className="font-syne text-xs uppercase tracking-wider text-white/50 mb-3">
                Completion Certificate
              </h5>
              <div 
                onClick={() => setShowCertificate(true)}
                className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/10 group/cert cursor-pointer hover:border-white/20 transition-all shadow-md active:scale-[0.99]"
              >
                <img 
                  src="/intership-certificate.jpg" 
                  alt="Internship Certificate Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/cert:scale-105 filter brightness-[0.7]"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1607013398844-0a8551866b2e?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover/cert:bg-black/60 transition-colors duration-300 flex items-center justify-center gap-2 text-white text-xs font-semibold">
                  <ZoomIn size={14} />
                  View Certificate
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Full-screen Certificate Modal */}
      {createPortal(
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertificate(false)}
              data-lenis-prevent
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10"
            >
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative my-auto flex flex-col items-center p-4"
              >
                {/* Header/Close bar */}
                <div className="w-full flex justify-between items-center mb-3 px-2">
                  <span className="font-syne text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
                    Lemtoj Infotech Internship Certificate
                  </span>
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="p-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/10 shadow-lg cursor-pointer flex items-center justify-center"
                    aria-label="Close certificate"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Certificate Image */}
                <div className="w-full max-h-[85vh] overflow-y-auto rounded-xl border border-white/5 bg-black/40 flex items-center justify-center no-scrollbar">
                  <img 
                    src="/intership-certificate.jpg" 
                    alt="Lemtoj Infotech Internship Certificate" 
                    className="max-w-full max-h-[75vh] object-contain rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1607013398844-0a8551866b2e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}
