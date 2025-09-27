import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface MavunoLogoProps extends SVGProps<SVGSVGElement> {
    showText?: boolean;
}

const MavunoLogo = ({ showText = true, ...props }: MavunoLogoProps) => (
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
        <path d="M2 22s10-3 10-10S2 2 2 2"/>
        <path d="M22 22s-10-3-10-10S22 2 22 2"/>
    </svg>
    {showText && <span className="text-xl font-bold text-current">Mavuno</span>}
  </div>
);

export default MavunoLogo;
