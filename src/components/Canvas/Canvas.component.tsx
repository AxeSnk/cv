import { useEffect, useRef, useState } from 'react';

import { $CanvasProperties } from './Canvas.types';

function Canvas(properties: $CanvasProperties): JSX.Element {
  const canvasRef = useRef(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      setContext(ctx);
      resizeCanvas(ctx);

      if (properties.establishContext) {
        properties.establishContext(ctx);
      }
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let frameCount = 0;
    let animationFrameId: number;
    let fpsInterval: number;
    let now: number;
    let then: number;
    let elapsed: number;

    if (context) {
      const render = () => {
        animationFrameId = window.requestAnimationFrame(render);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          frameCount++;
          properties.draw();
        }
      }

      const startRendering = (fps: number) => {
        fpsInterval = 1000 / fps;
        then = Date.now();
        render();
      };

      startRendering(properties.fps);
    }

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [properties.draw, context])

  function resizeCanvas(context: CanvasRenderingContext2D) {
		const canvas = context.canvas;
		const { width, height } = canvas.getBoundingClientRect();

		if (canvas.width !== width || canvas.height !== height) {
			const { devicePixelRatio: ratio = 1 } = window;
			canvas.width = width * ratio;
			canvas.height = height * ratio;
      if (properties.establishCanvasWidth) {
        properties.establishCanvasWidth(canvas.width);
      }
			context.scale(ratio, ratio);

			return true;
		}

		return false;
	}

  return (
    <canvas ref={canvasRef} {...properties}/>
  );
}

export default Canvas;