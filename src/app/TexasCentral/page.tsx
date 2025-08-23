'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';

const slides = [
  { slideNumber: 1, slideLink: "/img/texascentral.jpg" },
  { slideNumber: 2, slideLink: "/img/texascentral2.jpg" },
  { slideNumber: 3, slideLink: "/img/texascentral3.jpg" },
  { slideNumber: 4, slideLink: "/img/texascentral4.jpg" },
  { slideNumber: 6, slideLink: "/img/texascentral6.jpg" },
  { slideNumber: 7, slideLink: "/img/texascentral7.jpg" },
  { slideNumber: 8, slideLink: "/img/texascentral8.jpg" },
  { slideNumber: 9, slideLink: "/img/texascentral9.jpg" },
  { slideNumber: 11, slideLink: "/img/texascentral11.jpg" },
  { slideNumber: 12, slideLink: "/img/texascentral12.jpg" },
  { slideNumber: 13, slideLink: "/img/texascentral13.jpg" },
];

const otherProjects = [
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
  }
];


export default function TexasCentral() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introRef.current) {
      introRef.current.style.opacity = '0';
      introRef.current.style.transform = 'translateY(10px)';
      
      const timer = setTimeout(() => {
        if (introRef.current) {
          introRef.current.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
          introRef.current.style.opacity = '1';
          introRef.current.style.transform = 'translateY(0px)';
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
 

      <div className="max-w-[75%] mx-auto pt-8">
        <div ref={introRef} className="mb-12">
          <h1 className="text-xl font-bold mb-6 title">Texas Central</h1>
          
          <div className="space-y-4 text-base leading-relaxed mb-8">
            <p>
              Prospective branding for Texas Central, a proposed high speed rail system connecting DFW, Austin, and Houston.
            </p>
            <p>
              This project focused on creating a modern, forward-thinking identity that would represent the future of transportation in Texas while honoring the state's heritage and connecting its major metropolitan areas.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-8">
            {slides.map((slide) => (
              <div key={slide.slideNumber} className="relative w-full">
                <Image 
                  src={slide.slideLink}
                  alt={`Texas Central brand design ${slide.slideNumber}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-8 title">
            Check out my other design projects:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-5">
            {otherProjects.map((project) => (
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

        <div className="text-center pb-12">
          <Link 
            href="/"
            className="text-xl font-bold underline-link hover:bg-magenta"
          >
            back to projects
          </Link>
        </div>
      </div>
    </div>
  );
}
