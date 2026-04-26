import type { Metadata } from 'next';
import Link from 'next/link';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/calcul-carte-grise-2026';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';

const DESCRIPTION =
  'Comprendre le calcul du coût d’une carte grise en France en 2026 : les 6 taxes (Y1 à Y6), la formule officielle, les plafonds, les exonérations et 4 exemples chiffrés.';

const FAQ = [
  {
    question: 'Quelles sont les 6 taxes qui composent une carte grise en 2026 ?',
    answer:
      "Y1 (taxe régionale = CV fiscaux × tarif régional), Y2 (formation professionnelle, utilitaires seulement), Y3 (malus CO₂, véhicules particuliers neufs ou importés), Y4 (taxe fixe de gestion, 11 €), Y5 (redevance d'acheminement, 2,76 €), Y6 (malus au poids, TMOM, véhicules > 1500 kg).",
  },
  {
    question: "Quel est le montant minimal d'une carte grise en 2026 ?",
    answer:
      '13,76 € pour un véhicule 100 % électrique : Y1/Y3/Y6 sont exonérés, seuls les forfaits Y4 (11 €) et Y5 (2,76 €) restent dus. Pour une petite essence (4 CV, Corse, <108 g/km CO₂) : autour de 225 €.',
  },
  {
    question: 'Y a-t-il un plafond au total ?',
    answer:
      "Oui, le cumul Y3 + Y6 est plafonné à 80 000 € en 2026 (90 000 € en 2027, 100 000 € en 2028). Les autres taxes s'ajoutent en dehors de ce plafond.",
  },
  {
    question: 'Quelle date utilise-t-on pour le barème ?',
    answer:
      "Le barème appliqué est celui en vigueur à la date de nouvelle immatriculation en France — pas celui de l'année de mise en circulation initiale, sauf pour Y3 sur les imports d'occasion où le barème de l'année d'origine s'applique avec décote.",
  },
];

export const metadata: Metadata = {
  title: 'Calcul carte grise 2026 : méthode officielle CIBS',
  description:
    'Comprendre le calcul du coût d’une carte grise en France 2026 : les 6 taxes (Y1 à Y6), la formule officielle, plafonds, exonérations, 4 exemples chiffrés.',
  alternates: { canonical: PATH },
  openGraph: {
    url: PATH,
    title: 'Calcul carte grise 2026 — méthode officielle',
    description: 'Les 6 taxes, la formule CIBS, les exemples chiffrés.',
  },
};

export default function Page() {
  return (
    <GuidePage
      title="Comment se calcule le coût d’une carte grise en 2026 ?"
      lede="Le prix d’une carte grise (certificat d’immatriculation) est la somme exacte de six taxes définies par le Code des impositions sur les biens et services. Voici la méthode officielle et 4 exemples chiffrés avec les barèmes de la Loi de Finances 2026."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Calcul carte grise 2026', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <p>
        En France, le montant d’une <strong>carte grise</strong> dépend de 6 composantes. Les trois
        plus importantes sont la <strong>taxe régionale</strong> (Y1), le <strong>malus CO₂</strong>{' '}
        (Y3) et le <strong>malus au poids</strong> (Y6). Les trois autres — formation
        professionnelle (Y2), gestion (Y4), acheminement (Y5) — sont soit forfaitaires, soit
        limitées aux utilitaires.
      </p>

      <h2>La formule officielle</h2>
      <p>Le total est simplement la somme des six taxes, avec un plafond sur Y3 + Y6 :</p>
      <pre className="rounded-lg border border-border bg-muted/30 p-4 text-xs">
        {`Total = Y1_régionale
      + Y2_formation      (utilitaires uniquement)
      + min(Y3 + Y6, 80 000 €)     ← plafond LF 2026
      + Y4_gestion        (11 €)
      + Y5_acheminement   (2,76 €)`}
      </pre>

      <h2>Y1 — Taxe régionale (CIBS L.421-41 à L.421-54-1)</h2>
      <p>
        C’est la taxe la plus importante en volume. Elle est votée par chaque conseil régional dans
        la limite d’un <strong>plafond de 60 €/CV</strong>.
      </p>
      <p>
        <strong>Formule :</strong>{' '}
        <code>
          Y1 = CV fiscaux × tarif régional × coefficient énergie (+ surcharge IDFM si IDF)
        </code>
      </p>
      <ul>
        <li>
          <strong>Tarif régional</strong> : 43 €/CV (ARA) à 60 €/CV (11 régions) en 2026.
        </li>
        <li>
          <strong>Coefficient énergie</strong> : 1 pour essence/diesel, 0 pour EV/hydrogène
          (exonération), 0,5 pour hybride/GPL/E85 dans plusieurs régions (Bretagne, Hauts-de-France,
          Corse…).
        </li>
        <li>
          <strong>Surcharge IDFM</strong> : 14 €/CV en Île-de-France depuis le 1ᵉʳ mars 2026.
        </li>
        <li>
          <strong>Décote 10 ans</strong> : les véhicules dont la 1ʳᵉ immatriculation est antérieure
          de 10 ans ou plus voient Y1 réduit de 50 % (art. L.421-48).
        </li>
      </ul>

      <h2>Y2 — Formation professionnelle transports (utilitaires)</h2>
      <p>
        S’applique uniquement aux genres VU, CTTE, CAM, TRR. Montants fixes : 34 € (PTAC ≤ 3,5 t),
        127 € (3,5 t &lt; PTAC ≤ 6 t), 189 € (PTAC &gt; 6 t), 305 € (tracteur routier).
      </p>

      <h2>Y3 — Malus écologique CO₂ (CIBS L.421-58 à L.421-70)</h2>
      <p>
        Tarif unique applicable aux véhicules particuliers neufs (y compris importés). La
        <strong> grille 2026</strong> débute à 108 g/km CO₂ WLTP (50 €) et progresse jusqu’à un
        plafond de 80 000 €.
      </p>
      <ul>
        <li>
          <strong>Véhicules électriques et hydrogène</strong> : exonération totale (L.421-66).
        </li>
        <li>
          <strong>Véhicule d’occasion français</strong> : Y3 déjà acquitté à la première
          immatriculation, n’est pas ré-appliqué.
        </li>
        <li>
          <strong>Import d’occasion UE / hors UE</strong> : Y3 s’applique au barème de l’année de
          première immatriculation à l’étranger, <em>avec décote mensuelle</em> (3 % à 1 mois,
          jusqu’à 100 % à 181 mois).
        </li>
      </ul>
      <p>
        <Link href="/guide/malus-co2-2026">Voir la grille complète 2026</Link> ou comparer les{' '}
        <Link href="/referentiels/malus-co2">trois années (2024, 2025, 2026)</Link>.
      </p>

      <h2>Y4 — Taxe fixe de gestion (11 €)</h2>
      <p>
        Montant national forfaitaire versé à l’État pour la gestion du dossier (art. L.421-87). Tous
        véhicules, sans exception.
      </p>

      <h2>Y5 — Redevance d’acheminement du certificat (2,76 €)</h2>
      <p>Couvre l’envoi sécurisé de la carte grise par La Poste.</p>

      <h2>Y6 — Malus au poids / TMOM (CIBS L.421-71 à L.421-81-1)</h2>
      <p>
        La Loi de Finances 2026 a <strong>abaissé le seuil de 1600 à 1500 kg</strong>. Au-delà, un
        barème progressif s’applique : 10 €/kg (1500-1700), 15 €/kg (1700-1800), 20 €/kg
        (1800-1900), 25 €/kg (1900-2000), 30 €/kg (au-delà de 2000).
      </p>
      <h3>Abattements sur la masse taxable</h3>
      <ul>
        <li>Hybride HEV/MHEV : −100 kg ; hybride rechargeable PHEV : −200 kg.</li>
        <li>Véhicule 8 places et plus : −500 kg (particulier) / −600 kg (personne morale).</li>
        <li>Famille de 3 enfants ou plus : −200 kg par enfant à charge (L.421-73-1).</li>
        <li>
          <strong>Véhicule 100 % électrique ou à hydrogène</strong> : exonération totale sur
          2026-2028 (suite au retrait de l’amendement via 49-3).
        </li>
      </ul>

      <h2>Exemples chiffrés</h2>

      <h3>1. Renault Clio TCe 91 ch, Paris, neuf</h3>
      <p>CV fiscaux 5 · essence · 124 g/km CO₂ · 1174 kg.</p>
      <ul>
        <li>
          Y1 = 5 × (54,95 + 14) = <strong>344,75 €</strong>
        </li>
        <li>
          Y3 = <strong>450 €</strong> (palier 124 g/km dans la grille 2026)
        </li>
        <li>Y4 = 11 €, Y5 = 2,76 €</li>
        <li>Y6 = 0 € (1174 kg &lt; 1500 kg)</li>
        <li>
          <strong>Total : 808,51 €</strong>
        </li>
      </ul>

      <h3>2. Tesla Model 3 Long Range, Paris, neuf</h3>
      <p>11 CV · 100 % électrique · 0 g/km · 1919 kg.</p>
      <ul>
        <li>Y1 = 0 € (coefficient énergie 0)</li>
        <li>Y3 = 0 € (exonération EV)</li>
        <li>Y6 = 0 € (exonération EV 2026-2028)</li>
        <li>
          <strong>Total : 13,76 €</strong> (Y4 + Y5 uniquement)
        </li>
      </ul>

      <h3>3. Peugeot 508 diesel 8 CV, Auvergne-Rhône-Alpes, occasion 2020</h3>
      <p>8 CV · diesel · 145 g/km · 1500 kg · FR_USED.</p>
      <ul>
        <li>Y1 = 8 × 43 € = 344 €</li>
        <li>Y3 = 0 € (Y3 déjà acquitté à la 1ʳᵉ immat en 2020)</li>
        <li>Y6 = 0 € (Y6 ne s’applique pas aux occasions françaises)</li>
        <li>
          <strong>Total : 357,76 €</strong>
        </li>
      </ul>

      <h3>4. BMW Série 3 importée d’Allemagne, 2019, Paris</h3>
      <p>9 CV · essence · 160 g/km · 1700 kg · IMPORT_EU_USED, âge 7 ans.</p>
      <ul>
        <li>Y1 = 9 × (54,95 + 14) = 620,55 €</li>
        <li>Y3 : barème 2019 à 160 g/km = 8 750 €, décote 7 ans (coef 0,48) → 4 550 €</li>
        <li>Y6 : (1700−1500) × 10 €/kg = 2 000 €, décote 0,48 → 1 040 €</li>
        <li>
          <strong>Total approximatif : 6 224 €</strong>
        </li>
      </ul>

      <h2>Cas particuliers</h2>
      <ul>
        <li>
          <strong>CMI-invalidité</strong> : exonération totale de Y1, Y3, Y6. Seuls Y4 + Y5 restent
          dus.
        </li>
        <li>
          <strong>Véhicule de collection</strong> : certaines régions appliquent un tarif
          forfaitaire spécifique (Corse).
        </li>
        <li>
          <strong>Véhicule utilitaire</strong> : pas de Y3 ni Y6 (barème différent), mais Y2
          s’applique.
        </li>
      </ul>

      <RelatedGuides
        links={[
          {
            href: '/guide/malus-co2-2026',
            label: 'Malus CO₂ 2026',
            desc: 'Grille WLTP complète, exemples par véhicule',
          },
          {
            href: '/guide/malus-poids-2026',
            label: 'Malus au poids 2026',
            desc: 'Seuil 1500 kg, tranches, abattements famille',
          },
          {
            href: '/guide/taxe-regionale-cheval-fiscal',
            label: 'Taxe régionale',
            desc: 'Tarif du cheval fiscal, surcharge IDFM',
          },
          {
            href: '/guide/carte-grise-vehicule-electrique',
            label: 'Véhicules électriques',
            desc: 'Exonérations Tesla, Zoé et autres',
          },
          {
            href: '/guide/carte-grise-import-ue',
            label: 'Import UE',
            desc: 'Décote 12 tiers, quitus fiscal',
          },
          {
            href: '/prix-carte-grise-2026',
            label: 'Prix carte grise 2026',
            desc: 'Tableau récap par CV et par énergie',
          },
        ]}
      />
    </GuidePage>
  );
}
