'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HeadProps {
  [key: string]: any;
}

export default function Head(props: HeadProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/head.glb') as any;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        position={[0, 0, 0]}
        geometry={nodes.head3d.geometry}
        material={materials.material_0}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.015, 0.015, 0.015]}
      />
    </group>
  );
}

useGLTF.preload('/head.glb');
