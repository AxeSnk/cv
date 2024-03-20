
export type $CardProperties = React.HTMLAttributes<HTMLElement> & ({
  date: string;
  href: string;
  company: string;
  position: string;
  description: string | React.ReactNode;
  stack: Array<string>;
});