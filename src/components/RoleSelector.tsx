'use client';

interface RoleSelectorProps {
  currentMode: number;
  changeMode: (mode: number) => void;
}

export default function RoleSelector({ currentMode, changeMode }: RoleSelectorProps) {
  return (
    <span className="inline-flex items-center">
      <button
        onClick={() => changeMode(3)}
        className="cursor-pointer underline underline-offset-2 decoration-2 px-1 text-black hover:text-black"
        style={{
          backgroundColor: currentMode === 3 ? '#ff00ff' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 3) {
            e.currentTarget.style.backgroundColor = '#ff00ff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 3) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        web developer
      </button>
      <span className="text-black px-2"> and </span>
      <button
        onClick={() => changeMode(4)}
        className="cursor-pointer underline underline-offset-2 decoration-2 px-1 text-black hover:text-black"
        style={{
          backgroundColor: currentMode === 4 ? '#ff00ff' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 4) {
            e.currentTarget.style.backgroundColor = '#ff00ff';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 4) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        graphic designer
      </button>
    </span>
  );
}
