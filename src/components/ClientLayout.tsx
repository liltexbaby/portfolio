'use client';

import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import AboutOverlay from './AboutOverlay';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  const handleCloseAbout = () => {
    setIsAboutOpen(false);
  };

  return (
    <>
      <Navbar onAvatarClick={handleAvatarClick} isAboutOpen={isAboutOpen} />
      {children}
      <AboutOverlay isOpen={isAboutOpen} onClose={handleCloseAbout} />
    </>
  );
}
