import React from 'react';

const ROW1 = [
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', invert: false },
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', invert: false },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', invert: false },
  { name: 'React.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', invert: false },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', invert: false },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', invert: false },
  { name: 'Express.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true }
];

const ROW2 = [
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', invert: false },
  { name: 'Supabase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', invert: false },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', invert: false },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'VS Code', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', invert: false },
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', invert: false },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', invert: false }
];

export default function ToolsCard() {
  // Double arrays for seamless infinite looping
  const marquee1 = [...ROW1, ...ROW1];
  const marquee2 = [...ROW2, ...ROW2];

  return (
    <div className="glass rounded-3xl h-full w-full p-6 flex flex-col justify-between overflow-hidden relative group transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Title */}
      <div className="mb-2">
        <h3 className="font-syne text-xs uppercase tracking-widest text-white/50">
          Skills & Technologies
        </h3>
      </div>

      {/* Marquee Container */}
      <div className="flex-1 flex flex-col justify-center gap-4 relative overflow-hidden pointer-events-none">
        
        {/* Row 1: Leftward Scroll */}
        <div className="flex w-max animate-marquee gap-6 items-center px-2">
          {marquee1.map((tool, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl"
            >
              <img
                src={tool.src}
                alt={tool.name}
                className={`w-5 h-5 object-contain ${tool.invert ? 'invert brightness-0 dark:invert-0 dark:brightness-100' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
                }}
              />
              <span className="font-satoshi text-xs font-medium tracking-wide text-white/80">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Scroll */}
        <div className="flex w-max animate-marquee-reverse gap-6 items-center px-2">
          {marquee2.map((tool, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl"
            >
              <img
                src={tool.src}
                alt={tool.name}
                className={`w-5 h-5 object-contain ${tool.invert ? 'invert brightness-0 dark:invert-0 dark:brightness-100' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
                }}
              />
              <span className="font-satoshi text-xs font-medium tracking-wide text-white/80">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Fade Overlays on sides */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10" />
    </div>
  );
}
