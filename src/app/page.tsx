'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelector from '@/components/RoleSelector';
import WebDevShowcase from '@/components/WebDevShowcase';
import DesignShowcase from '@/components/DesignShowcase';

export default function Home() {
  const [indexMode, setIndexMode] = useState(3); // Default to web developer
  const router = useRouter();

  const handleShowcaseMode = () => {
    if (indexMode === 3) {
      return <WebDevShowcase />;
    } else if (indexMode === 4) {
      return <DesignShowcase />;
    }
    return null;
  };

  // Handle mode changes and update URL hash
  const handleModeChange = (mode: number) => {
    setIndexMode(mode);
    const hash = mode === 3 ? '#web' : '#design';
    window.history.replaceState(null, '', hash);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check URL hash first
      const hash = window.location.hash;
      let initialMode = 3; // default to web developer
      
      if (hash === '#design') {
        initialMode = 4;
      } else if (hash === '#web') {
        initialMode = 3;
      } else {
        // Fallback to localStorage if no hash
        const data = window.localStorage.getItem('indexMode');
        if (data) {
          initialMode = JSON.parse(data);
        }
      }
      
      setIndexMode(initialMode);
      
      // Set initial hash if none exists
      if (!hash) {
        const initialHash = initialMode === 3 ? '#web' : '#design';
        window.history.replaceState(null, '', initialHash);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('indexMode', JSON.stringify(indexMode));
    }
  }, [indexMode]);

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#design') {
        setIndexMode(4);
      } else if (hash === '#web') {
        setIndexMode(3);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="w-full">
        {/* Intro Section */}
        <div className="max-w-[75%] mx-auto pt-8 pb-3">
          <div className="text-xl md:text-2xl font-bold leading-relaxed flex flex-col xl:flex-row text-center justify-center items-center title mr-2">
            My name is Jonathan Pinto and I'm a {' '}
            <span className="ml-2">
              <RoleSelector 
                currentMode={indexMode} 
                changeMode={handleModeChange} 
              />
            </span>
          </div>
        </div>

        {/* Showcase Section */}
        <div className="pt-8">
          {handleShowcaseMode()}
        </div>
      </main>
    </div>
  );
}
