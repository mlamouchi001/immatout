import type { ReactNode } from 'react';

/**
 * Shared page header for secondary pages (compare, documents, mentions).
 * Keeps the home hero unique while giving every other page the same
 * eyebrow + title + lede structure.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-muted/20">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-eyebrow">{eyebrow}</p>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && (
              <p className="text-pretty text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
