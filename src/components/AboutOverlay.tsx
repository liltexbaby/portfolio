'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Head from './Head';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <>
      {/* Invisible click-catcher — no backdrop tint */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sliding card panel — z-40 keeps it below the navbar (z-50) so it slides from underneath */}
      <div
        ref={overlayRef}
        className={`fixed left-0 right-0 z-40 ${mounted ? 'transition-transform duration-500 ease-in-out' : ''} ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: '60px' }} /* sits right below the sticky navbar */
      >
        <div
          className="max-w-[75%] mx-auto pb-6 px-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-xl md:max-h-[calc(100vh-1.75rem)] md:overflow-y-auto border border-black/10 p-6 md:p-8"
            style={{ backgroundColor: '#ff00ff' }}
          >
            {/* 3D Head Section */}
            <div className="w-full h-[40vh] md:h-[80vh] min-h-[280px] overflow-hidden">
              <Canvas
                gl={{ alpha: false }}
                onCreated={({ gl }) => {
                  gl.setClearColor('#ff00ff', 1);
                }}
              >
                <ambientLight />
                <OrbitControls />
                <Suspense fallback={null}>
                  <Head />
                </Suspense>
              </Canvas>
            </div>

            {/* About Text Section */}
            <div className="flex flex-col justify-center space-y-6 text-black">
              {/* Hidden on mobile — shown on desktop only */}
              <h1 className="hidden md:block text-xl font-system leading-relaxed">
                I&apos;m a lot of things, but the most important thing is that I&apos;m a fast
                learner.
              </h1>

              <p className="hidden md:block text-base font-system leading-relaxed">
                I was born in Texas, but now I do my business in Brooklyn, NY. I like painting, web
                design, motion graphics, and making music, or really making anything at all.
                I&apos;m probably watching a youtube tutorial as you read this, trying to add
                another item to that list. I&apos;ve got a passion for high quality, well thought
                out work, and I&apos;ll do whatever it takes to get my vision across, no matter how
                many google searches it takes.
              </p>

              {/* Always visible */}
              <div className="space-y-0">
                <h3 className="text-base font-system font-semibold">connect with me:</h3>

                <h2 className="text-base md:text-lg font-system">
                  <a
                    href="mailto:x@jonathanpinto.net"
                    className="underline underline-offset-2 decoration-2 hover:bg-black hover:text-magenta transition-colors duration-200"
                  >
                    x@jonathanpinto.net
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
