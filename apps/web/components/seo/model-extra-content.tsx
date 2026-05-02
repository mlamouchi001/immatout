/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

/**
 * Model-specific editorial content injected as `extraContent` on each
 * /carte-grise/<model-slug>/page.tsx via the ModelPage shared renderer.
 *
 * Each model needs ~500-700 mots beyond the base ModelPage scaffold to
 * reach the SEO target of 800+ words rendered. The base ModelPage already
 * adds ~250 mots of factual data (trims table from Prisma, region pricing,
 * démarches).
 *
 * Tesla Model Y and Renault Clio have hand-crafted content directly in
 * their page.tsx (Day 5 of the SEO sprint) — they pass `extraContent`
 * explicitly. The four files using this fallback are:
 *   - /carte-grise/peugeot-208
 *   - /carte-grise/citroen-c3
 *   - /carte-grise/dacia-sandero
 *   - /carte-grise/renault-captur
 */

interface SectionProps {
  niceName: string;
  segment: string;
  bestSellingTrim: string;
  fiscalCv: number;
  averageCo2: number;
  averageWeight: number;
  hybridAvailable: boolean;
  electricAvailable: boolean;
  oldGenerationsNote: string;
  uniqueSellingPoint: string;
  popularRegions: string[];
}

function CommonExtra(props: SectionProps) {
  const {
    niceName,
    segment,
    bestSellingTrim,
    fiscalCv,
    averageCo2,
    averageWeight,
    hybridAvailable,
    electricAvailable,
    oldGenerationsNote,
    uniqueSellingPoint,
    popularRegions,
  } = props;
  return (
    <>
      <h2>Combien coûte la carte grise d'une {niceName} en 2026 ?</h2>
      <p>
        La {niceName} est positionnée sur le segment {segment}. Sa version la plus vendue, la{' '}
        <strong>{bestSellingTrim}</strong>, déclare {fiscalCv} CV fiscaux avec environ {averageCo2}{' '}
        g CO₂/km WLTP et un poids à vide proche de {averageWeight} kg. Pour cette configuration en
        région ARA (43 €/CV, le moins cher) ou en IDF (68,95 €/CV avec surcharge IDFM), voici les
        fourchettes :
      </p>
      <ul>
        <li>
          <strong>
            {niceName} {bestSellingTrim} en Auvergne-Rhône-Alpes
          </strong>{' '}
          : {fiscalCv} × 43 € + 13,76 € (Y4 + Y5){' '}
          {averageCo2 > 108
            ? `+ ~${Math.round((averageCo2 - 108) * 25)} € malus CO₂`
            : '+ 0 € malus CO₂ (sous le seuil)'}
          {averageWeight > 1500 ? ` + ${(averageWeight - 1500) * 10} € malus poids` : ''} ≈{' '}
          <strong>
            {(
              fiscalCv * 43 +
              14 +
              (averageCo2 > 108 ? Math.round((averageCo2 - 108) * 25) : 0) +
              (averageWeight > 1500 ? (averageWeight - 1500) * 10 : 0)
            ).toLocaleString('fr-FR')}{' '}
            €
          </strong>
        </li>
        <li>
          <strong>
            {niceName} {bestSellingTrim} en Île-de-France
          </strong>{' '}
          : {fiscalCv} × 54,95 € + {fiscalCv} × 14 € (IDFM) + 13,76 €{' '}
          {averageCo2 > 108 ? `+ ~${Math.round((averageCo2 - 108) * 25)} €` : ''}{' '}
          {averageWeight > 1500 ? `+ ${(averageWeight - 1500) * 10} €` : ''} ≈{' '}
          <strong>
            {(
              Math.round(fiscalCv * 54.95) +
              fiscalCv * 14 +
              14 +
              (averageCo2 > 108 ? Math.round((averageCo2 - 108) * 25) : 0) +
              (averageWeight > 1500 ? (averageWeight - 1500) * 10 : 0)
            ).toLocaleString('fr-FR')}{' '}
            €
          </strong>
        </li>
      </ul>
      <p>
        L'écart entre la région la moins chère et la plus chère pour ce modèle est de l'ordre de{' '}
        {fiscalCv * 25} € sur la seule Y1, ce qui peut être un argument pour un acheteur frontalier
        de plusieurs régions (ex : départements du Nord de l'IDF qui jouxtent les Hauts-de-France à
        42 €/CV).
      </p>

      <h2>Motorisations et fiscalité par version</h2>
      <p>{uniqueSellingPoint}</p>
      <ul>
        <li>
          <strong>Versions essence classiques</strong> : tarif plein partout, malus CO₂ qui dépend
          du palier (entre 0 et 250 € pour les motorisations courantes autour de 120-130 g/km).
        </li>
        {hybridAvailable && (
          <li>
            <strong>Versions hybrides E-Tech / e-DCS / Mild Hybrid</strong> : coefficient demi-tarif
            (0,5) sur Y1 en Bretagne, Hauts-de-France, Corse. Combiné avec un CO₂ généralement &lt;
            108 g/km, l'hybride peut coûter jusqu'à 200 € de moins en carte grise qu'une version
            essence équivalente.
          </li>
        )}
        {electricAvailable && (
          <li>
            <strong>Version 100 % électrique</strong> : exonération totale Y1 + Y3 + Y6, soit{' '}
            <strong>13,76 € fixes</strong> partout en France (Y4 + Y5 uniquement).
          </li>
        )}
        <li>
          <strong>Versions diesel d'occasion</strong> : tarif plein avec un malus CO₂ souvent
          supérieur à l'essence (combustion plus dense → plus de CO₂ par km). Si vous achetez une{' '}
          {niceName} diesel d'occasion en France, pas de malus rétroactif (Y3 ne s'applique qu'aux
          importations et premières immatriculations).
        </li>
      </ul>

      <h2>Carte grise {niceName} d'occasion : ce qu'il faut savoir</h2>
      <p>{oldGenerationsNote}</p>
      <p>Les pièges courants à connaître pour une {niceName} d'occasion :</p>
      <ul>
        <li>
          <strong>Vérifier la case P.6 de la carte grise</strong> (puissance fiscale en CV). Les{' '}
          {niceName} de générations différentes peuvent avoir le même modèle de moteur mais des CV
          différents selon l'année (ex : ancien moteur 1.2 16V à 6 CV, nouveau TCe à 5 CV pour une
          cylindrée similaire).
        </li>
        <li>
          <strong>Pas de malus CO₂ rétroactif</strong> sur les véhicules d'occasion immatriculés en
          France pour la première fois avant 2008. Si un site marchand vous facture un malus pour
          une {niceName} de 2007, c'est une erreur ou un abus.
        </li>
        <li>
          <strong>Décote du malus pour les imports UE</strong> : si vous importez une {niceName}{' '}
          depuis l'Allemagne ou l'Espagne, le malus CO₂ s'applique avec décote de 10 % par année
          d'ancienneté (plafonnée à 90 %, ou 100 % au-delà de 15 ans).
        </li>
      </ul>

      <h2>Démarches d'immatriculation pour une {niceName}</h2>
      <p>
        Pour une {niceName} neuve, votre concessionnaire {props.niceName.split(' ')[0]} se charge
        habituellement de toute la démarche : carte grise et premier certificat d'immatriculation
        provisoire (CPI) sont fournis dans les 24 à 72 h. Pour une occasion entre particuliers, vous
        devez :
      </p>
      <ul>
        <li>Obtenir le certificat de cession Cerfa 15776 signé par le vendeur</li>
        <li>Récupérer la carte grise barrée et signée</li>
        <li>Demander un certificat de non-gage de moins de 15 jours</li>
        <li>
          Faire un contrôle technique français de moins de 6 mois si le véhicule a plus de 4 ans
        </li>
        <li>
          Déposer la demande sur{' '}
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>{' '}
          dans les 30 jours suivant l'achat
        </li>
      </ul>

      <h2>Régions les plus populaires pour les {niceName}</h2>
      <p>
        D'après les statistiques d'immatriculation, la {niceName} se vend particulièrement bien en{' '}
        {popularRegions.join(', ')}. Si vous habitez l'une de ces régions, vous bénéficiez
        probablement de réseaux de concessionnaires denses et de meilleurs prix sur l'occasion
        locale.
      </p>

      <p>
        Pour une simulation chiffrée de votre {niceName} avec les caractéristiques précises de votre
        véhicule, utilisez notre <Link href="/">calculateur en ligne</Link>. Pour comprendre comment
        chaque taxe s'applique, consultez notre{' '}
        <Link href="/guide/calcul-carte-grise-2026">guide complet du calcul</Link>.
      </p>
    </>
  );
}

const KEY = (make: string, model: string) => `${make}::${model}`;

const CONTENT_BY_MODEL: Record<string, SectionProps> = {
  [KEY('PEUGEOT', '208')]: {
    niceName: 'Peugeot 208',
    segment: 'des citadines polyvalentes (segment B)',
    bestSellingTrim: '1.2 PureTech 100 essence',
    fiscalCv: 5,
    averageCo2: 124,
    averageWeight: 1130,
    hybridAvailable: true,
    electricAvailable: true,
    oldGenerationsNote:
      "La Peugeot 208 a connu deux générations majeures : la 208 I (2012-2019) sur la plateforme PSA PF1 et la 208 II (depuis 2019) sur la plateforme CMP partagée avec la Citroën C3. Les anciennes 208 I diesel HDi sont aujourd'hui très peu chères à l'occasion et présentent une consommation modérée (~3,5 l/100 km).",
    uniqueSellingPoint:
      "La 208 II est l'une des rares citadines à proposer simultanément trois énergies (essence PureTech, hybride PureTech 48V Mild Hybrid, électrique e-208) sur le même catalogue, avec des fiscalités carte grise très différentes :",
    popularRegions: [
      'Île-de-France',
      'Auvergne-Rhône-Alpes',
      'Hauts-de-France',
      'Nouvelle-Aquitaine',
    ],
  },
  [KEY('CITROEN', 'C3')]: {
    niceName: 'Citroën C3',
    segment: 'des citadines accessibles (segment B)',
    bestSellingTrim: '1.2 PureTech 110 essence',
    fiscalCv: 5,
    averageCo2: 122,
    averageWeight: 1100,
    hybridAvailable: true,
    electricAvailable: true,
    oldGenerationsNote:
      "La Citroën C3 a connu plusieurs générations depuis 2002. Les versions actuelles (C3 IV depuis 2024) intègrent la nouvelle plateforme Smart Car partagée avec la e-C3, qui est l'électrique low-cost de Stellantis (à partir de 23 300 €). Pour une C3 d'occasion, vérifiez la génération sur la case D.1 de la carte grise (D.1 indique le modèle commercial précis).",
    uniqueSellingPoint:
      "La nouvelle ë-C3 électrique est l'un des arguments majeurs de Citroën : à 113 ch et 305 km d'autonomie, elle est l'une des EV les moins chères du marché européen et bénéficie de l'exonération totale de carte grise.",
    popularRegions: ['Hauts-de-France', 'Île-de-France', 'Grand Est', 'Auvergne-Rhône-Alpes'],
  },
  [KEY('DACIA', 'SANDERO')]: {
    niceName: 'Dacia Sandero',
    segment: 'des citadines low-cost (segment B-)',
    bestSellingTrim: 'TCe 90 essence',
    fiscalCv: 5,
    averageCo2: 130,
    averageWeight: 1075,
    hybridAvailable: false,
    electricAvailable: false,
    oldGenerationsNote:
      "La Dacia Sandero est la voiture la plus vendue en Europe depuis 2022. Sa stratégie de simplicité fait qu'elle a peu de versions et peu d'options. Sur le marché de l'occasion, elle se distingue par une décote très faible : une Sandero de 5 ans conserve souvent 60 à 70 % de sa valeur neuve, ce qui en fait un bon investissement à la revente.",
    uniqueSellingPoint:
      'La Sandero ne propose pas (encore) de version hybride ou électrique : seules les motorisations essence (SCe et TCe) et bicarburation GPL (Bi-Fuel) sont disponibles. Le coefficient GPL à 0,5 dans la majorité des régions rend la Sandero Bi-Fuel particulièrement attractive sur la carte grise (économie de 50 % sur Y1).',
    popularRegions: ['Hauts-de-France', 'Pays de la Loire', 'Nouvelle-Aquitaine', 'Occitanie'],
  },
  [KEY('RENAULT', 'CAPTUR')]: {
    niceName: 'Renault Captur',
    segment: 'des SUV urbains (segment B-SUV)',
    bestSellingTrim: 'TCe 140 mild hybrid essence',
    fiscalCv: 7,
    averageCo2: 128,
    averageWeight: 1330,
    hybridAvailable: true,
    electricAvailable: false,
    oldGenerationsNote:
      "Le Renault Captur a été lancé en 2013 et a connu deux générations majeures (2013-2019 et 2019 à aujourd'hui). La génération actuelle a introduit en 2020 la version E-Tech hybride rechargeable PHEV et en 2024 la version E-Tech full hybrid (autorechargeable). Sur l'occasion, attention à bien distinguer les versions PHEV (rechargeables, batterie ~10 kWh) des full hybrid (non rechargeables, batterie ~1 kWh).",
    uniqueSellingPoint:
      "Le Captur E-Tech hybride rechargeable bénéficie d'un coefficient 0,5 sur Y1 dans la quasi-totalité des régions, ce qui combine bien avec son CO₂ déclaré WLTP autour de 30 g/km (sous le seuil malus). Le Captur PHEV est donc l'une des configurations les plus avantageuses fiscalement parmi les SUV urbains.",
    popularRegions: [
      'Île-de-France',
      'Auvergne-Rhône-Alpes',
      "Provence-Alpes-Côte d'Azur",
      'Bretagne',
    ],
  },
};

export function ModelExtraContent({ make, model }: { make: string; model: string }) {
  const props = CONTENT_BY_MODEL[KEY(make.toUpperCase(), model.toUpperCase())];
  if (!props) return null;
  return <CommonExtra {...props} />;
}
