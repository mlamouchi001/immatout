import type { ReactNode } from 'react';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  type BreadcrumbEntry,
  type FaqEntry,
} from '@/lib/seo';

/**
 * Wraps the shell + JSON-LD (Article + BreadcrumbList + optional FAQPage)
 * so each guide only has to declare its metadata + body.
 */
export function GuidePage({
  title,
  lede,
  path,
  datePublished,
  dateModified,
  breadcrumbs,
  description,
  faq,
  children,
}: {
  title: string;
  lede?: ReactNode;
  path: string;
  datePublished: string;
  dateModified?: string;
  breadcrumbs: BreadcrumbEntry[];
  description: string;
  faq?: FaqEntry[];
  children: ReactNode;
}) {
  const ld: Record<string, unknown>[] = [
    articleJsonLd({ title, description, path, datePublished, dateModified }),
    breadcrumbJsonLd(breadcrumbs),
  ];
  if (faq && faq.length > 0) ld.push(faqJsonLd(faq));

  return (
    <>
      <JsonLd data={ld} />
      <ArticleShell
        breadcrumbs={breadcrumbs}
        title={title}
        lede={lede}
        lastUpdated={dateModified ?? datePublished}
      >
        {children}
      </ArticleShell>
    </>
  );
}
