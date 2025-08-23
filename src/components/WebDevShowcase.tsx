'use client';

import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  projectName: string;
  coverLink: string;
  technologies: string;
  description: string;
  link: string;
  id: string;
}

const projects: Project[] = [
  {
    projectName: 'Public Ballot',
    coverLink: '/img/PublicBallotThumb.jpg',
    technologies: 'CSS, Javascript, React',
    description: 'a website created to track elections dependant on your given address.',
    link: '/publicballot',
    id: '1',
  },
  {
    projectName: 'Saturn V',
    coverLink: '/img/SaturnVLaunch2.mp4',
    technologies: 'Wordpress, CSS, After Effects, Salient/WPBakery',
    description:
      "a dynamic, animated, central hub for information about the Saturn V rocket and it's history.",
    link: '/saturnV',
    id: '2',
  },
  {
    projectName: 'CirclesU',
    coverLink: '/img/CirclesUThumb.jpg',
    technologies: 'React Native',
    description:
      'a social media app based around interacting with businesses and groups near your current location.',
    link: '/circlesU',
    id: '3',
  },
];

export default function WebDevShowcase() {
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
      <div className="mb-12 space-y-4 flex justify-start items-start">
        <div className="leading-relaxed font-system text-lg text-left">
          I pair product design with full stack development to bring ideas from conception to
          production.
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
            technologies={project.technologies}
            aspectRatio="video"
          />
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {/* <h3 className="text-xl font-bold leading-relaxed">
          This website is also kind of a project itself, I hope you enjoy it!
        </h3>
        <h1 className="text-xl font-bold leading-relaxed title">
          I've made it's github repo available{' '}
          <a className="underline-link cursor-pointer">here</a>{' '}
          if you'd like to check out it's source code.
        </h1> */}
      </div>
    </div>
  );
}
