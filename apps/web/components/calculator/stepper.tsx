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
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                done && 'border-primary bg-primary text-primary-foreground',
                current && 'border-primary text-primary',
                !done && !current && 'border-border text-muted-foreground',
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                'whitespace-nowrap text-sm',
                (done || current) && 'text-foreground',
                !done && !current && 'text-muted-foreground',
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn('h-px w-8 transition-colors', done ? 'bg-primary' : 'bg-border')}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
