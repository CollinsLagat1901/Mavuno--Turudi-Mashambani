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
        <path d="M2 22a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2zM20 16.3A5.4 5.4 0 0 0 17.5 15a5.4 5.4 0 0 0-2.5 1.3A5.4 5.4 0 0 0 12.5 15a5.4 5.4 0 0 0-2.5 1.3A5.4 5.4 0 0 0 7.5 15a5.4 5.4 0 0 0-2.5 1.3V10c0-4.4 3-8 7-8s7 3.6 7 8v6.3z" />
        <path d="M11.5 2c0 2.8.8 5.2 2.5 7" />
    </svg>
    {showText && <span className="text-xl font-bold text-current">Mavuno</span>}
  </div>
);

export default MavunoLogo;
