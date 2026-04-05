'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Smiley from './Smiley';

interface CornerAvatarProps {
  onClick?: () => void;
  isActive?: boolean;
}

export default function CornerAvatar({ onClick, isActive }: CornerAvatarProps) {
  return (
    <div
      className={`w-12 h-12 cursor-pointer group ${
        isActive ? 'hover:bg-white' : 'hover:bg-magenta'
      }`}
      style={isActive ? { backgroundColor: '#ff00ff' } : undefined}
      onClick={onClick}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Smiley />
        </Suspense>
      </Canvas>
    </div>
  );
}
