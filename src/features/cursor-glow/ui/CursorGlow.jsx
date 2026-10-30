import {useEffect} from 'react';

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const dot = document.createElement('div');
    const glow = document.createElement('div');
    dot.className = 'cursor-dot';
    glow.className = 'cursor-glow';
    document.body.append(dot, glow);
    let gx = innerWidth / 2,
      gy = innerHeight / 2,
      tx = gx,
      ty = gy;
    let hovering = false;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px)`;
      hovering = !!e.target.closest('a, button, .chip, input, textarea');
      dot.classList.toggle('hovering', hovering);
      glow.classList.toggle('hovering', hovering);
      document.body.classList.add('custom-cursor');
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      glow.style.opacity = '0';
      document.body.classList.remove('custom-cursor');
    };
    const onEnter = () => {
      dot.style.opacity = '';
      glow.style.opacity = '';
    };
    let raf;
    const loop = () => {
      gx += (tx - gx) * 0.16;
      gy += (ty - gy) * 0.16;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      glow.remove();
    };
  }, []);
  return null;
}
