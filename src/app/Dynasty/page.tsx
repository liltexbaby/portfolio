'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';

const slides = [
  { slideNumber: 1, slideLink: "/img/dynasty1.jpg" },
  { slideNumber: 2, slideLink: "/img/dynasty2.jpg" },
  { slideNumber: 3, slideLink: "/img/dynasty3.jpg" },
  { slideNumber: 4, slideLink: "/img/dynasty4.jpg" },
  { slideNumber: 5, slideLink: "/img/dynasty5.jpg" },
  { slideNumber: 6, slideLink: "/img/dynasty6.jpg" },
  { slideNumber: 7, slideLink: "/img/dynasty7.jpg" },
  { slideNumber: 8, slideLink: "/img/dynasty8.jpg" },
  { slideNumber: 9, slideLink: "/img/dynasty9.jpg" },
  { slideNumber: 10, slideLink: "/img/dynasty10.jpg" },
  { slideNumber: 11, slideLink: "/img/dynasty11.jpg" },
  { slideNumber: 12, slideLink: "/img/dynasty12.jpg" },
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
    projectName: "Texas Central",
    coverLink: "/img/texascentral.jpg",
    description: "prospective branding for Texas Central, a proposed high speed rail system connecting DFW, Austin, and Houston.",
    link: "/TexasCentral",
    id: "3",
  }
];


export default function Dynasty() {
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
      {/* Header */}


      <div className="max-w-[75%] mx-auto pt-8">
        <div ref={introRef} className="mb-12">
          <h1 className="text-xl font-bold mb-6 title">Dynasty</h1>
          
          <div className="space-y-4 text-base leading-relaxed mb-8">
            <p>
              A new identity system for Dynasty, a manufacturer of percussion instruments for the top competitive drum ensembles across the world.
            </p>
            <p>
              This rebrand focused on creating a bold, modern identity that reflects the precision and excellence of Dynasty's instruments while appealing to the competitive marching arts community.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-8">
            {slides.map((slide) => (
              <div key={slide.slideNumber} className="relative w-full">
                <Image 
                  src={slide.slideLink}
                  alt={`Dynasty brand design ${slide.slideNumber}`}
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
