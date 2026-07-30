// components/ui/tooltip.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2.5 py-1 text-xs text-popover-foreground shadow-md border animate-in fade-in-0 zoom-in-95 z-50',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
