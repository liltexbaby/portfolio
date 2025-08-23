'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Smiley from './Smiley';

interface CornerAvatarProps {
  onClick?: () => void;
}

export default function CornerAvatar({ onClick }: CornerAvatarProps) {
  return (
    <div 
      className="w-12 h-12 cursor-pointer hover:bg-magenta transition-colors duration-200 rounded"
      onClick={onClick}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Smiley />
        </Suspense>
      </Canvas>
    </div>
  );
}
