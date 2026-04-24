/**
 * Shared SEO helpers: canonical base URL, schema.org JSON-LD builders,
 * and breadcrumb-URL normalisation. Centralised so every page injects
 * consistent structured data.
 */

export const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://immatcalc.fr').replace(
  /\/$/,
  '',
);

export const ORG_NAME = 'Immatout';
export const ORG_DESCRIPTION =
  'Simulateur officiel du coût de la carte grise en France, conforme à la Loi de Finances 2026.';
export const ORG_LAUNCHED = '2026-04-01';

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ---------------------------------------------------------------------------
// schema.org JSON-LD helpers
// ---------------------------------------------------------------------------

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export interface ArticleMeta {
  title: string;
  description: string;
  path: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: BASE_URL,
    description: ORG_DESCRIPTION,
    foundingDate: ORG_LAUNCHED,
    sameAs: [],
  };
}

export function webApplicationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: ORG_NAME,
    url: BASE_URL,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    description: ORG_DESCRIPTION,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'fr-FR',
    datePublished: ORG_LAUNCHED,
  };
}

export function faqJsonLd(entries: FaqEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  };
}

export function breadcrumbJsonLd(entries: BreadcrumbEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      item: absoluteUrl(e.path),
    })),
  };
}

export function articleJsonLd(meta: ArticleMeta): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    author: { '@type': 'Organization', name: ORG_NAME },
    mainEntityOfPage: absoluteUrl(meta.path),
  };
}
