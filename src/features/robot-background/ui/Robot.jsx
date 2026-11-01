import {useMemo, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {pointer} from '../model/pointer';

const {damp, clamp} = THREE.MathUtils;

/** Скруглённый параллелепипед через Extrude + bevel (без зависимостей от drei). */
function roundedBox(w, h, d, r) {
  const iw = w - 2 * r;
  const ih = h - 2 * r;
  const cr = Math.min(iw, ih) * 0.2;
  const s = new THREE.Shape();
  const x = -iw / 2;
  const y = -ih / 2;
  s.moveTo(x + cr, y);
  s.lineTo(x + iw - cr, y);
  s.quadraticCurveTo(x + iw, y, x + iw, y + cr);
  s.lineTo(x + iw, y + ih - cr);
  s.quadraticCurveTo(x + iw, y + ih, x + iw - cr, y + ih);
  s.lineTo(x + cr, y + ih);
  s.quadraticCurveTo(x, y + ih, x, y + ih - cr);
  s.lineTo(x, y + cr);
  s.quadraticCurveTo(x, y, x + cr, y);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(d - 2 * r, 0.001),
    bevelEnabled: true,
    bevelSize: r,
    bevelThickness: r,
    bevelSegments: 5,
    curveSegments: 8,
  });
  g.center();
  g.computeVertexNormals();
  return g;
}

const PALETTE = {
  dark: {shell: '#d5dcea', joint: '#3a4560', visor: '#070b16', accent: '#60a5fa', accent2: '#a78bfa'},
  light: {shell: '#ffffff', joint: '#8a96ad', visor: '#0f172a', accent: '#2563eb', accent2: '#7c3aed'},
};

const tmpV = new THREE.Vector3();
const tmpRay = new THREE.Vector3();
const tmpHit = new THREE.Vector3();
const LOOK_PLANE_Z = 2.6; // плоскость перед роботом, куда "проецируем" курсор

export function Robot({theme}) {
  const root = useRef();
  const body = useRef();
  const head = useRef();
  const eyes = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const armL = useRef();
  const armR = useRef();
  const ring = useRef();
  const cursorLight = useRef();
  const blink = useRef({next: 2, until: 0});

  const geo = useMemo(
    () => ({
      head: roundedBox(1.5, 1.15, 1.2, 0.26),
      visor: roundedBox(1.22, 0.76, 0.12, 0.05),
      torso: roundedBox(1.2, 1.25, 0.9, 0.32),
      chest: roundedBox(0.62, 0.42, 0.06, 0.02),
      mouth: roundedBox(0.3, 0.05, 0.03, 0.012),
    }),
    [],
  );

  const mat = useMemo(() => {
    const c = PALETTE[theme] || PALETTE.dark;
    return {
      shell: new THREE.MeshStandardMaterial({color: c.shell, metalness: 0.25, roughness: 0.32}),
      joint: new THREE.MeshStandardMaterial({color: c.joint, metalness: 0.7, roughness: 0.35}),
      visor: new THREE.MeshStandardMaterial({color: c.visor, metalness: 0.6, roughness: 0.12}),
      glow: new THREE.MeshStandardMaterial({color: c.accent, emissive: c.accent, emissiveIntensity: 2.2, toneMapped: false}),
      glow2: new THREE.MeshStandardMaterial({color: c.accent2, emissive: c.accent2, emissiveIntensity: 1.6, toneMapped: false}),
      ring: new THREE.MeshStandardMaterial({
        color: c.accent,
        emissive: c.accent,
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0.75,
        toneMapped: false,
      }),
      accent: c.accent,
    };
  }, [theme]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const {camera, viewport, size} = state;
    dt = Math.min(dt, 0.05);

    // --- размещение: в правом "поле" вокруг колонки контента ---
    const vp = viewport.getCurrentViewport(camera, [0, 0, 0]);
    const contentPx = 900;
    const gutterPx = (size.width - contentPx) / 2;
    let x;
    let scale;
    if (gutterPx > 220) {
      const centerPx = size.width - gutterPx / 2;
      x = (centerPx / size.width - 0.5) * vp.width;
      scale = clamp(((gutterPx / size.width) * vp.width) / 2.1, 0.55, 0.95);
    } else {
      x = vp.width * 0.28;
      scale = 0.6;
    }
    root.current.position.x = damp(root.current.position.x, x, 4, dt);
    root.current.scale.setScalar(damp(root.current.scale.x, scale * 0.8, 4, dt));
    root.current.position.y = -0.35 + Math.sin(t * 1.4) * 0.08;

    // --- куда смотреть ---
    const idle = !pointer.active || performance.now() - pointer.lastMove > 4500;
    let px = pointer.x;
    let py = pointer.y;
    if (idle) {
      px = Math.sin(t * 0.45) * 0.7 + Math.sin(t * 1.3) * 0.1;
      py = Math.sin(t * 0.33) * 0.35;
    }
    // луч из камеры через курсор -> пересечение с плоскостью z = LOOK_PLANE_Z
    tmpRay.set(px, py, 0.5).unproject(camera).sub(camera.position).normalize();
    const k = (LOOK_PLANE_Z - camera.position.z) / tmpRay.z;
    tmpHit.copy(camera.position).addScaledVector(tmpRay, k);

    head.current.getWorldPosition(tmpV);
    const dir = tmpHit.sub(tmpV);
    const yaw = clamp(Math.atan2(dir.x, dir.z), -1.1, 1.1);
    const pitch = clamp(Math.atan2(-dir.y, Math.hypot(dir.x, dir.z)), -0.55, 0.6);

    // тело чуть доворачивается, голова — основная часть поворота
    body.current.rotation.y = damp(body.current.rotation.y, yaw * 0.3, 3, dt);
    head.current.rotation.y = damp(head.current.rotation.y, yaw - body.current.rotation.y, 7, dt);
    head.current.rotation.x = damp(head.current.rotation.x, pitch, 7, dt);
    head.current.rotation.z = damp(head.current.rotation.z, -yaw * 0.08 + Math.sin(t * 0.9) * 0.02, 4, dt);

    // глаза немного "бегают" вслед за взглядом
    eyes.current.position.x = damp(eyes.current.position.x, yaw * 0.05, 10, dt);
    eyes.current.position.y = damp(eyes.current.position.y, -pitch * 0.06, 10, dt);

    // моргание + реакция на ссылки/кнопки
    const b = blink.current;
    if (t > b.next) {
      b.until = t + 0.13;
      b.next = t + 2.5 + Math.random() * 3;
    }
    const excited = pointer.hovering && !idle;
    const eyeScale = excited ? 1.3 : 1;
    const sy = t < b.until ? 0.12 : eyeScale;
    for (const e of [eyeL.current, eyeR.current]) {
      e.scale.y = damp(e.scale.y, sy, 30, dt);
      e.scale.x = damp(e.scale.x, eyeScale, 12, dt);
    }
    mat.glow.emissiveIntensity = damp(mat.glow.emissiveIntensity, excited ? 4 : 2.2 + Math.sin(t * 3) * 0.3, 6, dt);

    // руки: покачивание, а при наведении на ссылку — машет
    armL.current.rotation.z = damp(armL.current.rotation.z, -0.18 - Math.sin(t * 1.4) * 0.06, 5, dt);
    const wave = excited ? 2.5 + Math.sin(t * 11) * 0.3 : 0.18 + Math.sin(t * 1.4 + 1) * 0.06;
    armR.current.rotation.z = damp(armR.current.rotation.z, wave, 6, dt);

    ring.current.rotation.z = t * 0.8;
    ring.current.scale.setScalar(1 + Math.sin(t * 2.8) * 0.05);

    // подсветка, следующая за курсором
    cursorLight.current.position.set(tmpHit.x + tmpV.x, tmpHit.y + tmpV.y, LOOK_PLANE_Z);
  });

  return (
    <>
      <pointLight ref={cursorLight} color={mat.accent} intensity={6} distance={7} decay={1.6} />
      <group ref={root}>
        <group ref={body}>
          {/* торс */}
          <mesh geometry={geo.torso} material={mat.shell} />
          <mesh geometry={geo.chest} material={mat.visor} position={[0, 0.12, 0.46]} />
          <mesh material={mat.glow} position={[-0.16, 0.12, 0.5]}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          <mesh material={mat.glow2} position={[0, 0.12, 0.5]}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          <mesh material={mat.glow} position={[0.16, 0.12, 0.5]}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>

          {/* руки */}
          <group ref={armL} position={[-0.72, 0.38, 0]}>
            <mesh material={mat.joint}>
              <sphereGeometry args={[0.17, 20, 20]} />
            </mesh>
            <mesh material={mat.shell} position={[0, -0.42, 0]}>
              <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
            </mesh>
            <mesh material={mat.joint} position={[0, -0.85, 0]}>
              <sphereGeometry args={[0.15, 20, 20]} />
            </mesh>
          </group>
          <group ref={armR} position={[0.72, 0.38, 0]}>
            <mesh material={mat.joint}>
              <sphereGeometry args={[0.17, 20, 20]} />
            </mesh>
            <mesh material={mat.shell} position={[0, -0.42, 0]}>
              <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
            </mesh>
            <mesh material={mat.joint} position={[0, -0.85, 0]}>
              <sphereGeometry args={[0.15, 20, 20]} />
            </mesh>
          </group>

          {/* "реактивный" низ */}
          <mesh material={mat.joint} position={[0, -0.72, 0]}>
            <cylinderGeometry args={[0.3, 0.18, 0.2, 24]} />
          </mesh>
          <mesh material={mat.glow} position={[0, -0.86, 0]}>
            <sphereGeometry args={[0.13, 20, 20]} />
          </mesh>
          <mesh ref={ring} material={mat.ring} position={[0, -1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.025, 12, 64]} />
          </mesh>

          {/* шея */}
          <mesh material={mat.joint} position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.16, 0.2, 0.22, 20]} />
          </mesh>

          {/* голова (pivot на шее) */}
          <group ref={head} position={[0, 0.8, 0]}>
            <group position={[0, 0.62, 0]}>
              <mesh geometry={geo.head} material={mat.shell} />
              <mesh geometry={geo.visor} material={mat.visor} position={[0, 0.02, 0.6]} />
              <group ref={eyes} position={[0, 0, 0]}>
                <mesh ref={eyeL} material={mat.glow} position={[-0.27, 0.07, 0.68]}>
                  <capsuleGeometry args={[0.085, 0.13, 6, 16]} />
                </mesh>
                <mesh ref={eyeR} material={mat.glow} position={[0.27, 0.07, 0.68]}>
                  <capsuleGeometry args={[0.085, 0.13, 6, 16]} />
                </mesh>
              </group>
              <mesh geometry={geo.mouth} material={mat.glow2} position={[0, -0.22, 0.67]} />
              {/* уши */}
              <mesh material={mat.joint} position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.14, 24]} />
              </mesh>
              <mesh material={mat.joint} position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.14, 24]} />
              </mesh>
              {/* антенна */}
              <mesh material={mat.joint} position={[0, 0.74, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.32, 8]} />
              </mesh>
              <mesh material={mat.glow2} position={[0, 0.93, 0]}>
                <sphereGeometry args={[0.075, 16, 16]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}
