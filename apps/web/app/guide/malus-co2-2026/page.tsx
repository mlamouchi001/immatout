import type { Metadata } from 'next';
import Link from 'next/link';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/malus-co2-2026';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Barème complet du malus CO₂ 2026 en France : seuil 108 g/km, plafond 80 000 €, exemples pour les véhicules essence, diesel, hybrides et électriques.';

const FAQ = [
  {
    question: 'À partir de quel niveau de CO₂ le malus s’applique-t-il en 2026 ?',
    answer:
      'Le malus écologique commence à 108 g/km CO₂ WLTP en 2026 (contre 113 g en 2025 et 118 g en 2024). À ce seuil, le malus est de 50 €. Il augmente à chaque gramme jusqu’à atteindre 80 000 € au plafond.',
  },
  {
    question: 'Quel est le montant maximum du malus CO₂ en 2026 ?',
    answer:
      'Le malus CO₂ seul peut atteindre 80 000 €. Le plafond commun avec le malus au poids (Y3 + Y6) est également fixé à 80 000 € en 2026, 90 000 € en 2027 et 100 000 € en 2028.',
  },
  {
    question: 'Un véhicule d’occasion paye-t-il le malus CO₂ ?',
    answer:
      'Un véhicule d’occasion immatriculé en France ne paie pas Y3, déjà acquitté à la première immatriculation. En revanche, un véhicule d’occasion importé (UE ou hors UE) paie Y3 au barème de son année de mise en circulation, avec décote mensuelle.',
  },
  {
    question: 'Le malus CO₂ concerne-t-il aussi les utilitaires ?',
    answer:
      'Non, Y3 est limité aux véhicules particuliers (genre VP). Les utilitaires (VU, CTTE, CAM) en sont exclus, mais ils paient la taxe formation professionnelle (Y2) à la place.',
  },
];

export const metadata: Metadata = {
  title: 'Malus CO₂ 2026 : barème, seuil 108 g/km',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Malus CO₂ 2026 — barème officiel', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Malus CO₂ 2026 : barème, seuils, exemples"
      lede="Le malus écologique CO₂ (Y3) frappe chaque véhicule particulier dont les émissions dépassent 108 g/km WLTP en 2026. Jusqu’à 80 000 € de majoration, il est l’un des deux plus gros postes de la carte grise."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Malus CO₂ 2026', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Principe du malus CO₂ en France</h2>
      <p>
        Codifié aux articles <code>L.421-58 à L.421-70</code> du Code des impositions sur les biens
        et services (CIBS), le malus écologique est une taxe additionnelle payée une seule fois au
        moment de la 1ʳᵉ immatriculation d’un véhicule particulier (genre <strong>VP</strong>). Il
        s’appuie sur le taux d’émissions de CO₂ mesuré en <strong>cycle WLTP</strong>
        (homologation EU depuis 2020).
      </p>

      <h2>Évolution du seuil déclencheur (2024-2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Année</th>
            <th>Seuil de déclenchement</th>
            <th>Montant au seuil</th>
            <th>Plafond max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024</td>
            <td>118 g/km</td>
            <td>50 €</td>
            <td>60 000 €</td>
          </tr>
          <tr>
            <td>2025</td>
            <td>113 g/km</td>
            <td>50 €</td>
            <td>70 000 €</td>
          </tr>
          <tr>
            <td>
              <strong>2026</strong>
            </td>
            <td>
              <strong>108 g/km</strong>
            </td>
            <td>50 €</td>
            <td>
              <strong>80 000 €</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        La grille est <em>continue</em> : un gramme supplémentaire de CO₂ ajoute quelques euros à
        quelques centaines d’euros de malus, selon la position dans la courbe.
      </p>

      <h2>Paliers représentatifs de la grille 2026</h2>
      <table>
        <thead>
          <tr>
            <th>CO₂ WLTP</th>
            <th>Malus 2026</th>
            <th>Exemple de véhicule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>108 g/km</td>
            <td>50 €</td>
            <td>Renault Clio hybride E-Tech</td>
          </tr>
          <tr>
            <td>120 g/km</td>
            <td>250 €</td>
            <td>Dacia Sandero TCe 90</td>
          </tr>
          <tr>
            <td>130 g/km</td>
            <td>1 172 €</td>
            <td>Peugeot 2008 essence</td>
          </tr>
          <tr>
            <td>150 g/km</td>
            <td>6 132 €</td>
            <td>Peugeot 3008 diesel</td>
          </tr>
          <tr>
            <td>170 g/km</td>
            <td>15 172 €</td>
            <td>Audi A4 2.0 TDI</td>
          </tr>
          <tr>
            <td>200 g/km</td>
            <td>38 172 €</td>
            <td>BMW Série 5 essence</td>
          </tr>
          <tr>
            <td>≥ 224 g/km</td>
            <td>
              <strong>80 000 € (plafond)</strong>
            </td>
            <td>Mercedes AMG, Porsche 911 Turbo</td>
          </tr>
        </tbody>
      </table>
      <p>
        La grille complète au gramme près est disponible sur la page{' '}
        <Link href="/referentiels/malus-co2">Référentiels · Malus CO₂</Link>.
      </p>

      <h2>Qui paie, qui ne paie pas</h2>
      <h3>Véhicules exonérés</h3>
      <ul>
        <li>
          <strong>100 % électriques</strong> : exonération totale, définitivement inscrite au CIBS
          L.421-66.
        </li>
        <li>
          <strong>Hydrogène</strong> : même régime que l’électrique.
        </li>
        <li>
          <strong>CMI-invalidité</strong> : exonération sur présentation de la carte mobilité
          inclusion mention invalidité du titulaire ou d’une personne à charge.
        </li>
        <li>
          <strong>Véhicule de plus de 8 places</strong> immatriculé par une personne physique avec 3
          enfants ou plus à charge : réduction de 20 g/km par enfant sur la base taxable.
        </li>
      </ul>
      <h3>Véhicules concernés</h3>
      <ul>
        <li>
          Véhicules particuliers (VP) <strong>neufs</strong> achetés en France.
        </li>
        <li>
          Véhicules particuliers <strong>importés neufs</strong> de l’UE ou hors UE.
        </li>
        <li>
          Véhicules particuliers <strong>importés d’occasion</strong> (avec décote 12 tiers, voir
          plus bas).
        </li>
      </ul>

      <h2>Le cas spécifique des imports d’occasion</h2>
      <p>
        Pour un véhicule d’occasion importé, Y3 utilise{' '}
        <strong>le barème de l’année de première immatriculation à l’étranger</strong> — pas l’année
        de dédouanement en France. Une décote s’applique en fonction de l’âge du véhicule :
      </p>
      <table>
        <thead>
          <tr>
            <th>Âge du véhicule</th>
            <th>Coefficient de décote</th>
            <th>Exemple : 5 000 € de malus initial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-3 mois</td>
            <td>3 %</td>
            <td>4 850 €</td>
          </tr>
          <tr>
            <td>1 an</td>
            <td>16 %</td>
            <td>4 200 €</td>
          </tr>
          <tr>
            <td>3 ans</td>
            <td>33 %</td>
            <td>3 350 €</td>
          </tr>
          <tr>
            <td>5 ans</td>
            <td>48 %</td>
            <td>2 600 €</td>
          </tr>
          <tr>
            <td>10 ans</td>
            <td>70 %</td>
            <td>1 500 €</td>
          </tr>
          <tr>
            <td>15 ans +</td>
            <td>100 %</td>
            <td>
              <strong>Exonération totale</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Le détail des 20 tiers est consultable sur{' '}
        <Link href="/referentiels/decote">Référentiels · Décote import</Link>.
      </p>

      <h2>Cumul avec le malus au poids</h2>
      <p>
        Y3 et <Link href="/guide/malus-poids-2026">Y6 (malus au poids)</Link> sont{' '}
        <strong>plafonnés ensemble à 80 000 € en 2026</strong>. Concrètement, un SUV lourd avec
        beaucoup de CO₂ paie au maximum 80 000 € de majoration totale (plus Y1 et les forfaits). Le
        plafond passe à 90 000 € en 2027 et 100 000 € en 2028.
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul carte grise 2026',
            desc: 'Vue d’ensemble des 6 taxes',
          },
          {
            href: '/guide/malus-poids-2026',
            label: 'Malus au poids 2026',
            desc: 'Seuil 1500 kg, tranches progressives',
          },
          {
            href: '/guide/carte-grise-vehicule-electrique',
            label: 'Véhicule électrique',
            desc: 'Exonération totale Y1/Y3/Y6',
          },
          {
            href: '/guide/carte-grise-import-ue',
            label: 'Import UE',
            desc: 'Décote 12 tiers détaillée',
          },
          {
            href: '/referentiels/malus-co2',
            label: 'Grille complète 2024-2026',
            desc: 'Tableau au gramme près',
          },
          {
            href: '/',
            label: 'Calculateur',
            desc: 'Obtenir le chiffre exact en 30 s',
          },
        ]}
      />
    </GuidePage>
  );
}
