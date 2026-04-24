import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/malus-poids-2026';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Malus au poids 2026 (TMOM) en France : seuil 1500 kg, 5 tranches progressives de 10 à 30 €/kg, abattements famille, hybride, PHEV, 8+ places. Exemples chiffrés.';

const FAQ = [
  {
    question: 'Qu’est-ce que le malus au poids ?',
    answer:
      'Le malus au poids (ou TMOM, taxe sur la masse en ordre de marche) est une taxe appliquée aux véhicules particuliers dont la masse dépasse un certain seuil. En 2026, ce seuil est fixé à 1500 kg. Au-delà, un tarif progressif par kilogramme s’applique, de 10 €/kg à 30 €/kg.',
  },
  {
    question: 'Pourquoi le seuil est-il passé de 1600 kg à 1500 kg ?',
    answer:
      'La Loi de Finances 2026, adoptée via l’article 49-3, a abaissé le seuil déclencheur de 100 kg pour renforcer l’incitation à choisir des véhicules plus légers. Cela ajoute environ 500 000 véhicules au périmètre du malus chaque année.',
  },
  {
    question: 'Les véhicules électriques paient-ils le malus au poids en 2026 ?',
    answer:
      'Non, les véhicules 100 % électriques et à hydrogène restent exonérés en 2026, 2027 et 2028. L’amendement qui prévoyait de les taxer à partir de juillet 2026 a été retiré lors du passage en 49-3.',
  },
  {
    question: 'Comment réduire le malus au poids d’un gros véhicule familial ?',
    answer:
      'En cumulant les abattements : 200 kg par enfant à charge (si 3+ enfants), 500 kg si le véhicule fait 8 places ou plus, 100 kg si hybride, 200 kg si hybride rechargeable. Un minivan 8 places avec 3 enfants peut cumuler 1100 kg d’abattement.',
  },
];

export const metadata: Metadata = {
  title: 'Malus au poids 2026 : seuil 1500 kg, tranches, abattements — guide officiel',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Malus au poids 2026 — guide officiel', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Malus au poids (TMOM) 2026 : seuil, tranches, abattements"
      lede="Depuis la Loi de Finances 2026, le seuil déclencheur du malus au poids est abaissé à 1500 kg. Voici les cinq tranches progressives, les abattements cumulables et plusieurs exemples chiffrés pour calculer précisément Y6."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Malus au poids 2026', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Ce qui change en 2026</h2>
      <p>
        La <strong>Loi de Finances 2026</strong> a apporté deux changements majeurs au malus au
        poids (taxe Y6, articles <code>L.421-71 à L.421-81-1</code> du CIBS) :
      </p>
      <ul>
        <li>
          <strong>Seuil abaissé</strong> de 1 600 kg à <strong>1 500 kg</strong>.
        </li>
        <li>
          <strong>EV et hydrogène exonérés</strong> sur 2026, 2027 et 2028 (retrait de l’amendement
          via 49-3).
        </li>
      </ul>

      <h2>Les 5 tranches progressives</h2>
      <table>
        <thead>
          <tr>
            <th>De</th>
            <th>À</th>
            <th>Tarif €/kg</th>
            <th>Malus sur cette tranche (plein)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 500 kg</td>
            <td>1 700 kg</td>
            <td>10 €</td>
            <td>2 000 €</td>
          </tr>
          <tr>
            <td>1 700 kg</td>
            <td>1 800 kg</td>
            <td>15 €</td>
            <td>1 500 €</td>
          </tr>
          <tr>
            <td>1 800 kg</td>
            <td>1 900 kg</td>
            <td>20 €</td>
            <td>2 000 €</td>
          </tr>
          <tr>
            <td>1 900 kg</td>
            <td>2 000 kg</td>
            <td>25 €</td>
            <td>2 500 €</td>
          </tr>
          <tr>
            <td>2 000 kg</td>
            <td>—</td>
            <td>30 €</td>
            <td>30 €/kg au-delà</td>
          </tr>
        </tbody>
      </table>

      <h2>Abattements sur la masse taxable</h2>
      <p>
        Avant d’appliquer les tranches, on retranche de la masse en ordre de marche les abattements
        suivants (cumulables) :
      </p>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Abattement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hybride non rechargeable (HEV/MHEV)</td>
            <td>−100 kg</td>
          </tr>
          <tr>
            <td>Hybride rechargeable (PHEV)</td>
            <td>−200 kg</td>
          </tr>
          <tr>
            <td>Véhicule 8 places et plus · particulier</td>
            <td>−500 kg</td>
          </tr>
          <tr>
            <td>Véhicule 8 places et plus · personne morale</td>
            <td>−600 kg</td>
          </tr>
          <tr>
            <td>Famille 3 enfants ou plus</td>
            <td>−200 kg / enfant</td>
          </tr>
          <tr>
            <td>Véhicule 100 % électrique ou hydrogène</td>
            <td>Exonération totale (2026-2028)</td>
          </tr>
        </tbody>
      </table>

      <h2>Exemples chiffrés</h2>

      <h3>1. Peugeot 3008 essence 1 580 kg</h3>
      <p>Masse taxable : 1 580 − 0 = 1 580 kg. Seuil dépassé de 80 kg dans la première tranche.</p>
      <p>
        Y6 = 80 × 10 € = <strong>800 €</strong>.
      </p>

      <h3>2. Renault Captur hybride 1 450 kg</h3>
      <p>
        Masse taxable = 1 450 − 100 (HEV) = 1 350 kg ≤ 1 500 kg. <strong>Y6 = 0 €</strong>.
      </p>

      <h3>3. BMW X5 diesel 2 100 kg</h3>
      <p>Masse taxable = 2 100 kg (pas d’abattement).</p>
      <ul>
        <li>1 500→1 700 : 200 × 10 = 2 000 €</li>
        <li>1 700→1 800 : 100 × 15 = 1 500 €</li>
        <li>1 800→1 900 : 100 × 20 = 2 000 €</li>
        <li>1 900→2 000 : 100 × 25 = 2 500 €</li>
        <li>2 000→2 100 : 100 × 30 = 3 000 €</li>
      </ul>
      <p>
        <strong>Y6 total = 11 000 €</strong>.
      </p>

      <h3>4. Peugeot Rifter 8 places, famille de 4 enfants, 1 900 kg</h3>
      <p>Abattement : 500 (8 places) + 4 × 200 (enfants) = 1 300 kg.</p>
      <p>
        Masse taxable = 1 900 − 1 300 = 600 kg ≤ 1 500 kg. <strong>Y6 = 0 €</strong>.
      </p>

      <h3>5. Tesla Model X électrique 2 459 kg</h3>
      <p>
        Exonération EV. <strong>Y6 = 0 €</strong>.
      </p>

      <h2>Interaction avec le plafond global Y3 + Y6</h2>
      <p>
        Le cumul <strong>malus CO₂ (Y3) + malus au poids (Y6)</strong> est plafonné à{' '}
        <strong>80 000 € en 2026</strong>. Si Y3 atteint déjà le plafond, Y6 n’est pas appliqué.
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul carte grise 2026',
            desc: 'Vue d’ensemble des 6 taxes',
          },
          {
            href: '/guide/malus-co2-2026',
            label: 'Malus CO₂ 2026',
            desc: 'Grille WLTP et exemples',
          },
          {
            href: '/guide/carte-grise-vehicule-electrique',
            label: 'Véhicule électrique',
            desc: 'Exonération Y1/Y3/Y6',
          },
          {
            href: '/referentiels/malus-poids',
            label: 'Barème complet',
            desc: 'Référentiel Y6 officiel',
          },
        ]}
      />
    </GuidePage>
  );
}
