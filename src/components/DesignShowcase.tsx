'use client';

import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  projectName: string;
  coverLink: string;
  description: string;
  link: string;
  id: string;
}

const projects: Project[] = [
  {
    projectName: "Die Jim Crow",
    coverLink: "/img/DieJimCrow1.jpg",
    description: "a rebrand for a record label created to provide a platform for incarcerated and formerly incarcerated prisoners.",
    link: "/DieJimCrow",
    id: "1",
  },
  {
    projectName: "Dynasty",
    coverLink: "/img/dynasty1.jpg",
    description: "a new identity system for Dynasty, a manufacturer of percussion instruments for the top competitive drum ensembles across the world.",
    link: "/Dynasty",
    id: "2",
  },
  {
    projectName: "Texas Central",
    coverLink: "/img/texascentral.jpg",
    description: "prospective branding for Texas Central, a proposed high speed rail system connecting DFW, Austin, and Houston.",
    link: "/TexasCentral",
    id: "3",
  }
];


export default function DesignShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(10px)';
      
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'translateY(0px)';
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="w-full max-w-[75%] mx-auto px-0">
      <div className="mb-12 space-y-4 flex justify-center">
        <div className="font-system leading-relaxed text-center">
          I have a passion for creating bold and unique branding that is striking and systematic.
        </div>

      </div>

      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            projectName={project.projectName}
            coverLink={project.coverLink}
            description={project.description}
            link={project.link}
            aspectRatio="wide"
          />
        ))}
      </div>
    </div>
  );
}
