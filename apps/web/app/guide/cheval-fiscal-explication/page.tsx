import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/cheval-fiscal-explication';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Comprendre le cheval fiscal (CV) en 2026 : formule officielle française (CO₂ + puissance kW), où le trouver sur la carte grise (case P.6), correspondance kW ↔ CV.';

const FAQ = [
  {
    question: 'Où trouver la puissance fiscale sur sa carte grise ?',
    answer:
      'La puissance fiscale (CV) se trouve à la case P.6 de la carte grise française. Elle est exprimée en chevaux fiscaux entiers (4, 5, 6, 7…). La puissance réelle du moteur en kilowatts est à la case P.2.',
  },
  {
    question: 'Comment se calcule le cheval fiscal en 2026 ?',
    answer:
      'Formule officielle (circulaire du 8 novembre 2021, applicable depuis la Loi de Finances 2020) : CV = (CO₂ / 45) + 1,6 × (puissance kW / 40)^1,6, arrondi à l’entier supérieur. Pour un véhicule 100 % électrique, formule simplifiée utilisée en pratique : CV = puissance kW / 7,5, plafonné à 15.',
  },
  {
    question: 'Quelle est la correspondance kW ↔ CV fiscaux ?',
    answer:
      'La formule n’est pas linéaire (elle combine CO₂ et puissance). Exemples : une citadine 90 ch essence (66 kW, 120 g/km CO₂) ≈ 5 CV. Une berline 150 ch diesel (110 kW, 120 g/km) ≈ 7-8 CV. Une Tesla Model 3 Performance 450 kW ≈ 15 CV.',
  },
  {
    question: 'Pourquoi les CV fiscaux sont-ils plus importants en France qu’à l’étranger ?',
    answer:
      'Parce qu’ils servent d’assiette à la taxe régionale (Y1), qui est la plus importante de la carte grise. 1 CV supplémentaire = 43 € à 74,95 € de taxe en plus (selon la région et la surcharge IDFM). C’est aussi l’un des critères des assureurs pour le calcul des cotisations.',
  },
];

export const metadata: Metadata = {
  title: 'Cheval fiscal (CV) 2026 : calcul, formule',
  description:
    'Comprendre le cheval fiscal en 2026 : formule officielle (CO₂ + kW), où le trouver sur la carte grise (case P.6), correspondance kW vs CV.',
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Cheval fiscal (CV) 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Cheval fiscal (CV) : définition, formule, utilité"
      lede="Le cheval fiscal — ou puissance administrative — est la clé de la taxe régionale. Ce nombre entier apparaît à la case P.6 de toute carte grise française. Voici ce qu’il représente, comment il se calcule depuis 2020, et pourquoi il est plus élevé en France qu’ailleurs."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Cheval fiscal', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Qu’est-ce que le cheval fiscal ?</h2>
      <p>
        Le <strong>cheval fiscal (CV)</strong> est une mesure administrative française de la
        puissance d’un véhicule. Contrairement à la puissance réelle en chevaux-vapeur (ch) ou en
        kilowatts (kW), le CV sert exclusivement au calcul de taxes : taxe régionale sur la carte
        grise, assurance, péages de certaines sociétés d’autoroute.
      </p>
      <p>
        Il se trouve à la <strong>case P.6</strong> de la carte grise. C’est toujours un entier. La
        plupart des voitures particulières se situent entre 4 et 11 CV. Au-delà, on parle de
        véhicules à forte puissance (15+ pour les sportives, Tesla Model X, Porsche).
      </p>

      <h2>La formule officielle depuis 2020</h2>
      <p>
        Pour les véhicules <strong>thermiques (essence, diesel, hybrides)</strong>, la circulaire du
        8 novembre 2021 fixe la formule suivante, appliquée depuis la Loi de Finances 2020 :
      </p>
      <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
        {`CV = ⌈ CO₂ / 45  +  1,6 × (P_kW / 40) ^ 1,6 ⌉`}
      </pre>
      <p>Où :</p>
      <ul>
        <li>
          <strong>CO₂</strong> : émissions en g/km en cycle WLTP (depuis 2020).
        </li>
        <li>
          <strong>P_kW</strong> : puissance maximale nette en kilowatts.
        </li>
        <li>
          <strong>⌈ ⌉</strong> : arrondi à l’entier supérieur.
        </li>
      </ul>
      <p>
        Pour un <strong>véhicule 100 % électrique</strong>, la formule simplifiée utilisée en
        pratique est :
      </p>
      <pre className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
        {`CV électrique = ⌈ P_kW / 7,5 ⌉,  plafonné à 15`}
      </pre>

      <h2>Exemples de calcul</h2>
      <table>
        <thead>
          <tr>
            <th>Véhicule</th>
            <th>Puissance</th>
            <th>CO₂ WLTP</th>
            <th>CV fiscal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Renault Clio TCe 91</td>
            <td>67 kW (91 ch)</td>
            <td>124 g/km</td>
            <td>5 CV</td>
          </tr>
          <tr>
            <td>Peugeot 308 1.5 BlueHDi</td>
            <td>96 kW (130 ch)</td>
            <td>118 g/km</td>
            <td>7 CV</td>
          </tr>
          <tr>
            <td>Renault Captur E-Tech hybride</td>
            <td>105 kW (145 ch)</td>
            <td>102 g/km</td>
            <td>6 CV</td>
          </tr>
          <tr>
            <td>BMW 330i</td>
            <td>190 kW (258 ch)</td>
            <td>150 g/km</td>
            <td>11 CV</td>
          </tr>
          <tr>
            <td>Tesla Model 3 RWD</td>
            <td>208 kW électrique</td>
            <td>0</td>
            <td>14 CV</td>
          </tr>
          <tr>
            <td>Tesla Model 3 Performance</td>
            <td>393 kW électrique</td>
            <td>0</td>
            <td>15 CV (plafond)</td>
          </tr>
          <tr>
            <td>Porsche 911 GT3</td>
            <td>375 kW (510 ch)</td>
            <td>300 g/km</td>
            <td>34 CV</td>
          </tr>
        </tbody>
      </table>

      <h2>Impact sur le prix de la carte grise</h2>
      <p>Le CV multiplie directement le tarif régional. Exemple IDF (54,95 €/CV + 14 € IDFM) :</p>
      <ul>
        <li>4 CV → 275,80 € de Y1</li>
        <li>5 CV → 344,75 €</li>
        <li>7 CV → 482,65 €</li>
        <li>11 CV → 758,45 €</li>
        <li>15 CV → 1 034,25 €</li>
      </ul>

      <h2>Histoire et changements récents</h2>
      <p>
        Jusqu’à la Loi de Finances 2020, la formule française était héritée de 1998 et dépendait
        uniquement de la puissance mécanique. Elle aboutissait à des écarts énormes entre la France
        et ses voisins (une BMW M3 était notée 31 CV en France contre 10 en Allemagne).
      </p>
      <p>
        La formule 2020 intègre le CO₂ WLTP pour aligner davantage la fiscalité française sur la
        logique écologique, même si elle reste plus sévère qu’en Allemagne (où la taxe Kfz-Steuer
        dépend directement du CO₂ sans notion de « chevaux fiscaux »).
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/taxe-regionale-cheval-fiscal',
            label: 'Taxe régionale Y1',
            desc: 'Tarif du CV par région',
          },
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul complet',
            desc: 'Les 6 taxes',
          },
          {
            href: '/guide/carte-grise-vehicule-electrique',
            label: 'EV',
            desc: 'Calcul CV électrique',
          },
          {
            href: '/referentiels/regions',
            label: 'Tarifs par région',
            desc: '18 régions, coefficients',
          },
        ]}
      />
    </GuidePage>
  );
}
