import {useEffect, useMemo, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {Robot} from './Robot';
import {pointer, subscribePointer} from '../model/pointer';
import {useThemeAttr} from '../../../shared/lib/useThemeAttr';

function Particles({theme}) {
  const ref = useRef();
  const positions = useMemo(() => {
    const n = 420;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = -Math.random() * 10 - 1;
    }
    return arr;
  }, []);

  useFrame((state, dt) => {
    const p = ref.current;
    p.rotation.y += dt * 0.015;
    // параллакс от курсора и от скролла страницы
    const scroll = window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1);
    p.position.x = THREE.MathUtils.damp(p.position.x, -pointer.x * 0.4, 2, dt);
    p.position.y = THREE.MathUtils.damp(p.position.y, -pointer.y * 0.25 + scroll * 3, 2, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={theme === 'dark' ? 0.7 : 0.45}
        color={theme === 'dark' ? '#93c5fd' : '#2563eb'}
        depthWrite={false}
      />
    </points>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

/** Фиксированный 3D-фон с роботом, который следит за курсором. */
export function RobotBackground() {
  const theme = useThemeAttr();
  const [supported] = useState(hasWebGL);

  useEffect(() => subscribePointer(), []);

  if (!supported) return null;

  return (
    <div className="robot-bg" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{position: [0, 0, 7], fov: 40}}
        gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}
        eventSource={undefined}
        style={{pointerEvents: 'none'}}
      >
        <ambientLight intensity={theme === 'dark' ? 0.55 : 0.9} />
        <directionalLight position={[4, 6, 5]} intensity={theme === 'dark' ? 1.6 : 2} />
        <directionalLight position={[-5, 2, -4]} intensity={1.2} color={theme === 'dark' ? '#a78bfa' : '#93c5fd'} />
        <hemisphereLight args={[theme === 'dark' ? '#60a5fa' : '#ffffff', '#0f1420', 0.4]} />
        <Particles theme={theme} />
        <Robot theme={theme} />
      </Canvas>
    </div>
  );
}
