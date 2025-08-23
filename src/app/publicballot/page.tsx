'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';

const slides = [
  { slideNumber: 1, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_1.jpg" },
  { slideNumber: 2, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_2.jpg" },
  { slideNumber: 3, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_3.jpg" },
  { slideNumber: 4, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_4.jpg" },
  { slideNumber: 5, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_5.jpg" },
  { slideNumber: 6, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_6.jpg" },
  { slideNumber: 7, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_7.jpg" },
  { slideNumber: 8, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_8.jpg" },
  { slideNumber: 9, slideLink: "/img/ourvote/jonathan_pinto_ourvote_Page_9.jpg" },
];

const otherProjects = [
  {
    projectName: "Saturn V",
    coverLink: "/img/SaturnVLaunch2.mp4",
    technologies: "Wordpress, CSS, After Effects, Salient/WPBakery",
    description: "a dynamic, animated, central hub for information about the Saturn V rocket and it's history.",
    link: "/saturnV",
    id: "2",
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


export default function PublicBallot() {
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
          <h1 className="text-xl font-bold mb-6 title">Public Ballot</h1>
          
          <div className="space-y-4 text-base leading-relaxed mb-8">
            <p>
              A friend and I made public ballot in our spare time to try and bring attention to local elections during the 2020 election cycle.
            </p>
            <p>
              The site is live and still serving data from the 2020 election, you can check it out for yourself{' '}
              <a 
                href="http://publicballot.org" 
                className="underline-link hover:bg-magenta"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <div className="relative aspect-video">
              <Image 
                src="/img/PublicBallotHome.png"
                alt="Public Ballot Homepage"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="border-2 rounded-2xl border-black bg-white p-5">
              <h3 className="text-base font-bold mb-4">Role:</h3>
              <p className="mb-4">
                I was the lead front-end developer on this project, focused on designing and implementing the user interface, as well as directing the overall structure of the project and the data we are sorting and displaying.
              </p>
              
              <h3 className="text-base font-bold mb-4">Technologies/Skills:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>React</li>
                <li>Collaboration through git</li>
                <li>Displaying dynamic serverside data</li>
                <li>Working with a partner</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-8 title">
            This started out as my class project, originally called ourvote. Here&apos;s a deck outlining the app&apos;s entire proposed functionality.
          </h2>
          
          <div className="space-y-8">
            {slides.map((slide) => (
              <div key={slide.slideNumber} className="relative w-full">
                <Image 
                  src={slide.slideLink}
                  alt={`OurVote presentation slide ${slide.slideNumber}`}
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
            I&apos;m very proud that this project became a real usable product! I really do love this one. Check out my other two projects on display, I think they&apos;re just as cool:
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
