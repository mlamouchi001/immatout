import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/prix-carte-grise-2026';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Combien coûte une carte grise en 2026 ? Tableau récapitulatif par puissance fiscale (CV), par région et par énergie, avec exemples chiffrés pour 2026.';

const FAQ = [
  {
    question: 'Combien coûte une carte grise 5 CV en 2026 ?',
    answer:
      'Entre 228 € (4 CV en ARA) et 358 € (5 CV IDF essence neuf < 108 g/km). Comptez 400-800 € pour une 5 CV essence avec un malus CO₂ standard.',
  },
  {
    question: 'Quelle est la voiture la moins chère à immatriculer en 2026 ?',
    answer:
      'Un véhicule 100 % électrique, quel qu’il soit : 13,76 € partout en France. Pour les thermiques, une 4 CV essence faible CO₂ en Auvergne-Rhône-Alpes commence autour de 185 €.',
  },
];

export const metadata: Metadata = {
  title: 'Prix carte grise 2026 : combien ça coûte ?',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Prix carte grise 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Prix carte grise 2026 : combien coûte une carte grise ?"
      lede="Vue synthétique par puissance fiscale, par région et par énergie. Le coût total dépend de 6 taxes ; voici les fourchettes réalistes pour estimer votre prix."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[{ name: 'Prix carte grise 2026', path: PATH }]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Prix par puissance fiscale (Y1 seule, essence, région à 60 €/CV)</h2>
      <table>
        <thead>
          <tr>
            <th>CV fiscaux</th>
            <th>Y1 (région 60 €)</th>
            <th>Y1 IDF (54,95 + 14)</th>
            <th>Y1 ARA (43 €)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4 CV</td>
            <td>240 €</td>
            <td>275,80 €</td>
            <td>172 €</td>
          </tr>
          <tr>
            <td>5 CV</td>
            <td>300 €</td>
            <td>344,75 €</td>
            <td>215 €</td>
          </tr>
          <tr>
            <td>6 CV</td>
            <td>360 €</td>
            <td>413,70 €</td>
            <td>258 €</td>
          </tr>
          <tr>
            <td>7 CV</td>
            <td>420 €</td>
            <td>482,65 €</td>
            <td>301 €</td>
          </tr>
          <tr>
            <td>8 CV</td>
            <td>480 €</td>
            <td>551,60 €</td>
            <td>344 €</td>
          </tr>
          <tr>
            <td>10 CV</td>
            <td>600 €</td>
            <td>689,50 €</td>
            <td>430 €</td>
          </tr>
          <tr>
            <td>11 CV</td>
            <td>660 €</td>
            <td>758,45 €</td>
            <td>473 €</td>
          </tr>
          <tr>
            <td>15 CV</td>
            <td>900 €</td>
            <td>1 034,25 €</td>
            <td>645 €</td>
          </tr>
        </tbody>
      </table>
      <p>
        À ajouter : 13,76 € de forfait (Y4 + Y5) dans tous les cas, plus malus CO₂ Y3 et malus poids
        Y6 si applicables.
      </p>

      <h2>Prix par énergie (Renault Clio 5 CV en IDF)</h2>
      <table>
        <thead>
          <tr>
            <th>Énergie</th>
            <th>Coef Y1</th>
            <th>Total carte grise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essence 124 g/km</td>
            <td>1</td>
            <td>808,51 €</td>
          </tr>
          <tr>
            <td>Diesel 114 g/km</td>
            <td>1</td>
            <td>438,51 €</td>
          </tr>
          <tr>
            <td>Hybride E-Tech 102 g/km</td>
            <td>1 (IDF)</td>
            <td>358,51 €</td>
          </tr>
          <tr>
            <td>GPL 115 g/km</td>
            <td>1 (IDF)</td>
            <td>413,51 €</td>
          </tr>
          <tr>
            <td>
              <strong>100 % électrique</strong>
            </td>
            <td>
              <strong>0</strong>
            </td>
            <td>
              <strong>13,76 €</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Prix par région (Tesla Model 3 Long Range, 11 CV, 0 g/km, 1919 kg)</h2>
      <p>
        Véhicule 100 % électrique → <strong>exonération totale de Y1, Y3, Y6</strong>. Les seuls
        montants dus sont Y4 et Y5.
      </p>
      <p>
        <strong>Carte grise : 13,76 € partout en France</strong>. C’est la même chose à Paris, à
        Marseille, à Brest ou à Saint-Denis de la Réunion.
      </p>

      <h2>Cas d’école : un SUV diesel lourd</h2>
      <p>BMW X5 M50d essence, 15 CV, 250 g/km CO₂, 2 200 kg, neuf, Paris :</p>
      <ul>
        <li>Y1 = 15 × (54,95 + 14) = 1 034,25 €</li>
        <li>Y3 = 80 000 € (plafond atteint à 224 g/km)</li>
        <li>Y6 : (2 200 − 1 500) = 700 kg taxables → tranches, environ 17 500 €</li>
        <li>Application du plafond global Y3 + Y6 = 80 000 € (Y3 sature déjà), donc Y6 = 0 €</li>
        <li>Y4 + Y5 = 13,76 €</li>
        <li>
          <strong>Total : 81 048 €</strong> de carte grise, plus le prix du véhicule lui-même.
        </li>
      </ul>

      <RelatedGuides
        links={[
          {
            href: '/',
            label: 'Calculateur exact',
            desc: 'En 30 secondes',
          },
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Méthode complète',
            desc: 'Les 6 taxes expliquées',
          },
          {
            href: '/guide/taxe-regionale-cheval-fiscal',
            label: 'Tarif par région',
            desc: 'Les 18 tarifs CV',
          },
          {
            href: '/compare',
            label: 'Comparateur 18 régions',
            desc: 'Même véhicule, 18 prix',
          },
        ]}
      />
    </GuidePage>
  );
}
