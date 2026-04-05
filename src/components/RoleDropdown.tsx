'use client';

import { useState, useEffect } from 'react';

interface RoleDropdownProps {
  currentMode: number;
  changeMode: (mode: number) => void;
}

const roles = {
  3: 'web developer',
  4: 'graphic designer',
};

export default function RoleDropdown({ currentMode, changeMode }: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRoleChange = (mode: number) => {
    changeMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 cursor-pointer px-1 text-black"
        style={{ backgroundColor: '#ff00ff' }}
      >
        <span className="underline underline-offset-2 decoration-2">
          {roles[currentMode as keyof typeof roles]}
        </span>
        <span
          className="inline-block transition-transform duration-300 ease-in-out text-base leading-none"
          style={{
            textDecoration: 'none',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Clip wrapper — hides the panel when translated up */}
      <div className="absolute left-0 top-full z-10 overflow-hidden w-max">
        <div
          className={`${mounted ? 'transition-transform duration-500 ease-in-out' : ''} ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {Object.entries(roles).map(([m, role]) => (
            <button
              key={m}
              onClick={() => handleRoleChange(Number(m))}
              className="block w-full px-3 py-2.5 text-left text-black cursor-pointer"
              style={{
                backgroundColor: Number(m) === currentMode ? '#ff00ff' : '#ff00ff',
                borderLeft: Number(m) === currentMode ? '3px solid black' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0.92)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = '';
              }}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
