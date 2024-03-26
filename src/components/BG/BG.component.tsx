import { useState } from 'react';

import { Canvas } from '..';
import { $BGProperties } from './BG.types';

function BG(properties: $BGProperties): JSX.Element {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ";
  const letters = chars.split("");
  const fontSize = 10;
  const columns = canvasWidth ? canvasWidth / fontSize : 10;
  const drops: Array<number> = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  let disturbanceRow = -1;
  let disturbanceCol = -1;
  let timeout: number;

  function draw() {
    if (ctx) {
      ctx!.fillStyle = "rgba(8, 47, 73, .1)";
      ctx!.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx!.fillStyle = "#0f0";
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        if (isDisturbanceAffectedPosition(i)) {
          const h = Math.max(i - 1, 0);
          const j = Math.min(i + 1, Math.floor(columns));
          drops[h] = disturbanceRow;
          drops[i] = disturbanceRow;
          drops[j] = disturbanceRow;
        }
      }
    }
  }

  function establishContext(context: CanvasRenderingContext2D) {
    setCtx(context);
  }

  function establishCanvasWidth(width: number) {
    setCanvasWidth(width);
  }

  function disturbanceEffect(e: React.MouseEvent<HTMLCanvasElement>) {
    clearTimeout(timeout);
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const { row, col } = convertMousePosToRowsAndCols(x, y);
    disturbanceRow = row;
    disturbanceCol = col;
    timeout = setTimeout(() => {
        disturbanceRow = -1;
        disturbanceCol = -1;
    }, 50);
  }


  function convertMousePosToRowsAndCols(x: number, y: number) {
    const col = Math.floor(x / fontSize);
    const row = Math.min(Math.ceil(y / fontSize), Math.floor(ctx!.canvas.height));

    return { row, col };
  }

  function isDisturbanceAffectedPosition(dropIndex: number) {
    return drops[dropIndex] * fontSize > disturbanceRow && dropIndex === disturbanceCol;
  }

  return <Canvas fps={30} draw={draw} onMouseMove={disturbanceEffect} establishContext={establishContext} establishCanvasWidth={establishCanvasWidth} {...properties}/>
}

export default BG;
