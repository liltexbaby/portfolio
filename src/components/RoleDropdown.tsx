'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RoleDropdownProps {
  currentMode: number;
  changeMode: (mode: number) => void;
}

const roles = {
  3: 'web developer',
  4: 'graphic designer',
  // Removed fine artist and print seller as requested
};

export default function RoleDropdown({ currentMode, changeMode }: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (mode: number) => {
    changeMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ml-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center underline-link cursor-pointer hover:bg-purple-400 transition-colors duration-200 px-1"
      >
        <span className="font-bold">{roles[currentMode as keyof typeof roles]}</span>
        <div className="ml-2">
          <Image src="/img/downArrow.png" alt="dropdown arrow" width={10} height={10} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-0 bg-white z-10 overflow-hidden">
          {Object.entries(roles).map(([m, role]) => (
            <button
              key={m}
              onClick={() => handleRoleChange(Number(m))}
              className={`block w-full px-2.5 py-2.5 text-left bg-magenta border border-black border-transparent hover:bg-purple-400 hover:border-black hover:border-solid transition-colors duration-150 ${
                Number(m) === currentMode ? 'bg-purple-400' : ''
              }`}
              style={{
                backgroundColor: 'magenta',
                borderWidth: Number(m) === currentMode ? '3px' : '0px',
                borderColor: 'black',
                borderStyle: 'solid',
              }}
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
