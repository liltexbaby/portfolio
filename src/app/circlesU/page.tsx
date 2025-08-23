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
    projectName: "Saturn V",
    coverLink: "/img/SaturnVLaunch2.mp4",
    technologies: "Wordpress, CSS, After Effects, Salient/WPBakery",
    description: "a dynamic, animated, central hub for information about the Saturn V rocket and it's history.",
    link: "/saturnV",
    id: "2",
  }
];


export default function CirclesU() {
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
          <h1 className="text-xl font-bold mb-6 title">CirclesU</h1>
          
          <div className="space-y-4 text-base leading-relaxed mb-8">
            <p>
              A social media app based around interacting with businesses and groups near your current location.
            </p>
            <p>
              CirclesU was designed to connect people with local communities and businesses through location-based social networking, built entirely with React Native for cross-platform mobile deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <div className="relative aspect-video">
              <Image 
                src="/img/CirclesUHero.jpg"
                alt="CirclesU App Interface"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="border-2 border-black p-5 bg-white">
              <h3 className="text-base font-bold mb-4">Role:</h3>
              <p className="mb-4">
                I was the lead mobile developer, responsible for the complete app architecture, UI/UX design, and implementation of location-based features and social networking functionality.
              </p>
              
              <h3 className="text-base font-bold mb-4">Technologies/Skills:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>React Native</li>
                <li>Location-based services</li>
                <li>Mobile UI/UX design</li>
                <li>Cross-platform development</li>
                <li>Social networking features</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-8 title">
            App Features & Functionality
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div className="relative aspect-video">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="responsive-video w-full h-full object-cover"
              >
                <source src="/img/CirclesULogin.mp4" type="video/mp4" />
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
                <source src="/img/CirclesUPost.mp4" type="video/mp4" />
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
                <source src="/img/CirclesUProfile.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="space-y-6 text-base">
            <p>
              The app featured user authentication, location-based discovery, social posting, profile management, and local business integration. Users could discover and connect with nearby communities while businesses could engage with local customers.
            </p>
            <p>
              The interface was designed with a focus on intuitive navigation and seamless user experience, making it easy for users to find and engage with their local community.
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
