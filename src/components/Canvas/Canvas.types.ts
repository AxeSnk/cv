
export type $CanvasProperties = React.HTMLAttributes<HTMLElement> & ({
  fps: 30;
  draw: () => void;
  establishContext?: (context: CanvasRenderingContext2D) => void;
  establishCanvasWidth?: (width: number) => void;
});