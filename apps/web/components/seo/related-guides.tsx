import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RelatedLink {
  href: string;
  label: string;
  desc: string;
}

/**
 * Renders a 2-col grid of related article links. Used at the bottom of each
 * editorial page to pass link-juice across the topical cluster (SEO internal
 * linking).
 */
export function RelatedGuides({
  title = 'Pour aller plus loin',
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-start justify-between gap-3 rounded-lg border border-border/70 bg-muted/10 p-4 transition-all hover:border-accent/40 hover:bg-muted/30"
          >
            <div>
              <p className="text-sm font-medium group-hover:text-foreground">{l.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{l.desc}</p>
            </div>
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
