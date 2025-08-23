'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  projectName: string;
  coverLink: string;
  description: string;
  link: string;
  technologies?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

function getFileExtension(filename: string): string {
  return filename.split('.').pop() || '';
}

export default function ProjectCard({
  projectName,
  coverLink,
  description,
  link,
  technologies,
  aspectRatio = 'video',
}: ProjectCardProps) {
  const projectRef = useRef<HTMLDivElement>(null);
  const linkType = getFileExtension(coverLink);

  const handleMouseEnter = () => {
    if (projectRef.current) {
      projectRef.current.style.transform = 'translateY(-10px)';
    }
  };

  const handleMouseLeave = () => {
    if (projectRef.current) {
      projectRef.current.style.transform = 'translateY(0px)';
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[16/9]';
      case 'video':
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <div
      ref={projectRef}
      className="transition-transform duration-250 ease-out cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={link}>
        <div className="rounded-2xl overflow-clip border-2">
          {linkType === 'mp4' ? (
            <video autoPlay loop muted playsInline className="responsive-video w-full">
              <source src={coverLink} type="video/mp4" />
            </video>
          ) : (
            <div className={`relative w-full ${getAspectRatioClass()}`}>
              <Image src={coverLink} alt={projectName} fill className="object-cover" />
            </div>
          )}
          <div className="project-card-description">
            <h3 className="text-xl">{projectName}</h3>
            <div className="mb-4">{description}</div>
            {technologies && (
              <div>
                <h3 className="">Technologies</h3>
                {technologies}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
