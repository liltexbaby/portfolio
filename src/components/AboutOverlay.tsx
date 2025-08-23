'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Head from './Head';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Re-enable body scroll when overlay is closed
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup function to ensure scroll is re-enabled
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
      style={{
        top: '0px', // Start below the navbar
        height: 'calc(100vh - 60px + 10vh)', // Adjust height to account for navbar
        backgroundColor: '#ff00ff',
      }}
    >
      <div className="max-w-[75%] mx-auto pt-24 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
          {/* 3D Head Section */}
          <div className="w-full h-[40vh] md:h-[90vh]">
            <Canvas>
              <ambientLight />
              <OrbitControls />
              <Suspense fallback={null}>
                <Head />
              </Suspense>
            </Canvas>
          </div>

          {/* About Text Section */}
          <div className="flex flex-col justify-center space-y-6 text-black">
            <h1 className="text-lg md:text-xl font-system leading-relaxed">
              I&apos;m a lot of things, but the most important thing is that I&apos;m a fast
              learner.
            </h1>

            <p className="text-sm md:text-base font-system leading-relaxed">
              I was born in Texas, but now I do my business in Brooklyn, NY. I like painting, web
              design, motion graphics, and making music, or really making anything at all. I&apos;m
              probably watching a youtube tutorial as you read this, trying to add another item to
              that list. I&apos;ve got a passion for high quality, well thought out work, and
              I&apos;ll do whatever it takes to get my vision across, no matter how many google
              searches it takes.
            </p>

            <div className="space-y-4">
              <h3 className="text-base font-system font-semibold">connect with me:</h3>

              <h2 className="text-base md:text-lg font-system">
                <a
                  href="mailto:x@jonathanpinto.net"
                  className="underline underline-offset-2 decoration-2 hover:bg-black hover:text-magenta transition-colors duration-200"
                >
                  x@jonathanpinto.net
                </a>
              </h2>

              <h2 className="text-base md:text-lg font-system">
                <a
                  href="https://instagram.com/jonathanxpinto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-2 hover:bg-black hover:text-magenta transition-colors duration-200"
                >
                  @jonathanxpinto
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
