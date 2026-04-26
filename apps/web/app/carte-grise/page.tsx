import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Car } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { Card, CardContent } from '@/components/ui/card';
import { breadcrumbJsonLd, articleJsonLd } from '@/lib/seo';

const PATH = '/carte-grise';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-26';
const DESCRIPTION =
  'Prix de la carte grise en 2026 par région et par modèle : 9 régions françaises clés et 6 modèles best-sellers, avec exemples chiffrés et calcul officiel.';

const REGIONS: Array<{ slug: string; name: string; tariff: string }> = [
  { slug: 'ile-de-france', name: 'Île-de-France', tariff: '54,95 + 14 € IDFM/CV' },
  {
    slug: 'auvergne-rhone-alpes',
    name: 'Auvergne-Rhône-Alpes',
    tariff: '43 €/CV (la moins chère)',
  },
  { slug: 'provence-alpes-cote-d-azur', name: 'PACA', tariff: '60 €/CV' },
  { slug: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', tariff: '60 €/CV' },
  { slug: 'occitanie', name: 'Occitanie', tariff: '60 €/CV' },
  { slug: 'hauts-de-france', name: 'Hauts-de-France', tariff: '42 €/CV (coef 0,5 hybrides)' },
  { slug: 'bretagne', name: 'Bretagne', tariff: '60 €/CV (coef 0,5 hybrides/GPL)' },
  { slug: 'pays-de-la-loire', name: 'Pays de la Loire', tariff: '60 €/CV' },
  { slug: 'grand-est', name: 'Grand Est', tariff: '60 €/CV' },
];

const MODELS: Array<{ slug: string; name: string; spec: string }> = [
  { slug: 'tesla-model-y', name: 'Tesla Model Y', spec: '100 % électrique · 13,76 € partout' },
  { slug: 'renault-clio', name: 'Renault Clio', spec: '4-5 CV · essence/hybride/GPL' },
  { slug: 'peugeot-208', name: 'Peugeot 208', spec: '4-5 CV · essence/diesel/électrique' },
  { slug: 'dacia-sandero', name: 'Dacia Sandero', spec: '4-5 CV · essence/GPL' },
  { slug: 'citroen-c3', name: 'Citroën C3', spec: '4-5 CV · essence/électrique ë-C3' },
  { slug: 'renault-captur', name: 'Renault Captur', spec: '5-7 CV · hybride E-Tech populaire' },
];

export const metadata: Metadata = {
  title: 'Carte grise par région et par modèle 2026',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    url: PATH,
    title: 'Carte grise par région et par modèle — Immatout',
    description: DESCRIPTION,
  },
};

export default function CarteGriseIndex() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: 'Carte grise par région et par modèle 2026',
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([{ name: 'Carte grise', path: PATH }]),
        ]}
      />
      <PageHeader
        eyebrow="Carte grise par contexte"
        title="Carte grise par région et par modèle"
        description="Le prix d’une carte grise dépend de votre région et de votre véhicule. Choisissez votre région ou votre modèle ci-dessous pour obtenir un coût indicatif et le détail des taxes 2026."
      />
      <section className="container max-w-5xl space-y-12 py-10 sm:py-12">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Par région</h2>
            <Link
              href="/referentiels/regions"
              className="text-xs text-muted-foreground hover:text-accent"
            >
              Voir le tableau complet des 18 régions →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r) => (
              <Link key={r.slug} href={`/carte-grise/${r.slug}`} className="group">
                <Card className="h-full transition-all hover:border-accent/40 hover:shadow-pop">
                  <CardContent className="flex h-full flex-col gap-2 p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      <MapPin className="mr-1 inline h-3 w-3" aria-hidden /> Région
                    </p>
                    <h3 className="text-base font-semibold group-hover:text-accent">{r.name}</h3>
                    <p className="text-sm text-muted-foreground">{r.tariff}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent">
                      Voir le détail <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Par modèle</h2>
            <Link
              href="/referentiels/catalogue"
              className="text-xs text-muted-foreground hover:text-accent"
            >
              Voir le catalogue 3 250+ motorisations →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <Link key={m.slug} href={`/carte-grise/${m.slug}`} className="group">
                <Card className="h-full transition-all hover:border-accent/40 hover:shadow-pop">
                  <CardContent className="flex h-full flex-col gap-2 p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      <Car className="mr-1 inline h-3 w-3" aria-hidden /> Modèle
                    </p>
                    <h3 className="text-base font-semibold group-hover:text-accent">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.spec}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent">
                      Voir le détail <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
