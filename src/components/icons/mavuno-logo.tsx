import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

const MavunoLogo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-primary', props.className)}
      {...props}
    >
      <path d="M2 20h20" />
      <path d="M2 16h20" />
      <path d="M9.45 16L6.5 4" />
      <path d="M14.55 16l2.95-12" />
    </svg>
    <span className="text-xl font-bold text-current">Mavuno</span>
  </div>
);

export default MavunoLogo;
