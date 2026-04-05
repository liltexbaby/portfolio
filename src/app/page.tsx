'use client';

import { useState, useEffect } from 'react';
import RoleSelector from '@/components/RoleSelector';
import RoleDropdown from '@/components/RoleDropdown';
import WebDevShowcase from '@/components/WebDevShowcase';
import DesignShowcase from '@/components/DesignShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  const [indexMode, setIndexMode] = useState(3); // Default to web developer

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
          <div className="text-xl md:text-2xl font-bold leading-relaxed flex flex-col xl:flex-row text-left justify-start items-start title mr-2">
            <span>My name is Jonathan Pinto and I&apos;m a</span>
            <span className="ml-0 mt-2 md:mt-0 md:ml-2 hidden md:inline-flex">
              <RoleSelector currentMode={indexMode} changeMode={handleModeChange} />
            </span>
            <span className="ml-0 mt-2 md:hidden">
              <RoleDropdown currentMode={indexMode} changeMode={handleModeChange} />
            </span>
          </div>
        </div>

        {/* Showcase Section */}
        <div className="pt-2">{handleShowcaseMode()}</div>
      </main>

      <Footer />
    </div>
  );
}
