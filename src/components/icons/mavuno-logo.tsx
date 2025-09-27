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
      <path d="M12 2v20" />
      <path d="M12 12c-2-2.5-4.5-4-6-4" />
      <path d="M12 12c2-2.5 4.5-4 6-4" />
      <path d="M12 16c-2-2.5-4.5-4-6-4" />
      <path d="M12 16c2-2.5 4.5-4 6-4" />
      <path d="M14 10c-1 0-2 1-2 2s1 2 2 2" />
      <path d="M10 14c1 0 2-1 2-2s-1-2-2-2" />
    </svg>
    {showText && <span className="text-xl font-bold text-current">Mavuno</span>}
  </div>
);

export default MavunoLogo;
