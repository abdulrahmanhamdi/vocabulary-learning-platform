// components/progress-bar.tsx
'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2.5" />
    </div>
  );
}
