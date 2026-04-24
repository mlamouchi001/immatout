import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

import type { BreadcrumbEntry } from '@/lib/seo';

/**
 * Visual breadcrumb; pair it with a BreadcrumbList JSON-LD on the same page
 * for Google to pick up the hierarchy.
 */
export function Breadcrumbs({ entries }: { entries: BreadcrumbEntry[] }) {
  return (
    <nav
      aria-label="Fil d'ariane"
      className="flex items-center gap-1 text-xs text-muted-foreground"
    >
      <Link href="/" className="flex items-center gap-1 hover:text-foreground">
        <Home className="h-3 w-3" aria-hidden />
        <span className="sr-only">Accueil</span>
      </Link>
      {entries.map((e, i) => {
        const isLast = i === entries.length - 1;
        return (
          <span key={e.path} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" aria-hidden />
            {isLast ? (
              <span className="text-foreground">{e.name}</span>
            ) : (
              <Link href={e.path} className="hover:text-foreground">
                {e.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
