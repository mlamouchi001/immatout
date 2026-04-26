import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/carte-grise-vehicule-electrique';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Carte grise véhicule électrique 2026 : exonération totale Y1/Y3/Y6, seuls 13,76 € de forfait à payer. Prix exact Tesla, Zoé, ID.3, i3 et EV d’import.';

const FAQ = [
  {
    question: 'Combien coûte la carte grise d’un véhicule électrique en 2026 ?',
    answer:
      '13,76 € au total, partout en France. Les véhicules 100 % électriques et à hydrogène sont exonérés de la taxe régionale (Y1), du malus CO₂ (Y3) et du malus au poids (Y6). Seuls les forfaits Y4 (11 € gestion) et Y5 (2,76 € acheminement) restent dus.',
  },
  {
    question: 'L’exonération est-elle reconduite pour les années suivantes ?',
    answer:
      'Oui pour 2026, 2027 et 2028. L’amendement qui prévoyait d’appliquer le malus au poids aux EV dès juillet 2026 a été retiré lors du passage de la Loi de Finances en 49-3. Après 2028, le régime pourra évoluer.',
  },
  {
    question: 'Les hybrides rechargeables (PHEV) paient-ils plein tarif ?',
    answer:
      'Non, ce n’est pas une exonération mais des abattements : 200 kg sur le malus au poids, parfois un coefficient 0,5 sur Y1 dans certaines régions (Bretagne, Hauts-de-France). Ils restent soumis au malus CO₂ sur la base de leurs émissions WLTP réelles.',
  },
  {
    question: 'La Tesla Model X 2,5 tonnes paie-t-elle le malus au poids ?',
    answer:
      'Non, malgré ses 2 459 kg, la Tesla Model X est exonérée de Y6 sur 2026-2028 en tant que véhicule 100 % électrique. Coût total de sa carte grise : 13,76 €.',
  },
];

export const metadata: Metadata = {
  title: 'Carte grise voiture électrique 2026 : 13,76 €',
  description:
    'Carte grise EV 2026 : exonération totale Y1, Y3, Y6. Coût 13,76 € pour Tesla, Zoé, ID.3, i3 et tous les véhicules 100 % électriques en France.',
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Carte grise EV 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Carte grise véhicule électrique : 13,76 € en 2026"
      lede="Les véhicules 100 % électriques et à hydrogène conservent leur exonération totale de Y1, Y3 et Y6 en 2026. Peu importe le modèle — Zoé, Tesla Model Y, Porsche Taycan — la carte grise coûte 13,76 € partout en France."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Véhicule électrique', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Le forfait unique de 13,76 €</h2>
      <p>Trois taxes principales s’effacent pour les véhicules électriques :</p>
      <ul>
        <li>
          <strong>Y1 — Taxe régionale</strong> : coefficient énergie = 0 dans les 18 régions.
          Applicable aussi à l’hydrogène.
        </li>
        <li>
          <strong>Y3 — Malus CO₂</strong> : par construction, un EV émet 0 g/km CO₂ au pot
          d’échappement. Mais l’article <code>L.421-66</code> va plus loin : exonération explicite
          des véhicules à énergie électrique ou hydrogène.
        </li>
        <li>
          <strong>Y6 — Malus au poids</strong> : l’amendement de l’automne 2025 qui prévoyait
          d’appliquer le malus aux EV dès juillet 2026 a été retiré via le 49-3. L’exonération est
          reconduite pour 2026, 2027 et 2028.
        </li>
      </ul>
      <p>Il reste donc les deux forfaits universels :</p>
      <ul>
        <li>
          <strong>Y4 — Taxe fixe de gestion</strong> : 11 €.
        </li>
        <li>
          <strong>Y5 — Redevance d’acheminement</strong> : 2,76 €.
        </li>
      </ul>
      <p>
        Total : <strong>13,76 €</strong>. Quelle que soit la région, le modèle, la puissance ou le
        poids.
      </p>

      <h2>Comparatif EV vs thermique (même puissance)</h2>
      <table>
        <thead>
          <tr>
            <th>Véhicule</th>
            <th>CV</th>
            <th>Énergie</th>
            <th>Carte grise Paris</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Renault Zoé</td>
            <td>4</td>
            <td>100 % électrique</td>
            <td>13,76 €</td>
          </tr>
          <tr>
            <td>Renault Clio TCe 91</td>
            <td>5</td>
            <td>Essence</td>
            <td>808,51 €</td>
          </tr>
          <tr>
            <td>Tesla Model 3 LR</td>
            <td>11</td>
            <td>100 % électrique</td>
            <td>13,76 €</td>
          </tr>
          <tr>
            <td>BMW 330i</td>
            <td>11</td>
            <td>Essence</td>
            <td>17 669 €</td>
          </tr>
          <tr>
            <td>Tesla Model X Plaid</td>
            <td>15</td>
            <td>100 % électrique</td>
            <td>13,76 €</td>
          </tr>
          <tr>
            <td>Porsche Cayenne GTS</td>
            <td>15</td>
            <td>Essence</td>
            <td>81 033 €</td>
          </tr>
        </tbody>
      </table>
      <p>
        L’économie pour une berline essence équivalente en CV et CO₂ est de plusieurs centaines à
        plusieurs dizaines de milliers d’euros.
      </p>

      <h2>Hybrides et PHEV : attention au raccourci</h2>
      <p>
        Un véhicule <strong>hybride non rechargeable</strong> (HEV, MHEV) ou{' '}
        <strong>hybride rechargeable</strong> (PHEV) n’est pas exonéré. Ces motorisations
        bénéficient d’<em>abattements</em>, pas d’exonérations :
      </p>
      <ul>
        <li>
          <strong>Y1 (régionale)</strong> : coefficient 0,5 dans certaines régions (Bretagne,
          Hauts-de-France, Normandie, Corse). Coefficient 1 ailleurs.
        </li>
        <li>
          <strong>Y3 (malus CO₂)</strong> : calculé sur le CO₂ WLTP réel (souvent 20-40 g/km pour un
          PHEV, 90-110 g/km pour un HEV). Souvent faible, rarement nul.
        </li>
        <li>
          <strong>Y6 (malus au poids)</strong> : abattement de 100 kg (HEV) ou 200 kg (PHEV) avant
          application des tranches.
        </li>
      </ul>

      <h2>Véhicules électriques d’occasion</h2>
      <p>
        Une Tesla Model 3 d’occasion de 2020 change de propriétaire en 2026 ? Si elle est
        ré-immatriculée en France (y compris depuis l’étranger), <strong>13,76 €</strong>.
        L’exonération s’applique sans condition de nouveauté, quelle que soit l’origine.
      </p>

      <h2>Véhicule d’hydrogène</h2>
      <p>
        Les véhicules à pile à combustible hydrogène (Toyota Mirai, Hyundai Nexo) bénéficient du
        même régime que les EV : coefficient énergie 0 en Y1, exonération explicite en Y3, et
        exonération en Y6 sur 2026-2028.
      </p>

      <RelatedGuides
        links={[
          {
            href: '/carte-grise/tesla-model-y',
            label: 'Carte grise Tesla Model Y',
            desc: 'Coût réel partout en France',
          },
          {
            href: '/guide/malus-poids-2026',
            label: 'Malus au poids 2026',
            desc: 'Pourquoi les EV restent exonérés',
          },
          {
            href: '/guide/malus-co2-2026',
            label: 'Malus CO₂ 2026',
            desc: 'Grille et exonérations',
          },
          {
            href: '/guide/taxe-regionale-cheval-fiscal',
            label: 'Taxe régionale',
            desc: 'Coefficients énergie par région',
          },
        ]}
      />
    </GuidePage>
  );
}
