import {useEffect, useRef} from 'react';

/** Появление элемента при попадании во viewport. */
export function Reveal({children, delay = 0, as: Tag = 'div', className = ''}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('revealed');
          io.disconnect();
        }
      },
      {threshold: 0.15},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{transitionDelay: `${delay}ms`}}>
      {children}
    </Tag>
  );
}
