import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import type { RegionScaleEntry } from '@immatout/data';
import { getRegionsScale } from '@immatout/data';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { RegionExtraContent } from '@/components/seo/region-extra-content';
import { RelatedGuides } from '@/components/seo/related-guides';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import type { FaqEntry } from '@/lib/seo';

const UPDATED = '2026-04-24';
const PUBLISHED = '2026-04-01';

export interface RegionContent {
  slug: string; // e.g. 'ile-de-france'
  regionCode: string; // e.g. 'IDF'
  niceName: string; // e.g. 'Île-de-France' (used in H1 + body)
  shortName?: string; // optional override for title only (e.g. 'PACA' instead of 'Provence-Alpes-Côte d'Azur')
  departments: string; // quick description
  intro: string; // one paragraph of local colour
}

export function makeRegionMetadata(content: RegionContent): Metadata {
  const path = `/carte-grise/${content.slug}`;
  const titleName = content.shortName ?? content.niceName;
  const title = `Carte grise ${titleName} 2026 : prix`;
  const description = `Prix carte grise ${content.niceName} 2026 : tarif cheval fiscal, surcharge IDFM, exemples chiffrés et démarches en ligne ANTS.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
  };
}

/**
 * Shared renderer for the 9 regional pages. Pulls the true tariff and energy
 * coefficients from @immatout/data and computes example Y1 amounts for four
 * typical vehicles.
 */
export function RegionPage({
  content,
  extraContent,
}: {
  content: RegionContent;
  extraContent?: ReactNode;
}) {
  const scale = getRegionsScale(2026);
  const region = scale.regions.find((r: RegionScaleEntry) => r.regionCode === content.regionCode);
  if (!region) throw new Error(`Region ${content.regionCode} not in 2026 scale`);

  const hasIdfm = content.regionCode === 'IDF';
  const idfmRate = scale.idfmSurchargeEurosPerCv;
  const perCv = region.perCvRateEuros + (hasIdfm ? idfmRate : 0);

  const examples = [
    { name: 'Renault Clio TCe 91', cv: 5, energy: 'ESSENCE' as const },
    { name: 'Peugeot 3008 diesel', cv: 8, energy: 'DIESEL' as const },
    { name: 'Tesla Model 3', cv: 11, energy: 'ELECTRIC' as const },
    { name: 'Renault Captur hybride', cv: 6, energy: 'HYBRID' as const },
  ];

  const path = `/carte-grise/${content.slug}`;

  const faq: FaqEntry[] = [
    {
      question: `Quel est le tarif du cheval fiscal en ${content.niceName} en 2026 ?`,
      answer: `Le tarif régional en ${content.niceName} est de ${region.perCvRateEuros} €/CV en 2026${
        hasIdfm
          ? `, auquel s’ajoute la surcharge IDFM de ${idfmRate} €/CV appliquée à l’ensemble de la région francilienne depuis le 1ᵉʳ mars 2026.`
          : '.'
      }`,
    },
    {
      question: `Les véhicules électriques sont-ils exonérés en ${content.niceName} ?`,
      answer: `Oui, les véhicules 100 % électriques et à hydrogène bénéficient d’une exonération totale de la taxe régionale, du malus CO₂ et du malus au poids. Ils ne paient que 13,76 € (Y4 + Y5).`,
    },
    {
      question: `Comment faire sa carte grise en ${content.niceName} ?`,
      answer: `Comme dans toute la France, la demande se fait en ligne sur immatriculation.ants.gouv.fr. Il n’y a plus de guichet en préfecture depuis 2017. Les documents à fournir dépendent de votre cas (neuf, occasion, import).`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: `Carte grise ${content.niceName} 2026`,
            description: `Prix et démarches en ${content.niceName} pour 2026.`,
            path,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([
            { name: 'Carte grise par région', path: '/' },
            { name: content.niceName, path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <ArticleShell
        breadcrumbs={[
          { name: 'Carte grise par région', path: '/' },
          { name: content.niceName, path },
        ]}
        title={`Carte grise en ${content.niceName} : prix 2026 et démarches`}
        lede={content.intro}
        lastUpdated={UPDATED}
      >
        <h2>Tarif régional 2026</h2>
        <ul>
          <li>
            <strong>Cheval fiscal</strong> : {region.perCvRateEuros} €/CV
            {hasIdfm && ` + ${idfmRate} €/CV surcharge IDFM`}
          </li>
          <li>
            <strong>Tarif effectif</strong> : {perCv} €/CV pour les véhicules thermiques
            {hasIdfm && ' en Île-de-France'}
          </li>
          <li>
            <strong>Exonération électrique / hydrogène</strong> : coefficient énergie 0 (0 € de Y1)
          </li>
          <li>
            <strong>Couverture</strong> : {content.departments}
          </li>
        </ul>

        <h2>Exemples chiffrés de carte grise en {content.niceName}</h2>
        <table>
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>CV</th>
              <th>Y1 régionale</th>
              <th>Total carte grise *</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((ex) => {
              const coef = region.energyCoefficients[ex.energy] ?? 1;
              const y1 = Math.round(
                ex.cv * region.perCvRateEuros * coef + (hasIdfm && coef > 0 ? ex.cv * idfmRate : 0),
              );
              const y4y5 = 13.76;
              const isEv = ex.energy === 'ELECTRIC';
              const total = isEv ? y4y5 : y1 + y4y5;
              return (
                <tr key={ex.name}>
                  <td>{ex.name}</td>
                  <td>{ex.cv}</td>
                  <td>{y1.toLocaleString('fr-FR')} €</td>
                  <td>
                    {total.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    €
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground">
          * Total approximatif incluant Y1, Y4 et Y5 uniquement. Pour un véhicule particulier neuf,
          ajouter le malus CO₂ si &gt; 108 g/km et le malus au poids si &gt; 1 500 kg (voir le
          calculateur pour le détail exact).
        </p>

        <h2>Coefficients d’énergie en {content.niceName}</h2>
        <table>
          <thead>
            <tr>
              <th>Énergie</th>
              <th>Coefficient</th>
              <th>Effet</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['ESSENCE', 'Essence'],
                ['DIESEL', 'Diesel'],
                ['ELECTRIC', 'Électrique'],
                ['HYDROGEN', 'Hydrogène'],
                ['HYBRID', 'Hybride (HEV)'],
                ['PHEV', 'Hybride rechargeable'],
                ['GPL', 'GPL'],
                ['E85', 'E85'],
              ] as const
            ).map(([code, label]: readonly [string, string]) => {
              const c = region.energyCoefficients[code] ?? 1;
              return (
                <tr key={code}>
                  <td>{label}</td>
                  <td>{c === 0 ? '0' : c === 1 ? '1,00' : c.toFixed(2)}</td>
                  <td>
                    {c === 0
                      ? 'Exonération totale de Y1'
                      : c === 0.5
                        ? 'Demi-tarif Y1'
                        : 'Tarif plein'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>Démarches en {content.niceName}</h2>
        <p>
          Depuis 2017, la carte grise ne se fait plus en préfecture. Toute demande passe par le
          portail en ligne{' '}
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>
          . Les délais sont identiques sur tout le territoire : certificat provisoire par mail sous
          48 h, carte grise définitive par courrier en 7 à 10 jours.
        </p>

        {extraContent ?? <RegionExtraContent regionCode={content.regionCode} />}

        <RelatedGuides
          links={[
            {
              href: '/guide/taxe-regionale-cheval-fiscal',
              label: 'Taxe régionale',
              desc: 'Comprendre Y1 en détail',
            },
            {
              href: '/guide/calcul-carte-grise-2026',
              label: 'Calcul complet',
              desc: 'Les 6 taxes',
            },
            {
              href: '/referentiels/regions',
              label: 'Comparatif 18 régions',
              desc: 'Tarifs complets',
            },
            {
              href: '/',
              label: 'Calculateur',
              desc: 'Obtenir le chiffre exact',
            },
          ]}
        />
      </ArticleShell>
    </>
  );
}
