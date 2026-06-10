import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: "Formula 1 3D Website",
    image: "/project-1.png",
    tech: ["React.js", "Three.js", "React Three Fiber", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js"],
    github: "https://github.com/rajveerzala67/formula-1-RZ",
    live: "https://formula-1-rz.vercel.app",
    description: [
      "Developed a modern 3D portfolio website to showcase personal information, skills, projects, certifications, and achievements through an interactive user experience.",
      "Designed immersive 3D animations and smooth page transitions to create a visually appealing and engaging interface.",
      "Implemented responsive layouts to ensure seamless performance across desktop, tablet, and mobile devices.",
      "Built dedicated sections for About Me, Skills, Projects, Experience, Resume, and Contact, providing a professional online presence.",
      "Optimized performance with efficient asset loading, smooth scrolling effects, and modern UI/UX principles.",
      "Added interactive elements, hover effects, and dynamic content presentation to enhance user engagement and accessibility."
    ]
  },
  {
    id: 2,
    title: "Social-Stack",
    image: "/project-2.png",
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Supabase", "Socket.io", "Tailwind CSS", "JWT Auth"],
    github: "https://github.com/rajveerzala67/Stack-Social",
    live: "https://stack-social-five.vercel.app/login",
    description: [
      "Developed a full-featured social media platform that enables users to create posts, like, comment, share content, and connect with others through a personalized social experience.",
      "Implemented user authentication, profile management, follow/unfollow functionality, and follow request handling to build a secure and interactive community.",
      "Built real-time messaging features with instant chat capabilities, allowing users to communicate seamlessly with friends and followers.",
      "Integrated Stories functionality with music support, enabling users to share temporary content and engage through reactions and replies.",
      "Designed a modern, responsive, and user-friendly interface optimized for both desktop and mobile devices, ensuring smooth navigation and engagement."
    ]
  },
  {
    id: 3,
    title: "Apna News – News Aggregation Platform",
    image: "/project-3.png",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "NewsAPI", "Tailwind CSS", "JWT Auth", "Axios"],
    github: "https://github.com/rajveerzala67/Apna-News",
    live: "https://apna-news-mocha.vercel.app",
    description: [
      "Developed a full-stack news platform that delivers real-time news updates from multiple categories including Technology, Business, Sports, Health, Entertainment, and World News.",
      "Implemented advanced search and filtering features, allowing users to discover news by categories, countries, and publication dates.",
      "Built secure user authentication and personalized dashboards where users can save articles, manage bookmarks, and track reading history.",
      "Integrated AI-powered news summaries and related article recommendations to improve content discovery and user engagement.",
      "Designed a fully responsive and modern user interface with smooth navigation, optimized performance, and mobile-friendly layouts."
    ]
  },
  {
    id: 4,
    title: "Syllabus Tracker & Chat Box",
    image: "/project-4.png",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth", "MongoDB Atlas"],
    github: "https://github.com/rajveerzala67/Syllabus-chat-box",
    live: "https://syllabus-chat-box.vercel.app/login",
    description: [
      "Developed a MERN stack syllabus management platform that helps students track academic progress through interactive topic-based checklists.",
      "Implemented secure JWT authentication and role-based access for students and class coordinators with protected user sessions.",
      "Enabled real-time progress synchronization using MongoDB, ensuring completed topics are saved and accessible across devices.",
      "Built a modern and responsive user interface with Glassmorphism design, providing an intuitive and engaging user experience."
    ]
  }
];

export default function WallpaperCard() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Triple the array to create 9 items for seamless marquee loop
  const projectList = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  // Disable scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <div className="glass rounded-3xl h-full w-full overflow-hidden relative group transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Title Tag */}
      <div className="absolute top-4 left-6 z-20">
        <span className="font-syne text-xs uppercase tracking-widest text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          Projects
        </span>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="absolute inset-0 flex items-center overflow-hidden z-10">
        <div className="flex w-max animate-slide-horizontal hover-pause gap-6 px-6">
          {projectList.map((project, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedProject(project)}
              className="w-64 h-40 md:w-80 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 shadow-inner relative cursor-pointer group/item transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
                }}
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
                <span className="font-syne text-[10px] md:text-[11px] uppercase tracking-wider text-blue-400 font-bold mb-1">Click to view details</span>
                <p className="font-syne text-xs md:text-sm font-bold text-white leading-tight truncate">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10" />

      {/* Portal Modal Overlay */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              data-lenis-prevent
              className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative my-auto"
              >
                {/* Header Image */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/35 z-10 pointer-events-none" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg cursor-pointer flex items-center justify-center"
                    aria-label="Close details"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-5 max-h-[50vh] overflow-y-auto no-scrollbar">
                  
                  {/* Title & Tech */}
                  <div className="flex flex-col gap-3">
                    <h2 className="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight">
                      {selectedProject.title}
                    </h2>
                    
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-satoshi text-[9px] sm:text-[10px] font-semibold px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/70 tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="font-satoshi text-xs sm:text-sm text-white/70 space-y-2.5 leading-relaxed list-none mt-2 border-t border-white/5 pt-4">
                    {selectedProject.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <span className="text-blue-500 select-none">•</span>
                        <span className="select-text">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Call to Actions */}
                  <div className="flex flex-wrap gap-4 pt-5 border-t border-white/5 mt-4">
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl flex items-center gap-2 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-2 text-white font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Github size={14} />
                      GitHub Repo
                    </a>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
