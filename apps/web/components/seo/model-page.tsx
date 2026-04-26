import type { Metadata } from 'next';
import Link from 'next/link';

import { ArticleShell } from '@/components/seo/article-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { RelatedGuides } from '@/components/seo/related-guides';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, type FaqEntry } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

const UPDATED = '2026-04-24';
const PUBLISHED = '2026-04-01';

export interface ModelContent {
  slug: string;
  make: string;
  model: string;
  niceName: string;
  intro: string;
  isEv?: boolean;
}

export function makeModelMetadata(content: ModelContent): Metadata {
  const path = `/carte-grise/${content.slug}`;
  const title = `Carte grise ${content.niceName} 2026 : prix`;
  const description = content.isEv
    ? `Carte grise ${content.niceName} 2026 : 13,76 € partout en France (véhicule électrique exonéré de Y1, Y3, Y6).`
    : `Prix carte grise ${content.niceName} 2026 pour chaque motorisation, calcul par région (Paris, Lyon, Marseille…), malus CO₂ et poids.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
  };
}

/**
 * Renders a model-centric SEO page. Tries to pull the real trims list from
 * the production catalog via Prisma; falls back to a textual explanation if
 * no data is available yet.
 */
export async function ModelPage({ content }: { content: ModelContent }) {
  const trims = await prisma.catalogTrim.findMany({
    where: {
      model: {
        name: content.model.toUpperCase(),
        make: { name: content.make.toUpperCase() },
      },
    },
    orderBy: [{ fiscalCv: 'asc' }, { label: 'asc' }],
    take: 20,
  });

  const path = `/carte-grise/${content.slug}`;

  const faq: FaqEntry[] = [
    {
      question: `Combien coûte la carte grise d’une ${content.niceName} en 2026 ?`,
      answer: content.isEv
        ? `13,76 € partout en France — la ${content.niceName} est 100 % électrique, elle est exonérée de la taxe régionale, du malus CO₂ et du malus au poids.`
        : `Le prix dépend de votre région et de la motorisation. Comptez entre 200 € (petite essence en ARA) et 1 500 € (diesel 8 CV en Île-de-France) pour un modèle neuf. Utilisez le calculateur pour obtenir le chiffre exact.`,
    },
    {
      question: `Quelle motorisation a la carte grise la moins chère ?`,
      answer: content.isEv
        ? `Toutes les versions de la ${content.niceName} coûtent le même prix : 13,76 € (exonération EV).`
        : `Les versions hybrides bénéficient souvent d’un abattement de 100 kg sur le malus au poids (et parfois d’un coefficient 0,5 sur Y1 en Bretagne, Hauts-de-France, Corse). À CV fiscaux égaux, la version hybride revient donc 10 à 20 % moins chère à immatriculer.`,
    },
    {
      question: `La ${content.niceName} est-elle soumise au malus au poids ?`,
      answer: content.isEv
        ? `Non, les véhicules 100 % électriques sont exonérés du malus au poids sur 2026-2028.`
        : `Cela dépend de la masse en ordre de marche. Le seuil est de 1500 kg en 2026. La plupart des versions petites essence passent en dessous ; les versions diesel lourdes, les 4x4 et les finitions hauts de gamme le dépassent.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: `Carte grise ${content.niceName} 2026 : prix par motorisation`,
            description: `Prix de la carte grise d’une ${content.niceName} en 2026 : motorisations détaillées, régions, malus.`,
            path,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          breadcrumbJsonLd([
            { name: 'Carte grise par modèle', path: '/' },
            { name: content.niceName, path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <ArticleShell
        breadcrumbs={[
          { name: 'Carte grise par modèle', path: '/' },
          { name: content.niceName, path },
        ]}
        title={`Carte grise ${content.niceName} — prix 2026`}
        lede={content.intro}
        lastUpdated={UPDATED}
      >
        <h2>Motorisations disponibles</h2>
        {trims.length === 0 ? (
          <p>
            Catalogue ADEME + EEA en cours de mise à jour pour ce modèle. Utilisez le calculateur en
            saisissant directement les CV fiscaux (case P.6 de votre carte grise) et les émissions
            CO₂ WLTP.
          </p>
        ) : (
          <>
            <p>
              Les valeurs ci-dessous proviennent du catalogue officiel ADEME Car Labelling
              (véhicules commercialisés en France) et EEA CO₂ Monitoring (immatriculations 2023).
              Les lignes avec <code>~</code> après le CV fiscal signalent une valeur estimée à
              partir de la puissance et du CO₂ — à confirmer sur votre certificat.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Motorisation</th>
                  <th>CV fiscaux</th>
                  <th>CO₂ (g/km)</th>
                  <th>Poids (kg)</th>
                  <th>Énergie</th>
                </tr>
              </thead>
              <tbody>
                {trims.map((t) => (
                  <tr key={t.id}>
                    <td>{t.label}</td>
                    <td>
                      {t.fiscalCv}
                      {t.fiscalCvApprox ? '~' : ''}
                    </td>
                    <td>{t.co2GPerKm ?? '—'}</td>
                    <td>{t.weightKg ?? '—'}</td>
                    <td>{t.energy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2>Prix de la carte grise par région (version la plus vendue)</h2>
        {content.isEv ? (
          <>
            <p>
              La {content.niceName} étant 100 % électrique, sa carte grise coûte{' '}
              <strong>13,76 € partout en France</strong> grâce à l’exonération Y1 + Y3 + Y6. Les
              différences régionales n’ont aucun impact.
            </p>
          </>
        ) : (
          <p>
            Utilisez notre <Link href="/">calculateur en ligne</Link> pour obtenir le prix exact
            dans votre région. Pour une estimation rapide, multipliez les CV fiscaux par le tarif de
            votre région (43 €/CV en Auvergne-Rhône-Alpes, 60 €/CV dans la majorité des régions,
            54,95 € + 14 € IDFM en Île-de-France) puis ajoutez le malus CO₂ éventuel pour les
            versions thermiques.
          </p>
        )}

        <h2>Comment immatriculer une {content.niceName} ?</h2>
        <ul>
          <li>
            <strong>Neuve en France</strong> : le concessionnaire s’en charge généralement. Vous
            payez la facture globale (véhicule + carte grise).
          </li>
          <li>
            <strong>Occasion française</strong> : certificat de cession (Cerfa 15776) + ancienne
            carte grise barrée + non-gage + contrôle technique, dépôt sur l’ANTS.
          </li>
          <li>
            <strong>Import UE</strong> : ajouter quitus fiscal + COC + contrôle technique français.
          </li>
        </ul>

        <RelatedGuides
          links={[
            {
              href: '/',
              label: 'Calculateur',
              desc: 'Prix exact en 30 secondes',
            },
            {
              href: '/guide/calcul-carte-grise-2026',
              label: 'Méthode de calcul',
              desc: 'Les 6 taxes expliquées',
            },
            {
              href: content.isEv
                ? '/guide/carte-grise-vehicule-electrique'
                : '/guide/malus-co2-2026',
              label: content.isEv ? 'Véhicule électrique' : 'Malus CO₂',
              desc: content.isEv ? 'Exonérations EV' : 'Grille WLTP 2026',
            },
            {
              href: '/referentiels/catalogue',
              label: 'Catalogue complet',
              desc: '3 250 motorisations',
            },
          ]}
        />
      </ArticleShell>
    </>
  );
}
