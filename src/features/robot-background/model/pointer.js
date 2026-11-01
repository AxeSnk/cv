/** Общее (мутируемое) состояние курсора — читается в useFrame без ре-рендеров React. */
export const pointer = {
  x: 0, // NDC -1..1
  y: 0,
  active: false,
  hovering: false,
  lastMove: 0,
};

export function subscribePointer() {
  const onMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.active = true;
    pointer.lastMove = performance.now();
    pointer.hovering = !!(e.target instanceof Element && e.target.closest('a, button, .chip, .sphere-tag'));
  };
  const onLeave = () => {
    pointer.active = false;
    pointer.hovering = false;
  };
  window.addEventListener('pointermove', onMove, {passive: true});
  document.documentElement.addEventListener('mouseleave', onLeave);
  return () => {
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('mouseleave', onLeave);
  };
}
