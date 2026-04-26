import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { Card, CardContent } from '@/components/ui/card';
import { breadcrumbJsonLd, articleJsonLd } from '@/lib/seo';

const PATH = '/guide';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-26';
const DESCRIPTION =
  '10 guides officiels pour comprendre le calcul, le malus CO₂, le malus poids, la décote, l’import UE et hors UE, et toutes les démarches carte grise 2026 en France.';

const GUIDES: Array<{
  href: string;
  title: string;
  desc: string;
  topic: string;
}> = [
  {
    href: '/guide/calcul-carte-grise-2026',
    title: 'Calcul carte grise 2026',
    desc: 'Méthode officielle des 6 taxes (Y1 à Y6), formule CIBS, 4 exemples chiffrés.',
    topic: 'Calcul',
  },
  {
    href: '/guide/malus-co2-2026',
    title: 'Malus CO₂ 2026',
    desc: 'Barème WLTP : seuil 108 g/km, plafond 80 000 €, paliers détaillés.',
    topic: 'Malus',
  },
  {
    href: '/guide/malus-poids-2026',
    title: 'Malus au poids 2026 (TMOM)',
    desc: 'Seuil 1500 kg, 5 tranches progressives, abattements famille / 8 places / hybride.',
    topic: 'Malus',
  },
  {
    href: '/guide/taxe-regionale-cheval-fiscal',
    title: 'Taxe régionale (Y1)',
    desc: 'Tarif du cheval fiscal par région, surcharge IDFM, décote 50 % après 10 ans.',
    topic: 'Tarifs',
  },
  {
    href: '/guide/cheval-fiscal-explication',
    title: 'Cheval fiscal (CV)',
    desc: 'Définition, formule officielle 2020+, où le trouver sur la carte grise (case P.6).',
    topic: 'Tarifs',
  },
  {
    href: '/guide/carte-grise-vehicule-electrique',
    title: 'Carte grise voiture électrique',
    desc: 'Pourquoi 13,76 € pour une Tesla, Zoé, ID.3 — exonération totale Y1, Y3, Y6 sur 2026-2028.',
    topic: 'Cas spéciaux',
  },
  {
    href: '/guide/carte-grise-occasion-france',
    title: 'Occasion française',
    desc: 'Pas de Y3 ni Y6 (déjà payés). Décote 50 % sur Y1 après 10 ans. Démarche en 6 étapes.',
    topic: 'Démarches',
  },
  {
    href: '/guide/carte-grise-import-ue',
    title: 'Import UE',
    desc: 'Quitus fiscal, COC, décote 12 tiers Y3/Y6 selon âge. Exemple BMW 320i 2019.',
    topic: 'Démarches',
  },
  {
    href: '/guide/carte-grise-import-hors-ue',
    title: 'Import hors UE',
    desc: 'Droits de douane 10 %, TVA 20 %, attestation 846A, RTI DREAL. Exemple Tesla US.',
    topic: 'Démarches',
  },
  {
    href: '/guide/documents-carte-grise',
    title: 'Documents requis',
    desc: 'Cerfa 13750, 15776, non-gage, contrôle technique, par cas d’immatriculation.',
    topic: 'Démarches',
  },
];

export const metadata: Metadata = {
  title: 'Guides carte grise 2026 : 10 articles officiels',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Guides carte grise 2026 — Immatout', description: DESCRIPTION },
};

export default function GuidesIndex() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'Guides carte grise 2026',
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'Guides', path: PATH }]),
        ]}
      />
      <PageHeader
        eyebrow="Guides Immatout"
        title="Guides carte grise 2026"
        description="10 articles pour comprendre tous les aspects du coût d’une carte grise en France : calcul officiel, malus, décote, import, démarches. Sources : Légifrance, service-public.gouv.fr, ADEME."
      />
      <section className="container max-w-5xl py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="group">
              <Card className="h-full transition-all hover:border-accent/40 hover:shadow-pop">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <BookOpen className="mr-1 inline h-3 w-3" aria-hidden /> {g.topic}
                  </p>
                  <h2 className="text-base font-semibold leading-snug group-hover:text-accent">
                    {g.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-accent">
                    Lire le guide <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
