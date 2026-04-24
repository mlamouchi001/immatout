import Link from 'next/link';
import type { ReactNode } from 'react';
import { Calculator, ScrollText } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { BreadcrumbEntry } from '@/lib/seo';

/**
 * Layout shared across every editorial page (/guide/*, /carte-grise/*, /faq,
 * /lexique, /a-propos). Standardises breadcrumbs, H1, lede, author stripe
 * and the final call-to-action block.
 */
export function ArticleShell({
  breadcrumbs,
  title,
  lede,
  lastUpdated,
  children,
  cta,
}: {
  breadcrumbs: BreadcrumbEntry[];
  title: string;
  lede?: ReactNode;
  lastUpdated?: string;
  children: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <article className="container max-w-3xl py-10 sm:py-12">
      <div className="mb-6 space-y-4">
        <Breadcrumbs entries={breadcrumbs} />
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lede && <p className="text-pretty text-base text-muted-foreground sm:text-lg">{lede}</p>}
        <ByLine lastUpdated={lastUpdated} />
      </div>
      <div className="prose-like space-y-5 text-[0.95rem] leading-relaxed text-foreground/90">
        {children}
      </div>
      <Card className="mt-10 bg-muted/20">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">
              {cta?.label ?? 'Obtenez le montant exact pour votre véhicule'}
            </p>
            <p className="text-xs text-muted-foreground">
              Calcul en 30 secondes, barèmes LF 2026 à jour.
            </p>
          </div>
          <Button asChild variant="accent">
            <Link href={cta?.href ?? '/'}>
              <Calculator className="h-4 w-4" />
              Calculer ma carte grise
            </Link>
          </Button>
        </CardContent>
      </Card>
    </article>
  );
}

function ByLine({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <ScrollText className="h-3 w-3" aria-hidden />
        Équipe Immatout
      </span>
      {lastUpdated && (
        <>
          <span aria-hidden>·</span>
          <span>
            Mis à jour le{' '}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </span>
        </>
      )}
      <span aria-hidden>·</span>
      <span>
        Sources :{' '}
        <a
          href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044595989/LEGISCTA000044599003/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          CIBS
        </a>
        ,{' '}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F36199"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          service-public.gouv.fr
        </a>
      </span>
    </div>
  );
}
