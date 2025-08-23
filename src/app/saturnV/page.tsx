'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';

const otherProjects = [
  {
    projectName: "Public Ballot",
    coverLink: "/img/PublicBallotThumb.jpg",
    technologies: "CSS, Javascript, React",
    description: "a website created to track elections dependant on your given address.",
    link: "/publicballot",
    id: "1",
  },
  {
    projectName: "CirclesU",
    coverLink: "/img/CirclesUThumb.jpg",
    technologies: "React Native",
    description: "a social media app based around interacting with businesses and groups near your current location.",
    link: "/circlesU",
    id: "3",
  }
];


export default function SaturnV() {
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
          <h1 className="text-xl font-bold mb-6 title">Saturn V</h1>
          
          <div className="space-y-4 text-base leading-relaxed mb-8">
            <p>
              A dynamic, animated, central hub for information about the Saturn V rocket and its history.
            </p>
            <p>
              This project was built using WordPress with custom CSS animations and After Effects integration to create an immersive experience about the Apollo program.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <div className="relative aspect-video">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="responsive-video w-full h-full object-cover"
              >
                <source src="/img/SaturnVLaunch2.mp4" type="video/mp4" />
              </video>
            </div>
            
            <div className="border-2 border-black p-5 bg-white">
              <h3 className="text-base font-bold mb-4">Role:</h3>
              <p className="mb-4">
                I was responsible for the complete design and development of this interactive website, including custom animations, video integration, and responsive design.
              </p>
              
              <h3 className="text-base font-bold mb-4">Technologies/Skills:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>WordPress & WPBakery Page Builder</li>
                <li>Custom CSS animations</li>
                <li>After Effects video production</li>
                <li>Responsive web design</li>
                <li>Interactive storytelling</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-8 title">
            Project Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="relative aspect-video">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="responsive-video w-full h-full object-cover"
              >
                <source src="/img/SaturnVHero.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative aspect-video">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="responsive-video w-full h-full object-cover"
              >
                <source src="/img/SaturnVRocket.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="space-y-6 text-base">
            <p>
              The website features immersive video backgrounds, smooth scrolling animations, and interactive elements that guide users through the history of the Saturn V rocket and the Apollo missions.
            </p>
            <p>
              Each section was carefully crafted to provide both educational content and visual appeal, making complex space technology accessible to a general audience.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-8 title">
            Check out my other projects:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-5">
            {otherProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                projectName={project.projectName}
                coverLink={project.coverLink}
                description={project.description}
                link={project.link}
                technologies={project.technologies}
                aspectRatio="video"
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
