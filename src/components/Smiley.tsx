'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface SmileyProps {
  [key: string]: any;
}

export default function Smiley(props: SmileyProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/smiley.glb') as any;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve001.geometry}
        material={materials.SVGMat}
        position={[0, 0, 0]}
        rotation={[1.55, -0.02, 0.4]}
        scale={[120, 120, 120]}
      />
    </group>
  );
}

useGLTF.preload('/smiley.glb');
