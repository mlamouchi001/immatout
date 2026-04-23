'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface StepperStep {
  id: string;
  label: string;
}

export function Stepper({ steps, currentIndex }: { steps: StepperStep[]; currentIndex: number }) {
  return (
    <ol className="flex items-center gap-3 overflow-x-auto" aria-label="Progression">
      {steps.map((s, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        return (
          <li key={s.id} className="flex items-center gap-3">
            <span
              aria-current={current ? 'step' : undefined}
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                done && 'border-accent bg-accent text-accent-foreground',
                current && 'border-accent text-accent',
                !done && !current && 'border-border text-muted-foreground',
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                'whitespace-nowrap text-sm font-medium',
                (done || current) && 'text-foreground',
                !done && !current && 'text-muted-foreground',
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  'h-px w-6 transition-colors sm:w-10',
                  done ? 'bg-accent' : 'bg-border',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
