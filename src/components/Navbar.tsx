'use client';

import Link from 'next/link';
import CornerAvatar from './CornerAvatar';

interface NavbarProps {
  onAvatarClick: () => void;
  isAboutOpen: boolean;
}

export default function Navbar({ onAvatarClick, isAboutOpen }: NavbarProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b-0 bg-white"
    >
      <div className="max-w-[75%] mx-auto py-5 flex justify-between items-center">
        <Link href="/">
          <h1 className=" text-lg text-black navbar-title hover:bg-magenta cursor-pointer">
            JONATHAN PINTO
          </h1>
        </Link>
        <CornerAvatar onClick={onAvatarClick} isActive={isAboutOpen} />
      </div>
    </header>
  );
}
