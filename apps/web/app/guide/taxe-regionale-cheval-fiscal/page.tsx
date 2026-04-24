import type { Metadata } from 'next';
import Link from 'next/link';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/taxe-regionale-cheval-fiscal';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Taxe régionale 2026 (Y1) : tarif du cheval fiscal par région, coefficients énergie, surcharge IDFM en Île-de-France, décote 50 % après 10 ans.';

const FAQ = [
  {
    question: 'Quelle région a le tarif du cheval fiscal le moins cher en 2026 ?',
    answer:
      'L’Auvergne-Rhône-Alpes à 43 €/CV est la région la moins chère en 2026. À l’inverse, onze régions appliquent le plafond légal de 60 €/CV.',
  },
  {
    question: 'Qu’est-ce que la surcharge IDFM ?',
    answer:
      'La surcharge IDFM (Île-de-France Mobilités) est une taxe additionnelle de 14 €/CV appliquée en Île-de-France pour financer les transports en commun. Elle s’ajoute au tarif régional depuis le 1ᵉʳ mars 2026 et est prévue à 12 €/CV en 2027.',
  },
  {
    question: 'Comment calculer la taxe régionale ?',
    answer:
      'Formule officielle : CV fiscaux × tarif régional × coefficient énergie (+ surcharge IDFM si applicable). Exemple Clio 5 CV essence à Paris : 5 × (54,95 + 14) = 344,75 €.',
  },
  {
    question: 'Les véhicules de plus de 10 ans paient-ils moins ?',
    answer:
      'Oui, la taxe régionale est réduite de 50 % pour les véhicules dont la 1ʳᵉ immatriculation est antérieure de 10 ans ou plus (art. L.421-48 CIBS). Cela concerne les occasions françaises comme les imports.',
  },
];

export const metadata: Metadata = {
  title: 'Taxe régionale carte grise 2026 : tarif du cheval fiscal par région',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Taxe régionale 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Taxe régionale (Y1) : tarif du cheval fiscal par région 2026"
      lede="La taxe régionale est la plus visible de la carte grise. Chaque conseil régional vote un tarif par cheval fiscal, dans la limite d’un plafond légal de 60 €. Voici tous les tarifs 2026 et les règles qui les modulent."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Taxe régionale 2026', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Principe</h2>
      <p>
        La <strong>taxe régionale (Y1)</strong>, codifiée aux articles{' '}
        <code>L.421-41 à L.421-54-1</code> du CIBS, représente souvent plus de la moitié du coût
        d’une carte grise. Elle est votée chaque année par le conseil régional, dans la limite d’un{' '}
        <strong>plafond légal de 60 € par cheval fiscal</strong>. Le produit finance majoritairement
        l’entretien des routes et les infrastructures régionales.
      </p>

      <h2>Les tarifs régionaux 2026</h2>
      <table>
        <thead>
          <tr>
            <th>Région</th>
            <th>€/CV</th>
            <th>Particularités</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Auvergne-Rhône-Alpes</td>
            <td>43</td>
            <td>La moins chère</td>
          </tr>
          <tr>
            <td>Hauts-de-France</td>
            <td>42</td>
            <td>Coef 0,5 hybride/GPL</td>
          </tr>
          <tr>
            <td>Corse</td>
            <td>53</td>
            <td>Exo HEV/PHEV totale</td>
          </tr>
          <tr>
            <td>Bourgogne-Franche-Comté</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Bretagne</td>
            <td>60</td>
            <td>Coef 0,5 hybride/GPL/E85</td>
          </tr>
          <tr>
            <td>Centre-Val de Loire</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Grand Est</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Île-de-France</td>
            <td>54,95</td>
            <td>+ 14 €/CV surcharge IDFM</td>
          </tr>
          <tr>
            <td>Nouvelle-Aquitaine</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Normandie</td>
            <td>46</td>
            <td>Coef 0,5 hybride</td>
          </tr>
          <tr>
            <td>Occitanie</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Pays de la Loire</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>PACA</td>
            <td>60</td>
            <td>Plafond</td>
          </tr>
          <tr>
            <td>Guadeloupe, Martinique, Guyane, Réunion, Mayotte</td>
            <td>30-53</td>
            <td>Varient</td>
          </tr>
        </tbody>
      </table>
      <p>
        Référence complète et coefficients détaillés sur la page{' '}
        <Link href="/referentiels/regions">Référentiels · Régions</Link>.
      </p>

      <h2>Coefficients d’énergie</h2>
      <ul>
        <li>
          <strong>Essence / diesel / autre</strong> : coefficient 1 (tarif plein).
        </li>
        <li>
          <strong>Électrique / hydrogène</strong> : coefficient 0 partout → exonération totale de
          Y1.
        </li>
        <li>
          <strong>Hybride HEV / PHEV / GPL / GNV / E85</strong> : coefficient 0,5 dans plusieurs
          régions (Bretagne, Hauts-de-France, Normandie, Corse). Coefficient 1 ailleurs.
        </li>
      </ul>

      <h2>La surcharge IDFM en Île-de-France</h2>
      <p>
        Depuis le <time dateTime="2026-03-01">1ᵉʳ mars 2026</time>, les cartes grises émises en
        Île-de-France supportent une surcharge additionnelle de <strong>14 €/CV</strong> destinée au
        financement d’Île-de-France Mobilités (le régisseur des transports franciliens). La
        surcharge passera à 12 €/CV en 2027.
      </p>
      <p>
        Exemple : une Clio 5 CV essence à Paris → 5 × 54,95 € (tarif IDF) + 5 × 14 € (IDFM) =
        <strong> 344,75 €</strong>. La même Clio à Dijon (BFC, plafond 60 €) : 5 × 60 € ={' '}
        <strong>300 €</strong>.
      </p>

      <h2>La décote 50 % après 10 ans</h2>
      <p>
        L’article <code>L.421-48</code> prévoit une réduction de 50 % sur Y1 pour les véhicules dont
        la première mise en circulation est antérieure de 10 ans ou plus à la nouvelle
        immatriculation. Cela s’applique à toutes les occasions (françaises ou importées), sans
        condition supplémentaire.
      </p>
      <p>
        Exemple : une Peugeot 508 de 2015 achetée en occasion en 2026, 7 CV diesel, en Île-de-France
        → 7 × (54,95 + 14) × 0,5 = <strong>241,33 €</strong>.
      </p>

      <h2>Exonérations spécifiques</h2>
      <ul>
        <li>
          <strong>CMI-invalidité</strong> : exonération totale de Y1, Y3, Y6. Le titulaire ou une
          personne à charge doit présenter la carte mobilité inclusion mention invalidité.
        </li>
        <li>
          <strong>Véhicule de collection</strong> (carte grise mention « collection ») : tarif
          forfaitaire appliqué par certaines régions (Corse notamment).
        </li>
        <li>
          <strong>Véhicule 100 % électrique / hydrogène</strong> : coefficient énergie = 0, pas de
          Y1, pas de surcharge IDFM.
        </li>
      </ul>

      <RelatedGuides
        links={[
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul complet',
            desc: 'Vue d’ensemble des 6 taxes',
          },
          {
            href: '/referentiels/regions',
            label: 'Tableau régions',
            desc: '18 régions, 9 énergies, coefficients',
          },
          {
            href: '/carte-grise/ile-de-france',
            label: 'Carte grise Île-de-France',
            desc: 'Surcharge IDFM, exemples Paris',
          },
          {
            href: '/carte-grise/auvergne-rhone-alpes',
            label: 'Carte grise ARA',
            desc: 'Région la moins chère',
          },
        ]}
      />
    </GuidePage>
  );
}
